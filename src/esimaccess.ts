import { type Plan } from './data';

type EsimAccessOperator = {
  operatorName?: string;
  networkType?: string;
};

type EsimAccessLocation = {
  locationName?: string;
  locationCode?: string;
  operatorList?: EsimAccessOperator[];
};

type EsimAccessPackage = {
  packageCode: string;
  slug: string;
  name: string;
  price?: number;
  retailPrice?: number;
  currencyCode?: string;
  volume?: number;
  dataType?: number;
  duration?: number;
  durationUnit?: string;
  location?: string;
  locationCode?: string;
  description?: string;
  favorite?: boolean;
  speed?: string;
  ipExport?: string;
  supportTopUpType?: number;
  fupPolicy?: string;
  locationNetworkList?: EsimAccessLocation[];
};

type EsimAccessResponse = {
  success?: boolean;
  errorCode?: string | null;
  errorMessage?: string | null;
  obj?: {
    packageList?: EsimAccessPackage[];
  } | null;
};

const API_BASE = 'https://api.esimaccess.com';
const CACHE_TTL_MS = 5 * 60 * 1000;
const USD_PRICE_SCALE = 10000;
const USD_TO_VND = 26000;
const MB = 1024 * 1024;
const GB = 1024 * MB;
const TEST_PAYMENT_PLAN_SLUG = 'VN_0.1_7';

let catalogCache: { expiresAt: number; plans: Plan[] } | null = null;

const moneyVnd = new Intl.NumberFormat('vi-VN');

const formatVnd = (amount: number) => `${moneyVnd.format(Math.max(0, Math.round(amount / 1000) * 1000))}đ`;

const formatBytes = (bytes: number | undefined) => {
  if (!bytes || bytes <= 0) {
    return 'Data linh hoạt';
  }

  if (bytes >= GB) {
    const value = bytes / GB;
    return Number.isInteger(value) ? `${value}GB` : `${value.toFixed(1).replace(/\.0$/, '')}GB`;
  }

  return `${Math.round(bytes / MB)}MB`;
};

const translateLocation = (value: string) =>
  value
    .replaceAll('China Mainland', 'Trung Quốc đại lục')
    .replaceAll('China mainland', 'Trung Quốc đại lục')
    .replaceAll('Hong Kong (China)', 'Hong Kong')
    .replaceAll('Hong Kong', 'Hong Kong')
    .replaceAll('Macao (China)', 'Macau')
    .replaceAll('Macau (China)', 'Macau')
    .replaceAll('Macao', 'Macau')
    .replaceAll('South Korea', 'Hàn Quốc')
    .replaceAll('Japan', 'Nhật Bản');

const unique = <T>(values: T[]) => Array.from(new Set(values.filter(Boolean)));

const normalizeText = (value: string | undefined) => (value ?? '').trim();

const hasGoogleAccess = (pkg: EsimAccessPackage) => {
  const route = normalizeText(pkg.ipExport).toUpperCase();
  return route !== '' && route !== 'CN';
};

const isTikTokPreferred = (pkg: EsimAccessPackage) => {
  const text = `${normalizeText(pkg.slug)} ${normalizeText(pkg.name)} ${normalizeText(pkg.description)}`.toLowerCase();
  const route = normalizeText(pkg.ipExport).toUpperCase();
  return text.includes('nonhkip') || route === 'SG';
};

const isChinaCentric = (pkg: EsimAccessPackage) => {
  const slug = normalizeText(pkg.slug).toUpperCase();
  const name = normalizeText(pkg.name);
  return slug.startsWith('CN') || /^China\b/i.test(name);
};

const getCatalogGroup = (pkg: EsimAccessPackage): Plan['catalogGroup'] => {
  const text = `${normalizeText(pkg.slug)} ${normalizeText(pkg.name)}`.toLowerCase();
  const isDaily = pkg.dataType === 2 || text.includes('daily');

  if (isDaily) {
    return 'daily';
  }

  if (text.includes('nonhkip')) {
    return 'mainland';
  }

  if (/(hong|macao|macau|hk)/i.test(text)) {
    return 'combo';
  }

  if (/(japan|korea|asia|global)/i.test(text)) {
    return 'regional';
  }

  return 'mainland';
};

const getCoverageNames = (pkg: EsimAccessPackage, group: Plan['catalogGroup']) => {
  const names = unique((pkg.locationNetworkList ?? []).map((location) => translateLocation(normalizeText(location.locationName))));
  const text = `${normalizeText(pkg.slug)} ${normalizeText(pkg.name)}`.toLowerCase();

  if (group === 'combo' && (!names.includes('Hong Kong') || !names.includes('Macau'))) {
    return ['Trung Quốc đại lục', 'Hong Kong', 'Macau'];
  }

  if (group === 'regional' && /(japan|korea)/i.test(text)) {
    return ['Trung Quốc đại lục', 'Nhật Bản', 'Hàn Quốc'];
  }

  if (names.length > 0) {
    return names;
  }

  if (group === 'combo') {
    return ['Trung Quốc đại lục', 'Hong Kong', 'Macau'];
  }

  if (group === 'regional') {
    return ['Trung Quốc', 'Nhật Bản', 'Hàn Quốc'];
  }

  return ['Trung Quốc đại lục'];
};

const getOperators = (pkg: EsimAccessPackage) =>
  unique(
    (pkg.locationNetworkList ?? []).flatMap((location) =>
      (location.operatorList ?? []).map((operator) => normalizeText(operator.operatorName)),
    ),
  );

const getGroups = (pkg: EsimAccessPackage, catalogGroup: Plan['catalogGroup']) => {
  const groups = new Set<string>();
  const duration = pkg.duration ?? 0;

  groups.add(catalogGroup ?? 'mainland');

  if (pkg.dataType === 2 || catalogGroup === 'daily') {
    groups.add('daily');
  }

  if (duration > 0 && duration <= 15) {
    groups.add('short');
  }

  if (duration >= 30 || catalogGroup === 'daily') {
    groups.add('long');
  }

  return Array.from(groups);
};

const getShortLabel = (pkg: EsimAccessPackage, group: Plan['catalogGroup']) => {
  if (group === 'daily') {
    return 'Theo ngày';
  }

  if (group === 'combo') {
    return 'Liên vùng';
  }

  if (group === 'regional') {
    return 'Mở rộng';
  }

  if ((pkg.duration ?? 0) >= 90) {
    return 'Dài hạn';
  }

  if ((pkg.volume ?? 0) >= 20 * GB) {
    return 'Nhiều data';
  }

  if ((pkg.duration ?? 0) <= 7) {
    return 'Tiết kiệm';
  }

  return pkg.favorite ? 'Nổi bật' : 'Bán chạy';
};

const getCoverageLabel = (coverageNames: string[]) => {
  if (coverageNames.length === 0) {
    return 'Trung Quốc đại lục';
  }

  if (coverageNames.length === 1) {
    return coverageNames[0];
  }

  return coverageNames.join(', ');
};

const getCoverageTitle = (group: Plan['catalogGroup'], coverageNames: string[]) => {
  if (group === 'combo') {
    return 'Trung Quốc + HK + Macau';
  }

  if (group === 'regional') {
    return 'Trung Quốc liên vùng';
  }

  if (group === 'daily') {
    return coverageNames.includes('Hong Kong') || coverageNames.includes('Macau')
      ? 'Theo ngày liên vùng'
      : 'Theo ngày đại lục';
  }

  return 'Trung Quốc đại lục';
};

const getPlanTitle = (group: Plan['catalogGroup'], dataAllowance: string, validity: string, coverageNames: string[]) => {
  const prefix =
    group === 'combo'
      ? 'eSIM Trung Quốc + Hong Kong + Macau'
      : group === 'regional'
        ? 'eSIM Trung Quốc liên vùng'
        : 'eSIM Trung Quốc';

  if (group === 'daily') {
    return `${prefix} ${dataAllowance}/ngày`;
  }

  return `${prefix} ${dataAllowance} / ${validity}`;
};

const getDescription = (group: Plan['catalogGroup'], dataAllowance: string, validity: string, coverage: string) => {
  if (group === 'daily') {
    return `Gói day pass linh hoạt cho lịch trình thay đổi liên tục. Khi chốt đơn chỉ cần chọn số ngày dùng thực tế cho ${coverage.toLowerCase()}.`;
  }

  if (group === 'combo') {
    return `Một gói cho lịch trình qua ${coverage.toLowerCase()}, phù hợp nếu bạn di chuyển giữa đại lục, Hong Kong và Macau.`;
  }

  if (group === 'regional') {
    return `Phù hợp cho chuyến đi nhiều điểm có Trung Quốc trong hành trình, dùng ${dataAllowance} trong ${validity}.`;
  }

  return `Gói ${dataAllowance} dùng trong ${validity} cho ${coverage.toLowerCase()}, phù hợp du lịch, công tác và di chuyển nhiều thành phố.`;
};

const getIdealFor = (group: Plan['catalogGroup'], duration: number, volume: number) => {
  if (group === 'daily') {
    return 'Đi linh hoạt, muốn tính theo ngày dùng';
  }

  if (group === 'combo') {
    return 'Di chuyển qua Trung Quốc, Hong Kong và Macau';
  }

  if (group === 'regional') {
    return 'Lịch trình nhiều nước nhưng có Trung Quốc là chặng chính';
  }

  if (duration <= 7) {
    return 'Đi ngắn ngày, transit, công tác nhanh';
  }

  if (volume >= 20 * GB) {
    return 'Ở lâu, cần data nhiều hoặc hotspot';
  }

  return 'Du lịch 1 đến 2 tuần, đi hội chợ, đi công tác';
};

const getCities = (group: Plan['catalogGroup']) => {
  if (group === 'combo') {
    return ['Bắc Kinh', 'Thượng Hải', 'Quảng Châu', 'Thâm Quyến', 'Hong Kong', 'Macau'];
  }

  if (group === 'regional') {
    return ['Bắc Kinh', 'Thượng Hải', 'Quảng Châu', 'Tokyo', 'Osaka', 'Seoul'];
  }

  return ['Bắc Kinh', 'Thượng Hải', 'Quảng Châu', 'Thâm Quyến', 'Hàng Châu', 'Thành Đô'];
};

const getHighlights = (pkg: EsimAccessPackage, coverageNames: string[], operators: string[], group: Plan['catalogGroup']) => {
  const highlights = [
    pkg.speed ? `Tốc độ ${pkg.speed}` : 'Kích hoạt data nhanh',
    coverageNames.length > 1 ? `Phủ sóng ${coverageNames.join(', ')}` : `Phủ sóng ${coverageNames[0] ?? 'Trung Quốc đại lục'}`,
  ];

  if (group === 'daily') {
    highlights.push(`Chọn số ngày dùng khi chốt đơn${pkg.fupPolicy ? `, sau ngưỡng còn ${pkg.fupPolicy}` : ''}`);
  } else if (pkg.supportTopUpType && pkg.supportTopUpType > 0) {
    highlights.push('Có thể nạp thêm data khi cần');
  } else {
    highlights.push('QR cài trước khi bay');
  }

  if (operators.length > 0) {
    highlights[1] = `Nhà mạng: ${operators.slice(0, 2).join(', ')}`;
  }

  return highlights;
};

const toPlan = (pkg: EsimAccessPackage): Plan => {
  const catalogGroup = getCatalogGroup(pkg);
  const coverageNames = getCoverageNames(pkg, catalogGroup);
  const operators = getOperators(pkg);
  const displayPrice = pkg.price ?? pkg.retailPrice ?? 0;
  const priceUsd = Number((displayPrice / USD_PRICE_SCALE).toFixed(2));
  const durationDays = pkg.duration ?? 0;
  const isDaily = catalogGroup === 'daily';
  const dataAllowance = formatBytes(pkg.volume);
  const validity = isDaily ? 'Theo ngày' : `${durationDays} ngày`;
  const coverage = getCoverageLabel(coverageNames);

  return {
    slug: pkg.slug,
    name: getPlanTitle(catalogGroup, dataAllowance, validity, coverageNames),
    shortLabel: getShortLabel(pkg, catalogGroup),
    description: getDescription(catalogGroup, dataAllowance, validity, coverage),
    priceUsd,
    priceVnd: formatVnd(priceUsd * USD_TO_VND),
    validity,
    dataAllowance: isDaily ? `${dataAllowance}/ngày` : dataAllowance,
    coverage,
    speed: normalizeText(pkg.speed) || '3G / 4G / 5G',
    hotspot: 'Tùy dòng máy, thường dùng được trên thiết bị hỗ trợ',
    delivery: 'QR qua email sau khi xác nhận',
    idealFor: getIdealFor(catalogGroup, durationDays, pkg.volume ?? 0),
    highlights: getHighlights(pkg, coverageNames, operators, catalogGroup),
    cities: getCities(catalogGroup),
    groups: getGroups(pkg, catalogGroup),
    catalogGroup,
    catalogSource: 'esimaccess',
    packageCode: pkg.packageCode,
    dataType: pkg.dataType,
    supportTopUpType: pkg.supportTopUpType,
    fupPolicy: normalizeText(pkg.fupPolicy),
    ipExport: normalizeText(pkg.ipExport),
    googleAccess: hasGoogleAccess(pkg),
    tiktokPreferred: isTikTokPreferred(pkg),
    operators,
    locations: coverageNames,
    periodRequired: isDaily,
    durationDays,
  };
};

const comparePlans = (left: Plan, right: Plan) => {
  const groupWeight: Record<NonNullable<Plan['catalogGroup']>, number> = {
    mainland: 0,
    combo: 1,
    regional: 2,
    daily: 3,
  };

  const weightDiff = (groupWeight[left.catalogGroup ?? 'mainland'] ?? 99) - (groupWeight[right.catalogGroup ?? 'mainland'] ?? 99);
  if (weightDiff !== 0) {
    return weightDiff;
  }

  const durationDiff = (left.durationDays ?? 0) - (right.durationDays ?? 0);
  if (durationDiff !== 0) {
    return durationDiff;
  }

  return left.priceUsd - right.priceUsd;
};

const fetchPackageList = async (accessCode: string, locationCode: string) => {
  const response = await fetch(`${API_BASE}/api/v1/open/package/list`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'RT-AccessCode': accessCode,
    },
    body: JSON.stringify({ locationCode }),
  });

  if (!response.ok) {
    throw new Error(`eSIMAccess package list failed with status ${response.status}`);
  }

  const payload = (await response.json()) as EsimAccessResponse;

  if (!payload.success || !payload.obj?.packageList) {
    throw new Error(payload.errorMessage || 'Unable to load eSIMAccess packages');
  }

  return payload.obj.packageList;
};

const toTestPaymentPlan = (pkg: EsimAccessPackage): Plan => {
  const displayPrice = pkg.price ?? pkg.retailPrice ?? 0;
  const priceUsd = Number((displayPrice / USD_PRICE_SCALE).toFixed(2));
  const dataAllowance = formatBytes(pkg.volume);
  const durationDays = pkg.duration ?? 7;

  return {
    slug: pkg.slug,
    name: `eSIM Việt Nam ${dataAllowance} / ${durationDays} ngày`,
    shortLabel: 'Test',
    description: 'Gói test riêng để kiểm thử luồng tạo đơn và thanh toán, không chen vào catalog Trung Quốc chính.',
    priceUsd,
    priceVnd: formatVnd(priceUsd * USD_TO_VND),
    validity: `${durationDays} ngày`,
    dataAllowance,
    coverage: 'Việt Nam',
    speed: normalizeText(pkg.speed) || '3G / 4G / 5G',
    hotspot: 'Tùy dòng máy, thường dùng được trên thiết bị hỗ trợ',
    delivery: 'Dùng để test thanh toán',
    idealFor: 'Test đơn và thanh toán eSIM',
    highlights: ['100MB đủ để test nhanh', 'Ẩn khỏi catalog chính', 'Giữ nguyên flow thanh toán hiện tại'],
    cities: ['Hà Nội', 'TP.HCM', 'Đà Nẵng'],
    groups: ['test'],
    catalogGroup: 'mainland',
    catalogSource: 'esimaccess',
    packageCode: pkg.packageCode,
    dataType: pkg.dataType,
    supportTopUpType: pkg.supportTopUpType,
    fupPolicy: normalizeText(pkg.fupPolicy),
    ipExport: normalizeText(pkg.ipExport),
    googleAccess: hasGoogleAccess(pkg),
    tiktokPreferred: false,
    operators: getOperators(pkg),
    locations: ['Việt Nam'],
    periodRequired: false,
    durationDays,
    hiddenFromCatalog: true,
  };
};

export const fetchEsimAccessPlans = async (accessCode?: string) => {
  if (!accessCode) {
    return null;
  }

  if (catalogCache && catalogCache.expiresAt > Date.now()) {
    return catalogCache.plans;
  }

  const chinaPackages = await fetchPackageList(accessCode, 'CN');
  const chinaPlans = chinaPackages.filter(isChinaCentric).map(toPlan);
  const googleAccessPlans = chinaPlans.filter((plan) => plan.googleAccess);
  const visiblePlans = (googleAccessPlans.length > 0 ? googleAccessPlans : chinaPlans).sort(comparePlans);

  let testPlans: Plan[] = [];
  try {
    const vietnamPackages = await fetchPackageList(accessCode, 'VN');
    const testPackage = vietnamPackages.find((pkg) => pkg.slug === TEST_PAYMENT_PLAN_SLUG);
    if (testPackage) {
      testPlans = [toTestPaymentPlan(testPackage)];
    }
  } catch (error) {
    console.error('Unable to load test payment package from eSIMAccess', error);
  }

  const plans = [...visiblePlans, ...testPlans];
  catalogCache = {
    expiresAt: Date.now() + CACHE_TTL_MS,
    plans,
  };

  return plans;
};
