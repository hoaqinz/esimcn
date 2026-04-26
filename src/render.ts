import {
  articles,
  brand,
  buyingSteps,
  faqs,
  plans,
  proofPoints,
  serviceHighlights,
  testimonials,
  type Article,
  type Plan,
} from './data';

type RenderContext = {
  siteUrl: string;
  supportEmail: string;
  primaryKeyword: string;
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  homeHeroTitle: string;
  homeHeroDescription: string;
  homeHeroBannerUrl: string;
  homeHeroBannerGalleryUrls: string;
  footerDescription: string;
  homeMetaTitle: string;
  homeMetaDescription: string;
  socialImageUrl: string;
};

type HomePageOptions = {
  internalPricing?: boolean;
};

type AdminFlash = {
  kind: 'success' | 'error' | 'info';
  message: string;
};

type AdminLoginPageOptions = {
  username: string;
  enabled: boolean;
  csrfToken: string;
  flash?: AdminFlash | null;
};

type AdminPlanItem = {
  slug: string;
  name: string;
  pricingModeLabel: string;
  sourceLabel: string;
  meta: string;
  sourcePriceVnd: number;
  effectivePriceVnd: number;
  overridePriceVnd: number | null;
  marginVnd: number;
  marginPct: number;
  packageCode: string | null;
  note: string | null;
  variantLabel: string | null;
  updatedAtLabel: string | null;
  detailHref: string;
};

type AdminPlanGroup = {
  key: string;
  label: string;
  note: string;
  items: AdminPlanItem[];
};

type AdminOrderItem = {
  reference: string;
  planTitle: string;
  customerName: string;
  customerPhone: string | null;
  customerEmail: string;
  amountLabel: string;
  paymentCode: string | null;
  paymentStatus: string | null;
  statusLabel: string;
  createdAtLabel: string;
  paidAtLabel: string | null;
  href: string;
};

type AdminCustomerItem = {
  displayName: string;
  email: string;
  phone: string | null;
  orderCountLabel: string;
  paidOrderCountLabel: string;
  unpaidOrderCountLabel: string;
  paidTotalLabel: string;
  lastOrderAtLabel: string;
  lastPaidAtLabel: string | null;
  statusLabel: string;
};

type AdminWebhookItem = {
  receivedAtLabel: string;
  matchedReference: string | null;
  amountLabel: string;
  statusLabel: string;
  reason: string;
  accountNumber: string | null;
  refNo: string | null;
  description: string | null;
};

type AdminPerformanceCard = {
  label: string;
  orderCountLabel: string;
  revenueLabel: string;
  costLabel: string;
  profitLabel: string;
  tone: 'accent' | 'neutral' | 'muted';
};

type AdminSiteSettings = {
  siteName: string;
  supportEmail: string;
  logoUrl: string;
  faviconUrl: string;
  homeHeroTitle: string;
  homeHeroDescription: string;
  homeHeroBannerUrl: string;
  homeHeroBannerGalleryUrls: string;
  footerDescription: string;
  homeMetaTitle: string;
  homeMetaDescription: string;
  socialImageUrl: string;
};

type AdminDashboardPageData = {
  username: string;
  csrfToken: string;
  catalogSourceLabel: string;
  totalPlans: number;
  overrideCount: number;
  paidOrderCount: number;
  pendingOrderCount: number;
  bulkScope: string;
  bulkPercent: number;
  plansByGroup: AdminPlanGroup[];
  performanceCards: AdminPerformanceCard[];
  customers: AdminCustomerItem[];
  orders: AdminOrderItem[];
  webhookEvents: AdminWebhookItem[];
  siteSettings: AdminSiteSettings;
  assetUploadEnabled: boolean;
  assetUploadMode: 'disabled' | 'd1' | 'r2';
  assetUploadLimitLabel: string;
  flash?: AdminFlash | null;
  previewHref: string;
  apiHref: string;
};

type CustomerPortalOrderItem = {
  reference: string;
  paymentStatus: string;
  paymentStatusLabel: string;
  planTitle: string;
  planMeta: string;
  amountLabel: string;
  createdLabel: string;
  paidLabel: string | null;
  destinationHref: string;
  destinationLabel: string;
};

const moneyUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const moneyVnd = new Intl.NumberFormat('vi-VN');
const USD_TO_VND = 26000;
const DAY_PASS_MAX_DAYS = 365;
const PUBLIC_CATALOG_PLAN_SLUGS = [
  'CN_1_Daily_1Mbps_nonhkip',
  'CN_2_Daily_1Mbps_nonhkip',
  'CN_3_Daily_1Mbps_nonhkip',
  'CN_5_Daily_nonhkip',
  'CN_10_Daily_nonhkip',
  'CN_1_7_nonhkip',
  'CN_3_15_nonhkip',
  'CN_5_30_nonhkip',
  'CN_10_30_nonhkip',
  'CN_20_30_nonhkip',
  'CN_50_30_nonhkip',
] as const;
const PUBLIC_PLAN_NAME_MAP: Record<string, string> = {
  CN_1_Daily_1Mbps_nonhkip: '1GB / 1Mbps Unlimited',
  CN_2_Daily_1Mbps_nonhkip: '2GB / 1Mbps Unlimited',
  CN_3_Daily_1Mbps_nonhkip: '3GB / 1Mbps Unlimited',
  CN_5_Daily_nonhkip: '5GB / 384 Kbps Unlimited',
  CN_10_Daily_nonhkip: '10GB / 384 Kbps Unlimited',
  CN_1_7_nonhkip: '1GB / 7 Days',
  CN_3_15_nonhkip: '3GB / 15 Days',
  CN_5_30_nonhkip: '5GB / 30 Days',
  CN_10_30_nonhkip: '10GB / 30 Days',
  CN_20_30_nonhkip: '20GB / 30 Days',
  CN_50_30_nonhkip: '50GB / 30 Days',
};
const formatVndFromUsd = (amountUsd: number) =>
  `${moneyVnd.format(Math.max(0, Math.round((amountUsd * USD_TO_VND) / 1000) * 1000))}đ`;

const formatVndAmount = (amountVnd: number) => `${moneyVnd.format(Math.max(0, Math.round(amountVnd / 1000) * 1000))}đ`;
const resolveAssetUrl = (context: RenderContext, value: string | null | undefined, fallback = '') => {
  const raw = (value || fallback || '').trim();
  if (!raw) return '';
  try {
    return new URL(raw, context.siteUrl).toString();
  } catch {
    return raw;
  }
};
const parseAssetUrlList = (value: string | null | undefined) =>
  String(value || '')
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
const getHomeHeroBannerUrls = (context: RenderContext) => {
  const urls = [
    context.homeHeroBannerUrl,
    ...parseAssetUrlList(context.homeHeroBannerGalleryUrls),
  ]
    .map((value) => resolveAssetUrl(context, value))
    .filter(Boolean);

  return [...new Set(urls)];
};
const toBackgroundImageStyle = (context: RenderContext, value: string | null | undefined) => {
  const assetUrl = resolveAssetUrl(context, value);
  if (!assetUrl) return '';
  return ` style="background-image:url('${escapeHtml(encodeURI(assetUrl).replaceAll("'", '%27'))}')"`;
};
const toBackgroundImageVarStyle = (context: RenderContext, value: string | null | undefined, varName: string) => {
  const assetUrl = resolveAssetUrl(context, value);
  if (!assetUrl) return '';
  return ` style="${escapeHtml(varName)}:url('${escapeHtml(encodeURI(assetUrl).replaceAll("'", '%27'))}')"`;
};
const hasCustomLogo = (context: RenderContext) => Boolean(resolveAssetUrl(context, context.logoUrl));
const renderBrandMark = (context: RenderContext, mode: 'default' | 'footer' = 'default') => {
  const logoUrl = resolveAssetUrl(context, context.logoUrl);
  if (!logoUrl) {
    return mode === 'footer' ? '' : '<span class="brand-mark">e</span>';
  }

  return `<img class="brand-mark-image brand-mark-plain" src="${escapeHtml(logoUrl)}" alt="${escapeHtml(context.siteName)}" loading="eager" decoding="async" />`;
};
const renderRoseBrandMark = (context: RenderContext) => {
  const logoUrl = resolveAssetUrl(context, context.logoUrl);
  if (!logoUrl) {
    return renderMobileIcon('sim');
  }

  return `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(context.siteName)}" loading="eager" decoding="async" />`;
};
const renderMobileBrandImage = (context: RenderContext, className: string) => {
  const logoUrl = resolveAssetUrl(context, context.logoUrl);
  if (!logoUrl) {
    return '';
  }

  return `<img class="${escapeHtml(className)}" src="${escapeHtml(logoUrl)}" alt="${escapeHtml(context.siteName)}" loading="eager" decoding="async" />`;
};
const parseVndLabelToAmount = (value: string | null | undefined) => {
  if (!value) return null;
  const digits = value.replace(/[^\d]/g, '');
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : null;
};
const formatSignedVndAmount = (amountVnd: number) => `${amountVnd >= 0 ? '+' : '-'}${formatVndAmount(Math.abs(amountVnd))}`;
const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';
const slugifyPublicText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const formatDateTimeLabel = (value: string | null | undefined) =>
  value
    ? new Date(value).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: VIETNAM_TIMEZONE,
      })
    : '';
const getSourcePlanPriceUsd = (plan: Plan) => plan.sourcePriceUsd ?? plan.priceUsd;

const STYLE_VERSION = '20260424-04';

const getMobileDaySliderProgress = (days: number, maxDays = DAY_PASS_MAX_DAYS) => {
  const safeDays = Math.max(1, Math.min(maxDays, Math.round(days)));
  if (maxDays <= 7) {
    return ((safeDays - 1) / Math.max(maxDays - 1, 1)) * 100;
  }

  if (maxDays <= 15) {
    if (safeDays <= 7) {
      return ((safeDays - 1) / 6) * 68;
    }

    return 68 + ((safeDays - 7) / Math.max(maxDays - 7, 1)) * 32;
  }

  if (maxDays <= 30) {
    if (safeDays <= 7) {
      return ((safeDays - 1) / 6) * 68;
    }

    if (safeDays <= 15) {
      return 68 + ((safeDays - 7) / 8) * 14;
    }

    return 82 + ((safeDays - 15) / Math.max(maxDays - 15, 1)) * 18;
  }

  if (safeDays <= 7) {
    return ((safeDays - 1) / 6) * 68;
  }

  if (safeDays <= 15) {
    return 68 + ((safeDays - 7) / 8) * 14;
  }

  if (safeDays <= 30) {
    return 82 + ((safeDays - 15) / 15) * 10;
  }

  return 92 + ((safeDays - 30) / Math.max(maxDays - 30, 1)) * 8;
};

const getMobileDayScaleValues = (type: string, maxDays = DAY_PASS_MAX_DAYS, availableDays: number[] = []) => {
  const baseValues =
    type === 'reset'
      ? [1, 3, 5, 7, 15, 30, DAY_PASS_MAX_DAYS]
      : availableDays.length > 0
        ? availableDays
        : [maxDays];

  return Array.from(
    new Set(
      baseValues
        .map((value) => Math.max(1, Math.min(maxDays, value)))
        .filter((value, index, array) => value > 0 && array.indexOf(value) === index),
    ),
  ).sort((left, right) => left - right);
};

const getMobileDayScaleProgress = (value: number, type: string, maxDays = DAY_PASS_MAX_DAYS, availableDays: number[] = []) => {
  if (type === 'reset') {
    return getMobileDaySliderProgress(value, maxDays);
  }

  const dayValues = getMobileDayScaleValues(type, maxDays, availableDays);
  const selectedIndex = Math.max(dayValues.indexOf(value), 0);
  return dayValues.length <= 1 ? 100 : (selectedIndex / Math.max(dayValues.length - 1, 1)) * 100;
};

const renderMobileDayScaleMarks = (type: string, maxDays = DAY_PASS_MAX_DAYS, availableDays: number[] = []) =>
  getMobileDayScaleValues(type, maxDays, availableDays)
    .map(
      (value) => `
          <span class="mobile-app-day-scale-mark" style="--day-mark-progress: ${getMobileDayScaleProgress(value, type, maxDays, availableDays)}%">${value}</span>`,
    )
    .join('');

const renderMobileIcon = (
  name:
    | 'bolt'
    | 'qr'
    | 'globe'
    | 'headset'
    | 'phone'
    | 'mail'
    | 'home'
    | 'grid'
    | 'file'
    | 'book'
    | 'shield'
    | 'gear'
    | 'arrow-right'
    | 'spark'
    | 'cart'
    | 'sim'
    | 'tiktok'
    | 'google'
    | 'gmail'
    | 'maps'
    | 'facebook'
    | 'apps',
) => {
  switch (name) {
    case 'bolt':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.1 2.4 6.8 12.2h3.7l-.8 9.4 7.5-10.9h-4.1V2.4Z" fill="currentColor"/></svg>`;
    case 'qr':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5H4.5V8M18 4.5h1.5V8M6 19.5H4.5V16M18 19.5h1.5V16M9 9h6v6H9z" fill="none" stroke="currentColor" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'globe':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.05"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.5 5.3 3.5 8.5S14.2 18.2 12 20.5M12 3.5c-2.2 2.3-3.5 5.3-3.5 8.5S9.8 18.2 12 20.5" fill="none" stroke="currentColor" stroke-width="2.05" stroke-linecap="round"/></svg>`;
    case 'headset':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 12.8a7.2 7.2 0 0 1 14.4 0M6.2 13h2.3v5.2H7.8A1.6 1.6 0 0 1 6.2 16.6V13Zm9.3 0h2.3v3.6a1.6 1.6 0 0 1-1.6 1.6h-.7V13Z" fill="none" stroke="currentColor" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'phone':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 4.8h9A1.7 1.7 0 0 1 18.2 6.5v11A1.7 1.7 0 0 1 16.5 19.2h-9a1.7 1.7 0 0 1-1.7-1.7v-11A1.7 1.7 0 0 1 7.5 4.8Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M10 7.8h4M11 16.2h2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`;
    case 'mail':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7.5 12 13l7.5-5.5V18a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V7.5Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M4.5 8 12 13.5 19.5 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 18V7l7.5 5.6L19.5 7v11" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`;
    case 'home':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 10.2 12 4l7.5 6.2V19a1 1 0 0 1-1 1H14v-5h-4v5H5.5a1 1 0 0 1-1-1v-8.8Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`;
    case 'grid':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`;
    case 'file':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3.8h5l4 4V20a1.2 1.2 0 0 1-1.2 1.2H8A1.2 1.2 0 0 1 6.8 20V5A1.2 1.2 0 0 1 8 3.8Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M10 12h4M10 16h4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`;
    case 'book':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5.2h8.6a2.4 2.4 0 0 1 2.4 2.4v11H8.4A2.4 2.4 0 0 0 6 21V5.2Zm0 0A2.2 2.2 0 0 0 3.8 7.4V19A2.2 2.2 0 0 0 6 21" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M9.2 9h5.2M9.2 12.4h5.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`;
    case 'shield':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5.5 6v5.2c0 4.1 2.6 7.8 6.5 9.3 3.9-1.5 6.5-5.2 6.5-9.3V6L12 3Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="m8.8 12 2 2 4.4-4.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'gear':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Zm8.2 3.4-1.8-.5a6.8 6.8 0 0 0-.5-1.3l1-1.6-1.8-1.8-1.6 1a6.8 6.8 0 0 0-1.3-.5l-.5-1.8h-2.6l-.5 1.8a6.8 6.8 0 0 0-1.3.5l-1.6-1-1.8 1.8 1 1.6c-.2.4-.4.9-.5 1.3l-1.8.5v2.6l1.8.5c.1.5.3.9.5 1.3l-1 1.6 1.8 1.8 1.6-1c.4.2.9.4 1.3.5l.5 1.8h2.6l.5-1.8c.5-.1.9-.3 1.3-.5l1.6 1 1.8-1.8-1-1.6c.2-.4.4-.8.5-1.3l1.8-.5V12Z" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'arrow-right':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'spark':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Zm7 13 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" fill="currentColor"/></svg>`;
    case 'cart':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5h2l2 9.5h9.6L20.5 8H7.1M9 19a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 9 19Zm8 0a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'sim':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h5l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 11h4M10 15h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
    case 'tiktok':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 3.5c.5 2.1 1.9 3.5 4 3.9v2.4c-1.3 0-2.5-.4-3.6-1v5.4a4.6 4.6 0 1 1-4.6-4.6c.3 0 .7 0 1 .1v2.5a2.2 2.2 0 1 0 1.2 2V3.5h2.0Z" fill="currentColor"/></svg>`;
    case 'google':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12.2c0-.6-.1-1.1-.2-1.6H12v3h4.5a3.9 3.9 0 0 1-1.7 2.6v2.2h2.7c1.6-1.5 2.5-3.7 2.5-6.2Z" fill="currentColor"/><path d="M12 20.2c2.2 0 4-.7 5.4-1.9l-2.7-2.2c-.7.5-1.6.9-2.7.9-2.1 0-3.8-1.4-4.5-3.2H4.7v2.3A8.2 8.2 0 0 0 12 20.2Z" fill="currentColor"/><path d="M7.5 13.8a4.8 4.8 0 0 1 0-3.1V8.4H4.7a8.2 8.2 0 0 0 0 7.7l2.8-2.3Z" fill="currentColor"/><path d="M12 7.1c1.2 0 2.3.4 3.1 1.2l2.3-2.3A8.1 8.1 0 0 0 4.7 8.4l2.8 2.3c.7-1.8 2.4-3.2 4.5-3.2Z" fill="currentColor"/></svg>`;
    case 'gmail':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7.5 12 13l7.5-5.5V18a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V7.5Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M4.5 8 12 13.5 19.5 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 18V7l7.5 5.6L19.5 7v11" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`;
    case 'maps':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.2s5.2-5.1 5.2-9.4A5.2 5.2 0 1 0 6.8 10.8c0 4.3 5.2 9.4 5.2 9.4Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="12" cy="10.6" r="2.1" fill="currentColor"/></svg>`;
    case 'facebook':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 20v-6h2.2l.3-2.6h-2.5V9.8c0-.8.2-1.4 1.4-1.4H16V6.1c-.4-.1-1.3-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v1.4H7.8V14H9.9v6h3.6Z" fill="currentColor"/></svg>`;
    case 'apps':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h3v3H7V7Zm7 0h3v3h-3V7ZM7 14h3v3H7v-3Zm7 0h3v3h-3v-3Z" fill="currentColor"/></svg>`;
  }
};

const fullUrl = (siteUrl: string, path: string) => new URL(path, siteUrl).toString();
const SOCIAL_IMAGE_PATH = '/og/home.jpg';

const getPlanPublicHandle = (plan: Plan) => {
  const bits = ['trung quoc', plan.dataAllowance.replace('/ngày', ' moi ngay').replace('/', ' ')];
  if (plan.periodRequired || plan.dataType === 2) {
    bits.push('theo ngay');
  } else if (plan.durationDays && plan.durationDays > 0) {
    bits.push(`${plan.durationDays} ngay`);
  }
  if (plan.fupPolicy?.includes('1 Mbps')) {
    bits.push('1mbps');
  }
  if (plan.ipExport) {
    bits.push(plan.ipExport);
  }
  return slugifyPublicText(bits.join(' '));
};
const getPublicPlanName = (plan: Plan) => PUBLIC_PLAN_NAME_MAP[plan.slug] ?? plan.name;
const getDayPassBaseDataLabel = (planLike?: { dataAllowance?: string | null; data?: string | null } | null) =>
  String(planLike?.dataAllowance ?? planLike?.data ?? '')
    .replace(/\/ngày/gi, '')
    .trim();
const getDayPassSummaryName = (
  planLike?: { dataAllowance?: string | null; data?: string | null; periodRequired?: boolean | null } | null,
  days?: number | null,
) => {
  const safeDays = Math.max(1, Math.round(Number(days ?? 1) || 1));
  const baseData = getDayPassBaseDataLabel(planLike);
  if (!baseData) {
    return `${safeDays} ngày / Unlimited không bị cắt mạng`;
  }
  return `${baseData} / ${safeDays} ngày / Unlimited không bị cắt mạng`;
};
const getDayPassCompactName = (
  planLike?: { dataAllowance?: string | null; data?: string | null; periodRequired?: boolean | null } | null,
  days?: number | null,
) => {
  const safeDays = Math.max(1, Math.round(Number(days ?? 1) || 1));
  const baseData = getDayPassBaseDataLabel(planLike);
  if (!baseData) {
    return `${safeDays} ngày`;
  }
  return `${baseData} / ${safeDays} ngày`;
};

const buildPurchasePath = (planRef?: Plan | string | null, periodNum?: number | null, quantity?: number | null) => {
  const params = new URLSearchParams();
  const path = typeof planRef === 'string' || !planRef ? '/mua-goi' : `/mua-goi/${encodeURIComponent(getPlanPublicHandle(planRef))}`;
  if (typeof planRef === 'string' && planRef) {
    params.set('plan', planRef);
  }
  if (typeof periodNum === 'number' && Number.isFinite(periodNum) && periodNum > 0) {
    params.set('period', String(Math.round(periodNum)));
  }
  if (typeof quantity === 'number' && Number.isFinite(quantity) && quantity > 1) {
    params.set('quantity', String(Math.max(1, Math.min(99, Math.round(quantity)))));
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
};

const withAccessToken = (path: string, accessToken?: string) => {
  if (!accessToken) {
    return path;
  }
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}t=${encodeURIComponent(accessToken)}`;
};

const buildPaymentSuccessPath = (reference: string, accessToken?: string) =>
  withAccessToken(`/thanh-toan-thanh-cong/${reference}`, accessToken);
const buildPaymentPath = (reference: string, accessToken?: string) => withAccessToken(`/thanh-toan/${reference}`, accessToken);
const getVisiblePlans = (planList: Plan[]) => planList.filter((plan) => !plan.hiddenFromCatalog);
const getManagedPublicPlans = (planList: Plan[]) =>
  PUBLIC_CATALOG_PLAN_SLUGS.map((slug) => planList.find((plan) => plan.slug === slug)).filter((plan): plan is Plan => plan != null);
const buildAppleEsimInstallUrl = (activationCode: string) =>
  `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${encodeURIComponent(activationCode)}`;
const buildAndroidEsimInstallUrl = (activationCode: string) =>
  `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=${encodeURIComponent(activationCode)}`;

const buildDemoEsimQrSrc = (reference: string) => {
  const size = 21;
  const cell = 12;
  const padding = 18;
  let seed = 0;

  for (const char of reference) {
    seed = (seed * 131 + char.charCodeAt(0)) % 2147483647;
  }

  const next = () => {
    seed = (seed * 1103515245 + 12345) % 2147483647;
    return seed / 2147483647;
  };

  const isFinderCell = (x: number, y: number, originX: number, originY: number) =>
    x >= originX &&
    x < originX + 7 &&
    y >= originY &&
    y < originY + 7 &&
    (x === originX ||
      x === originX + 6 ||
      y === originY ||
      y === originY + 6 ||
      ((x >= originX + 2 && x <= originX + 4) && (y >= originY + 2 && y <= originY + 4)));

  const isReservedCell = (x: number, y: number) =>
    isFinderCell(x, y, 0, 0) || isFinderCell(x, y, size - 7, 0) || isFinderCell(x, y, 0, size - 7);

  const rects: string[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const inFinder = isReservedCell(x, y);
      const shouldFill = inFinder || next() > 0.52 || ((x + y) % 7 === 0 && next() > 0.35);
      if (!shouldFill) continue;
      rects.push(
        `<rect x="${padding + x * cell}" y="${padding + y * cell}" width="${cell}" height="${cell}" rx="1.8" fill="${
          inFinder ? '#101010' : '#2a2a2a'
        }"/>`,
      );
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size * cell + padding * 2}" height="${
    size * cell + padding * 2
  }" viewBox="0 0 ${size * cell + padding * 2} ${size * cell + padding * 2}" fill="none"><rect width="${
    size * cell + padding * 2
  }" height="${size * cell + padding * 2}" rx="28" fill="#fff"/><rect x="8" y="8" width="${
    size * cell + padding * 2 - 16
  }" height="${size * cell + padding * 2 - 16}" rx="22" fill="#fffdfb" stroke="#f1dbcf"/><g>${rects.join(
    '',
  )}</g></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const buildDemoActivationCode = (reference: string) => `LPA:1$demo.esimcn.net$${reference.replace(/[^A-Z0-9]/g, '')}`;
const buildDemoIccid = (reference: string) => `898600${reference.replace(/[^A-Z0-9]/g, '').padEnd(14, '7').slice(0, 14)}`;

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const jsonLd = (value: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(value).replaceAll('<', '\\u003c')}</script>`;

const pageScript = `
(() => {
  const apiUrl = (path) => new URL(path, window.location.origin).toString();
  const withAccessToken = (path, accessToken) => {
    if (!accessToken) return path;
    const separator = path.includes('?') ? '&' : '?';
    return path + separator + 't=' + encodeURIComponent(accessToken);
  };
  const buildPaymentSuccessPath = (reference, accessToken) => withAccessToken('/thanh-toan-thanh-cong/' + reference, accessToken);
  const reveal = document.querySelectorAll('.reveal');
  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    reveal.forEach((node, index) => {
      node.style.transitionDelay = Math.min(index * 28, 220) + 'ms';
      observer.observe(node);
    });
  } else {
    reveal.forEach((node, index) => {
      node.style.transitionDelay = Math.min(index * 28, 220) + 'ms';
      node.classList.add('is-visible');
    });
  }

  const form = document.querySelector('[data-order-form]');
  const status = document.querySelector('[data-form-status]');
  const planSelect = document.querySelector('select[name="planSlug"]');
  const periodField = document.querySelector('[data-period-field]');
  const periodInput = document.querySelector('input[name="periodNum"]');
  const fullNameInput = document.querySelector('input[name="fullName"]');
  const phoneInput = document.querySelector('input[name="phone"]');
  const emailInput = document.querySelector('input[name="email"]');
  const emailSuggestionList = document.querySelector('[data-email-suggestions]');
  const confirmOrderInput = document.querySelector('input[name="confirmOrder"]');
  const planChoices = Array.from(document.querySelectorAll('[data-plan-choice]'));
  const selectedPrices = Array.from(document.querySelectorAll('[data-selected-price]'));
  const selectedNames = Array.from(document.querySelectorAll('[data-selected-name]'));
  const selectedMetas = Array.from(document.querySelectorAll('[data-selected-meta]'));
  const selectedDataStats = Array.from(document.querySelectorAll('[data-selected-data]'));
  const selectedDayStats = Array.from(document.querySelectorAll('[data-selected-days]'));
  const mobilePickerPrices = Array.from(document.querySelectorAll('[data-mobile-picker-price]'));
  const mobilePickerNames = Array.from(document.querySelectorAll('[data-mobile-picker-name]'));
  const mobilePickerMetas = Array.from(document.querySelectorAll('[data-mobile-picker-meta]'));
  const mobilePickerData = Array.from(document.querySelectorAll('[data-mobile-picker-data]'));
  const mobilePickerDataHeadings = Array.from(document.querySelectorAll('[data-mobile-picker-data-heading]'));
  const mobilePickerDataNote = Array.from(document.querySelectorAll('[data-mobile-picker-data-note]'));
  const mobilePickerDays = Array.from(document.querySelectorAll('[data-mobile-picker-days]'));
  const mobilePickerType = Array.from(document.querySelectorAll('[data-mobile-picker-type]'));
  const mobilePickerNote = Array.from(document.querySelectorAll('[data-mobile-picker-note]'));
  const mobilePickerTikTok = Array.from(document.querySelectorAll('[data-mobile-picker-tiktok]'));
  const mobilePickerUnlimited = Array.from(document.querySelectorAll('[data-mobile-picker-unlimited]'));
  const mobilePickerTopup = Array.from(document.querySelectorAll('[data-mobile-picker-topup]'));
  const mobilePickerSupport = Array.from(document.querySelectorAll('[data-mobile-picker-support]'));
  const mobilePickerDaysNote = Array.from(document.querySelectorAll('[data-mobile-picker-days-note]'));
  const mobileTypeOptions = Array.from(document.querySelectorAll('[data-mobile-type-option]'));
  const mobileDayStepButtons = Array.from(document.querySelectorAll('[data-mobile-day-step]'));
  const mobileDayShortcutWrap = document.querySelector('[data-mobile-day-shortcuts]');
  const mobileDayBubble = document.querySelector('[data-mobile-day-bubble]');
  const mobileDataBubble = document.querySelector('[data-mobile-data-bubble]');
  const mobileDaysInput = document.querySelector('[data-mobile-days-input]');
  const mobileDayRange = document.querySelector('[data-mobile-days-range]');
  const mobileDayScale = document.querySelector('[data-mobile-day-scale]');
  const mobileDataRange = document.querySelector('[data-mobile-data-range]');
  const mobileDataScale = document.querySelector('[data-mobile-data-scale]');
  const mobilePickerCta = document.querySelector('[data-mobile-picker-cta]');
  const mobileBuyButton = document.querySelector('.mobile-buy-button');
  const paymentReferenceNode = document.querySelector('[data-payment-reference]');
  const paymentConfirmState = document.querySelector('[data-payment-confirm-state]');
  const paymentStatusLabels = Array.from(document.querySelectorAll('[data-payment-status-label]'));
  const paymentStatusNotes = Array.from(document.querySelectorAll('[data-payment-status-note]'));
  const paymentLoading = document.querySelector('[data-payment-loading]');
  const paymentWaitButton = document.querySelector('[data-payment-wait-button]');
  const paymentWaitingCard = document.querySelector('[data-payment-waiting-card]');
  const paymentWaitingText = document.querySelector('[data-payment-waiting-text]');
  const paymentSuccessReferenceNode = document.querySelector('[data-esim-reference]');
  const paymentSuccessState = document.querySelector('[data-esim-status-note]');
  const paymentUsageButton = document.querySelector('[data-esim-usage-button]');
  const paymentUsageCard = document.querySelector('[data-esim-usage-card]');
  const paymentUsageBody = document.querySelector('[data-esim-usage-body]');
  const paymentTopupButton = document.querySelector('[data-esim-topup-button]');
  const paymentTopupCard = document.querySelector('[data-esim-topup-card]');
  const paymentTopupBody = document.querySelector('[data-esim-topup-body]');
  const detectInstallPlatform = () => {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const touchPoints = typeof navigator.maxTouchPoints === 'number' ? navigator.maxTouchPoints : 0;
    if (/Android/i.test(ua)) return 'android';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    if (platform === 'MacIntel' && touchPoints > 1) return 'ios';
    return 'other';
  };
  const mobilePlans = Array.from(document.querySelectorAll('[data-mobile-plan-catalog]')).map((node) => ({
    slug: node.getAttribute('data-plan-target') || '',
    handle: node.getAttribute('data-plan-handle') || '',
    name: node.getAttribute('data-plan-name') || '',
    price: node.getAttribute('data-plan-price') || '',
    priceUsd: Number.parseFloat(node.getAttribute('data-plan-price-usd') || '0'),
    meta: node.getAttribute('data-plan-meta') || '',
    data: node.getAttribute('data-plan-data') || '',
    dataMb: Number.parseFloat(node.getAttribute('data-plan-data-mb') || '0'),
    days: node.getAttribute('data-plan-days') || '',
    dayValue: Number.parseInt(node.getAttribute('data-plan-day-value') || '0', 10),
    type: node.getAttribute('data-plan-type') || '',
    variant: node.getAttribute('data-plan-variant') || '',
    variantDetail: node.getAttribute('data-plan-variant-detail') || '',
    route: node.getAttribute('data-plan-route') || '',
    fup: node.getAttribute('data-plan-fup') || '',
    topup: node.getAttribute('data-plan-topup') === 'true',
  }));
  const mobileBuyBar = document.querySelector('.mobile-buy-bar');
  const mobileAppShell = document.querySelector('.mobile-app-shell');
  const moneyVnd = new Intl.NumberFormat('vi-VN');
  const checkoutContactStorageKey = 'esimcn:checkout-contact:v1';
  const emailSuggestionDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'yahoo.com'];
  let mobileDayBubbleTimer = 0;
  let mobileDataBubbleTimer = 0;
  let persistContactTimer = 0;
  let emailSuggestionHideTimer = 0;

  const setMobilePickerGroupActive = (bubble, active) => {
    if (!(bubble instanceof HTMLElement)) return;
    const group = bubble.closest('.mobile-app-picker-group');
    if (group instanceof HTMLElement) {
      group.classList.toggle('is-active', active);
    }
  };

  const syncText = (nodes, value) => {
    nodes.forEach((node) => {
      node.textContent = value;
    });
  };

  const escapeText = (value) =>
    String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  const getStoredCheckoutContact = () => {
    try {
      const rawValue = window.localStorage.getItem(checkoutContactStorageKey);
      if (!rawValue) return null;
      const parsed = JSON.parse(rawValue);
      if (!parsed || typeof parsed !== 'object') return null;
      return {
        fullName: String(parsed.fullName ?? '').trim(),
        phone: String(parsed.phone ?? '').trim(),
        email: String(parsed.email ?? '').trim(),
      };
    } catch (_error) {
      return null;
    }
  };

  const persistCheckoutContact = () => {
    try {
      const payload = {
        fullName: fullNameInput instanceof HTMLInputElement ? fullNameInput.value.trim() : '',
        phone: phoneInput instanceof HTMLInputElement ? phoneInput.value.trim() : '',
        email: emailInput instanceof HTMLInputElement ? emailInput.value.trim() : '',
      };

      if (!payload.fullName && !payload.phone && !payload.email) {
        window.localStorage.removeItem(checkoutContactStorageKey);
        return;
      }

      window.localStorage.setItem(checkoutContactStorageKey, JSON.stringify(payload));
    } catch (_error) {
      return;
    }
  };

  const queuePersistCheckoutContact = () => {
    window.clearTimeout(persistContactTimer);
    persistContactTimer = window.setTimeout(() => {
      persistCheckoutContact();
    }, 180);
  };

  const applyStoredCheckoutContact = () => {
    const storedContact = getStoredCheckoutContact();
    if (!storedContact) return;

    if (fullNameInput instanceof HTMLInputElement && !fullNameInput.value.trim() && storedContact.fullName) {
      fullNameInput.value = storedContact.fullName;
    }

    if (phoneInput instanceof HTMLInputElement && !phoneInput.value.trim() && storedContact.phone) {
      phoneInput.value = storedContact.phone;
    }

    if (emailInput instanceof HTMLInputElement && !emailInput.value.trim() && storedContact.email) {
      emailInput.value = storedContact.email;
    }
  };

  const hideEmailSuggestions = () => {
    if (!(emailSuggestionList instanceof HTMLElement)) return;
    emailSuggestionList.hidden = true;
    emailSuggestionList.innerHTML = '';
  };

  const renderEmailSuggestions = () => {
    if (!(emailInput instanceof HTMLInputElement) || !(emailSuggestionList instanceof HTMLElement)) {
      return;
    }

    const rawValue = emailInput.value.trim();
    if (!rawValue || /\s/.test(rawValue)) {
      hideEmailSuggestions();
      return;
    }

    const atMatches = rawValue.match(/@/g) || [];
    if (atMatches.length > 1) {
      hideEmailSuggestions();
      return;
    }

    const hasAt = rawValue.includes('@');
    const [rawLocalPart, rawDomainPart = ''] = hasAt ? rawValue.split('@') : [rawValue, ''];
    const localPart = rawLocalPart.trim();
    const domainPart = rawDomainPart.trim().toLowerCase();

    if (!localPart) {
      hideEmailSuggestions();
      return;
    }

    const suggestions = emailSuggestionDomains
      .filter((domain) => (!hasAt ? true : domain.startsWith(domainPart)))
      .map((domain) => localPart + '@' + domain)
      .filter((value, index, items) => items.indexOf(value) === index)
      .filter((value) => value.toLowerCase() !== rawValue.toLowerCase())
      .slice(0, 4);

    if (!suggestions.length) {
      hideEmailSuggestions();
      return;
    }

    emailSuggestionList.innerHTML = suggestions
      .map(
        (value) =>
          '<button class="checkout-email-suggestion" type="button" data-email-suggestion="' +
          escapeText(value) +
          '">' +
          escapeText(value) +
          '</button>',
      )
      .join('');
    emailSuggestionList.hidden = false;
  };

  const formatVnd = (amountVnd) => {
    const safeValue = Math.max(0, Math.round(amountVnd / 1000) * 1000);
    return moneyVnd.format(safeValue) + 'đ';
  };

  const getDayPassBaseDataLabel = (planLike) =>
    String(planLike?.dataAllowance ?? planLike?.data ?? '')
      .replace(/\\/ngày/gi, '')
      .trim();

  const getDayPassSummaryName = (planLike, days) => {
    const safeDays = Math.max(1, Math.round(Number(days ?? 1) || 1));
    const baseData = getDayPassBaseDataLabel(planLike);
    if (!baseData) {
      return safeDays + ' ngày / Unlimited không bị cắt mạng';
    }
    return baseData + ' / ' + safeDays + ' ngày / Unlimited không bị cắt mạng';
  };

  const stripTopupMeta = (value) =>
    String(value ?? '')
      .replace(/\s*·\s*Có thể nạp thêm data/gi, '')
      .replace(/\s*·\s*Có thể mua thêm dung lượng trong quá trình sử dụng/gi, '')
      .trim();

  const getPrimaryMetaLine = (value) => stripTopupMeta(String(value ?? '').split('·')[0] || '');
  const hasTikTokMeta = (value) => /tiktok/i.test(String(value ?? ''));

  const parseVnd = (value) => {
    const digits = String(value ?? '').replace(/[^0-9]/g, '');
    return Number.parseInt(digits || '0', 10) || 0;
  };

  const clampBulkPercent = (value) => {
    const parsed = Number.parseInt(String(value ?? '').trim(), 10);
    if (!Number.isFinite(parsed)) {
      return 0;
    }

    return Math.max(0, Math.min(500, parsed));
  };

  const syncBulkPercentControl = (control, value) => {
    if (!(control instanceof HTMLElement)) {
      return;
    }

    const range = control.querySelector('[data-bulk-percent-range]');
    const input = control.querySelector('[data-bulk-percent-input]');
    const display = control.querySelector('[data-bulk-percent-display]');
    const safeValue = clampBulkPercent(
      value ?? (input instanceof HTMLInputElement ? input.value : range instanceof HTMLInputElement ? range.value : 0),
    );

    if (range instanceof HTMLInputElement) {
      range.value = String(safeValue);
    }

    if (input instanceof HTMLInputElement) {
      input.value = String(safeValue);
    }

    if (display instanceof HTMLElement) {
      display.textContent = '+' + safeValue + '%';
    }

    control.style.setProperty('--bulk-progress', String((safeValue / 500) * 100) + '%');
  };

  document.querySelectorAll('[data-bulk-percent-control]').forEach((control) => {
    if (!(control instanceof HTMLFormElement)) {
      return;
    }

    const range = control.querySelector('[data-bulk-percent-range]');
    const input = control.querySelector('[data-bulk-percent-input]');
    if (!(range instanceof HTMLInputElement) || !(input instanceof HTMLInputElement)) {
      return;
    }

    syncBulkPercentControl(control);
    range.addEventListener('input', () => syncBulkPercentControl(control, range.value));
    input.addEventListener('input', () => syncBulkPercentControl(control, input.value));
    input.addEventListener('blur', () => syncBulkPercentControl(control, input.value));
    control.addEventListener('submit', () => syncBulkPercentControl(control, input.value));
  });

  const buildCheckoutUrl = (slug, periodNum, quantity, handle) => {
    const params = new URLSearchParams();
    const basePath = handle ? '/mua-goi/' + encodeURIComponent(handle) : '/mua-goi';
    if (!handle && slug) {
      params.set('plan', slug);
    }
    if (typeof periodNum === 'number' && Number.isFinite(periodNum) && periodNum > 0) {
      params.set('period', String(Math.round(periodNum)));
    }
    if (typeof quantity === 'number' && Number.isFinite(quantity) && quantity > 1) {
      params.set('quantity', String(Math.max(1, Math.min(99, Math.round(quantity)))));
    }
    const query = params.toString();
    return query ? basePath + '?' + query : basePath;
  };

  const applyCheckoutUrl = (slug, periodNum, quantity, handle) => {
    const href = buildCheckoutUrl(slug, periodNum, quantity, handle);
    if (mobilePickerCta instanceof HTMLAnchorElement) {
      mobilePickerCta.href = href;
    }
    if (mobileBuyButton instanceof HTMLAnchorElement) {
      mobileBuyButton.href = href;
    }
    return href;
  };

  const showMobileBubble = (bubble, timerKey) => {
    if (!(bubble instanceof HTMLElement)) return;
    bubble.classList.add('is-visible');
    setMobilePickerGroupActive(bubble, true);
    if (timerKey === 'day') {
      window.clearTimeout(mobileDayBubbleTimer);
      mobileDayBubbleTimer = window.setTimeout(() => {
        bubble.classList.remove('is-visible');
        setMobilePickerGroupActive(bubble, false);
      }, 1100);
      return;
    }

    window.clearTimeout(mobileDataBubbleTimer);
    mobileDataBubbleTimer = window.setTimeout(() => {
      bubble.classList.remove('is-visible');
      setMobilePickerGroupActive(bubble, false);
    }, 1100);
  };

  const getDayPassDiscount = (days) => {
    return { rate: 0, label: 'Chưa giảm giá' };
  };

  const buildDayPassQuote = (plan, days) => {
    const safeDays = Math.max(1, Math.min(365, Number.parseInt(String(days || 0), 10) || 1));
    const discount = getDayPassDiscount(safeDays);
    const totalUsd = plan.priceUsd * safeDays * (1 - discount.rate);
    return {
      days: safeDays,
      price: formatVnd(totalUsd * 26000),
      name: getDayPassSummaryName({ data: plan.data, dataAllowance: plan.dataAllowance }, safeDays),
      meta: plan.variantDetail || 'TikTok / Google / Gmail / Maps / Facebook',
      discountLabel: discount.label,
    };
  };

  const getPlanPayload = (node) => {
    if (!node) return null;
    return {
      slug: node.getAttribute('data-plan-target') || node.getAttribute('value') || '',
      handle: node.getAttribute('data-plan-handle') || '',
      price: node.getAttribute('data-plan-price') || '',
      priceUsd: Number.parseFloat(node.getAttribute('data-plan-price-usd') || '0'),
      name: node.getAttribute('data-plan-name') || '',
      meta: node.getAttribute('data-plan-meta') || '',
      data: node.getAttribute('data-plan-data') || '',
      days: node.getAttribute('data-plan-days') || '',
      periodRequired: node.getAttribute('data-period-required') === 'true',
      fup: node.getAttribute('data-plan-fup') || '',
      type: node.getAttribute('data-plan-type') || '',
      variant: node.getAttribute('data-plan-variant') || '',
      variantDetail: node.getAttribute('data-plan-variant-detail') || '',
      topup: node.getAttribute('data-plan-topup') === 'true',
    };
  };

  const getMobileMaxDays = (type = getCurrentMobileType()) => {
    if (type === 'reset') {
      return 365;
    }

    const dayOptions = getMobileDayOptions(type);
    return Math.max(1, dayOptions[dayOptions.length - 1] || 1);
  };

  const clampMobileDay = (value, type = getCurrentMobileType()) => {
    const parsed = Number.parseInt(String(value || '0'), 10);
    if (type === 'reset') {
      const maxDays = getMobileMaxDays(type);
      if (!Number.isFinite(parsed)) {
        return Math.min(7, maxDays);
      }
      return Math.max(1, Math.min(maxDays, parsed));
    }

    const dayOptions = getMobileDayOptions(type);
    if (dayOptions.length === 0) {
      return 1;
    }

    if (!Number.isFinite(parsed)) {
      return dayOptions[0];
    }

    return dayOptions.find((day) => day >= parsed) || dayOptions[dayOptions.length - 1];
  };

  const getMobileDayTarget = (value, type = getCurrentMobileType()) => clampMobileDay(value, type);

  const getMobilePlansByType = (type) =>
    mobilePlans
      .filter((plan) => plan.type === type)
      .sort(
        (left, right) =>
          (left.dayValue || 0) - (right.dayValue || 0) ||
          left.dataMb - right.dataMb ||
          left.priceUsd - right.priceUsd,
      );

  const getMobileDayOptions = (type = getCurrentMobileType()) => {
    if (type === 'reset') {
      return [];
    }

    return Array.from(
      new Set(
        getMobilePlansByType(type)
          .map((plan) => plan.dayValue || 0)
          .filter((value) => Number.isFinite(value) && value > 0),
      ),
    ).sort((left, right) => left - right);
  };

  const getMobileTypeLabel = (type) => {
    if (type === 'reset') return 'Theo ngày';
    if (type === 'total') return 'Trọn gói';
    return 'Không giới hạn';
  };

  const getMobileDayScaleValues = (type, maxDays = getMobileMaxDays(type)) => {
    if (type === 'reset') {
      return Array.from(new Set([1, 3, 5, 7, 15, 30, 365].map((value) => Math.max(1, Math.min(maxDays, value))))).sort((left, right) => left - right);
    }

    return getMobileDayOptions(type);
  };

  const getMobileDataHeading = (type) => (type === 'reset' ? 'GB / ngày' : 'Dung lượng');

  const getMobileDaysGuide = (type = getCurrentMobileType()) => {
    if (type === 'reset') {
      return 'Điền số ngày, bấm nhanh hoặc kéo để chọn số ngày sử dụng.';
    }

    const dayOptions = getMobileDayOptions(type);
    if (dayOptions.length === 0) {
      return 'Chỉ chọn được các mốc ngày có sẵn trong catalog.';
    }

    return 'Chỉ có sẵn mốc ' + dayOptions.join(' / ') + ' ngày.';
  };

  const getMobileDayProgress = (days, maxDays = 365) => {
    const safeDays = Math.max(1, Math.min(maxDays, Math.round(Number.parseFloat(String(days || '1')) || 1)));

    if (maxDays <= 7) {
      return ((safeDays - 1) / Math.max(maxDays - 1, 1)) * 100;
    }

    if (maxDays <= 15) {
      if (safeDays <= 7) {
        return ((safeDays - 1) / 6) * 68;
      }

      return 68 + ((safeDays - 7) / Math.max(maxDays - 7, 1)) * 32;
    }

    if (maxDays <= 30) {
      if (safeDays <= 7) {
        return ((safeDays - 1) / 6) * 68;
      }

      if (safeDays <= 15) {
        return 68 + ((safeDays - 7) / 8) * 14;
      }

      return 82 + ((safeDays - 15) / Math.max(maxDays - 15, 1)) * 18;
    }

    if (safeDays <= 7) {
      return ((safeDays - 1) / 6) * 68;
    }

    if (safeDays <= 15) {
      return 68 + ((safeDays - 7) / 8) * 14;
    }

    if (safeDays <= 30) {
      return 82 + ((safeDays - 15) / 15) * 10;
    }

    return 92 + ((safeDays - 30) / Math.max(maxDays - 30, 1)) * 8;
  };

  const getDayFromProgress = (progress, maxDays = 365) => {
    const safeProgress = Math.max(0, Math.min(100, Number.parseFloat(String(progress || '0')) || 0));

    if (maxDays <= 7) {
      return Math.round(1 + (safeProgress / 100) * Math.max(maxDays - 1, 1));
    }

    if (maxDays <= 15) {
      if (safeProgress <= 68) {
        return Math.round(1 + (safeProgress / 68) * 6);
      }

      return Math.round(7 + ((safeProgress - 68) / 32) * Math.max(maxDays - 7, 1));
    }

    if (maxDays <= 30) {
      if (safeProgress <= 68) {
        return Math.round(1 + (safeProgress / 68) * 6);
      }

      if (safeProgress <= 82) {
        return Math.round(7 + ((safeProgress - 68) / 14) * 8);
      }

      return Math.round(15 + ((safeProgress - 82) / 18) * Math.max(maxDays - 15, 1));
    }

    if (safeProgress <= 68) {
      return Math.round(1 + (safeProgress / 68) * 6);
    }

    if (safeProgress <= 82) {
      return Math.round(7 + ((safeProgress - 68) / 14) * 8);
    }

    if (safeProgress <= 92) {
      return Math.round(15 + ((safeProgress - 82) / 10) * 15);
    }

    return Math.round(30 + ((safeProgress - 92) / 8) * Math.max(maxDays - 30, 1));
  };

  const getMobileDayVisualProgress = (dayValue, type = getCurrentMobileType(), maxDays = getMobileMaxDays(type)) => {
    if (type === 'reset') {
      return getMobileDayProgress(dayValue, maxDays);
    }

    const dayOptions = getMobileDayScaleValues(type, maxDays);
    const selectedValue = clampMobileDay(dayValue, type);
    const selectedIndex = Math.max(dayOptions.indexOf(selectedValue), 0);
    return dayOptions.length <= 1 ? 100 : (selectedIndex / Math.max(dayOptions.length - 1, 1)) * 100;
  };

  const getMobileDataGuide = (type, dataLabel, dayValue) => {
    if (type === 'reset') {
      return 'Gói mạng được Reset mỗi ngày vào lúc 00h00.';
    }

    if (type === 'total') {
      return 'Tổng dung lượng ' + dataLabel + ' dùng trong ít nhất ' + dayValue + ' ngày.';
    }

    return 'Gói không giới hạn dùng trong ' + dayValue + ' ngày, theo chính sách FUP của nhà mạng.';
  };

  const getMobileFocusNote = (type) => {
    if (type === 'reset') {
      return 'Giá sẽ đổi theo số ngày sử dụng và mức GB/ngày đang chọn.';
    }

    if (type === 'total') {
      return 'Hệ thống sẽ tự chọn gói trọn rẻ nhất đủ số ngày và dung lượng anh chọn.';
    }

    return 'Đây là gói không giới hạn theo thời hạn và chính sách của nhà mạng.';
  };

  const getMobileDataOptions = (type, dayValue = getCurrentMobileDayValue(type)) => {
    const pool =
      type === 'reset'
        ? getMobilePlansByType(type)
        : (() => {
            const matchedPlans = getMobilePlansByType(type).filter((plan) => (plan.dayValue || 0) >= dayValue);
            return matchedPlans.length > 0 ? matchedPlans : getMobilePlansByType(type);
          })();

    return Array.from(
      new Map(
        pool
          .sort((left, right) => left.dataMb - right.dataMb || left.priceUsd - right.priceUsd)
          .map((plan) => [plan.data, { value: plan.data, label: plan.data, mb: plan.dataMb }]),
      ).values(),
    );
  };

  const updateMobileDayScale = (type) => {
    if (!mobileDayScale) return;
    const maxDays = getMobileMaxDays(type);
    mobileDayScale.innerHTML = getMobileDayScaleValues(type, maxDays)
      .map(
        (value) =>
          '<span class="mobile-app-day-scale-mark" style="--day-mark-progress: ' +
          getMobileDayVisualProgress(value, type, maxDays) +
          '%">' +
          value +
          '</span>',
      )
      .join('');
  };

  const getCurrentMobileType = () =>
    mobileTypeOptions.find((node) => node.classList.contains('is-selected'))?.getAttribute('data-mobile-type-value') || 'reset';

  const getCurrentMobileDataValue = (type) => {
    const options = getMobileDataOptions(type, getCurrentMobileDayValue(type));
    const index = Number.parseInt(mobileDataRange?.value || '0', 10);
    return options[index]?.value || options[0]?.value || '';
  };

  const getCurrentMobileDayValue = (type) => {
    if (!mobileDayRange && !mobileDaysInput) {
      return clampMobileDay(7, type);
    }

    if (mobileDayRange) {
      if (type !== 'reset') {
        const dayOptions = getMobileDayOptions(type);
        const index = Number.parseInt(mobileDayRange.value || '0', 10);
        return dayOptions[Math.max(0, Math.min(dayOptions.length - 1, Number.isFinite(index) ? index : 0))] || clampMobileDay(1, type);
      }

      return clampMobileDay(getDayFromProgress(mobileDayRange.value, getMobileMaxDays(type)), type);
    }

    return clampMobileDay(mobileDaysInput?.value || '1', type);
  };

  const syncMobileTypeState = (type) => {
    mobileTypeOptions.forEach((node) => {
      node.classList.toggle('is-selected', node.getAttribute('data-mobile-type-value') === type);
    });
    syncText(mobilePickerType, getMobileTypeLabel(type));
    syncText(mobilePickerDataHeadings, getMobileDataHeading(type));
  };

  const syncMobileDayShortcuts = (type, selectedDays) => {
    if (!(mobileDayShortcutWrap instanceof HTMLElement)) return;
    const shortcutValues = type === 'reset' ? [1, 2, 3, 4, 5, 6, 7] : getMobileDayOptions(type);
    mobileDayShortcutWrap.hidden = shortcutValues.length === 0;
    mobileDayShortcutWrap.innerHTML = shortcutValues
      .map(
        (day) =>
          '<button class="mobile-app-day-shortcut' +
          (selectedDays === day ? ' is-selected' : '') +
          '" type="button" data-mobile-day-shortcut="' +
          day +
          '">' +
          day +
          ' ngày</button>',
      )
      .join('');
  };

  const updateMobileDataScale = (options, selectedIndex) => {
    if (!mobileDataScale) return;
    mobileDataScale.innerHTML = options
      .map(
        (item, index) =>
          '<span class="' +
          (index === selectedIndex ? 'is-selected' : '') +
          '" data-mobile-data-label data-mobile-data-index="' +
          index +
          '" role="button" tabindex="0" aria-label="Chọn ' +
          item.label +
          '">' +
          item.label +
          '</span>',
      )
      .join('');
  };

  const syncRangeFill = (range, options = {}) => {
    if (!range) return;
    let progress = '0%';
    if (options.kind === 'day') {
      const dayValue = clampMobileDay(options.dayValue ?? getDayFromProgress(range.value, getMobileMaxDays(options.type)), options.type);
      progress = getMobileDayVisualProgress(dayValue, options.type, getMobileMaxDays(options.type)) + '%';
    } else {
      const min = Number.parseFloat(range.min || '0');
      const max = Number.parseFloat(range.max || '1');
      const value = Number.parseFloat(range.value || String(min));
      const ratio = max <= min ? 1 : (value - min) / (max - min);
      progress = Math.max(0, Math.min(1, ratio)) * 100 + '%';
    }
    range.style.setProperty('--range-progress', progress);
    const shell = range.closest('[data-mobile-range-shell]');
    if (shell instanceof HTMLElement) {
      shell.style.setProperty('--range-progress', progress);
    }
  };

  const syncMobileRanges = (type, selectedDays, selectedData) => {
    const safeDays = clampMobileDay(selectedDays, type);
    const dataOptions = getMobileDataOptions(type, safeDays);
    const dataIndex = Math.max(
      dataOptions.findIndex((item) => item.value === selectedData),
      0,
    );
    const dayOptions = getMobileDayScaleValues(type, getMobileMaxDays(type));

    if (mobileDataRange) {
      mobileDataRange.min = '0';
      mobileDataRange.max = String(Math.max(dataOptions.length - 1, 0));
      mobileDataRange.step = '1';
      mobileDataRange.value = String(dataIndex);
      syncRangeFill(mobileDataRange);
    }

    updateMobileDataScale(dataOptions, dataIndex);

    if (mobileDayRange) {
      if (type === 'reset') {
        mobileDayRange.min = '0';
        mobileDayRange.max = '100';
        mobileDayRange.step = '1';
        mobileDayRange.value = String(Math.round(getMobileDayVisualProgress(safeDays, type, getMobileMaxDays(type))));
      } else {
        mobileDayRange.min = '0';
        mobileDayRange.max = String(Math.max(dayOptions.length - 1, 0));
        mobileDayRange.step = '1';
        mobileDayRange.value = String(Math.max(dayOptions.indexOf(safeDays), 0));
      }
      syncRangeFill(mobileDayRange, { kind: 'day', type, dayValue: safeDays });
    }

    if (mobileDaysInput) {
      mobileDaysInput.min = String(type === 'reset' ? 1 : Math.max(1, dayOptions[0] || 1));
      mobileDaysInput.max = String(getMobileMaxDays(type));
      mobileDaysInput.value = String(safeDays);
    }

    if (mobileDayBubble) {
      mobileDayBubble.textContent = safeDays + ' ngày';
    }

    if (mobileDataBubble) {
      mobileDataBubble.textContent = selectedData;
    }

    syncMobileDayShortcuts(type, safeDays);
    updateMobileDayScale(type);

    syncText(mobilePickerDaysNote, getMobileDaysGuide(type));
  };

  const findClosestByData = (plans, targetMb) =>
    [...plans].sort((left, right) => Math.abs(left.dataMb - targetMb) - Math.abs(right.dataMb - targetMb) || left.priceUsd - right.priceUsd)[0];

  const pickMobilePlan = (type, dayValue, dataValue) => {
    const pool = getMobilePlansByType(type);
    if (pool.length === 0) return null;

    if (type === 'reset') {
      return pool.filter((plan) => plan.data === dataValue).sort((left, right) => left.priceUsd - right.priceUsd)[0] || pool[0];
    }

    const target = getMobileDataOptions(type, dayValue).find((item) => item.value === dataValue)?.mb || 0;
    const qualifyingPlans = pool
      .filter((plan) => (plan.dayValue || 0) >= dayValue && plan.dataMb >= target)
      .sort(
        (left, right) =>
          left.priceUsd - right.priceUsd ||
          (left.dayValue || 0) - (right.dayValue || 0) ||
          left.dataMb - right.dataMb,
      );

    if (qualifyingPlans.length > 0) {
      return qualifyingPlans[0];
    }

    const longestPlans = pool
      .filter((plan) => (plan.dayValue || 0) >= dayValue)
      .sort((left, right) => (left.dayValue || 0) - (right.dayValue || 0) || left.priceUsd - right.priceUsd);
    if (longestPlans.length > 0) {
      return findClosestByData(longestPlans, target) || longestPlans[0];
    }

    return pool.sort((left, right) => left.priceUsd - right.priceUsd)[0];
  };

  const getSteppedMobileDayValue = (type, step) => {
    if (type === 'reset') {
      return clampMobileDay(getCurrentMobileDayValue(type) + step, type);
    }

    const dayOptions = getMobileDayOptions(type);
    if (dayOptions.length === 0) {
      return clampMobileDay(getCurrentMobileDayValue(type) + step, type);
    }

    const currentDay = clampMobileDay(getCurrentMobileDayValue(type), type);
    const currentIndex = Math.max(dayOptions.indexOf(currentDay), 0);
    const nextIndex = Math.max(0, Math.min(dayOptions.length - 1, currentIndex + (step < 0 ? -1 : 1)));
    return dayOptions[nextIndex] || currentDay;
  };

  const syncPlanChoiceState = (slug) => {
    let activeChoice = null;
    planChoices.forEach((node) => {
      const isActive = node.getAttribute('data-plan-target') === slug;
      node.classList.toggle('is-selected', isActive);
      if (isActive) {
        activeChoice = node;
      }
    });

    const selectedOption = planSelect?.selectedOptions?.[0] ?? null;
    const choicePayload = getPlanPayload(activeChoice);
    const optionPayload = getPlanPayload(selectedOption);
    const mobilePlan = mobilePlans.find((plan) => plan.slug === slug) ?? null;
    const primarySource = optionPayload ?? choicePayload ?? mobilePlan;
    const dimensionSource = mobilePlan ?? optionPayload ?? choicePayload;

    if (!primarySource) {
      return;
    }

    const periodValue = getMobileDayTarget(periodInput?.value || '');
    const displayQuote =
      primarySource.periodRequired && primarySource.priceUsd > 0
        ? buildDayPassQuote(
            {
              priceUsd: primarySource.priceUsd,
              name: primarySource.name,
              variantDetail: mobilePlan?.variantDetail || primarySource.meta || '',
            },
            periodValue,
          )
        : null;

    const basePriceText = displayQuote?.price || primarySource.price || dimensionSource?.price || '';
    currentSelectedUnitPriceText = basePriceText;
    syncText(selectedPrices, applyQuantityToPriceText(basePriceText));
    syncText(selectedNames, displayQuote?.name || primarySource.name || dimensionSource?.name || '');
    const displayMeta = displayQuote?.meta || primarySource.meta || dimensionSource?.meta || '';
    syncText(selectedMetas, getPrimaryMetaLine(displayMeta));
    syncSupportRow(selectedSupport, hasTikTokMeta(displayMeta));
    syncTikTokBadge(selectedTikTok, hasTikTokMeta(displayMeta));
    syncUnlimitedBadge(
      selectedUnlimited,
      Boolean(primarySource.periodRequired || dimensionSource?.periodRequired),
      getUnlimitedBadgeText(primarySource.periodRequired ? primarySource : dimensionSource),
    );
    syncTopupBadge(selectedTopup, Boolean(primarySource.topup || dimensionSource?.topup));
    syncText(selectedDataStats, dimensionSource?.data || '');
    syncText(selectedDayStats, displayQuote?.days ? displayQuote.days + ' ngày' : dimensionSource?.days || '');
    applyCheckoutUrl(
      primarySource.slug || slug,
      primarySource.periodRequired ? periodValue : null,
      getCurrentQuantity(),
      primarySource.handle || '',
    );
  };

  const syncPlanMeta = () => {
    if (!planSelect) return;
    const selectedOption = planSelect.selectedOptions[0];
    const needsPeriod = selectedOption?.dataset.periodRequired === 'true';
    const periodFromUrl = new URLSearchParams(window.location.search).get('period') || '';
    const isHiddenPeriodInput = periodInput instanceof HTMLInputElement && periodInput.type === 'hidden';

    if (periodField) {
      periodField.toggleAttribute('hidden', !needsPeriod);
    }

    if (periodInput) {
      periodInput.required = needsPeriod && !isHiddenPeriodInput;
      if (needsPeriod && !periodInput.value) {
        const periodFromQuery = Number.parseInt(periodFromUrl, 10);
        const fallbackPeriod =
          Number.isFinite(periodFromQuery) && periodFromQuery > 0
            ? periodFromQuery
            : getCurrentMobileDayValue(getCurrentMobileType());
        periodInput.value = String(Math.max(1, Math.min(365, fallbackPeriod)));
      }
      if (!needsPeriod) {
        periodInput.value = '';
      }
    }
  };

  const pulseOrderCard = () => {
    const orderCard = document.querySelector('[data-order-card], .store-order-card');
    if (!orderCard) return;
    orderCard.classList.remove('pulse-active');
    void orderCard.offsetWidth;
    orderCard.classList.add('pulse-active');
  };

  const focusQuickOrder = () => {
    const orderSection = document.querySelector('#order');
    if (orderSection instanceof HTMLElement) {
      orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const firstEmptyField =
      form?.querySelector('input[name="fullName"]:not([value])') ||
      form?.querySelector('input[name="fullName"]');
    if (firstEmptyField instanceof HTMLInputElement && !firstEmptyField.value) {
      window.setTimeout(() => firstEmptyField.focus(), 220);
    }
  };

  const setPlan = (slug, label, options = {}) => {
    if (!planSelect) return;
    const config = options || {};
    planSelect.value = slug;
    if (periodInput && typeof config.periodNum === 'number' && config.periodNum > 0) {
      periodInput.value = String(config.periodNum);
    }
    syncPlanMeta();
    syncPlanChoiceState(slug);
    if (!config.quiet) {
      pulseOrderCard();
    }
    if (status && !config.quiet) {
      status.textContent = 'Đã chọn gói ' + label + '. Điền thông tin để gửi yêu cầu.';
    }
  };

  const updateMobilePicker = (options = {}) => {
    if (mobilePlans.length === 0) return;
    const config = options || {};
    const type = config.type || getCurrentMobileType();
    const rawDayValue =
      typeof config.dayValue === 'number' && Number.isFinite(config.dayValue)
        ? config.dayValue
        : getCurrentMobileDayValue(type);
    const dataOptions = getMobileDataOptions(type, rawDayValue);
    const requestedData = config.dataValue || getCurrentMobileDataValue(type) || dataOptions[0]?.value || '';
    const selectedPlan =
      getMobilePlansByType(type).find((plan) => plan.slug === config.selectedSlug) ||
      pickMobilePlan(type, rawDayValue, requestedData);

    if (!selectedPlan) {
      syncMobileTypeState(type);
      syncText(mobilePickerDataNote, 'Hiện chưa có gói phù hợp cho lựa chọn này.');
      syncText(mobilePickerNote, 'Hiện chưa có gói phù hợp cho lựa chọn này.');
      syncTopupBadge(mobilePickerTopup, false);
      return;
    }

    const dayValue = !selectedPlan.periodRequired && config.selectedSlug ? selectedPlan.dayValue || rawDayValue : rawDayValue;
    const requestedDays = getMobileDayTarget(dayValue, type);
    syncMobileTypeState(type);
    syncMobileRanges(type, requestedDays, selectedPlan.data);
    applyCheckoutUrl(selectedPlan.slug, type === 'reset' ? requestedDays : null, getCurrentQuantity(), selectedPlan.handle || '');

    if (type === 'reset') {
      const quote = buildDayPassQuote(selectedPlan, requestedDays);
      syncText(mobilePickerDays, quote.days + ' ngày');
      syncText(mobilePickerData, selectedPlan.data);
      syncText(mobilePickerPrices, quote.price);
      syncText(mobilePickerNames, quote.name);
      syncText(mobilePickerMetas, quote.meta);
      syncSupportRow(mobilePickerSupport, hasTikTokMeta(quote.meta));
      syncTikTokBadge(mobilePickerTikTok, hasTikTokMeta(quote.meta));
      syncUnlimitedBadge(mobilePickerUnlimited, true, getUnlimitedBadgeText(selectedPlan));
      syncTopupBadge(mobilePickerTopup, Boolean(selectedPlan.topup));
      syncText(mobilePickerDataNote, getMobileDataGuide(type, selectedPlan.data, quote.days));
      syncText(mobilePickerNote, getMobileFocusNote(type));
      if (periodInput) {
        periodInput.value = String(quote.days);
      }
      if (config.syncPlan !== false) {
        setPlan(selectedPlan.slug, quote.name, { quiet: true, periodNum: quote.days });
      }
      return;
    }

    syncText(mobilePickerDays, requestedDays + ' ngày');
    syncText(mobilePickerData, selectedPlan.data);
    syncText(mobilePickerPrices, selectedPlan.price);
    syncText(mobilePickerNames, selectedPlan.name);
    syncText(mobilePickerMetas, selectedPlan.meta);
    syncSupportRow(mobilePickerSupport, hasTikTokMeta(selectedPlan.meta));
    syncTikTokBadge(mobilePickerTikTok, hasTikTokMeta(selectedPlan.meta));
    syncUnlimitedBadge(mobilePickerUnlimited, Boolean(selectedPlan.periodRequired), getUnlimitedBadgeText(selectedPlan));
    syncTopupBadge(mobilePickerTopup, Boolean(selectedPlan.topup));
    syncText(mobilePickerDataNote, getMobileDataGuide(type, selectedPlan.data, requestedDays));
    syncText(mobilePickerNote, getMobileFocusNote(type));
    if (config.syncPlan !== false) {
      setPlan(selectedPlan.slug, selectedPlan.name, { quiet: true });
    }
  };

  const desktopDaysRange = document.querySelector('[data-desktop-days-range]');
  const desktopDataRange = document.querySelector('[data-desktop-data-range]');
  const desktopDaysInput = document.querySelector('[data-desktop-days-input]');
  const desktopDataSelect = document.querySelector('[data-desktop-data-select]');
  const desktopQuantityInput = document.querySelector('[data-desktop-quantity-input]');
  const orderQuantityInput = document.querySelector('input[name="quantity"]');
  const desktopQuantityButtons = Array.from(document.querySelectorAll('[data-desktop-quantity-step]'));
  const desktopTypeOptions = Array.from(document.querySelectorAll('[data-desktop-type-option]'));
  const desktopPickerDays = Array.from(document.querySelectorAll('[data-desktop-picker-days]'));
  const desktopPickerData = Array.from(document.querySelectorAll('[data-desktop-picker-data]'));
  const desktopPickerName = Array.from(document.querySelectorAll('[data-desktop-picker-name]'));
  const desktopPickerMeta = Array.from(document.querySelectorAll('[data-desktop-picker-meta]'));
  const desktopPickerSupport = Array.from(document.querySelectorAll('[data-desktop-picker-support]'));
  const desktopPickerTikTok = Array.from(document.querySelectorAll('[data-desktop-picker-tiktok]'));
  const desktopPickerUnlimited = Array.from(document.querySelectorAll('[data-desktop-picker-unlimited]'));
  const desktopPickerTopup = Array.from(document.querySelectorAll('[data-desktop-picker-topup]'));
  const desktopPickerPrice = Array.from(document.querySelectorAll('[data-desktop-picker-price]'));
  const desktopPickerNote = Array.from(document.querySelectorAll('[data-desktop-picker-note]'));
  const desktopPickerDaysNote = Array.from(document.querySelectorAll('[data-desktop-days-note]'));
  const desktopPickerDataNote = Array.from(document.querySelectorAll('[data-desktop-data-note]'));
  const desktopPickerDataHeading = Array.from(document.querySelectorAll('[data-desktop-data-heading]'));
  const desktopPickerCta = document.querySelector('[data-desktop-picker-cta]');
  const selectedTopup = Array.from(document.querySelectorAll('[data-selected-topup]'));
  const selectedTikTok = Array.from(document.querySelectorAll('[data-selected-tiktok]'));
  const selectedUnlimited = Array.from(document.querySelectorAll('[data-selected-unlimited]'));
  const selectedSupport = Array.from(document.querySelectorAll('[data-selected-support]'));
  let currentSelectedUnitPriceText = '';
  let currentDesktopUnitPriceText = '';

  const getCurrentDesktopType = () =>
    desktopTypeOptions.find((node) => node.classList.contains('is-selected'))?.getAttribute('data-desktop-type-value') || getCurrentMobileType();

  const syncTopupBadge = (nodes, visible) => {
    nodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = !visible;
      }
    });
  };

  const syncTikTokBadge = (nodes, visible) => {
    nodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = !visible;
      }
    });
  };

  const syncSupportRow = (nodes, visible) => {
    nodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = !visible;
      }
    });
  };

  const normalizeFup = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const getUnlimitedBadgeText = (source) => {
    const fup = normalizeFup(source?.fup);
    return fup ? 'Hết tốc độ cao về tốc độ thường ' + fup : 'Hết tốc độ cao vẫn dùng tiếp';
  };

  const syncUnlimitedBadge = (nodes, visible, label = '') => {
    nodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = !visible;
        if (visible && label) {
          const textNode = node.querySelector('span:last-child');
          if (textNode instanceof HTMLElement) {
            textNode.textContent = label;
          }
        }
      }
    });
  };

  const getCurrentQuantity = () => {
    const rawValue =
      desktopQuantityInput instanceof HTMLInputElement
        ? desktopQuantityInput.value
        : orderQuantityInput instanceof HTMLInputElement
          ? orderQuantityInput.value
          : '1';
    return Math.max(1, Math.min(99, Number.parseInt(rawValue || '1', 10) || 1));
  };

  const applyQuantityToPriceText = (priceText) => {
    const baseAmount = parseVnd(priceText);
    return baseAmount > 0 ? formatVnd(baseAmount * getCurrentQuantity()) : priceText;
  };

  const syncDesktopTypeState = (type) => {
    desktopTypeOptions.forEach((node) => {
      node.classList.toggle('is-selected', node.getAttribute('data-desktop-type-value') === type);
    });
    syncText(desktopPickerDataHeading, getMobileDataHeading(type));
  };

  const syncDesktopQuantity = (value) => {
    const safeValue = Math.max(1, Math.min(99, Number.parseInt(String(value || '1'), 10) || 1));
    if (desktopQuantityInput instanceof HTMLInputElement) {
      desktopQuantityInput.value = String(safeValue);
    }
    if (orderQuantityInput instanceof HTMLInputElement) {
      orderQuantityInput.value = String(safeValue);
    }
    if (currentSelectedUnitPriceText) {
      syncText(selectedPrices, applyQuantityToPriceText(currentSelectedUnitPriceText));
    }
    if (currentDesktopUnitPriceText) {
      syncText(desktopPickerPrice, applyQuantityToPriceText(currentDesktopUnitPriceText));
    }
  };

  const syncDesktopRangeFill = (range, options = {}) => {
    if (!(range instanceof HTMLInputElement)) return;
    const rangeShell = range.closest('[data-desktop-range-shell]');
    const applyProgress = (value) => {
      range.style.setProperty('--range-progress', value);
      if (rangeShell instanceof HTMLElement) {
        rangeShell.style.setProperty('--range-progress', value);
      }
    };
    if (options.kind === 'day') {
      const type = options.type || getCurrentDesktopType();
      const dayValue = clampMobileDay(options.dayValue ?? getCurrentMobileDayValue(type), type);
      const progress = getMobileDayVisualProgress(dayValue, type, getMobileMaxDays(type));
      applyProgress(progress + '%');
      return;
    }

    const min = Number.parseFloat(range.min || '0');
    const max = Number.parseFloat(range.max || '1');
    const value = Number.parseFloat(range.value || '0');
    const ratio = max <= min ? 1 : (value - min) / (max - min);
    applyProgress(Math.max(0, Math.min(1, ratio)) * 100 + '%');
  };

  const syncDesktopPicker = (options = {}) => {
    if (!(desktopDaysRange instanceof HTMLInputElement) || !(desktopDataRange instanceof HTMLInputElement)) {
      return;
    }

    const type = options.type || getCurrentDesktopType();
    syncDesktopTypeState(type);

    const rawDayValue =
      typeof options.dayValue === 'number' && Number.isFinite(options.dayValue)
        ? options.dayValue
        : type === 'reset'
          ? clampMobileDay(getDayFromProgress(desktopDaysRange.value, getMobileMaxDays(type)), type)
          : getMobileDayOptions(type)[Math.max(0, Math.min(getMobileDayOptions(type).length - 1, Number.parseInt(desktopDaysRange.value || '0', 10) || 0))] || clampMobileDay(7, type);

    const dataOptions = getMobileDataOptions(type, rawDayValue);
    const selectedData =
      options.dataValue ||
      dataOptions[Math.max(0, Math.min(dataOptions.length - 1, Number.parseInt(desktopDataRange.value || '0', 10) || 0))]?.value ||
      dataOptions[0]?.value ||
      '';
    const selectedPlan = pickMobilePlan(type, rawDayValue, selectedData);
    if (!selectedPlan) {
      return;
    }

    const safeDay = type === 'reset' ? clampMobileDay(rawDayValue, type) : (selectedPlan.dayValue || rawDayValue);
    const dayOptions = getMobileDayScaleValues(type, getMobileMaxDays(type));
    desktopDaysRange.min = '0';
    desktopDaysRange.max = String(type === 'reset' ? 100 : Math.max(dayOptions.length - 1, 0));
    desktopDaysRange.step = '1';
    desktopDaysRange.value = String(type === 'reset' ? Math.round(getMobileDayVisualProgress(safeDay, type, getMobileMaxDays(type))) : Math.max(dayOptions.indexOf(safeDay), 0));

    const selectedDataIndex = Math.max(
      dataOptions.findIndex((item) => item.value === selectedPlan.data),
      0,
    );
    desktopDataRange.min = '0';
    desktopDataRange.max = String(Math.max(dataOptions.length - 1, 0));
    desktopDataRange.step = '1';
    desktopDataRange.value = String(selectedDataIndex);

    if (desktopDataSelect instanceof HTMLSelectElement) {
      desktopDataSelect.innerHTML = dataOptions
        .map((item, index) => '<option value="' + item.value + '"' + (index === selectedDataIndex ? ' selected' : '') + '>' + item.label + '</option>')
        .join('');
    }

    if (desktopDaysInput instanceof HTMLInputElement) {
      desktopDaysInput.min = String(type === 'reset' ? 1 : dayOptions[0] || 1);
      desktopDaysInput.max = String(
        type === 'reset' ? getMobileMaxDays(type) : dayOptions[Math.max(dayOptions.length - 1, 0)] || getMobileMaxDays(type),
      );
      desktopDaysInput.value = String(safeDay);
    }

    syncDesktopRangeFill(desktopDaysRange, { kind: 'day', type, dayValue: safeDay });
    syncDesktopRangeFill(desktopDataRange);

    if (type === 'reset') {
      const quote = buildDayPassQuote(selectedPlan, safeDay);
      currentDesktopUnitPriceText = quote.price;
      syncText(desktopPickerDays, quote.days + ' ngày');
      syncText(desktopPickerData, selectedPlan.data);
      syncText(desktopPickerName, quote.name);
      syncText(desktopPickerMeta, getPrimaryMetaLine(quote.meta));
      syncSupportRow(desktopPickerSupport, hasTikTokMeta(quote.meta));
      syncTikTokBadge(desktopPickerTikTok, hasTikTokMeta(quote.meta));
      syncUnlimitedBadge(desktopPickerUnlimited, true, getUnlimitedBadgeText(selectedPlan));
      syncTopupBadge(desktopPickerTopup, Boolean(selectedPlan.topup));
      syncText(desktopPickerPrice, applyQuantityToPriceText(quote.price));
      syncText(desktopPickerNote, getMobileFocusNote(type));
      syncText(desktopPickerDaysNote, getMobileDaysGuide(type));
      syncText(desktopPickerDataNote, getMobileDataGuide(type, selectedPlan.data, quote.days));
      if (desktopPickerCta instanceof HTMLAnchorElement) {
        desktopPickerCta.href = buildCheckoutUrl(selectedPlan.slug, quote.days, getCurrentQuantity(), selectedPlan.handle || '');
      }
      setPlan(selectedPlan.slug, quote.name, { quiet: true, periodNum: quote.days });
      return;
    }

    currentDesktopUnitPriceText = selectedPlan.price;
    syncText(desktopPickerDays, safeDay + ' ngày');
    syncText(desktopPickerData, selectedPlan.data);
    syncText(desktopPickerName, selectedPlan.name);
    syncText(desktopPickerMeta, getPrimaryMetaLine(selectedPlan.meta));
    syncSupportRow(desktopPickerSupport, hasTikTokMeta(selectedPlan.meta));
    syncTikTokBadge(desktopPickerTikTok, hasTikTokMeta(selectedPlan.meta));
    syncUnlimitedBadge(desktopPickerUnlimited, Boolean(selectedPlan.periodRequired), getUnlimitedBadgeText(selectedPlan));
    syncTopupBadge(desktopPickerTopup, Boolean(selectedPlan.topup));
    syncText(desktopPickerPrice, applyQuantityToPriceText(selectedPlan.price));
    syncText(desktopPickerNote, getMobileFocusNote(type));
    syncText(desktopPickerDaysNote, getMobileDaysGuide(type));
    syncText(desktopPickerDataNote, getMobileDataGuide(type, selectedPlan.data, safeDay));
    if (desktopPickerCta instanceof HTMLAnchorElement) {
      desktopPickerCta.href = buildCheckoutUrl(selectedPlan.slug, null, getCurrentQuantity(), selectedPlan.handle || '');
    }
    setPlan(selectedPlan.slug, selectedPlan.name, { quiet: true });
  };

  if (desktopDaysRange instanceof HTMLInputElement && desktopDataRange instanceof HTMLInputElement) {
    desktopDaysRange.addEventListener('input', () => syncDesktopPicker());
    desktopDataRange.addEventListener('input', () => syncDesktopPicker());
    if (desktopQuantityInput instanceof HTMLInputElement) {
      desktopQuantityInput.addEventListener('input', () => {
        syncDesktopQuantity(desktopQuantityInput.value);
        syncDesktopPicker({ type: getCurrentDesktopType() });
      });
    }
    desktopQuantityButtons.forEach((node) => {
      node.addEventListener('click', () => {
        const step = Number.parseInt(node.getAttribute('data-desktop-quantity-step') || '0', 10) || 0;
        const currentValue = desktopQuantityInput instanceof HTMLInputElement ? desktopQuantityInput.value : orderQuantityInput?.value || '1';
        syncDesktopQuantity((Number.parseInt(currentValue, 10) || 1) + step);
        syncDesktopPicker({ type: getCurrentDesktopType() });
      });
    });
    if (desktopDaysInput instanceof HTMLInputElement) {
      desktopDaysInput.addEventListener('input', () => {
        const type = getCurrentDesktopType();
        const nextValue = clampMobileDay(Number.parseInt(desktopDaysInput.value || '0', 10) || 1, type);
        syncDesktopPicker({ type, dayValue: nextValue });
      });
    }
    if (desktopDataSelect instanceof HTMLSelectElement) {
      desktopDataSelect.addEventListener('change', () => {
        syncDesktopPicker({ type: getCurrentDesktopType(), dataValue: desktopDataSelect.value });
      });
    }
    desktopTypeOptions.forEach((node) => {
      node.addEventListener('click', () => {
        const type = node.getAttribute('data-desktop-type-value') || 'reset';
        syncDesktopPicker({ type, dayValue: type === 'reset' ? 7 : getMobileDayOptions(type)[0] || 7, dataValue: getMobileDataOptions(type, type === 'reset' ? 7 : getMobileDayOptions(type)[0] || 7)[0]?.value || '' });
      });
    });
    syncDesktopQuantity(orderQuantityInput instanceof HTMLInputElement ? orderQuantityInput.value : '1');
    syncDesktopPicker({ type: getCurrentDesktopType() });
  }

  const pageSearchParams = new URLSearchParams(window.location.search);
  const queryPlan = pageSearchParams.get('plan');
  const queryPeriod = Number.parseInt(pageSearchParams.get('period') || '', 10);
  const queryQuantity = Number.parseInt(pageSearchParams.get('quantity') || '', 10);
  if (Number.isFinite(queryQuantity) && queryQuantity > 0) {
    syncDesktopQuantity(queryQuantity);
  }
  if (queryPlan && planSelect) {
    const option = Array.from(planSelect.options).find((item) => item.value === queryPlan);
    if (option) {
      setPlan(option.value, option.textContent || option.value, { quiet: true });
      if (periodInput && option.dataset.periodRequired === 'true' && Number.isFinite(queryPeriod) && queryPeriod > 0) {
        periodInput.value = String(Math.max(1, Math.min(365, queryPeriod)));
        syncPlanChoiceState(option.value);
      }
      if (window.innerWidth <= 760 && mobilePlans.some((plan) => plan.slug === option.value)) {
        updateMobilePicker({
          selectedSlug: option.value,
          dayValue: getMobileDayTarget(periodInput?.value || String(queryPeriod || '') || mobileDayRange?.value || '1'),
          syncPlan: false,
        });
      }
    }
  }

  document.querySelectorAll('[data-plan-buy-link]').forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const card = node.closest('.rose-plan-card');
    const quantityInput = card?.querySelector('[data-plan-quantity-input]');
    const periodInputNode = card?.querySelector('[data-plan-period-input]');
    const priceDisplay = card?.querySelector('[data-plan-price-display]');
    const priceLabel = card?.querySelector('[data-plan-price-label]');
    const quantityButtons = Array.from(card?.querySelectorAll('[data-plan-quantity-step]') ?? []);
    const periodButtons = Array.from(card?.querySelectorAll('[data-plan-period-step]') ?? []);
    const slug = node.getAttribute('data-plan-slug') || '';
    const label = node.getAttribute('data-plan-name') || slug;
    const unitPriceText =
      priceDisplay instanceof HTMLElement ? priceDisplay.getAttribute('data-plan-unit-price') || priceDisplay.textContent || '' : '';

    const syncPlanCardQuantity = (value) => {
      const safeValue = Math.max(1, Math.min(99, Number.parseInt(String(value || '1'), 10) || 1));
      if (quantityInput instanceof HTMLInputElement) {
        quantityInput.value = String(safeValue);
      }
      if (priceDisplay instanceof HTMLElement && unitPriceText) {
        const baseAmount = parseVnd(unitPriceText);
        priceDisplay.textContent = baseAmount > 0 ? formatVnd(baseAmount * safeValue) : unitPriceText;
      }
      return safeValue;
    };

    const syncPlanCardPeriod = (value) => {
      const safeValue = Math.max(1, Math.min(365, Number.parseInt(String(value || '1'), 10) || 1));
      if (periodInputNode instanceof HTMLInputElement) {
        periodInputNode.value = String(safeValue);
      }
      return safeValue;
    };

    const syncPlanCardPricing = () => {
      const safeQuantity = syncPlanCardQuantity(quantityInput instanceof HTMLInputElement ? quantityInput.value : '1');
      const safePeriod = syncPlanCardPeriod(periodInputNode instanceof HTMLInputElement ? periodInputNode.value : '1');
      if (priceDisplay instanceof HTMLElement && unitPriceText) {
        const baseAmount = parseVnd(unitPriceText);
        if (baseAmount > 0) {
          priceDisplay.textContent = formatVnd(baseAmount * safeQuantity * safePeriod);
        } else {
          priceDisplay.textContent = unitPriceText;
        }
      }
      if (priceLabel instanceof HTMLElement) {
        priceLabel.textContent = safeQuantity > 1 || safePeriod > 1 ? 'Tạm tính' : 'Giá 1 ngày';
      }
      return { safeQuantity, safePeriod };
    };

    if (quantityInput instanceof HTMLInputElement) {
      quantityInput.addEventListener('input', () => syncPlanCardPricing());
    }

    if (periodInputNode instanceof HTMLInputElement) {
      periodInputNode.addEventListener('input', () => syncPlanCardPricing());
    }

    quantityButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const step = Number.parseInt(button.getAttribute('data-plan-quantity-step') || '0', 10) || 0;
        const currentValue = quantityInput instanceof HTMLInputElement ? quantityInput.value : '1';
        syncPlanCardQuantity((Number.parseInt(currentValue, 10) || 1) + step);
        syncPlanCardPricing();
      });
    });

    periodButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const step = Number.parseInt(button.getAttribute('data-plan-period-step') || '0', 10) || 0;
        const currentValue = periodInputNode instanceof HTMLInputElement ? periodInputNode.value : '1';
        syncPlanCardPeriod((Number.parseInt(currentValue, 10) || 1) + step);
        syncPlanCardPricing();
      });
    });

    node.addEventListener('click', () => {
      const { safeQuantity, safePeriod } = syncPlanCardPricing();
      const matchingPlan = mobilePlans.find((plan) => plan.slug === slug) ?? null;
      const option =
        planSelect instanceof HTMLSelectElement ? Array.from(planSelect.options).find((item) => item.value === slug) : null;
      const needsPeriod = option?.dataset.periodRequired === 'true' || matchingPlan?.type === 'reset';
      const directHref = buildCheckoutUrl(slug, needsPeriod ? safePeriod : null, safeQuantity, matchingPlan?.handle || '');

      if (!(planSelect instanceof HTMLSelectElement)) {
        window.location.href = directHref;
        return;
      }

      syncDesktopQuantity(safeQuantity);
      setPlan(slug, label, {
        periodNum: needsPeriod ? safePeriod : undefined,
      });

      if (status instanceof HTMLElement) {
        status.textContent = 'Đã chuyển ' + label + ' sang khu đặt nhanh. Điền thông tin để sang bước thanh toán.';
      }

      focusQuickOrder();
    });

    syncPlanCardPricing();
  });

  const copyButtons = Array.from(document.querySelectorAll('[data-copy-button]'));
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy-value') || '';
      if (!value) return;
      const originalLabel = button.textContent || 'Copy';
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          const helper = document.createElement('textarea');
          helper.value = value;
          helper.setAttribute('readonly', 'true');
          helper.style.position = 'fixed';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.select();
          document.execCommand('copy');
          helper.remove();
        }
        button.textContent = 'Đã copy';
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 1400);
      } catch (_error) {
        button.textContent = 'Copy lỗi';
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 1400);
      }
    });
  });

  if (!queryPlan && planSelect?.dataset.defaultPlan) {
    if (window.innerWidth <= 760 && mobilePlans.length > 0) {
      updateMobilePicker();
    } else {
      setPlan(planSelect.dataset.defaultPlan, planSelect.dataset.defaultPlanLabel || planSelect.dataset.defaultPlan);
    }
  }

  document.querySelectorAll('[data-plan-target]').forEach((node) => {
    node.addEventListener('click', () => {
      const slug = node.getAttribute('data-plan-target');
      const label = node.getAttribute('data-plan-name') || slug || '';
      if (slug) setPlan(slug, label);
    });
  });

  if (mobileTypeOptions.length > 0) {
    mobileTypeOptions.forEach((node) => {
      node.addEventListener('click', () => {
        const nextType = node.getAttribute('data-mobile-type-value') || 'reset';
        const nextDayValue = getMobileDayTarget(mobileDaysInput?.value || mobileDayRange?.value || '1', nextType);
        const nextDataValue = getMobileDataOptions(nextType, nextDayValue)[0]?.value || '';
        updateMobilePicker({
          type: nextType,
          dataValue: nextDataValue,
          dayValue: nextDayValue,
        });
      });
    });
  }

  if (mobileDayRange) {
    mobileDayRange.addEventListener('input', () => {
      const activeType = getCurrentMobileType();
      updateMobilePicker({
        type: activeType,
        dayValue: getCurrentMobileDayValue(activeType),
        dataValue: getCurrentMobileDataValue(activeType),
      });
      showMobileBubble(mobileDayBubble, 'day');
    });
  }

  if (mobileDaysInput) {
    const syncDaysFromInput = () => {
      if (mobileDaysInput.value === '') return;
      const activeType = getCurrentMobileType();
      updateMobilePicker({
        type: activeType,
        dayValue: getMobileDayTarget(mobileDaysInput.value, activeType),
        dataValue: getCurrentMobileDataValue(activeType),
      });
      showMobileBubble(mobileDayBubble, 'day');
    };

    mobileDaysInput.addEventListener('input', syncDaysFromInput);
    mobileDaysInput.addEventListener('blur', () => {
      const activeType = getCurrentMobileType();
      mobileDaysInput.value = String(getMobileDayTarget(mobileDaysInput.value || mobileDayRange?.value || '1', activeType));
      syncDaysFromInput();
    });
  }

  if (mobileDayStepButtons.length > 0) {
    mobileDayStepButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const activeType = getCurrentMobileType();
        const step = Number.parseInt(button.getAttribute('data-mobile-day-step') || '0', 10);
        const nextValue = getSteppedMobileDayValue(activeType, step);
        updateMobilePicker({
          type: activeType,
          dayValue: nextValue,
          dataValue: getCurrentMobileDataValue(activeType),
        });
        showMobileBubble(mobileDayBubble, 'day');
      });
    });
  }

  if (mobileDayShortcutWrap instanceof HTMLElement) {
    const applyMobileDayShortcut = (target) => {
      const button = target instanceof Element ? target.closest('[data-mobile-day-shortcut]') : null;
      if (!button) return;
      const activeType = getCurrentMobileType();
      const nextValue = Number.parseInt(button.getAttribute('data-mobile-day-shortcut') || '0', 10);
      if (!Number.isFinite(nextValue) || nextValue <= 0) return;
      updateMobilePicker({
        type: activeType,
        dayValue: nextValue,
        dataValue: getCurrentMobileDataValue(activeType),
      });
      showMobileBubble(mobileDayBubble, 'day');
    };

    mobileDayShortcutWrap.addEventListener('click', (event) => {
      applyMobileDayShortcut(event.target);
    });

    mobileDayShortcutWrap.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const button = event.target instanceof Element ? event.target.closest('[data-mobile-day-shortcut]') : null;
      if (!button) return;
      event.preventDefault();
      applyMobileDayShortcut(button);
    });
  }

  if (mobileDataRange) {
    mobileDataRange.addEventListener('input', () => {
      const activeType = getCurrentMobileType();
      updateMobilePicker({
        type: activeType,
        dataValue: getCurrentMobileDataValue(activeType),
        dayValue: getCurrentMobileDayValue(activeType),
      });
      showMobileBubble(mobileDataBubble, 'data');
    });
  }

  if (mobileDataScale) {
    const selectMobileDataIndex = (index) => {
      if (!mobileDataRange) return;
      mobileDataRange.value = String(index);
      const activeType = getCurrentMobileType();
      updateMobilePicker({
        type: activeType,
        dataValue: getCurrentMobileDataValue(activeType),
        dayValue: getCurrentMobileDayValue(activeType),
      });
      showMobileBubble(mobileDataBubble, 'data');
    };

    mobileDataScale.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-mobile-data-label]') : null;
      if (!target) return;
      const index = Number.parseInt(target.getAttribute('data-mobile-data-index') || '-1', 10);
      if (!Number.isFinite(index) || index < 0) return;
      selectMobileDataIndex(index);
    });

    mobileDataScale.addEventListener('keydown', (event) => {
      const isKeyboardSelect = event.key === 'Enter' || event.key === ' ';
      if (!isKeyboardSelect) return;
      const target = event.target instanceof Element ? event.target.closest('[data-mobile-data-label]') : null;
      if (!target) return;
      event.preventDefault();
      const index = Number.parseInt(target.getAttribute('data-mobile-data-index') || '-1', 10);
      if (!Number.isFinite(index) || index < 0) return;
      selectMobileDataIndex(index);
    });
  }

  if (mobilePickerCta) {
    mobilePickerCta.addEventListener('click', (event) => {
      event.preventDefault();
      const activeType = getCurrentMobileType();
      updateMobilePicker({
        type: activeType,
        dataValue: getCurrentMobileDataValue(activeType),
        dayValue: getCurrentMobileDayValue(activeType),
      });
      const selectedOption = planSelect instanceof HTMLSelectElement ? planSelect.selectedOptions[0] : null;
      const nextHref = buildCheckoutUrl(
        planSelect?.value || '',
        activeType === 'reset' ? getCurrentMobileDayValue(activeType) : null,
        undefined,
        selectedOption?.getAttribute('data-plan-handle') || '',
      );
      window.location.href = nextHref;
    });
  }

  const marketTabs = Array.from(document.querySelectorAll('[data-market-tab]'));
  const marketCards = Array.from(document.querySelectorAll('[data-market-card]'));
  const marketEmpty = document.querySelector('[data-market-empty]');
  const catalogGrid = document.querySelector('[data-catalog-grid]');
  const catalogSearch = document.querySelector('[data-catalog-search]');
  const catalogSort = document.querySelector('[data-catalog-sort]');
  const catalogResults = document.querySelector('[data-catalog-results]');
  let activeMarketTab = 'all';

  const getCatalogSortValue = () =>
    catalogSort instanceof HTMLSelectElement ? catalogSort.value : 'recommended';

  const applyMarketFilters = () => {
    marketTabs.forEach((tab) => {
      tab.classList.toggle('is-active', tab.getAttribute('data-market-tab') === activeMarketTab);
    });

    const query = catalogSearch instanceof HTMLInputElement ? catalogSearch.value.trim().toLowerCase() : '';
    const visibleCards = [];

    marketCards.forEach((card) => {
      const groups = (card.getAttribute('data-groups') || '').split(' ').filter(Boolean);
      const haystack = (card.getAttribute('data-market-name') || '').toLowerCase();
      const matchesTab = activeMarketTab === 'all' || groups.includes(activeMarketTab);
      const matchesQuery = query === '' || haystack.includes(query);
      const show = matchesTab && matchesQuery;
      card.toggleAttribute('hidden', !show);
      if (show) {
        visibleCards.push(card);
      }
    });

    if (catalogGrid instanceof HTMLElement) {
      const sortedCards = visibleCards.slice().sort((left, right) => {
        const sortValue = getCatalogSortValue();
        if (sortValue === 'price-asc') {
          return Number.parseInt(left.getAttribute('data-market-price') || '0', 10) - Number.parseInt(right.getAttribute('data-market-price') || '0', 10);
        }
        if (sortValue === 'price-desc') {
          return Number.parseInt(right.getAttribute('data-market-price') || '0', 10) - Number.parseInt(left.getAttribute('data-market-price') || '0', 10);
        }
        if (sortValue === 'data-desc') {
          return Number.parseInt(right.getAttribute('data-market-data') || '0', 10) - Number.parseInt(left.getAttribute('data-market-data') || '0', 10);
        }
        if (sortValue === 'days-desc') {
          return Number.parseInt(right.getAttribute('data-market-days') || '0', 10) - Number.parseInt(left.getAttribute('data-market-days') || '0', 10);
        }
        return Number.parseInt(left.getAttribute('data-market-order') || '0', 10) - Number.parseInt(right.getAttribute('data-market-order') || '0', 10);
      });

      sortedCards.forEach((card) => {
        catalogGrid.appendChild(card);
      });
    }

    if (catalogResults instanceof HTMLElement) {
      catalogResults.textContent = 'Hiển thị ' + visibleCards.length + ' / ' + marketCards.length + ' gói';
    }

    if (marketEmpty) {
      marketEmpty.toggleAttribute('hidden', visibleCards.length > 0);
    }
  };

  if (marketTabs.length > 0 && marketCards.length > 0) {
    marketTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activeMarketTab = tab.getAttribute('data-market-tab') || 'all';
        applyMarketFilters();
      });
    });
    if (catalogSearch instanceof HTMLInputElement) {
      catalogSearch.addEventListener('input', applyMarketFilters);
    }
    if (catalogSort instanceof HTMLSelectElement) {
      catalogSort.addEventListener('change', applyMarketFilters);
    }
    applyMarketFilters();
  }

  if (planSelect) {
    planSelect.addEventListener('change', () => {
      syncPlanMeta();
      syncPlanChoiceState(planSelect.value);
      if (mobilePlans.some((plan) => plan.slug === planSelect.value)) {
        updateMobilePicker({
          selectedSlug: planSelect.value,
          dayValue: getMobileDayTarget(periodInput?.value || mobileDayRange?.value || '1'),
          syncPlan: false,
        });
      }
    });
    syncPlanMeta();
    syncPlanChoiceState(planSelect.value);
  }

  if (periodInput) {
    periodInput.addEventListener('input', () => {
      if (!planSelect) return;
      syncPlanChoiceState(planSelect.value);
      if (mobilePlans.some((plan) => plan.slug === planSelect.value)) {
        updateMobilePicker({
          selectedSlug: planSelect.value,
          dayValue: getMobileDayTarget(periodInput.value || mobileDayRange?.value || '1'),
          syncPlan: false,
        });
      }
    });
  }

  const syncMobileBuyBar = () => {
    if (!mobileBuyBar) return;
    const mobileThreshold = mobileAppShell ? Math.max(260, mobileAppShell.offsetHeight - 220) : 280;
    const shouldShow = window.innerWidth <= 760 && window.scrollY > mobileThreshold;
    mobileBuyBar.classList.toggle('is-visible', shouldShow);
  };

  syncMobileBuyBar();
  window.addEventListener('scroll', syncMobileBuyBar, { passive: true });
  window.addEventListener('resize', syncMobileBuyBar);

  const syncPaymentStatus = (statusValue) => {
    const label =
      statusValue === 'paid'
        ? 'Đã thanh toán'
        : statusValue === 'pending_review'
          ? 'Đang chờ đối soát'
          : 'Chờ thanh toán';
    const note =
      statusValue === 'paid'
        ? 'Bên mình đã xác nhận thanh toán. Hệ thống đang lấy QR eSIM thật và chuyển sang trang hoàn tất.'
        : statusValue === 'pending_review'
          ? 'Bên mình đã nhận báo chuyển khoản và đang đối soát. Xác nhận xong sẽ gửi QR qua email.'
          : 'Hệ thống sẽ tự cập nhật khi ngân hàng báo giao dịch. Không cần bấm xác nhận thêm.';

    syncText(paymentStatusLabels, label);
    syncText(paymentStatusNotes, note);
  };

  if (paymentReferenceNode instanceof HTMLElement) {
    const reference = paymentReferenceNode.getAttribute('data-payment-reference') || '';
    const accessToken = paymentReferenceNode.getAttribute('data-payment-token') || '';
    if (reference) {
      let hasScheduledPaymentRedirect = false;
      let aggressivePollingUntil = 0;
      let paymentPollTimer = 0;

      const setWaitingState = (active, message) => {
        if (paymentWaitingCard instanceof HTMLElement) {
          paymentWaitingCard.classList.toggle('is-visible', active);
        }
        if (paymentWaitingText instanceof HTMLElement && message) {
          paymentWaitingText.textContent = message;
        }
        if (paymentWaitButton instanceof HTMLButtonElement) {
          paymentWaitButton.classList.toggle('is-active', active);
        }
      };

      const schedulePaymentSuccessRedirect = () => {
        if (hasScheduledPaymentRedirect) return;
        hasScheduledPaymentRedirect = true;
        if (paymentLoading instanceof HTMLElement) {
          paymentLoading.classList.add('is-visible');
        }
        window.setTimeout(() => {
          window.location.replace(buildPaymentSuccessPath(reference, accessToken));
        }, 1200);
      };

      const pollStatus = async () => {
        try {
          const response = await fetch(apiUrl(withAccessToken('/api/orders/' + reference + '/status', accessToken)));
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Không thể tải trạng thái thanh toán.');
          }
          syncPaymentStatus(data.paymentStatus || 'pending');
          if (paymentConfirmState) {
            paymentConfirmState.textContent =
              data.paymentStatus === 'paid'
                ? data.esimReady
                  ? 'Thanh toán đã được xác nhận. QR eSIM thật đã sẵn sàng, đang chuyển sang trang hoàn tất đơn.'
                  : 'Thanh toán đã được xác nhận tự động. Hệ thống đang lấy QR eSIM thật và chuyển sang trang hoàn tất đơn.'
                : aggressivePollingUntil > Date.now()
                  ? 'Đang kiểm tra giao dịch mới liên tục trong 1-2 phút. Anh cứ giữ nguyên trang này.'
                  : 'Sau khi chuyển khoản, trang sẽ tự cập nhật sang Đã thanh toán. Nếu muốn kiểm tra nhanh hơn, bấm nút chờ xác nhận bên dưới.';
          }
          if (data.paymentStatus === 'paid') {
            setWaitingState(false, 'Thanh toán đã xác nhận. Đang chuyển sang bước tiếp theo...');
          } else if (aggressivePollingUntil > Date.now()) {
            setWaitingState(true, 'Đang kiểm tra giao dịch mới liên tục. Thường sẽ thấy xác nhận trong khoảng 10-30 giây.');
          }
          if (data.paymentStatus === 'paid') {
            schedulePaymentSuccessRedirect();
          }
          return data.paymentStatus === 'paid';
        } catch (error) {
          if (paymentConfirmState) {
            paymentConfirmState.textContent =
              error instanceof Error ? error.message : 'Không thể cập nhật trạng thái thanh toán.';
          }
          return false;
        }
      };

      const scheduleNextPoll = () => {
        const delay = aggressivePollingUntil > Date.now() ? 2000 : 4000;
        paymentPollTimer = window.setTimeout(async () => {
          const isPaid = await pollStatus();
          if (!isPaid) {
            scheduleNextPoll();
          }
        }, delay);
      };

      const startPolling = async () => {
        const paid = await pollStatus();
        if (paid) return;
        scheduleNextPoll();
        window.setTimeout(() => window.clearTimeout(paymentPollTimer), 10 * 60 * 1000);
      };

      if (paymentWaitButton instanceof HTMLButtonElement) {
        paymentWaitButton.addEventListener('click', async () => {
          aggressivePollingUntil = Date.now() + 2 * 60 * 1000;
          setWaitingState(true, 'Đang kiểm tra giao dịch mới liên tục trong 1-2 phút. Anh giữ nguyên trang này giúp mình.');
          if (paymentConfirmState) {
            paymentConfirmState.textContent =
              'Hệ thống đang ưu tiên kiểm tra thanh toán mới. Không cần chuyển khoản lại.';
          }
          window.clearTimeout(paymentPollTimer);
          const isPaid = await pollStatus();
          if (!isPaid) {
            scheduleNextPoll();
          }
        });
      }

      startPolling();
    }
  }

  if (paymentSuccessReferenceNode instanceof HTMLElement) {
    const reference = paymentSuccessReferenceNode.getAttribute('data-esim-reference') || '';
    const accessToken = paymentSuccessReferenceNode.getAttribute('data-esim-token') || '';
    const isReady = paymentSuccessReferenceNode.getAttribute('data-esim-ready') === 'true';
    const topupEnabled = paymentSuccessReferenceNode.getAttribute('data-esim-topup-enabled') === 'true';
    const installPlatform = detectInstallPlatform();
    const qrLink = document.querySelector('[data-esim-qr-link]');
    const iosInstallButton = document.querySelector('[data-esim-install-button="ios"]');
    const androidInstallButton = document.querySelector('[data-esim-install-button="android"]');
    const iosInstallUrl = paymentSuccessReferenceNode.getAttribute('data-esim-ios-url') || '';
    const androidInstallUrl = paymentSuccessReferenceNode.getAttribute('data-esim-android-url') || '';
    const qrImageUrl = paymentSuccessReferenceNode.getAttribute('data-esim-qr-url') || '';

    const syncInstallButtons = () => {
      const setPrimaryInstallButton = (primaryButton, secondaryButton, href) => {
        if (primaryButton instanceof HTMLAnchorElement && href) {
          primaryButton.href = href;
          primaryButton.target = '_self';
          primaryButton.textContent = 'Cài eSIM ngay';
          primaryButton.classList.add('button-primary');
          primaryButton.classList.remove('button-secondary');
        }
        if (secondaryButton instanceof HTMLElement) {
          secondaryButton.hidden = true;
        }
        if (qrLink instanceof HTMLAnchorElement) {
          qrLink.href = href || qrImageUrl || '#';
          qrLink.target = href ? '_self' : '_blank';
        }
      };

      if (installPlatform === 'ios' && iosInstallUrl) {
        setPrimaryInstallButton(iosInstallButton, androidInstallButton, iosInstallUrl);
        return;
      }

      if (installPlatform === 'android' && androidInstallUrl) {
        setPrimaryInstallButton(androidInstallButton, iosInstallButton, androidInstallUrl);
        return;
      }

      if (qrLink instanceof HTMLAnchorElement && qrImageUrl) {
        qrLink.href = qrImageUrl;
        qrLink.target = '_blank';
      }
    };

    syncInstallButtons();

    const setBusyButton = (button, busy, busyLabel) => {
      if (!(button instanceof HTMLButtonElement)) return;
      if (!button.dataset.defaultLabel) {
        button.dataset.defaultLabel = button.textContent || '';
      }
      button.disabled = busy;
      button.textContent = busy ? busyLabel : button.dataset.defaultLabel || '';
    };

    const showCardMessage = (card, body, message, kind = 'info') => {
      if (!(card instanceof HTMLElement) || !(body instanceof HTMLElement)) return;
      card.hidden = false;
      card.dataset.state = kind;
      body.innerHTML = '<p>' + escapeText(message) + '</p>';
    };

    const renderUsageCard = (data) => {
      if (!(paymentUsageCard instanceof HTMLElement) || !(paymentUsageBody instanceof HTMLElement)) return;
      paymentUsageCard.hidden = false;
      paymentUsageCard.dataset.state = 'ready';
      paymentUsageBody.innerHTML = [
        '<div class="payment-addon-grid">',
        '<article class="payment-addon-item"><span>Còn lại</span><strong>' + escapeText(data.remainingLabel || '-') + '</strong></article>',
        '<article class="payment-addon-item"><span>Đã dùng</span><strong>' + escapeText(data.usedLabel || '-') + '</strong></article>',
        '<article class="payment-addon-item"><span>Tổng gói</span><strong>' + escapeText(data.totalLabel || '-') + '</strong></article>',
        '<article class="payment-addon-item"><span>Thời hạn</span><strong>' + escapeText(data.validityLabel || '-') + '</strong></article>',
        (data.expiredAtLabel
          ? '<article class="payment-addon-item payment-addon-item-wide"><span>Hết hạn lúc</span><strong>' + escapeText(data.expiredAtLabel) + '</strong></article>'
          : ''),
        '</div>',
      ].join('');
    };

    const renderTopupCard = (data) => {
      if (!(paymentTopupCard instanceof HTMLElement) || !(paymentTopupBody instanceof HTMLElement)) return;
      paymentTopupCard.hidden = false;
      paymentTopupCard.dataset.state = 'ready';
      const items = Array.isArray(data.items) ? data.items : [];
      if (items.length === 0) {
        paymentTopupBody.innerHTML = '<p>Hiện eSIM này chưa có gói mua thêm dung lượng khả dụng.</p>';
        return;
      }
      paymentTopupBody.innerHTML = [
        '<div class="payment-addon-list">',
        ...items.map((item) =>
          '<article class="payment-addon-row">' +
            '<div class="payment-addon-copy">' +
              '<strong>' + escapeText(item.name || 'Gói mua thêm dung lượng') + '</strong>' +
              '<p>' + escapeText((item.dataLabel || '-') + ' · ' + (item.validityLabel || '-')) + '</p>' +
            '</div>' +
            '<div class="payment-addon-action">' +
              '<span class="payment-addon-price">' + escapeText(item.priceVnd || '-') + '</span>' +
              '<span class="payment-addon-note">Xem giá tham khảo</span>' +
            '</div>' +
          '</article>'
        ),
        '</div>',
        '<p>Tạm thời bên mình chỉ hiển thị danh sách gói nạp thêm để tham khảo. Luồng thanh toán top-up trực tiếp đang tắt để tránh cấp sai eSIM hoặc lệch ICCID.</p>',
      ].join('');
    };

    if (paymentUsageButton instanceof HTMLButtonElement) {
      paymentUsageButton.addEventListener('click', async () => {
        setBusyButton(paymentUsageButton, true, 'Đang kiểm tra...');
        showCardMessage(paymentUsageCard, paymentUsageBody, 'Đang kiểm tra dung lượng...');
        try {
          const response = await fetch(apiUrl(withAccessToken('/api/orders/' + reference + '/usage', accessToken)));
          const data = await response.json();
          if (!response.ok || !data.ok) {
            throw new Error(data.error || 'Không thể kiểm tra dung lượng.');
          }
          renderUsageCard(data);
        } catch (error) {
          showCardMessage(
            paymentUsageCard,
            paymentUsageBody,
            error instanceof Error ? error.message : 'Không thể kiểm tra dung lượng.',
            'error',
          );
        } finally {
          setBusyButton(paymentUsageButton, false, '');
        }
      });
    }

    if (topupEnabled && paymentTopupButton instanceof HTMLButtonElement) {
      paymentTopupButton.addEventListener('click', async () => {
        setBusyButton(paymentTopupButton, true, 'Đang tải...');
        showCardMessage(paymentTopupCard, paymentTopupBody, 'Đang lấy danh sách gói nạp thêm...');
        try {
          const response = await fetch(apiUrl(withAccessToken('/api/orders/' + reference + '/topups', accessToken)));
          const data = await response.json();
          if (!response.ok || !data.ok) {
            throw new Error(data.error || 'Không thể lấy danh sách dung lượng mua thêm.');
          }
          renderTopupCard(data);
        } catch (error) {
          showCardMessage(
            paymentTopupCard,
            paymentTopupBody,
            error instanceof Error ? error.message : 'Không thể lấy danh sách dung lượng mua thêm.',
            'error',
          );
        } finally {
          setBusyButton(paymentTopupButton, false, '');
        }
      });
    }


    if (reference && !isReady) {
      let esimPollTimer = 0;
      const pollEsimStatus = async () => {
        try {
          const response = await fetch(apiUrl(withAccessToken('/api/orders/' + reference + '/status', accessToken)));
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Không thể tải trạng thái eSIM.');
          }
          if (paymentSuccessState) {
            if (data.esimReady) {
              paymentSuccessState.textContent = 'QR eSIM thật đã sẵn sàng. Đang tải lại trang...';
            } else if (data.esimStatus === 'failed' && data.esimError) {
              paymentSuccessState.textContent = data.esimError;
            } else {
              paymentSuccessState.textContent = 'Thanh toán đã xong. Hệ thống đang cấp QR eSIM thật, trang sẽ tự cập nhật.';
            }
          }
          if (data.esimReady) {
            window.clearInterval(esimPollTimer);
            window.setTimeout(() => window.location.reload(), 600);
            return true;
          }
          return false;
        } catch (error) {
          if (paymentSuccessState) {
            paymentSuccessState.textContent =
              error instanceof Error ? error.message : 'Không thể cập nhật trạng thái eSIM.';
          }
          return false;
        }
      };

      pollEsimStatus();
      esimPollTimer = window.setInterval(async () => {
        const ready = await pollEsimStatus();
        if (ready) {
          window.clearInterval(esimPollTimer);
        }
      }, 5000);
      window.setTimeout(() => window.clearInterval(esimPollTimer), 5 * 60 * 1000);
    }
  }

  if (!form || !status) return;

  form.noValidate = true;
  applyStoredCheckoutContact();
  renderEmailSuggestions();

  [fullNameInput, phoneInput, emailInput].forEach((field) => {
    if (!(field instanceof HTMLInputElement)) return;
    field.addEventListener('input', () => {
      queuePersistCheckoutContact();
    });
    field.addEventListener('change', () => {
      persistCheckoutContact();
    });
  });

  if (emailInput instanceof HTMLInputElement) {
    emailInput.addEventListener('focus', () => {
      window.clearTimeout(emailSuggestionHideTimer);
      renderEmailSuggestions();
    });
    emailInput.addEventListener('input', () => {
      window.clearTimeout(emailSuggestionHideTimer);
      renderEmailSuggestions();
    });
    emailInput.addEventListener('blur', () => {
      window.clearTimeout(emailSuggestionHideTimer);
      emailSuggestionHideTimer = window.setTimeout(() => {
        hideEmailSuggestions();
      }, 140);
    });
  }

  if (emailSuggestionList instanceof HTMLElement && emailInput instanceof HTMLInputElement) {
    emailSuggestionList.addEventListener('pointerdown', (event) => {
      event.preventDefault();
    });
    emailSuggestionList.addEventListener('click', (event) => {
      const suggestionButton = event.target instanceof Element ? event.target.closest('[data-email-suggestion]') : null;
      if (!(suggestionButton instanceof HTMLElement)) return;
      const selectedEmail = suggestionButton.getAttribute('data-email-suggestion') || '';
      if (!selectedEmail) return;
      emailInput.value = selectedEmail;
      persistCheckoutContact();
      hideEmailSuggestions();
      emailInput.focus();
    });
  }

  const getOrderFormError = () => {
    const selectedOption = planSelect?.selectedOptions?.[0] ?? null;
    const needsPeriod = selectedOption?.dataset.periodRequired === 'true';
    if (planSelect instanceof HTMLSelectElement && !planSelect.value) {
      return 'Hệ thống chưa giữ được gói đang chọn. Anh tải lại trang rồi thử lại giúp mình.';
    }
    if (fullNameInput instanceof HTMLInputElement && !fullNameInput.value.trim()) {
      fullNameInput.focus();
      return 'Vui lòng nhập họ và tên.';
    }
    if (phoneInput instanceof HTMLInputElement && !phoneInput.value.trim()) {
      phoneInput.focus();
      return 'Vui lòng nhập số điện thoại.';
    }
    if (emailInput instanceof HTMLInputElement) {
      const emailValue = emailInput.value.trim();
      if (!emailValue) {
        emailInput.focus();
        return 'Vui lòng nhập email nhận QR.';
      }
      if (!emailInput.checkValidity()) {
        emailInput.focus();
        return 'Email chưa đúng định dạng.';
      }
    }
    if (needsPeriod && periodInput instanceof HTMLInputElement) {
      const periodFromUrl = new URLSearchParams(window.location.search).get('period') || '';
      const rawPeriod = (periodInput.value || periodFromUrl || '1').trim();
      const periodValue = Number.parseInt(rawPeriod, 10);

      if (!Number.isFinite(periodValue)) {
        periodInput.value = '1';
      } else {
        periodInput.value = String(Math.max(1, Math.min(365, periodValue)));
      }
    }
    if (confirmOrderInput instanceof HTMLInputElement && !confirmOrderInput.checked) {
      confirmOrderInput.focus();
      return 'Anh vui lòng xác nhận lại thông tin nhận QR trước khi tiếp tục.';
    }
    return '';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const validationError = getOrderFormError();
    if (validationError) {
      status.textContent = validationError;
      return;
    }
    status.textContent = 'Đang gửi yêu cầu mua hàng...';
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const selectedSlug = planSelect?.value || '';
    const selectedPeriod = periodInput?.value || '';
    const selectedOption = planSelect?.selectedOptions?.[0] ?? null;
    const needsPeriod = selectedOption?.dataset.periodRequired === 'true';
    const periodFallback = periodInput?.value || new URLSearchParams(window.location.search).get('period') || '1';

    if (needsPeriod) {
      payload.periodNum = String(payload.periodNum || '').trim() || periodFallback;
    }

    persistCheckoutContact();

    try {
      const response = await fetch(apiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gửi yêu cầu thất bại');
      }

      if (data.paymentUrl) {
        status.innerHTML = '<strong>Đã tạo đơn.</strong> Đang chuyển sang trang thanh toán...';
        window.location.href = data.paymentUrl;
        return;
      }

      status.innerHTML = '<strong>Đã ghi nhận đơn.</strong> Mã yêu cầu: ' + data.reference + '.';
      form.reset();
      if (planSelect && selectedSlug) {
        planSelect.value = selectedSlug;
      }
      if (periodInput && selectedPeriod) {
        periodInput.value = selectedPeriod;
      }
      syncPlanMeta();
      if (planSelect) {
        syncPlanChoiceState(planSelect.value);
      }
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Đã có lỗi xảy ra. Vui lòng thử lại.';
    }
  });
})();
`;

const legacyMobilePickerScript = `
(function () {
  try {
    var root = document.querySelector('.mobile-app-shell');
    if (!root) return;

    var planSelect = document.querySelector('select[name="planSlug"]');
    var periodInput = document.querySelector('input[name="periodNum"]');
    var typeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-type-option]'));
    var dayInput = document.querySelector('[data-mobile-days-input]');
    var dayRange = document.querySelector('[data-mobile-days-range]');
    var dayShortcuts = document.querySelector('[data-mobile-day-shortcuts]');
    var dayScale = document.querySelector('[data-mobile-day-scale]');
    var dayBubble = document.querySelector('[data-mobile-day-bubble]');
    var dataRange = document.querySelector('[data-mobile-data-range]');
    var dataScale = document.querySelector('[data-mobile-data-scale]');
    var dataBubble = document.querySelector('[data-mobile-data-bubble]');
    var cta = document.querySelector('[data-mobile-picker-cta]');
    var dataHeadingNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-data-heading]'));
    var dataValueNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-data]'));
    var dayValueNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-days]'));
    var typeValueNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-type]'));
    var priceNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-price]'));
    var nameNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-name]'));
    var dayNoteNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-days-note]'));
    var dataNoteNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-data-note]'));
    var focusNoteNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-note]'));
    var supportRows = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-support]'));
    var tiktokBadges = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-tiktok]'));
    var unlimitedBadges = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-unlimited]'));
    var topupBadges = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-picker-topup]'));
    var planCatalog = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-plan-catalog]')).map(function (node) {
      return {
        slug: node.getAttribute('data-plan-target') || '',
        handle: node.getAttribute('data-plan-handle') || '',
        name: node.getAttribute('data-plan-name') || '',
        price: node.getAttribute('data-plan-price') || '',
        priceUsd: parseFloat(node.getAttribute('data-plan-price-usd') || '0') || 0,
        meta: node.getAttribute('data-plan-meta') || '',
        data: node.getAttribute('data-plan-data') || '',
        dataMb: parseFloat(node.getAttribute('data-plan-data-mb') || '0') || 0,
        dayValue: parseInt(node.getAttribute('data-plan-day-value') || '0', 10) || 0,
        type: node.getAttribute('data-plan-type') || '',
        topup: node.getAttribute('data-plan-topup') === 'true',
        fup: node.getAttribute('data-plan-fup') || '',
        route: node.getAttribute('data-plan-route') || ''
      };
    });
    if (!planCatalog.length) return;

    function setText(nodes, value) {
      for (var i = 0; i < nodes.length; i += 1) {
        if (nodes[i]) nodes[i].textContent = value;
      }
    }

    function setHidden(nodes, hidden) {
      for (var i = 0; i < nodes.length; i += 1) {
        if (nodes[i]) nodes[i].hidden = hidden;
      }
    }

    function formatVnd(amountVnd) {
      var safeValue = Math.max(0, Math.round(amountVnd / 1000) * 1000);
      return new Intl.NumberFormat('vi-VN').format(safeValue) + 'đ';
    }

    function parseVndText(value) {
      var digits = String(value || '').replace(/[^0-9]/g, '');
      return digits ? parseInt(digits, 10) || 0 : 0;
    }

    function getDiscount(days) {
      return 0;
    }

    function currentType() {
      for (var i = 0; i < typeButtons.length; i += 1) {
        if (typeButtons[i].classList.contains('is-selected')) return typeButtons[i].getAttribute('data-mobile-type-value') || 'reset';
      }
      return 'reset';
    }

    function setType(type) {
      for (var i = 0; i < typeButtons.length; i += 1) {
        typeButtons[i].classList.toggle('is-selected', typeButtons[i].getAttribute('data-mobile-type-value') === type);
      }
      setText(typeValueNodes, type === 'reset' ? 'Theo ngày' : type === 'total' ? 'Trọn gói' : 'Không giới hạn');
      setText(dataHeadingNodes, type === 'reset' ? 'GB / ngày' : 'Dung lượng');
    }

    function plansByType(type) {
      return planCatalog.filter(function (plan) {
        return plan.type === type;
      }).sort(function (a, b) {
        return (a.dayValue - b.dayValue) || (a.dataMb - b.dataMb) || (a.priceUsd - b.priceUsd);
      });
    }

    function dayOptions(type) {
      if (type === 'reset') return [];
      var seen = {};
      return plansByType(type).map(function (plan) {
        return plan.dayValue;
      }).filter(function (value) {
        if (!value || seen[value]) return false;
        seen[value] = true;
        return true;
      }).sort(function (a, b) { return a - b; });
    }

    function clampDay(type, value) {
      var parsed = parseInt(String(value || '1'), 10);
      if (!parsed || parsed < 1) parsed = 1;
      if (type === 'reset') return Math.max(1, Math.min(365, parsed));
      var options = dayOptions(type);
      if (!options.length) return 1;
      for (var i = 0; i < options.length; i += 1) {
        if (options[i] >= parsed) return options[i];
      }
      return options[options.length - 1];
    }

    function resetDayProgress(days, maxDays) {
      var safeDays = Math.max(1, Math.min(maxDays || 365, Math.round(days)));
      if ((maxDays || 365) <= 7) return ((safeDays - 1) / Math.max((maxDays || 365) - 1, 1)) * 100;
      if ((maxDays || 365) <= 15) {
        if (safeDays <= 7) return ((safeDays - 1) / 6) * 68;
        return 68 + ((safeDays - 7) / Math.max((maxDays || 365) - 7, 1)) * 32;
      }
      if ((maxDays || 365) <= 30) {
        if (safeDays <= 7) return ((safeDays - 1) / 6) * 68;
        if (safeDays <= 15) return 68 + ((safeDays - 7) / 8) * 14;
        return 82 + ((safeDays - 15) / Math.max((maxDays || 365) - 15, 1)) * 18;
      }
      if (safeDays <= 7) return ((safeDays - 1) / 6) * 68;
      if (safeDays <= 15) return 68 + ((safeDays - 7) / 8) * 14;
      if (safeDays <= 30) return 82 + ((safeDays - 15) / 15) * 10;
      return 92 + ((safeDays - 30) / Math.max((maxDays || 365) - 30, 1)) * 8;
    }

    function resetDayFromProgress(progress, maxDays) {
      var safeProgress = Math.max(0, Math.min(100, parseFloat(String(progress || '0')) || 0));
      var safeMaxDays = maxDays || 365;
      if (safeMaxDays <= 7) return Math.round(1 + (safeProgress / 100) * Math.max(safeMaxDays - 1, 1));
      if (safeMaxDays <= 15) {
        if (safeProgress <= 68) return Math.round(1 + (safeProgress / 68) * 6);
        return Math.round(7 + ((safeProgress - 68) / 32) * Math.max(safeMaxDays - 7, 1));
      }
      if (safeMaxDays <= 30) {
        if (safeProgress <= 68) return Math.round(1 + (safeProgress / 68) * 6);
        if (safeProgress <= 82) return Math.round(7 + ((safeProgress - 68) / 14) * 8);
        return Math.round(15 + ((safeProgress - 82) / 18) * Math.max(safeMaxDays - 15, 1));
      }
      if (safeProgress <= 68) return Math.round(1 + (safeProgress / 68) * 6);
      if (safeProgress <= 82) return Math.round(7 + ((safeProgress - 68) / 14) * 8);
      if (safeProgress <= 92) return Math.round(15 + ((safeProgress - 82) / 10) * 15);
      return Math.round(30 + ((safeProgress - 92) / 8) * Math.max(safeMaxDays - 30, 1));
    }

    function getResetDayName(plan, days) {
      var baseData = String(plan && (plan.data || plan.dataAllowance) || '').replace(/\\/ngày/gi, '').trim();
      if (!baseData) return days + ' ngày / Unlimited không bị cắt mạng';
      return baseData + ' / ' + days + ' ngày / Unlimited không bị cắt mạng';
    }

    function dataOptions(type, days) {
      var pool = plansByType(type);
      if (type !== 'reset') {
        var matched = pool.filter(function (plan) {
          return plan.dayValue >= days;
        });
        if (matched.length) pool = matched;
      }
      var map = {};
      var out = [];
      pool.sort(function (a, b) {
        return (a.dataMb - b.dataMb) || (a.priceUsd - b.priceUsd);
      }).forEach(function (plan) {
        if (map[plan.data]) return;
        map[plan.data] = true;
        out.push({ value: plan.data, mb: plan.dataMb });
      });
      return out;
    }

    function pickPlan(type, days, data) {
      var pool = plansByType(type);
      if (!pool.length) return null;
      if (type === 'reset') {
        for (var i = 0; i < pool.length; i += 1) {
          if (pool[i].data === data) return pool[i];
        }
        return pool[0];
      }
      var qualified = pool.filter(function (plan) {
        return plan.dayValue >= days && plan.data === data;
      }).sort(function (a, b) {
        return (a.priceUsd - b.priceUsd) || (a.dayValue - b.dayValue);
      });
      if (qualified.length) return qualified[0];
      qualified = pool.filter(function (plan) {
        return plan.dayValue >= days;
      }).sort(function (a, b) {
        return Math.abs(a.dataMb - (parseFloat(data) || 0)) - Math.abs(b.dataMb - (parseFloat(data) || 0)) || (a.priceUsd - b.priceUsd);
      });
      return qualified[0] || pool[0];
    }

    function syncDayShortcuts(type, days) {
      if (!dayShortcuts) return;
      var values = type === 'reset' ? [1, 2, 3, 4, 5, 6, 7] : dayOptions(type);
      dayShortcuts.hidden = !values.length;
      dayShortcuts.innerHTML = values.map(function (day) {
        return '<button class="mobile-app-day-shortcut' + (day === days ? ' is-selected' : '') + '" type="button" data-mobile-day-shortcut="' + day + '">' + day + ' ngày</button>';
      }).join('');
    }

    function syncDataScale(options, selectedData) {
      if (!dataScale) return;
      dataScale.innerHTML = options.map(function (item, index) {
        return '<span class="' + (item.value === selectedData ? 'is-selected' : '') + '" data-mobile-data-label data-mobile-data-index="' + index + '" role="button" tabindex="0" aria-label="Chọn ' + item.value + '">' + item.value + '</span>';
      }).join('');
    }

    function updateRangeVisual(range, progressPercent) {
      if (!range) return;
      var shell = range.closest('[data-mobile-range-shell]');
      if (shell) shell.style.setProperty('--range-progress', progressPercent + '%');
    }

    function update(type, dayValue, dataValue) {
      setType(type);
      var days = clampDay(type, dayValue);
      var dataList = dataOptions(type, days);
      if (!dataList.length) return;
      var selectedData = dataValue;
      var hasData = false;
      for (var i = 0; i < dataList.length; i += 1) {
        if (dataList[i].value === selectedData) hasData = true;
      }
      if (!hasData) selectedData = dataList[0].value;
      var plan = pickPlan(type, days, selectedData);
      if (!plan) return;

      if (type !== 'reset' && plan.dayValue) {
        days = plan.dayValue;
      }

      if (dayInput) dayInput.value = String(days);
      if (dayBubble) dayBubble.textContent = days + ' ngày';
      if (dataBubble) dataBubble.textContent = plan.data;
      if (dayRange) {
        if (type === 'reset') {
          dayRange.min = '0';
          dayRange.max = '100';
          dayRange.step = '1';
          dayRange.value = String(Math.round(resetDayProgress(days, 365)));
          updateRangeVisual(dayRange, resetDayProgress(days, 365));
        } else {
          var dOptions = dayOptions(type);
          var dayIndex = Math.max(0, dOptions.indexOf(days));
          dayRange.min = '0';
          dayRange.max = String(Math.max(dOptions.length - 1, 0));
          dayRange.step = '1';
          dayRange.value = String(dayIndex);
          updateRangeVisual(dayRange, dOptions.length <= 1 ? 100 : (dayIndex / (dOptions.length - 1)) * 100);
        }
      }
      if (dataRange) {
        var dataIndex = 0;
        for (var j = 0; j < dataList.length; j += 1) {
          if (dataList[j].value === plan.data) dataIndex = j;
        }
        dataRange.min = '0';
        dataRange.max = String(Math.max(dataList.length - 1, 0));
        dataRange.step = '1';
        dataRange.value = String(dataIndex);
        updateRangeVisual(dataRange, dataList.length <= 1 ? 100 : (dataIndex / Math.max(dataList.length - 1, 1)) * 100);
      }

      syncDayShortcuts(type, days);
      syncDataScale(dataList, plan.data);
      if (dayScale) {
        var marks = type === 'reset' ? [1, 3, 5, 7, 15, 30, 365] : dayOptions(type);
        dayScale.innerHTML = marks.map(function (value) {
          var progress = 0;
          if (type === 'reset') {
            progress = resetDayProgress(value, 365);
          } else {
            var options = dayOptions(type);
            var idx = Math.max(0, options.indexOf(value));
            progress = options.length <= 1 ? 100 : (idx / (options.length - 1)) * 100;
          }
          return '<span class="mobile-app-day-scale-mark" style="--day-mark-progress: ' + progress + '%">' + value + '</span>';
        }).join('');
      }

      var priceText = plan.price;
      var nameText = plan.name;
      if (type === 'reset') {
        var discount = getDiscount(days);
        priceText = formatVnd(plan.priceUsd * days * (1 - discount) * 26000);
        nameText = getResetDayName(plan, days);
      }

      setText(dayValueNodes, days + ' ngày');
      setText(dataValueNodes, plan.data);
      setText(priceNodes, priceText);
      setText(nameNodes, nameText);
      setText(dayNoteNodes, type === 'reset' ? 'Điền số ngày, bấm nhanh hoặc kéo để chọn số ngày sử dụng.' : 'Chỉ có sẵn mốc ' + dayOptions(type).join(' / ') + ' ngày.');
      setText(dataNoteNodes, type === 'reset' ? 'Gói mạng được Reset mỗi ngày vào lúc 00h00.' : 'Tổng dung lượng ' + plan.data + ' dùng trong ' + days + ' ngày.');
      setText(focusNoteNodes, type === 'reset' ? 'Giá sẽ đổi theo số ngày và mức GB/ngày anh chọn.' : 'Hệ thống sẽ tự chọn gói phù hợp theo số ngày và dung lượng anh chọn.');
      setHidden(supportRows, false);
      setHidden(tiktokBadges, plan.meta.toLowerCase().indexOf('tiktok') === -1);
      setHidden(unlimitedBadges, type !== 'reset');
      setHidden(topupBadges, !plan.topup);
      if (planSelect) planSelect.value = plan.slug;
      if (periodInput) periodInput.value = type === 'reset' ? String(days) : '';
      if (cta) {
        var href = plan.handle ? '/mua-goi/' + encodeURIComponent(plan.handle) : '/mua-goi?plan=' + encodeURIComponent(plan.slug);
        if (type === 'reset') href += '?period=' + encodeURIComponent(String(days));
        cta.href = href;
      }
    }

    function selectedDayValue(type) {
      if (!dayInput) return type === 'reset' ? 1 : (dayOptions(type)[0] || 1);
      if (type === 'reset') return clampDay(type, dayInput.value);
      if (!dayRange) return clampDay(type, dayInput.value);
      var options = dayOptions(type);
      var idx = parseInt(dayRange.value || '0', 10) || 0;
      return options[Math.max(0, Math.min(options.length - 1, idx))] || options[0] || 1;
    }

    function selectedDataValue(type, days) {
      var list = dataOptions(type, days);
      if (!list.length) return '';
      if (!dataRange) return list[0].value;
      var idx = parseInt(dataRange.value || '0', 10) || 0;
      return list[Math.max(0, Math.min(list.length - 1, idx))].value;
    }

    typeButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.disabled) return;
        var type = button.getAttribute('data-mobile-type-value') || 'reset';
        var day = type === 'reset' ? 1 : (dayOptions(type)[0] || 1);
        var data = dataOptions(type, day)[0] ? dataOptions(type, day)[0].value : '';
        update(type, day, data);
      });
    });

    if (dayInput) {
      dayInput.addEventListener('input', function () {
        var type = currentType();
        update(type, dayInput.value, selectedDataValue(type, clampDay(type, dayInput.value)));
      });
    }

    if (dayRange) {
      dayRange.addEventListener('input', function () {
        var type = currentType();
        var day = type === 'reset' ? resetDayFromProgress(dayRange.value, 365) : selectedDayValue(type);
        update(type, day, selectedDataValue(type, clampDay(type, day)));
      });
    }

    if (dayShortcuts) {
      dayShortcuts.addEventListener('click', function (event) {
        var target = event.target;
        while (target && target !== dayShortcuts && !target.getAttribute('data-mobile-day-shortcut')) target = target.parentNode;
        if (!target || target === dayShortcuts) return;
        var type = currentType();
        var day = target.getAttribute('data-mobile-day-shortcut') || '1';
        update(type, day, selectedDataValue(type, clampDay(type, day)));
      });
    }

    if (dataRange) {
      dataRange.addEventListener('input', function () {
        var type = currentType();
        var day = selectedDayValue(type);
        update(type, day, selectedDataValue(type, day));
      });
    }

    if (dataScale) {
      dataScale.addEventListener('click', function (event) {
        var target = event.target;
        while (target && target !== dataScale && !target.getAttribute('data-mobile-data-index')) target = target.parentNode;
        if (!target || target === dataScale) return;
        if (dataRange) dataRange.value = target.getAttribute('data-mobile-data-index') || '0';
        var type = currentType();
        var day = selectedDayValue(type);
        update(type, day, selectedDataValue(type, day));
      });
    }

    update(currentType(), selectedDayValue(currentType()), selectedDataValue(currentType(), selectedDayValue(currentType())));
  } catch (error) {
    console && console.error && console.error('legacy mobile picker failed', error);
  }
})();
`;

const legacyHomeSupportScript = `
(function () {
  try {
    var planNodes = Array.prototype.slice.call(document.querySelectorAll('[data-mobile-plan-catalog]'));
    if (!planNodes.length) return;

    var plans = planNodes.map(function (node) {
      return {
        slug: node.getAttribute('data-plan-target') || '',
        handle: node.getAttribute('data-plan-handle') || '',
        name: node.getAttribute('data-plan-name') || '',
        price: node.getAttribute('data-plan-price') || '',
        priceUsd: parseFloat(node.getAttribute('data-plan-price-usd') || '0') || 0,
        data: node.getAttribute('data-plan-data') || '',
        dataMb: parseFloat(node.getAttribute('data-plan-data-mb') || '0') || 0,
        dayValue: parseInt(node.getAttribute('data-plan-day-value') || '0', 10) || 0,
        type: node.getAttribute('data-plan-type') || '',
        meta: node.getAttribute('data-plan-meta') || ''
      };
    });

    function findPlan(slug) {
      for (var i = 0; i < plans.length; i += 1) {
        if (plans[i].slug === slug) return plans[i];
      }
      return null;
    }

    function formatVnd(amountVnd) {
      var safeValue = Math.max(0, Math.round(amountVnd / 1000) * 1000);
      return new Intl.NumberFormat('vi-VN').format(safeValue) + 'đ';
    }

    function getDiscount(days) {
      return 0;
    }

    function getResetDayName(plan, days) {
      var baseData = String(plan && plan.data || '').replace(/\\/ngày/gi, '').trim();
      if (!baseData) return days + ' ngày / Unlimited không bị cắt mạng';
      return baseData + ' / ' + days + ' ngày / Unlimited không bị cắt mạng';
    }

    function plansByType(type) {
      return plans.filter(function (plan) {
        return plan.type === type;
      }).sort(function (a, b) {
        return (a.dayValue - b.dayValue) || (a.dataMb - b.dataMb) || (a.priceUsd - b.priceUsd);
      });
    }

    function dayOptions(type) {
      if (type === 'reset') return [];
      var seen = {};
      return plansByType(type).map(function (plan) {
        return plan.dayValue;
      }).filter(function (value) {
        if (!value || seen[value]) return false;
        seen[value] = true;
        return true;
      }).sort(function (a, b) { return a - b; });
    }

    function clampDay(type, value) {
      var parsed = parseInt(String(value || '1'), 10);
      if (!parsed || parsed < 1) parsed = 1;
      if (type === 'reset') return Math.max(1, Math.min(365, parsed));
      var options = dayOptions(type);
      if (!options.length) return 1;
      for (var i = 0; i < options.length; i += 1) {
        if (options[i] >= parsed) return options[i];
      }
      return options[options.length - 1];
    }

    function resetDayProgress(days, maxDays) {
      var safeDays = Math.max(1, Math.min(maxDays || 365, Math.round(days)));
      if ((maxDays || 365) <= 7) return ((safeDays - 1) / Math.max((maxDays || 365) - 1, 1)) * 100;
      if ((maxDays || 365) <= 15) {
        if (safeDays <= 7) return ((safeDays - 1) / 6) * 68;
        return 68 + ((safeDays - 7) / Math.max((maxDays || 365) - 7, 1)) * 32;
      }
      if ((maxDays || 365) <= 30) {
        if (safeDays <= 7) return ((safeDays - 1) / 6) * 68;
        if (safeDays <= 15) return 68 + ((safeDays - 7) / 8) * 14;
        return 82 + ((safeDays - 15) / Math.max((maxDays || 365) - 15, 1)) * 18;
      }
      if (safeDays <= 7) return ((safeDays - 1) / 6) * 68;
      if (safeDays <= 15) return 68 + ((safeDays - 7) / 8) * 14;
      if (safeDays <= 30) return 82 + ((safeDays - 15) / 15) * 10;
      return 92 + ((safeDays - 30) / Math.max((maxDays || 365) - 30, 1)) * 8;
    }

    function resetDayFromProgress(progress, maxDays) {
      var safeProgress = Math.max(0, Math.min(100, parseFloat(String(progress || '0')) || 0));
      var safeMaxDays = maxDays || 365;
      if (safeMaxDays <= 7) return Math.round(1 + (safeProgress / 100) * Math.max(safeMaxDays - 1, 1));
      if (safeMaxDays <= 15) {
        if (safeProgress <= 68) return Math.round(1 + (safeProgress / 68) * 6);
        return Math.round(7 + ((safeProgress - 68) / 32) * Math.max(safeMaxDays - 7, 1));
      }
      if (safeMaxDays <= 30) {
        if (safeProgress <= 68) return Math.round(1 + (safeProgress / 68) * 6);
        if (safeProgress <= 82) return Math.round(7 + ((safeProgress - 68) / 14) * 8);
        return Math.round(15 + ((safeProgress - 82) / 18) * Math.max(safeMaxDays - 15, 1));
      }
      if (safeProgress <= 68) return Math.round(1 + (safeProgress / 68) * 6);
      if (safeProgress <= 82) return Math.round(7 + ((safeProgress - 68) / 14) * 8);
      if (safeProgress <= 92) return Math.round(15 + ((safeProgress - 82) / 10) * 15);
      return Math.round(30 + ((safeProgress - 92) / 8) * Math.max(safeMaxDays - 30, 1));
    }

    function dataOptions(type, days) {
      var pool = plansByType(type);
      if (type !== 'reset') {
        var matched = pool.filter(function (plan) {
          return plan.dayValue >= days;
        });
        if (matched.length) pool = matched;
      }
      var seen = {};
      var out = [];
      pool.forEach(function (plan) {
        if (seen[plan.data]) return;
        seen[plan.data] = true;
        out.push({ value: plan.data, mb: plan.dataMb });
      });
      out.sort(function (a, b) { return a.mb - b.mb; });
      return out;
    }

    function pickPlan(type, days, data) {
      var pool = plansByType(type);
      if (!pool.length) return null;
      if (type === 'reset') {
        for (var i = 0; i < pool.length; i += 1) {
          if (pool[i].data === data) return pool[i];
        }
        return pool[0];
      }
      var qualified = pool.filter(function (plan) {
        return plan.dayValue >= days && plan.data === data;
      }).sort(function (a, b) {
        return (a.priceUsd - b.priceUsd) || (a.dayValue - b.dayValue);
      });
      if (qualified.length) return qualified[0];
      return pool[0];
    }

    function buildHref(plan, days, quantity) {
      if (!plan) return '/mua-goi';
      var href = plan.handle ? '/mua-goi/' + encodeURIComponent(plan.handle) : '/mua-goi?plan=' + encodeURIComponent(plan.slug);
      var params = [];
      if (plan.type === 'reset' && days && days > 0) {
        params.push('period=' + encodeURIComponent(String(days)));
      }
      if (quantity && quantity > 1) {
        params.push('quantity=' + encodeURIComponent(String(quantity)));
      }
      if (!params.length) return href;
      return href + (href.indexOf('?') === -1 ? '?' : '&') + params.join('&');
    }

    function setText(nodes, value) {
      for (var i = 0; i < nodes.length; i += 1) {
        if (nodes[i]) nodes[i].textContent = value;
      }
    }

    function syncCardQuantity(input, nextValue) {
      var safeValue = Math.max(1, Math.min(99, parseInt(String(nextValue || '1'), 10) || 1));
      if (input) input.value = String(safeValue);
      return safeValue;
    }

    var desktopDaysRange = document.querySelector('[data-desktop-days-range]');
    var desktopDaysInput = document.querySelector('[data-desktop-days-input]');
    var desktopDataRange = document.querySelector('[data-desktop-data-range]');
    var desktopDataSelect = document.querySelector('[data-desktop-data-select]');
    var desktopTypeButtons = Array.prototype.slice.call(document.querySelectorAll('[data-desktop-type-option]'));
    var desktopPriceNodes = Array.prototype.slice.call(document.querySelectorAll('[data-desktop-picker-price]'));
    var desktopNameNodes = Array.prototype.slice.call(document.querySelectorAll('[data-desktop-picker-name]'));
    var desktopDayNodes = Array.prototype.slice.call(document.querySelectorAll('[data-desktop-picker-days]'));
    var desktopDataNodes = Array.prototype.slice.call(document.querySelectorAll('[data-desktop-picker-data]'));
    var desktopCta = document.querySelector('[data-desktop-picker-cta]');
    var desktopQtyInput = document.querySelector('[data-desktop-quantity-input]');
    var desktopQtyButtons = Array.prototype.slice.call(document.querySelectorAll('[data-desktop-quantity-step]'));

    function currentDesktopType() {
      for (var i = 0; i < desktopTypeButtons.length; i += 1) {
        if (desktopTypeButtons[i].classList.contains('is-selected')) {
          return desktopTypeButtons[i].getAttribute('data-desktop-type-value') || 'reset';
        }
      }
      return 'reset';
    }

    function currentDesktopQuantity() {
      return Math.max(1, Math.min(99, parseInt(desktopQtyInput && desktopQtyInput.value || '1', 10) || 1));
    }

    function updateDesktop(type, rawDayValue, rawDataValue) {
      if (!desktopDaysRange || !desktopDataRange) return;
      for (var i = 0; i < desktopTypeButtons.length; i += 1) {
        desktopTypeButtons[i].classList.toggle('is-selected', desktopTypeButtons[i].getAttribute('data-desktop-type-value') === type);
      }

      var days = clampDay(type, rawDayValue);
      var dOptions = dataOptions(type, days);
      if (!dOptions.length) return;
      var dataValue = rawDataValue || dOptions[0].value;
      var hasData = false;
      for (var j = 0; j < dOptions.length; j += 1) {
        if (dOptions[j].value === dataValue) hasData = true;
      }
      if (!hasData) dataValue = dOptions[0].value;

      var plan = pickPlan(type, days, dataValue);
      if (!plan) return;
      if (type !== 'reset' && plan.dayValue) days = plan.dayValue;

      if (desktopDaysInput) {
        var validDayOptions = dayOptions(type);
        desktopDaysInput.min = String(type === 'reset' ? 1 : (validDayOptions[0] || 1));
        desktopDaysInput.max = String(type === 'reset' ? 365 : (validDayOptions[validDayOptions.length - 1] || 365));
        desktopDaysInput.value = String(days);
      }

      if (desktopDaysRange) {
        if (type === 'reset') {
          desktopDaysRange.min = '0';
          desktopDaysRange.max = '100';
          desktopDaysRange.step = '1';
          desktopDaysRange.value = String(Math.round(resetDayProgress(days, 365)));
        } else {
          var validOptions = dayOptions(type);
          var dayIndex = Math.max(0, validOptions.indexOf(days));
          desktopDaysRange.min = '0';
          desktopDaysRange.max = String(Math.max(validOptions.length - 1, 0));
          desktopDaysRange.step = '1';
          desktopDaysRange.value = String(dayIndex);
        }
      }

      if (desktopDataSelect) {
        desktopDataSelect.innerHTML = dOptions.map(function (item) {
          return '<option value="' + item.value + '"' + (item.value === plan.data ? ' selected' : '') + '>' + item.value + '</option>';
        }).join('');
      }

      if (desktopDataRange) {
        var dataIndex = 0;
        for (var k = 0; k < dOptions.length; k += 1) {
          if (dOptions[k].value === plan.data) dataIndex = k;
        }
        desktopDataRange.min = '0';
        desktopDataRange.max = String(Math.max(dOptions.length - 1, 0));
        desktopDataRange.step = '1';
        desktopDataRange.value = String(dataIndex);
      }

      var priceText = plan.price;
      var nameText = plan.name;
      if (type === 'reset') {
        priceText = formatVnd(plan.priceUsd * days * (1 - getDiscount(days)) * 26000);
        nameText = getResetDayName(plan, days);
      }

      var totalPriceText = priceText;
      var totalAmount = parseVndText(priceText);
      if (totalAmount > 0) {
        totalPriceText = formatVnd(totalAmount * currentDesktopQuantity());
      }
      setText(desktopPriceNodes, totalPriceText);
      setText(desktopNameNodes, nameText);
      setText(desktopDayNodes, days + ' ngày');
      setText(desktopDataNodes, plan.data);
      if (desktopCta) {
        desktopCta.href = buildHref(plan, type === 'reset' ? days : null, currentDesktopQuantity());
      }
    }

    function getDesktopSelectedDay(type) {
      if (type === 'reset') {
        if (desktopDaysRange) return resetDayFromProgress(desktopDaysRange.value, 365);
        return parseInt(desktopDaysInput && desktopDaysInput.value || '1', 10) || 1;
      }
      var options = dayOptions(type);
      var idx = parseInt(desktopDaysRange && desktopDaysRange.value || '0', 10) || 0;
      return options[Math.max(0, Math.min(options.length - 1, idx))] || options[0] || 1;
    }

    function getDesktopSelectedData(type, days) {
      var items = dataOptions(type, days);
      if (!items.length) return '';
      if (desktopDataSelect && desktopDataSelect.value) return desktopDataSelect.value;
      var idx = parseInt(desktopDataRange && desktopDataRange.value || '0', 10) || 0;
      return items[Math.max(0, Math.min(items.length - 1, idx))].value;
    }

    if (desktopDaysRange && desktopDataRange) {
      desktopTypeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          var type = button.getAttribute('data-desktop-type-value') || 'reset';
          updateDesktop(type, type === 'reset' ? 1 : (dayOptions(type)[0] || 1), dataOptions(type, type === 'reset' ? 1 : (dayOptions(type)[0] || 1))[0] && dataOptions(type, type === 'reset' ? 1 : (dayOptions(type)[0] || 1))[0].value || '');
        });
      });

      desktopDaysRange.addEventListener('input', function () {
        var type = currentDesktopType();
        var days = getDesktopSelectedDay(type);
        updateDesktop(type, days, getDesktopSelectedData(type, days));
      });

      if (desktopDaysInput) {
        desktopDaysInput.addEventListener('input', function () {
          var type = currentDesktopType();
          var days = clampDay(type, desktopDaysInput.value);
          updateDesktop(type, days, getDesktopSelectedData(type, days));
        });
      }

      desktopDataRange.addEventListener('input', function () {
        var type = currentDesktopType();
        var days = getDesktopSelectedDay(type);
        updateDesktop(type, days, getDesktopSelectedData(type, days));
      });

      if (desktopDataSelect) {
        desktopDataSelect.addEventListener('change', function () {
          var type = currentDesktopType();
          var days = getDesktopSelectedDay(type);
          updateDesktop(type, days, desktopDataSelect.value);
        });
      }

      if (desktopQtyInput) {
        desktopQtyInput.addEventListener('input', function () {
          syncCardQuantity(desktopQtyInput, desktopQtyInput.value);
          updateDesktop(currentDesktopType(), getDesktopSelectedDay(currentDesktopType()), getDesktopSelectedData(currentDesktopType(), getDesktopSelectedDay(currentDesktopType())));
        });
      }

      desktopQtyButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          var step = parseInt(button.getAttribute('data-desktop-quantity-step') || '0', 10) || 0;
          syncCardQuantity(desktopQtyInput, (parseInt(desktopQtyInput && desktopQtyInput.value || '1', 10) || 1) + step);
          updateDesktop(currentDesktopType(), getDesktopSelectedDay(currentDesktopType()), getDesktopSelectedData(currentDesktopType(), getDesktopSelectedDay(currentDesktopType())));
        });
      });

      updateDesktop(currentDesktopType(), getDesktopSelectedDay(currentDesktopType()), getDesktopSelectedData(currentDesktopType(), getDesktopSelectedDay(currentDesktopType())));
    }

    Array.prototype.slice.call(document.querySelectorAll('[data-plan-buy-link]')).forEach(function (button) {
      var card = button.closest ? button.closest('.rose-plan-card') : null;
      var quantityInput = card ? card.querySelector('[data-plan-quantity-input]') : null;
      var priceDisplay = card ? card.querySelector('[data-plan-price-display]') : null;
      var unitPrice = priceDisplay && priceDisplay.getAttribute('data-plan-unit-price') || (priceDisplay && priceDisplay.textContent) || '';
      var quantityButtons = card ? Array.prototype.slice.call(card.querySelectorAll('[data-plan-quantity-step]')) : [];
      var plan = findPlan(button.getAttribute('data-plan-slug') || '');
      if (!plan) return;

      function syncFeaturedCardPrice() {
        if (!priceDisplay || !unitPrice) return;
        var quantity = syncCardQuantity(quantityInput, quantityInput && quantityInput.value || '1');
        var amount = parseVndText(unitPrice);
        if (amount > 0) {
          priceDisplay.textContent = formatVnd(amount * quantity);
        } else {
          priceDisplay.textContent = unitPrice;
        }
        return quantity;
      }

      quantityButtons.forEach(function (stepButton) {
        stepButton.addEventListener('click', function () {
          var step = parseInt(stepButton.getAttribute('data-plan-quantity-step') || '0', 10) || 0;
          syncCardQuantity(quantityInput, (parseInt(quantityInput && quantityInput.value || '1', 10) || 1) + step);
          syncFeaturedCardPrice();
        });
      });

      if (quantityInput) {
        quantityInput.addEventListener('input', function () {
          syncCardQuantity(quantityInput, quantityInput.value);
          syncFeaturedCardPrice();
        });
      }

      button.addEventListener('click', function () {
        var quantity = syncFeaturedCardPrice() || syncCardQuantity(quantityInput, quantityInput && quantityInput.value || '1');
        window.location.href = buildHref(plan, plan.type === 'reset' ? 1 : null, quantity);
      });

      syncFeaturedCardPrice();
    });
  } catch (error) {
    console && console.error && console.error('legacy home support failed', error);
  }
})();
`;

const layout = ({
  title,
  description,
  pathname,
  body,
  bodyClass,
  context,
  robots,
  structuredData,
  headScripts,
}: {
  title: string;
  description: string;
  pathname: string;
  body: string;
  bodyClass?: string;
  context: RenderContext;
  robots?: string;
  structuredData?: unknown[];
  headScripts?: string;
}) => {
  const canonical = fullUrl(context.siteUrl, pathname);
  const socialImageUrl = resolveAssetUrl(context, context.socialImageUrl, SOCIAL_IMAGE_PATH);
  const faviconUrl = resolveAssetUrl(context, context.faviconUrl, '/favicon.svg');
  const schemas = structuredData?.map(jsonLd).join('\n') ?? '';
  const googleTagCore = pathname.startsWith('/admin')
    ? ''
    : `
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-50NZZS9M2N"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-50NZZS9M2N');
    </script>`;
  const googleAdsTag = pathname.startsWith('/admin')
    ? ''
    : `
    <script>
      gtag('config', 'AW-16954338776');

      document.addEventListener('click', function (event) {
        var target = event.target instanceof Element ? event.target.closest('a[href]') : null;
        if (!(target instanceof HTMLAnchorElement)) return;
        var href = target.getAttribute('href') || '';
        if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) {
          return;
        }

        var url;
        try {
          url = new URL(target.href, window.location.href);
        } catch (_error) {
          return;
        }

        if (url.origin === window.location.origin) {
          return;
        }

        var opensNewTab = target.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        if (opensNewTab) {
          gtag('event', 'conversion', {
            'send_to': 'AW-16954338776/J2hgCInnw5ccENjbupQ_',
            'value': 1.0,
            'currency': 'VND'
          });
          return;
        }

        event.preventDefault();
        var navigated = false;
        var navigate = function () {
          if (navigated) return;
          navigated = true;
          window.location.href = target.href;
        };

        gtag('event', 'conversion', {
          'send_to': 'AW-16954338776/J2hgCInnw5ccENjbupQ_',
          'value': 1.0,
          'currency': 'VND',
          'event_callback': navigate
        });

        window.setTimeout(navigate, 800);
      }, true);
    </script>`;
  const siteChatTag = pathname.startsWith('/admin') ? '' : `<script src="/chat-widget.js?v=${STYLE_VERSION}" defer></script>`;
  const shouldRenderMobileBottomNav =
    pathname === '/' ||
    pathname === '/goi-esim' ||
    pathname.startsWith('/plans/') ||
    pathname.startsWith('/mua-goi') ||
    pathname.startsWith('/thanh-toan/') ||
    pathname.startsWith('/thanh-toan-thanh-cong/') ||
    pathname.startsWith('/tra-cuu-don') ||
    pathname.startsWith('/don-cua-toi');

  return `<!doctype html>
<html lang="vi">
  <head>
    ${googleTagCore}
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${escapeHtml(robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')}" />
    <meta name="theme-color" content="#b42318" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="${escapeHtml(faviconUrl)}" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="/styles.css?v=${STYLE_VERSION}" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(context.siteName)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${socialImageUrl}" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${socialImageUrl}" />
    ${schemas}
    ${googleAdsTag}
    ${headScripts ?? ''}
  </head>
  <body${bodyClass ? ` class="${bodyClass}"` : ''}>
    <div class="page-shell">
      ${body}
    </div>
    ${shouldRenderMobileBottomNav ? renderMobileBottomNav(pathname) : ''}
    ${siteChatTag}
    <script>${pageScript}</script>
  </body>
</html>`;
};

const header = (
  context: RenderContext,
  options: {
    ctaHref?: string;
    ctaLabel?: string;
  } = {},
) => `
<header class="site-header">
  <div class="header-inner">
    <a href="/" class="brand${hasCustomLogo(context) ? ' brand-logo-only' : ''}" aria-label="${escapeHtml(context.siteName)}">
      ${renderBrandMark(context)}
      ${hasCustomLogo(context)
        ? ''
        : `<span class="brand-copy">
        <strong>${escapeHtml(context.siteName)}</strong>
        <span>${brand.domain}</span>
      </span>`}
    </a>
    <nav class="header-nav" aria-label="Điều hướng chính">
      <a href="/#packages">Các gói</a>
      <a href="/#reviews">Đánh giá</a>
      <a href="/#how">Cách dùng</a>
    </nav>
    <div class="header-actions">
      <a class="header-link" href="/tra-cuu-don">Đơn của tôi</a>
      <a class="header-support" href="mailto:${context.supportEmail}">Chăm sóc khách hàng</a>
      <a href="${options.ctaHref ?? buildPurchasePath()}" class="nav-cta">${options.ctaLabel ?? 'Mua gói'}</a>
    </div>
  </div>
</header>
`;

const footer = (context: RenderContext) => `
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand">
      <strong>${escapeHtml(context.siteName)}</strong>
      <p>${escapeHtml(context.footerDescription)}</p>
    </div>
    <div class="footer-meta">
      <nav class="footer-links" aria-label="Liên kết footer">
        <a href="/#packages">Các gói</a>
        <a href="/#reviews">Đánh giá</a>
        <a href="/#devices">Thiết bị</a>
        <a href="/#how">Cách dùng</a>
      </nav>
      <div class="footer-contact">
        <a href="/tra-cuu-don">Đơn của tôi</a>
        <a href="mailto:${context.supportEmail}">${context.supportEmail}</a>
      </div>
    </div>
  </div>
</footer>
`;

const adminFlash = (flash?: AdminFlash | null) =>
  flash
    ? `<div class="admin-flash admin-flash-${flash.kind}">
  <strong>${flash.kind === 'success' ? 'Đã cập nhật' : flash.kind === 'error' ? 'Có lỗi' : 'Thông báo'}</strong>
  <p>${escapeHtml(flash.message)}</p>
</div>`
    : '';

const adminHeader = (username: string) => `
<header class="admin-topbar">
  <div class="wrap admin-topbar-inner">
    <div class="admin-topbar-copy">
      <span class="section-kicker">Admin eSIM CN</span>
      <strong>Quản lý giá bán và kiểm tra đơn</strong>
      <p>Đăng nhập với tài khoản <b>${escapeHtml(username)}</b>. Giá lưu ở đây sẽ đè lên catalog bán thật trên site.</p>
    </div>
    <div class="admin-topbar-actions">
      <a class="button button-secondary" href="/">Về trang chủ</a>
      <form action="/admin/logout" method="post">
        <button class="button button-primary" type="submit">Đăng xuất</button>
      </form>
    </div>
  </div>
</header>
`;

const productCards = plans
  .map(
    (plan) => `
<article class="product-card reveal${plan.shortLabel === 'Bán chạy' ? ' product-card-featured' : ''}">
  <div class="product-card-top">
    <span class="product-badge">${plan.shortLabel}</span>
    <span class="product-pill">${plan.validity}</span>
  </div>
  <div class="product-visual">
    <span class="product-visual-label">${plan.coverage}</span>
    <strong class="product-visual-main">${plan.dataAllowance}</strong>
    <span class="product-visual-sub">${plan.validity}</span>
  </div>
  <div class="product-head product-head-compact">
    <h3 class="product-name">${renderPlanTitleContent(plan)}</h3>
    <p class="product-fit">${plan.idealFor}</p>
  </div>
  <div class="product-price-row">
    <div class="price-block">
      <strong class="price-main">${plan.priceVnd}</strong>
      <span class="price-sub">${moneyUsd.format(plan.priceUsd)}</span>
    </div>
    <span class="price-flag">${plan.delivery}</span>
  </div>
  <div class="product-chip-row">
    <span>${plan.coverage}</span>
    <span>${plan.speed}</span>
    <span>Hotspot</span>
  </div>
  <div class="card-actions">
    <a class="button button-primary" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
    <a class="text-link" href="/plans/${plan.slug}">Xem chi tiết</a>
  </div>
</article>`,
  )
  .join('');

const marketShortcuts = plans
  .map(
    (plan) => `
<a class="shortcut-card reveal" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">
  <span class="shortcut-badge">${plan.shortLabel}</span>
  <strong>${renderPlanTitleContent(plan)}</strong>
  <span>${plan.priceVnd}</span>
</a>`,
  )
  .join('');

const heroDealCards = plans
  .slice(0, 3)
  .map(
    (plan) => `
<a class="hero-deal-card reveal" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">
  <div>
    <span class="hero-deal-kicker">${plan.shortLabel}</span>
    <strong>${renderPlanTitleContent(plan)}</strong>
  </div>
  <div class="hero-deal-meta">
    <span>${plan.dataAllowance}</span>
    <span>${plan.priceVnd}</span>
  </div>
</a>`,
  )
  .join('');

const compactProofTiles = proofPoints
  .map(
    (item) => `
<article class="compact-tile reveal">
  <strong>${item.title}</strong>
  <p>${item.copy}</p>
</article>`,
  )
  .join('');

const compactStepTiles = buyingSteps
  .map(
    (item, index) => `
<article class="compact-step reveal">
  <span class="compact-step-index">0${index + 1}</span>
  <strong>${item.title}</strong>
  <p>${item.copy}</p>
</article>`,
  )
  .join('');

const compactGuideLabels = ['Chọn gói nào?', 'Cài trước khi bay', 'Khác SIM vật lý ra sao?'];

const compactGuideCards = articles
  .map(
    (article, index) => `
<a class="mini-guide-card reveal" href="/blog/${article.slug}">
  <span>${article.readingTime}</span>
  <strong>${compactGuideLabels[index] ?? article.title}</strong>
</a>`,
  )
  .join('');

const faqPills = faqs
  .slice(0, 4)
  .map(
    (item) => `
<article class="faq-pill reveal">
  <span>FAQ</span>
  <strong>${item.question}</strong>
</article>`,
  )
  .join('');

const planShelfMeta: Record<
  string,
  {
    theme: string;
    groups: string[];
    posterTitle: string;
    posterMeta: string;
    network: string;
    reviewScore: string;
    reviewCount: string;
    note: string;
  }
> = {
  'china-esim-1gb-7-days': {
    theme: 'theme-plum',
    groups: ['mainland', 'short'],
    posterTitle: 'Trung Quốc đại lục',
    posterMeta: '1GB | 7 ngày',
    network: 'Mạng 5G',
    reviewScore: '4.7',
    reviewCount: '16.619',
    note: 'Đặt ngay, dùng hôm nay',
  },
  'china-esim-3gb-15-days': {
    theme: 'theme-sky',
    groups: ['mainland', 'short', 'popular'],
    posterTitle: 'Du lịch Trung Quốc',
    posterMeta: '3GB | 15 ngày',
    network: 'Bán chạy',
    reviewScore: '4.8',
    reviewCount: '26.804',
    note: 'Gói dễ chọn nhất cho phần lớn chuyến đi',
  },
  'china-esim-10gb-30-days': {
    theme: 'theme-royal',
    groups: ['mainland', 'long'],
    posterTitle: 'Trung Quốc dài ngày',
    posterMeta: '10GB | 30 ngày',
    network: 'Nhiều data',
    reviewScore: '4.8',
    reviewCount: '8.856',
    note: 'Phù hợp đi dài ngày hoặc phát hotspot',
  },
  'greater-china-esim-20gb-30-days': {
    theme: 'theme-violet',
    groups: ['combo', 'long'],
    posterTitle: 'Trung Quốc / Hong Kong / Macau',
    posterMeta: '20GB | 30 ngày',
    network: 'Liên vùng',
    reviewScore: '4.9',
    reviewCount: '7.144',
    note: 'Một gói cho lịch trình nhiều điểm',
  },
};

const marketTabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'mainland', label: 'Trung Quốc đại lục' },
  { key: 'combo', label: 'Hong Kong / Macau' },
  { key: 'short', label: '7 - 15 ngày' },
  { key: 'long', label: '30 ngày' },
]
  .map(
    (tab, index) => `
<button class="market-tab${index === 0 ? ' is-active' : ''}" type="button" data-market-tab="${tab.key}">
  ${tab.label}
</button>`,
  )
  .join('');

const marketplaceCards = plans
  .map((plan) => {
    const meta = planShelfMeta[plan.slug] ?? {
      theme: 'theme-plum',
      groups: ['mainland'],
      posterTitle: plan.coverage,
      posterMeta: `${plan.dataAllowance} | ${plan.validity}`,
      network: plan.shortLabel,
      reviewScore: '4.8',
      reviewCount: '1.248',
      note: 'Đặt nhanh, dùng ngay khi hạ cánh',
    };

    return `
<article class="travel-card reveal" data-market-card data-groups="${meta.groups.join(' ')}">
  <a class="travel-card-media-link" href="/plans/${plan.slug}">
    <div class="travel-card-media ${meta.theme}">
      <span class="travel-network-pill">${meta.network}</span>
      <div class="travel-poster-copy">
        <strong>${meta.posterTitle}</strong>
        <span>${meta.posterMeta}</span>
      </div>
      <div class="travel-device-badge">eSIM</div>
    </div>
  </a>
  <div class="travel-card-body">
    <a class="travel-card-title" href="/plans/${plan.slug}">
      <h3>${getPublicPlanName(plan)}</h3>
    </a>
    <div class="travel-rating-row">
      <span class="travel-rating-badge">${meta.reviewScore} / 5</span>
      <span>${meta.reviewCount} đánh giá</span>
    </div>
    <div class="travel-card-note">${meta.note}</div>
    <div class="travel-price-row">
      <span>Từ</span>
      <strong>${plan.priceVnd}</strong>
    </div>
    <div class="travel-card-actions">
      <a class="travel-buy-link" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
      <a class="travel-detail-link" href="/plans/${plan.slug}">Chi tiết</a>
    </div>
  </div>
</article>`;
  })
  .join('');

const serviceCards = serviceHighlights
  .map(
    (item) => `
<article class="service-card reveal">
  <strong>${item.title}</strong>
  <p>${item.copy}</p>
</article>`,
  )
  .join('');

const proofRowsCompact = proofPoints
  .map(
    (item) => `
<article class="info-row reveal">
  <strong>${item.title}</strong>
  <p>${item.copy}</p>
</article>`,
  )
  .join('');

const stepRowsCompact = buyingSteps
  .map(
    (item, index) => `
<article class="step-row reveal">
  <span>0${index + 1}</span>
  <div>
    <strong>${item.title}</strong>
    <p>${item.copy}</p>
  </div>
</article>`,
  )
  .join('');

const guideLinksCompact = articles
  .map(
    (article) => `
<a class="guide-row reveal" href="/blog/${article.slug}">
  <span>${article.readingTime}</span>
  <strong>${article.title}</strong>
</a>`,
  )
  .join('');

const faqRowsCompact = faqs
  .slice(0, 4)
  .map(
    (item) => `
<article class="qa-row reveal">
  <strong>${item.question}</strong>
  <p>${item.answer}</p>
</article>`,
  )
  .join('');

const marketTabDefinitions = [
  { key: 'all', label: 'Tất cả' },
  { key: 'mainland', label: 'Đại lục' },
  { key: 'combo', label: 'HK / Macau' },
  { key: 'regional', label: 'Liên vùng' },
  { key: 'short', label: '7 - 15 ngày' },
  { key: 'long', label: '30 ngày+' },
  { key: 'daily', label: 'Theo ngày' },
];

const themeByGroup: Record<string, string[]> = {
  mainland: ['theme-plum', 'theme-sky', 'theme-royal'],
  combo: ['theme-violet', 'theme-teal'],
  regional: ['theme-sky', 'theme-gold'],
  daily: ['theme-gold', 'theme-royal', 'theme-teal'],
};

const getPlanGroups = (plan: Plan) => {
  if (plan.groups && plan.groups.length > 0) {
    return plan.groups;
  }

  return [plan.catalogGroup ?? 'mainland'];
};

const getPlanTheme = (plan: Plan, index: number) => {
  const group = plan.catalogGroup ?? 'mainland';
  const palette = themeByGroup[group] ?? themeByGroup.mainland;
  return palette[index % palette.length];
};

const getPlanPosterTitle = (plan: Plan) => {
  if (plan.catalogGroup === 'combo') {
    return 'Trung Quốc + HK + Macau';
  }

  if (plan.catalogGroup === 'regional') {
    return 'Liên vùng có Trung Quốc';
  }

  if (plan.catalogGroup === 'daily') {
    return 'Gói theo ngày';
  }

  return 'Trung Quốc đại lục';
};

const getPlanPosterMeta = (plan: Plan) => `${plan.dataAllowance} | ${plan.validity}`;
const isUnlimitedDayPlan = (plan: Plan) => Boolean(plan.periodRequired || plan.dataType === 2);
const normalizeFupLabel = (value?: string | null) => String(value ?? '').replace(/\s+/g, ' ').trim();
const getUnlimitedUsageLabel = (planLike?: { fupPolicy?: string | null; fup?: string | null } | null) => {
  const fup = normalizeFupLabel(planLike?.fupPolicy ?? planLike?.fup ?? '');
  return fup ? `Hết tốc độ cao về tốc độ thường ${fup}` : 'Hết tốc độ cao vẫn dùng tiếp';
};
function getPlanAccessBadgeLabel(plan: Plan) {
  return plan.googleAccess ? 'Unlimited Apps' : '';
}

function renderPlanTitleContent(plan: Plan) {
  const accent = getPlanAccessBadgeLabel(plan);
  return `<span class="plan-title-inline"><span class="plan-title-copy">${escapeHtml(getPublicPlanName(plan))}</span>${
    accent ? `<span class="plan-title-badge is-apps">${escapeHtml(accent)}</span>` : ''
  }</span>`;
}

function getPlanOptionLabel(plan: Plan) {
  return `${getPublicPlanName(plan)}${plan.googleAccess ? ' · Unlimited Apps' : ''}`;
}
const renderBadgeChip = (label: string, tone: 'tiktok' | 'unlimited', dataAttr = '', hidden = false) =>
  `<span class="home-inline-badge is-${tone} badge-has-icon"${dataAttr}${hidden ? ' hidden' : ''}><span class="badge-icon">${renderMobileIcon(
    tone === 'tiktok' ? 'tiktok' : 'spark',
  )}</span><span>${escapeHtml(label)}</span></span>`;
const renderMobileBrandLink = (context: RenderContext, extraClass = '', href = '/') =>
  `<a class="mobile-app-brand${hasCustomLogo(context) ? ' mobile-app-brand-logo-only' : ' mobile-app-brand-wordmark'}${extraClass ? ` ${extraClass}` : ''}" href="${href}" aria-label="${escapeHtml(context.siteName)}">
    ${
      hasCustomLogo(context)
        ? renderMobileBrandImage(context, 'mobile-app-brand-image')
        : `<span class="mobile-app-brand-copy">
        <strong>eSIM</strong>
        <small>CHINA</small>
      </span>`
    }
  </a>`;
const renderMobileBottomNav = (pathname: string) => {
  const navItems = [
    { href: '/', label: 'Trang Chủ', icon: 'home' as const, active: pathname === '/' },
    { href: '/goi-esim', label: 'Gói eSIM', icon: 'grid' as const, active: pathname === '/goi-esim' || pathname.startsWith('/plans/') },
    {
      href: '/mua-goi',
      label: 'Mua gói',
      icon: 'cart' as const,
      active: pathname.startsWith('/mua-goi') || pathname.startsWith('/thanh-toan/') || pathname.startsWith('/thanh-toan-thanh-cong/'),
    },
    {
      href: '/tra-cuu-don',
      label: 'Đơn của tôi',
      icon: 'file' as const,
      active: pathname.startsWith('/tra-cuu-don') || pathname.startsWith('/don-cua-toi'),
    },
    { href: '/#how', label: 'Hướng dẫn', icon: 'book' as const, active: false },
  ];

  return `<nav class="mobile-bottom-nav" aria-label="Điều hướng mobile">
    <div class="mobile-bottom-nav-grid">
      ${navItems
        .map(
          (item) => `
      <a class="mobile-bottom-nav-link${item.active ? ' is-active' : ''}" href="${item.href}">
        <span class="mobile-bottom-nav-icon">${renderMobileIcon(item.icon)}</span>
        <span>${item.label}</span>
      </a>`,
        )
        .join('')}
    </div>
  </nav>`;
};
const renderSupportIconRow = (enabled: boolean, dataAttr = '', hidden = false) => {
  if (!enabled) {
    return `<div class="support-app-row"${dataAttr}${hidden ? ' hidden' : ''}><span class="support-app-text">Mạng nội địa</span></div>`;
  }

  const icons = [
    { key: 'tiktok', label: 'TikTok', tone: 'tiktok' },
    { key: 'google', label: 'Google', tone: 'google' },
    { key: 'gmail', label: 'Gmail', tone: 'gmail' },
    { key: 'maps', label: 'Maps', tone: 'maps' },
    { key: 'facebook', label: 'Facebook', tone: 'facebook' },
    { key: 'apps', label: 'All Apps', tone: 'apps' },
  ] as const;

  return `<div class="support-app-row"${dataAttr}${hidden ? ' hidden' : ''} aria-label="Ứng dụng hỗ trợ">
    ${icons
      .map(
        (item) =>
          `<span class="support-app-icon is-${item.tone}" title="${item.label}" aria-label="${item.label}">${renderMobileIcon(item.key)}</span>`,
      )
      .join('')}
  </div>`;
};

const getPlanSupportNote = (plan: Plan) => {
  if (plan.periodRequired) {
    return `${getUnlimitedUsageLabel(plan)} · nhập số ngày`;
  }

  if (plan.supportTopUpType && plan.supportTopUpType > 0) {
    return 'Có thể mua thêm dung lượng trong quá trình sử dụng';
  }

  if (plan.ipExport) {
    return `IP thoát ${plan.ipExport}`;
  }

  return plan.delivery;
};

const getFeaturedPlanSupportCopy = (plan: Plan) =>
  plan.googleAccess
    ? 'TikTok, Google, Gmail, Maps và các app phổ biến dùng ổn định.'
    : 'Mạng nội địa ổn định, nhận QR qua email để cài trước chuyến đi.';

const getPlanTag = (plan: Plan) => {
  if (plan.periodRequired) {
    return 'Day pass';
  }

  return plan.shortLabel;
};

const getHomeShowcaseTag = (plan: Plan) => {
  if (plan.dataType === 2) {
    return 'Reset ngày';
  }

  return 'Trọn gói';
};
const getFeaturedPlanCardName = (plan: Plan) => (isUnlimitedDayPlan(plan) ? getDayPassCompactName(plan, 1) : getPublicPlanName(plan));
const getFeaturedPlanPriceLabel = (plan: Plan) => (isUnlimitedDayPlan(plan) ? 'Giá 1 ngày' : 'Giá trọn gói');

const getPlanInternetNote = (plan: Plan) => {
  if (plan.googleAccess) {
    return 'TikTok / Google / Gmail / Maps / Facebook';
  }

  return 'Mạng nội bộ Trung Quốc';
};

const getPlanOperationalNote = (plan: Plan) => {
  if (plan.periodRequired) {
    return `${getUnlimitedUsageLabel(plan)} · giá tính theo số ngày`;
  }

  if (plan.supportTopUpType && plan.supportTopUpType > 0) {
    return 'Có thể mua thêm dung lượng trong quá trình sử dụng';
  }

  return 'QR gửi qua email';
};

const getDayPassDiscount = (_days: number) => ({ rate: 0, label: 'Chưa giảm giá' });

const getDayPassTotalUsd = (plan: Plan, days: number) => {
  const safeDays = Math.max(1, Math.min(DAY_PASS_MAX_DAYS, Math.round(days)));
  const discount = getDayPassDiscount(safeDays);
  return Number((plan.priceUsd * safeDays * (1 - discount.rate)).toFixed(2));
};

const getDayPassVariantLabel = (plan: Plan) => {
  const coverage = plan.locations ?? [];
  const isRegional = coverage.includes('Nhật Bản') || coverage.includes('Hàn Quốc');
  const isCombo = coverage.includes('Hong Kong') || coverage.includes('Macau');
  const route = plan.ipExport ? `IP ${plan.ipExport}` : 'IP quốc tế';
  const speed = plan.fupPolicy?.includes('1 Mbps') ? '1Mbps' : '';

  if (isRegional) {
    return 'CN + JP + KR';
  }

  if (isCombo) {
    return coverage.includes('Macau') ? 'CN + HK + Macau' : 'CN + HK';
  }

  if (speed) {
    return `${speed} · ${route}`;
  }

  return `Đại lục · ${route}`;
};

const getDayPassVariantDetail = (plan: Plan) => {
  const detailBits = [getPlanInternetNote(plan)];
  if (plan.fupPolicy) {
    detailBits.push(`FUP ${plan.fupPolicy}`);
  }
  if (plan.coverage && plan.coverage !== 'Trung Quốc đại lục') {
    detailBits.push(plan.coverage);
  }
  return detailBits.join(' · ');
};

const getMainlandOnlyPlans = (planList: Plan[]) => planList.filter((plan) => plan.coverage === 'Trung Quốc đại lục' && plan.googleAccess);

const getMobileResetPlans = (planList: Plan[]) =>
  getMainlandOnlyPlans(planList)
    .filter((plan) => plan.dataType === 2)
    .sort((left, right) => getPlanDataAllowanceMb(left) - getPlanDataAllowanceMb(right) || left.priceUsd - right.priceUsd);

const getMobileTotalPlans = (planList: Plan[]) =>
  getMainlandOnlyPlans(planList)
    .filter((plan) => plan.dataType === 1 && !plan.periodRequired)
    .sort(
      (left, right) =>
        (left.durationDays ?? 0) - (right.durationDays ?? 0) ||
        getPlanDataAllowanceMb(left) - getPlanDataAllowanceMb(right) ||
        left.priceUsd - right.priceUsd,
    );

const getMobileUnlimitedPlans = (planList: Plan[]) =>
  getMainlandOnlyPlans(planList)
    .filter((plan) => plan.dataType === 4)
    .sort((left, right) => getPlanDataAllowanceMb(left) - getPlanDataAllowanceMb(right) || left.priceUsd - right.priceUsd);

const getMobileTikTokPlans = (planList: Plan[]) =>
  getMainlandOnlyPlans(planList)
    .filter((plan) => plan.dataType === 1 && !plan.periodRequired && plan.tiktokPreferred)
    .sort(
      (left, right) =>
        (left.durationDays ?? 0) - (right.durationDays ?? 0) ||
        getPlanDataAllowanceMb(left) - getPlanDataAllowanceMb(right) ||
        left.priceUsd - right.priceUsd,
    );

type InternalPricingRow = {
  group: string;
  title: string;
  note: string;
  costVnd: number;
  sellVnd: number;
  profitVnd: number;
  marginPct: number;
};

type InternalPricingBlueprint = {
  group: string;
  slug: string;
  title: string;
  note: string;
  sellVnd: number;
  days?: number;
};

const INTERNAL_PRICING_BLUEPRINTS: InternalPricingBlueprint[] = [
  { group: 'Theo ngày', slug: 'CN_1_Daily', days: 1, sellVnd: 39000, title: '1GB/ngày · 1 ngày', note: 'Gói kéo khách' },
  { group: 'Theo ngày', slug: 'CN_1_Daily', days: 2, sellVnd: 59000, title: '1GB/ngày · 2 ngày', note: 'Gói kéo khách' },
  { group: 'Theo ngày', slug: 'CN_1_Daily', days: 3, sellVnd: 69000, title: '1GB/ngày · 3 ngày', note: 'Gói kéo khách' },
  { group: 'Theo ngày', slug: 'CN_2_Daily', days: 1, sellVnd: 69000, title: '2GB/ngày · 1 ngày', note: 'Data nặng hơn' },
  { group: 'Theo ngày', slug: 'CN_2_Daily', days: 2, sellVnd: 99000, title: '2GB/ngày · 2 ngày', note: 'Data nặng hơn' },
  { group: 'Theo ngày', slug: 'CN_2_Daily', days: 3, sellVnd: 109000, title: '2GB/ngày · 3 ngày', note: 'Data nặng hơn' },
  { group: 'Trọn gói', slug: 'CN_1_7', sellVnd: 39000, title: '1GB · 7 ngày', note: 'Mốc 4-7 ngày' },
  { group: 'Trọn gói', slug: 'CN_3_15', sellVnd: 99000, title: '3GB · 15 ngày', note: 'Mốc bán chính' },
  { group: 'Trọn gói', slug: 'CN_3_30', sellVnd: 109000, title: '3GB · 30 ngày', note: 'Đi nhẹ, ở lâu' },
  { group: 'Trọn gói', slug: 'CN_5_30', sellVnd: 149000, title: '5GB · 30 ngày', note: 'Mốc bán chính' },
  { group: 'Trọn gói', slug: 'CN_10_30', sellVnd: 219000, title: '10GB · 30 ngày', note: 'Nhiều data hơn' },
  { group: 'Trọn gói', slug: 'CN_20_30', sellVnd: 309000, title: '20GB · 30 ngày', note: 'Biên mỏng hơn' },
  { group: 'TikTok', slug: 'CN_1_7_nonhkip', sellVnd: 49000, title: 'TikTok 1GB · 7 ngày', note: 'IP SG' },
  { group: 'TikTok', slug: 'CN_3_15_nonhkip', sellVnd: 119000, title: 'TikTok 3GB · 15 ngày', note: 'IP SG' },
  { group: 'TikTok', slug: 'CN_5_30_nonhkip', sellVnd: 169000, title: 'TikTok 5GB · 30 ngày', note: 'IP SG' },
] as const;

type InternalPricingReviewBlueprint = {
  slug: string;
  title: string;
  note: string;
  proposedSellVnd: number;
  benchmarkVnd?: number;
  benchmarkLabel?: string;
};

type InternalPricingReviewRow = {
  title: string;
  note: string;
  costVnd: number;
  currentSellVnd: number | null;
  proposedSellVnd: number;
  upliftVnd: number;
  profitVnd: number;
  marginPct: number;
  benchmarkVnd: number | null;
  benchmarkLabel: string | null;
  benchmarkGapVnd: number | null;
};

const INTERNAL_CURRENT_SELL_MAP = new Map(
  INTERNAL_PRICING_BLUEPRINTS.filter((item) => typeof item.days !== 'number').map((item) => [item.slug, item.sellVnd]),
);

const INTERNAL_PRICING_REVIEW_BLUEPRINTS: InternalPricingReviewBlueprint[] = [
  {
    slug: 'CN_1_7',
    title: '1GB · 7 ngày',
    note: 'Gói vào cửa, vẫn nên neo quanh 99k để khỏi bán quá rẻ.',
    proposedSellVnd: 99000,
    benchmarkVnd: 96000,
    benchmarkLabel: 'Roafly 1GB / 7 ngày',
  },
  {
    slug: 'CN_3_15',
    title: '3GB · 15 ngày',
    note: 'Gói khách đi 1 đến 2 tuần, đủ đẹp để làm mốc chốt đơn.',
    proposedSellVnd: 159000,
  },
  {
    slug: 'CN_5_30',
    title: '5GB · 30 ngày',
    note: 'Nên đẩy thành gói bán chính vì dễ chốt hơn 3GB / 30 ngày.',
    proposedSellVnd: 199000,
    benchmarkVnd: 257000,
    benchmarkLabel: 'Roafly 5GB / 30 ngày',
  },
  {
    slug: 'CN_10_30',
    title: '10GB · 30 ngày',
    note: 'Giữ dưới mốc local phổ biến nhưng phải có room lợi nhuận.',
    proposedSellVnd: 319000,
    benchmarkVnd: 365000,
    benchmarkLabel: 'Sim2Go 10GB / 30 ngày',
  },
  {
    slug: 'CN_20_30',
    title: '20GB · 30 ngày',
    note: 'Gói data lớn cho khách ở lâu, target 399k vẫn còn dễ mua.',
    proposedSellVnd: 399000,
    benchmarkVnd: 624000,
    benchmarkLabel: 'Roafly 20GB / 30 ngày',
  },
  {
    slug: 'CN-3_20_30',
    title: 'CN + HK + Macau · 20GB · 30 ngày',
    note: 'Liên vùng nên giữ dưới combo local để vẫn cạnh tranh.',
    proposedSellVnd: 579000,
    benchmarkVnd: 585000,
    benchmarkLabel: 'Sim2Go combo 20GB / 30 ngày',
  },
] as const;

const INTERNAL_PRICING_RANGES = [
  { range: '1-3 ngày', offer: 'Theo ngày', note: 'Dùng làm gói kéo khách' },
  { range: '4-7 ngày', offer: '1GB/7 ngày hoặc 3GB/15 ngày', note: 'Ưu tiên trọn gói' },
  { range: '8-15 ngày', offer: '3GB/15 ngày', note: 'Mốc bán chính' },
  { range: '16-30 ngày', offer: '5GB/30 ngày hoặc 10GB/30 ngày', note: 'Mốc bán chính' },
  { range: '31-100 ngày', offer: '20GB/30 ngày + top-up hoặc 50GB/180 ngày', note: 'Không bán theo mốc lẻ' },
] as const;

const getInternalPricingReviewRows = (planList: Plan[]): InternalPricingReviewRow[] =>
  INTERNAL_PRICING_REVIEW_BLUEPRINTS.map((item): InternalPricingReviewRow | null => {
    const matchedPlan = planList.find((plan) => plan.slug === item.slug);
    if (!matchedPlan) {
      return null;
    }

    const costVnd = Math.max(0, Math.round((getSourcePlanPriceUsd(matchedPlan) * USD_TO_VND) / 1000) * 1000);
    const currentSellVnd = INTERNAL_CURRENT_SELL_MAP.get(item.slug) ?? null;
    const upliftBase = currentSellVnd ?? costVnd;
    const upliftVnd = item.proposedSellVnd - upliftBase;
    const profitVnd = Math.max(0, item.proposedSellVnd - costVnd);
    const marginPct = item.proposedSellVnd > 0 ? (profitVnd / item.proposedSellVnd) * 100 : 0;
    const benchmarkVnd = item.benchmarkVnd ?? null;

    return {
      title: item.title,
      note: item.note,
      costVnd,
      currentSellVnd,
      proposedSellVnd: item.proposedSellVnd,
      upliftVnd,
      profitVnd,
      marginPct,
      benchmarkVnd,
      benchmarkLabel: item.benchmarkLabel ?? null,
      benchmarkGapVnd: benchmarkVnd === null ? null : item.proposedSellVnd - benchmarkVnd,
    };
  }).filter((item): item is InternalPricingReviewRow => item !== null);

const renderInternalPricingReviewBoard = (planList: Plan[]) => {
  const rows = getInternalPricingReviewRows(planList);
  if (rows.length === 0) {
    return '';
  }

  const resetPlans = getMobileResetPlans(planList);
  const totalPlans = getMobileTotalPlans(planList);
  const tiktokPlans = getMobileTikTokPlans(planList);
  const comboRegionalCount = planList.filter(
    (plan) => plan.googleAccess && (plan.catalogGroup === 'combo' || plan.catalogGroup === 'regional'),
  ).length;

  return `
    <section class="internal-pricing-board internal-pricing-board-review reveal">
      <div class="internal-pricing-head internal-pricing-head-review">
        <small>Khung giá mình nên bán</small>
        <strong>Khối này chỉ là mốc giá cho gói chủ lực, không phải toàn bộ catalog</strong>
        <p>Mốc tham chiếu nội bộ ngày 29/03/2026. Phần dưới chỉ lấy vài gói đại diện để chốt giá bán. Catalog thật của anh vẫn gồm đủ gói theo ngày, trọn gói, TikTok và liên vùng.</p>
      </div>
      <div class="internal-pricing-ranges">
        <article class="internal-pricing-range">
          <strong>Theo ngày</strong>
          <span>${resetPlans.length} gói nền</span>
          <small>Nhóm reset ngày, chọn từ 1 đến 365 ngày rồi nhân theo số ngày dùng.</small>
        </article>
        <article class="internal-pricing-range">
          <strong>Trọn gói</strong>
          <span>${totalPlans.length} gói nền</span>
          <small>Gói mainland IP HK, mua một lần dùng trọn dung lượng trong thời hạn gói.</small>
        </article>
        <article class="internal-pricing-range">
          <strong>TikTok</strong>
          <span>${tiktokPlans.length} gói nền</span>
          <small>Gói mainland IP SG, tách riêng vì logic bán và định vị khác gói thường.</small>
        </article>
        <article class="internal-pricing-range">
          <strong>Liên vùng</strong>
          <span>${comboRegionalCount} gói</span>
          <small>Combo Hong Kong / Macau / Japan / Korea, không list hết trong bảng mốc bên dưới.</small>
        </article>
      </div>
      <div class="internal-pricing-grid internal-pricing-grid-review">
        ${rows
          .map(
            (item) => `
          <article class="internal-pricing-card internal-pricing-card-review">
            <div class="internal-pricing-card-head">
              <span>Khung mới</span>
              <strong>${item.title}</strong>
              <small>${item.note}</small>
            </div>
            <dl class="internal-pricing-stats internal-pricing-stats-review">
              <div><dt>Giá gốc</dt><dd>${formatVndAmount(item.costVnd)}</dd></div>
              <div><dt>Khung cũ</dt><dd>${item.currentSellVnd === null ? 'Chưa set' : formatVndAmount(item.currentSellVnd)}</dd></div>
              <div class="is-accent"><dt>Giá mình bán</dt><dd>${formatVndAmount(item.proposedSellVnd)}</dd></div>
              <div><dt>Nâng thêm</dt><dd>${formatSignedVndAmount(item.upliftVnd)}</dd></div>
              <div><dt>Lãi gộp</dt><dd>${formatVndAmount(item.profitVnd)}</dd></div>
              <div><dt>Biên</dt><dd>${item.marginPct.toFixed(1)}%</dd></div>
              ${
                item.benchmarkVnd === null || item.benchmarkLabel === null
                  ? ''
                  : `<div><dt>${item.benchmarkLabel}</dt><dd>${formatVndAmount(item.benchmarkVnd)}</dd></div>
              <div><dt>So mốc ngoài</dt><dd>${formatSignedVndAmount(item.benchmarkGapVnd ?? 0)}</dd></div>`
              }
            </dl>
          </article>`,
          )
          .join('')}
      </div>
    </section>`;
};

const getInternalPricingRows = (planList: Plan[]): InternalPricingRow[] =>
  INTERNAL_PRICING_BLUEPRINTS.map((item): InternalPricingRow | null => {
    const matchedPlan = planList.find((plan) => plan.slug === item.slug);
    if (!matchedPlan) {
      return null;
    }

    const costUsd =
      matchedPlan.periodRequired && typeof item.days === 'number'
        ? Number((getSourcePlanPriceUsd(matchedPlan) * item.days).toFixed(2))
        : getSourcePlanPriceUsd(matchedPlan);
    const costVnd = Math.max(0, Math.round((costUsd * USD_TO_VND) / 1000) * 1000);
    const profitVnd = Math.max(0, item.sellVnd - costVnd);
    const marginPct = item.sellVnd > 0 ? (profitVnd / item.sellVnd) * 100 : 0;

    return {
      group: item.group,
      title: item.title,
      note: item.note,
      costVnd,
      sellVnd: item.sellVnd,
      profitVnd,
      marginPct,
    };
  }).filter((item): item is InternalPricingRow => item !== null);

const renderInternalPricingBoard = (planList: Plan[]) => {
  const rows = getInternalPricingRows(planList);
  if (rows.length === 0) {
    return '';
  }

  return `
    <section class="internal-pricing-board reveal">
      <div class="internal-pricing-head">
        <small>Xem nội bộ</small>
        <strong>Bảng giá dự kiến để anh duyệt</strong>
        <p>Đây là giá đề xuất, chưa áp vào thanh toán thật. Cột gốc là giá vốn live từ Access, cột lãi là lãi gộp thô.</p>
      </div>
      <div class="internal-pricing-ranges">
        ${INTERNAL_PRICING_RANGES.map(
          (item) => `
          <article class="internal-pricing-range">
            <strong>${item.range}</strong>
            <span>${item.offer}</span>
            <small>${item.note}</small>
          </article>`,
        ).join('')}
      </div>
      <div class="internal-pricing-grid">
        ${rows
          .map(
            (item) => `
          <article class="internal-pricing-card">
            <div class="internal-pricing-card-head">
              <span>${item.group}</span>
              <strong>${item.title}</strong>
              <small>${item.note}</small>
            </div>
            <dl class="internal-pricing-stats">
              <div><dt>Giá gốc</dt><dd>${formatVndAmount(item.costVnd)}</dd></div>
              <div><dt>Giá bán</dt><dd>${formatVndAmount(item.sellVnd)}</dd></div>
              <div><dt>Lãi gộp</dt><dd>${formatVndAmount(item.profitVnd)}</dd></div>
              <div><dt>Biên</dt><dd>${item.marginPct.toFixed(1)}%</dd></div>
            </dl>
          </article>`,
          )
          .join('')}
      </div>
    </section>`;
};

const getMobileAvailableDayValues = (type: string, planList: Plan[]) => {
  const sourcePlans =
    type === 'total'
      ? getMobileTotalPlans(planList)
      : type === 'unlimited'
          ? getMobileUnlimitedPlans(planList)
          : [];

  return Array.from(new Set(sourcePlans.map((plan) => plan.durationDays ?? 0).filter((value) => value > 0))).sort((left, right) => left - right);
};

const getMobileDayShortcutValues = (type: string, availableDays: number[]) =>
  type === 'reset' ? [1, 2, 3, 4, 5, 6, 7] : availableDays;

const renderMobileDayShortcutButtons = (values: number[], selectedDay: number) =>
  values
    .map(
      (day) => `
          <button
            class="mobile-app-day-shortcut${selectedDay === day ? ' is-selected' : ''}"
            type="button"
            data-mobile-day-shortcut="${day}"
          >
            ${day} ngày
          </button>`,
    )
    .join('');

const getMobileDaysGuide = (type: string, availableDays: number[] = []) => {
  if (type === 'reset') {
    return 'Điền số ngày hoặc kéo để chọn số ngày sử dụng.';
  }

  if (availableDays.length === 0) {
    return 'Chỉ chọn được các mốc ngày có sẵn trong catalog.';
  }

  return `Chỉ có sẵn mốc ${availableDays.join(' / ')} ngày.`;
};

const getMobileDataGuide = (type: string, dataLabel: string, dayValue: number) => {
  if (type === 'reset') {
    return 'Gói mạng được Reset mỗi ngày vào lúc 00h00.';
  }

  if (type === 'total') {
    return `Tổng dung lượng ${dataLabel} dùng trong ít nhất ${dayValue} ngày.`;
  }

  return `Gói không giới hạn dùng trong ${dayValue} ngày, theo chính sách FUP của nhà mạng.`;
};

const getMobileFocusNote = (type: string) => {
  if (type === 'reset') {
    return 'Giá sẽ đổi theo số ngày và mức GB/ngày anh chọn.';
  }

  if (type === 'total') {
    return 'Hệ thống sẽ tự chọn gói trọn rẻ nhất đủ số ngày và dung lượng anh chọn.';
  }

  return 'Đây là gói không giới hạn theo thời hạn và chính sách của nhà mạng.';
};

const renderMarketTabs = (planList: Plan[]) =>
  marketTabDefinitions
    .filter((tab) => tab.key === 'all' || planList.some((plan) => getPlanGroups(plan).includes(tab.key)))
    .map((tab, index) => {
      const count = tab.key === 'all' ? planList.length : planList.filter((plan) => getPlanGroups(plan).includes(tab.key)).length;
      return `
<button class="market-tab${index === 0 ? ' is-active' : ''}" type="button" data-market-tab="${tab.key}">
  ${tab.label} <span>${count}</span>
</button>`;
    })
    .join('');

const renderMarketplaceCards = (planList: Plan[]) =>
  planList
    .map((plan, index) => {
      const groups = getPlanGroups(plan);
      const operators = plan.operators?.slice(0, 2).join(', ') || plan.speed;
      const supportNote = getPlanSupportNote(plan);

      return `
<article class="travel-card reveal" data-market-card data-groups="${groups.join(' ')}">
  <a class="travel-card-media-link" href="/plans/${plan.slug}">
    <div class="travel-card-media ${getPlanTheme(plan, index)}">
      <span class="travel-network-pill">${getPlanTag(plan)}</span>
      <div class="travel-poster-copy">
        <strong>${getPlanPosterTitle(plan)}</strong>
        <span>${getPlanPosterMeta(plan)}</span>
      </div>
      <div class="travel-device-badge">QR</div>
    </div>
  </a>
  <div class="travel-card-body">
    <a class="travel-card-title" href="/plans/${plan.slug}">
      <h3>${getPublicPlanName(plan)}</h3>
    </a>
    <div class="travel-card-caption">${plan.coverage}</div>
    <div class="travel-chip-row">
      <span>${plan.dataAllowance}</span>
      <span>${plan.validity}</span>
      <span>${plan.speed}</span>
    </div>
    <div class="travel-meta-line">
      <span>${operators}</span>
      <span>${supportNote}</span>
    </div>
    <div class="travel-price-row">
      <span>Từ</span>
      <strong>${plan.priceVnd}</strong>
    </div>
    <div class="travel-card-actions">
      <a class="travel-buy-link" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
      <a class="travel-detail-link" href="/plans/${plan.slug}">Chi tiết</a>
    </div>
  </div>
</article>`;
    })
    .join('');

const planSelectGroups = [
  { key: 'reset', label: 'Gói reset ngày' },
  { key: 'package', label: 'Gói trọn gói' },
  { key: 'regional', label: 'Gói liên vùng' },
];

const renderPlanOptions = (planList: Plan[]) =>
  planSelectGroups
    .map((group) => {
      const items = planList.filter((plan) => {
        if (group.key === 'reset') {
          return isUnlimitedDayPlan(plan);
        }

        if (group.key === 'package') {
          return !isUnlimitedDayPlan(plan) && plan.catalogGroup !== 'combo' && plan.catalogGroup !== 'regional';
        }

        return plan.catalogGroup === 'combo' || plan.catalogGroup === 'regional';
      });
      if (items.length === 0) {
        return '';
      }

      return `<optgroup label="${group.label}">
        ${items
          .map(
            (plan) =>
              `<option value="${plan.slug}" data-period-required="${plan.periodRequired ? 'true' : 'false'}" data-plan-handle="${getPlanPublicHandle(plan)}" data-plan-name="${getPublicPlanName(plan)}" data-plan-price="${plan.priceVnd}" data-plan-price-usd="${plan.priceUsd}" data-plan-meta="${getPlanInternetNote(plan)} · ${getPlanOperationalNote(plan)}" data-plan-data="${plan.dataAllowance}" data-plan-days="${plan.validity}" data-plan-route="${plan.ipExport ?? ''}" data-plan-fup="${plan.fupPolicy ?? ''}" data-plan-variant="${getDayPassVariantLabel(plan)}" data-plan-variant-detail="${getDayPassVariantDetail(plan)}" data-plan-topup="${plan.supportTopUpType && plan.supportTopUpType > 0 ? 'true' : 'false'}">${getPlanOptionLabel(plan)} • ${plan.priceVnd}</option>`,
          )
          .join('')}
      </optgroup>`;
    })
    .join('');

const getRelatedPlans = (planList: Plan[], plan: Plan) => {
  const sameGroup = planList.filter((item) => item.slug !== plan.slug && item.catalogGroup === plan.catalogGroup);
  if (sameGroup.length >= 3) {
    return sameGroup.slice(0, 3);
  }

  return [...sameGroup, ...planList.filter((item) => item.slug !== plan.slug && item.catalogGroup !== plan.catalogGroup)].slice(0, 3);
};

const renderHeroPlanChips = (planList: Plan[]) =>
  planList
    .slice(0, 3)
    .map(
      (plan) => `
<article class="trip-mini-plan reveal">
  <span>${plan.catalogGroup === 'combo' ? 'Hong Kong / Macau' : plan.catalogGroup === 'daily' ? 'Theo ngày' : 'Trung Quốc đại lục'}</span>
  <strong>${plan.dataAllowance} · ${plan.validity}</strong>
  <small>Từ ${plan.priceVnd}</small>
</article>`,
    )
    .join('');

const renderTripPlanRows = (planList: Plan[]) =>
  planList
    .map((plan) => {
      const groups = getPlanGroups(plan);
      const operators = plan.operators?.slice(0, 2).join(', ') || plan.speed;

      return `
<article class="trip-plan-row reveal" data-market-card data-groups="${groups.join(' ')}">
  <div class="trip-plan-main">
    <span class="trip-plan-tag">${getPlanTag(plan)}</span>
    <a class="trip-plan-title" href="/plans/${plan.slug}">
      <h3>${getPublicPlanName(plan)}</h3>
    </a>
    <p>${plan.coverage}</p>
  </div>
  <div class="trip-plan-meta">
    <span>${plan.dataAllowance}</span>
    <span>${plan.validity}</span>
    <span>${operators}</span>
    <span>${plan.ipExport ? `IP ${plan.ipExport}` : 'IP quốc tế'}</span>
  </div>
  <div class="trip-plan-side">
    <small>${getPlanInternetNote(plan)}</small>
    <strong>${plan.priceVnd}</strong>
    <a class="trip-plan-button" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
  </div>
</article>`;
    })
    .join('');

const getCatalogPlanBadge = (plan: Plan) => {
  if (plan.periodRequired || plan.dataType === 2) {
    return 'Theo ngày';
  }

  if (plan.dataType === 4) {
    return 'Không giới hạn';
  }

  if (plan.catalogGroup === 'combo') {
    return 'HK / Macau';
  }

  if (plan.catalogGroup === 'regional') {
    return 'Liên vùng';
  }

  return 'Trọn gói';
};

const getCatalogRouteKey = (plan: Plan) => {
  const route = String(plan.ipExport ?? '').trim().toUpperCase();
  if (route === 'HK') return 'hk';
  if (route === 'SG') return 'sg';
  if (route) return 'other';
  return 'none';
};

const renderStoreProductCards = (planList: Plan[], options: { filterable?: boolean } = {}) =>
  planList
    .map((plan, index) => {
      const groups = Array.from(
        new Set([
          ...getPlanGroups(plan),
          plan.periodRequired || plan.dataType === 2 ? 'daily' : 'package',
        ]),
      );
      const filterAttrs =
        options.filterable === false
          ? ''
          : ` data-market-card data-groups="${groups.join(' ')}" data-market-name="${escapeHtml(`${getPublicPlanName(plan)} ${plan.coverage} ${plan.dataAllowance} ${plan.validity}`.toLowerCase())}" data-market-price="${parseVndLabelToAmount(plan.priceVnd) ?? Math.round(plan.priceUsd * USD_TO_VND)}" data-market-data="${getPlanDataAllowanceMb(plan)}" data-market-days="${plan.durationDays ?? 0}" data-market-order="${index}"`;
      const secondaryBadges = [
        plan.googleAccess
          ? `<span class="store-product-route is-tiktok badge-has-icon"><span class="badge-icon">${renderMobileIcon('tiktok')}</span><span>Hỗ trợ TikTok</span></span>`
          : plan.ipExport
            ? `<span class="store-product-route">IP ${plan.ipExport}</span>`
            : '',
        isUnlimitedDayPlan(plan)
          ? `<span class="store-product-route is-unlimited badge-has-icon"><span class="badge-icon">${renderMobileIcon('spark')}</span><span>${escapeHtml(getUnlimitedUsageLabel(plan))}</span></span>`
          : '',
      ]
        .filter(Boolean)
        .join('');

  return `
<article class="store-product-card reveal"${filterAttrs}>
  <div class="store-product-top">
    <span class="store-product-badge">${getCatalogPlanBadge(plan)}</span>
    ${secondaryBadges}
  </div>
  <div class="store-product-main">
    <h3>${renderPlanTitleContent(plan)}</h3>
    <p>${plan.coverage}</p>
  </div>
  <div class="store-product-stats">
    <div class="store-product-stat">
      <span>Dung lượng</span>
      <strong>${plan.dataAllowance}</strong>
    </div>
    <div class="store-product-stat">
      <span>Thời hạn</span>
      <strong>${plan.validity}</strong>
    </div>
    <div class="store-product-stat">
      <span>Hỗ trợ</span>
      <strong>${isUnlimitedDayPlan(plan) ? getUnlimitedUsageLabel(plan) : plan.googleAccess ? 'Unlimited Apps' : 'Data nội địa'}</strong>
    </div>
  </div>
  <div class="store-product-bottom">
    <div class="store-product-price">
      <small>${getPlanSupportNote(plan)}</small>
      <strong>${plan.priceVnd}</strong>
    </div>
    <a class="store-product-link" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
  </div>
  <div class="store-product-foot">
    ${renderSupportIconRow(Boolean(plan.googleAccess))}
    <small>${getPlanSupportNote(plan)}</small>
  </div>
</article>`;
    })
    .join('');

const renderHomeChoiceCards = (planList: Plan[]) =>
  planList
    .map((plan) => {
      const groups = getPlanGroups(plan);

      return `
<button
  class="trip-choice-card reveal"
  type="button"
  data-plan-choice
  data-market-card
  data-groups="${groups.join(' ')}"
  data-plan-target="${plan.slug}"
  data-plan-name="${getPublicPlanName(plan)}"
  data-plan-price="${plan.priceVnd}"
  data-plan-meta="${getPlanInternetNote(plan)} · ${getPlanOperationalNote(plan)}"
>
  <div class="trip-choice-top">
    <span class="trip-choice-badge">${getPlanTag(plan)}</span>
    <span class="trip-choice-route">${plan.ipExport ? `IP ${plan.ipExport}` : 'IP quốc tế'}</span>
  </div>
  <strong>${renderPlanTitleContent(plan)}</strong>
  <p>${plan.coverage}</p>
  <div class="trip-choice-meta">
    <span>${plan.dataAllowance}</span>
    <span>${plan.validity}</span>
    <span>${plan.speed}</span>
  </div>
  <div class="trip-choice-bottom">
    <small>${getPlanInternetNote(plan)}</small>
    <span>Từ <strong>${plan.priceVnd}</strong></span>
  </div>
</button>`;
    })
    .join('');

const renderTripSteps = () =>
  buyingSteps
    .map(
      (item, index) => `
<article class="trip-info-row reveal">
  <span>0${index + 1}</span>
  <div>
    <strong>${item.title}</strong>
    <p>${item.copy}</p>
  </div>
</article>`,
    )
    .join('');

const renderTripFaqRows = () =>
  faqs
    .slice(0, 4)
    .map(
      (item) => `
<article class="trip-faq-row reveal">
  <strong>${item.question}</strong>
  <p>${item.answer}</p>
</article>`,
    )
    .join('');

const getPlanDataAllowanceMb = (plan: Plan) => {
  const match = plan.dataAllowance.match(/(\d+(?:\.\d+)?)\s*(GB|MB)/i);
  if (!match) {
    return 0;
  }

  const value = Number.parseFloat(match[1] ?? '0');
  const unit = (match[2] ?? '').toUpperCase();
  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  return unit === 'GB' ? value * 1024 : value;
};

const getHomeFeaturedPlans = (planList: Plan[]) => {
  const mainlandFixed = planList
    .filter((plan) => plan.catalogGroup === 'mainland' && !plan.periodRequired)
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const daily = planList.filter((plan) => plan.catalogGroup === 'daily').sort((left, right) => left.priceUsd - right.priceUsd);

  const picked = [
    daily[0],
    daily[1],
    daily[Math.min(2, daily.length - 1)],
    daily[Math.min(3, daily.length - 1)],
    mainlandFixed[0],
    mainlandFixed[1],
    mainlandFixed[2],
    mainlandFixed[3],
  ].filter((plan, index, array): plan is Plan => Boolean(plan) && array.indexOf(plan) === index);

  if (picked.length >= 8) {
    return picked.slice(0, 8);
  }

  return [...picked, ...planList.filter((plan) => !picked.includes(plan))].slice(0, 8);
};

const getHomeChoicePlans = (planList: Plan[]) => {
  const mainlandFixed = planList
    .filter((plan) => plan.catalogGroup === 'mainland' && !plan.periodRequired)
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const combo = planList.filter((plan) => plan.catalogGroup === 'combo').sort((left, right) => left.priceUsd - right.priceUsd);
  const daily = planList.filter((plan) => plan.catalogGroup === 'daily').sort((left, right) => left.priceUsd - right.priceUsd);
  const practicalMainland = mainlandFixed.filter((plan) => getPlanDataAllowanceMb(plan) >= 1024);
  const mainlandPool = practicalMainland.length > 0 ? practicalMainland : mainlandFixed;

  const picked = [
    mainlandPool.find((plan) => (plan.durationDays ?? 0) <= 7 && getPlanDataAllowanceMb(plan) >= 1024) ?? mainlandPool[0],
    mainlandPool.find((plan) => (plan.durationDays ?? 0) >= 15 && getPlanDataAllowanceMb(plan) >= 3072) ?? mainlandPool[Math.min(1, mainlandPool.length - 1)],
    mainlandPool.find((plan) => (plan.durationDays ?? 0) >= 30 && getPlanDataAllowanceMb(plan) >= 10240) ??
      mainlandPool.find((plan) => (plan.durationDays ?? 0) >= 30) ??
      mainlandPool[Math.min(2, mainlandPool.length - 1)],
    combo.find((plan) => getPlanDataAllowanceMb(plan) >= 1024) ?? combo[0],
    daily.find((plan) => getPlanDataAllowanceMb(plan) >= 1024) ?? daily[0],
    daily.find((plan) => getPlanDataAllowanceMb(plan) >= 3072) ?? daily[Math.min(1, daily.length - 1)],
  ].filter((plan, index, array): plan is Plan => Boolean(plan) && array.indexOf(plan) === index);

  return picked.slice(0, 6);
};

const getDayPassPickerPlans = (planList: Plan[]) =>
  planList
    .filter((plan) => plan.catalogGroup === 'daily' && plan.googleAccess)
    .sort(
      (left, right) =>
        getPlanDataAllowanceMb(left) - getPlanDataAllowanceMb(right) ||
        left.priceUsd - right.priceUsd ||
        left.name.localeCompare(right.name, 'vi'),
    );

export const renderHomePage = (context: RenderContext, planList: Plan[] = plans, options: HomePageOptions = {}) => {
  const visiblePlans = getVisiblePlans(planList);
  const heroBannerImageUrls = getHomeHeroBannerUrls(context);
  const mobileBannerImageUrl = heroBannerImageUrls[0] ?? '';
  const renderHeroBannerImages = (className: string) =>
    heroBannerImageUrls
      .map(
        (url, index) =>
          `<img class="${className}${index === 0 ? ' is-active' : ''}" data-hero-banner-slide src="${escapeHtml(url)}" alt="${escapeHtml(context.homeHeroTitle)}${heroBannerImageUrls.length > 1 ? ` ${index + 1}` : ''}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" />`,
      )
      .join('');
  const ownPlans = getManagedPublicPlans(visiblePlans);
  const publicPlans = ownPlans.length > 0 ? ownPlans : visiblePlans;
  const totalPlans = new Intl.NumberFormat('vi-VN').format(publicPlans.length);
  const choicePlans = getHomeChoicePlans(publicPlans);
  const homeTabs = renderMarketTabs(choicePlans);
  const planOptions = renderPlanOptions(publicPlans);
  const mainlandPlans = publicPlans
    .filter((plan) => plan.catalogGroup === 'mainland' && plan.googleAccess)
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const dailyPlans = publicPlans
    .filter((plan) => plan.catalogGroup === 'daily' && plan.googleAccess)
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const comboPlans = publicPlans
    .filter((plan) => plan.catalogGroup === 'combo' && plan.googleAccess)
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const featuredPlan =
    mainlandPlans.find((plan) => getPlanDataAllowanceMb(plan) >= 3072 && (plan.durationDays ?? 0) >= 10) ??
    mainlandPlans[Math.min(1, mainlandPlans.length - 1)] ??
    choicePlans[0] ??
    publicPlans[0];
  const cheapestPlan = [...publicPlans].sort((left, right) => left.priceUsd - right.priceUsd)[0];
  const comboLead = comboPlans[0];
  const dailyLead = dailyPlans[0];
  const longStayPlan =
    mainlandPlans.find((plan) => (plan.durationDays ?? 0) >= 30 && getPlanDataAllowanceMb(plan) >= 10240) ??
    mainlandPlans.find((plan) => (plan.durationDays ?? 0) >= 30) ??
    mainlandPlans[Math.min(2, mainlandPlans.length - 1)];
  const dailyPowerPlan =
    dailyPlans.find((plan) => getPlanDataAllowanceMb(plan) >= 3072) ?? dailyPlans[Math.min(1, dailyPlans.length - 1)];
  const pickPlansByAllowance = (planGroup: Plan[], targetsMb: number[]) => {
    const picked = targetsMb
      .map((targetMb) => {
        const exactMatch = planGroup.find((plan) => getPlanDataAllowanceMb(plan) === targetMb);
        if (exactMatch) return exactMatch;
        return planGroup.find((plan) => getPlanDataAllowanceMb(plan) >= targetMb) ?? null;
      })
      .filter((plan, index, array): plan is Plan => Boolean(plan) && array.indexOf(plan) === index);

    if (picked.length >= 3) {
      return picked.slice(0, 3);
    }

    return [...picked, ...planGroup.filter((plan) => !picked.includes(plan))].slice(0, 3);
  };
  const reviewCards = testimonials.slice(0, 3);
  const deviceInfo = [
    {
      label: 'Thiết bị hỗ trợ',
      value: 'iPhone XS trở lên, Pixel, Samsung và các máy hỗ trợ eSIM đã mở mạng.',
    },
    {
      label: 'Phạm vi phủ sóng',
      value: featuredPlan?.coverage ?? 'Trung Quốc đại lục',
    },
    {
      label: 'Nhà mạng',
      value: featuredPlan?.operators?.join(', ') || 'CMCC và đối tác dữ liệu quốc tế',
    },
    {
      label: 'Lưu ý cài đặt',
      value: 'Nên cài QR trước chuyến đi. Mỗi mã QR chỉ nên cài trên đúng thiết bị anh sẽ mang theo.',
    },
  ];
  const includedItems = [
    'Mã QR eSIM gửi qua email sau khi thanh toán',
    'Hướng dẫn cài đặt tiếng Việt để cài trước chuyến đi',
    'Gợi ý gói phù hợp nếu cần Google, Maps hoặc hotspot',
    'Hỗ trợ thêm nếu cần đổi lịch trình hoặc mua thêm dung lượng',
  ];
  const mobileQuickFeatures = [
    { icon: 'bolt' as const, title: '4G/5G', copy: 'tốc độ cao' },
    { icon: 'qr' as const, title: 'Kích hoạt', copy: 'tức thì' },
    { icon: 'globe' as const, title: 'Không phí', copy: 'roaming' },
    { icon: 'headset' as const, title: 'Hỗ trợ', copy: '24/7' },
  ];
  const mobileResetPlans = getMobileResetPlans(publicPlans);
  const mobileTotalPlans = getMobileTotalPlans(publicPlans);
  const mobileUnlimitedPlans = getMobileUnlimitedPlans(publicPlans);
  const showcaseResetPlans = pickPlansByAllowance(mobileResetPlans, [1024, 3072, 5120]);
  const showcaseTotalPlans = pickPlansByAllowance(mobileTotalPlans, [1024, 3072, 5120]);
  const showcasePlans = [...showcaseResetPlans, ...showcaseTotalPlans].filter(
    (plan, index, array) => array.indexOf(plan) === index,
  );
  const mobileTypeTabs = [
    { key: 'reset', label: 'Theo ngày', count: mobileResetPlans.length, disabled: mobileResetPlans.length === 0 },
    { key: 'total', label: 'Trọn gói', count: mobileTotalPlans.length, disabled: mobileTotalPlans.length === 0 },
    { key: 'unlimited', label: 'Không giới hạn', count: mobileUnlimitedPlans.length, disabled: mobileUnlimitedPlans.length === 0 },
  ];
  const defaultMobileType =
    mobileTypeTabs.find((tab) => tab.key === 'reset')?.key ??
    mobileTypeTabs.find((tab) => tab.key === 'total')?.key ??
    mobileTypeTabs[0]?.key ??
    'reset';
  const mobilePickerPlans =
    defaultMobileType === 'reset'
      ? mobileResetPlans
      : defaultMobileType === 'total'
        ? mobileTotalPlans
        : mobileUnlimitedPlans;
  const mobileDataOptions = Array.from(
    new Map(
      mobilePickerPlans
        .sort((left, right) => getPlanDataAllowanceMb(left) - getPlanDataAllowanceMb(right))
        .map((plan) => [
          plan.dataAllowance,
          {
            value: plan.dataAllowance,
            label: plan.dataAllowance,
            mb: getPlanDataAllowanceMb(plan),
          },
        ]),
    ).values(),
  );
  const defaultMobilePlan =
    (defaultMobileType === 'reset'
      ? mobileResetPlans.find((plan) => plan.slug === 'CN_1_Daily') ?? mobileResetPlans.find((plan) => plan.dataAllowance === '1GB/ngày')
      : mobileTotalPlans.find((plan) => plan.slug === 'CN_3_15_nonhkip') ??
        mobileTotalPlans.find((plan) => plan.slug === 'CN_3_15') ??
        mobileTotalPlans.find((plan) => plan.dataAllowance === '3GB' && plan.durationDays === 15)) ??
    mobilePickerPlans[0] ??
    dailyLead ??
    featuredPlan;
  const defaultMobileAvailableDays = getMobileAvailableDayValues(defaultMobileType, publicPlans);
  const defaultMobileDays = defaultMobileType === 'reset' ? 1 : defaultMobilePlan?.durationDays ?? 7;
  const defaultMobileMaxDays =
    defaultMobileType === 'reset'
      ? DAY_PASS_MAX_DAYS
      : Math.max(1, defaultMobileAvailableDays.at(-1) ?? 1);
  const defaultMobileDayRangeMax = defaultMobileType === 'reset' ? 100 : Math.max(defaultMobileAvailableDays.length - 1, 0);
  const defaultMobileDayRangeValue =
    defaultMobileType === 'reset'
      ? Math.round(getMobileDayScaleProgress(defaultMobileDays, defaultMobileType, defaultMobileMaxDays, defaultMobileAvailableDays))
      : Math.max(defaultMobileAvailableDays.indexOf(defaultMobileDays), 0);
  const defaultMobileDayProgress = getMobileDayScaleProgress(
    defaultMobileDays,
    defaultMobileType,
    defaultMobileMaxDays,
    defaultMobileAvailableDays,
  );
  const defaultMobileDataIndex = Math.max(
    mobileDataOptions.findIndex((item) => item.value === defaultMobilePlan?.dataAllowance),
    0,
  );
  const defaultMobileDataProgress =
    mobileDataOptions.length <= 1 ? 100 : (defaultMobileDataIndex / Math.max(mobileDataOptions.length - 1, 1)) * 100;
  const defaultMobileDiscount = defaultMobileType === 'reset' ? getDayPassDiscount(defaultMobileDays) : null;
  const defaultMobilePrice =
    defaultMobilePlan == null
      ? ''
      : defaultMobileType === 'reset'
        ? formatVndFromUsd(getDayPassTotalUsd(defaultMobilePlan, defaultMobileDays))
        : defaultMobilePlan.priceVnd;
  const defaultMobileTypeLabel = mobileTypeTabs.find((tab) => tab.key === defaultMobileType)?.label ?? 'Theo ngày';
  const defaultMobileMeta = defaultMobilePlan == null ? '' : getPlanInternetNote(defaultMobilePlan);
  const defaultMobileDaysGuide = getMobileDaysGuide(defaultMobileType, defaultMobileAvailableDays);
  const defaultMobileDataGuide = getMobileDataGuide(
    defaultMobileType,
    defaultMobilePlan?.dataAllowance ?? '',
    defaultMobileDays,
  );
  const defaultMobileFocusNote = getMobileFocusNote(defaultMobileType);
  const internalPricingReviewBoard = options.internalPricing ? renderInternalPricingReviewBoard(publicPlans) : '';
  const internalPricingBoard = options.internalPricing ? renderInternalPricingBoard(publicPlans) : '';
  const mobileWhyItems = [
    {
      icon: 'QR',
      title: 'Nhận QR nhanh',
      copy: 'QR được gửi qua email sau khi thanh toán để cài trước chuyến đi.',
    },
    {
      icon: '5G',
      title: 'Hỗ trợ Google',
      copy: 'Ưu tiên các gói có IP HK hoặc SG để dùng TikTok, Google, Gmail và Maps ổn định hơn.',
    },
    {
      icon: '24',
      title: 'Hỗ trợ tiếng Việt',
      copy: 'Hỗ trợ khi cần cài đặt hoặc kích hoạt eSIM.',
    },
  ];
  const mobileSupportItems = [
    { icon: 'qr' as const, title: 'Nhận QR', copy: 'Trong vài phút' },
    { icon: 'phone' as const, title: 'Giữ SIM chính', copy: 'Không tháo máy' },
    { icon: 'headset' as const, title: 'Hỗ trợ', copy: 'Khi cần cài đặt' },
  ];
  const mobileCities = ['Bắc Kinh', 'Thượng Hải', 'Quảng Châu', 'Thâm Quyến', 'Hàng Châu', 'Thành Đô'];
  const heroHighlights = [
    'Hỗ trợ TikTok, Google, Gmail và Maps',
    'QR gửi qua email sau thanh toán',
    'Giữ SIM chính, không cần tháo lắp',
  ];
  const desktopHeroPlan = featuredPlan ?? cheapestPlan ?? visiblePlans[0];
  const desktopQuickPlans = getHomeFeaturedPlans(publicPlans).slice(0, 8);
  const mobileFeaturedDeals = desktopQuickPlans.slice(0, 3);
  const mobileQuickCatalogPlans = [...choicePlans, ...desktopQuickPlans.filter((plan) => !choicePlans.includes(plan))].slice(0, 6);
  const mobileGuideSteps = [
    {
      icon: 'phone' as const,
      title: 'Chọn gói theo lịch trình',
      copy: 'Đi ngắn chọn gói nhẹ, ở lâu chọn gói nhiều ngày hoặc nhiều data hơn.',
    },
    {
      icon: 'qr' as const,
      title: 'Thanh toán QR ngân hàng',
      copy: 'Quét mã, chuyển đúng nội dung và chờ hệ thống tự đối soát đơn.',
    },
    {
      icon: 'mail' as const,
      title: 'Nhận QR qua email',
      copy: 'Cài eSIM trước chuyến đi, tới nơi chỉ cần bật data để dùng.',
    },
  ];
  const desktopReasonCards = [
    {
      title: 'Nhận QR nhanh',
      copy: 'QR được gửi qua email sau khi thanh toán để cài trước chuyến đi.',
      icon: 'sim' as const,
    },
    {
      title: 'Dùng được Google',
      copy: 'Ưu tiên các gói có IP HK hoặc SG để dùng TikTok, Google, Gmail và Maps ổn định hơn.',
      icon: 'globe' as const,
    },
    {
      title: 'Giá rõ ràng',
      copy: 'Giá từng gói được hiển thị rõ ràng ngay trên website.',
      icon: 'bolt' as const,
    },
    {
      title: 'Hỗ trợ tiếng Việt',
      copy: 'Hỗ trợ khi cần cài đặt hoặc kích hoạt eSIM.',
      icon: 'headset' as const,
    },
  ];

  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: context.siteName,
      url: context.siteUrl,
      email: context.supportEmail,
      logo: resolveAssetUrl(context, context.logoUrl, context.faviconUrl || '/favicon.svg'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: context.siteName,
      url: context.siteUrl,
      inLanguage: 'vi-VN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Gói eSIM China nổi bật',
      itemListElement: showcasePlans.map((plan, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: getPublicPlanName(plan),
          description: plan.description,
          url: fullUrl(context.siteUrl, buildPurchasePath(plan)),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: plan.priceUsd,
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  const body = `
${header(context)}
<main class="detail-home">
  <section class="mobile-app-shell reveal">
    <div class="mobile-app-nav">
      ${renderMobileBrandLink(context)}
      <a class="mobile-app-control" href="/tra-cuu-don" aria-label="Mở lại đơn đã mua">Đơn của tôi</a>
    </div>

    <article class="mobile-app-banner" aria-label="${escapeHtml(context.homeHeroTitle)}">
      <div class="mobile-app-banner-media">
        ${
          mobileBannerImageUrl
            ? heroBannerImageUrls.length > 1
              ? `<div class="mobile-app-banner-gallery" data-hero-banner-gallery>${renderHeroBannerImages('mobile-app-banner-image')}</div>`
              : `<img class="mobile-app-banner-image" src="${escapeHtml(mobileBannerImageUrl)}" alt="${escapeHtml(context.homeHeroTitle)}" loading="eager" decoding="async" />`
            : ''
        }
      </div>
      <div class="mobile-app-banner-overlay" aria-hidden="true"></div>
      <div class="mobile-app-banner-content">
        <span class="mobile-app-banner-flag" aria-hidden="true">🇨🇳</span>
        <div class="mobile-app-banner-copy">
          <h2>${escapeHtml(context.homeHeroTitle)}</h2>
          <p>${escapeHtml(context.homeHeroDescription)}</p>
        </div>
        <a class="mobile-app-banner-cta" href="#mobile-picker">
          <span class="mobile-app-banner-cta-icon">${renderMobileIcon('spark')}</span>
          <span>Xem gói</span>
          <span class="mobile-app-banner-cta-arrow">${renderMobileIcon('arrow-right')}</span>
        </a>
      </div>
    </article>
    ${
      heroBannerImageUrls.length > 1
        ? `<script>
      (() => {
        const initHeroGalleries = () => {
          const galleries = document.querySelectorAll('[data-hero-banner-gallery]');
          galleries.forEach((gallery) => {
            if (gallery.getAttribute('data-hero-banner-ready') === 'true') return;
            const slides = Array.from(gallery.querySelectorAll('[data-hero-banner-slide]'));
            if (slides.length <= 1) return;
            gallery.setAttribute('data-hero-banner-ready', 'true');
            let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
            slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
            window.setInterval(() => {
              slides[index].classList.remove('is-active');
              index = (index + 1) % slides.length;
              slides[index].classList.add('is-active');
            }, 4000);
          });
        };
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initHeroGalleries);
        } else {
          initHeroGalleries();
        }
      })();
    </script>`
        : ''
    }

    <section class="mobile-app-feature-strip">
      ${mobileQuickFeatures
        .map(
          (item) => `
      <article class="mobile-app-feature-item reveal">
        <span class="mobile-app-feature-icon">${renderMobileIcon(item.icon)}</span>
        <div class="mobile-app-feature-copy">
          <strong>${item.title}</strong>
          <small>${item.copy}</small>
        </div>
      </article>`,
        )
        .join('')}
    </section>

    <section class="mobile-app-offer-head">
      <h2>Chọn gói eSIM Trung Quốc</h2>
      <p>Chọn gói phù hợp với chuyến đi của bạn</p>
    </section>

    <section class="mobile-app-deals" aria-label="Gói nổi bật trên mobile">
      ${mobileFeaturedDeals
        .map(
          (plan, index) => `
      <article class="mobile-app-deal-card reveal">
        <a class="mobile-app-deal-hero" href="${buildPurchasePath(plan, isUnlimitedDayPlan(plan) ? 1 : undefined)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">
          <span class="mobile-app-deal-label">${escapeHtml(index === 0 ? 'Mạng 5G' : index === 1 ? 'Bán chạy' : 'Nhiều data')}</span>
          <div class="mobile-app-deal-title">${escapeHtml(plan.catalogGroup === 'combo' ? 'Liên vùng China' : index === 0 ? 'Trung Quốc đại lục' : 'Du lịch Trung Quốc')}</div>
          <div class="mobile-app-deal-meta">${escapeHtml(isUnlimitedDayPlan(plan) ? `${plan.dataAllowance} / 1 ngày` : `${plan.dataAllowance} / ${plan.validity}`)}</div>
          <span class="mobile-app-deal-mark">eSIM</span>
        </a>
        <div class="mobile-app-deal-body">
          <a class="mobile-app-deal-name" href="${buildPurchasePath(plan, isUnlimitedDayPlan(plan) ? 1 : undefined)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">${escapeHtml(getFeaturedPlanCardName(plan))}</a>
          <div class="mobile-app-deal-rating">
            <span>${index === 0 ? '4.7 / 5' : index === 1 ? '4.8 / 5' : '4.8 / 5'}</span>
            <small>${escapeHtml(index === 0 ? '16.619 đánh giá' : index === 1 ? '26.804 đánh giá' : '9.841 đánh giá')}</small>
          </div>
          <p class="mobile-app-deal-note">${escapeHtml(getFeaturedPlanSupportCopy(plan))}</p>
          <div class="mobile-app-deal-bottom">
            <div class="mobile-app-deal-price">
              <small>${escapeHtml(getFeaturedPlanPriceLabel(plan))}</small>
              <strong>${escapeHtml(plan.priceVnd)}</strong>
            </div>
            <a class="mobile-app-deal-button" href="${buildPurchasePath(plan, isUnlimitedDayPlan(plan) ? 1 : undefined)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua</a>
          </div>
        </div>
      </article>`,
        )
        .join('')}
    </section>

    <section class="mobile-app-plan-picker reveal" id="mobile-picker">
      <div class="mobile-app-plan-slider-head">
        <div class="mobile-app-plan-slider-copy">
        <small>Tùy chỉnh gói</small>
          <strong>Chọn số ngày, dung lượng là ra tiền ngay</strong>
        </div>
      </div>

      <div class="mobile-app-picker-group">
        <div class="mobile-app-picker-head">
          <strong>Số ngày</strong>
          <label class="mobile-app-picker-day-entry">
            <button class="mobile-app-picker-day-step" type="button" data-mobile-day-step="-1" aria-label="Giảm 1 ngày">-</button>
            <input
              class="mobile-app-picker-day-input"
              type="number"
              min="${defaultMobileType === 'reset' ? 1 : Math.max(1, defaultMobileAvailableDays[0] ?? 1)}"
              max="${defaultMobileMaxDays}"
              step="1"
              value="${defaultMobileDays}"
              inputmode="numeric"
              data-mobile-days-input
              aria-label="Điền số ngày sử dụng"
            />
            <button class="mobile-app-picker-day-step" type="button" data-mobile-day-step="1" aria-label="Tăng 1 ngày">+</button>
            <span class="mobile-app-picker-day-unit">ngày</span>
          </label>
        </div>
        <div class="mobile-app-picker-range-shell" data-mobile-range-shell style="--range-progress: ${defaultMobileDayProgress}%">
          <span class="mobile-app-picker-range-bubble" data-mobile-day-bubble>${defaultMobileDays} ngày</span>
          <span class="mobile-app-picker-range-visual" aria-hidden="true">
            <span class="mobile-app-picker-range-fill"></span>
          </span>
          <input
            class="mobile-app-picker-range"
            type="range"
            min="0"
            max="${defaultMobileDayRangeMax}"
            step="1"
            value="${defaultMobileDayRangeValue}"
            data-mobile-days-range
            aria-label="Kéo để chọn số ngày sử dụng"
          />
        </div>
        <div class="mobile-app-day-scale" data-mobile-day-scale aria-hidden="true">
          ${renderMobileDayScaleMarks(defaultMobileType, defaultMobileMaxDays, defaultMobileAvailableDays)}
        </div>
        <div class="mobile-app-day-shortcuts" data-mobile-day-shortcuts${getMobileDayShortcutValues(defaultMobileType, defaultMobileAvailableDays).length > 0 ? '' : ' hidden'}>
          ${renderMobileDayShortcutButtons(getMobileDayShortcutValues(defaultMobileType, defaultMobileAvailableDays), defaultMobileDays)}
        </div>
        <div class="mobile-app-picker-note" data-mobile-picker-days-note>${defaultMobileDaysGuide}</div>
      </div>

      <div class="mobile-app-picker-group">
        <div class="mobile-app-picker-head">
          <strong data-mobile-picker-data-heading>${defaultMobileType === 'reset' ? 'GB / ngày' : 'Dung lượng'}</strong>
          <span data-mobile-picker-data>${defaultMobilePlan?.dataAllowance ?? ''}</span>
        </div>
        <div class="mobile-app-picker-range-shell mobile-app-picker-range-shell-data" data-mobile-range-shell style="--range-progress: ${defaultMobileDataProgress}%">
          <span class="mobile-app-picker-range-bubble" data-mobile-data-bubble>${defaultMobilePlan?.dataAllowance ?? ''}</span>
          <span class="mobile-app-picker-range-visual" aria-hidden="true">
            <span class="mobile-app-picker-range-fill"></span>
          </span>
          <input
            class="mobile-app-picker-range"
            type="range"
            min="0"
            max="${Math.max(mobileDataOptions.length - 1, 0)}"
            step="1"
            value="${defaultMobileDataIndex}"
            data-mobile-data-range
            aria-label="Kéo để chọn dung lượng"
          />
        </div>
        <div class="mobile-app-data-scale" data-mobile-data-scale>
          ${mobileDataOptions
            .map(
              (item, index) => `
          <span class="${index === defaultMobileDataIndex ? 'is-selected' : ''}" data-mobile-data-label data-mobile-data-index="${index}" role="button" tabindex="0" aria-label="Chọn ${item.label}">${item.label}</span>`,
            )
            .join('')}
        </div>
        <div class="mobile-app-picker-note" data-mobile-picker-data-note>${defaultMobileDataGuide}</div>
      </div>

      <div class="mobile-app-picker-group mobile-app-picker-group-types">
        <div class="mobile-app-picker-head">
          <strong>Loại SIM</strong>
          <span data-mobile-picker-type>${defaultMobileTypeLabel}</span>
        </div>
        <div class="mobile-app-type-row">
          ${mobileTypeTabs
            .map(
              (item) => `
        <button
          class="mobile-app-type-chip${item.key === defaultMobileType ? ' is-selected' : ''}${item.disabled ? ' is-disabled' : ''}"
          type="button"
          aria-label="${item.label} (${item.count} gói)"
          data-mobile-type-option
          data-mobile-type-value="${item.key}"
          ${item.disabled ? 'disabled' : ''}
        >
          <span>${item.label}</span>
        </button>`,
            )
            .join('')}
        </div>
      </div>

      <article class="mobile-app-plan-focus">
        <div class="mobile-app-plan-metrics">
          <div class="mobile-app-plan-stat">
            <span>Số ngày</span>
            <strong data-mobile-picker-days>${defaultMobileDays} ngày</strong>
          </div>
          <div class="mobile-app-plan-stat">
            <span>Số GB</span>
            <strong data-mobile-picker-data>${defaultMobilePlan?.dataAllowance ?? ''}</strong>
          </div>
          <div class="mobile-app-plan-stat is-price">
            <span>Tổng tiền</span>
            <strong data-mobile-picker-price>${defaultMobilePrice}</strong>
          </div>
        </div>
        <div class="mobile-app-plan-focus-copy">
          <strong data-mobile-picker-name>${defaultMobilePlan ? (defaultMobileType === 'reset' ? getDayPassSummaryName(defaultMobilePlan, defaultMobileDays) : getPublicPlanName(defaultMobilePlan)) : ''}</strong>
          <p class="mobile-app-plan-focus-meta support-meta-text" data-mobile-picker-meta>${defaultMobileMeta}</p>
          ${renderSupportIconRow(Boolean(defaultMobilePlan?.googleAccess), ' data-mobile-picker-support', !Boolean(defaultMobilePlan?.googleAccess))}
          <div class="home-badge-row">
            ${renderBadgeChip('Hỗ trợ TikTok', 'tiktok', ' data-mobile-picker-tiktok', !defaultMobileMeta.includes('TikTok'))}
            ${renderBadgeChip(getUnlimitedUsageLabel(defaultMobilePlan), 'unlimited', ' data-mobile-picker-unlimited', !Boolean(defaultMobilePlan && isUnlimitedDayPlan(defaultMobilePlan)))}
            <span class="home-inline-badge" data-mobile-picker-topup${defaultMobilePlan?.supportTopUpType && defaultMobilePlan.supportTopUpType > 0 ? '' : ' hidden'}>Có thể mua thêm dung lượng trong quá trình sử dụng</span>
          </div>
        </div>
        <div class="mobile-app-plan-focus-note" data-mobile-picker-note>${defaultMobileFocusNote}</div>
        <a class="mobile-app-plan-focus-cta" href="${buildPurchasePath(defaultMobilePlan ?? featuredPlan ?? cheapestPlan)}" data-mobile-picker-cta>Mua gói</a>
      </article>

      <div class="mobile-app-picker-catalog" hidden>
        ${[
          ...mobileResetPlans.map((plan) => ({ plan, mobileType: 'reset' })),
          ...mobileTotalPlans.map((plan) => ({ plan, mobileType: 'total' })),
          ...mobileUnlimitedPlans.map((plan) => ({ plan, mobileType: 'unlimited' })),
        ]
          .map(
            ({ plan, mobileType }) => `
        <span
          data-mobile-plan-catalog
          data-plan-target="${plan.slug}"
          data-plan-handle="${getPlanPublicHandle(plan)}"
          data-plan-name="${getPublicPlanName(plan)}"
          data-plan-price="${plan.priceVnd}"
          data-plan-price-usd="${plan.priceUsd}"
          data-plan-meta="${getPlanInternetNote(plan)} · ${getPlanOperationalNote(plan)}"
          data-plan-data="${plan.dataAllowance}"
          data-plan-data-mb="${getPlanDataAllowanceMb(plan)}"
          data-plan-days="${plan.validity}"
          data-plan-day-value="${plan.durationDays ?? 0}"
          data-plan-type="${mobileType}"
          data-plan-topup="${plan.supportTopUpType && plan.supportTopUpType > 0 ? 'true' : 'false'}"
          data-plan-route="${plan.ipExport ?? ''}"
          data-plan-fup="${plan.fupPolicy ?? ''}"
          data-plan-variant="${getDayPassVariantLabel(plan)}"
          data-plan-variant-detail="${getDayPassVariantDetail(plan)}"
        ></span>`,
          )
          .join('')}
      </div>
    </section>

    <section class="mobile-app-plan-grid" aria-label="Gói eSIM chọn nhanh">
      ${mobileQuickCatalogPlans
        .map(
          (plan, index) => `
      <article class="mobile-app-plan-card${index === 1 ? ' is-featured' : ''}">
        <div class="mobile-app-plan-copy">
          <div class="mobile-app-plan-headbar">
            <strong>${escapeHtml(plan.dataAllowance)}</strong>
            <span>${escapeHtml(isUnlimitedDayPlan(plan) ? '/ ngày' : '')}</span>
          </div>
          <em>${escapeHtml(plan.validity)}</em>
          <b class="mobile-app-plan-name">${escapeHtml(getFeaturedPlanCardName(plan))}</b>
          <p>${escapeHtml(plan.coverage)}</p>
        </div>
        <div class="mobile-app-plan-side">
          <div class="mobile-app-plan-price">${escapeHtml(plan.priceVnd)}</div>
          <a class="mobile-app-plan-cta" href="${buildPurchasePath(plan, isUnlimitedDayPlan(plan) ? 1 : undefined)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
        </div>
      </article>`,
        )
        .join('')}
    </section>

    <section class="mobile-app-note">
      ${renderMobileIcon('spark')}
      <span>Mua xong nhận QR, cài trước khi bay</span>
    </section>

    <section class="mobile-app-support-strip">
      ${mobileSupportItems
        .map(
          (item) => `
      <article class="mobile-app-support-item">
        <span class="mobile-app-support-icon">${renderMobileIcon(item.icon)}</span>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.copy)}</small>
        </div>
      </article>`,
        )
        .join('')}
    </section>

    <section class="mobile-app-cta-row">
      <div class="mobile-app-store-head">
        <span class="mobile-app-store-mark">${renderMobileIcon('globe')}</span>
        <div class="mobile-app-store-copy">
          <strong>Gói đi Trung Quốc</strong>
          <p>Bắc Kinh, Thượng Hải, Quảng Châu</p>
        </div>
      </div>
      <a class="mobile-app-store-button" href="/goi-esim">Xem đủ gói</a>
    </section>

    <section class="mobile-app-city-card">
      ${mobileCities
        .map(
          (city) => `<a class="mobile-app-city-chip" href="/goi-esim">${escapeHtml(city)}</a>`,
        )
        .join('')}
    </section>

    <section class="mobile-app-guide">
      <div class="mobile-app-guide-head">
        <span>Hướng dẫn</span>
        <h2>3 bước là dùng được</h2>
      </div>
      <div class="mobile-app-guide-list">
        ${mobileGuideSteps
          .map(
            (item, index) => `
        <article class="mobile-app-guide-item">
          <span class="mobile-app-guide-icon">${renderMobileIcon(item.icon)}</span>
          <div class="mobile-app-guide-copy">
            <strong>${index + 1}. ${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.copy)}</p>
          </div>
        </article>`,
          )
          .join('')}
      </div>
    </section>

    ${internalPricingReviewBoard}
    ${internalPricingBoard}

  </section>

  <section class="rose-showcase reveal">
    <div class="wrap rose-shell">
      <header class="rose-homebar">
        <a href="/" class="rose-brand${hasCustomLogo(context) ? ' rose-brand-logo-only' : ''}" aria-label="${escapeHtml(context.siteName)}">
          <span class="rose-brand-mark">${renderRoseBrandMark(context)}</span>
          ${hasCustomLogo(context)
            ? ''
            : `<span class="rose-brand-copy">
            <strong>${escapeHtml(context.siteName)}</strong>
            <span>Trung Quốc, Hong Kong, Macau</span>
          </span>`}
        </a>
        <nav class="rose-nav" aria-label="Điều hướng desktop">
          <a href="/">Trang Chủ</a>
          <a href="#packages">Gói eSIM</a>
          <a href="#reviews">Đánh Giá</a>
          <a href="#how">Hướng Dẫn</a>
        </nav>
        <div class="rose-actions">
          <a class="rose-link" href="/tra-cuu-don">Đơn của tôi</a>
          <a class="rose-cta" href="${buildPurchasePath(desktopHeroPlan ?? cheapestPlan)}">Mua ngay</a>
        </div>
      </header>

      <div
        class="rose-hero${heroBannerImageUrls.length > 1 ? ' rose-hero-gallery' : ''}"
        role="img"
        aria-label="Banner eSIM Trung Quốc"
        ${heroBannerImageUrls.length <= 1 ? toBackgroundImageStyle(context, context.homeHeroBannerUrl) : ''}
      >${heroBannerImageUrls.length > 1 ? `<div class="rose-hero-slides" data-hero-banner-gallery>${renderHeroBannerImages('rose-hero-image')}</div>` : ''}</div>

      <section class="rose-picker reveal home-node-shell" id="packages">
        <div class="rose-picker-head">
        <div>
          <span class="section-kicker">Chọn gói</span>
          <h2 class="section-title">${escapeHtml(context.homeHeroTitle)}</h2>
        </div>
          <p class="section-copy">${escapeHtml(context.homeHeroDescription)}</p>
        </div>

        <section class="desktop-picker-card desktop-picker-card-hero reveal">
          <div class="desktop-picker-type-row">
            ${mobileTypeTabs
              .map(
                (item) => `
            <button
              class="desktop-picker-type${item.key === defaultMobileType ? ' is-selected' : ''}${item.disabled ? ' is-disabled' : ''}"
              type="button"
              data-desktop-type-option
              data-desktop-type-value="${item.key}"
              ${item.disabled ? 'disabled' : ''}
            >
              <span>${item.label}</span>
            </button>`,
              )
              .join('')}
          </div>

          <div class="desktop-picker-grid">
            <div class="desktop-picker-control">
              <div class="desktop-picker-head">
                <strong>Số ngày sử dụng</strong>
                <label class="desktop-picker-input-chip">
                  <input
                    class="desktop-picker-input"
                    type="number"
                    min="${defaultMobileType === 'reset' ? 1 : Math.max(1, defaultMobileAvailableDays[0] ?? 1)}"
                    max="${defaultMobileMaxDays}"
                    step="1"
                    value="${defaultMobileDays}"
                    inputmode="numeric"
                    data-desktop-days-input
                    aria-label="Nhập số ngày sử dụng"
                  />
                  <span>ngày</span>
                </label>
              </div>
              <div class="desktop-picker-range-shell" data-desktop-range-shell style="--range-progress: ${defaultMobileDayProgress}%">
                <span class="desktop-picker-range-track" aria-hidden="true">
                  <span class="desktop-picker-range-fill"></span>
                </span>
                <input
                  class="desktop-picker-range"
                  type="range"
                  min="0"
                  max="${defaultMobileDayRangeMax}"
                  step="1"
                  value="${defaultMobileDayRangeValue}"
                  data-desktop-days-range
                  aria-label="Kéo để chọn số ngày sử dụng"
                />
              </div>
              <div class="desktop-picker-scale">
                <span>${defaultMobileType === 'reset' ? '1 ngày' : `${defaultMobileAvailableDays[0] ?? 1} ngày`}</span>
                <span>${defaultMobileType === 'reset' ? `${defaultMobileMaxDays} ngày` : `${defaultMobileAvailableDays.at(-1) ?? defaultMobileMaxDays} ngày`}</span>
              </div>
              <p class="desktop-picker-note" data-desktop-days-note>${defaultMobileDaysGuide}</p>
            </div>

            <div class="desktop-picker-control">
              <div class="desktop-picker-head">
                <strong data-desktop-data-heading>${defaultMobileType === 'reset' ? 'GB / ngày' : 'Dung lượng'}</strong>
                <label class="desktop-picker-input-chip desktop-picker-input-chip-select">
                  <select class="desktop-picker-select" data-desktop-data-select aria-label="Chọn dung lượng">
                    ${mobileDataOptions
                      .map(
                        (item, index) =>
                          `<option value="${escapeHtml(item.value)}"${index === defaultMobileDataIndex ? ' selected' : ''}>${escapeHtml(item.label)}</option>`,
                      )
                      .join('')}
                  </select>
                </label>
              </div>
              <div class="desktop-picker-range-shell" data-desktop-range-shell style="--range-progress: ${defaultMobileDataProgress}%">
                <span class="desktop-picker-range-track" aria-hidden="true">
                  <span class="desktop-picker-range-fill"></span>
                </span>
                <input
                  class="desktop-picker-range"
                  type="range"
                  min="0"
                  max="${Math.max(mobileDataOptions.length - 1, 0)}"
                  step="1"
                  value="${defaultMobileDataIndex}"
                  data-desktop-data-range
                  aria-label="Kéo để chọn dung lượng"
                />
              </div>
              <div class="desktop-picker-scale">
                <span>${mobileDataOptions[0]?.label ?? ''}</span>
                <span>${mobileDataOptions.at(-1)?.label ?? ''}</span>
              </div>
              <p class="desktop-picker-note" data-desktop-data-note>${defaultMobileDataGuide}</p>
            </div>
          </div>

          <div class="desktop-picker-summary">
            <div class="desktop-picker-summary-copy">
              <span class="desktop-picker-summary-label">Gói đang chọn</span>
          <strong data-desktop-picker-name>${defaultMobilePlan ? (defaultMobileType === 'reset' ? getDayPassSummaryName(defaultMobilePlan, defaultMobileDays) : getPublicPlanName(defaultMobilePlan)) : ''}</strong>
              <p class="support-meta-text" data-desktop-picker-meta>${escapeHtml(defaultMobileMeta)}</p>
              ${renderSupportIconRow(Boolean(defaultMobilePlan?.googleAccess), ' data-desktop-picker-support', !Boolean(defaultMobilePlan?.googleAccess))}
              <div class="home-badge-row">
                ${renderBadgeChip('Hỗ trợ TikTok', 'tiktok', ' data-desktop-picker-tiktok', !defaultMobileMeta.includes('TikTok'))}
                ${renderBadgeChip(getUnlimitedUsageLabel(defaultMobilePlan), 'unlimited', ' data-desktop-picker-unlimited', !Boolean(defaultMobilePlan && isUnlimitedDayPlan(defaultMobilePlan)))}
                <span class="home-inline-badge" data-desktop-picker-topup hidden>Có thể mua thêm dung lượng trong quá trình sử dụng</span>
              </div>
            </div>
            <div class="desktop-picker-price">
              <span>Tạm tính</span>
              <strong data-desktop-picker-price>${defaultMobilePrice}</strong>
            </div>
          </div>

          <div class="desktop-picker-actions">
            <span class="desktop-picker-hint" data-desktop-picker-note>${defaultMobileFocusNote}</span>
            <div class="desktop-picker-action-group">
              <label class="desktop-picker-quantity" aria-label="Chọn số lượng">
                <span class="desktop-picker-quantity-label">Số lượng</span>
                <button type="button" class="desktop-picker-quantity-step" data-desktop-quantity-step="-1" aria-label="Giảm số lượng">-</button>
                <input class="desktop-picker-quantity-input" type="number" min="1" max="99" step="1" value="1" inputmode="numeric" data-desktop-quantity-input aria-label="Số lượng" />
                <button type="button" class="desktop-picker-quantity-step" data-desktop-quantity-step="1" aria-label="Tăng số lượng">+</button>
              </label>
              <a class="button button-primary" href="${buildPurchasePath(defaultMobilePlan ?? featuredPlan ?? cheapestPlan)}" data-desktop-picker-cta>Chốt gói này</a>
            </div>
          </div>
          <div class="market-empty" data-market-empty hidden>Hiện chưa có gói trong nhóm này.</div>
        </section>
      </section>
    </div>
  </section>

  <section class="detail-options section-soft" id="packages">
    <div class="wrap detail-options-grid detail-options-grid-single home-node-shell home-node-shell-wide">
      <div class="detail-options-main">
        <div class="detail-section-head">
          <div>
            <span class="section-kicker">Gói nổi bật</span>
            <h2 class="section-title">Các gói được lựa chọn bởi eSIM CN.</h2>
            <p class="section-copy">Tập hợp những gói bán chạy, dễ dùng và phù hợp nhất cho đa số nhu cầu đi Trung Quốc.</p>
          </div>
          <a class="button button-secondary" href="/goi-esim">Xem đủ ${totalPlans} gói</a>
        </div>

        <section class="rose-plan-strip">
          ${desktopQuickPlans
            .map(
              (plan) => `
        <article class="rose-plan-card reveal">
          <div class="rose-plan-card-head">
            <div class="rose-plan-tag-row">
              <span class="rose-plan-tag">${escapeHtml(getHomeShowcaseTag(plan))}</span>
              ${plan.googleAccess ? `<span class="rose-plan-tag is-tiktok badge-has-icon"><span class="badge-icon">${renderMobileIcon('tiktok')}</span><span>Hỗ trợ TikTok</span></span>` : ''}
              ${isUnlimitedDayPlan(plan) ? `<span class="rose-plan-tag is-unlimited badge-has-icon"><span class="badge-icon">${renderMobileIcon('spark')}</span><span>${escapeHtml(getUnlimitedUsageLabel(plan))}</span></span>` : ''}
            </div>
            <div class="rose-plan-apps">
              ${renderSupportIconRow(Boolean(plan.googleAccess))}
              <p>${escapeHtml(getFeaturedPlanSupportCopy(plan))}</p>
            </div>
          </div>
          <div class="rose-plan-copy">
            <strong>${escapeHtml(getFeaturedPlanCardName(plan))}</strong>
          </div>
          <div class="rose-plan-bottom">
            <div class="rose-plan-price">
              <span data-plan-price-label>${escapeHtml(getFeaturedPlanPriceLabel(plan))}</span>
              <b data-plan-price-display data-plan-unit-price="${escapeHtml(plan.priceVnd)}">${escapeHtml(plan.priceVnd)}</b>
              <small>${escapeHtml(isUnlimitedDayPlan(plan) ? getUnlimitedUsageLabel(plan) : getPlanSupportNote(plan))}</small>
            </div>
            <div class="rose-plan-buy-row">
              <div class="rose-plan-order-row${isUnlimitedDayPlan(plan) ? '' : ' is-single'}">
                ${
                  isUnlimitedDayPlan(plan)
                    ? `<label class="rose-plan-meta-box rose-plan-days-box" aria-label="Chọn số ngày">
                <span class="rose-plan-meta-box-label">Số ngày</span>
                <span class="rose-plan-quantity-controls">
                  <button type="button" class="rose-plan-quantity-step" data-plan-period-step="-1" aria-label="Giảm số ngày">-</button>
                  <input class="rose-plan-quantity-input" type="number" min="1" max="365" step="1" value="1" inputmode="numeric" data-plan-period-input aria-label="Số ngày" />
                  <button type="button" class="rose-plan-quantity-step" data-plan-period-step="1" aria-label="Tăng số ngày">+</button>
                </span>
              </label>`
                    : ''
                }
              <label class="rose-plan-quantity" aria-label="Chọn số lượng">
                <span class="rose-plan-quantity-label">Số lượng</span>
                <span class="rose-plan-quantity-controls">
                  <button type="button" class="rose-plan-quantity-step" data-plan-quantity-step="-1" aria-label="Giảm số lượng">-</button>
                  <input class="rose-plan-quantity-input" type="number" min="1" max="99" step="1" value="1" inputmode="numeric" data-plan-quantity-input aria-label="Số lượng" />
                  <button type="button" class="rose-plan-quantity-step" data-plan-quantity-step="1" aria-label="Tăng số lượng">+</button>
                </span>
              </label>
              </div>
              <button class="rose-plan-buy" type="button" data-plan-buy-link data-plan-slug="${escapeHtml(plan.slug)}" data-plan-name="${escapeHtml(getFeaturedPlanCardName(plan))}">Mua gói</button>
            </div>
          </div>
        </article>`,
            )
            .join('')}
        </section>

        <div class="detail-plan-grid detail-plan-grid-hidden" aria-hidden="true">
          ${showcasePlans
            .map(
              (plan) => `
        <button
          class="detail-plan-card"
          type="button"
          data-plan-choice
          data-market-card
          data-groups="${getPlanGroups(plan).join(' ')}"
          data-plan-target="${plan.slug}"
          data-plan-name="${getPublicPlanName(plan)}"
          data-plan-price="${plan.priceVnd}"
          data-plan-meta="${getPlanInternetNote(plan)} · ${getPlanOperationalNote(plan)}"
          data-plan-topup="${plan.supportTopUpType && plan.supportTopUpType > 0 ? 'true' : 'false'}"
        ></button>`,
            )
            .join('')}
        </div>
      </div>

    </div>
  </section>

  <section class="rose-travel-promo-section">
    <div class="wrap">
      <article class="rose-travel-promo reveal">
        <div class="rose-travel-promo-copy">
          <span class="rose-travel-promo-kicker">Ưu đãi tour</span>
          <div class="rose-travel-promo-title-stack">
            <h2 class="rose-travel-promo-title">eSIM CN x Sơn Hằng Travel</h2>
            <p class="rose-travel-promo-subtitle">eSIM CN đồng hành cùng Sơn Hằng Travel trong những chuyến đi</p>
          </div>
          <p class="rose-travel-promo-lead">Khách đăng ký tour từ Sơn Hằng Travel được tặng ưu đãi eSIM data tốc độ cao phù hợp từng hành trình.</p>
          <p class="rose-travel-promo-note">Liên hệ eSIM CN hoặc Sơn Hằng Travel để biết thông tin ưu đãi.</p>
        </div>
        <div class="rose-travel-promo-actions">
          <span class="rose-travel-promo-tag">Sơn Hằng Travel x eSIM CN</span>
          <h3 class="rose-travel-promo-side-title">Vi Vu Cùng Sơn Hằng Travel Nhận eSIM Tốc độ cao</h3>
          <a class="rose-travel-promo-primary" href="https://sonhangtravel.com" target="_blank" rel="noopener noreferrer">Đăng Ký Ngay</a>
        </div>
      </article>
    </div>
  </section>

  <section class="rose-reasons section-soft">
    <div class="wrap home-node-shell">
      <div class="rose-reasons-head">
        <span class="section-kicker">Lý do chọn</span>
        <h2 class="section-title">4 lý do chọn eSIM CN.</h2>
      </div>
      <div class="rose-reasons-grid">
        ${desktopReasonCards
          .map(
            (item) => `
        <article class="rose-reason-card reveal">
          <span class="rose-reason-icon">${renderMobileIcon(item.icon)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.copy)}</p>
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="detail-section" id="reviews">
    <div class="wrap home-node-shell">
      <div class="detail-section-head">
        <div>
          <span class="section-kicker">Đánh giá</span>
          <h2 class="section-title">Đánh giá từ khách hàng.</h2>
          <p class="section-copy">Một số phản hồi gần đây từ khách đã sử dụng.</p>
        </div>
      </div>
      <div class="detail-review-summary reveal">
        <span class="detail-rating-score">4,8/5</span>
        <strong>Tốt</strong>
        <span>${reviewCards.length} phản hồi gần đây</span>
      </div>
      <div class="detail-review-grid">
        ${reviewCards
          .map(
            (item) => `
        <article class="detail-review-card reveal">
          <div class="detail-review-top">
            <span>${item.name.slice(0, 1)}</span>
            <div>
              <strong>${item.name}</strong>
              <small>${item.role}</small>
            </div>
          </div>
          <p>${item.quote}</p>
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="detail-section">
    <div class="wrap detail-meta-grid home-node-shell">
      <article class="detail-info-card reveal" id="devices">
        <div class="detail-section-head">
          <div>
            <span class="section-kicker">Thông tin thiết bị</span>
            <h2 class="section-title">Trước khi chốt cần kiểm tra gì.</h2>
          </div>
        </div>
        <div class="detail-info-list">
          ${deviceInfo
            .map(
              (item) => `
          <div class="detail-info-row">
            <strong>${item.label}</strong>
            <p>${item.value}</p>
          </div>`,
            )
            .join('')}
        </div>
      </article>

      <article class="detail-info-card reveal" id="included">
        <div class="detail-section-head">
          <div>
            <span class="section-kicker">Bao gồm</span>
            <h2 class="section-title">Thanh toán xong sẽ nhận được gì.</h2>
          </div>
        </div>
        <div class="detail-include-list">
          ${includedItems.map((item) => `<div class="detail-include-item">${item}</div>`).join('')}
        </div>
      </article>
    </div>
  </section>

  <section class="detail-section" id="how">
    <div class="wrap home-node-shell">
      <div class="detail-section-head">
        <div>
          <span class="section-kicker">Cách sử dụng</span>
          <h2 class="section-title">Chỉ cần 3 bước là dùng được eSIM.</h2>
        </div>
      </div>
      <div class="detail-step-grid">
        ${buyingSteps
          .map(
            (item, index) => `
        <article class="detail-step-card reveal">
          <span>0${index + 1}</span>
          <strong>${item.title}</strong>
          <p>${item.copy}</p>
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="detail-section" id="faq">
    <div class="wrap home-node-shell">
      <div class="detail-section-head">
        <div>
          <span class="section-kicker">FAQ</span>
          <h2 class="section-title">Câu hỏi thường gặp.</h2>
        </div>
      </div>
      <div class="detail-faq-list">
        ${faqs
          .slice(0, 4)
          .map(
            (item) => `
        <article class="detail-faq-item reveal">
          <strong>${item.question}</strong>
          <p>${item.answer}</p>
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="detail-section" id="guides">
    <div class="wrap home-node-shell">
      <div class="detail-section-head">
        <div>
          <span class="section-kicker">Hướng dẫn nhanh</span>
          <h2 class="section-title">Các bài nên đọc trước khi chọn gói.</h2>
        </div>
      </div>
      <div class="article-related-grid">
        ${articles
          .slice()
          .reverse()
          .slice(0, 6)
          .map(
            (item) => `
        <a class="article-related-card reveal" href="/blog/${item.slug}">
          <span>${item.readingTime}</span>
          <strong>${item.title}</strong>
          <p>${item.excerpt}</p>
        </a>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <div class="mobile-buy-bar">
    <div class="mobile-buy-copy">
      <small>Từ</small>
      <strong data-selected-price>${featuredPlan?.priceVnd ?? cheapestPlan?.priceVnd ?? ''}</strong>
    </div>
    <a class="mobile-buy-button" href="${buildPurchasePath(featuredPlan ?? cheapestPlan)}">Mua gói</a>
  </div>
</main>
${footer(context)}
`;

  return layout({
    title: context.homeMetaTitle,
    description: context.homeMetaDescription,
    pathname: '/',
    body,
    context,
    structuredData: homeSchemas,
    bodyClass: 'page-home',
  });
};

export const renderCatalogPage = (context: RenderContext, planList: Plan[] = plans) => {
  const visiblePlans = getVisiblePlans(planList);
  const ownPlans = getManagedPublicPlans(visiblePlans);
  const publicPlans = ownPlans.length > 0 ? ownPlans : visiblePlans;
  const totalPlans = new Intl.NumberFormat('vi-VN').format(publicPlans.length);
  const dailyCount = publicPlans.filter((plan) => plan.periodRequired || plan.dataType === 2).length;
  const packageCount = publicPlans.filter((plan) => plan.dataType === 1 && !plan.periodRequired).length;
  const highDataCount = publicPlans.filter((plan) => getPlanDataAllowanceMb(plan) >= 10240).length;
  const googleCount = publicPlans.filter((plan) => plan.googleAccess).length;
  const featuredCards = renderStoreProductCards(publicPlans.slice(0, 9), { filterable: false });
  const catalogCards = renderStoreProductCards(publicPlans, { filterable: true });
  const marketTabs = [
    { key: 'all', label: 'Tất cả', count: publicPlans.length },
    { key: 'daily', label: 'Theo ngày', count: dailyCount },
    { key: 'package', label: 'Trọn gói', count: packageCount },
  ]
    .map(
      (tab, index) => `
<button class="market-tab${index === 0 ? ' is-active' : ''}" type="button" data-market-tab="${tab.key}">
  ${tab.label} <span>${tab.count}</span>
</button>`,
    )
    .join('');
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Goi eSIM Trung Quoc',
      itemListElement: publicPlans.map((plan, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: getPublicPlanName(plan),
          description: plan.description,
          url: fullUrl(context.siteUrl, buildPurchasePath(plan)),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: plan.priceUsd,
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
  ];

  const body = `
${header(context)}
<main class="page-catalog">
  <section class="page-hero">
    <div class="wrap catalog-hero-grid">
      <div class="section-head">
        <span class="section-kicker">Danh sách gói</span>
        <h1 class="page-title">Gói eSIM Trung Quốc</h1>
        <p class="page-lead">${totalPlans} gói đang mở bán, gồm các gói theo ngày và trọn gói đã được chọn sẵn.</p>
      </div>
      <aside class="catalog-hero-side reveal">
        <div class="catalog-side-card">
          <strong>Hỗ trợ TikTok, Google, Gmail và Maps</strong>
          <p>Chỉ hiển thị các gói đang bán để catalog gọn hơn và dễ chọn nhanh.</p>
          <div class="home-badge-row">
            ${renderBadgeChip('Hỗ trợ TikTok', 'tiktok')}
            ${renderBadgeChip(getUnlimitedUsageLabel(publicPlans.find((plan) => isUnlimitedDayPlan(plan)) ?? null), 'unlimited')}
            <span class="home-inline-badge">QR qua email</span>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <section class="section catalog-summary">
    <div class="wrap">
      <div class="catalog-stat-grid">
        <article class="catalog-stat-card reveal">
          <span>Theo ngày</span>
          <strong>${dailyCount}</strong>
          <small>Nhập số ngày, hỗ trợ không giới hạn ứng dụng</small>
        </article>
        <article class="catalog-stat-card reveal">
          <span>Trọn gói</span>
          <strong>${packageCount}</strong>
          <small>Mua một lần, dùng theo thời hạn gói</small>
        </article>
        <article class="catalog-stat-card reveal">
          <span>Dung lượng cao</span>
          <strong>${highDataCount}</strong>
          <small>Từ 10GB trở lên</small>
        </article>
        <article class="catalog-stat-card reveal">
          <span>Hỗ trợ TikTok</span>
          <strong>${googleCount}</strong>
          <small>Có thể dùng TikTok, Google, Gmail và Maps</small>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="catalog-section-head">
        <div>
          <span class="section-kicker">Gợi ý nhanh</span>
          <h2 class="section-title">9 gói đề xuất.</h2>
          <p class="section-copy">Ưu tiên các gói phổ biến để chọn nhanh theo nhu cầu sử dụng.</p>
        </div>
      </div>
      <div class="store-product-grid catalog-featured-grid">
        ${featuredCards}
      </div>
    </div>
  </section>

  <section class="trip-plan-section">
    <div class="wrap">
      <div class="catalog-section-head">
        <div>
          <span class="section-kicker">Catalog</span>
          <h2 class="section-title">Tất cả gói đang mở bán.</h2>
          <p class="section-copy">Danh sách gọn, chỉ gồm các gói đang bán hiện tại.</p>
        </div>
      </div>
      <section class="catalog-toolbar reveal" data-catalog-controls>
        <div class="catalog-toolbar-grid">
          <label class="catalog-filter-field catalog-filter-field-search">
            <span>Tìm gói</span>
            <input class="catalog-filter-input" type="search" placeholder="Ví dụ: 3GB, 15 ngày, 30 ngày" data-catalog-search />
          </label>
          <label class="catalog-filter-field">
            <span>Sắp xếp</span>
            <select class="catalog-filter-select" data-catalog-sort>
              <option value="recommended">Đề xuất</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
              <option value="data-desc">Dung lượng cao nhất</option>
              <option value="days-desc">Thời hạn dài nhất</option>
            </select>
          </label>
        </div>
        <div class="catalog-toolbar-meta">
          <strong data-catalog-results>Hiển thị ${publicPlans.length} / ${publicPlans.length} gói</strong>
          <span>Tìm nhanh theo tên gói hoặc sắp xếp theo nhu cầu.</span>
        </div>
      </section>
      <div class="market-tab-row trip-filter-bar" role="tablist" aria-label="Bộ lọc gói eSIM">
        ${marketTabs}
      </div>
      <div class="store-product-grid catalog-full-grid" data-catalog-grid>
        ${catalogCards}
      </div>
      <div class="market-empty" data-market-empty hidden>Hiện chưa có gói trong nhóm này.</div>
    </div>
  </section>
</main>
${footer(context)}
`;

  return layout({
    title: 'Gói eSIM Trung Quốc | Theo ngày và trọn gói | eSIM CN',
    description: 'Danh sách các gói eSIM Trung Quốc theo ngày và trọn gói đang mở bán. Giá hiển thị rõ ràng, hỗ trợ TikTok, Google, Gmail và Maps.',
    pathname: '/goi-esim',
    body,
    context,
    structuredData: schemas,
  });
};

export const renderPlanPage = (context: RenderContext, plan: Plan, planList: Plan[] = plans) => {
  const relatedPlans = getRelatedPlans(planList, plan);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: getPublicPlanName(plan),
      description: plan.description,
      brand: { '@type': 'Brand', name: context.siteName },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: plan.priceUsd,
        availability: 'https://schema.org/InStock',
        url: fullUrl(context.siteUrl, `/plans/${plan.slug}`),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: context.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Gói cước', item: fullUrl(context.siteUrl, '/goi-esim') },
        { '@type': 'ListItem', position: 3, name: getPublicPlanName(plan), item: fullUrl(context.siteUrl, `/plans/${plan.slug}`) },
      ],
    },
  ];

  const body = `
${header(context)}
<main>
  <section class="page-hero">
    <div class="wrap page-hero-inner">
      <div>
        <span class="section-kicker">${plan.shortLabel}</span>
        <h1 class="page-title">${renderPlanTitleContent(plan)}</h1>
        <p class="page-lead">${plan.description}</p>
        <div class="button-row">
          <a class="button button-primary" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
          <a class="button button-secondary" href="/goi-esim">Xem catalog</a>
        </div>
      </div>
      <aside class="plan-summary reveal">
        <div class="price-block price-block-large">
          <strong class="price-main">${plan.priceVnd}</strong>
          <span class="price-sub">${moneyUsd.format(plan.priceUsd)}</span>
        </div>
        <div class="summary-row">
          <strong>Data</strong>
          <span>${plan.dataAllowance}</span>
        </div>
        <div class="summary-row">
          <strong>Thời hạn</strong>
          <span>${plan.periodRequired ? 'Theo ngày, nhập số ngày khi đặt' : plan.validity}</span>
        </div>
        <div class="summary-row">
          <strong>Phạm vi</strong>
          <span>${plan.coverage}</span>
        </div>
        <div class="summary-row">
          <strong>Nạp thêm</strong>
          <span>${plan.supportTopUpType && plan.supportTopUpType > 0 ? 'Có thể top up' : 'Theo gói cố định'}</span>
        </div>
        <div class="summary-row">
          <strong>Google / Maps</strong>
          <span>${plan.googleAccess ? `Dùng được${plan.ipExport ? ` · IP ${plan.ipExport}` : ''}` : 'Kiểm tra lại package'}</span>
        </div>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="wrap split-layout">
      <div class="spec-card reveal">
        <div class="summary-row">
          <strong>Tốc độ</strong>
          <span>${plan.speed}</span>
        </div>
        <div class="summary-row">
          <strong>Hotspot</strong>
          <span>${plan.hotspot}</span>
        </div>
        <div class="summary-row">
          <strong>Phù hợp cho</strong>
          <span>${plan.idealFor}</span>
        </div>
        <div class="summary-row">
          <strong>Nhà mạng / vùng phủ</strong>
          <span>${plan.operators && plan.operators.length > 0 ? plan.operators.join(', ') : plan.cities.join(', ')}</span>
        </div>
      </div>
      <div class="spec-card reveal">
        <h2 class="section-title">Điểm mạnh của gói này</h2>
        <ul class="feature-list feature-list-large">
          ${plan.highlights.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        ${
          plan.periodRequired
            ? '<p class="section-copy">Đây là gói theo ngày. Khi gửi yêu cầu mua, hãy nhập số ngày dùng thực tế để lên đơn đúng package.</p>'
            : ''
        }
        <a class="button button-primary" href="${buildPurchasePath(plan)}" data-plan-target="${plan.slug}" data-plan-name="${getPublicPlanName(plan)}">Mua gói</a>
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="wrap">
      <div class="section-head">
        <span class="section-kicker">Gói liên quan</span>
        <h2 class="section-title">Nếu chưa chắc, bạn có thể xem thêm các gói gần nhu cầu.</h2>
      </div>
      <div class="products-grid">
        ${relatedPlans
          .map(
            (item) => `
        <article class="product-card reveal">
          <div class="product-head">
            <span class="product-badge">${item.shortLabel}</span>
            <h3 class="product-name">${renderPlanTitleContent(item)}</h3>
            <p class="product-desc">${item.description}</p>
          </div>
          <div class="price-block">
            <strong class="price-main">${item.priceVnd}</strong>
            <span class="price-sub">${moneyUsd.format(item.priceUsd)}</span>
          </div>
          <div class="card-actions">
            <a class="button button-primary" href="/plans/${item.slug}">Xem gói</a>
            <a class="text-link" href="${buildPurchasePath(item)}" data-plan-target="${item.slug}" data-plan-name="${getPublicPlanName(item)}">Mua nhanh</a>
          </div>
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>
</main>
${footer(context)}
`;

  return layout({
    title: `${getPublicPlanName(plan)} | Giá ${plan.priceVnd} | eSIM CN`,
    description: `${getPublicPlanName(plan)} cho chuyến đi Trung Quốc với ${plan.dataAllowance}, thời hạn ${plan.validity}, phù hợp ${plan.idealFor}.`,
    pathname: `/plans/${plan.slug}`,
    body,
    context,
    structuredData: schemas,
  });
};

export const renderOrderLookupPage = (
  context: RenderContext,
  search: {
    reference: string;
    email: string;
    phone: string;
    searched: boolean;
    message: string;
  },
  results: Array<{
    reference: string;
    paymentStatus: string;
    paymentStatusLabel: string;
    planTitle: string;
    planMeta: string;
    amountLabel: string;
    createdLabel: string;
    paidLabel: string | null;
    phoneLabel: string | null;
    destinationHref: string;
    destinationLabel: string;
  }> = [],
  magicLink: {
    email: string;
    phoneLast4: string;
    message: string;
  } | null = null,
) => {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Tra cứu đơn eSIM',
      description: 'Nhập email và 4 số cuối số điện thoại để nhận link đăng nhập mở lại đơn eSIM đã mua.',
      url: fullUrl(context.siteUrl, '/tra-cuu-don'),
    },
  ];

  const body = `
${header(context)}
<section class="checkout-mobile-top">
  <div class="wrap">
    <div class="mobile-app-nav">
      ${renderMobileBrandLink(context)}
      <a class="checkout-mobile-back" href="/">Về trang chủ</a>
    </div>
    <section class="mobile-app-offer-head checkout-mobile-head">
      <h2>Đơn Của Tôi</h2>
      <p>Mở lại đơn đã mua để xem QR, dung lượng còn lại hoặc tiếp tục thanh toán <span>››</span></p>
    </section>
  </div>
</section>
<main class="checkout-page order-lookup-page">
  <section class="page-hero checkout-hero">
    <div class="wrap checkout-hero-inner">
      <div>
        <span class="section-kicker">Đơn của tôi</span>
        <h1 class="page-title checkout-title">Nhận link đăng nhập để mở lại đơn đã mua.</h1>
        <p class="page-lead">Nhập đúng email và 4 số cuối số điện thoại đã dùng lúc mua. Hệ thống sẽ gửi link đăng nhập một lần về email để anh mở khu đơn của mình an toàn hơn.</p>
      </div>
      <div class="checkout-top-note reveal">
        <strong>Cách ổn nhất</strong>
        <p>Dùng email và 4 số cuối số điện thoại để nhận link đăng nhập. Không cần nhớ mật khẩu, cũng không cần giữ lại mã đơn.</p>
      </div>
    </div>
  </section>

  <section class="section checkout-section">
    <div class="wrap checkout-grid order-lookup-grid">
      <aside class="checkout-summary-card reveal">
        <div class="checkout-summary-head">
          <span class="checkout-summary-kicker">Sau khi nhận link</span>
          <strong>Mở lại toàn bộ flow đã mua</strong>
        </div>
        <div class="checkout-summary-selected">
          <b>Đơn đang chờ thanh toán</b>
          <p>Mở lại đúng trang QR để tiếp tục chuyển khoản, không cần tạo đơn mới.</p>
        </div>
        <div class="checkout-summary-selected">
          <b>Đơn đã thanh toán</b>
          <p>Xem lại QR eSIM thật, link cài trực tiếp, mã kích hoạt và thông tin cài đặt.</p>
        </div>
        <div class="checkout-perk-list">
          <span>Link đăng nhập gửi một lần về email nên an toàn hơn mở bằng mã đơn.</span>
          <span>Có thể kiểm tra dung lượng còn lại trực tiếp ngay trên trang đơn.</span>
          <span>Nếu gói hỗ trợ top-up, hệ thống cũng hiện luôn danh sách gói nạp thêm.</span>
          <span>Nếu không tìm thấy đơn, anh gửi lại đúng email và 4 số cuối số điện thoại đã nhập lúc mua.</span>
        </div>
      </aside>

      <section class="checkout-form-card reveal">
        <div class="checkout-form-head">
          <span class="checkout-form-eyebrow">Nhận link đăng nhập</span>
          <h2>Nhập đúng email và 4 số cuối số điện thoại để hệ thống gửi link mở lại đơn.</h2>
          <p>Link đăng nhập sẽ được gửi tới email dùng lúc mua. Bấm vào là vào thẳng khu “đơn của tôi”.</p>
        </div>

        <form class="checkout-form order-lookup-form" action="/tra-cuu-don/gui-link" method="post">
          <div class="checkout-form-grid">
            <label>
              Gmail / Email
              <input name="email" type="email" autocomplete="email" value="${escapeHtml(magicLink?.email ?? search.email)}" placeholder="Ví dụ: abc@gmail.com" required />
            </label>
            <label>
              4 số cuối số điện thoại
              <input name="phoneLast4" autocomplete="one-time-code" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" value="${escapeHtml(magicLink?.phoneLast4 ?? '')}" placeholder="Ví dụ: 1234" required />
            </label>
          </div>

          <button class="button button-primary checkout-submit" type="submit">Gửi link đăng nhập</button>
          <div class="checkout-form-note order-lookup-note">${escapeHtml(magicLink?.message ?? search.message)}</div>
        </form>

        <div class="checkout-form-note order-lookup-note">Vì lý do bảo mật, tra cứu kiểu cũ bằng mã đơn hoặc chỉ bằng thông tin mua hàng đã được tắt. Anh vui lòng dùng link đăng nhập gửi về email.</div>
      </section>
    </div>
  </section>
</main>
${footer(context)}
`;

  return layout({
    title: 'Đơn của tôi | eSIM CN',
    description: 'Nhận link đăng nhập qua email để mở lại đơn eSIM đã mua.',
    pathname: '/tra-cuu-don',
    body,
    bodyClass: 'page-checkout page-order-lookup',
    context,
    structuredData: schemas,
  });
};

export const renderCustomerPortalPage = (
  context: RenderContext,
  data: {
    email: string;
    phoneLast4: string;
    orders: CustomerPortalOrderItem[];
    message?: string | null;
  },
) => {
  const orderCards = data.orders
    .map(
      (order) => `
      <article class="order-lookup-item">
        <div class="order-lookup-item-top">
          <div class="order-lookup-item-copy">
            <span class="order-lookup-reference">${escapeHtml(order.reference)}</span>
            <strong>${escapeHtml(order.planTitle)}</strong>
            <p>${escapeHtml(order.planMeta)}</p>
          </div>
          <span class="order-lookup-status${order.paymentStatus === 'paid' ? ' is-paid' : ''}">${escapeHtml(order.paymentStatusLabel)}</span>
        </div>
        <div class="order-lookup-meta-grid">
          <article class="order-lookup-meta-item">
            <span>Tổng tiền</span>
            <strong>${escapeHtml(order.amountLabel)}</strong>
          </article>
          <article class="order-lookup-meta-item">
            <span>Tạo lúc</span>
            <strong>${escapeHtml(order.createdLabel)}</strong>
          </article>
          <article class="order-lookup-meta-item">
            <span>${order.paidLabel ? 'Thanh toán lúc' : 'Trạng thái mở đơn'}</span>
            <strong>${escapeHtml(order.paidLabel ?? order.paymentStatusLabel)}</strong>
          </article>
        </div>
        <div class="payment-action-row payment-action-row-single">
          <a class="button ${order.paymentStatus === 'paid' ? 'button-primary' : 'button-secondary'}" href="${order.destinationHref}">${escapeHtml(order.destinationLabel)}</a>
        </div>
      </article>`,
    )
    .join('');

  const body = `
${header(context)}
<section class="checkout-mobile-top">
  <div class="wrap">
    <div class="mobile-app-nav">
      ${renderMobileBrandLink(context)}
      <a class="checkout-mobile-back" href="/tra-cuu-don">Đơn của tôi</a>
    </div>
    <section class="mobile-app-offer-head checkout-mobile-head">
      <h2>Đơn Của Tôi</h2>
      <p>Mở lại đơn, xem QR, dung lượng còn lại hoặc tiếp tục thanh toán <span>››</span></p>
    </section>
  </div>
</section>
<main class="checkout-page order-lookup-page">
  <section class="page-hero checkout-hero">
    <div class="wrap checkout-hero-inner">
      <div>
        <span class="section-kicker">Khu đơn hàng</span>
        <h1 class="page-title checkout-title">Các đơn gắn với email ${escapeHtml(data.email)}</h1>
        <p class="page-lead">Phiên đăng nhập này được xác minh bằng email và 4 số cuối số điện thoại ${escapeHtml(data.phoneLast4)}. Trên thiết bị này, anh có thể quay lại trong một thời gian mà không cần xin link mới.</p>
      </div>
      <div class="checkout-top-note reveal">
        <strong>Không cần mật khẩu</strong>
        <p>Mỗi lần cần mở lại đơn, anh chỉ cần yêu cầu gửi link mới về email đã mua.</p>
      </div>
    </div>
  </section>

  <section class="section checkout-section">
    <div class="wrap checkout-grid order-lookup-grid">
      <aside class="checkout-summary-card reveal">
        <div class="checkout-summary-head">
          <span class="checkout-summary-kicker">Tài khoản tạm</span>
          <strong>Mở lại đơn an toàn</strong>
        </div>
        <div class="checkout-summary-selected">
          <b>Email đăng nhập</b>
          <p>${escapeHtml(data.email)}</p>
        </div>
        <div class="checkout-summary-selected">
          <b>4 số cuối SĐT</b>
          <p>${escapeHtml(data.phoneLast4)}</p>
        </div>
        <div class="checkout-perk-list">
          <span>Phiên này chỉ mở các đơn khớp với email và số điện thoại đã xác minh.</span>
          <span>Thiết bị này sẽ được nhớ trong một thời gian để anh quay lại khu đơn nhanh hơn.</span>
          <span>Nếu cần, anh có thể xin lại link đăng nhập mới từ trang tra cứu đơn.</span>
          <span>Dùng xong có thể đăng xuất để đóng phiên truy cập.</span>
        </div>
        <div class="payment-action-row payment-action-row-single">
          <form action="/don-cua-toi/dang-xuat" method="post">
            <button class="button button-secondary" type="submit">Đăng xuất</button>
          </form>
        </div>
      </aside>

      <section class="checkout-form-card reveal">
        <div class="checkout-form-head">
          <span class="checkout-form-eyebrow">Đơn đã mua</span>
          <h2>${data.orders.length === 1 ? 'Đã tìm thấy 1 đơn phù hợp' : `Đã tìm thấy ${data.orders.length} đơn phù hợp`}</h2>
          <p>${escapeHtml(data.message ?? 'Mở lại đúng đơn để xem QR eSIM, dung lượng còn lại hoặc tiếp tục thanh toán.')}</p>
        </div>
        <section class="order-lookup-results">
          <div class="order-lookup-list">${orderCards}</div>
        </section>
      </section>
    </div>
  </section>
</main>
${footer(context)}
`;

  return layout({
    title: 'Đơn của tôi | eSIM CN',
    description: 'Khu đơn hàng đăng nhập bằng link email để mở lại các đơn eSIM đã mua.',
    pathname: '/don-cua-toi',
    body,
    bodyClass: 'page-checkout page-order-lookup',
    context,
    robots: 'noindex,nofollow,noarchive',
  });
};

export const renderCheckoutPage = (
  context: RenderContext,
  planList: Plan[] = plans,
  requestedSlug = '',
  requestedPeriod: number | null = null,
  requestedQuantity = 1,
) => {
  const visiblePlans = getVisiblePlans(planList);
  const ownPlans = getManagedPublicPlans(visiblePlans);
  const publicPlans = ownPlans.length > 0 ? ownPlans : visiblePlans;
  const mainlandPlans = publicPlans
    .filter((item) => item.catalogGroup === 'mainland' && item.googleAccess)
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const fallbackPlan =
    mainlandPlans.find((item) => (item.durationDays ?? 0) >= 10 && getPlanDataAllowanceMb(item) >= 3072) ??
    mainlandPlans[0] ??
    [...publicPlans].sort((left, right) => left.priceUsd - right.priceUsd)[0];
  const selectedPlan = publicPlans.find((item) => item.slug === requestedSlug) ?? fallbackPlan;
  const selectedQuantity = Math.max(1, Math.min(99, Math.round(requestedQuantity || 1)));
  const selectedPeriod = selectedPlan?.periodRequired
    ? Math.max(1, Math.min(DAY_PASS_MAX_DAYS, Math.round(requestedPeriod ?? 1)))
    : null;
  const selectedUnitPrice =
    selectedPlan == null
      ? ''
      : selectedPlan.periodRequired
        ? formatVndFromUsd(getDayPassTotalUsd(selectedPlan, selectedPeriod ?? 1))
        : selectedPlan.priceVnd;
  const selectedPrice =
    selectedPlan == null
      ? ''
      : formatVndAmount(
          (selectedPlan.periodRequired
            ? Math.round(getDayPassTotalUsd(selectedPlan, selectedPeriod ?? 1) * USD_TO_VND)
            : parseVndLabelToAmount(selectedPlan.priceVnd) ?? Math.round(selectedPlan.priceUsd * USD_TO_VND)) * selectedQuantity,
        );
  const selectedMeta =
    selectedPlan == null
      ? ''
      : getPlanInternetNote(selectedPlan);
  const selectedName =
    selectedPlan == null
      ? ''
      : selectedPlan.periodRequired
        ? getDayPassSummaryName(selectedPlan, selectedPeriod ?? 1)
        : getPublicPlanName(selectedPlan);
  const planOptions = renderPlanOptions(publicPlans);
  const checkoutPlanOptions =
    selectedPlan == null ? planOptions : planOptions.replace(`value="${selectedPlan.slug}"`, `value="${selectedPlan.slug}" selected`);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Mua gói eSIM Trung Quốc',
      description: 'Điền thông tin mua gói eSIM Trung Quốc để xác nhận đơn và gửi QR qua email.',
      url: fullUrl(context.siteUrl, buildPurchasePath(selectedPlan ?? undefined, selectedPeriod)),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: context.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Mua gói', item: fullUrl(context.siteUrl, '/mua-goi') },
      ],
    },
  ];

  const body = `
${header(context, { ctaHref: '/', ctaLabel: 'Về trang chủ' })}
<section class="checkout-mobile-top">
  <div class="wrap">
    <div class="mobile-app-nav">
      ${renderMobileBrandLink(context)}
      <a class="checkout-mobile-back" href="/">Về trang chủ</a>
    </div>
    <section class="mobile-app-offer-head checkout-mobile-head">
      <span class="checkout-mobile-head-kicker">Mua gói</span>
      <h2>Nhập thông tin nhận QR</h2>
    </section>
  </div>
</section>
<main class="checkout-page">
  <section class="page-hero checkout-hero">
    <div class="wrap checkout-hero-inner">
      <div>
        <span class="section-kicker">Mua gói</span>
        <h1 class="page-title checkout-title">Chốt gói và nhận QR.</h1>
        <p class="page-lead">Điền họ tên, số điện thoại và email nhận QR. QR sẽ được gửi qua email để cài trước chuyến đi.</p>
      </div>
    </div>
  </section>

  <section class="section checkout-section">
    <div class="wrap checkout-grid">
      <aside class="checkout-summary-card reveal" data-order-card>
        <div class="checkout-summary-head">
          <span class="checkout-summary-kicker">Gói đang chọn</span>
          <strong data-selected-price>${selectedPrice}</strong>
        </div>
        <div class="checkout-summary-selected">
          <b data-selected-name>${selectedName}</b>
          <p class="support-meta-text" data-selected-meta>${selectedMeta}</p>
          ${renderSupportIconRow(Boolean(selectedPlan?.googleAccess), ' data-selected-support', !Boolean(selectedPlan?.googleAccess))}
          <div class="home-badge-row">
            ${renderBadgeChip('Hỗ trợ TikTok', 'tiktok', ' data-selected-tiktok', !selectedMeta.includes('TikTok'))}
            ${renderBadgeChip(getUnlimitedUsageLabel(selectedPlan), 'unlimited', ' data-selected-unlimited', !Boolean(selectedPlan && isUnlimitedDayPlan(selectedPlan)))}
            <span class="home-inline-badge" data-selected-topup${selectedPlan?.supportTopUpType && selectedPlan.supportTopUpType > 0 ? '' : ' hidden'}>Có thể mua thêm dung lượng trong quá trình sử dụng</span>
          </div>
        </div>
        <div class="checkout-stat-grid">
          <article class="checkout-stat">
            <span>Số lượng</span>
            <strong>${selectedQuantity}</strong>
          </article>
          <article class="checkout-stat">
            <span>Dung lượng</span>
            <strong data-selected-data>${selectedPlan?.dataAllowance ?? ''}</strong>
          </article>
          <article class="checkout-stat">
            <span>Thời hạn</span>
            <strong data-selected-days>${selectedPlan?.periodRequired ? `${selectedPeriod ?? 1} ngày` : selectedPlan?.validity ?? ''}</strong>
          </article>
        </div>
        <div class="checkout-summary-line">Đơn giá ${selectedUnitPrice}${selectedQuantity > 1 ? ` × ${selectedQuantity}` : ''}</div>
        <div class="checkout-perk-list">
          <span>QR gửi qua email sau khi xác nhận đơn.</span>
          <span>Giữ nguyên SIM chính trên máy, chỉ thêm eSIM để dùng data.</span>
          <span>Hỗ trợ tiếng Việt nếu cần hướng dẫn cài đặt.</span>
          <span>Mở lại đơn bằng email, không cần tạo tài khoản.</span>
        </div>
      </aside>

      <section class="checkout-form-card reveal">
        <div class="checkout-mobile-sheet">
          <span class="checkout-mobile-sheet-kicker">Gói đã chọn</span>
          <div class="checkout-mobile-sheet-main">
            <div class="checkout-mobile-sheet-copy">
              <b data-selected-name>${selectedName}</b>
              <div class="checkout-mobile-sheet-meta">
                <span>${selectedQuantity} eSIM</span>
                <span data-selected-data>${selectedPlan?.dataAllowance ?? ''}</span>
                <span data-selected-days>${selectedPlan?.periodRequired ? `${selectedPeriod ?? 1} ngày` : selectedPlan?.validity ?? ''}</span>
              </div>
            </div>
            <div class="checkout-mobile-sheet-price">
              <small>Tạm tính</small>
              <strong data-selected-price>${selectedPrice}</strong>
            </div>
          </div>
        </div>
        <div class="checkout-form-head">
          <span class="checkout-form-eyebrow">Thông tin nhận QR</span>
          <h2>Điền email và số điện thoại để nhận QR.</h2>
          <p>Email này cũng dùng để mở lại đơn sau khi thanh toán.</p>
        </div>

        <form data-order-form class="checkout-form" method="post">
          <input name="source" type="hidden" value="checkout-page" />
          <input name="quantity" type="hidden" value="${selectedQuantity}" />
          <input name="periodNum" type="hidden" value="${selectedPlan?.periodRequired ? String(selectedPeriod ?? 1) : ''}" />

          <label class="checkout-plan-input" aria-hidden="true">
            <select
              name="planSlug"
              data-default-plan="${selectedPlan?.slug ?? ''}"
                data-default-plan-label="${selectedPlan ? getPublicPlanName(selectedPlan) : ''}"
            >
              ${checkoutPlanOptions}
            </select>
          </label>

          <div class="checkout-form-grid">
            <label>
              Họ và tên
              <input name="fullName" autocomplete="name" required placeholder="Ví dụ: Nguyễn Văn A" />
            </label>
            <label>
              Số điện thoại
              <input name="phone" autocomplete="tel-national" inputmode="tel" required placeholder="Ví dụ: 09xxxxxxxx" />
            </label>
          </div>

          <div class="checkout-email-field">
            <span>Email nhận QR</span>
            <div class="checkout-email-input-wrap">
              <input
                name="email"
                type="email"
                autocomplete="email"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                required
                placeholder="Ví dụ: abc@gmail.com"
              />
              <div class="checkout-email-suggestions" data-email-suggestions hidden></div>
            </div>
            <div class="checkout-field-note">Hệ thống sẽ nhớ email, số điện thoại và họ tên trên máy này cho lần mua sau.</div>
          </div>

          <label class="checkout-confirm">
            <input type="checkbox" name="confirmOrder" required />
            <span>Mình đã điền đúng email nhận QR và số điện thoại liên hệ.</span>
          </label>

          <button class="button button-primary checkout-submit" type="submit">Gửi thông tin - Tiến hành thanh toán</button>
          <div class="checkout-form-note">Sau khi xác nhận đơn, QR sẽ được gửi qua email. Khi cần mở lại đơn, chỉ cần dùng email đã nhập.</div>
          <div class="status" data-form-status>Điền đủ thông tin rồi bấm gửi đơn.</div>
        </form>
      </section>
    </div>
  </section>
</main>
${footer(context)}
`;

  return layout({
    title: `${selectedPlan ? getPublicPlanName(selectedPlan) : 'Mua gói eSIM Trung Quốc'} | Mua gói | eSIM CN`,
    description: 'Trang mua gói eSIM Trung Quốc. Điền họ tên, số điện thoại và email để xác nhận đơn và gửi QR.',
    pathname: '/mua-goi',
    body,
    bodyClass: 'page-checkout',
    context,
    structuredData: schemas,
  });
};

export const renderPaymentPage = (
  context: RenderContext,
  payment: {
    reference: string;
    accessToken: string;
    paymentCode: string;
    createdAt: string;
    fullName: string;
    email: string;
    phone: string;
    planName: string;
    planMeta: string;
    amountVnd: number;
    paymentStatus: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
  },
) => {
  const createdLabel = new Date(payment.createdAt).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const amountLabel = `${moneyVnd.format(payment.amountVnd)}đ`;
  const qrParams = new URLSearchParams({
    amount: String(payment.amountVnd),
    addInfo: payment.paymentCode,
  });
  const qrSrc = `https://img.vietqr.io/image/${payment.bankCode}-${payment.accountNumber}-compact2.png?${qrParams.toString()}`;
  const statusLabel =
    payment.paymentStatus === 'paid'
      ? 'Đã thanh toán'
      : payment.paymentStatus === 'pending_review'
        ? 'Đang chờ đối soát'
        : 'Chờ thanh toán';
  const statusNote =
    payment.paymentStatus === 'paid'
      ? 'Bên mình đã xác nhận thanh toán. QR eSIM sẽ được gửi qua email sau khi xử lý.'
      : payment.paymentStatus === 'pending_review'
        ? 'Bên mình đã nhận báo chuyển khoản và đang đối soát. Xác nhận xong sẽ gửi QR qua email.'
        : 'Hệ thống sẽ tự cập nhật khi ngân hàng báo giao dịch. Không cần bấm xác nhận thêm.';
  const body = `
${header(context, { ctaHref: '/', ctaLabel: 'Chọn lại gói' })}
<section class="checkout-mobile-top">
  <div class="wrap">
    <div class="mobile-app-nav">
      ${renderMobileBrandLink(context)}
      <a class="checkout-mobile-back" href="/">Về trang chủ</a>
    </div>
    <section class="mobile-app-offer-head checkout-mobile-head">
      <h2>Thanh toán đơn eSIM</h2>
      <p>Quét QR rồi chuyển đúng số tiền và đúng nội dung.</p>
    </section>
  </div>
</section>
<main class="checkout-page payment-page">
  <section class="section checkout-section">
    <div class="wrap checkout-grid">
      <aside class="checkout-summary-card reveal">
        <div class="checkout-summary-head">
          <span class="checkout-summary-kicker">Mã đơn</span>
          <strong>${escapeHtml(payment.reference)}</strong>
        </div>
        <div class="checkout-summary-selected">
          <b>${escapeHtml(payment.planName)}</b>
          <p>${escapeHtml(payment.planMeta)}</p>
        </div>
        <div class="checkout-stat-grid">
          <article class="checkout-stat">
            <span>Tổng tiền</span>
            <strong>${amountLabel}</strong>
          </article>
          <article class="checkout-stat">
            <span>Trạng thái</span>
            <strong data-payment-status-label>${statusLabel}</strong>
          </article>
        </div>
        <div class="checkout-summary-selected">
          <b>${escapeHtml(payment.fullName)}</b>
          ${payment.phone ? `<p>Số điện thoại: ${escapeHtml(payment.phone)}</p>` : ''}
          <p>Email: ${escapeHtml(payment.email)}</p>
        </div>
        <div class="checkout-perk-list">
          <span>Tạo lúc ${escapeHtml(createdLabel)}</span>
          <span>Chuyển đúng nội dung <strong>${escapeHtml(payment.paymentCode)}</strong> để đối soát thanh toán.</span>
          <span data-payment-status-note>${statusNote}</span>
        </div>
      </aside>

      <section class="checkout-form-card payment-qr-card reveal">
        <div data-payment-reference="${escapeHtml(payment.reference)}" data-payment-token="${escapeHtml(payment.accessToken)}" hidden></div>
        <div class="payment-mobile-sheet">
          <div class="payment-mobile-sheet-top">
            <div class="payment-mobile-sheet-copy">
              <span class="payment-mobile-sheet-kicker">Thanh toán đơn</span>
              <b>${escapeHtml(payment.planName)}</b>
            </div>
            <div class="payment-mobile-sheet-price">
              <small>Tổng tiền</small>
              <strong>${amountLabel}</strong>
            </div>
          </div>
          <div class="payment-mobile-sheet-meta">
            <span>${escapeHtml(payment.reference)}</span>
            <span data-payment-status-label>${statusLabel}</span>
          </div>
        </div>
        <div class="payment-qr-wrap">
          <img class="payment-qr-image" src="${qrSrc}" alt="QR thanh toán ${escapeHtml(payment.reference)}" />
        </div>
        <div class="payment-detail-list">
          <article class="payment-detail-row payment-detail-row-block">
            <div class="payment-detail-copy">
              <span>Thông tin nhận QR</span>
              <strong>${escapeHtml(payment.fullName)}</strong>
              <p>${escapeHtml(payment.planName)}</p>
              ${payment.phone ? `<p>Số điện thoại: ${escapeHtml(payment.phone)}</p>` : ''}
              <p>Email: ${escapeHtml(payment.email)}</p>
            </div>
          </article>
          <article class="payment-detail-row">
            <div class="payment-detail-copy">
              <span>Ngân hàng</span>
              <strong>${escapeHtml(payment.bankCode.toUpperCase())}</strong>
            </div>
          </article>
          <article class="payment-detail-row">
            <div class="payment-detail-copy">
              <span>Số tài khoản</span>
              <strong>${escapeHtml(payment.accountNumber)}</strong>
            </div>
            <button class="payment-copy-button" type="button" data-copy-button data-copy-value="${escapeHtml(payment.accountNumber)}">Copy</button>
          </article>
          <article class="payment-detail-row">
            <div class="payment-detail-copy">
              <span>Chủ tài khoản</span>
              <strong>${escapeHtml(payment.accountName)}</strong>
            </div>
          </article>
          <article class="payment-detail-row payment-detail-row-strong">
            <div class="payment-detail-copy">
              <span>Số tiền</span>
              <strong>${amountLabel}</strong>
            </div>
            <button class="payment-copy-button" type="button" data-copy-button data-copy-value="${payment.amountVnd}">Copy</button>
          </article>
          <article class="payment-detail-row">
            <div class="payment-detail-copy">
              <span>Nội dung chuyển khoản</span>
              <strong>${escapeHtml(payment.paymentCode)}</strong>
            </div>
            <button class="payment-copy-button" type="button" data-copy-button data-copy-value="${escapeHtml(payment.paymentCode)}">Copy</button>
          </article>
        </div>
        <div class="payment-action-row payment-action-row-single">
          <a class="button button-secondary payment-open-qr" href="${qrSrc}" target="_blank" rel="noreferrer">Mở ảnh QR</a>
        </div>
        <div class="checkout-form-note payment-note" data-payment-confirm-state>${
          payment.paymentStatus === 'paid'
            ? 'Thanh toán đã được xác nhận. Bên mình sẽ xử lý đơn và gửi QR qua email.'
            : payment.paymentStatus === 'pending_review'
              ? 'Bên mình đã nhận báo chuyển khoản. Đang đối soát để gửi QR eSIM cho anh.'
              : 'Thanh toán diễn ra trong app ngân hàng sau khi quét QR. Sau khi chuyển khoản, trang sẽ tự cập nhật trạng thái.'
        }</div>
        ${
          payment.paymentStatus === 'paid'
            ? ''
            : `
        <button class="button button-primary payment-wait-button" type="button" data-payment-wait-button>Đã chuyển khoản, chờ xác nhận tự động</button>
        <div class="payment-waiting-card" data-payment-waiting-card>
          <span class="payment-success-loading-spinner payment-waiting-spinner" aria-hidden="true"></span>
          <strong>Đang chờ ngân hàng xác nhận</strong>
          <p data-payment-waiting-text>Hệ thống sẽ kiểm tra giao dịch mới liên tục trong 1-2 phút. Anh giữ nguyên trang này giúp mình.</p>
        </div>`
        }
      </section>
    </div>
  </section>
</main>
<div class="payment-success-loading" data-payment-loading>
  <div class="payment-success-loading-card">
    <span class="payment-success-loading-spinner" aria-hidden="true"></span>
    <strong>Thanh toán thành công</strong>
    <p>Đang lấy QR eSIM thật và chuyển sang trang hoàn tất đơn...</p>
  </div>
</div>
${footer(context)}
`;

  return layout({
    title: `${payment.reference} | Thanh toán eSIM | eSIM CN`,
    description: `Thanh toán đơn ${payment.reference} với số tiền ${amountLabel}. Quét QR hoặc chuyển khoản đúng nội dung để xử lý đơn eSIM.`,
    pathname: buildPaymentPath(payment.reference),
    body,
    bodyClass: 'page-checkout page-payment',
    context,
    robots: 'noindex,nofollow,noarchive',
  });
};

export const renderPaymentSuccessPage = (
  context: RenderContext,
  payment: {
    reference: string;
    accessToken: string;
    paymentCode: string;
    createdAt: string;
    paidAt: string;
    fullName: string;
    email: string;
    phone: string;
    planName: string;
    planMeta: string;
    amountVnd: number;
    quantity: number;
    topUpSupported: boolean;
    provisioningStatus: string | null;
    provisioningError: string | null;
    esims: Array<{
      qrCodeUrl: string;
      shortUrl: string;
      activationCode: string;
      iccid: string;
      apn: string;
      pin: string;
      puk: string;
      smdpStatus: string;
      eid: string;
    }>;
  },
) => {
  const createdLabel = new Date(payment.createdAt).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const paidLabel = new Date(payment.paidAt).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const amountLabel = `${moneyVnd.format(payment.amountVnd)}đ`;
  const expectedEsimCount = Math.max(1, Math.min(99, Math.round(payment.quantity || 1)));
  const esimCount = payment.esims.length;
  const primaryEsim = payment.esims[0] ?? null;
  const hasMultipleEsims = esimCount > 1;
  const singleEsimActionsEnabled = esimCount === 1;
  const isReady = esimCount >= expectedEsimCount && esimCount > 0;
  const conversionEventTag = `
    <script>
      gtag('event', 'conversion', {
        'send_to': ['AW-16954338776/i7SrCLrX2pccENjbupQ_'],
        'value': ${Number.isFinite(payment.amountVnd) ? payment.amountVnd : 0},
        'currency': 'VND',
        'transaction_id': '${escapeHtml(payment.reference)}'
      });
    </script>`;
  const primaryAppleInstallUrl = primaryEsim?.activationCode ? buildAppleEsimInstallUrl(primaryEsim.activationCode) : '';
  const primaryAndroidInstallUrl = primaryEsim?.activationCode ? buildAndroidEsimInstallUrl(primaryEsim.activationCode) : '';
  const heroTitle = isReady
    ? hasMultipleEsims
      ? `${esimCount} QR eSIM Đã Sẵn Sàng`
      : 'QR eSIM Đã Sẵn Sàng'
    : 'Thanh Toán Thành Công';
  const heroCopy = isReady
    ? hasMultipleEsims
      ? `Đơn này có <strong>${esimCount} QR eSIM</strong>. Anh cài lần lượt lên đúng ${esimCount} máy cần dùng.`
      : 'QR eSIM thật đã sẵn sàng. Anh có thể quét QR hoặc mở link cài đặt ngay <span>››</span>'
    : `Thanh toán đã ghi nhận. Hệ thống đang lấy đủ QR eSIM thật${expectedEsimCount > 1 ? ` cho ${expectedEsimCount} máy` : ''} và sẽ tự cập nhật trang này <span>››</span>`;
  const provisioningNote =
    payment.provisioningStatus === 'failed' && payment.provisioningError
      ? payment.provisioningError
      : `Thanh toán đã xong. Hệ thống đang cấp QR eSIM thật${expectedEsimCount > 1 ? ` cho ${expectedEsimCount} máy` : ''}, thường chỉ mất vài giây.`;
  const renderEsimCard = (
    esim: {
      qrCodeUrl: string;
      shortUrl: string;
      activationCode: string;
      iccid: string;
      apn: string;
      pin: string;
      puk: string;
      smdpStatus: string;
      eid: string;
    },
    index: number,
  ) => {
    const activationParts = esim.activationCode ? esim.activationCode.split('$') : [];
    const smdpAddress = activationParts.length >= 3 ? activationParts[1] : esim.activationCode || '';
    const activationToken = activationParts.length >= 3 ? activationParts[2] : esim.activationCode || '';
    const appleInstallUrl = esim.activationCode ? buildAppleEsimInstallUrl(esim.activationCode) : '';
    const androidInstallUrl = esim.activationCode ? buildAndroidEsimInstallUrl(esim.activationCode) : '';
    const cardNumber = index + 1;
    const usePrimaryAutomationHooks = singleEsimActionsEnabled && index === 0;

    return `
        <article class="payment-esim-card">
          <div class="payment-esim-card-head">
            <span class="payment-esim-card-label">${hasMultipleEsims ? `QR ${cardNumber}` : 'QR eSIM'}</span>
            <strong>${hasMultipleEsims ? `Máy ${cardNumber} / ${esimCount}` : 'Cài trực tiếp trên máy'}</strong>
          </div>
          <a class="payment-qr-wrap payment-real-qr-wrap ${usePrimaryAutomationHooks ? 'payment-real-qr-link' : ''}" ${usePrimaryAutomationHooks ? 'data-esim-qr-link' : ''} href="${escapeHtml(
            esim.shortUrl || esim.qrCodeUrl || '#',
          )}" target="_blank" rel="noreferrer">
            <img class="payment-qr-image payment-real-qr-image" src="${escapeHtml(esim.qrCodeUrl || '')}" alt="QR eSIM ${escapeHtml(
              payment.reference,
            )}${hasMultipleEsims ? ` ${cardNumber}` : ''}" />
          </a>
          <div class="payment-meta-grid payment-success-meta-grid">
            <article class="payment-meta-item">
              <span>SM-DP+</span>
              <strong class="payment-demo-code">${escapeHtml(smdpAddress)}</strong>
            </article>
            <article class="payment-meta-item">
              <span>Trạng thái</span>
              <strong>${escapeHtml(esim.smdpStatus || 'READY')}</strong>
            </article>
            <article class="payment-meta-item payment-meta-item-wide">
              <span>Mã kích hoạt</span>
              <strong class="payment-demo-code">${escapeHtml(activationToken)}</strong>
            </article>
            <article class="payment-meta-item payment-meta-item-wide">
              <span>ICCID</span>
              <strong class="payment-demo-code">${escapeHtml(esim.iccid || '')}</strong>
            </article>
            ${
              payment.phone
                ? `<article class="payment-meta-item">
              <span>Số điện thoại</span>
              <strong>${escapeHtml(payment.phone)}</strong>
            </article>`
                : ''
            }
            <article class="payment-meta-item">
              <span>APN</span>
              <strong>${escapeHtml(esim.apn || 'Tự động')}</strong>
            </article>
            <article class="payment-meta-item">
              <span>Mã PIN / PUK cài đặt</span>
              <strong>${escapeHtml(esim.pin || '-')} / ${escapeHtml(esim.puk || '-')}</strong>
            </article>
            ${
              esim.eid
                ? `<article class="payment-meta-item payment-meta-item-wide"><span>EID</span><strong class="payment-demo-code">${escapeHtml(
                    esim.eid,
                  )}</strong></article>`
                : ''
            }
          </div>
          <div class="payment-action-row payment-action-row-dual">
            <a class="button ${usePrimaryAutomationHooks ? 'button-primary' : 'button-secondary'} payment-open-qr" ${usePrimaryAutomationHooks ? 'data-esim-install-button="ios"' : ''} href="${escapeHtml(
              appleInstallUrl || (esim.shortUrl ?? '#'),
            )}" target="_blank" rel="noreferrer">Cài trên iPhone</a>
            <a class="button button-secondary payment-open-qr" ${usePrimaryAutomationHooks ? 'data-esim-install-button="android"' : ''} href="${escapeHtml(
              androidInstallUrl || (esim.shortUrl ?? '#'),
            )}" target="_blank" rel="noreferrer">Cài trên Android</a>
          </div>
          <div class="payment-action-row payment-action-row-single">
            <a class="button button-secondary payment-open-qr" href="${escapeHtml(
              esim.qrCodeUrl ?? esim.shortUrl ?? '#',
            )}" target="_blank" rel="noreferrer">Mở ảnh QR</a>
          </div>
          <details class="payment-mobile-details">
            <summary>${hasMultipleEsims ? `Thông tin QR ${cardNumber}` : 'Xem thông tin cài đặt'}</summary>
            <div class="payment-mobile-details-body">
              <div class="payment-mobile-details-row">
                <span>SM-DP+</span>
                <strong class="payment-demo-code">${escapeHtml(smdpAddress)}</strong>
              </div>
              <div class="payment-mobile-details-row">
                <span>Trạng thái</span>
                <strong>${escapeHtml(esim.smdpStatus || 'READY')}</strong>
              </div>
              <div class="payment-mobile-details-row">
                <span>Mã kích hoạt</span>
                <strong class="payment-demo-code">${escapeHtml(activationToken)}</strong>
              </div>
              <div class="payment-mobile-details-row">
                <span>ICCID</span>
                <strong class="payment-demo-code">${escapeHtml(esim.iccid || '')}</strong>
              </div>
              ${
                payment.phone
                  ? `<div class="payment-mobile-details-row">
                <span>Số điện thoại</span>
                <strong>${escapeHtml(payment.phone)}</strong>
              </div>`
                  : ''
              }
              <div class="payment-mobile-details-row">
                <span>APN</span>
                <strong>${escapeHtml(esim.apn || 'Tự động')}</strong>
              </div>
              <div class="payment-mobile-details-row">
                <span>Mã PIN / PUK</span>
                <strong>${escapeHtml(esim.pin || '-')} / ${escapeHtml(esim.puk || '-')}</strong>
              </div>
              ${
                esim.eid
                  ? `<div class="payment-mobile-details-row">
                <span>EID</span>
                <strong class="payment-demo-code">${escapeHtml(esim.eid)}</strong>
              </div>`
                  : ''
              }
            </div>
          </details>
        </article>`;
  };
  const body = `
${header(context, { ctaHref: '/', ctaLabel: 'Về trang chủ' })}
<section class="checkout-mobile-top">
  <div class="wrap">
    <div class="mobile-app-nav">
      ${renderMobileBrandLink(context)}
      <a class="checkout-mobile-back" href="/">Về trang chủ</a>
    </div>
    <section class="mobile-app-offer-head checkout-mobile-head">
      <h2>${heroTitle}</h2>
      <p>${heroCopy}</p>
    </section>
  </div>
</section>
<main class="checkout-page payment-page payment-success-page">
  <section class="section checkout-section">
    <div class="wrap checkout-grid">
      <aside class="checkout-summary-card reveal">
        <div class="checkout-summary-head">
          <span class="checkout-summary-kicker">Đơn đã thanh toán</span>
          <strong>${escapeHtml(payment.reference)}</strong>
        </div>
        <div class="checkout-summary-selected">
          <b>${escapeHtml(payment.planName)}</b>
          <p>${escapeHtml(payment.planMeta)} · ${expectedEsimCount} eSIM</p>
        </div>
        <div class="checkout-stat-grid">
          <article class="checkout-stat">
            <span>Tổng tiền</span>
            <strong>${amountLabel}</strong>
          </article>
          <article class="checkout-stat">
            <span>Số eSIM</span>
            <strong>${moneyVnd.format(expectedEsimCount)}</strong>
          </article>
          <article class="checkout-stat">
            <span>Thanh toán lúc</span>
            <strong>${escapeHtml(paidLabel)}</strong>
          </article>
        </div>
        <div class="checkout-summary-selected">
          <b>${escapeHtml(payment.fullName)}</b>
          ${payment.phone ? `<p>Số điện thoại: ${escapeHtml(payment.phone)}</p>` : ''}
          <p>Email: ${escapeHtml(payment.email)}</p>
        </div>
        <div class="checkout-perk-list">
          <span>Tạo lúc ${escapeHtml(createdLabel)}</span>
          <span>Nội dung chuyển khoản đã dùng: <strong>${escapeHtml(payment.paymentCode)}</strong>.</span>
          <span>${isReady ? (hasMultipleEsims ? `Đã cấp đủ ${esimCount} QR eSIM và lưu chung trong đơn này.` : 'QR eSIM thật đã sẵn sàng và được lưu trong đơn này.') : escapeHtml(provisioningNote)}</span>
          ${isReady ? (hasMultipleEsims ? '<span>Mỗi QR tương ứng một eSIM riêng. Anh cài lần lượt lên đúng từng máy cần dùng.</span>' : '<span>Nếu chưa muốn cài ngay, anh có thể mở lại trang này hoặc email QR để lấy lại thông tin sau.</span>') : '<span>Nếu chờ quá lâu, tải lại trang một lần hoặc kiểm tra email vì QR thật sẽ được gửi ngay khi sẵn sàng.</span>'}
        </div>
      </aside>

      <section class="checkout-form-card payment-qr-card payment-success-card reveal">
        <div data-esim-reference="${escapeHtml(payment.reference)}" data-esim-token="${escapeHtml(payment.accessToken)}" data-esim-ready="${isReady ? 'true' : 'false'}" data-esim-topup-enabled="${singleEsimActionsEnabled && payment.topUpSupported ? 'true' : 'false'}" data-esim-ios-url="${escapeHtml(
          primaryAppleInstallUrl,
        )}" data-esim-android-url="${escapeHtml(primaryAndroidInstallUrl)}" data-esim-qr-url="${escapeHtml(primaryEsim?.qrCodeUrl ?? '')}" hidden></div>
        <div class="payment-success-banner">
          <span class="payment-success-badge">${isReady ? (hasMultipleEsims ? `Đã cấp ${esimCount}/${expectedEsimCount} eSIM` : 'Đã cấp eSIM thật') : 'Đang cấp eSIM thật'}</span>
          <strong>${isReady ? (hasMultipleEsims ? `Đủ ${esimCount} QR cài đặt` : 'QR eSIM thật') : 'Đang chuẩn bị QR eSIM'}</strong>
          <p>${isReady ? (hasMultipleEsims ? `Đơn này có ${esimCount} QR riêng. Anh cài lần lượt từng QR lên đúng ${esimCount} thiết bị cần dùng.` : 'Quét QR hoặc mở link cài đặt bên dưới để cài trực tiếp lên máy.') : escapeHtml(provisioningNote)}</p>
        </div>
        ${
          isReady
            ? `
        <div class="payment-esim-list">
          ${payment.esims.map((esim, index) => renderEsimCard(esim, index)).join('')}
        </div>
        <div class="checkout-form-note payment-note payment-demo-note">
          ${
            hasMultipleEsims
              ? `Đơn này có ${esimCount} eSIM riêng. Mỗi QR tương ứng một máy. Nếu cần cài cùng lúc, anh mở từng QR theo đúng thứ tự.`
              : 'Nếu đang mở đúng trên điện thoại hỗ trợ eSIM, hệ thống sẽ tự ưu tiên đúng link cài đặt theo máy. Nếu cần, anh vẫn có thể mở ảnh QR để cài thủ công.'
          }
        </div>`
            : `
        <div class="payment-provisioning-card">
          <span class="payment-success-loading-spinner payment-provisioning-spinner" aria-hidden="true"></span>
          <strong>Đang cấp QR eSIM thật</strong>
          <p data-esim-status-note>${escapeHtml(provisioningNote)}</p>
        </div>
        <div class="checkout-form-note payment-note payment-demo-note">
          Trang này sẽ tự cập nhật ngay khi QR eSIM sẵn sàng. Anh không cần tạo lại đơn.
        </div>`
        }
        ${
          isReady && singleEsimActionsEnabled
            ? `
        <div class="payment-action-row ${payment.topUpSupported ? 'payment-action-row-dual' : 'payment-action-row-single'}">
          <button class="button button-secondary payment-open-qr" type="button" data-esim-usage-button>Kiểm tra dung lượng</button>
          ${payment.topUpSupported ? '<button class="button button-secondary payment-open-qr" type="button" data-esim-topup-button>Xem gói nạp thêm</button>' : ''}
        </div>
        <section class="payment-addon-card" data-esim-usage-card hidden>
          <div class="payment-addon-head">
            <strong>Dung lượng hiện tại</strong>
            <span>Cập nhật trực tiếp từ hệ thống</span>
          </div>
          <div data-esim-usage-body></div>
        </section>
        ${
          payment.topUpSupported
            ? `<section class="payment-addon-card" data-esim-topup-card hidden>
          <div class="payment-addon-head">
            <strong>Danh sách dung lượng có thể mua thêm</strong>
            <span>Mua thêm data cho chính eSIM đang dùng</span>
          </div>
          <div data-esim-topup-body></div>
        </section>`
            : ''
        }`
            : ''
        }
      </section>
    </div>
  </section>
</main>
${footer(context)}
`;

  return layout({
    title: `${payment.reference} | Thanh toán thành công | eSIM CN`,
    description: isReady
      ? `Đơn ${payment.reference} đã thanh toán thành công và ${hasMultipleEsims ? `${esimCount} QR eSIM` : 'QR eSIM thật'} đã sẵn sàng.`
      : `Đơn ${payment.reference} đã thanh toán thành công và đang chờ QR eSIM thật được cấp.`,
    pathname: buildPaymentSuccessPath(payment.reference),
    body,
    bodyClass: 'page-checkout page-payment page-payment-success',
    context,
    robots: 'noindex,nofollow,noarchive',
    headScripts: conversionEventTag,
  });
};

export const renderAdminLoginPage = (context: RenderContext, options: AdminLoginPageOptions) => {
  const body = `
<main class="admin-login-main">
  <section class="admin-login-shell">
    <div class="admin-login-card">
      <div class="admin-login-copy">
        <span class="section-kicker">Admin eSIM CN</span>
        <h1>Đăng nhập để sửa giá bán</h1>
        <p>Đăng nhập để set giá override cho từng gói live.</p>
      </div>
      ${adminFlash(options.flash)}
      ${
        options.enabled
          ? `<form class="admin-login-form" action="/admin/login" method="post">
        <input type="hidden" name="csrfToken" value="${escapeHtml(options.csrfToken)}" />
        <label>
          Tài khoản
          <input type="text" name="username" value="${escapeHtml(options.username)}" autocomplete="username" required />
        </label>
        <label>
          Mật khẩu
          <input type="password" name="password" autocomplete="current-password" required />
        </label>
        <button class="button button-primary" type="submit">Vào admin</button>
      </form>`
          : `<div class="admin-login-disabled">
        <strong>Admin chưa bật</strong>
        <p>Cần cấu hình <code>ADMIN_PASSWORD</code> trên worker. Có thể thêm <code>ADMIN_USERNAME</code> nếu muốn đổi tên đăng nhập mặc định.</p>
      </div>`
      }
      <div class="admin-login-links">
        <a href="/">Trang chủ</a>
        <a href="/?noi-bo=1">Bảng nội bộ</a>
        <a href="/api/plans">API plans</a>
      </div>
    </div>
  </section>
</main>
`;

  return layout({
    title: 'Đăng nhập admin | eSIM CN',
    description: 'Đăng nhập trang admin để sửa giá bán eSIM.',
    pathname: '/admin/login',
    body,
    bodyClass: 'page-admin page-admin-login',
    context,
    robots: 'noindex,nofollow,noarchive',
  });
};

export const renderAdminDashboardPage = (context: RenderContext, dashboard: AdminDashboardPageData) => {
  const siteAssetAccept = 'image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml,image/x-icon,.ico';
  const renderAssetThumb = (value: string, emptyLabel: string, alt: string) =>
    value
      ? `<img src="${escapeHtml(value)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />`
      : `<span>${escapeHtml(emptyLabel)}</span>`;
  const renderAssetField = ({
    name,
    label,
    value,
    placeholder,
    help,
    wide = false,
    emptyLabel,
  }: {
    name: keyof AdminSiteSettings;
    label: string;
    value: string;
    placeholder: string;
    help: string;
    wide?: boolean;
    emptyLabel: string;
  }) => `
    <label class="admin-settings-field${wide ? ' admin-settings-field-wide' : ''}">
      <span>${escapeHtml(label)}</span>
      <input
        type="text"
        name="${escapeHtml(name)}"
        maxlength="1000"
        value="${escapeHtml(value)}"
        placeholder="${escapeHtml(placeholder)}"
        data-site-asset-url-input="${escapeHtml(name)}"
      />
      <div class="admin-settings-asset-tools">
        <div class="admin-settings-asset-thumb" data-site-asset-thumb="${escapeHtml(name)}">
          ${renderAssetThumb(value, emptyLabel, `${label} preview`)}
        </div>
        <div class="admin-settings-asset-actions">
          <label class="button button-secondary admin-settings-upload-button${dashboard.assetUploadEnabled ? '' : ' is-disabled'}">
            <input
              type="file"
              accept="${siteAssetAccept}"
              data-site-asset-input="${escapeHtml(name)}"
              ${dashboard.assetUploadEnabled ? '' : 'disabled'}
            />
            Tải ảnh lên Cloudflare
          </label>
          <button class="button button-secondary" type="button" data-site-asset-clear="${escapeHtml(name)}">Xóa URL</button>
          <small data-site-asset-status="${escapeHtml(name)}">${
            dashboard.assetUploadMode === 'r2'
              ? `Chọn file để upload lên Cloudflare R2. Ảnh/GIF có thể lớn tới khoảng ${escapeHtml(dashboard.assetUploadLimitLabel)}. URL sẽ tự điền vào ô này.`
              : dashboard.assetUploadMode === 'd1'
                ? `Chọn file để upload lên Cloudflare. Hiện đang dùng D1 nên file cần nhỏ hơn khoảng ${escapeHtml(dashboard.assetUploadLimitLabel)}. GIF lớn nên dán URL ngoài hoặc bật R2.`
                : 'Upload ảnh đang tắt vì worker chưa bật lưu ảnh trên Cloudflare.'
          }</small>
        </div>
      </div>
      <small>${escapeHtml(help)}</small>
    </label>`;
  const renderAssetGalleryField = ({
    name,
    label,
    value,
    placeholder,
    help,
    emptyLabel,
  }: {
    name: keyof AdminSiteSettings;
    label: string;
    value: string;
    placeholder: string;
    help: string;
    emptyLabel: string;
  }) => `
    <label class="admin-settings-field admin-settings-field-wide">
      <span>${escapeHtml(label)}</span>
      <textarea
        name="${escapeHtml(name)}"
        rows="4"
        maxlength="4000"
        placeholder="${escapeHtml(placeholder)}"
        data-site-asset-url-input="${escapeHtml(name)}"
        data-site-asset-list-input
      >${escapeHtml(value)}</textarea>
      <div class="admin-settings-asset-tools admin-settings-asset-tools-gallery">
        <div class="admin-settings-asset-thumb admin-settings-asset-thumb-gallery" data-site-asset-thumb="${escapeHtml(name)}">
          ${renderAssetThumb(parseAssetUrlList(value)[0] ?? '', emptyLabel, `${label} preview`)}
        </div>
        <div class="admin-settings-asset-actions">
          <label class="button button-secondary admin-settings-upload-button${dashboard.assetUploadEnabled ? '' : ' is-disabled'}">
            <input
              type="file"
              accept="${siteAssetAccept}"
              data-site-asset-input="${escapeHtml(name)}"
              data-site-asset-multiple="append"
              multiple
              ${dashboard.assetUploadEnabled ? '' : 'disabled'}
            />
            Tải nhiều ảnh lên Cloudflare
          </label>
          <button class="button button-secondary" type="button" data-site-asset-clear="${escapeHtml(name)}">Xóa danh sách</button>
          <small data-site-asset-status="${escapeHtml(name)}">${
            dashboard.assetUploadMode === 'r2'
              ? `Chọn nhiều ảnh để upload lên Cloudflare R2. Mỗi ảnh/GIF tối đa khoảng ${escapeHtml(dashboard.assetUploadLimitLabel)}.`
              : dashboard.assetUploadMode === 'd1'
                ? `Chọn nhiều ảnh để upload lên Cloudflare. Hiện đang dùng D1 nên mỗi file cần nhỏ hơn khoảng ${escapeHtml(dashboard.assetUploadLimitLabel)}.`
                : 'Upload ảnh đang tắt vì worker chưa bật lưu ảnh trên Cloudflare.'
          }</small>
        </div>
      </div>
      <small>${escapeHtml(help)}</small>
    </label>`;
  const siteSettingsForm = `
    <form class="admin-settings-form admin-surface" action="/admin/site-settings" method="post" data-site-settings-form>
      <input type="hidden" name="csrfToken" value="${escapeHtml(dashboard.csrfToken)}" />
      <div class="admin-surface-head">
        <div>
          <span class="section-kicker">Site Settings</span>
          <h2>Logo, hero và SEO cơ bản</h2>
          <p>Những field này chỉ đổi phần public-facing của website, không đụng vào config thanh toán hay email vận hành.</p>
        </div>
        <button class="button button-primary" type="submit">Lưu Site Settings</button>
      </div>
      <div class="admin-settings-grid">
        <label class="admin-settings-field">
          <span>Tên thương hiệu</span>
          <input type="text" name="siteName" maxlength="120" value="${escapeHtml(dashboard.siteSettings.siteName)}" required data-site-settings-preview-source="siteName" />
        </label>
        <label class="admin-settings-field">
          <span>Email hiển thị</span>
          <input type="email" name="supportEmail" maxlength="160" value="${escapeHtml(dashboard.siteSettings.supportEmail)}" required />
        </label>
        ${renderAssetField({
          name: 'logoUrl',
          label: 'Logo URL',
          value: dashboard.siteSettings.logoUrl,
          placeholder: 'https://... hoặc /site-assets/...',
          help: 'Để trống nếu muốn dùng logo chữ hiện tại.',
          emptyLabel: 'Logo',
        })}
        ${renderAssetField({
          name: 'faviconUrl',
          label: 'Favicon URL',
          value: dashboard.siteSettings.faviconUrl,
          placeholder: 'https://... hoặc /site-assets/...',
          help: 'Để trống nếu vẫn dùng favicon mặc định.',
          emptyLabel: 'Favicon',
        })}
        <label class="admin-settings-field admin-settings-field-wide">
          <span>Hero title</span>
          <input type="text" name="homeHeroTitle" maxlength="180" value="${escapeHtml(dashboard.siteSettings.homeHeroTitle)}" required data-site-settings-preview-source="homeHeroTitle" />
        </label>
        <label class="admin-settings-field admin-settings-field-wide">
          <span>Hero description</span>
          <textarea name="homeHeroDescription" rows="3" maxlength="400" required data-site-settings-preview-source="homeHeroDescription">${escapeHtml(dashboard.siteSettings.homeHeroDescription)}</textarea>
        </label>
        ${renderAssetField({
          name: 'homeHeroBannerUrl',
          label: 'Hero banner image URL',
          value: dashboard.siteSettings.homeHeroBannerUrl,
          placeholder: 'https://... hoặc /site-assets/...',
          help: 'Ảnh chính, vẫn dùng nếu chưa thêm gallery bên dưới.',
          emptyLabel: 'Hero banner',
          wide: true,
        })}
        ${renderAssetGalleryField({
          name: 'homeHeroBannerGalleryUrls',
          label: 'Hero banner gallery URLs',
          value: dashboard.siteSettings.homeHeroBannerGalleryUrls,
          placeholder: 'Mỗi dòng một URL ảnh. Có thể upload nhiều ảnh cùng lúc.',
          help: 'Nếu có từ 2 ảnh trở lên, homepage sẽ tự chạy carousel nhẹ trên cả desktop và mobile.',
          emptyLabel: 'Hero gallery',
        })}
        <label class="admin-settings-field admin-settings-field-wide">
          <span>Footer description</span>
          <textarea name="footerDescription" rows="3" maxlength="260" required data-site-settings-preview-source="footerDescription">${escapeHtml(dashboard.siteSettings.footerDescription)}</textarea>
        </label>
        <label class="admin-settings-field admin-settings-field-wide">
          <span>Homepage SEO title</span>
          <input type="text" name="homeMetaTitle" maxlength="180" value="${escapeHtml(dashboard.siteSettings.homeMetaTitle)}" required data-site-settings-preview-source="homeMetaTitle" />
        </label>
        <label class="admin-settings-field admin-settings-field-wide">
          <span>Homepage meta description</span>
          <textarea name="homeMetaDescription" rows="3" maxlength="320" required data-site-settings-preview-source="homeMetaDescription">${escapeHtml(dashboard.siteSettings.homeMetaDescription)}</textarea>
        </label>
        ${renderAssetField({
          name: 'socialImageUrl',
          label: 'Social image URL',
          value: dashboard.siteSettings.socialImageUrl,
          placeholder: 'https://... hoặc /site-assets/...',
          help: 'Dùng cho og:image và twitter:image. Để trống sẽ dùng ảnh mặc định hiện tại.',
          emptyLabel: 'Social image',
          wide: true,
        })}
      </div>
    </form>
    <aside class="admin-surface admin-settings-preview">
      <div class="admin-surface-head">
        <div>
          <span class="section-kicker">Preview</span>
          <h2>Nhìn nhanh phần public</h2>
          <p>Check nhanh text và asset trước khi ra ngoài site live.</p>
        </div>
      </div>
      <div class="admin-settings-preview-card">
        <div data-site-settings-preview-logo>
          ${
            dashboard.siteSettings.logoUrl
              ? `<img class="admin-settings-logo" src="${escapeHtml(dashboard.siteSettings.logoUrl)}" alt="${escapeHtml(dashboard.siteSettings.siteName)}" />`
              : '<span class="admin-settings-logo-fallback">e</span>'
          }
        </div>
        <div class="admin-settings-preview-copy">
          <strong data-site-settings-preview-text="siteName">${escapeHtml(dashboard.siteSettings.siteName)}</strong>
          <p data-site-settings-preview-text="homeHeroTitle">${escapeHtml(dashboard.siteSettings.homeHeroTitle)}</p>
          <small data-site-settings-preview-text="homeHeroDescription">${escapeHtml(dashboard.siteSettings.homeHeroDescription)}</small>
        </div>
      </div>
      <div class="admin-settings-preview-meta">
        <span>Footer</span>
        <strong data-site-settings-preview-text="footerDescription">${escapeHtml(dashboard.siteSettings.footerDescription)}</strong>
      </div>
      <div class="admin-settings-preview-meta">
        <span>SEO title</span>
        <strong data-site-settings-preview-text="homeMetaTitle">${escapeHtml(dashboard.siteSettings.homeMetaTitle)}</strong>
      </div>
      <div class="admin-settings-preview-meta">
        <span>Meta description</span>
        <strong data-site-settings-preview-text="homeMetaDescription">${escapeHtml(dashboard.siteSettings.homeMetaDescription)}</strong>
      </div>
    </aside>`;
  const summaryCards = [
    { label: 'Nguồn catalog', value: dashboard.catalogSourceLabel, tone: 'muted' },
    { label: 'Gói đang bán', value: `${moneyVnd.format(dashboard.totalPlans)}`, tone: 'neutral' },
    { label: 'Override đang bật', value: `${moneyVnd.format(dashboard.overrideCount)}`, tone: dashboard.overrideCount > 0 ? 'accent' : 'neutral' },
    { label: 'Đơn đã thanh toán', value: `${moneyVnd.format(dashboard.paidOrderCount)}`, tone: 'neutral' },
    { label: 'Đơn chờ xử lý', value: `${moneyVnd.format(dashboard.pendingOrderCount)}`, tone: dashboard.pendingOrderCount > 0 ? 'warning' : 'neutral' },
  ];
  const bulkScopeOptions = [
    { key: 'all', label: 'Toàn bộ gói đang bán' },
    { key: 'daily', label: 'Theo ngày' },
    { key: 'package', label: 'Trọn gói' },
  ];
  const bulkScopeMap = new Map(bulkScopeOptions.map((option) => [option.key, option.label]));
  const renderBulkForm = ({
    scope,
    returnTo,
    compact = false,
    title,
    description,
    buttonLabel,
    showScopeSelect = false,
  }: {
    scope: string;
    returnTo: string;
    compact?: boolean;
    title: string;
    description?: string;
    buttonLabel: string;
    showScopeSelect?: boolean;
  }) => {
    const safeScope = bulkScopeMap.has(scope) ? scope : 'all';
    const formClasses = ['admin-bulk-form'];
    if (compact) {
      formClasses.push('admin-bulk-form-compact');
    }

    return `
      <form class="${formClasses.join(' ')}" action="/admin/pricing/bulk" method="post" data-bulk-percent-control style="--bulk-progress: ${(dashboard.bulkPercent / 500) * 100}%">
        <input type="hidden" name="csrfToken" value="${escapeHtml(dashboard.csrfToken)}" />
        <input type="hidden" name="returnTo" value="${escapeHtml(returnTo)}" />
        ${showScopeSelect ? '' : `<input type="hidden" name="scope" value="${escapeHtml(safeScope)}" />`}
        <div class="admin-bulk-copy">
          <strong>${escapeHtml(title)}</strong>
          ${description ? `<span>${escapeHtml(description)}</span>` : ''}
        </div>
        ${
          showScopeSelect
            ? `
          <label class="admin-bulk-field admin-bulk-field-scope">
            <span>Phạm vi</span>
            <select name="scope">
              ${bulkScopeOptions
                .map((option) => `<option value="${option.key}"${safeScope === option.key ? ' selected' : ''}>${option.label}</option>`)
                .join('')}
            </select>
          </label>`
            : ''
        }
        <label class="admin-bulk-field admin-bulk-field-slider">
          <span>Mức tăng</span>
          <div class="admin-bulk-slider-row">
            <input type="range" min="0" max="500" step="1" value="${dashboard.bulkPercent}" data-bulk-percent-range />
            <strong class="admin-bulk-percent-chip" data-bulk-percent-display>+${dashboard.bulkPercent}%</strong>
          </div>
        </label>
        <label class="admin-bulk-field admin-bulk-field-number">
          <span>%</span>
          <input type="number" name="percent" inputmode="numeric" min="0" max="500" step="1" value="${dashboard.bulkPercent}" data-bulk-percent-input required />
        </label>
        <button class="button button-secondary" type="submit">${escapeHtml(buttonLabel)}</button>
      </form>`;
  };
  const pricingGroupsMarkup = dashboard.plansByGroup
    .map((group, groupIndex) => {
      const safeGroupId = escapeHtml(group.key);
      const groupBulkMarkup =
        group.key === 'daily' || group.key === 'package'
          ? renderBulkForm({
              scope: group.key,
              returnTo: `#group-${group.key}`,
              compact: true,
              title: `Set nhanh ${group.label}`,
              description: 'Áp riêng cho nhóm này theo giá gốc catalog.',
              buttonLabel: 'Áp nhóm này',
            })
          : '';

      return `
        <details class="admin-group-shell admin-surface" id="group-${safeGroupId}" data-admin-group-shell${groupIndex < 2 ? ' open' : ''}>
          <summary class="admin-group-summary">
            <div class="admin-group-summary-copy">
              <span class="section-kicker">${escapeHtml(group.label)}</span>
              <strong>${escapeHtml(group.label)}</strong>
              <p>${escapeHtml(group.note)}</p>
            </div>
            <div class="admin-group-summary-meta">
              <span><strong data-admin-group-visible-count>${group.items.length}</strong> / ${group.items.length} gói</span>
              <span>Chạm để ${groupIndex < 2 ? 'thu gọn' : 'mở nhóm'}</span>
            </div>
          </summary>
          <div class="admin-group-body">
            <div class="admin-surface-head">
              <div>
                <span class="section-kicker">Pricing</span>
                <h2>${escapeHtml(group.label)}</h2>
                <p>${escapeHtml(group.note)}</p>
              </div>
              <div class="admin-surface-actions">
                <strong>${moneyVnd.format(group.items.length)} gói</strong>
                ${groupBulkMarkup}
              </div>
            </div>
            <div class="admin-table-wrap">
              <table class="admin-pricing-table">
                <thead>
                  <tr>
                    <th>Gói</th>
                    <th class="is-number">Giá gốc</th>
                    <th class="is-number">Giá đang bán</th>
                    <th class="is-number">Override</th>
                    <th class="is-number">Lãi</th>
                    <th class="is-number">Biên</th>
                    <th>Giá mới</th>
                    <th>Ghi chú</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  ${group.items
                    .map(
                      (item) => `
                    <tr
                      id="plan-${escapeHtml(item.slug)}"
                      data-admin-plan-row
                      data-plan-query="${escapeHtml([item.slug, item.name, item.meta, item.packageCode ?? '', item.note ?? ''].join(' '))}"
                    >
                      <td class="admin-cell-plan">
                        <strong>${escapeHtml(item.name)}</strong>
                        <span>${escapeHtml(item.meta)}</span>
                        <small>${escapeHtml(item.pricingModeLabel)} · ${escapeHtml(item.sourceLabel)} · ${escapeHtml(item.packageCode ?? 'Chưa có package')}</small>
                        ${item.variantLabel ? `<em class="admin-plan-variant-note">${escapeHtml(item.variantLabel)}</em>` : ''}
                      </td>
                      <td class="admin-cell-number">${formatVndAmount(item.sourcePriceVnd)}</td>
                      <td class="admin-cell-number">${formatVndAmount(item.effectivePriceVnd)}</td>
                      <td class="admin-cell-number">${item.overridePriceVnd === null ? 'Giá gốc' : formatVndAmount(item.overridePriceVnd)}</td>
                      <td class="admin-cell-number">${formatVndAmount(item.marginVnd)}</td>
                      <td class="admin-cell-number">${item.marginPct.toFixed(1)}%</td>
                      <td class="admin-cell-input">
                        <form id="pricing-form-${escapeHtml(item.slug)}" class="admin-row-form" action="/admin/pricing" method="post">
                          <input type="hidden" name="csrfToken" value="${escapeHtml(dashboard.csrfToken)}" />
                          <input type="hidden" name="slug" value="${escapeHtml(item.slug)}" />
                          <input type="hidden" name="returnTo" value="#plan-${escapeHtml(item.slug)}" />
                        </form>
                        <input form="pricing-form-${escapeHtml(item.slug)}" type="number" name="overridePriceVnd" inputmode="numeric" min="1000" step="1000" value="${item.overridePriceVnd ?? item.effectivePriceVnd}" required />
                      </td>
                      <td class="admin-cell-note">
                        <input form="pricing-form-${escapeHtml(item.slug)}" type="text" name="note" value="${escapeHtml(item.note ?? '')}" placeholder="ghi chú nội bộ" />
                        <small>${escapeHtml(item.updatedAtLabel ?? 'Chưa override')}</small>
                      </td>
                      <td class="admin-cell-actions">
                        <div class="admin-action-stack">
                          <button class="button button-primary" form="pricing-form-${escapeHtml(item.slug)}" type="submit" name="intent" value="save">Lưu</button>
                          <button class="button button-secondary" form="pricing-form-${escapeHtml(item.slug)}" type="submit" name="intent" value="clear">Xóa</button>
                          <a href="${escapeHtml(item.detailHref)}" target="_blank" rel="noreferrer">Xem</a>
                        </div>
                      </td>
                    </tr>`,
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
          </div>
        </details>`;
    })
    .join('');

  const pendingManualCount = dashboard.orders.filter((item) => item.paymentStatus !== 'paid').length;
  const matchedWebhookCount = dashboard.webhookEvents.filter((item) => Boolean(item.matchedReference)).length;
  const unresolvedWebhookCount = Math.max(0, dashboard.webhookEvents.length - matchedWebhookCount);
  const repeatCustomerCount = dashboard.customers.filter((item) => item.statusLabel !== 'Khách mới').length;
  const topCustomer = dashboard.customers[0] ?? null;
  const latestOrder = dashboard.orders[0] ?? null;
  const revenueWindow = dashboard.performanceCards[dashboard.performanceCards.length - 1] ?? null;

  const body = `
<main class="admin-main">
  <div class="wrap admin-shell-grid">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-brand">
        <span class="admin-sidebar-kicker">eSIM CN Control</span>
        <strong>Admin Console</strong>
        <p>Quản lý khách hàng, thanh toán và giá bán trong một màn hình.</p>
      </div>

      <nav class="admin-sidebar-nav" aria-label="Điều hướng admin">
        <a href="#overview" data-admin-tab-trigger="overview">Overview <span>01</span></a>
        <a href="#crm" data-admin-tab-trigger="crm">CRM <span>${moneyVnd.format(dashboard.customers.length)}</span></a>
        <a href="#orders" data-admin-tab-trigger="orders">Orders <span>${moneyVnd.format(dashboard.orders.length)}</span></a>
        <a href="#payments" data-admin-tab-trigger="payments">Payments <span>${moneyVnd.format(dashboard.webhookEvents.length)}</span></a>
        <a href="#settings" data-admin-tab-trigger="settings">Settings <span>CMS</span></a>
        <a href="#pricing" data-admin-tab-trigger="pricing">Pricing <span>${moneyVnd.format(dashboard.totalPlans)}</span></a>
        ${dashboard.plansByGroup
          .map(
            (group) =>
              `<a href="#group-${escapeHtml(group.key)}" data-admin-tab-trigger="pricing">${escapeHtml(group.label)} <span>${moneyVnd.format(group.items.length)}</span></a>`,
          )
          .join('')}
      </nav>

      <div class="admin-sidebar-stack">
        <article class="admin-sidebar-mini">
          <span>Tài khoản</span>
          <strong>${escapeHtml(dashboard.username)}</strong>
          <small>Phiên admin đang hoạt động</small>
        </article>
        <article class="admin-sidebar-mini">
          <span>Nguồn giá gốc</span>
          <strong>${escapeHtml(dashboard.catalogSourceLabel)}</strong>
          <small>Dùng để tính giá override</small>
        </article>
      </div>

      <div class="admin-sidebar-links">
        <a href="${dashboard.previewHref}" target="_blank" rel="noreferrer">Bảng nội bộ</a>
        <a href="${dashboard.apiHref}" target="_blank" rel="noreferrer">API plans</a>
        <a href="/" target="_blank" rel="noreferrer">Site live</a>
      </div>
    </aside>

    <section class="admin-workspace">
      <header class="admin-appbar" id="overview">
        <div class="admin-appbar-copy">
          <span class="section-kicker">Operations CMS</span>
          <h1>Dashboard vận hành eSIM CN</h1>
          <p>Tách riêng overview, khách hàng, đơn hàng, thanh toán và bảng giá để chỉnh nhanh hơn.</p>
        </div>
        <div class="admin-appbar-actions">
          <a class="button button-secondary" href="#crm" data-admin-tab-trigger="crm">Mở CRM</a>
          <a class="button button-secondary" href="#pricing" data-admin-tab-trigger="pricing">Mở pricing</a>
          <a class="button button-secondary" href="${dashboard.previewHref}" target="_blank" rel="noreferrer">Bảng nội bộ</a>
          <form action="/admin/logout" method="post">
            <input type="hidden" name="csrfToken" value="${escapeHtml(dashboard.csrfToken)}" />
            <button class="button button-primary" type="submit">Đăng xuất</button>
          </form>
        </div>
      </header>

      ${adminFlash(dashboard.flash)}

      <section class="admin-tab-strip" aria-label="Chuyển tab admin">
        <a class="admin-tab-chip is-active" href="#overview" data-admin-tab-trigger="overview">Overview</a>
        <a class="admin-tab-chip" href="#crm" data-admin-tab-trigger="crm">CRM</a>
        <a class="admin-tab-chip" href="#orders" data-admin-tab-trigger="orders">Orders</a>
        <a class="admin-tab-chip" href="#payments" data-admin-tab-trigger="payments">Payments</a>
        <a class="admin-tab-chip" href="#settings" data-admin-tab-trigger="settings">Settings</a>
        <a class="admin-tab-chip" href="#pricing" data-admin-tab-trigger="pricing">Pricing</a>
      </section>

      <section class="admin-tab-panel is-active" id="overview" data-admin-tab-panel="overview">
        <section class="admin-overview-grid">
        <section class="admin-surface admin-hero-panel">
          <div class="admin-hero-panel-head">
            <div>
              <span class="section-kicker">Overview</span>
              <h2>Toàn cảnh vận hành hôm nay</h2>
              <p>Card lớn để nhìn hệ thống trong 10 giây đầu: nguồn data, tình trạng bán hàng, số đơn pending và tình trạng override giá.</p>
            </div>
            <div class="admin-hero-tags">
              <span>Cloudflare Worker</span>
              <span>D1 + Pricing Override</span>
              <span>Webhook đối soát</span>
            </div>
          </div>

          <section class="admin-glance-grid" aria-label="Tóm tắt admin">
            ${summaryCards
              .map(
                (item) => `
              <article class="admin-metric-pill admin-metric-${item.tone}">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
              </article>`,
              )
              .join('')}
          </section>

          <div class="admin-brief-grid">
            <article class="admin-brief-card">
              <span class="section-kicker">Khách nổi bật</span>
              <strong>${escapeHtml(topCustomer?.displayName ?? 'Chưa có dữ liệu')}</strong>
              <p>${escapeHtml(topCustomer ? `${topCustomer.paidTotalLabel} · ${topCustomer.orderCountLabel}` : 'Sẽ hiện khi có khách đầu tiên trong hệ thống.')}</p>
            </article>
            <article class="admin-brief-card">
              <span class="section-kicker">Đơn mới nhất</span>
              <strong>${escapeHtml(latestOrder?.reference ?? 'Chưa có đơn')}</strong>
              <p>${escapeHtml(latestOrder ? `${latestOrder.customerName} · ${latestOrder.amountLabel}` : 'Đơn mới sẽ hiện tại đây để anh kiểm tra nhanh.')}</p>
            </article>
          </div>
        </section>

        <aside class="admin-surface admin-command-panel">
          <div class="admin-command-head">
            <span class="section-kicker">Control Tower</span>
            <h2>Nhịp vận hành</h2>
            <p>Các chỉ số cần xử lý tay hoặc cần để ý được gom lại thành một panel riêng.</p>
          </div>

          <div class="admin-command-stat-grid">
            <article class="admin-command-stat">
              <span>Đơn chờ xử lý</span>
              <strong>${moneyVnd.format(pendingManualCount)}</strong>
              <small>Có thể duyệt tay trực tiếp bên dưới</small>
            </article>
            <article class="admin-command-stat">
              <span>Khách quay lại</span>
              <strong>${moneyVnd.format(repeatCustomerCount)}</strong>
              <small>Trong 12 khách gần nhất</small>
            </article>
            <article class="admin-command-stat">
              <span>Webhook đã match</span>
              <strong>${moneyVnd.format(matchedWebhookCount)}</strong>
              <small>${moneyVnd.format(unresolvedWebhookCount)} log cần rà thêm</small>
            </article>
            <article class="admin-command-stat">
              <span>Doanh thu ${escapeHtml(revenueWindow?.label ?? '30 ngày')}</span>
              <strong>${escapeHtml(revenueWindow?.revenueLabel ?? '0đ')}</strong>
              <small>${escapeHtml(revenueWindow?.profitLabel ?? '0đ')} lời gộp</small>
            </article>
          </div>

          <div class="admin-command-links">
            <a class="button button-secondary" href="#orders" data-admin-tab-trigger="orders">Đi tới orders</a>
            <a class="button button-secondary" href="#payments" data-admin-tab-trigger="payments">Đi tới payments</a>
            <a class="button button-secondary" href="#pricing" data-admin-tab-trigger="pricing">Mở pricing desk</a>
            <a class="button button-secondary" href="#crm" data-admin-tab-trigger="crm">Mở CRM desk</a>
          </div>
        </aside>
        </section>
      </section>

      <section class="admin-tab-panel admin-stage" id="settings" data-admin-tab-panel="settings" hidden>
        <div class="admin-stage-head">
          <div>
            <span class="section-kicker">Site Settings</span>
            <h2>Logo, hero banner và metadata</h2>
            <p>Nhóm setting này điều khiển phần giao diện public, để anh đổi nhanh mà không phải sửa code hay deploy tay.</p>
          </div>
        </div>
        <div class="admin-settings-layout">
          ${siteSettingsForm}
        </div>
      </section>

      <section class="admin-tab-panel" id="crm" data-admin-tab-panel="crm" hidden>
        <div class="admin-stage-head">
          <div>
            <span class="section-kicker">CRM</span>
            <h2>Customer directory</h2>
            <p>Chỉ tập trung vào khách hàng: ai mua lại, ai chi nhiều hơn và lần mua gần nhất là khi nào.</p>
          </div>
          <div class="admin-stage-controls">
            <label class="admin-search-field">
              <span>Tìm khách / đơn / mã CK</span>
              <input type="search" placeholder="VD: ESIMCN20754343, Linh, gmail..." data-admin-ops-filter />
            </label>
          </div>
        </div>

        <section class="admin-surface admin-panel" id="customers">
            <div class="admin-surface-head">
              <div>
                <span class="section-kicker">Customer Directory</span>
                <h2>Khách gần đây</h2>
                <p>Nhìn theo từng khách: số đơn, số lần quay lại và tổng đã thanh toán.</p>
              </div>
              <strong>${moneyVnd.format(dashboard.customers.length)} khách</strong>
            </div>
            ${
              dashboard.customers.length === 0
                ? `<div class="admin-empty-state">Chưa có khách hàng nào trong database.</div>`
                : `<div class="admin-panel-scroll admin-customer-grid">
                  ${dashboard.customers
                    .map(
                      (item) => `
                    <article
                      class="admin-customer-card"
                      data-admin-ops-card
                      data-ops-query="${escapeHtml([item.displayName, item.email, item.phone ?? ''].join(' '))}"
                    >
                      <div class="admin-customer-card-top">
                        <div class="admin-customer-card-copy">
                          <span class="section-kicker">Khách hàng</span>
                          <strong>${escapeHtml(item.displayName)}</strong>
                          <p>${escapeHtml(item.email)}</p>
                        </div>
                        <div class="admin-customer-card-status">
                          <span>Phân loại</span>
                          <strong>${escapeHtml(item.statusLabel)}</strong>
                        </div>
                      </div>
                      <div class="admin-customer-meta-strip">
                        <div><span>Tổng đơn</span><strong>${escapeHtml(item.orderCountLabel)}</strong></div>
                        <div><span>Đã thanh toán</span><strong>${escapeHtml(item.paidOrderCountLabel)}</strong></div>
                        <div><span>Chưa thanh toán</span><strong>${escapeHtml(item.unpaidOrderCountLabel)}</strong></div>
                        <div><span>Đã chi</span><strong>${escapeHtml(item.paidTotalLabel)}</strong></div>
                      </div>
                      <dl class="admin-order-detail-grid">
                        <div><dt>Điện thoại</dt><dd>${escapeHtml(item.phone ?? '-')}</dd></div>
                        <div><dt>Đơn gần nhất</dt><dd>${escapeHtml(item.lastOrderAtLabel)}</dd></div>
                        <div><dt>Thanh toán gần nhất</dt><dd>${escapeHtml(item.lastPaidAtLabel ?? '-')}</dd></div>
                      </dl>
                    </article>`,
                    )
                    .join('')}
                </div>`
            }
        </section>
      </section>

      <section class="admin-tab-panel" id="orders" data-admin-tab-panel="orders" hidden>
        <div class="admin-stage-head">
          <div>
            <span class="section-kicker">Orders</span>
            <h2>Order queue</h2>
            <p>Toàn bộ danh sách đơn gần nhất trong một panel riêng, dễ duyệt tay và ít nhiễu hơn.</p>
          </div>
          <div class="admin-stage-controls">
            <label class="admin-search-field">
              <span>Tìm đơn / khách / mã CK</span>
              <input type="search" placeholder="VD: ESIMCN20754343, Linh, gmail..." data-admin-ops-filter />
            </label>
          </div>
        </div>

        <section class="admin-surface admin-panel">
          <div class="admin-surface-head">
            <div>
              <span class="section-kicker">Order Queue</span>
              <h2>20 đơn mới nhất</h2>
              <p>Card hoá để anh nhìn tên khách, mã chuyển khoản và trạng thái duyệt trong một nhịp.</p>
            </div>
            <strong>${moneyVnd.format(dashboard.orders.length)} đơn</strong>
          </div>
          ${
            dashboard.orders.length === 0
              ? `<div class="admin-empty-state">Chưa có đơn nào trong database.</div>`
              : `<div class="admin-panel-scroll admin-card-list" data-admin-ops-list="orders">
                ${dashboard.orders
                  .map(
                    (item) => `
                  <article
                    class="admin-order-card"
                    data-admin-ops-card
                    data-ops-query="${escapeHtml([
                      item.reference,
                      item.customerName,
                      item.customerPhone ?? '',
                      item.customerEmail,
                      item.planTitle,
                      item.paymentCode ?? '',
                    ].join(' '))}"
                  >
                    <div class="admin-order-card-top">
                      <div class="admin-order-card-copy">
                        <span class="section-kicker">Đơn ${escapeHtml(item.reference)}</span>
                        <strong>${escapeHtml(item.planTitle)}</strong>
                        <p>${escapeHtml(item.customerName)}</p>
                      </div>
                      <div class="admin-order-card-amount">
                        <span>${escapeHtml(item.statusLabel)}</span>
                        <strong>${escapeHtml(item.amountLabel)}</strong>
                      </div>
                    </div>
                    <dl class="admin-order-detail-grid">
                      <div><dt>Email</dt><dd>${escapeHtml(item.customerEmail)}</dd></div>
                      <div><dt>Điện thoại</dt><dd>${escapeHtml(item.customerPhone ?? '-')}</dd></div>
                      <div><dt>Mã chuyển khoản</dt><dd>${escapeHtml(item.paymentCode ?? '-')}</dd></div>
                      <div><dt>Đã trả tiền</dt><dd>${escapeHtml(item.paidAtLabel ?? '-')}</dd></div>
                      <div><dt>Tạo lúc</dt><dd>${escapeHtml(item.createdAtLabel)}</dd></div>
                      <div><dt>Trạng thái</dt><dd>${escapeHtml(item.statusLabel)}</dd></div>
                    </dl>
                    <div class="admin-order-card-actions">
                      <a class="button button-secondary" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">Mở đơn</a>
                      ${
                        item.paymentStatus === 'paid'
                          ? `<span class="admin-order-action-note">Đã duyệt</span>`
                          : `<form class="admin-order-action-form" action="/admin/orders/manual-approve" method="post">
                              <input type="hidden" name="csrfToken" value="${escapeHtml(dashboard.csrfToken)}" />
                              <input type="hidden" name="reference" value="${escapeHtml(item.reference)}" />
                              <input type="hidden" name="returnTo" value="#orders" />
                              <button class="button button-primary" type="submit">Duyệt tay</button>
                            </form>`
                      }
                    </div>
                  </article>`,
                  )
                  .join('')}
              </div>`
          }
        </section>
      </section>

      <section class="admin-tab-panel" id="payments" data-admin-tab-panel="payments" hidden>
        <div class="admin-stage-head">
          <div>
            <span class="section-kicker">Payments</span>
            <h2>Webhook payment feed</h2>
            <p>Feed riêng cho payment logs để anh nhìn payment như một pipeline thay vì trộn vào CRM.</p>
          </div>
          <div class="admin-stage-controls">
            <label class="admin-search-field">
              <span>Tìm webhook / refNo / mã khớp</span>
              <input type="search" placeholder="VD: ESIMCN..., FT..., 7380..." data-admin-ops-filter />
            </label>
          </div>
        </div>

        <section class="admin-surface admin-panel" id="webhooks">
            <div class="admin-surface-head">
              <div>
                <span class="section-kicker">Payment Feed</span>
                <h2>Webhook đối soát</h2>
                <p>Log payment tách riêng thành một feed để rà trace, tài khoản nhận và lý do mismatch.</p>
              </div>
              <strong>${moneyVnd.format(dashboard.webhookEvents.length)} log</strong>
            </div>
            ${
              dashboard.webhookEvents.length === 0
                ? `<div class="admin-empty-state">Chưa có webhook nào được ghi lại.</div>`
                : `<div class="admin-panel-scroll admin-card-list" data-admin-ops-list="webhooks">
                  ${dashboard.webhookEvents
                    .map(
                      (item) => `
                    <article
                      class="admin-webhook-card"
                      data-admin-ops-card
                      data-ops-query="${escapeHtml([
                        item.matchedReference ?? '',
                        item.refNo ?? '',
                        item.description ?? '',
                        item.reason,
                        item.accountNumber ?? '',
                      ].join(' '))}"
                    >
                      <div class="admin-webhook-card-top">
                        <div class="admin-webhook-card-copy">
                          <span class="section-kicker">Webhook ${escapeHtml(item.receivedAtLabel)}</span>
                          <strong>${escapeHtml(item.matchedReference ?? '-')}</strong>
                          <p>${escapeHtml(item.description ?? '-')}</p>
                        </div>
                        <div class="admin-webhook-card-status">
                          <span>${escapeHtml(item.statusLabel)}</span>
                          <strong>${escapeHtml(item.amountLabel)}</strong>
                        </div>
                      </div>
                      <dl class="admin-order-detail-grid">
                        <div><dt>Trace / refNo</dt><dd>${escapeHtml(item.refNo ?? '-')}</dd></div>
                        <div><dt>Tài khoản nhận</dt><dd>${escapeHtml(item.accountNumber ?? '-')}</dd></div>
                        <div><dt>Lý do</dt><dd>${escapeHtml(item.reason)}</dd></div>
                        <div><dt>Mã khớp</dt><dd>${escapeHtml(item.matchedReference ?? '-')}</dd></div>
                      </dl>
                    </article>`,
                    )
                    .join('')}
                </div>`
            }
          </section>
      </section>

      <section class="admin-tab-panel admin-stage admin-stage-pricing" id="pricing" data-admin-tab-panel="pricing" hidden>
        <div class="admin-stage-head">
          <div>
            <span class="section-kicker">Revenue Desk</span>
            <h2>Pricing workspace</h2>
            <p>Giữ nguyên logic override hiện tại nhưng chuyển sang giao diện kiểu control center, có lọc nhanh và nhóm rõ ràng như một CMS pricing thực thụ.</p>
          </div>
          <div class="admin-stage-controls">
            <label class="admin-search-field">
              <span>Tìm gói / package</span>
              <input type="search" placeholder="VD: 10GB, CN_, topup, TikTok..." data-admin-plan-filter />
            </label>
          </div>
        </div>

        <div class="admin-surface admin-pricing-shell">
          <div class="admin-pricing-toolbar">
            <div class="admin-pricing-toolbar-copy">
              <span class="section-kicker">Bulk pricing</span>
              <strong>Tăng giá hàng loạt theo nhóm hoặc toàn catalog</strong>
              <p>Dùng để set nhanh biên lợi nhuận mà không phải sửa từng dòng.</p>
            </div>
            <div class="admin-pricing-toolbar-actions">
              <button class="button button-secondary" type="button" data-admin-expand-groups>Mở tất cả nhóm</button>
              <button class="button button-secondary" type="button" data-admin-collapse-groups>Thu gọn nhóm</button>
            </div>
          </div>
          ${renderBulkForm({
            scope: dashboard.bulkScope,
            returnTo: '#pricing',
            title: 'Pricing control',
            description: 'Kéo từ 0-500% theo giá gốc catalog, không cộng dồn.',
            buttonLabel: 'Áp dụng',
            showScopeSelect: true,
          })}
          <div class="admin-pricing-empty admin-empty-state" data-admin-plan-empty hidden>Không thấy gói nào khớp với từ khóa đang lọc.</div>
        </div>

        <section class="admin-surface-list">
          ${pricingGroupsMarkup}
        </section>
      </section>
    </section>
  </div>
</main>
<script>
(() => {
  const planInputs = Array.from(document.querySelectorAll('[data-admin-plan-filter]'));
  const opsInputs = Array.from(document.querySelectorAll('[data-admin-ops-filter]'));
  const groupShells = Array.from(document.querySelectorAll('[data-admin-group-shell]'));
  const expandGroupsButtons = Array.from(document.querySelectorAll('[data-admin-expand-groups]'));
  const collapseGroupsButtons = Array.from(document.querySelectorAll('[data-admin-collapse-groups]'));
  const emptyPlansState = document.querySelector('[data-admin-plan-empty]');
  const opsCards = Array.from(document.querySelectorAll('[data-admin-ops-card]'));
  const tabPanels = Array.from(document.querySelectorAll('[data-admin-tab-panel]'));
  const tabTriggers = Array.from(document.querySelectorAll('[data-admin-tab-trigger]'));
  const siteSettingsForm = document.querySelector('[data-site-settings-form]');
  const assetFileInputs = Array.from(document.querySelectorAll('[data-site-asset-input]'));
  const assetClearButtons = Array.from(document.querySelectorAll('[data-site-asset-clear]'));
  const assetThumbs = Array.from(document.querySelectorAll('[data-site-asset-thumb]'));
  const assetStatusNodes = Array.from(document.querySelectorAll('[data-site-asset-status]'));
  const previewTextNodes = Array.from(document.querySelectorAll('[data-site-settings-preview-text]'));
  const previewLogoNode = document.querySelector('[data-site-settings-preview-logo]');

  let planQuery = '';
  let opsQuery = '';
  const assetLabelMap = {
    logoUrl: 'Logo',
    faviconUrl: 'Favicon',
    homeHeroBannerUrl: 'Hero banner',
    homeHeroBannerGalleryUrls: 'Hero gallery',
    socialImageUrl: 'Social image',
  };

  const syncInputValues = (inputs, value) => {
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value !== value) {
        input.value = value;
      }
    });
  };
  const escapeMarkup = (value) =>
    String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  const getSiteSettingsField = (name) =>
    siteSettingsForm instanceof HTMLFormElement ? siteSettingsForm.querySelector('[name="' + name + '"]') : null;
  const getAssetUrlValue = (name) => {
    const field = getSiteSettingsField(name);
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      return field.value.trim();
    }
    return '';
  };
  const setAssetStatus = (name, message, tone) => {
    assetStatusNodes.forEach((node) => {
      if (!(node instanceof HTMLElement) || node.getAttribute('data-site-asset-status') !== name) {
        return;
      }
      node.textContent = message;
      node.dataset.tone = tone || 'neutral';
    });
  };
  const renderAssetThumb = (node, url, label) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    const urls = String(url || '')
      .split(/[\\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 8);
    node.innerHTML = urls.length
      ? urls.map((item, index) => '<img src="' + escapeMarkup(item) + '" alt="' + escapeMarkup(label) + ' ' + (index + 1) + '" loading="lazy" decoding="async" />').join('')
      : '<span>' + escapeMarkup(label) + '</span>';
  };
  const syncSiteSettingsPreview = () => {
    if (!(siteSettingsForm instanceof HTMLFormElement)) {
      return;
    }

    previewTextNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }
      const source = node.getAttribute('data-site-settings-preview-text') || '';
      const field = getSiteSettingsField(source);
      const nextText = field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field.value.trim() : '';
      node.textContent = nextText;
    });

    assetThumbs.forEach((node) => {
      const name = node.getAttribute('data-site-asset-thumb') || '';
      if (!name) {
        return;
      }
      renderAssetThumb(node, getAssetUrlValue(name), assetLabelMap[name] || 'Ảnh');
    });

    if (previewLogoNode instanceof HTMLElement) {
      const logoUrl = getAssetUrlValue('logoUrl');
      const siteNameField = getSiteSettingsField('siteName');
      const siteName = siteNameField instanceof HTMLInputElement ? siteNameField.value.trim() : 'eSIM CN';
      previewLogoNode.innerHTML = logoUrl
        ? '<img class="admin-settings-logo" src="' + escapeMarkup(logoUrl) + '" alt="' + escapeMarkup(siteName || 'eSIM CN') + '" />'
        : '<span class="admin-settings-logo-fallback">e</span>';
    }
  };

  const resolveTabFromHash = (hash) => {
    const cleanHash = (hash || '').replace(/^#/, '');
    if (!cleanHash) {
      return 'overview';
    }

    if (cleanHash === 'overview') return 'overview';
    if (cleanHash === 'crm' || cleanHash === 'customers') return 'crm';
    if (cleanHash === 'orders') return 'orders';
    if (cleanHash === 'payments' || cleanHash === 'webhooks') return 'payments';
    if (cleanHash === 'settings') return 'settings';
    if (cleanHash === 'pricing' || cleanHash.startsWith('group-') || cleanHash.startsWith('plan-')) return 'pricing';
    return 'overview';
  };

  const activateTab = (tabName) => {
    tabPanels.forEach((panel) => {
      const matched = panel.getAttribute('data-admin-tab-panel') === tabName;
      panel.hidden = !matched;
      panel.classList.toggle('is-active', matched);
    });

    tabTriggers.forEach((trigger) => {
      const matched = trigger.getAttribute('data-admin-tab-trigger') === tabName;
      trigger.classList.toggle('is-active', matched);
      if (matched) {
        trigger.setAttribute('aria-current', 'page');
      } else {
        trigger.removeAttribute('aria-current');
      }
    });
  };

  const applyPlanFilter = () => {
    let visiblePlanCount = 0;

    groupShells.forEach((shell) => {
      const rows = Array.from(shell.querySelectorAll('[data-admin-plan-row]'));
      let visibleRows = 0;

      rows.forEach((row) => {
        const haystack = (row.getAttribute('data-plan-query') || '').toLowerCase();
        const matched = !planQuery || haystack.includes(planQuery);
        row.hidden = !matched;
        if (matched) {
          visibleRows += 1;
          visiblePlanCount += 1;
        }
      });

      const countNode = shell.querySelector('[data-admin-group-visible-count]');
      if (countNode) {
        countNode.textContent = String(visibleRows);
      }

      shell.hidden = Boolean(planQuery) && visibleRows === 0;
      if (planQuery && visibleRows > 0) {
        shell.open = true;
      }
    });

    if (emptyPlansState) {
      emptyPlansState.hidden = !planQuery || visiblePlanCount > 0;
    }
  };

  const applyOpsFilter = () => {
    opsCards.forEach((card) => {
      const haystack = (card.getAttribute('data-ops-query') || '').toLowerCase();
      card.hidden = Boolean(opsQuery) && !haystack.includes(opsQuery);
    });
  };

  planInputs.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.addEventListener('input', () => {
        planQuery = input.value.trim().toLowerCase();
        syncInputValues(planInputs, input.value);
        applyPlanFilter();
      });
    }
  });

  opsInputs.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.addEventListener('input', () => {
        opsQuery = input.value.trim().toLowerCase();
        syncInputValues(opsInputs, input.value);
        applyOpsFilter();
      });
    }
  });

  if (siteSettingsForm instanceof HTMLFormElement) {
    siteSettingsForm.querySelectorAll('[data-site-settings-preview-source], [data-site-asset-url-input]').forEach((field) => {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.addEventListener('input', syncSiteSettingsPreview);
      }
    });
  }

  assetClearButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    button.addEventListener('click', () => {
      const target = button.getAttribute('data-site-asset-clear') || '';
      const field = getSiteSettingsField(target);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.value = '';
        setAssetStatus(target, 'Đã xóa URL khỏi form. Bấm Lưu Site Settings để áp dụng.', 'neutral');
        syncSiteSettingsPreview();
      }
    });
  });

  assetFileInputs.forEach((input) => {
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    input.addEventListener('change', async () => {
      const target = input.getAttribute('data-site-asset-input') || '';
      const files = Array.from(input.files || []);
      const csrfField = getSiteSettingsField('csrfToken');
      const csrfToken = csrfField instanceof HTMLInputElement ? csrfField.value : '';
      const urlField = getSiteSettingsField(target);
      const uploadButton = input.closest('.admin-settings-upload-button');
      const appendMode = input.getAttribute('data-site-asset-multiple') === 'append';

      if (!files.length || !target || !(urlField instanceof HTMLInputElement || urlField instanceof HTMLTextAreaElement) || !csrfToken) {
        input.value = '';
        return;
      }

      input.disabled = true;
      if (uploadButton instanceof HTMLElement) {
        uploadButton.classList.add('is-busy');
      }
      setAssetStatus(target, files.length > 1 ? 'Đang upload nhiều ảnh lên Cloudflare...' : 'Đang upload ảnh lên Cloudflare...', 'loading');

      try {
        const uploadedUrls = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append('csrfToken', csrfToken);
          formData.append('kind', target);
          formData.append('file', file);

          const response = await fetch('/admin/site-assets/upload', {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
            },
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(result.error || 'Upload ảnh thất bại.');
          }
          if (typeof result.url === 'string' && result.url) {
            uploadedUrls.push(result.url);
          }
        }

        if (appendMode) {
          const currentUrls = String(urlField.value || '')
            .split(/[\\n,]+/)
            .map((item) => item.trim())
            .filter(Boolean);
          urlField.value = Array.from(new Set([...currentUrls, ...uploadedUrls])).join('\\n');
        } else {
          urlField.value = uploadedUrls[0] || '';
        }
        setAssetStatus(target, appendMode ? 'Upload xong ' + uploadedUrls.length + ' ảnh. Bấm Lưu Site Settings để áp dụng.' : 'Upload xong. URL đã được điền vào form, chỉ cần bấm Lưu Site Settings.', 'success');
        syncSiteSettingsPreview();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload ảnh thất bại.';
        setAssetStatus(target, message, 'error');
      } finally {
        input.value = '';
        input.disabled = false;
        if (uploadButton instanceof HTMLElement) {
          uploadButton.classList.remove('is-busy');
        }
      }
    });
  });

  expandGroupsButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    button.addEventListener('click', () => {
      groupShells.forEach((shell) => {
        shell.open = true;
      });
    });
  });

  collapseGroupsButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    button.addEventListener('click', () => {
      groupShells.forEach((shell, index) => {
        shell.open = index === 0;
      });
    });
  });

  tabTriggers.forEach((trigger) => {
    if (!(trigger instanceof HTMLAnchorElement)) {
      return;
    }

    trigger.addEventListener('click', (event) => {
      const tabName = trigger.getAttribute('data-admin-tab-trigger') || 'overview';
      const href = trigger.getAttribute('href') || ('#' + tabName);
      const targetNode = href.startsWith('#') ? document.querySelector(href) : null;

      event.preventDefault();
      activateTab(tabName);

      if (href.startsWith('#')) {
        history.replaceState(null, '', href);
      }

      if (targetNode instanceof HTMLElement) {
        targetNode.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    });
  });

  activateTab(resolveTabFromHash(window.location.hash));
  applyPlanFilter();
  applyOpsFilter();
  syncSiteSettingsPreview();
})();
</script>
`;

  return layout({
    title: 'Admin giá bán | eSIM CN',
    description: 'Trang admin để sửa giá bán eSIM và theo dõi đơn hàng gần đây.',
    pathname: '/admin',
    body,
    bodyClass: 'page-admin',
    context,
    robots: 'noindex,nofollow,noarchive',
  });
};

export const renderArticlePage = (context: RenderContext, article: Article) => {
  const relatedArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      dateModified: article.updatedAt,
      author: {
        '@type': 'Organization',
        name: context.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: context.siteName,
      },
      mainEntityOfPage: fullUrl(context.siteUrl, `/blog/${article.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: fullUrl(context.siteUrl, '/') },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: fullUrl(context.siteUrl, `/blog/${article.slug}`) },
        { '@type': 'ListItem', position: 3, name: article.title, item: fullUrl(context.siteUrl, `/blog/${article.slug}`) },
      ],
    },
  ];

  const body = `
${header(context)}
<main>
  <section class="page-hero">
    <div class="wrap article-layout">
      <div>
        <span class="section-kicker">Bài viết hướng dẫn</span>
        <h1 class="page-title">${article.title}</h1>
        <p class="page-lead">${article.description}</p>
        <div class="guide-meta">
          <span>${article.readingTime}</span>
          <span>Cập nhật ${article.updatedLabel}</span>
        </div>
      </div>
      <aside class="article-aside reveal">
        <h3>Muốn xem bảng giá ngay?</h3>
        <p>Nếu bạn đã đủ biết thông tin cơ bản, quay lại trang chủ để chọn gói và gửi yêu cầu mua hàng.</p>
        <div class="button-row">
          <a class="button button-primary" href="/goi-esim">Xem gói cước</a>
          <a class="button button-secondary" href="${buildPurchasePath()}">Mua gói</a>
        </div>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="wrap article-body">
      <article class="article-content reveal">
        ${article.sections
          .map(
            (section) => `
        <section class="article-section">
          <h2>${section.heading}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
          ${
            section.bullets
              ? `<ul>${section.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>`
              : ''
          }
        </section>`,
          )
          .join('')}
      </article>
    </div>
  </section>

  ${
    relatedArticles.length
      ? `<section class="section">
    <div class="wrap">
      <div class="section-head">
        <span class="section-kicker">Bài liên quan</span>
        <h2 class="section-title">Đọc thêm để chọn gói dễ hơn.</h2>
      </div>
      <div class="article-related-grid">
        ${relatedArticles
          .map(
            (item) => `
        <a class="article-related-card reveal" href="/blog/${item.slug}">
          <span>${item.readingTime}</span>
          <strong>${item.title}</strong>
          <p>${item.excerpt}</p>
        </a>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
      : ''
  }
</main>
${footer(context)}
`;

  return layout({
    title: `${article.title} | eSIM CN`,
    description: article.description,
    pathname: `/blog/${article.slug}`,
    body,
    context,
    structuredData: schemas,
  });
};

export const renderRobots = (context: RenderContext) =>
  `User-agent: *\nAllow: /\n\nSitemap: ${fullUrl(context.siteUrl, '/sitemap.xml')}\n`;

export const renderSitemap = (context: RenderContext, planList: Plan[] = plans) => {
  const urls = ['/', '/goi-esim', '/tra-cuu-don', '/mua-goi', ...getVisiblePlans(planList).map((plan) => `/plans/${plan.slug}`), ...articles.map((article) => `/blog/${article.slug}`)];
  const articleLastModByPath = new Map(
    articles.map((article) => [`/blog/${article.slug}`, new Date(article.updatedAt).toISOString()]),
  );
  const entries = urls
    .map(
      (pathname) => `
  <url>
    <loc>${fullUrl(context.siteUrl, pathname)}</loc>
    ${articleLastModByPath.has(pathname) ? `<lastmod>${articleLastModByPath.get(pathname)}</lastmod>` : ''}
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}
</urlset>`;
};

export const renderNotFound = (context: RenderContext) =>
  layout({
    title: 'Không tìm thấy trang | eSIM CN',
    description: 'Trang bạn vừa mở không tồn tại.',
    pathname: '/404',
    body: `${header(context)}<main><section class="page-hero"><div class="wrap"><div class="section-head"><span class="section-kicker">404</span><h1 class="page-title">Không tìm thấy trang bạn đang cần.</h1><p class="page-lead">Quay lại trang chủ để xem bảng giá eSIM Trung Quốc và gửi yêu cầu đặt mua.</p><div class="button-row"><a class="button button-primary" href="/">Về trang chủ</a></div></div></div></section></main>${footer(context)}`,
    context,
  });
