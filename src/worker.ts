import { Hono, type Context } from 'hono';
import { articles, brand, plans, type Plan } from './data';
import { fetchEsimAccessPlans } from './esimaccess';
import { HERO_BANNER_BASE64 } from './heroBanner';
import {
  renderAdminDashboardPage,
  renderAdminLoginPage,
  renderArticlePage,
  renderCatalogPage,
  renderCheckoutPage,
  renderCustomerPortalPage,
  renderHomePage,
  renderNotFound,
  renderOrderLookupPage,
  renderPaymentPage,
  renderPaymentSuccessPage,
  renderPlanPage,
  renderRobots,
  renderSitemap,
} from './render';
import { globalStyles } from './styles';
import { chatWidgetScript } from './chatWidget';
import { esimCnChatSettings } from './chatConfig';
import { callGeminiChat } from './geminiChat';

type Bindings = {
  DB?: D1Database;
  SITE_ASSETS_BUCKET?: R2Bucket;
  SITE_URL?: string;
  PRIMARY_KEYWORD?: string;
  DEFAULT_SUPPORT_EMAIL?: string;
  PAYMENT_BANK_CODE?: string;
  PAYMENT_ACCOUNT_NUMBER?: string;
  PAYMENT_ACCOUNT_NAME?: string;
  PAYMENT_WEBHOOK_SECRET?: string;
  PAYMENT_FORWARD_NTA_URL?: string;
  PAYMENT_FORWARD_NTA_SECRET?: string;
  PAYMENT_NOTIFY_FROM?: string;
  PAYMENT_NOTIFY_REPLY_TO?: string;
  PAYMENT_NOTIFY_BCC?: string;
  RESEND_API_KEY?: string;
  ESIM_ACCESS_CODE?: string;
  ESIM_ACCESS_SECRET?: string;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  OPENCLAW_CHAT_WEBHOOK?: string;
  OPENCLAW_CHAT_SECRET?: string;
  GEMINI_API_KEY?: string;
};

type StoredOrder = {
  id: string;
  access_token: string | null;
  full_name: string;
  phone: string | null;
  email: string;
  plan_slug: string;
  plan_name: string | null;
  package_code: string | null;
  payment_code: string | null;
  quantity: number | null;
  period_num: number | null;
  amount_usd: number | null;
  amount_vnd: number | null;
  payment_status: string | null;
  created_at: string;
  paid_at: string | null;
  payment_email_sent_at: string | null;
  access_transaction_id: string | null;
  access_order_no: string | null;
  access_order_status: string | null;
  access_ordered_at: string | null;
  access_sync_status: string | null;
  access_sync_error: string | null;
  access_synced_at: string | null;
  access_esim_tran_no: string | null;
  access_iccid: string | null;
  access_ac: string | null;
  access_qr_code_url: string | null;
  access_short_url: string | null;
  access_smdp_status: string | null;
  access_eid: string | null;
  access_apn: string | null;
  access_pin: string | null;
  access_puk: string | null;
  access_activate_time: string | null;
  access_installation_time: string | null;
  access_expired_time: string | null;
  access_raw: string | null;
  access_esim_email_status: string | null;
  access_esim_email_sent_at: string | null;
  access_esim_email_id: string | null;
  access_esim_email_error: string | null;
};

type PricingOverrideRecord = {
  plan_slug: string;
  override_price_vnd: number;
  override_price_usd: number | null;
  note: string | null;
  updated_at: string;
};

type StoredChatSession = {
  id: string;
  visitor_name: string | null;
  visitor_phone: string | null;
  visitor_email: string | null;
  source: string;
  page_url: string | null;
  status: string;
  lead_stage: string;
  handoff_requested: number;
  handoff_reason: string | null;
  last_intent: string | null;
  last_message_at: string;
  created_at: string;
  updated_at: string;
};

type StoredChatMessage = {
  id: string;
  session_id: string;
  role: 'user' | 'bot' | 'system';
  body: string;
  intent: string | null;
  metadata_json: string | null;
  created_at: string;
};

type SiteSettings = {
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

type AdminSessionRecord = {
  id: string;
  username: string;
  created_at: string;
  expires_at: string;
};

type AdminLoginAttemptRecord = {
  ip: string;
  attempts: number;
  first_attempt_at: string;
  blocked_until: string | null;
  updated_at: string;
};

type CustomerMagicLinkAttemptRecord = {
  key: string;
  attempts: number;
  first_attempt_at: string;
  blocked_until: string | null;
  updated_at: string;
};

type CustomerLoginTokenRecord = {
  id: string;
  email: string;
  phone_last4: string;
  created_at: string;
  expires_at: string;
  used_at: string | null;
  requested_ip: string | null;
};

type CustomerSessionRecord = {
  id: string;
  email: string;
  phone_last4: string;
  created_at: string;
  expires_at: string;
};

type ApiRequestLimitRecord = {
  key: string;
  hits: number;
  window_started_at: string;
  blocked_until: string | null;
  updated_at: string;
};

type EsimAccessApiResponse = {
  success?: boolean;
  errorCode?: string | null;
  errorMsg?: string | null;
  errorMessage?: string | null;
};

type EsimAccessOrderResponse = EsimAccessApiResponse & {
  obj?: {
    orderNo?: string;
    transactionId?: string;
  } | null;
};

type EsimAccessProfile = {
  esimTranNo?: string;
  orderNo?: string;
  transactionId?: string;
  iccid?: string;
  ac?: string;
  qrCodeUrl?: string;
  shortUrl?: string;
  smdpStatus?: string;
  eid?: string;
  activateTime?: string;
  installationTime?: string;
  expiredTime?: string;
  apn?: string;
  pin?: string;
  puk?: string;
  totalVolume?: number;
  totalDuration?: number;
  durationUnit?: string;
  orderUsage?: number;
};

type EsimAccessQueryResponse = EsimAccessApiResponse & {
  obj?: {
    esimList?: EsimAccessProfile[];
  } | null;
};

type EsimAccessPackage = {
  packageCode?: string;
  name?: string;
  price?: number;
  currencyCode?: string;
  volume?: number;
  duration?: number;
  durationUnit?: string;
  location?: string;
  description?: string;
  activeType?: number;
};

type EsimAccessPackageListResponse = EsimAccessApiResponse & {
  obj?: {
    packageList?: EsimAccessPackage[];
  } | null;
};

const app = new Hono<{ Bindings: Bindings }>();
const socialPreviewImageBytes = Uint8Array.from(atob(HERO_BANNER_BASE64), (char) => char.charCodeAt(0));
const USD_TO_VND = 26000;
const moneyVnd = new Intl.NumberFormat('vi-VN');
const DAY_PASS_MAX_DAYS = 365;
const ESIM_ACCESS_API_BASE = 'https://api.esimaccess.com';
const MB = 1024 * 1024;
const GB = 1024 * MB;
const ADMIN_SESSION_COOKIE_NAME = 'esimcn_admin';
const ADMIN_CSRF_COOKIE_NAME = 'esimcn_admin_csrf';
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const CUSTOMER_SESSION_COOKIE_NAME = 'esimcn_customer';
const CUSTOMER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const CUSTOMER_LOGIN_TOKEN_TTL_MS = 1000 * 60 * 30;
const CUSTOMER_MAGIC_LINK_WINDOW_MS = 15 * 60 * 1000;
const CUSTOMER_MAGIC_LINK_MAX_ATTEMPTS = 5;
const CUSTOMER_MAGIC_LINK_BLOCK_MS = 30 * 60 * 1000;
const ESIM_ACCESS_API_TIMEOUT_MS = 15_000;
const ESIM_ACCESS_STATUS_WINDOW_MS = 60 * 1000;
const ESIM_ACCESS_STATUS_MAX_HITS = 20;
const ESIM_ACCESS_STATUS_BLOCK_MS = 5 * 60 * 1000;
const ESIM_ACCESS_PROVISION_COOLDOWN_MS = 30 * 1000;
const ORDER_ACCESS_TOKEN_PARAM = 't';
const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_LOGIN_MAX_ATTEMPTS = 5;
const ADMIN_LOGIN_BLOCK_MS = 30 * 60 * 1000;
const SITE_ASSET_MAX_BYTES_D1 = 1_900_000;
const SITE_ASSET_MAX_BYTES_R2 = 10 * MB;
const SITE_ASSET_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const SITE_ASSET_FIELDS = ['logoUrl', 'faviconUrl', 'homeHeroBannerUrl', 'homeHeroBannerGalleryUrls', 'socialImageUrl'] as const;
type SiteAssetField = (typeof SITE_ASSET_FIELDS)[number];
const SITE_ASSET_ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
]);
const SITE_ASSET_KIND_META: Record<SiteAssetField, { folder: string; label: string }> = {
  logoUrl: { folder: 'logo', label: 'Logo' },
  faviconUrl: { folder: 'favicon', label: 'Favicon' },
  homeHeroBannerUrl: { folder: 'hero-banner', label: 'Hero banner' },
  homeHeroBannerGalleryUrls: { folder: 'hero-banner', label: 'Hero banner phụ' },
  socialImageUrl: { folder: 'social-image', label: 'Social image' },
};
const DEFAULT_FOOTER_DESCRIPTION = 'Bán eSIM Trung Quốc, Hong Kong và Macau bằng tiếng Việt, nhận QR nhanh qua email.';
const DEFAULT_HOME_META_TITLE = 'eSIM Trung Quốc đi được Google | Mua eSIM China nhận QR nhanh | eSIM CN';
const DEFAULT_HOME_META_DESCRIPTION =
  'Mua eSIM Trung Quốc nhận QR nhanh, xem gói rõ ràng trên cả điện thoại và máy tính, có hướng dẫn cài đặt và hỗ trợ tiếng Việt.';

const ORDER_SELECT_BASE_SQL = `SELECT
  id, access_token, full_name, phone, email, plan_slug, plan_name, package_code, payment_code, quantity, period_num,
  amount_usd, amount_vnd, payment_status, created_at, paid_at, payment_email_sent_at,
  access_transaction_id, access_order_no, access_order_status, access_ordered_at,
  access_sync_status, access_sync_error, access_synced_at, access_esim_tran_no,
  access_iccid, access_ac, access_qr_code_url, access_short_url, access_smdp_status,
  access_eid, access_apn, access_pin, access_puk, access_activate_time,
  access_installation_time, access_expired_time, access_raw,
  access_esim_email_status, access_esim_email_sent_at, access_esim_email_id, access_esim_email_error
FROM orders`;
const ORDER_SELECT_SQL = `${ORDER_SELECT_BASE_SQL} WHERE id = ?`;
const ORDER_SELECT_BY_PAYMENT_CODE_SQL = `${ORDER_SELECT_BASE_SQL} WHERE payment_code = ?`;
const ORDER_LOOKUP_BY_EMAIL_SQL = `${ORDER_SELECT_BASE_SQL} WHERE email = ? COLLATE NOCASE ORDER BY created_at DESC LIMIT 20`;

const CHAT_QUICK_REPLIES: string[] = [];
const CHAT_SETTINGS = esimCnChatSettings;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#cc3d1f"/><stop offset="1" stop-color="#7a1b0d"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><path d="M19 24h10.5c8.1 0 13.5 5.2 13.5 12.1S37.6 48 29.5 48H19V24Zm9.8 17c5 0 8.1-1.8 8.1-4.9s-3.1-5-8.1-5h-3.2v9.9h3.2Z" fill="#fff5ee"/><path d="M45 18h-8v8h8z" fill="#fff5ee" opacity=".82"/></svg>`;
const getDefaultSiteSettings = (env: Bindings): SiteSettings => ({
  siteName: brand.name,
  supportEmail: env.DEFAULT_SUPPORT_EMAIL || brand.supportEmail,
  logoUrl: '',
  faviconUrl: '',
  homeHeroTitle: brand.heroTitle,
  homeHeroDescription: brand.heroDescription,
  homeHeroBannerUrl: '',
  homeHeroBannerGalleryUrls: '',
  footerDescription: DEFAULT_FOOTER_DESCRIPTION,
  homeMetaTitle: DEFAULT_HOME_META_TITLE,
  homeMetaDescription: DEFAULT_HOME_META_DESCRIPTION,
  socialImageUrl: '',
});
const getContext = (env: Bindings, settings: SiteSettings = getDefaultSiteSettings(env)) => ({
  siteUrl: env.SITE_URL || `https://${brand.domain}`,
  supportEmail: settings.supportEmail,
  primaryKeyword: env.PRIMARY_KEYWORD || brand.primaryKeyword,
  siteName: settings.siteName,
  logoUrl: settings.logoUrl,
  faviconUrl: settings.faviconUrl,
  homeHeroTitle: settings.homeHeroTitle,
  homeHeroDescription: settings.homeHeroDescription,
  homeHeroBannerUrl: settings.homeHeroBannerUrl,
  homeHeroBannerGalleryUrls: settings.homeHeroBannerGalleryUrls,
  footerDescription: settings.footerDescription,
  homeMetaTitle: settings.homeMetaTitle,
  homeMetaDescription: settings.homeMetaDescription,
  socialImageUrl: settings.socialImageUrl,
});

app.use('*', async (c, next) => {
  await next();

  c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.res.headers.set('X-Content-Type-Options', 'nosniff');
  c.res.headers.set('X-Frame-Options', 'DENY');
  c.res.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  c.res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; frame-src 'self'; img-src 'self' data: https://img.vietqr.io https://www.google-analytics.com https://stats.g.doubleclick.net https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com",

  );

  const pathname = new URL(c.req.url).pathname;
  if (
    pathname.startsWith('/tra-cuu-don') ||
    pathname.startsWith('/don-cua-toi') ||
    pathname.startsWith('/thanh-toan/') ||
    pathname.startsWith('/thanh-toan-thanh-cong/') ||
    pathname.startsWith('/api/orders/') ||
    pathname.startsWith('/admin')
  ) {
    c.res.headers.set('Cache-Control', 'no-store');
  }
});

const parsePayload = async (request: Request) => {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await request.json()) as Record<string, unknown>;
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
};

const parseCookieHeader = (value: string | null) =>
  (value || '')
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((cookies, item) => {
      const [name, ...rest] = item.split('=');
      if (!name || rest.length === 0) {
        return cookies;
      }
      const rawValue = rest.join('=');
      try {
        cookies[name] = decodeURIComponent(rawValue);
      } catch {
        cookies[name] = rawValue;
      }
      return cookies;
    }, {});

const getCookieValue = (request: Request, name: string) => parseCookieHeader(request.headers.get('cookie'))[name] ?? '';

const serializeCookie = (
  name: string,
  value: string,
  options: {
    maxAge?: number;
    expires?: Date;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
  } = {},
) => {
  const segments = [`${name}=${encodeURIComponent(value)}`];
  segments.push(`Path=${options.path ?? '/'}`);
  if (typeof options.maxAge === 'number') {
    segments.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`);
  }
  if (options.expires) {
    segments.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.httpOnly !== false) {
    segments.push('HttpOnly');
  }
  if (options.secure) {
    segments.push('Secure');
  }
  segments.push(`SameSite=${options.sameSite ?? 'Lax'}`);
  return segments.join('; ');
};

const appendCookie = (response: Response, cookie: string) => {
  response.headers.append('Set-Cookie', cookie);
  return response;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const toText = (value: unknown) => {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return '';
};
const toNumber = (value: unknown) => {
  const parsed = Number.parseInt(toText(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
};
const truncateText = (value: unknown, maxLength: number) => toText(value).slice(0, maxLength);
const normalizeOptionalUrl = (value: unknown, maxLength = 1000) => {
  const trimmed = truncateText(value, maxLength);
  if (!trimmed) return '';
  if (trimmed.startsWith('/')) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return '';
};
const isSiteAssetField = (value: string): value is SiteAssetField => SITE_ASSET_FIELDS.includes(value as SiteAssetField);
const getSiteAssetExtension = (filename: string, contentType: string) => {
  const cleanName = toText(filename);
  const rawExtension = cleanName.includes('.') ? cleanName.split('.').pop()?.toLowerCase() || '' : '';
  if (rawExtension && /^[a-z0-9]{1,8}$/.test(rawExtension)) {
    return rawExtension;
  }

  switch (contentType) {
    case 'image/png':
      return 'png';
    case 'image/jpeg':
      return 'jpg';
    case 'image/webp':
      return 'webp';
    case 'image/avif':
      return 'avif';
    case 'image/gif':
      return 'gif';
    case 'image/svg+xml':
      return 'svg';
    case 'image/x-icon':
    case 'image/vnd.microsoft.icon':
      return 'ico';
    default:
      return 'bin';
  }
};
const normalizeSiteAssetContentType = (file: File) => {
  const declaredType = toText(file.type).toLowerCase();
  if (SITE_ASSET_ALLOWED_TYPES.has(declaredType)) {
    return declaredType;
  }

  switch (getSiteAssetExtension(file.name, declaredType)) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'avif':
      return 'image/avif';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
    default:
      return '';
  }
};
const buildSiteAssetKey = (kind: SiteAssetField, file: File) => {
  const contentType = normalizeSiteAssetContentType(file);
  const extension = getSiteAssetExtension(file.name, contentType);
  const randomPart = crypto.randomUUID().replaceAll('-', '');
  return `site-settings/${SITE_ASSET_KIND_META[kind].folder}/${Date.now()}-${randomPart}.${extension}`;
};
const buildSiteAssetPath = (key: string) => `/site-assets/${key.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`;
const getSiteAssetKeyFromPath = (pathname: string) => {
  const prefix = '/site-assets/';
  if (!pathname.startsWith(prefix)) return '';
  return pathname
    .slice(prefix.length)
    .split('/')
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .join('/');
};
const toSiteAssetBinaryBody = (value: unknown): BodyInit | null => {
  if (value instanceof ArrayBuffer) {
    return value;
  }
  if (value instanceof Uint8Array) {
    return value;
  }
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength));
  }
  if (Array.isArray(value) && value.every((item) => typeof item === 'number')) {
    return Uint8Array.from(value);
  }
  return null;
};
const getSiteAssetMaxBytes = (env: Bindings) => (env.SITE_ASSETS_BUCKET ? SITE_ASSET_MAX_BYTES_R2 : SITE_ASSET_MAX_BYTES_D1);
const getSiteAssetUploadMode = (env: Bindings): 'disabled' | 'd1' | 'r2' =>
  env.SITE_ASSETS_BUCKET ? 'r2' : env.DB ? 'd1' : 'disabled';
const clampOrderQuantity = (value: unknown) => Math.max(1, Math.min(99, Math.round(toNumber(value) || 1)));

const hasReadyEsimProfile = (profile: EsimAccessProfile | null | undefined) => Boolean(toText(profile?.qrCodeUrl));

const dedupeEsimProfiles = (profiles: EsimAccessProfile[]) => {
  const seen = new Set<string>();
  const unique: EsimAccessProfile[] = [];
  profiles.forEach((profile, index) => {
    if (!profile || typeof profile !== 'object') return;
    const keyBase = [
      toText(profile.iccid),
      toText(profile.ac),
      toText(profile.qrCodeUrl),
      toText(profile.esimTranNo),
    ].join('::');
    const key = keyBase.replace(/:+/g, '') ? keyBase : `fallback:${index}`;
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(profile);
  });
  return unique;
};

const collectEsimProfiles = (value: unknown): EsimAccessProfile[] => {
  if (Array.isArray(value)) {
    return dedupeEsimProfiles(value.filter((item): item is EsimAccessProfile => Boolean(item && typeof item === 'object')));
  }

  if (!value || typeof value !== 'object') {
    return [];
  }

  const record = value as Record<string, unknown>;
  if (Array.isArray(record.profiles)) {
    return dedupeEsimProfiles(record.profiles.filter((item): item is EsimAccessProfile => Boolean(item && typeof item === 'object')));
  }

  if (
    typeof record.qrCodeUrl === 'string' ||
    typeof record.iccid === 'string' ||
    typeof record.ac === 'string' ||
    typeof record.esimTranNo === 'string'
  ) {
    return [record as EsimAccessProfile];
  }

  return [];
};

const parseStoredEsimProfiles = (
  order: Pick<
    StoredOrder,
    | 'access_raw'
    | 'access_esim_tran_no'
    | 'access_iccid'
    | 'access_ac'
    | 'access_qr_code_url'
    | 'access_short_url'
    | 'access_smdp_status'
    | 'access_eid'
    | 'access_apn'
    | 'access_pin'
    | 'access_puk'
    | 'access_activate_time'
    | 'access_installation_time'
    | 'access_expired_time'
    | 'access_order_no'
    | 'access_transaction_id'
  >,
) => {
  let profiles: EsimAccessProfile[] = [];

  if (order.access_raw) {
    try {
      profiles = collectEsimProfiles(JSON.parse(order.access_raw));
    } catch {
      profiles = [];
    }
  }

  if (profiles.length === 0 && order.access_qr_code_url) {
    profiles = [
      {
        esimTranNo: order.access_esim_tran_no ?? undefined,
        orderNo: order.access_order_no ?? undefined,
        transactionId: order.access_transaction_id ?? undefined,
        iccid: order.access_iccid ?? undefined,
        ac: order.access_ac ?? undefined,
        qrCodeUrl: order.access_qr_code_url ?? undefined,
        shortUrl: order.access_short_url ?? undefined,
        smdpStatus: order.access_smdp_status ?? undefined,
        eid: order.access_eid ?? undefined,
        apn: order.access_apn ?? undefined,
        pin: order.access_pin ?? undefined,
        puk: order.access_puk ?? undefined,
        activateTime: order.access_activate_time ?? undefined,
        installationTime: order.access_installation_time ?? undefined,
        expiredTime: order.access_expired_time ?? undefined,
      },
    ];
  }

  return dedupeEsimProfiles(profiles).filter((profile) =>
    Boolean(toText(profile.qrCodeUrl) || toText(profile.iccid) || toText(profile.ac)),
  );
};

const serializeStoredEsimProfiles = (orderNo: string, transactionId: string, profiles: EsimAccessProfile[]) =>
  JSON.stringify({
    version: 2,
    orderNo,
    transactionId,
    profiles: dedupeEsimProfiles(profiles),
  });

const loadSiteSettings = async (db: D1Database, env: Bindings): Promise<SiteSettings> => {
  await ensureSiteSettingsSchema(db);
  const defaults = getDefaultSiteSettings(env);
  const record = await db
    .prepare(
      `SELECT
         site_name, support_email, logo_url, favicon_url,
         home_hero_title, home_hero_description, home_hero_banner_url, home_hero_banner_gallery_urls,
         footer_description, home_meta_title, home_meta_description, social_image_url
       FROM site_settings
       WHERE id = ?`,
    )
    .bind('default')
    .first<{
      site_name: string | null;
      support_email: string | null;
      logo_url: string | null;
      favicon_url: string | null;
      home_hero_title: string | null;
      home_hero_description: string | null;
      home_hero_banner_url: string | null;
      home_hero_banner_gallery_urls: string | null;
      footer_description: string | null;
      home_meta_title: string | null;
      home_meta_description: string | null;
      social_image_url: string | null;
    }>();

  if (!record) {
    return defaults;
  }

  return {
    siteName: truncateText(record.site_name, 120) || defaults.siteName,
    supportEmail: truncateText(record.support_email, 160) || defaults.supportEmail,
    logoUrl: normalizeOptionalUrl(record.logo_url),
    faviconUrl: normalizeOptionalUrl(record.favicon_url),
    homeHeroTitle: truncateText(record.home_hero_title, 180) || defaults.homeHeroTitle,
    homeHeroDescription: truncateText(record.home_hero_description, 400) || defaults.homeHeroDescription,
    homeHeroBannerUrl: normalizeOptionalUrl(record.home_hero_banner_url),
    homeHeroBannerGalleryUrls: truncateText(record.home_hero_banner_gallery_urls, 4000),
    footerDescription: truncateText(record.footer_description, 260) || defaults.footerDescription,
    homeMetaTitle: truncateText(record.home_meta_title, 180) || defaults.homeMetaTitle,
    homeMetaDescription: truncateText(record.home_meta_description, 320) || defaults.homeMetaDescription,
    socialImageUrl: normalizeOptionalUrl(record.social_image_url),
  };
};

const saveSiteSettings = async (db: D1Database, env: Bindings, payload: Record<string, unknown>) => {
  await ensureSiteSettingsSchema(db);
  const defaults = getDefaultSiteSettings(env);
  const settings: SiteSettings = {
    siteName: truncateText(payload.siteName, 120) || defaults.siteName,
    supportEmail: truncateText(payload.supportEmail, 160) || defaults.supportEmail,
    logoUrl: normalizeOptionalUrl(payload.logoUrl),
    faviconUrl: normalizeOptionalUrl(payload.faviconUrl),
    homeHeroTitle: truncateText(payload.homeHeroTitle, 180) || defaults.homeHeroTitle,
    homeHeroDescription: truncateText(payload.homeHeroDescription, 400) || defaults.homeHeroDescription,
    homeHeroBannerUrl: normalizeOptionalUrl(payload.homeHeroBannerUrl),
    homeHeroBannerGalleryUrls: truncateText(payload.homeHeroBannerGalleryUrls, 4000),
    footerDescription: truncateText(payload.footerDescription, 260) || defaults.footerDescription,
    homeMetaTitle: truncateText(payload.homeMetaTitle, 180) || defaults.homeMetaTitle,
    homeMetaDescription: truncateText(payload.homeMetaDescription, 320) || defaults.homeMetaDescription,
    socialImageUrl: normalizeOptionalUrl(payload.socialImageUrl),
  };
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO site_settings (
         id, site_name, support_email, logo_url, favicon_url,
         home_hero_title, home_hero_description, home_hero_banner_url, home_hero_banner_gallery_urls,
         footer_description, home_meta_title, home_meta_description,
         social_image_url, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         site_name = excluded.site_name,
         support_email = excluded.support_email,
         logo_url = excluded.logo_url,
         favicon_url = excluded.favicon_url,
         home_hero_title = excluded.home_hero_title,
         home_hero_description = excluded.home_hero_description,
         home_hero_banner_url = excluded.home_hero_banner_url,
         home_hero_banner_gallery_urls = excluded.home_hero_banner_gallery_urls,
         footer_description = excluded.footer_description,
         home_meta_title = excluded.home_meta_title,
         home_meta_description = excluded.home_meta_description,
         social_image_url = excluded.social_image_url,
         updated_at = excluded.updated_at`,
    )
    .bind(
      'default',
      settings.siteName,
      settings.supportEmail,
      settings.logoUrl || null,
      settings.faviconUrl || null,
      settings.homeHeroTitle,
      settings.homeHeroDescription,
      settings.homeHeroBannerUrl || null,
      settings.homeHeroBannerGalleryUrls || null,
      settings.footerDescription,
      settings.homeMetaTitle,
      settings.homeMetaDescription,
      settings.socialImageUrl || null,
      now,
    )
    .run();

  return settings;
};

const getPageContext = async (env: Bindings) => getContext(env, env.DB ? await loadSiteSettings(env.DB, env) : getDefaultSiteSettings(env));

const isTruthyFlag = (value: string | undefined | null) => {
  const normalized = toText(value).toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
};

const formatVndAmount = (amountUsd: number) => Math.max(0, Math.round((amountUsd * USD_TO_VND) / 1000) * 1000);
const formatVndLabel = (amountVnd: number) => `${moneyVnd.format(Math.max(0, Math.round(amountVnd / 1000) * 1000))}đ`;
const parseVndLabelToAmount = (value: string | null | undefined) => {
  const digits = toText(value).replace(/[^\d]/g, '');
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : null;
};
const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';
const toUsdFromVnd = (amountVnd: number) => Number((amountVnd / USD_TO_VND).toFixed(2));
const getSourcePriceUsd = (plan: Plan) => plan.sourcePriceUsd ?? plan.priceUsd;
const getSourcePriceVndAmount = (plan: Plan) => formatVndAmount(getSourcePriceUsd(plan));
const getEffectivePriceVndAmount = (plan: Plan) => parseVndLabelToAmount(plan.priceVnd) ?? formatVndAmount(plan.priceUsd);
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
const getAdminUsername = (env: Bindings) => env.ADMIN_USERNAME?.trim() || 'admin';
const hasAdminPassword = (env: Bindings) => Boolean(env.ADMIN_PASSWORD?.trim());
const isSecureRequest = (request: Request) => new URL(request.url).protocol === 'https:';
const formatDateTimeDisplay = (value: string | null | undefined) =>
  value
    ? new Date(value).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: VIETNAM_TIMEZONE,
      })
    : '';

const getDayPassDiscount = (_days: number) => ({ rate: 0 });

const getPlanAmountUsd = (plan: Plan, periodNum: number | null) => {
  if (!plan.periodRequired) {
    return Number(plan.priceUsd.toFixed(2));
  }

  const safeDays = Math.max(1, Math.min(DAY_PASS_MAX_DAYS, Math.round(periodNum ?? 7)));
  const discount = getDayPassDiscount(safeDays);
  return Number((plan.priceUsd * safeDays * (1 - discount.rate)).toFixed(2));
};

const getSourcePlanAmountUsd = (plan: Plan, periodNum: number | null) => {
  const sourcePriceUsd = getSourcePriceUsd(plan);
  if (!plan.periodRequired) {
    return Number(sourcePriceUsd.toFixed(2));
  }

  const safeDays = Math.max(1, Math.min(DAY_PASS_MAX_DAYS, Math.round(periodNum ?? 7)));
  const discount = getDayPassDiscount(safeDays);
  return Number((sourcePriceUsd * safeDays * (1 - discount.rate)).toFixed(2));
};

const DAY_MS = 24 * 60 * 60 * 1000;
const VIETNAM_UTC_OFFSET_MS = 7 * 60 * 60 * 1000;

const getVietnamDayStart = (date = new Date()) => {
  const vietnamMs = date.getTime() + VIETNAM_UTC_OFFSET_MS;
  const dayStartVietnamMs = Math.floor(vietnamMs / DAY_MS) * DAY_MS;
  return new Date(dayStartVietnamMs - VIETNAM_UTC_OFFSET_MS);
};

const toAmountVnd = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.round(value);
  }

  const digits = toText(value).replace(/[^\d]/g, '');
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeReferenceCandidate = (value: string) => toText(value).toUpperCase().replace(/[^A-Z0-9]/g, '');

const extractRouteReference = (prefix: string, ...values: string[]) => {
  for (const value of values) {
    const candidates = [toText(value).toUpperCase(), normalizeReferenceCandidate(value)];
    for (const candidate of candidates) {
      const match = candidate.match(new RegExp(`${prefix}([A-Z0-9]{8})`));
      if (match?.[1]) {
        return `${prefix}-${match[1]}`;
      }
    }
  }
  return '';
};

const extractRoutePaymentCode = (prefix: string, suffixPattern: string, ...values: string[]) => {
  for (const value of values) {
    const candidates = [toText(value).toUpperCase(), normalizeReferenceCandidate(value)];
    for (const candidate of candidates) {
      const match = candidate.match(new RegExp(`${prefix}(${suffixPattern})`));
      if (match?.[1]) {
        return `${prefix}${match[1]}`;
      }
    }
  }
  return '';
};

const extractOrderReference = (...values: string[]) => {
  return extractRouteReference('ECN', ...values);
};

const extractPaymentCode = (...values: string[]) => {
  return extractRoutePaymentCode('ESIMCN', '\\d{8}', ...values);
};

const extractNtaOrderReference = (...values: string[]) => {
  for (const value of values) {
    const candidate = toText(value).toUpperCase();
    const match = candidate.match(/(?:^|[^A-Z0-9])NTA[-_\s]*([A-Z0-9]{8})(?=$|[^A-Z0-9])/);
    if (match?.[1]) {
      return `NTA-${match[1]}`;
    }
  }
  return '';
};
const extractNtaPaymentCode = (...values: string[]) => extractRoutePaymentCode('ESIMNTA', '[A-Z0-9]{8}', ...values);

const getWebhookRouteKey = (...values: string[]) => {
  if (extractOrderReference(...values) || extractPaymentCode(...values)) {
    return 'esimcn';
  }
  if (extractNtaOrderReference(...values) || extractNtaPaymentCode(...values)) {
    return 'nta';
  }
  return '';
};

const normalizePhoneDigits = (value: string) => toText(value).replace(/[^\d]/g, '');
const normalizeAccountNumber = (value: string) => toText(value).replace(/[^\d]/g, '');

const getPhoneCandidates = (value: string) => {
  const digits = normalizePhoneDigits(value);
  const candidates = new Set<string>();

  if (!digits) {
    return candidates;
  }

  candidates.add(digits);
  if (digits.startsWith('84') && digits.length > 2) {
    candidates.add(`0${digits.slice(2)}`);
  }
  if (digits.startsWith('0') && digits.length > 1) {
    candidates.add(`84${digits.slice(1)}`);
  }

  return candidates;
};

const phonesMatch = (left: string, right: string) => {
  const leftCandidates = getPhoneCandidates(left);
  const rightCandidates = getPhoneCandidates(right);

  if (!leftCandidates.size || !rightCandidates.size) {
    return false;
  }

  for (const candidate of leftCandidates) {
    if (rightCandidates.has(candidate)) {
      return true;
    }
  }

  return false;
};

const accountNumbersMatch = (expected: string, provided: string) => {
  const normalizedExpected = normalizeAccountNumber(expected);
  const normalizedProvided = normalizeAccountNumber(provided);
  return Boolean(normalizedExpected && normalizedProvided && normalizedExpected === normalizedProvided);
};

const resolveLookupReference = (value: string) => {
  const normalized = toText(value).toUpperCase();
  if (!normalized) {
    return '';
  }

  const extracted = extractOrderReference(normalized);
  if (extracted) {
    return extracted;
  }

  if (/^[A-Z0-9]{8}$/.test(normalized)) {
    return `ECN-${normalized}`;
  }

  return normalized;
};

const buildPaymentCode = () => {
  let digits = '';
  while (digits.length < 8) {
    digits += crypto.randomUUID().replace(/\D/g, '');
  }
  return `ESIMCN${digits.slice(0, 8)}`;
};

const buildOrderAccessToken = () => `${crypto.randomUUID().replaceAll('-', '')}${crypto.randomUUID().replaceAll('-', '')}`;
const buildAdminCsrfToken = () => crypto.randomUUID().replaceAll('-', '');
const buildCustomerSessionId = () => `${crypto.randomUUID().replaceAll('-', '')}${crypto.randomUUID().replaceAll('-', '')}`;
const getOrderAccessToken = (request: Request) => new URL(request.url).searchParams.get(ORDER_ACCESS_TOKEN_PARAM)?.trim() || '';
const withOrderAccessToken = (path: string, accessToken: string) => {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}${ORDER_ACCESS_TOKEN_PARAM}=${encodeURIComponent(accessToken)}`;
};
const buildPaymentPath = (reference: string, accessToken: string) => withOrderAccessToken(`/thanh-toan/${reference}`, accessToken);
const buildPaymentSuccessPath = (reference: string, accessToken: string) =>
  withOrderAccessToken(`/thanh-toan-thanh-cong/${reference}`, accessToken);
const getClientIp = (request: Request) =>
  request.headers.get('cf-connecting-ip')?.trim() ||
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  'unknown';
const normalizeEmail = (value: string) => toText(value).toLowerCase();
const getPhoneLast4 = (value: string) => normalizePhoneDigits(value).slice(-4);
const getAdminCsrfCookie = (request: Request) => getCookieValue(request, ADMIN_CSRF_COOKIE_NAME);
const getAdminCsrfField = async (request: Request) => toText((await parsePayload(request)).csrfToken);
const getOrCreateAdminCsrfToken = (request: Request) => {
  const existing = getAdminCsrfCookie(request);
  if (existing) {
    return { token: existing, needsSetCookie: false };
  }
  return { token: buildAdminCsrfToken(), needsSetCookie: true };
};
const appendAdminCsrfCookie = (request: Request, response: Response, token: string) =>
  appendCookie(
    response,
    serializeCookie(ADMIN_CSRF_COOKIE_NAME, token, {
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      path: '/',
      httpOnly: false,
      secure: isSecureRequest(request),
      sameSite: 'Strict',
    }),
  );

const buildAppleEsimInstallUrl = (activationCode: string) =>
  `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${encodeURIComponent(activationCode)}`;

const buildAndroidEsimInstallUrl = (activationCode: string) =>
  `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=${encodeURIComponent(activationCode)}`;

const formatDataAmount = (bytes: number | null | undefined) => {
  if (!bytes || bytes <= 0) {
    return '0MB';
  }

  if (bytes >= GB) {
    const value = bytes / GB;
    return `${Number.isInteger(value) ? value : Number(value.toFixed(1))}GB`;
  }

  return `${Math.max(1, Math.round(bytes / MB))}MB`;
};

const formatDuration = (duration: number | null | undefined, unit: string | null | undefined) => {
  if (!duration || duration <= 0) {
    return 'Không rõ thời hạn';
  }

  const normalizedUnit = (unit || '').toUpperCase();
  if (normalizedUnit === 'DAY') {
    return `${duration} ngày`;
  }

  return `${duration} ${unit || ''}`.trim();
};

const formatDateTimeLabel = (value: string | null | undefined) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: VIETNAM_TIMEZONE,
  });
};

const formatEmailSender = (value: string, fallbackAddress: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return `eSIM CN <${fallbackAddress}>`;
  }
  return trimmed.includes('<') ? trimmed : `eSIM CN <${trimmed}>`;
};

const addColumnIfMissing = async (db: D1Database, statement: string) => {
  try {
    await db.prepare(statement).run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes('duplicate column name') && !message.includes('already exists')) {
      throw error;
    }
  }
};

const ensurePricingSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS pricing_overrides (
        plan_slug TEXT PRIMARY KEY,
        override_price_vnd INTEGER NOT NULL,
        override_price_usd REAL,
        note TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare('CREATE INDEX IF NOT EXISTS pricing_overrides_updated_at_idx ON pricing_overrides(updated_at DESC)').run();
};

const ensureSiteSettingsSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY,
        site_name TEXT,
        support_email TEXT,
        logo_url TEXT,
        favicon_url TEXT,
        home_hero_title TEXT,
        home_hero_description TEXT,
        home_hero_banner_url TEXT,
        home_hero_banner_gallery_urls TEXT,
        footer_description TEXT,
        home_meta_title TEXT,
        home_meta_description TEXT,
        social_image_url TEXT,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN site_name TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN support_email TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN logo_url TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN favicon_url TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN home_hero_title TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN home_hero_description TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN home_hero_banner_url TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN home_hero_banner_gallery_urls TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN footer_description TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN home_meta_title TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN home_meta_description TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN social_image_url TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE site_settings ADD COLUMN updated_at TEXT');
};

const ensureSiteAssetsSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS site_assets (
        asset_key TEXT PRIMARY KEY,
        field TEXT NOT NULL,
        filename TEXT,
        content_type TEXT NOT NULL,
        content BLOB NOT NULL,
        size INTEGER NOT NULL,
        uploaded_by TEXT,
        created_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare('CREATE INDEX IF NOT EXISTS site_assets_field_idx ON site_assets(field, created_at DESC)').run();
};

const ensureAdminSessionSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare('CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx ON admin_sessions(expires_at)').run();
};

const ensureAdminLoginAttemptSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS admin_login_attempts (
        ip TEXT PRIMARY KEY,
        attempts INTEGER NOT NULL,
        first_attempt_at TEXT NOT NULL,
        blocked_until TEXT,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
};

const ensureCustomerAccessSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS customer_login_tokens (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        phone_last4 TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        used_at TEXT,
        requested_ip TEXT
      )`,
    )
    .run();
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS customer_sessions (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        phone_last4 TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare('CREATE INDEX IF NOT EXISTS customer_login_tokens_email_idx ON customer_login_tokens(email, created_at DESC)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS customer_sessions_email_idx ON customer_sessions(email, created_at DESC)').run();
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS customer_magic_link_attempts (
        key TEXT PRIMARY KEY,
        attempts INTEGER NOT NULL,
        first_attempt_at TEXT NOT NULL,
        blocked_until TEXT,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
};

const ensureApiProtectionSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS api_request_limits (
        key TEXT PRIMARY KEY,
        hits INTEGER NOT NULL,
        window_started_at TEXT NOT NULL,
        blocked_until TEXT,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare('CREATE INDEX IF NOT EXISTS api_request_limits_updated_at_idx ON api_request_limits(updated_at DESC)').run();
};

const ensureOrderSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        access_token TEXT,
        full_name TEXT NOT NULL,
        phone TEXT,
        email TEXT NOT NULL,
        whatsapp TEXT,
        country TEXT,
        arrival_date TEXT,
        plan_slug TEXT NOT NULL,
        plan_name TEXT,
        package_code TEXT,
        quantity INTEGER,
        payment_code TEXT,
        period_num INTEGER,
        amount_usd REAL,
        amount_vnd INTEGER,
        payment_status TEXT,
        payment_ref TEXT,
        payment_note TEXT,
        payment_amount INTEGER,
        paid_at TEXT,
        payment_email_status TEXT,
        payment_email_sent_at TEXT,
        payment_email_id TEXT,
        payment_email_error TEXT,
        access_transaction_id TEXT,
        access_order_no TEXT,
        access_order_status TEXT,
        access_ordered_at TEXT,
        access_sync_status TEXT,
        access_sync_error TEXT,
        access_synced_at TEXT,
        access_esim_tran_no TEXT,
        access_iccid TEXT,
        access_ac TEXT,
        access_qr_code_url TEXT,
        access_short_url TEXT,
        access_smdp_status TEXT,
        access_eid TEXT,
        access_apn TEXT,
        access_pin TEXT,
        access_puk TEXT,
        access_activate_time TEXT,
        access_installation_time TEXT,
        access_expired_time TEXT,
        access_raw TEXT,
        access_esim_email_status TEXT,
        access_esim_email_sent_at TEXT,
        access_esim_email_id TEXT,
        access_esim_email_error TEXT,
        notes TEXT,
        catalog_source TEXT,
        source TEXT NOT NULL DEFAULT 'landing-page',
        created_at TEXT NOT NULL
      )`,
    )
    .run();

  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN plan_name TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN package_code TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN quantity INTEGER');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_code TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN period_num INTEGER');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN amount_usd REAL');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN amount_vnd INTEGER');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_status TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_ref TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_note TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_amount INTEGER');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN paid_at TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_email_status TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_email_sent_at TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_email_id TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN payment_email_error TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_transaction_id TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_order_no TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_order_status TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_ordered_at TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_sync_status TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_sync_error TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_synced_at TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_esim_tran_no TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_iccid TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_ac TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_qr_code_url TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_short_url TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_smdp_status TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_eid TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_apn TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_pin TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_puk TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_activate_time TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_installation_time TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_expired_time TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_raw TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_esim_email_status TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_esim_email_sent_at TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_esim_email_id TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_esim_email_error TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN access_token TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN catalog_source TEXT');
  await addColumnIfMissing(db, 'ALTER TABLE orders ADD COLUMN phone TEXT');
  await db.prepare('CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS orders_plan_slug_idx ON orders(plan_slug)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS orders_payment_code_idx ON orders(payment_code)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS orders_access_order_no_idx ON orders(access_order_no)').run();
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS payment_webhook_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        received_at TEXT NOT NULL,
        ref_no TEXT,
        description TEXT,
        amount_vnd INTEGER,
        account_number TEXT,
        matched_reference TEXT,
        match_status TEXT NOT NULL,
        reason TEXT,
        raw_payload TEXT
      )`,
    )
    .run();
  await db
    .prepare('CREATE INDEX IF NOT EXISTS payment_webhook_events_received_at_idx ON payment_webhook_events(received_at DESC)')
    .run();
};

const ensureOrderAccessToken = async (db: D1Database, order: StoredOrder) => {
  if (order.access_token?.trim()) {
    return order;
  }

  const accessToken = buildOrderAccessToken();
  await db.prepare('UPDATE orders SET access_token = ? WHERE id = ?').bind(accessToken, order.id).run();
  return {
    ...order,
    access_token: accessToken,
  };
};

const validateAdminCsrf = (request: Request, payload: Record<string, unknown>) => {
  const cookieToken = getAdminCsrfCookie(request);
  const fieldToken = toText(payload.csrfToken);
  return Boolean(cookieToken && fieldToken && cookieToken === fieldToken);
};

const deleteExpiredCustomerAccess = async (db: D1Database) => {
  const now = new Date().toISOString();
  await ensureCustomerAccessSchema(db);
  await db.prepare('DELETE FROM customer_login_tokens WHERE expires_at <= ? OR used_at IS NOT NULL').bind(now).run();
  await db.prepare('DELETE FROM customer_sessions WHERE expires_at <= ?').bind(now).run();
  await db.prepare('DELETE FROM customer_magic_link_attempts WHERE blocked_until IS NOT NULL AND blocked_until <= ?').bind(now).run();
};

const getApiRequestLimitState = async (db: D1Database, key: string) => {
  await ensureApiProtectionSchema(db);
  return db
    .prepare(
      `SELECT key, hits, window_started_at, blocked_until, updated_at
       FROM api_request_limits
       WHERE key = ?`,
    )
    .bind(key)
    .first<ApiRequestLimitRecord>();
};

const clearApiRequestLimit = async (db: D1Database, key: string) => {
  await ensureApiProtectionSchema(db);
  await db.prepare('DELETE FROM api_request_limits WHERE key = ?').bind(key).run();
};

const consumeApiRequestLimit = async (
  db: D1Database,
  key: string,
  maxHits: number,
  windowMs: number,
  blockMs: number,
) => {
  const now = new Date();
  const nowIso = now.toISOString();
  const current = await getApiRequestLimitState(db, key);

  if (current?.blocked_until) {
    const blockedUntilMs = new Date(current.blocked_until).getTime();
    if (Number.isFinite(blockedUntilMs) && blockedUntilMs > now.getTime()) {
      return {
        blocked: true,
        blockedUntil: current.blocked_until,
        hits: current.hits,
      } as const;
    }
    await clearApiRequestLimit(db, key);
  }

  const inWindow =
    current && now.getTime() - new Date(current.window_started_at).getTime() <= windowMs;
  const hits = inWindow ? current.hits + 1 : 1;
  const windowStartedAt = inWindow ? current.window_started_at : nowIso;
  const blockedUntil = hits > maxHits ? new Date(now.getTime() + blockMs).toISOString() : null;

  await db
    .prepare(
      `INSERT INTO api_request_limits (key, hits, window_started_at, blocked_until, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET
         hits = excluded.hits,
         window_started_at = excluded.window_started_at,
         blocked_until = excluded.blocked_until,
         updated_at = excluded.updated_at`,
    )
    .bind(key, hits, windowStartedAt, blockedUntil, nowIso)
    .run();

  return {
    blocked: Boolean(blockedUntil),
    blockedUntil,
    hits,
  } as const;
};

const getCustomerMagicLinkAttemptState = async (db: D1Database, key: string) => {
  await ensureCustomerAccessSchema(db);
  return db
    .prepare(
      `SELECT key, attempts, first_attempt_at, blocked_until, updated_at
       FROM customer_magic_link_attempts
       WHERE key = ?`,
    )
    .bind(key)
    .first<CustomerMagicLinkAttemptRecord>();
};

const clearCustomerMagicLinkAttempts = async (db: D1Database, key: string) => {
  await ensureCustomerAccessSchema(db);
  await db.prepare('DELETE FROM customer_magic_link_attempts WHERE key = ?').bind(key).run();
};

const recordCustomerMagicLinkAttempt = async (db: D1Database, key: string) => {
  const now = new Date();
  const nowIso = now.toISOString();
  const current = await getCustomerMagicLinkAttemptState(db, key);
  const firstAttemptAt =
    current && now.getTime() - new Date(current.first_attempt_at).getTime() <= CUSTOMER_MAGIC_LINK_WINDOW_MS
      ? current.first_attempt_at
      : nowIso;
  const attempts =
    current && now.getTime() - new Date(firstAttemptAt).getTime() <= CUSTOMER_MAGIC_LINK_WINDOW_MS
      ? current.attempts + 1
      : 1;
  const blockedUntil =
    attempts >= CUSTOMER_MAGIC_LINK_MAX_ATTEMPTS ? new Date(now.getTime() + CUSTOMER_MAGIC_LINK_BLOCK_MS).toISOString() : null;

  await db
    .prepare(
      `INSERT INTO customer_magic_link_attempts (key, attempts, first_attempt_at, blocked_until, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET
         attempts = excluded.attempts,
         first_attempt_at = excluded.first_attempt_at,
         blocked_until = excluded.blocked_until,
         updated_at = excluded.updated_at`,
    )
    .bind(key, attempts, firstAttemptAt, blockedUntil, nowIso)
    .run();

  return { attempts, blockedUntil };
};

const getCustomerMagicLinkBlock = async (db: D1Database, key: string) => {
  const state = await getCustomerMagicLinkAttemptState(db, key);
  if (!state?.blocked_until) {
    return null;
  }

  const blockedUntilMs = new Date(state.blocked_until).getTime();
  if (!Number.isFinite(blockedUntilMs) || blockedUntilMs <= Date.now()) {
    await clearCustomerMagicLinkAttempts(db, key);
    return null;
  }

  return state.blocked_until;
};

const createCustomerLoginToken = async (db: D1Database, email: string, phoneLast4: string, requestedIp: string) => {
  await deleteExpiredCustomerAccess(db);
  const id = buildCustomerSessionId();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + CUSTOMER_LOGIN_TOKEN_TTL_MS).toISOString();
  await db
    .prepare(
      `INSERT INTO customer_login_tokens (id, email, phone_last4, created_at, expires_at, used_at, requested_ip)
       VALUES (?, ?, ?, ?, ?, NULL, ?)`,
    )
    .bind(id, email, phoneLast4, createdAt, expiresAt, requestedIp)
    .run();
  return { id, createdAt, expiresAt };
};

const createCustomerSession = async (db: D1Database, email: string, phoneLast4: string) => {
  await deleteExpiredCustomerAccess(db);
  const id = buildCustomerSessionId();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + CUSTOMER_SESSION_MAX_AGE_SECONDS * 1000).toISOString();
  await db
    .prepare(
      `INSERT INTO customer_sessions (id, email, phone_last4, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(id, email, phoneLast4, createdAt, expiresAt)
    .run();
  return { id, createdAt, expiresAt };
};

const extendCustomerSession = async (db: D1Database, sessionId: string) => {
  const expiresAt = new Date(Date.now() + CUSTOMER_SESSION_MAX_AGE_SECONDS * 1000).toISOString();
  await db.prepare('UPDATE customer_sessions SET expires_at = ? WHERE id = ?').bind(expiresAt, sessionId).run();
  return expiresAt;
};

const consumeCustomerLoginToken = async (db: D1Database, tokenId: string) => {
  await deleteExpiredCustomerAccess(db);
  const token = await db
    .prepare(
      `SELECT id, email, phone_last4, created_at, expires_at, used_at, requested_ip
       FROM customer_login_tokens
       WHERE id = ? AND expires_at > ? AND used_at IS NULL`,
    )
    .bind(tokenId, new Date().toISOString())
    .first<CustomerLoginTokenRecord>();
  if (!token) {
    return null;
  }
  await db.prepare('UPDATE customer_login_tokens SET used_at = ? WHERE id = ?').bind(new Date().toISOString(), tokenId).run();
  return token;
};

const getValidCustomerSession = async (db: D1Database, request: Request) => {
  await deleteExpiredCustomerAccess(db);
  const sessionId = getCookieValue(request, CUSTOMER_SESSION_COOKIE_NAME);
  if (!sessionId) {
    return null;
  }
  const session = await db
    .prepare(
      `SELECT id, email, phone_last4, created_at, expires_at
       FROM customer_sessions
       WHERE id = ? AND expires_at > ?`,
    )
    .bind(sessionId, new Date().toISOString())
    .first<CustomerSessionRecord>();
  if (!session) {
    return null;
  }
  const expiresAt = await extendCustomerSession(db, session.id);
  return {
    ...session,
    expires_at: expiresAt,
  };
};

const deleteCustomerSession = async (db: D1Database, request: Request) => {
  const sessionId = getCookieValue(request, CUSTOMER_SESSION_COOKIE_NAME);
  if (!sessionId) {
    return;
  }
  await ensureCustomerAccessSchema(db);
  await db.prepare('DELETE FROM customer_sessions WHERE id = ?').bind(sessionId).run();
};

const appendCustomerSessionCookie = (request: Request, response: Response, sessionId: string) =>
  appendCookie(
    response,
    serializeCookie(CUSTOMER_SESSION_COOKIE_NAME, sessionId, {
      maxAge: CUSTOMER_SESSION_MAX_AGE_SECONDS,
      path: '/',
      httpOnly: true,
      secure: isSecureRequest(request),
      sameSite: 'Strict',
    }),
  );

const updatePaymentEmailState = async (
  db: D1Database,
  reference: string,
  state: {
    status: string;
    sentAt?: string | null;
    emailId?: string | null;
    error?: string | null;
  },
) => {
  await db
    .prepare(
      `UPDATE orders
       SET payment_email_status = ?, payment_email_sent_at = ?, payment_email_id = ?, payment_email_error = ?
       WHERE id = ?`,
    )
    .bind(state.status, state.sentAt ?? null, state.emailId ?? null, state.error ?? null, reference)
    .run();
};

const recordPaymentWebhookEvent = async (
  db: D1Database,
  payload: Record<string, unknown>,
  event: {
    refNo: string;
    description: string;
    amountVnd: number | null;
    accountNumber: string;
    matchedReference: string;
    matchStatus: string;
    reason: string;
  },
) => {
  await db
    .prepare(
      `INSERT INTO payment_webhook_events (
        received_at, ref_no, description, amount_vnd, account_number, matched_reference, match_status, reason, raw_payload
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      new Date().toISOString(),
      event.refNo || null,
      event.description || null,
      event.amountVnd,
      event.accountNumber || null,
      event.matchedReference || null,
      event.matchStatus,
      event.reason || null,
      JSON.stringify(payload),
    )
    .run();
};

const updateEsimEmailState = async (
  db: D1Database,
  reference: string,
  state: {
    status: string;
    sentAt?: string | null;
    emailId?: string | null;
    error?: string | null;
  },
) => {
  await db
    .prepare(
      `UPDATE orders
       SET access_esim_email_status = ?, access_esim_email_sent_at = ?, access_esim_email_id = ?, access_esim_email_error = ?
       WHERE id = ?`,
    )
    .bind(state.status, state.sentAt ?? null, state.emailId ?? null, state.error ?? null, reference)
    .run();
};

const getStoredOrder = async (db: D1Database, reference: string) =>
  db.prepare(ORDER_SELECT_SQL).bind(reference).first<StoredOrder>();

const getStoredOrderByPaymentCode = async (db: D1Database, paymentCode: string) =>
  db.prepare(ORDER_SELECT_BY_PAYMENT_CODE_SQL).bind(paymentCode).first<StoredOrder>();

const getAuthorizedOrder = async (db: D1Database, request: Request, reference: string) => {
  const order = await getStoredOrder(db, reference);
  if (!order) {
    return null;
  }

  const normalizedOrder = await ensureOrderAccessToken(db, order);
  const providedToken = getOrderAccessToken(request);
  if (!providedToken || providedToken !== normalizedOrder.access_token) {
    return null;
  }

  return normalizedOrder;
};

const loadPricingOverrides = async (db?: D1Database) => {
  if (!db) {
    return new Map<string, PricingOverrideRecord>();
  }

  await ensurePricingSchema(db);
  const result = await db
    .prepare(
      `SELECT plan_slug, override_price_vnd, override_price_usd, note, updated_at
       FROM pricing_overrides`,
    )
    .all<PricingOverrideRecord>();

  return new Map((result.results ?? []).map((item) => [item.plan_slug, item]));
};

const applyPricingOverrides = (
  planList: Plan[],
  overrides: Map<string, PricingOverrideRecord>,
  options: { includeSourcePrices?: boolean } = {},
) =>
  planList.map((plan) => {
    const override = overrides.get(plan.slug);
    const sourcePriceUsd = getSourcePriceUsd(plan);
    const sourcePriceVnd = plan.sourcePriceVnd ?? plan.priceVnd;
    const nextPlan: Plan = override
      ? {
          ...plan,
          priceUsd: typeof override.override_price_usd === 'number' && Number.isFinite(override.override_price_usd)
            ? Number(override.override_price_usd.toFixed(2))
            : toUsdFromVnd(override.override_price_vnd),
          priceVnd: formatVndLabel(override.override_price_vnd),
        }
      : { ...plan };

    if (!options.includeSourcePrices) {
      return nextPlan;
    }

    return {
      ...nextPlan,
      sourcePriceUsd,
      sourcePriceVnd,
      priceOverrideVnd: override?.override_price_vnd ?? null,
      priceOverrideNote: override?.note ?? null,
      priceOverrideUpdatedAt: override?.updated_at ?? null,
    };
  });

const deleteExpiredAdminSessions = async (db: D1Database) => {
  await ensureAdminSessionSchema(db);
  await db.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(new Date().toISOString()).run();
};

const getAdminLoginAttemptState = async (db: D1Database, ip: string) => {
  await ensureAdminLoginAttemptSchema(db);
  return db.prepare('SELECT ip, attempts, first_attempt_at, blocked_until, updated_at FROM admin_login_attempts WHERE ip = ?').bind(ip).first<AdminLoginAttemptRecord>();
};

const clearAdminLoginAttempts = async (db: D1Database, ip: string) => {
  await ensureAdminLoginAttemptSchema(db);
  await db.prepare('DELETE FROM admin_login_attempts WHERE ip = ?').bind(ip).run();
};

const recordAdminLoginFailure = async (db: D1Database, ip: string) => {
  const now = new Date();
  const nowIso = now.toISOString();
  const current = await getAdminLoginAttemptState(db, ip);
  const firstAttemptAt =
    current && now.getTime() - new Date(current.first_attempt_at).getTime() <= ADMIN_LOGIN_WINDOW_MS
      ? current.first_attempt_at
      : nowIso;
  const attempts =
    current && now.getTime() - new Date(firstAttemptAt).getTime() <= ADMIN_LOGIN_WINDOW_MS
      ? current.attempts + 1
      : 1;
  const blockedUntil =
    attempts >= ADMIN_LOGIN_MAX_ATTEMPTS ? new Date(now.getTime() + ADMIN_LOGIN_BLOCK_MS).toISOString() : null;

  await db
    .prepare(
      `INSERT INTO admin_login_attempts (ip, attempts, first_attempt_at, blocked_until, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(ip) DO UPDATE SET
         attempts = excluded.attempts,
         first_attempt_at = excluded.first_attempt_at,
         blocked_until = excluded.blocked_until,
         updated_at = excluded.updated_at`,
    )
    .bind(ip, attempts, firstAttemptAt, blockedUntil, nowIso)
    .run();

  return { attempts, blockedUntil };
};

const getAdminLoginBlock = async (db: D1Database, ip: string) => {
  const state = await getAdminLoginAttemptState(db, ip);
  if (!state?.blocked_until) {
    return null;
  }

  const blockedUntilMs = new Date(state.blocked_until).getTime();
  if (!Number.isFinite(blockedUntilMs) || blockedUntilMs <= Date.now()) {
    await clearAdminLoginAttempts(db, ip);
    return null;
  }

  return state.blocked_until;
};

const getValidAdminSession = async (db: D1Database, request: Request) => {
  await deleteExpiredAdminSessions(db);
  const sessionId = getCookieValue(request, ADMIN_SESSION_COOKIE_NAME);
  if (!sessionId) {
    return null;
  }

  return db
    .prepare(
      `SELECT id, username, created_at, expires_at
       FROM admin_sessions
       WHERE id = ? AND expires_at > ?`,
    )
    .bind(sessionId, new Date().toISOString())
    .first<AdminSessionRecord>();
};

const createAdminSession = async (db: D1Database, username: string) => {
  await ensureAdminSessionSchema(db);
  const id = crypto.randomUUID().replaceAll('-', '');
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000).toISOString();
  await db
    .prepare(
      `INSERT INTO admin_sessions (
        id, username, created_at, expires_at
      ) VALUES (?, ?, ?, ?)`,
    )
    .bind(id, username, createdAt, expiresAt)
    .run();
  return { id, createdAt, expiresAt };
};

const deleteAdminSession = async (db: D1Database, request: Request) => {
  const sessionId = getCookieValue(request, ADMIN_SESSION_COOKIE_NAME);
  if (!sessionId) {
    return;
  }
  await ensureAdminSessionSchema(db);
  await db.prepare('DELETE FROM admin_sessions WHERE id = ?').bind(sessionId).run();
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formatRetryAfterSeconds = (blockedUntil: string | null) => {
  if (!blockedUntil) {
    return 60;
  }
  const seconds = Math.ceil((new Date(blockedUntil).getTime() - Date.now()) / 1000);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 60;
};

const getEsimAccessError = (payload: EsimAccessApiResponse) =>
  payload.errorMessage || payload.errorMsg || payload.errorCode || 'eSIMAccess request failed';

const postEsimAccess = async <T extends EsimAccessApiResponse>(
  env: Bindings,
  pathname: string,
  body: Record<string, unknown>,
) => {
  const accessCode = env.ESIM_ACCESS_CODE?.trim() || '';
  if (!accessCode) {
    throw new Error('Thiếu ESIM_ACCESS_CODE trên worker.');
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort('esimaccess_timeout'), ESIM_ACCESS_API_TIMEOUT_MS);
  let response: Response;

  try {
    response = await fetch(`${ESIM_ACCESS_API_BASE}${pathname}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'RT-AccessCode': accessCode,
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`eSIMAccess ${pathname} timed out`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`eSIMAccess ${pathname} failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

const enforceEsimAccessRouteLimit = async (db: D1Database, request: Request, scope: string, reference: string) => {
  const key = `${scope}:${reference}:${getClientIp(request)}`;
  return consumeApiRequestLimit(
    db,
    key,
    ESIM_ACCESS_STATUS_MAX_HITS,
    ESIM_ACCESS_STATUS_WINDOW_MS,
    ESIM_ACCESS_STATUS_BLOCK_MS,
  );
};

const shouldDeferProvision = async (db: D1Database, reference: string) => {
  const result = await consumeApiRequestLimit(
    db,
    `esim-provision:${reference}`,
    1,
    ESIM_ACCESS_PROVISION_COOLDOWN_MS,
    ESIM_ACCESS_PROVISION_COOLDOWN_MS,
  );
  return result.blocked;
};

const createEsimAccessOrder = async (env: Bindings, order: StoredOrder) => {
  if (!order.package_code) {
    throw new Error('Đơn chưa có package_code để đặt eSIM thật.');
  }

  const transactionId = order.access_transaction_id?.trim() || order.id;
  const packageInfo: Record<string, unknown> = {
    packageCode: order.package_code,
    count: clampOrderQuantity(order.quantity),
  };

  if (typeof order.period_num === 'number' && Number.isFinite(order.period_num) && order.period_num > 0) {
    packageInfo.periodNum = Math.round(order.period_num);
  }

  const payload = await postEsimAccess<EsimAccessOrderResponse>(env, '/api/v1/open/esim/order', {
    transactionId,
    packageInfoList: [packageInfo],
  });

  if (!payload.success || !payload.obj?.orderNo) {
    throw new Error(getEsimAccessError(payload));
  }

  return {
    transactionId,
    orderNo: payload.obj.orderNo.trim(),
  };
};

const queryEsimAccessProfiles = async (env: Bindings, orderNo: string, expectedCount = 1) => {
  const pageSize = Math.max(20, Math.min(100, clampOrderQuantity(expectedCount)));
  const payload = await postEsimAccess<EsimAccessQueryResponse>(env, '/api/v1/open/esim/query', {
    orderNo,
    iccid: '',
    pager: {
      pageNum: 1,
      pageSize,
    },
  });

  const profiles = dedupeEsimProfiles(payload.obj?.esimList ?? []).filter((profile) => hasReadyEsimProfile(profile));

  if (payload.success && profiles.length >= clampOrderQuantity(expectedCount)) {
    return {
      status: 'ready' as const,
      profiles: profiles.slice(0, clampOrderQuantity(expectedCount)),
    };
  }

  if (payload.errorCode === '200010') {
    return {
      status: 'pending' as const,
      profiles: [],
    };
  }

  if (payload.success) {
    return {
      status: 'pending' as const,
      profiles,
    };
  }

  throw new Error(getEsimAccessError(payload));
};

const queryEsimAccessUsage = async (env: Bindings, iccid: string) => {
  const payload = await postEsimAccess<EsimAccessQueryResponse>(env, '/api/v1/open/esim/query', {
    orderNo: '',
    iccid,
    pager: {
      pageNum: 1,
      pageSize: 20,
    },
  });

  if (!payload.success || !payload.obj?.esimList || payload.obj.esimList.length === 0) {
    throw new Error(getEsimAccessError(payload));
  }

  return payload.obj.esimList.find((item) => item.iccid === iccid) ?? payload.obj.esimList[0] ?? null;
};

const listEsimAccessTopUps = async (env: Bindings, iccid: string) => {
  const payload = await postEsimAccess<EsimAccessPackageListResponse>(env, '/api/v1/open/package/list', {
    locationCode: '',
    type: 'TOPUP',
    packageCode: '',
    iccid,
  });

  if (!payload.success || !payload.obj?.packageList) {
    throw new Error(getEsimAccessError(payload));
  }

  return payload.obj.packageList
    .filter((item) => (item.packageCode || '').toUpperCase().startsWith('TOPUP_'))
    .sort((left, right) => (left.price ?? 0) - (right.price ?? 0));
};

const sendCustomerLoginLinkEmail = async (
  env: Bindings,
  payload: {
    email: string;
    phoneLast4: string;
    loginUrl: string;
  },
) => {
  const apiKey = env.RESEND_API_KEY?.trim() || '';
  const fallbackAddress = env.DEFAULT_SUPPORT_EMAIL?.trim() || 'support@esimcn.net';
  const from = formatEmailSender(env.PAYMENT_NOTIFY_FROM?.trim() || '', fallbackAddress);
  const replyTo = env.PAYMENT_NOTIFY_REPLY_TO?.trim() || fallbackAddress;

  if (!apiKey) {
    return { status: 'skipped', error: 'missing_resend_api_key' } as const;
  }

  const safeLoginUrl = escapeHtml(payload.loginUrl);
  const safePhoneLast4 = escapeHtml(payload.phoneLast4);
  const subject = 'Link đăng nhập để mở lại đơn eSIM';
  const html = `
    <div style="margin:0;padding:32px 16px;background:#fff5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#241b18">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #f3d9d2;border-radius:28px;overflow:hidden">
        <div style="padding:20px 24px;background:#ffffff;border-bottom:4px solid #ef5c48">
          <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#ef5c48;margin-bottom:8px">eSIM CN</div>
          <div style="font-size:28px;line-height:1.22;font-weight:800;color:#201614;margin-bottom:10px">Link đăng nhập một lần</div>
          <div style="font-size:15px;line-height:1.7;color:#654f49">Anh vừa yêu cầu mở lại đơn đã mua bằng email này và 4 số cuối số điện thoại <strong>${safePhoneLast4}</strong>.</div>
        </div>
        <div style="padding:24px">
          <div style="margin-bottom:18px;padding:18px 20px;border-radius:22px;background:#fff8f5;border:1px solid #f4d7d0;font-size:14px;line-height:1.75;color:#493833">
            Link này chỉ dùng một lần và sẽ hết hạn sau khoảng 30 phút. Nếu anh không yêu cầu, có thể bỏ qua email này.
          </div>
          <div style="text-align:center;margin-bottom:16px">
            <a href="${safeLoginUrl}" style="display:inline-block;min-width:220px;padding:15px 22px;border-radius:999px;background:#ef5c48;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800">Mở khu đơn của tôi</a>
          </div>
          <div style="font-size:13px;line-height:1.7;color:#654f49;word-break:break-all">Hoặc mở trực tiếp link này:<br/><span style="color:#201614">${safeLoginUrl}</span></div>
        </div>
      </div>
    </div>
  `;
  const text = [
    'Link dang nhap mo lai don eSIM',
    `4 so cuoi so dien thoai: ${payload.phoneLast4}`,
    `Mo link: ${payload.loginUrl}`,
    'Link chi dung 1 lan va het han sau khoang 30 phut.',
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [payload.email],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });

  const responsePayload = (await response.json().catch(() => ({}))) as { id?: string; message?: string; error?: unknown };
  if (!response.ok) {
    throw new Error(responsePayload.message || String(responsePayload.error || 'Không thể gửi link đăng nhập.'));
  }

  return {
    status: 'sent',
    sentAt: new Date().toISOString(),
    emailId: responsePayload.id ?? null,
  } as const;
};

const sendEsimReadyEmail = async (
  env: Bindings,
  delivery: {
    reference: string;
    accessToken: string;
    fullName: string;
    email: string;
    planTitle: string;
    amountVnd: number;
    paidAt: string;
    esims: Array<{
      qrCodeUrl: string;
      shortUrl: string;
      activationCode: string;
      iccid: string;
      apn: string;
      pin: string;
      puk: string;
    }>;
    topUpSupported?: boolean;
  },
) => {
  const apiKey = env.RESEND_API_KEY?.trim() || '';
  const fallbackAddress = env.DEFAULT_SUPPORT_EMAIL?.trim() || 'support@esimcn.net';
  const from = formatEmailSender(env.PAYMENT_NOTIFY_FROM?.trim() || '', fallbackAddress);
  const replyTo = env.PAYMENT_NOTIFY_REPLY_TO?.trim() || fallbackAddress;
  const notifyBcc = env.PAYMENT_NOTIFY_BCC?.trim() || '';
  const bccRecipients = notifyBcc && notifyBcc !== delivery.email ? [notifyBcc] : [];

  if (!apiKey) {
    return { status: 'skipped', error: 'missing_resend_api_key' } as const;
  }

  const esimCount = Math.max(1, delivery.esims.length);
  const primaryEsim = delivery.esims[0];
  if (!primaryEsim?.qrCodeUrl) {
    return { status: 'skipped', error: 'missing_qr_code' } as const;
  }

  const amountLabel = `${moneyVnd.format(delivery.amountVnd)}đ`;
  const paidLabel = new Date(delivery.paidAt).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const successUrl = `${(env.SITE_URL || `https://${brand.domain}`).replace(/\/$/, '')}${buildPaymentSuccessPath(delivery.reference, delivery.accessToken)}`;
  const portalUrl = `${(env.SITE_URL || `https://${brand.domain}`).replace(/\/$/, '')}/tra-cuu-don`;
  const appleInstallUrl = buildAppleEsimInstallUrl(primaryEsim.activationCode);
  const androidInstallUrl = buildAndroidEsimInstallUrl(primaryEsim.activationCode);
  const subject = `${delivery.planTitle} | ${esimCount > 1 ? `${esimCount} QR eSIM` : 'QR eSIM'} đã sẵn sàng`;
  const safeReference = escapeHtml(delivery.reference);
  const safeFullName = escapeHtml(delivery.fullName);
  const safePlanTitle = escapeHtml(delivery.planTitle);
  const safePaidLabel = escapeHtml(paidLabel);
  const safeAmountLabel = escapeHtml(amountLabel);
  const safeQrCodeUrl = escapeHtml(primaryEsim.qrCodeUrl);
  const safeShortUrl = escapeHtml(primaryEsim.shortUrl);
  const safeActivationCode = escapeHtml(primaryEsim.activationCode);
  const safeIccid = escapeHtml(primaryEsim.iccid);
  const safeApn = escapeHtml(primaryEsim.apn || 'Tự động');
  const safePin = escapeHtml(primaryEsim.pin || '-');
  const safePuk = escapeHtml(primaryEsim.puk || '-');
  const safeSuccessUrl = escapeHtml(successUrl);
  const safePortalUrl = escapeHtml(portalUrl);
  const safeAppleInstallUrl = escapeHtml(appleInstallUrl);
  const safeAndroidInstallUrl = escapeHtml(androidInstallUrl);
  const html = `
    <div style="margin:0;padding:32px 16px;background:#fff5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#241b18">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #f3d9d2;border-radius:28px;overflow:hidden">
        <div style="padding:20px 24px;background:#ffffff;border-bottom:4px solid #ef5c48">
          <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#ef5c48;margin-bottom:8px">eSIM CN</div>
          <div style="font-size:28px;line-height:1.22;font-weight:800;color:#201614;margin-bottom:10px">${esimCount > 1 ? `${esimCount} QR eSIM của anh đã sẵn sàng` : 'QR eSIM của anh đã sẵn sàng'}</div>
          <div style="font-size:15px;line-height:1.7;color:#654f49">Đơn <strong>${safeReference}</strong> đã được cấp eSIM thật. ${esimCount > 1 ? `Trang đơn đang hiển thị đủ <strong>${esimCount} QR</strong>; email này để sẵn QR đầu tiên để anh vào cài nhanh.` : 'Anh có thể quét QR, mở link cài đặt hoặc dùng mã kích hoạt bên dưới.'}</div>
        </div>
        <div style="padding:24px">
          <div style="margin-bottom:18px;padding:18px 20px;border:1px solid #f2d9d2;border-radius:22px;background:#ffffff">
            <div style="display:flex;flex-wrap:wrap;gap:12px 18px;align-items:flex-start;justify-content:space-between">
              <div>
                <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9e6f63;margin-bottom:6px">Mã đơn</div>
                <div style="font-size:24px;font-weight:800;color:#ef5c48">${safeReference}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9e6f63;margin-bottom:6px">Số tiền</div>
                <div style="font-size:24px;font-weight:800;color:#201614">${safeAmountLabel}</div>
              </div>
            </div>
            <div style="margin-top:14px;font-size:14px;line-height:1.7;color:#654f49">Khách hàng: <strong style="color:#201614">${safeFullName}</strong><br/>Gói: <strong style="color:#201614">${safePlanTitle}</strong><br/>Số eSIM: <strong style="color:#201614">${esimCount}</strong><br/>Thanh toán lúc: <strong style="color:#201614">${safePaidLabel}</strong></div>
          </div>
          <div style="margin-bottom:18px;padding:18px 20px;border:1px solid #f2d9d2;border-radius:22px;background:#fffdfd;text-align:center">
            <img src="${safeQrCodeUrl}" alt="QR eSIM ${safeReference}" style="display:block;width:min(100%,280px);margin:0 auto 16px;border-radius:20px;border:1px solid #f0dfd8;background:#fff" />
            <div style="font-size:13px;line-height:1.7;color:#654f49">${esimCount > 1 ? 'Đây là QR đầu tiên trong đơn. Mở trang đơn để xem đầy đủ tất cả QR và mã cài đặt.' : 'Quét QR để cài eSIM hoặc mở link cài đặt trực tiếp.'}</div>
          </div>
          <div style="margin-bottom:18px;border:1px solid #f2d9d2;border-radius:22px;background:#fffdfd;overflow:hidden">
            <div style="padding:14px 20px;background:#fff3ef;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#ef5c48">Thông tin eSIM thật</div>
            <div style="padding:6px 20px 10px">
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Link cài đặt</strong><span style="font-size:15px;line-height:1.6;color:#201614;word-break:break-all">${safeShortUrl}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Mã kích hoạt</strong><span style="font-size:15px;line-height:1.6;color:#201614;word-break:break-all">${safeActivationCode}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">ICCID</strong><span style="font-size:15px;line-height:1.6;color:#201614;word-break:break-all">${safeIccid}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">APN</strong><span style="font-size:15px;line-height:1.6;color:#201614;word-break:break-all">${safeApn}</span></div>
              <div style="padding:12px 0"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Mã PIN / PUK cài đặt</strong><span style="font-size:15px;line-height:1.6;color:#201614">${safePin} / ${safePuk}</span></div>
            </div>
          </div>
          <div style="margin-bottom:18px;padding:16px 18px;border:1px solid #f2d9d2;border-radius:20px;background:#fff8f5;font-size:14px;line-height:1.7;color:#654f49">
            Trên <a href="${safeSuccessUrl}" style="color:#ef5c48;font-weight:800;text-decoration:none">trang đơn</a>, anh có thể ${esimCount > 1 ? `<strong style="color:#201614">xem đủ ${esimCount} QR eSIM</strong> và mã cài đặt tương ứng của từng máy` : `<strong style="color:#201614">kiểm tra dung lượng còn lại</strong>${delivery.topUpSupported ? ' và <strong style="color:#201614">xem các gói nạp thêm</strong>' : ''}`}.
          </div>
          <div style="margin-bottom:18px;padding:16px 18px;border:1px solid #f2d9d2;border-radius:20px;background:#ffffff;font-size:14px;line-height:1.7;color:#654f49">
            Nếu sau này không còn link này, anh chỉ cần vào <a href="${safePortalUrl}" style="color:#ef5c48;font-weight:800;text-decoration:none">Đơn của tôi</a> và nhập email + 4 số cuối số điện thoại để nhận lại link đăng nhập. Không cần nhớ mật khẩu.
          </div>
          <div style="text-align:center">
            <a href="${safeAppleInstallUrl}" style="display:inline-block;min-width:180px;padding:15px 22px;border-radius:999px;background:#ef5c48;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;margin:0 6px 12px">Cài trên iPhone</a>
            <a href="${safeAndroidInstallUrl}" style="display:inline-block;min-width:180px;padding:15px 22px;border-radius:999px;background:#ffffff;color:#ef5c48;text-decoration:none;font-size:15px;font-weight:800;border:1px solid #ef5c48;margin:0 6px 12px">Cài trên Android</a>
            <a href="${safeSuccessUrl}" style="display:inline-block;min-width:180px;padding:15px 22px;border-radius:999px;background:#ffffff;color:#ef5c48;text-decoration:none;font-size:15px;font-weight:800;border:1px solid #ef5c48;margin:0 6px 12px">Xem trang đơn</a>
            <a href="${safePortalUrl}" style="display:inline-block;min-width:180px;padding:15px 22px;border-radius:999px;background:#ffffff;color:#ef5c48;text-decoration:none;font-size:15px;font-weight:800;border:1px solid #ef5c48;margin:0 6px 12px">Đơn của tôi</a>
          </div>
        </div>
      </div>
    </div>
  `;
  const text = [
    'QR eSIM da san sang',
    `Ma don: ${delivery.reference}`,
    `Goi: ${delivery.planTitle}`,
    `So eSIM: ${esimCount}`,
    `So tien: ${amountLabel}`,
    `Thanh toan luc: ${paidLabel}`,
    `Cai tren iPhone: ${appleInstallUrl}`,
    `Cai tren Android: ${androidInstallUrl}`,
    `Link cai dat: ${primaryEsim.shortUrl}`,
    `Ma kich hoat: ${primaryEsim.activationCode}`,
    `ICCID: ${primaryEsim.iccid}`,
    `APN: ${primaryEsim.apn || 'Tu dong'}`,
    `Ma PIN / PUK cai dat: ${primaryEsim.pin || '-'} / ${primaryEsim.puk || '-'}`,
    `Trang don: ${successUrl}`,
    esimCount > 1 ? `Xem du ${esimCount} QR trong trang don: ${successUrl}` : `Kiem tra dung luong: ${successUrl}`,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [delivery.email],
      reply_to: replyTo,
      bcc: bccRecipients.length > 0 ? bccRecipients : undefined,
      subject,
      html,
      text,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as { id?: string; message?: string; error?: unknown };
  if (!response.ok) {
    throw new Error(payload.message || String(payload.error || 'Không thể gửi email QR eSIM.'));
  }

  return {
    status: 'sent',
    sentAt: new Date().toISOString(),
    emailId: payload.id ?? null,
  } as const;
};

const provisionPaidOrder = async (env: Bindings, db: D1Database, reference: string) => {
  const storedOrder = await getStoredOrder(db, reference);
  const order = storedOrder ? await ensureOrderAccessToken(db, storedOrder) : null;
  if (!order || order.payment_status !== 'paid') {
    return { ready: false, status: 'skipped' as const, order };
  }

  const expectedProfiles = clampOrderQuantity(order.quantity);
  const existingProfiles = parseStoredEsimProfiles(order).filter((profile) => hasReadyEsimProfile(profile));
  if (existingProfiles.length >= expectedProfiles) {
    return { ready: true, status: 'ready' as const, order };
  }

  if (!order.package_code) {
    const error = 'Đơn đã thanh toán nhưng chưa có package_code để gọi eSIMAccess.';
    await db
      .prepare('UPDATE orders SET access_sync_status = ?, access_sync_error = ? WHERE id = ?')
      .bind('failed', error, reference)
      .run();
    return { ready: false, status: 'failed' as const, error };
  }

  try {
    let orderNo = order.access_order_no?.trim() || '';
    let createdOrder = false;

    if (!orderNo) {
      const created = await createEsimAccessOrder(env, order);
      createdOrder = true;
      orderNo = created.orderNo;
      await db
        .prepare(
          `UPDATE orders
           SET access_transaction_id = ?, access_order_no = ?, access_order_status = ?, access_ordered_at = ?, access_sync_status = ?, access_sync_error = NULL
           WHERE id = ?`,
        )
        .bind(created.transactionId, orderNo, 'ORDER_CREATED', new Date().toISOString(), 'ordered', reference)
        .run();
    }

    let readyProfiles: EsimAccessProfile[] = [];
    const maxAttempts = createdOrder ? 6 : 2;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const result = await queryEsimAccessProfiles(env, orderNo, expectedProfiles);
      if (result.status === 'ready' && result.profiles.length >= expectedProfiles) {
        readyProfiles = result.profiles.slice(0, expectedProfiles);
        break;
      }
      if (attempt < maxAttempts - 1) {
        await sleep(createdOrder ? 3000 : 1200);
      }
    }

    if (readyProfiles.length < expectedProfiles) {
      await db
        .prepare(
          `UPDATE orders
           SET access_order_no = ?, access_order_status = ?, access_sync_status = ?, access_sync_error = NULL
           WHERE id = ?`,
        )
        .bind(orderNo, 'PENDING_RESOURCE', 'pending_resource', reference)
        .run();
      const pendingOrder = await getStoredOrder(db, reference);
      return { ready: false, status: 'pending_resource' as const, order: pendingOrder };
    }

    const primaryProfile = readyProfiles[0];

    await db
      .prepare(
        `UPDATE orders
         SET access_order_no = ?, access_order_status = ?, access_sync_status = ?, access_sync_error = NULL, access_synced_at = ?,
             access_esim_tran_no = ?, access_iccid = ?, access_ac = ?, access_qr_code_url = ?, access_short_url = ?,
             access_smdp_status = ?, access_eid = ?, access_apn = ?, access_pin = ?, access_puk = ?,
             access_activate_time = ?, access_installation_time = ?, access_expired_time = ?, access_raw = ?
         WHERE id = ?`,
      )
      .bind(
        orderNo,
        'GOT_RESOURCE',
        'ready',
        new Date().toISOString(),
        primaryProfile?.esimTranNo ?? null,
        primaryProfile?.iccid ?? null,
        primaryProfile?.ac ?? null,
        primaryProfile?.qrCodeUrl ?? null,
        primaryProfile?.shortUrl ?? null,
        primaryProfile?.smdpStatus ?? null,
        primaryProfile?.eid ?? null,
        primaryProfile?.apn ?? null,
        primaryProfile?.pin ?? null,
        primaryProfile?.puk ?? null,
        primaryProfile?.activateTime ?? null,
        primaryProfile?.installationTime ?? null,
        primaryProfile?.expiredTime ?? null,
        serializeStoredEsimProfiles(orderNo, order.access_transaction_id?.trim() || order.id, readyProfiles),
        reference,
      )
      .run();

    const storedFreshOrder = await getStoredOrder(db, reference);
    const freshOrder = storedFreshOrder ? await ensureOrderAccessToken(db, storedFreshOrder) : null;
    if (
      freshOrder &&
      freshOrder.email &&
      freshOrder.access_qr_code_url &&
      !freshOrder.access_esim_email_sent_at
    ) {
      try {
        const readyEmailProfiles = parseStoredEsimProfiles(freshOrder).filter((profile) => hasReadyEsimProfile(profile));
        const primaryEmailProfile = readyEmailProfiles[0];
        const catalog = await loadCatalog(env, { skipRemote: true });
        const matchedPlan = catalog.plans.find((item) => item.slug === freshOrder.plan_slug) ?? null;
        if (primaryEmailProfile) {
          const mailState = await sendEsimReadyEmail(env, {
            reference: freshOrder.id,
            accessToken: freshOrder.access_token ?? '',
            fullName: freshOrder.full_name,
            email: freshOrder.email,
            planTitle:
              freshOrder.period_num && freshOrder.period_num > 0
                ? `${freshOrder.plan_name ?? freshOrder.plan_slug} · ${freshOrder.period_num} ngày`
                : freshOrder.plan_name ?? freshOrder.plan_slug,
            amountVnd: freshOrder.amount_vnd ?? 0,
            paidAt: freshOrder.paid_at ?? freshOrder.created_at,
            esims: readyEmailProfiles.map((profile) => ({
              qrCodeUrl: profile.qrCodeUrl ?? '',
              shortUrl: profile.shortUrl ?? profile.qrCodeUrl ?? '',
              activationCode: profile.ac ?? '',
              iccid: profile.iccid ?? '',
              apn: profile.apn ?? '',
              pin: profile.pin ?? '',
              puk: profile.puk ?? '',
            })),
            topUpSupported: matchedPlan?.supportTopUpType === 2,
          });
          await updateEsimEmailState(db, reference, {
            status: mailState.status,
            sentAt: 'sentAt' in mailState ? mailState.sentAt : null,
            emailId: 'emailId' in mailState ? mailState.emailId : null,
            error: 'error' in mailState ? mailState.error : null,
          });
        }
      } catch (error) {
        await updateEsimEmailState(db, reference, {
          status: 'failed',
          error: error instanceof Error ? error.message.slice(0, 500) : 'esim_email_failed',
        });
      }
    }

    return { ready: true, status: 'ready' as const, order: freshOrder };
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 500) : 'esim_access_sync_failed';
    await db
      .prepare('UPDATE orders SET access_sync_status = ?, access_sync_error = ? WHERE id = ?')
      .bind('failed', message, reference)
      .run();
    const storedFailedOrder = await getStoredOrder(db, reference);
    const failedOrder = storedFailedOrder ? await ensureOrderAccessToken(db, storedFailedOrder) : null;
    return { ready: false, status: 'failed' as const, error: message, order: failedOrder };
  }
};

const sendPaymentSuccessEmail = async (
  env: Bindings,
  payment: {
    reference: string;
    accessToken: string;
    paymentCode: string;
    fullName: string;
    email: string;
    planTitle: string;
    planSubtitle: string;
    coverage: string;
    speed: string;
    delivery: string;
    usageType: string;
    amountVnd: number;
    paidAt: string;
  },
) => {
  const apiKey = env.RESEND_API_KEY?.trim() || '';
  const fallbackAddress = env.DEFAULT_SUPPORT_EMAIL?.trim() || 'support@esimcn.net';
  const from = formatEmailSender(env.PAYMENT_NOTIFY_FROM?.trim() || '', fallbackAddress);
  const replyTo = env.PAYMENT_NOTIFY_REPLY_TO?.trim() || fallbackAddress;
  const notifyBcc = env.PAYMENT_NOTIFY_BCC?.trim() || '';
  const bccRecipients = notifyBcc && notifyBcc !== payment.email ? [notifyBcc] : [];

  if (!apiKey) {
    return { status: 'skipped', error: 'missing_resend_api_key' } as const;
  }

  const amountLabel = `${moneyVnd.format(payment.amountVnd)}đ`;
  const paidLabel = new Date(payment.paidAt).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const orderUrl = `${(env.SITE_URL || `https://${brand.domain}`).replace(/\/$/, '')}${buildPaymentSuccessPath(payment.reference, payment.accessToken)}`;
  const portalUrl = `${(env.SITE_URL || `https://${brand.domain}`).replace(/\/$/, '')}/tra-cuu-don`;
  const subject = `${payment.planTitle} | Thanh toán thành công`;
  const safeReference = escapeHtml(payment.reference);
  const safeFullName = escapeHtml(payment.fullName);
  const safeEmail = escapeHtml(payment.email);
  const safePlanTitle = escapeHtml(payment.planTitle);
  const safePlanSubtitle = escapeHtml(payment.planSubtitle);
  const safeCoverage = escapeHtml(payment.coverage);
  const safeSpeed = escapeHtml(payment.speed);
  const safeUsageType = escapeHtml(payment.usageType);
  const safeAmountLabel = escapeHtml(amountLabel);
  const safePaymentCode = escapeHtml(payment.paymentCode);
  const safePaidLabel = escapeHtml(paidLabel);
  const safeDelivery = escapeHtml(payment.delivery);
  const safeOrderUrl = escapeHtml(orderUrl);
  const safePortalUrl = escapeHtml(portalUrl);
  const html = `
    <div style="margin:0;padding:32px 16px;background:#fff5f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#241b18">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #f3d9d2;border-radius:28px;overflow:hidden">
        <div style="padding:20px 24px;background:#ffffff;border-bottom:4px solid #ef5c48">
          <div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#ef5c48;margin-bottom:8px">eSIM CN</div>
          <div style="font-size:28px;line-height:1.22;font-weight:800;color:#201614;margin-bottom:10px">Thanh toán đã được ghi nhận thành công</div>
          <div style="font-size:15px;line-height:1.7;color:#654f49">Đơn hàng của anh đã được xác nhận. Bên mình đang chuẩn bị QR eSIM và hướng dẫn cài đặt để gửi ở email tiếp theo.</div>
        </div>
        <div style="padding:24px">
          <div style="margin-bottom:18px;padding:18px 20px;border:1px solid #f2d9d2;border-radius:22px;background:#ffffff">
            <div style="display:flex;flex-wrap:wrap;gap:12px 18px;align-items:flex-start;justify-content:space-between">
              <div>
                <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9e6f63;margin-bottom:6px">Mã đơn</div>
                <div style="font-size:24px;font-weight:800;color:#ef5c48">${safeReference}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9e6f63;margin-bottom:6px">Số tiền</div>
                <div style="font-size:24px;font-weight:800;color:#201614">${safeAmountLabel}</div>
              </div>
            </div>
            <div style="margin-top:14px;font-size:14px;line-height:1.7;color:#654f49">Khách hàng: <strong style="color:#201614">${safeFullName}</strong><br/>Email nhận đơn: <strong style="color:#201614">${safeEmail}</strong><br/>Thanh toán lúc: <strong style="color:#201614">${safePaidLabel}</strong></div>
          </div>
          <div style="margin-bottom:18px;border:1px solid #f2d9d2;border-radius:22px;background:#fffdfd;overflow:hidden">
            <div style="padding:14px 20px;background:#fff3ef;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#ef5c48">Thông tin gói đã mua</div>
            <div style="padding:6px 20px 10px">
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Tên gói</strong><span style="font-size:16px;line-height:1.6;color:#201614;font-weight:700">${safePlanTitle}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Tùy chọn</strong><span style="font-size:15px;line-height:1.6;color:#493833">${safePlanSubtitle}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Loại sử dụng</strong><span style="font-size:15px;line-height:1.6;color:#493833">${safeUsageType}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Phạm vi</strong><span style="font-size:15px;line-height:1.6;color:#493833">${safeCoverage}</span></div>
              <div style="padding:12px 0;border-bottom:1px solid #f5e4de"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Tốc độ / tuyến</strong><span style="font-size:15px;line-height:1.6;color:#493833">${safeSpeed}</span></div>
              <div style="padding:12px 0"><strong style="display:block;font-size:13px;color:#9e6f63;margin-bottom:5px">Nội dung chuyển khoản</strong><span style="display:inline-block;padding:8px 12px;border-radius:999px;background:#fff3ef;border:1px solid #f4d2cb;font-size:14px;font-weight:800;letter-spacing:.04em;color:#ef5c48">${safePaymentCode}</span></div>
            </div>
          </div>
          <div style="margin-bottom:18px;padding:18px 20px;border-radius:22px;background:#fff3ef;border:1px solid #f4d7d0">
            <div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#ef5c48;margin-bottom:10px">Bước tiếp theo</div>
            <div style="font-size:15px;line-height:1.75;color:#493833">1. Bên mình xử lý đơn và chuẩn bị QR eSIM chính thức.<br/>2. QR eSIM cùng hướng dẫn cài đặt sẽ được gửi ở email kế tiếp.<br/>3. Thời gian trả QR dự kiến: <strong style="color:#201614">${safeDelivery}</strong>.</div>
          </div>
          <div style="margin-bottom:24px;padding:18px 20px;border-radius:22px;background:#ffffff;border:1px solid #f2d9d2">
            <div style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#ef5c48;margin-bottom:10px">Lưu ý sử dụng</div>
            <div style="font-size:15px;line-height:1.75;color:#493833">Chỉ cài eSIM trên đúng thiết bị sẽ dùng. Khi tới điểm đến, bật eSIM làm line dữ liệu và bật Data Roaming. Nếu chưa vào mạng ngay, hãy khởi động lại máy rồi thử lại.</div>
          </div>
          <div style="margin-bottom:18px;padding:18px 20px;border-radius:22px;background:#fff8f5;border:1px solid #f4d7d0;font-size:14px;line-height:1.75;color:#493833">
            Nếu sau này không còn email này, anh vẫn có thể vào <a href="${safePortalUrl}" style="color:#ef5c48;font-weight:800;text-decoration:none">Đơn của tôi</a>, nhập email và 4 số cuối số điện thoại để nhận lại link đăng nhập. Không cần nhớ mật khẩu.
          </div>
          <div style="text-align:center">
            <a href="${safeOrderUrl}" style="display:inline-block;min-width:220px;padding:15px 22px;border-radius:999px;background:#ef5c48;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800">Xem chi tiết đơn</a>
            <a href="${safePortalUrl}" style="display:inline-block;min-width:220px;padding:15px 22px;border-radius:999px;background:#ffffff;color:#ef5c48;text-decoration:none;font-size:15px;font-weight:800;border:1px solid #ef5c48;margin-left:8px">Đơn của tôi</a>
          </div>
        </div>
      </div>
    </div>
  `;
  const text = [
    'Xác nhận thanh toán thành công',
    `Mã đơn: ${payment.reference}`,
    `Gói đã mua: ${payment.planTitle}`,
    `Tùy chọn: ${payment.planSubtitle}`,
    `Loại sử dụng: ${payment.usageType}`,
    `Phạm vi: ${payment.coverage}`,
    `Tốc độ / tuyến: ${payment.speed}`,
    `Số tiền: ${amountLabel}`,
    `Nội dung chuyển khoản: ${payment.paymentCode}`,
    `Thanh toán lúc: ${paidLabel}`,
    `Thời gian trả QR: ${payment.delivery}`,
    `Xem chi tiết đơn: ${orderUrl}`,
    'QR eSIM chính thức sẽ được gửi ở email kế tiếp sau khi bên mình hoàn tất.',
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [payment.email],
      reply_to: replyTo,
      bcc: bccRecipients.length > 0 ? bccRecipients : undefined,
      subject,
      html,
      text,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as { id?: string; message?: string; error?: unknown };
  if (!response.ok) {
    throw new Error(payload.message || String(payload.error || 'Không thể gửi email xác nhận thanh toán.'));
  }

  return {
    status: 'sent',
    sentAt: new Date().toISOString(),
    emailId: payload.id ?? null,
  } as const;
};

const sendOrderPaymentSuccessEmailIfNeeded = async (
  env: Bindings,
  db: D1Database,
  reference: string,
  options: {
    amountVnd?: number | null;
    paidAt?: string | null;
    paymentCodeFallback?: string | null;
  } = {},
) => {
  const storedOrder = await getStoredOrder(db, reference);
  const order = storedOrder ? await ensureOrderAccessToken(db, storedOrder) : null;
  if (!order || order.payment_email_sent_at) {
    return order;
  }

  try {
    const catalog = await loadCatalog(env, { skipRemote: true });
    const matchedPlan = catalog.plans.find((plan) => plan.slug === order.plan_slug) ?? null;
    const amountVnd =
      typeof options.amountVnd === 'number' && Number.isFinite(options.amountVnd) && options.amountVnd > 0
        ? options.amountVnd
        : order.amount_vnd ?? 0;
    const paidAt = options.paidAt ?? order.paid_at ?? order.created_at;
    const planTitle =
      matchedPlan?.periodRequired && order.period_num
        ? `${matchedPlan.name} · ${order.period_num} ngày`
        : matchedPlan?.name ?? order.plan_name ?? reference;
    const planSubtitle = matchedPlan != null
      ? `${matchedPlan.dataAllowance} · ${matchedPlan.periodRequired && order.period_num ? `${order.period_num} ngày sử dụng` : matchedPlan.validity}`
      : order.period_num
        ? `${order.period_num} ngày sử dụng`
        : order.plan_name ?? reference;
    const usageType = matchedPlan?.periodRequired
      ? 'Gói theo ngày, dữ liệu được làm mới theo chu kỳ của gói'
      : 'Gói trọn data, dùng đến khi hết dung lượng hoặc hết hạn';
    const coverage = matchedPlan?.coverage ?? 'Trung Quốc đại lục';
    const speed = matchedPlan != null
      ? `${matchedPlan.speed}${matchedPlan.ipExport ? ` · IP ${matchedPlan.ipExport}` : ''}`
      : '4G / 5G';
    const delivery = matchedPlan?.delivery ?? 'Gửi qua email sau khi xử lý';
    const mailState = await sendPaymentSuccessEmail(env, {
      reference,
      accessToken: order.access_token ?? '',
      paymentCode: order.payment_code ?? options.paymentCodeFallback ?? reference,
      fullName: order.full_name,
      email: order.email,
      planTitle,
      planSubtitle,
      coverage,
      speed,
      delivery,
      usageType,
      amountVnd,
      paidAt,
    });
    await updatePaymentEmailState(db, reference, {
      status: mailState.status,
      sentAt: 'sentAt' in mailState ? mailState.sentAt : null,
      emailId: 'emailId' in mailState ? mailState.emailId : null,
      error: 'error' in mailState ? mailState.error : null,
    });
  } catch (error) {
    await updatePaymentEmailState(db, reference, {
      status: 'failed',
      error: error instanceof Error ? error.message.slice(0, 500) : 'email_send_failed',
    });
  }

  return order;
};

const loadCatalog = async (
  env: Bindings,
  options: { includeSourcePrices?: boolean; skipRemote?: boolean } = {},
): Promise<{ plans: Plan[]; source: 'static' | 'esimaccess' }> => {
  let source: 'static' | 'esimaccess' = 'static';
  let catalogPlans = plans;

  if (!options.skipRemote) {
    try {
      const dynamicPlans = await fetchEsimAccessPlans(env.ESIM_ACCESS_CODE);
      if (dynamicPlans && dynamicPlans.length > 0) {
        catalogPlans = dynamicPlans;
        source = 'esimaccess';
      }
    } catch (error) {
      console.error('Unable to load eSIMAccess catalog', error);
    }
  }

  const overrides = await loadPricingOverrides(env.DB);

  return {
    plans: applyPricingOverrides(catalogPlans, overrides, options),
    source,
  };
};

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

const slugifyPublicText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

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

const getManagedPublicPlans = (planList: Plan[]) =>
  PUBLIC_CATALOG_PLAN_SLUGS.map((slug) => planList.find((plan) => plan.slug === slug)).filter((plan): plan is Plan => plan != null);

const getCheckoutPlanFromRequest = (planList: Plan[], requestedSlug: string, requestedHandle: string) => {
  const publicPlans = getManagedPublicPlans(planList);
  if (requestedSlug) {
    return publicPlans.find((plan) => plan.slug === requestedSlug) ?? null;
  }
  if (!requestedHandle) {
    return null;
  }
  return publicPlans.find((plan) => getPlanPublicHandle(plan) === requestedHandle) ?? null;
};

const getAdminPlanGroup = (plan: Plan) => {
  if (plan.periodRequired || plan.dataType === 2) {
    return {
      key: 'daily',
      label: 'Theo ngày',
      note: 'Các gói tính theo số ngày sử dụng. Dùng nhóm này để lên giá cho các gói ngày đang mở bán.',
      pricingModeLabel: 'Giá nền / ngày',
    };
  }

  return {
    key: 'package',
    label: 'Trọn gói',
    note: 'Các gói bán theo thời hạn cố định. Mỗi dòng là một gói đang mở bán.',
    pricingModeLabel: 'Giá trọn gói',
  };
};

const getAdminPlanMeta = (plan: Plan) =>
  [plan.dataAllowance, plan.validity, plan.coverage, plan.ipExport ? `IP ${plan.ipExport}` : '', plan.fupPolicy ? `FUP ${plan.fupPolicy}` : '']
    .filter(Boolean)
    .join(' · ');

const getAdminScopeMeta = (scope: string) => {
  switch (scope) {
    case 'daily':
      return { key: 'daily', label: 'Theo ngày' };
    case 'package':
      return { key: 'package', label: 'Trọn gói' };
    default:
      return { key: 'all', label: 'Toàn bộ gói đang bán' };
  }
};

const getScopedAdminPlans = (planList: Plan[], scope: string) => {
  const visiblePlans = getManagedPublicPlans(planList);
  if (scope === 'all') {
    return visiblePlans;
  }

  return visiblePlans.filter((plan) => getAdminPlanGroup(plan).key === scope);
};

const getAdminPricingDisplayPlans = (planList: Plan[]) => {
  return getManagedPublicPlans(planList).map((plan) => ({
    representative: plan,
    variantCount: 1,
  }));
};

const savePricingOverride = async (
  db: D1Database,
  input: {
    slug: string;
    overridePriceVnd: number;
    note?: string | null;
    now?: string;
  },
) => {
  const now = input.now ?? new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO pricing_overrides (
        plan_slug, override_price_vnd, override_price_usd, note, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(plan_slug) DO UPDATE SET
        override_price_vnd = excluded.override_price_vnd,
        override_price_usd = excluded.override_price_usd,
        note = excluded.note,
        updated_at = excluded.updated_at`,
    )
    .bind(input.slug, input.overridePriceVnd, toUsdFromVnd(input.overridePriceVnd), input.note ?? null, now, now)
    .run();
};

const getOrderStatusLabel = (status: string | null) =>
  status === 'paid' ? 'Đã thanh toán' : status === 'pending_review' ? 'Đang chờ đối soát' : 'Chờ thanh toán';

const getWebhookStatusLabel = (status: string | null) =>
  status === 'matched'
    ? 'Đã match đơn'
    : status === 'forwarded'
      ? 'Đã chuyển web2'
      : status === 'ignored'
        ? 'Bỏ qua'
        : 'Khác';

const forwardPaymentWebhook = async (
  env: Bindings,
  payload: unknown,
  routeKey: 'nta',
  metadata: {
    description: string;
    refNo: string;
    amountVnd: number;
    accountNumber: string;
    matchedReference: string;
  },
) => {
  const targetUrl = routeKey === 'nta' ? toText(env.PAYMENT_FORWARD_NTA_URL).trim() : '';
  const sharedSecret = routeKey === 'nta' ? toText(env.PAYMENT_FORWARD_NTA_SECRET).trim() : '';
  if (!targetUrl || !sharedSecret) {
    return { ok: false, error: 'forward_target_missing', status: 503 };
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-webhook-secret': sharedSecret,
        'x-origin-webhook-route': routeKey,
      },
      body: JSON.stringify({
        payload,
        metadata,
      }),
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      body: text,
    };
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error: error instanceof Error ? error.message : 'forward_failed',
    };
  }
};

const loadCustomerPortalOrders = async (db: D1Database, email: string, phoneLast4: string) => {
  const candidates = await db.prepare(ORDER_LOOKUP_BY_EMAIL_SQL).bind(email).all<StoredOrder>();
  const matchedOrders = await Promise.all(
    (candidates.results ?? [])
      .filter((order) => getPhoneLast4(order.phone ?? '') === phoneLast4)
      .map((order) => ensureOrderAccessToken(db, order)),
  );

  return matchedOrders
    .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
    .map((order) => ({
      reference: order.id,
      paymentStatus: order.payment_status ?? 'pending',
      paymentStatusLabel:
        order.payment_status === 'paid'
          ? 'Đã thanh toán'
          : order.payment_status === 'pending_review'
            ? 'Đang chờ đối soát'
            : 'Chờ thanh toán',
      planTitle: order.period_num ? `${order.plan_name ?? order.plan_slug} · ${order.period_num} ngày` : order.plan_name ?? order.plan_slug,
      planMeta:
        order.payment_status === 'paid'
          ? 'Mở lại QR eSIM, kiểm tra dung lượng và xem gói nạp thêm'
          : 'Mở lại trang QR để tiếp tục thanh toán đơn này',
      amountLabel: `${moneyVnd.format(order.amount_vnd ?? 0)}đ`,
      createdLabel: new Date(order.created_at).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      paidLabel: order.paid_at
        ? new Date(order.paid_at).toLocaleString('vi-VN', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
        : null,
      destinationHref:
        order.payment_status === 'paid'
          ? buildPaymentSuccessPath(order.id, order.access_token ?? '')
          : buildPaymentPath(order.id, order.access_token ?? ''),
      destinationLabel: order.payment_status === 'paid' ? 'Mở đơn đã mua' : 'Tiếp tục thanh toán',
    }));
};

const getAdminFlash = (request: Request) => {
  const url = new URL(request.url);
  const flash = url.searchParams.get('flash');
  const slug = toText(url.searchParams.get('slug'));
  const reference = toText(url.searchParams.get('reference'));

  if (flash === 'price_saved') {
    return {
      kind: 'success',
      message: slug ? `Đã lưu giá override cho ${slug}.` : 'Đã lưu giá override.',
    } as const;
  }

  if (flash === 'price_cleared') {
    return {
      kind: 'success',
      message: slug ? `Đã xóa override của ${slug}, site đã quay về giá gốc của catalog.` : 'Đã xóa override.',
    } as const;
  }

  if (flash === 'logged_out') {
    return {
      kind: 'info',
      message: 'Đã đăng xuất khỏi admin.',
    } as const;
  }

  if (flash === 'login_required') {
    return {
      kind: 'info',
      message: 'Anh đăng nhập lại để sửa giá.',
    } as const;
  }

  if (flash === 'invalid_price') {
    return {
      kind: 'error',
      message: slug ? `Giá nhập cho ${slug} chưa hợp lệ. Điền số VND lớn hơn 0.` : 'Giá nhập chưa hợp lệ.',
    } as const;
  }

  if (flash === 'plan_not_found') {
    return {
      kind: 'error',
      message: slug ? `Không tìm thấy gói ${slug} trong catalog hiện tại.` : 'Không tìm thấy gói cần sửa.',
    } as const;
  }

  if (flash === 'bulk_applied') {
    const percent = Number.parseInt(url.searchParams.get('percent') || '', 10);
    const count = Number.parseInt(url.searchParams.get('count') || '', 10);
    const scopeMeta = getAdminScopeMeta(toText(url.searchParams.get('scope')) || 'all');
    return {
      kind: 'success',
      message: `Đã áp ${Number.isFinite(percent) ? percent : 0}% theo giá gốc catalog cho ${Number.isFinite(count) ? count : 0} gói của ${scopeMeta.label}.`,
    } as const;
  }

  if (flash === 'bulk_invalid') {
    return {
      kind: 'error',
      message: 'Không áp được thao tác hàng loạt. Kiểm tra lại phạm vi hoặc phần trăm tăng giá.',
    } as const;
  }

  if (flash === 'site_settings_saved') {
    return {
      kind: 'success',
      message: 'Đã lưu Site Settings. Hero, logo, footer và metadata public đã cập nhật.',
    } as const;
  }

  if (flash === 'manual_paid') {
    return {
      kind: 'success',
      message: reference
        ? `Đã duyệt tay đơn ${reference}. Hệ thống đã đánh dấu thanh toán và bắt đầu cấp eSIM.`
        : 'Đã duyệt tay đơn và bắt đầu cấp eSIM.',
    } as const;
  }

  if (flash === 'manual_pending_resource') {
    return {
      kind: 'success',
      message: reference
        ? `Đã duyệt tay đơn ${reference}. Đơn đã paid, nhà cung cấp đang trả QR eSIM.`
        : 'Đã duyệt tay đơn. Nhà cung cấp đang trả QR eSIM.',
    } as const;
  }

  if (flash === 'manual_already_paid') {
    return {
      kind: 'info',
      message: reference ? `Đơn ${reference} đã ở trạng thái thanh toán trước đó rồi.` : 'Đơn này đã thanh toán rồi.',
    } as const;
  }

  if (flash === 'manual_order_not_found') {
    return {
      kind: 'error',
      message: reference ? `Không tìm thấy đơn ${reference} để duyệt tay.` : 'Không tìm thấy đơn cần duyệt tay.',
    } as const;
  }

  if (flash === 'manual_provision_failed') {
    return {
      kind: 'error',
      message: reference
        ? `Đơn ${reference} đã được đánh dấu paid nhưng bước cấp eSIM đang lỗi. Anh mở đơn để kiểm tra lại.`
        : 'Đơn đã được đánh dấu paid nhưng bước cấp eSIM đang lỗi.',
    } as const;
  }

  return null;
};

const requireAdminSession = async (c: Context<{ Bindings: Bindings }>) => {
  const context = await getPageContext(c.env);
  const csrf = getOrCreateAdminCsrfToken(c.req.raw);
  if (!c.env.DB) {
    return {
      ok: false as const,
      response: csrf.needsSetCookie
        ? appendAdminCsrfCookie(
            c.req.raw,
            c.html(
        renderAdminLoginPage(context, {
          username: getAdminUsername(c.env),
          enabled: false,
          csrfToken: csrf.token,
          flash: {
            kind: 'error',
            message: 'Worker này chưa gắn D1 nên không thể mở admin chỉnh giá.',
          },
        }),
        503,
            ),
            csrf.token,
          )
        : c.html(
            renderAdminLoginPage(context, {
              username: getAdminUsername(c.env),
              enabled: false,
              csrfToken: csrf.token,
              flash: {
                kind: 'error',
                message: 'Worker này chưa gắn D1 nên không thể mở admin chỉnh giá.',
              },
            }),
            503,
          ),
    };
  }

  if (!hasAdminPassword(c.env)) {
    return {
      ok: false as const,
      response: csrf.needsSetCookie
        ? appendAdminCsrfCookie(
            c.req.raw,
            c.html(
        renderAdminLoginPage(context, {
          username: getAdminUsername(c.env),
          enabled: false,
          csrfToken: csrf.token,
          flash: {
            kind: 'info',
            message: 'Cần set ADMIN_PASSWORD để bật admin.',
          },
        }),
        503,
            ),
            csrf.token,
          )
        : c.html(
            renderAdminLoginPage(context, {
              username: getAdminUsername(c.env),
              enabled: false,
              csrfToken: csrf.token,
              flash: {
                kind: 'info',
                message: 'Cần set ADMIN_PASSWORD để bật admin.',
              },
            }),
            503,
          ),
    };
  }

  const session = await getValidAdminSession(c.env.DB, c.req.raw);
  if (!session) {
    return {
      ok: false as const,
      response: c.redirect('/admin/login?flash=login_required'),
    };
  }

  return {
    ok: true as const,
    session,
  };
};

app.get('/admin/login', async (c) => {
  const context = await getPageContext(c.env);
  const username = getAdminUsername(c.env);
  const flash = getAdminFlash(c.req.raw);
  const csrf = getOrCreateAdminCsrfToken(c.req.raw);

  if (!c.env.DB || !hasAdminPassword(c.env)) {
    const response = c.html(
      renderAdminLoginPage(context, {
        username,
        enabled: false,
        csrfToken: csrf.token,
        flash:
          flash ??
          (!c.env.DB
            ? {
                kind: 'error',
                message: 'Worker này chưa gắn D1 nên chưa dùng được admin.',
              }
            : {
                kind: 'info',
                message: 'Cần set ADMIN_PASSWORD để bật admin.',
              }),
      }),
      503,
    );
    return csrf.needsSetCookie ? appendAdminCsrfCookie(c.req.raw, response, csrf.token) : response;
  }

  const session = await getValidAdminSession(c.env.DB, c.req.raw);
  if (session) {
    return c.redirect('/admin');
  }

  const response = c.html(
    renderAdminLoginPage(context, {
      username,
      enabled: true,
      csrfToken: csrf.token,
      flash,
    }),
  );
  return csrf.needsSetCookie ? appendAdminCsrfCookie(c.req.raw, response, csrf.token) : response;
});

app.post('/admin/login', async (c) => {
  const context = await getPageContext(c.env);
  const username = getAdminUsername(c.env);
  if (!c.env.DB || !hasAdminPassword(c.env)) {
    return c.html(
      renderAdminLoginPage(context, {
        username,
        enabled: false,
        csrfToken: getOrCreateAdminCsrfToken(c.req.raw).token,
        flash: {
          kind: 'info',
          message: !c.env.DB ? 'Worker này chưa gắn D1 nên chưa dùng được admin.' : 'Cần set ADMIN_PASSWORD để bật admin.',
        },
      }),
      503,
    );
  }

  const payload = await parsePayload(c.req.raw);
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.text('CSRF token không hợp lệ.', 403);
  }

  const clientIp = getClientIp(c.req.raw);
  const blockedUntil = await getAdminLoginBlock(c.env.DB, clientIp);
  if (blockedUntil) {
    return c.html(
      renderAdminLoginPage(context, {
        username,
        enabled: true,
        csrfToken: getAdminCsrfCookie(c.req.raw),
        flash: {
          kind: 'error',
          message: `Đăng nhập tạm bị khóa do thử sai nhiều lần. Thử lại sau ${formatDateTimeDisplay(blockedUntil)}.`,
        },
      }),
      429,
    );
  }

  const submittedUsername = toText(payload.username);
  const submittedPassword = toText(payload.password);

  if (submittedUsername !== username || submittedPassword !== (c.env.ADMIN_PASSWORD?.trim() || '')) {
    await recordAdminLoginFailure(c.env.DB, clientIp);
    return c.html(
      renderAdminLoginPage(context, {
        username,
        enabled: true,
        csrfToken: getAdminCsrfCookie(c.req.raw),
        flash: {
          kind: 'error',
          message: 'Sai tài khoản hoặc mật khẩu admin.',
        },
      }),
      401,
    );
  }

  await clearAdminLoginAttempts(c.env.DB, clientIp);
  const session = await createAdminSession(c.env.DB, username);
  const response = c.redirect('/admin');
  const withSessionCookie = appendCookie(
    response,
    serializeCookie(ADMIN_SESSION_COOKIE_NAME, session.id, {
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      path: '/',
      httpOnly: true,
      secure: isSecureRequest(c.req.raw),
      sameSite: 'Lax',
    }),
  );
  return appendAdminCsrfCookie(c.req.raw, withSessionCookie, buildAdminCsrfToken());
});

app.post('/admin/logout', async (c) => {
  const payload = await parsePayload(c.req.raw);
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.text('CSRF token không hợp lệ.', 403);
  }
  if (c.env.DB) {
    await deleteAdminSession(c.env.DB, c.req.raw);
  }

  const response = c.redirect('/admin/login?flash=logged_out');
  const responseWithSession = appendCookie(
    response,
    serializeCookie(ADMIN_SESSION_COOKIE_NAME, '', {
      maxAge: 0,
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: isSecureRequest(c.req.raw),
      sameSite: 'Lax',
    }),
  );
  return appendCookie(
    responseWithSession,
    serializeCookie(ADMIN_CSRF_COOKIE_NAME, '', {
      maxAge: 0,
      expires: new Date(0),
      path: '/',
      httpOnly: false,
      secure: isSecureRequest(c.req.raw),
      sameSite: 'Strict',
    }),
  );
});

app.get('/admin', async (c) => {
  const auth = await requireAdminSession(c);
  if (!auth.ok) {
    return auth.response;
  }

  await Promise.all([ensureOrderSchema(c.env.DB!), ensurePricingSchema(c.env.DB!), ensureAdminSessionSchema(c.env.DB!), ensureSiteSettingsSchema(c.env.DB!)]);
  const catalog = await loadCatalog(c.env, { includeSourcePrices: true });
  const siteSettings = await loadSiteSettings(c.env.DB!, c.env);
  const context = getContext(c.env, siteSettings);
  const flash = getAdminFlash(c.req.raw);
  const csrf = getOrCreateAdminCsrfToken(c.req.raw);
  const bulkScope = getAdminScopeMeta(toText(c.req.query('scope')) || 'all').key;
  const bulkPercentRaw = Number.parseInt(toText(c.req.query('percent')), 10);
  const bulkPercent = Number.isFinite(bulkPercentRaw) ? Math.max(0, Math.min(500, bulkPercentRaw)) : 20;
  const pricingDisplayPlans = getAdminPricingDisplayPlans(catalog.plans);

  const todayStart = getVietnamDayStart();
  const weekStart = new Date(todayStart.getTime() - 6 * DAY_MS);
  const monthStart = new Date(todayStart.getTime() - 29 * DAY_MS);

  const [overrideCountRow, paidOrderCountRow, pendingOrderCountRow, customerRows, orderRows, webhookRows, paidMetricRows] = await Promise.all([
    c.env.DB!
      .prepare('SELECT COUNT(*) AS count FROM pricing_overrides')
      .first<{ count: number }>(),
    c.env.DB!
      .prepare("SELECT COUNT(*) AS count FROM orders WHERE payment_status = 'paid'")
      .first<{ count: number }>(),
    c.env.DB!
      .prepare("SELECT COUNT(*) AS count FROM orders WHERE payment_status IS NULL OR payment_status <> 'paid'")
      .first<{ count: number }>(),
    c.env.DB!
      .prepare(
        `SELECT
           MAX(CASE WHEN TRIM(COALESCE(full_name, '')) <> '' THEN full_name ELSE NULL END) AS full_name,
           MAX(CASE WHEN TRIM(COALESCE(phone, '')) <> '' THEN phone ELSE NULL END) AS phone,
           MAX(email) AS email,
           COUNT(*) AS order_count,
           SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) AS paid_order_count,
           SUM(CASE WHEN payment_status IS NULL OR payment_status <> 'paid' THEN 1 ELSE 0 END) AS unpaid_order_count,
           SUM(CASE WHEN payment_status = 'paid' THEN COALESCE(payment_amount, amount_vnd, 0) ELSE 0 END) AS paid_total_vnd,
           MAX(created_at) AS last_order_at,
           MAX(paid_at) AS last_paid_at
         FROM orders
         GROUP BY LOWER(email)
         ORDER BY MAX(created_at) DESC
         LIMIT 12`,
      )
      .all<{
        full_name: string | null;
        phone: string | null;
        email: string;
        order_count: number;
        paid_order_count: number;
        unpaid_order_count: number;
        paid_total_vnd: number | null;
        last_order_at: string;
        last_paid_at: string | null;
      }>(),
    c.env.DB!
      .prepare(
        `SELECT id, access_token, full_name, phone, email, plan_slug, plan_name, payment_code, period_num, amount_vnd, payment_status, created_at, paid_at
         FROM orders
         ORDER BY created_at DESC
         LIMIT 20`,
      )
      .all<{
        id: string;
        access_token: string | null;
        full_name: string;
        phone: string | null;
        email: string;
        plan_slug: string;
        plan_name: string | null;
        payment_code: string | null;
        period_num: number | null;
        amount_vnd: number | null;
        payment_status: string | null;
        created_at: string;
        paid_at: string | null;
      }>(),
    c.env.DB!
      .prepare(
        `SELECT received_at, matched_reference, amount_vnd, account_number, match_status, reason, ref_no, description
         FROM payment_webhook_events
         ORDER BY received_at DESC
         LIMIT 20`,
      )
      .all<{
        received_at: string;
        matched_reference: string | null;
        amount_vnd: number | null;
        account_number: string | null;
        match_status: string | null;
        reason: string | null;
        ref_no: string | null;
        description: string | null;
      }>(),
    c.env.DB!
      .prepare(
        `SELECT plan_slug, period_num, quantity, amount_vnd, payment_amount, paid_at
         FROM orders
         WHERE payment_status = 'paid' AND paid_at IS NOT NULL AND paid_at >= ?
         ORDER BY paid_at DESC`,
      )
      .bind(monthStart.toISOString())
      .all<{
        plan_slug: string;
        period_num: number | null;
        quantity: number | null;
        amount_vnd: number | null;
        payment_amount: number | null;
        paid_at: string;
      }>(),
  ]);

  const groupSeed = [
    { key: 'daily', label: 'Theo ngày', note: 'Các gói tính theo số ngày sử dụng đang mở bán ngoài site.', items: [] as unknown[] },
    { key: 'package', label: 'Trọn gói', note: 'Các gói có thời hạn cố định đang mở bán ngoài site.', items: [] as unknown[] },
  ];
  const groupedPlans = new Map(groupSeed.map((item) => [item.key, { ...item, items: [] as Array<{
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
  }> }]));

  pricingDisplayPlans
    .sort(
      (left, right) =>
        (left.representative.periodRequired === right.representative.periodRequired ? 0 : left.representative.periodRequired ? -1 : 1) ||
        getSourcePriceVndAmount(left.representative) - getSourcePriceVndAmount(right.representative) ||
        left.representative.name.localeCompare(right.representative.name, 'vi'),
    )
    .forEach(({ representative: plan, variantCount }) => {
      const group = getAdminPlanGroup(plan);
      const bucket = groupedPlans.get(group.key);
      if (!bucket) {
        return;
      }

      const sourcePriceVnd = getSourcePriceVndAmount(plan);
      const effectivePriceVnd = getEffectivePriceVndAmount(plan);
      const marginVnd = Math.max(0, effectivePriceVnd - sourcePriceVnd);
      bucket.items.push({
        slug: plan.slug,
        name: plan.name,
        pricingModeLabel: group.pricingModeLabel,
        sourceLabel: `${plan.priceOverrideVnd ? 'Override + ' : ''}${catalog.source === 'esimaccess' ? 'eSIMAccess' : 'catalog tĩnh'}`,
        meta: getAdminPlanMeta(plan),
        sourcePriceVnd,
        effectivePriceVnd,
        overridePriceVnd: plan.priceOverrideVnd ?? null,
        marginVnd,
        marginPct: effectivePriceVnd > 0 ? (marginVnd / effectivePriceVnd) * 100 : 0,
        packageCode: plan.packageCode ?? null,
        note: plan.priceOverrideNote ?? null,
        variantLabel: variantCount > 1 ? `Đang lấy bản rẻ nhất trong ${variantCount} biến thể cùng loại.` : null,
        updatedAtLabel: formatDateTimeDisplay(plan.priceOverrideUpdatedAt),
        detailHref: `/plans/${plan.slug}`,
      });
    });

  const planMap = new Map(catalog.plans.map((item) => [item.slug, item]));
  const paidMetricOrders = (paidMetricRows.results ?? []).map((item) => {
    const quantity = Math.max(1, Math.min(99, Math.round(item.quantity ?? 1)));
    const revenueVnd = item.payment_amount ?? item.amount_vnd ?? 0;
    const matchedPlan = planMap.get(item.plan_slug) ?? null;
    const costVnd = matchedPlan
      ? formatVndAmount(getSourcePlanAmountUsd(matchedPlan, item.period_num) * quantity)
      : revenueVnd;
    return {
      paidAtMs: new Date(item.paid_at).getTime(),
      revenueVnd,
      costVnd,
    };
  });

  const performanceWindows = [
    { label: 'Hôm nay', tone: 'accent' as const, startMs: todayStart.getTime() },
    { label: '7 ngày', tone: 'neutral' as const, startMs: weekStart.getTime() },
    { label: '30 ngày', tone: 'muted' as const, startMs: monthStart.getTime() },
  ].map((window) => {
    const scopedOrders = paidMetricOrders.filter((item) => Number.isFinite(item.paidAtMs) && item.paidAtMs >= window.startMs);
    const revenueVnd = scopedOrders.reduce((sum, item) => sum + item.revenueVnd, 0);
    const costVnd = scopedOrders.reduce((sum, item) => sum + item.costVnd, 0);
    const profitVnd = revenueVnd - costVnd;
    return {
      label: window.label,
      tone: window.tone,
      orderCountLabel: `${moneyVnd.format(scopedOrders.length)} đơn`,
      revenueLabel: formatVndLabel(revenueVnd),
      costLabel: formatVndLabel(costVnd),
      profitLabel: `${profitVnd >= 0 ? '+' : '-'}${formatVndLabel(Math.abs(profitVnd))}`,
    };
  });

  const response = c.html(
    renderAdminDashboardPage(context, {
      username: auth.session.username,
      csrfToken: csrf.token,
      catalogSourceLabel: catalog.source === 'esimaccess' ? 'Live eSIMAccess' : 'Catalog tĩnh dự phòng',
      totalPlans: pricingDisplayPlans.length,
      overrideCount: overrideCountRow?.count ?? 0,
      paidOrderCount: paidOrderCountRow?.count ?? 0,
      pendingOrderCount: pendingOrderCountRow?.count ?? 0,
      bulkScope,
      bulkPercent,
      plansByGroup: groupSeed
        .map((item) => groupedPlans.get(item.key))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .filter((item) => item.items.length > 0),
      performanceCards: performanceWindows,
      customers: (customerRows.results ?? []).map((item) => {
        const displayName = toText(item.full_name)?.trim() || item.email;
        const orderCount = Math.max(0, item.order_count ?? 0);
        const paidOrderCount = Math.max(0, item.paid_order_count ?? 0);
        const unpaidOrderCount = Math.max(0, item.unpaid_order_count ?? 0);
        return {
          displayName,
          email: item.email,
          phone: item.phone ?? null,
          orderCountLabel: `${moneyVnd.format(orderCount)} đơn`,
          paidOrderCountLabel: `${moneyVnd.format(paidOrderCount)} đơn`,
          unpaidOrderCountLabel: `${moneyVnd.format(unpaidOrderCount)} đơn`,
          paidTotalLabel: formatVndLabel(item.paid_total_vnd ?? 0),
          lastOrderAtLabel: formatDateTimeDisplay(item.last_order_at),
          lastPaidAtLabel: formatDateTimeDisplay(item.last_paid_at) || null,
          statusLabel: orderCount > 1 ? `Quay lại ${moneyVnd.format(orderCount)} lần` : 'Khách mới',
        };
      }),
      orders: await Promise.all((orderRows.results ?? []).map(async (item) => {
        const normalizedOrder = item.access_token
          ? item
          : {
              ...item,
              access_token: buildOrderAccessToken(),
            };
        if (!item.access_token) {
          await c.env.DB!.prepare('UPDATE orders SET access_token = ? WHERE id = ?').bind(normalizedOrder.access_token, item.id).run();
        }
        return {
        reference: item.id,
        planTitle: item.period_num ? `${item.plan_name ?? item.plan_slug} · ${item.period_num} ngày` : item.plan_name ?? item.plan_slug,
        customerName: item.full_name,
        customerPhone: item.phone ?? null,
        customerEmail: item.email,
        amountLabel: formatVndLabel(item.amount_vnd ?? 0),
        paymentCode: item.payment_code ?? null,
        paymentStatus: item.payment_status,
        statusLabel: getOrderStatusLabel(item.payment_status),
        createdAtLabel: formatDateTimeDisplay(item.created_at),
        paidAtLabel: formatDateTimeDisplay(item.paid_at) || null,
        href:
          item.payment_status === 'paid'
            ? buildPaymentSuccessPath(item.id, normalizedOrder.access_token ?? '')
            : buildPaymentPath(item.id, normalizedOrder.access_token ?? ''),
      };
      })),
      webhookEvents: (webhookRows.results ?? []).map((item) => ({
        receivedAtLabel: formatDateTimeDisplay(item.received_at),
        matchedReference: item.matched_reference,
        amountLabel: item.amount_vnd ? formatVndLabel(item.amount_vnd) : '-',
        statusLabel: getWebhookStatusLabel(item.match_status),
        reason: item.reason ?? '-',
        accountNumber: item.account_number ?? null,
        refNo: item.ref_no,
        description: item.description,
      })),
      siteSettings,
      assetUploadEnabled: Boolean(c.env.DB || c.env.SITE_ASSETS_BUCKET),
      assetUploadMode: getSiteAssetUploadMode(c.env),
      assetUploadLimitLabel: c.env.SITE_ASSETS_BUCKET ? '10MB' : '1.9MB',
      flash,
      previewHref: '/?noi-bo=1',
      apiHref: '/api/plans',
    }),
  );
  return csrf.needsSetCookie ? appendAdminCsrfCookie(c.req.raw, response, csrf.token) : response;
});

app.post('/admin/pricing', async (c) => {
  const auth = await requireAdminSession(c);
  if (!auth.ok) {
    return auth.response;
  }

  await ensurePricingSchema(c.env.DB!);
  const payload = await parsePayload(c.req.raw);
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.text('CSRF token không hợp lệ.', 403);
  }
  const slug = toText(payload.slug);
  const intent = toText(payload.intent) || 'save';
  const returnTo = toText(payload.returnTo);
  const safeHash = returnTo.startsWith('#plan-') ? returnTo : '';
  const redirectWithFlash = (flash: string) => c.redirect(`/admin?flash=${encodeURIComponent(flash)}${slug ? `&slug=${encodeURIComponent(slug)}` : ''}${safeHash}`);

  if (!slug) {
    return redirectWithFlash('plan_not_found');
  }

  if (intent === 'clear') {
    await c.env.DB!.prepare('DELETE FROM pricing_overrides WHERE plan_slug = ?').bind(slug).run();
    return redirectWithFlash('price_cleared');
  }

  const catalog = await loadCatalog(c.env);
  const matchedPlan = catalog.plans.find((plan) => plan.slug === slug);
  if (!matchedPlan) {
    return redirectWithFlash('plan_not_found');
  }

  const overridePriceVndRaw = toAmountVnd(payload.overridePriceVnd);
  const overridePriceVnd =
    typeof overridePriceVndRaw === 'number' && Number.isFinite(overridePriceVndRaw)
      ? Math.round(overridePriceVndRaw / 1000) * 1000
      : null;
  if (!overridePriceVnd || overridePriceVnd <= 0) {
    return redirectWithFlash('invalid_price');
  }

  const note = toText(payload.note).slice(0, 500);
  await savePricingOverride(c.env.DB!, {
    slug,
    overridePriceVnd,
    note: note || null,
  });

  return redirectWithFlash('price_saved');
});

app.post('/admin/pricing/bulk', async (c) => {
  const auth = await requireAdminSession(c);
  if (!auth.ok) {
    return auth.response;
  }

  await ensurePricingSchema(c.env.DB!);
  const payload = await parsePayload(c.req.raw);
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.text('CSRF token không hợp lệ.', 403);
  }
  const scope = toText(payload.scope) || 'all';
  const percent = Math.round(Number.parseFloat(toText(payload.percent)));
  const returnTo = toText(payload.returnTo);
  const safeHash =
    returnTo === '#overview' || returnTo.startsWith('#group-')
      ? returnTo
      : '';
  const redirectWithFlash = (flash: string, count?: number) =>
    c.redirect(
      `/admin?flash=${encodeURIComponent(flash)}&scope=${encodeURIComponent(scope)}${
        Number.isFinite(percent) ? `&percent=${encodeURIComponent(String(percent))}` : ''
      }${typeof count === 'number' ? `&count=${encodeURIComponent(String(count))}` : ''}${safeHash}`,
    );

  if (!Number.isFinite(percent) || percent < 0 || percent > 500) {
    return redirectWithFlash('bulk_invalid');
  }

  const catalog = await loadCatalog(c.env, { includeSourcePrices: true });
  const targets = getScopedAdminPlans(catalog.plans, scope);
  if (targets.length === 0) {
    return redirectWithFlash('bulk_invalid');
  }

  const now = new Date().toISOString();
  for (const plan of targets) {
    const sourcePriceVnd = getSourcePriceVndAmount(plan);
    const nextPriceVnd = Math.max(1000, Math.round((sourcePriceVnd * (1 + percent / 100)) / 1000) * 1000);
    if (percent === 0) {
      await c.env.DB!.prepare('DELETE FROM pricing_overrides WHERE plan_slug = ?').bind(plan.slug).run();
      continue;
    }

    await savePricingOverride(c.env.DB!, {
      slug: plan.slug,
      overridePriceVnd: nextPriceVnd,
      note: plan.priceOverrideNote ?? null,
      now,
    });
  }

  return redirectWithFlash('bulk_applied', targets.length);
});

app.post('/admin/site-settings', async (c) => {
  const auth = await requireAdminSession(c);
  if (!auth.ok) {
    return auth.response;
  }

  await ensureSiteSettingsSchema(c.env.DB!);
  const payload = await parsePayload(c.req.raw);
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.text('CSRF token không hợp lệ.', 403);
  }

  await saveSiteSettings(c.env.DB!, c.env, payload);
  return c.redirect('/admin?flash=site_settings_saved#settings');
});

app.post('/admin/site-assets/upload', async (c) => {
  const auth = await requireAdminSession(c);
  if (!auth.ok) {
    return auth.response;
  }

  const formData = await c.req.raw.formData();
  const payload = Object.fromEntries(formData.entries());
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.json({ error: 'CSRF token không hợp lệ.' }, 403);
  }

  const kind = toText(payload.kind);
  if (!isSiteAssetField(kind)) {
    return c.json({ error: 'Loại asset không hợp lệ.' }, 400);
  }

  const fileEntry = formData.get('file') as File | string | null;
  if (!fileEntry || typeof fileEntry === 'string' || fileEntry.size <= 0) {
    return c.json({ error: 'Cần chọn một file ảnh hợp lệ.' }, 400);
  }
  const file = fileEntry;

  const maxBytes = getSiteAssetMaxBytes(c.env);
  if (file.size > maxBytes) {
    return c.json(
      {
        error: c.env.SITE_ASSETS_BUCKET
          ? `Ảnh/GIF quá lớn. Giới hạn hiện tại khi lưu qua Cloudflare R2 là khoảng ${Math.round(maxBytes / MB)}MB.`
          : 'Ảnh/GIF quá lớn. Vì asset đang lưu trong Cloudflare D1, file cần nhỏ hơn khoảng 1.9MB.',
      },
      400,
    );
  }

  const contentType = normalizeSiteAssetContentType(file);
  if (!contentType) {
    return c.json({ error: 'Định dạng ảnh chưa được hỗ trợ. Hãy dùng PNG, JPG, WebP, AVIF, SVG, GIF hoặc ICO.' }, 400);
  }

  const key = buildSiteAssetKey(kind, file);
  const safeFilename = truncateText(file.name, 180) || 'upload';

  if (c.env.SITE_ASSETS_BUCKET) {
    await c.env.SITE_ASSETS_BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: {
        contentType,
        cacheControl: SITE_ASSET_CACHE_CONTROL,
      },
      customMetadata: {
        field: kind,
        filename: safeFilename,
        uploadedBy: auth.session.username,
      },
    });

    return c.json({
      ok: true,
      field: kind,
      label: SITE_ASSET_KIND_META[kind].label,
      url: buildSiteAssetPath(key),
      key,
      contentType,
      size: file.size,
      storage: 'r2',
    });
  }

  if (!c.env.DB) {
    return c.json({ error: 'Worker này chưa bật lưu ảnh trên Cloudflare.' }, 503);
  }

  await ensureSiteAssetsSchema(c.env.DB);
  await c.env.DB.prepare(
    `INSERT OR REPLACE INTO site_assets (
      asset_key,
      field,
      filename,
      content_type,
      content,
      size,
      uploaded_by,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      key,
      kind,
      safeFilename,
      contentType,
      await file.arrayBuffer(),
      file.size,
      auth.session.username,
      new Date().toISOString(),
    )
    .run();

  return c.json({
    ok: true,
    field: kind,
    label: SITE_ASSET_KIND_META[kind].label,
    url: buildSiteAssetPath(key),
    key,
    contentType,
    size: file.size,
    storage: 'd1',
  });
});

app.post('/admin/orders/manual-approve', async (c) => {
  const auth = await requireAdminSession(c);
  if (!auth.ok) {
    return auth.response;
  }

  await ensureOrderSchema(c.env.DB!);
  const payload = await parsePayload(c.req.raw);
  if (!validateAdminCsrf(c.req.raw, payload)) {
    return c.text('CSRF token không hợp lệ.', 403);
  }

  const reference = toText(payload.reference).trim().toUpperCase();
  const returnTo = toText(payload.returnTo);
  const safeHash = returnTo === '#orders' ? returnTo : '';
  const redirectWithFlash = (flash: string, nextReference = reference) =>
    c.redirect(`/admin?flash=${encodeURIComponent(flash)}${nextReference ? `&reference=${encodeURIComponent(nextReference)}` : ''}${safeHash}`);

  if (!reference) {
    return redirectWithFlash('manual_order_not_found');
  }

  const storedOrder = await getStoredOrder(c.env.DB!, reference);
  if (!storedOrder) {
    return redirectWithFlash('manual_order_not_found');
  }

  const order = await ensureOrderAccessToken(c.env.DB!, storedOrder);
  if (order.payment_status === 'paid') {
    return redirectWithFlash('manual_already_paid');
  }

  const paidAt = new Date().toISOString();
  const amountVnd = order.amount_vnd ?? 0;
  const fallbackPaymentRef = `ADMIN-${paidAt.replace(/\D/g, '').slice(-14)}`;
  const paymentNote = `Admin duyệt tay bởi ${auth.session.username}`;

  await c.env.DB!
    .prepare(
      `UPDATE orders
       SET payment_status = ?,
           payment_ref = COALESCE(NULLIF(TRIM(payment_ref), ''), ?),
           payment_note = ?,
           payment_amount = COALESCE(payment_amount, ?),
           paid_at = COALESCE(paid_at, ?)
       WHERE id = ?`,
    )
    .bind('paid', fallbackPaymentRef, paymentNote, amountVnd > 0 ? amountVnd : null, paidAt, reference)
    .run();

  await recordPaymentWebhookEvent(
    c.env.DB!,
    {
      source: 'admin_manual_approve',
      adminUsername: auth.session.username,
      orderReference: reference,
    },
    {
      refNo: fallbackPaymentRef,
      description: paymentNote,
      amountVnd,
      accountNumber: 'admin',
      matchedReference: reference,
      matchStatus: 'matched',
      reason: 'manual_admin_paid',
    },
  );

  await sendOrderPaymentSuccessEmailIfNeeded(c.env, c.env.DB!, reference, {
    amountVnd,
    paidAt,
    paymentCodeFallback: order.payment_code ?? fallbackPaymentRef,
  });

  const provisionState = await provisionPaidOrder(c.env, c.env.DB!, reference);
  if (provisionState.status === 'failed') {
    return redirectWithFlash('manual_provision_failed');
  }

  if (provisionState.status === 'pending_resource') {
    return redirectWithFlash('manual_pending_resource');
  }

  return redirectWithFlash('manual_paid');
});

app.get('/', async (c) => {
  const wantsInternalPricing = isTruthyFlag(c.req.query('noi-bo')) || isTruthyFlag(c.req.query('pricing'));
  let internalPricing = false;
  if (wantsInternalPricing && c.env.DB) {
    await ensureAdminSessionSchema(c.env.DB);
    internalPricing = Boolean(await getValidAdminSession(c.env.DB, c.req.raw));
  }
  const catalog = await loadCatalog(c.env, { includeSourcePrices: internalPricing });
  return c.html(renderHomePage(await getPageContext(c.env), catalog.plans, { internalPricing }));
});

app.get('/goi-esim', async (c) => {
  const catalog = await loadCatalog(c.env);
  return c.html(renderCatalogPage(await getPageContext(c.env), catalog.plans));
});

app.get('/tra-cuu-don', async (c) => {
  const magicLinkEmail = c.req.query('magic_email')?.trim() || '';
  const magicLinkPhoneLast4 = c.req.query('magic_phone_last4')?.trim() || '';
  const magicLinkStatus = c.req.query('magic_status')?.trim() || '';
  const search = {
    reference: '',
    email: '',
    phone: '',
    searched: false,
    message: 'Nhập email và 4 số cuối số điện thoại để nhận link đăng nhập mở lại đơn.',
  };
  const magicLink =
    magicLinkStatus || magicLinkEmail || magicLinkPhoneLast4
      ? {
          email: magicLinkEmail,
          phoneLast4: magicLinkPhoneLast4,
          message:
            magicLinkStatus === 'sent'
              ? 'Link đăng nhập đã được gửi về email nếu thông tin khớp với đơn đã mua.'
              : magicLinkStatus === 'unavailable'
                ? 'Tính năng gửi link đăng nhập đang tạm tắt vì chưa cấu hình email gửi.'
                : magicLinkStatus === 'invalid'
                  ? 'Nhập đúng email và 4 số cuối số điện thoại để nhận link đăng nhập.'
                  : magicLinkStatus === 'error'
                    ? 'Chưa gửi được link đăng nhập. Anh thử lại sau ít phút.'
                    : 'Nhập email và 4 số cuối số điện thoại để nhận link đăng nhập.',
        }
      : null;

  if (!c.env.DB) {
    search.message = 'Hệ thống tra cứu đơn chưa được bật trên website này.';
    return c.html(renderOrderLookupPage(await getPageContext(c.env), search, [], magicLink));
  }

  return c.html(renderOrderLookupPage(await getPageContext(c.env), search, [], magicLink));
});

app.post('/tra-cuu-don/gui-link', async (c) => {
  const payload = await parsePayload(c.req.raw);
  const email = normalizeEmail(toText(payload.email));
  const phoneLast4 = getPhoneLast4(toText(payload.phoneLast4));
  const redirectBase = `/tra-cuu-don?magic_email=${encodeURIComponent(email)}&magic_phone_last4=${encodeURIComponent(phoneLast4)}`;

  if (!c.env.DB) {
    return c.redirect(`${redirectBase}&magic_status=error`);
  }

  if (!email || phoneLast4.length !== 4) {
    return c.redirect(`${redirectBase}&magic_status=invalid`);
  }

  await ensureOrderSchema(c.env.DB);
  await ensureCustomerAccessSchema(c.env.DB);
  const attemptKey = `${getClientIp(c.req.raw)}:${email}`;
  const blockedUntil = await getCustomerMagicLinkBlock(c.env.DB, attemptKey);
  if (blockedUntil) {
    return c.redirect(`${redirectBase}&magic_status=error`);
  }
  const matches = await loadCustomerPortalOrders(c.env.DB, email, phoneLast4);
  if (matches.length === 0) {
    await recordCustomerMagicLinkAttempt(c.env.DB, attemptKey);
    return c.redirect(`${redirectBase}&magic_status=sent`);
  }

  if (!c.env.RESEND_API_KEY?.trim()) {
    await recordCustomerMagicLinkAttempt(c.env.DB, attemptKey);
    return c.redirect(`${redirectBase}&magic_status=unavailable`);
  }

  try {
    const loginToken = await createCustomerLoginToken(c.env.DB, email, phoneLast4, getClientIp(c.req.raw));
    const loginUrl = `${(c.env.SITE_URL || `https://${brand.domain}`).replace(/\/$/, '')}/don-cua-toi/verify?token=${encodeURIComponent(loginToken.id)}`;
    await sendCustomerLoginLinkEmail(c.env, {
      email,
      phoneLast4,
      loginUrl,
    });
    await clearCustomerMagicLinkAttempts(c.env.DB, attemptKey);
    return c.redirect(`${redirectBase}&magic_status=sent`);
  } catch (error) {
    console.error('Unable to send customer login link', error);
    await recordCustomerMagicLinkAttempt(c.env.DB, attemptKey);
    return c.redirect(`${redirectBase}&magic_status=error`);
  }
});

app.get('/don-cua-toi/verify', async (c) => {
  if (!c.env.DB) {
    return c.redirect('/tra-cuu-don');
  }

  await ensureCustomerAccessSchema(c.env.DB);
  const token = toText(c.req.query('token'));
  if (!token) {
    return c.redirect('/tra-cuu-don');
  }

  const loginToken = await consumeCustomerLoginToken(c.env.DB, token);
  if (!loginToken) {
    return c.redirect('/tra-cuu-don?magic_status=error');
  }

  const session = await createCustomerSession(c.env.DB, loginToken.email, loginToken.phone_last4);
  const response = c.redirect('/don-cua-toi');
  return appendCustomerSessionCookie(c.req.raw, response, session.id);
});

app.get('/don-cua-toi', async (c) => {
  if (!c.env.DB) {
    return c.redirect('/tra-cuu-don');
  }

  await ensureOrderSchema(c.env.DB);
  await ensureCustomerAccessSchema(c.env.DB);
  const session = await getValidCustomerSession(c.env.DB, c.req.raw);
  if (!session) {
    return c.redirect('/tra-cuu-don');
  }

  const orders = await loadCustomerPortalOrders(c.env.DB, session.email, session.phone_last4);
  if (orders.length === 0) {
    return c.redirect('/tra-cuu-don');
  }

  const response = c.html(
    renderCustomerPortalPage(await getPageContext(c.env), {
      email: session.email,
      phoneLast4: session.phone_last4,
      orders,
    }),
  );
  return appendCustomerSessionCookie(c.req.raw, response, session.id);
});

app.post('/don-cua-toi/dang-xuat', async (c) => {
  if (c.env.DB) {
    await deleteCustomerSession(c.env.DB, c.req.raw);
  }

  const response = c.redirect('/tra-cuu-don');
  return appendCookie(
    response,
    serializeCookie(CUSTOMER_SESSION_COOKIE_NAME, '', {
      maxAge: 0,
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: isSecureRequest(c.req.raw),
      sameSite: 'Lax',
    }),
  );
});

app.get('/mua-goi', async (c) => {
  const catalog = await loadCatalog(c.env);
  const planSlug = c.req.query('plan')?.trim() || '';
  const periodRaw = c.req.query('period')?.trim() || '';
  const quantityRaw = c.req.query('quantity')?.trim() || '';
  const periodNum = Number.isFinite(Number.parseInt(periodRaw, 10)) ? Number.parseInt(periodRaw, 10) : null;
  const quantityNum = Number.isFinite(Number.parseInt(quantityRaw, 10)) ? Number.parseInt(quantityRaw, 10) : 1;
  const matchedPlan = getCheckoutPlanFromRequest(catalog.plans, planSlug, '');

  if (matchedPlan) {
    const params = new URLSearchParams();
    if (typeof periodNum === 'number' && Number.isFinite(periodNum) && periodNum > 0) {
      params.set('period', String(periodNum));
    }
    if (typeof quantityNum === 'number' && Number.isFinite(quantityNum) && quantityNum > 1) {
      params.set('quantity', String(quantityNum));
    }
    const query = params.toString();
    return c.redirect(`/mua-goi/${encodeURIComponent(getPlanPublicHandle(matchedPlan))}${query ? `?${query}` : ''}`, 302);
  }

  return c.html(renderCheckoutPage(await getPageContext(c.env), catalog.plans, planSlug, periodNum, quantityNum));
});

app.get('/mua-goi/:handle', async (c) => {
  const catalog = await loadCatalog(c.env);
  const handle = c.req.param('handle')?.trim() || '';
  const periodRaw = c.req.query('period')?.trim() || '';
  const quantityRaw = c.req.query('quantity')?.trim() || '';
  const periodNum = Number.isFinite(Number.parseInt(periodRaw, 10)) ? Number.parseInt(periodRaw, 10) : null;
  const quantityNum = Number.isFinite(Number.parseInt(quantityRaw, 10)) ? Number.parseInt(quantityRaw, 10) : 1;
  const matchedPlan = getCheckoutPlanFromRequest(catalog.plans, '', handle);

  if (!matchedPlan) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  return c.html(renderCheckoutPage(await getPageContext(c.env), catalog.plans, matchedPlan.slug, periodNum, quantityNum));
});

app.get('/thanh-toan/:reference', async (c) => {
  if (!c.env.DB) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  await ensureOrderSchema(c.env.DB);
  const order = await getAuthorizedOrder(c.env.DB, c.req.raw, c.req.param('reference'));

  if (!order) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  if (order.payment_status === 'paid') {
    return c.redirect(buildPaymentSuccessPath(order.id, order.access_token ?? ''));
  }

  const catalog = await loadCatalog(c.env);
  const matchedPlan = catalog.plans.find((item) => item.slug === order.plan_slug) ?? null;
  const amountUsd = typeof order.amount_usd === 'number' && Number.isFinite(order.amount_usd)
    ? order.amount_usd
    : matchedPlan
      ? getPlanAmountUsd(matchedPlan, order.period_num)
      : 0;
  const amountVnd = typeof order.amount_vnd === 'number' && Number.isFinite(order.amount_vnd)
    ? order.amount_vnd
    : formatVndAmount(amountUsd);

  return c.html(
    renderPaymentPage(await getPageContext(c.env), {
      reference: order.id,
      accessToken: order.access_token ?? '',
      createdAt: order.created_at,
      fullName: order.full_name,
      email: order.email,
      phone: order.phone ?? '',
      planName:
        matchedPlan?.periodRequired && order.period_num
          ? `${matchedPlan.name} · ${order.period_num} ngày`
          : matchedPlan?.name ?? order.plan_name ?? order.plan_slug,
      planMeta:
        matchedPlan != null
          ? `${matchedPlan.dataAllowance} · ${matchedPlan.periodRequired && order.period_num ? `${order.period_num} ngày` : matchedPlan.validity}`
          : order.period_num
            ? `${order.period_num} ngày`
            : '',
      amountVnd,
      paymentStatus: order.payment_status ?? 'pending',
      paymentCode: order.payment_code ?? order.id,
      bankCode: c.env.PAYMENT_BANK_CODE || 'mb',
      accountNumber: c.env.PAYMENT_ACCOUNT_NUMBER || '7380113833666',
      accountName: c.env.PAYMENT_ACCOUNT_NAME || 'NGO MINH SON',
    }),
  );
});

app.get('/thanh-toan-thanh-cong/:reference', async (c) => {
  if (!c.env.DB) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  await ensureOrderSchema(c.env.DB);
  let order = await getAuthorizedOrder(c.env.DB, c.req.raw, c.req.param('reference'));

  if (!order) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  if (order.payment_status !== 'paid') {
    return c.redirect(buildPaymentPath(order.id, order.access_token ?? ''));
  }

  if (!order.access_qr_code_url && !(await shouldDeferProvision(c.env.DB, order.id))) {
    const provisionState = await provisionPaidOrder(c.env, c.env.DB, order.id);
    order = provisionState.order ?? order;
  }

  const catalog = await loadCatalog(c.env);
  const matchedPlan = catalog.plans.find((item) => item.slug === order.plan_slug) ?? null;
  const amountUsd = typeof order.amount_usd === 'number' && Number.isFinite(order.amount_usd)
    ? order.amount_usd
    : matchedPlan
      ? getPlanAmountUsd(matchedPlan, order.period_num)
      : 0;
  const amountVnd = typeof order.amount_vnd === 'number' && Number.isFinite(order.amount_vnd)
    ? order.amount_vnd
    : formatVndAmount(amountUsd);
  const topUpSupported = matchedPlan?.supportTopUpType === 2;
  const storedProfiles = parseStoredEsimProfiles(order);

  return c.html(
    renderPaymentSuccessPage(await getPageContext(c.env), {
      reference: order.id,
      accessToken: order.access_token ?? '',
      createdAt: order.created_at,
      paidAt: order.paid_at ?? order.created_at,
      fullName: order.full_name,
      email: order.email,
      phone: order.phone ?? '',
      paymentCode: order.payment_code ?? order.id,
      planName:
        matchedPlan?.periodRequired && order.period_num
          ? `${matchedPlan.name} · ${order.period_num} ngày`
          : matchedPlan?.name ?? order.plan_name ?? order.plan_slug,
      planMeta:
        matchedPlan != null
          ? `${matchedPlan.dataAllowance} · ${matchedPlan.periodRequired && order.period_num ? `${order.period_num} ngày` : matchedPlan.validity}`
          : order.period_num
            ? `${order.period_num} ngày`
            : '',
      amountVnd,
      quantity: clampOrderQuantity(order.quantity),
      topUpSupported,
      provisioningStatus: order.access_sync_status ?? null,
      provisioningError: order.access_sync_error ?? null,
      esims: storedProfiles.map((profile) => ({
        qrCodeUrl: profile.qrCodeUrl ?? '',
        shortUrl: profile.shortUrl ?? profile.qrCodeUrl ?? '',
        activationCode: profile.ac ?? '',
        iccid: profile.iccid ?? '',
        apn: profile.apn ?? '',
        pin: profile.pin ?? '',
        puk: profile.puk ?? '',
        smdpStatus: profile.smdpStatus ?? '',
        eid: profile.eid ?? '',
      })),
    }),
  );
});

app.get('/api/orders/:reference/usage', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Hệ thống chưa bật lưu đơn.' }, 503);
  }

  await ensureOrderSchema(c.env.DB);
  const rateLimit = await enforceEsimAccessRouteLimit(c.env.DB, c.req.raw, 'usage', c.req.param('reference'));
  if (rateLimit.blocked) {
    c.header('Retry-After', String(formatRetryAfterSeconds(rateLimit.blockedUntil)));
    return c.json({ ok: false, error: 'Anh thao tác hơi nhanh. Vui lòng thử lại sau ít phút.' }, 429);
  }
  let order = await getAuthorizedOrder(c.env.DB, c.req.raw, c.req.param('reference'));

  if (!order) {
    return c.json({ ok: false, error: 'Không tìm thấy đơn.' }, 404);
  }

  if (order.payment_status === 'paid' && !order.access_iccid && !(await shouldDeferProvision(c.env.DB, order.id))) {
    const provisionState = await provisionPaidOrder(c.env, c.env.DB, order.id);
    order = provisionState.order ?? order;
  }

  if (!order.access_iccid) {
    return c.json({ ok: false, error: 'Đơn này chưa có ICCID để kiểm tra dung lượng.' }, 400);
  }

  try {
    const usage = await queryEsimAccessUsage(c.env, order.access_iccid);
    const totalBytes = typeof usage?.totalVolume === 'number' ? usage.totalVolume : 0;
    const usedBytes = typeof usage?.orderUsage === 'number' ? usage.orderUsage : 0;
    const remainingBytes = Math.max(0, totalBytes - usedBytes);

    return c.json({
      ok: true,
      reference: order.id,
      iccid: order.access_iccid,
      totalLabel: formatDataAmount(totalBytes),
      usedLabel: formatDataAmount(usedBytes),
      remainingLabel: formatDataAmount(remainingBytes),
      totalBytes,
      usedBytes,
      remainingBytes,
      validityLabel: formatDuration(usage?.totalDuration ?? null, usage?.durationUnit ?? null),
      expiredAtLabel: formatDateTimeLabel(usage?.expiredTime ?? order.access_expired_time),
    });
  } catch (error) {
    return c.json(
      {
        ok: false,
        error: 'Chưa kiểm tra được dung lượng lúc này. Anh thử lại sau ít phút.',
      },
      502,
    );
  }
});

app.get('/api/orders/:reference/topups', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Hệ thống chưa bật lưu đơn.' }, 503);
  }

  await ensureOrderSchema(c.env.DB);
  const rateLimit = await enforceEsimAccessRouteLimit(c.env.DB, c.req.raw, 'topups', c.req.param('reference'));
  if (rateLimit.blocked) {
    c.header('Retry-After', String(formatRetryAfterSeconds(rateLimit.blockedUntil)));
    return c.json({ ok: false, error: 'Anh thao tác hơi nhanh. Vui lòng thử lại sau ít phút.' }, 429);
  }
  let order = await getAuthorizedOrder(c.env.DB, c.req.raw, c.req.param('reference'));

  if (!order) {
    return c.json({ ok: false, error: 'Không tìm thấy đơn.' }, 404);
  }

  if (order.payment_status === 'paid' && !order.access_iccid && !(await shouldDeferProvision(c.env.DB, order.id))) {
    const provisionState = await provisionPaidOrder(c.env, c.env.DB, order.id);
    order = provisionState.order ?? order;
  }

  const catalog = await loadCatalog(c.env);
  const matchedPlan = catalog.plans.find((item) => item.slug === order.plan_slug) ?? null;
  if (!matchedPlan || matchedPlan.supportTopUpType !== 2) {
    return c.json({ ok: false, error: 'Gói này hiện không hỗ trợ nạp thêm data.' }, 400);
  }

  if (!order.access_iccid) {
    return c.json({ ok: false, error: 'Đơn này chưa có ICCID để lấy gói nạp thêm.' }, 400);
  }

  try {
    const topups = await listEsimAccessTopUps(c.env, order.access_iccid);
    return c.json({
      ok: true,
      reference: order.id,
      items: topups.map((item) => {
        const priceUsd = Number((((item.price ?? 0) || 0) / 10000).toFixed(2));
        const priceVnd = formatVndAmount(priceUsd);
        return {
          packageCode: item.packageCode ?? '',
          name: item.name ?? 'Gói nạp thêm',
          dataLabel: formatDataAmount(item.volume ?? 0),
          validityLabel: formatDuration(item.duration ?? null, item.durationUnit ?? null),
          priceUsd,
          priceVnd: `${moneyVnd.format(priceVnd)}đ`,
        };
      }),
    });
  } catch (error) {
    return c.json(
      {
        ok: false,
        error: 'Chưa lấy được danh sách gói nạp thêm lúc này. Anh thử lại sau ít phút.',
      },
      502,
    );
  }
});

app.post('/api/orders/:reference/topups', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Hệ thống chưa bật lưu đơn.' }, 503);
  }

  await ensureOrderSchema(c.env.DB);
  let order = await getAuthorizedOrder(c.env.DB, c.req.raw, c.req.param('reference'));

  if (!order) {
    return c.json({ ok: false, error: 'Không tìm thấy đơn.' }, 404);
  }

  if (order.payment_status !== 'paid') {
    return c.json({ ok: false, error: 'Chỉ có thể mua thêm dung lượng sau khi đơn gốc đã thanh toán.' }, 400);
  }

  if (!order.access_iccid && !(await shouldDeferProvision(c.env.DB, order.id))) {
    const provisionState = await provisionPaidOrder(c.env, c.env.DB, order.id);
    order = provisionState.order ?? order;
  }

  if (!order.access_iccid) {
    return c.json({ ok: false, error: 'Đơn này chưa sẵn sàng để mua thêm dung lượng.' }, 400);
  }

  return c.json(
    {
      ok: false,
      error:
        'Tạm thời đã tắt thanh toán top-up trực tiếp. API hiện tại của nhà cung cấp chưa gắn chắc top-up vào đúng ICCID đang dùng, nên bên mình chỉ hiển thị danh sách gói để tham khảo.',
    },
    409,
  );
});

app.get('/api/orders/:reference/status', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Hệ thống chưa bật lưu đơn.' }, 503);
  }

  await ensureOrderSchema(c.env.DB);
  const rateLimit = await enforceEsimAccessRouteLimit(c.env.DB, c.req.raw, 'status', c.req.param('reference'));
  if (rateLimit.blocked) {
    c.header('Retry-After', String(formatRetryAfterSeconds(rateLimit.blockedUntil)));
    return c.json({ ok: false, error: 'Anh thao tác hơi nhanh. Vui lòng thử lại sau ít phút.' }, 429);
  }
  let order = await getAuthorizedOrder(c.env.DB, c.req.raw, c.req.param('reference'));

  if (!order) {
    return c.json({ ok: false, error: 'Không tìm thấy đơn.' }, 404);
  }

  if (order.payment_status === 'paid' && !order.access_qr_code_url && !(await shouldDeferProvision(c.env.DB, order.id))) {
    const provisionState = await provisionPaidOrder(c.env, c.env.DB, order.id);
    order = provisionState.order ?? order;
  }

  return c.json({
    ok: true,
    reference: order.id,
    paymentStatus: order.payment_status ?? 'pending',
    paidAt: order.paid_at ?? null,
    esimReady: Boolean(order.access_qr_code_url),
    esimStatus: order.access_sync_status ?? null,
    esimError: order.access_sync_error ?? null,
  });
});

app.get('/site-assets/*', async (c) => {
  const key = getSiteAssetKeyFromPath(c.req.path);
  if (!key) {
    return c.notFound();
  }

  if (c.env.SITE_ASSETS_BUCKET) {
    const object = await c.env.SITE_ASSETS_BUCKET.get(key);
    if (object?.body) {
      const headers = new Headers();
      headers.set('content-type', object.httpMetadata?.contentType || 'application/octet-stream');
      headers.set('x-content-type-options', 'nosniff');
      headers.set('cache-control', object.httpMetadata?.cacheControl || SITE_ASSET_CACHE_CONTROL);
      headers.set('etag', object.httpEtag);
      return new Response(object.body, { headers });
    }
  }

  if (!c.env.DB) {
    return c.notFound();
  }

  await ensureSiteAssetsSchema(c.env.DB);
  const record = await c.env.DB.prepare('SELECT content, content_type FROM site_assets WHERE asset_key = ?')
    .bind(key)
    .first<{ content: unknown; content_type: string }>();
  const body = toSiteAssetBinaryBody(record?.content);
  if (!record || !body) {
    return c.notFound();
  }

  const headers = new Headers();
  headers.set('content-type', record.content_type || 'application/octet-stream');
  headers.set('x-content-type-options', 'nosniff');
  headers.set('cache-control', SITE_ASSET_CACHE_CONTROL);
  return new Response(body, { headers });
});

app.post('/api/payment-webhook', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Hệ thống chưa bật lưu đơn.' }, 503);
  }

  const expectedSecret = c.env.PAYMENT_WEBHOOK_SECRET?.trim() || '';
  if (!expectedSecret) {
    return c.json({ ok: false, error: 'Webhook secret chưa được cấu hình an toàn trên worker.' }, 503);
  }
  const expectedAccountNumber = normalizeAccountNumber(c.env.PAYMENT_ACCOUNT_NUMBER || '');
  if (!expectedAccountNumber) {
    return c.json({ ok: false, error: 'Tài khoản nhận tiền chưa được cấu hình an toàn trên worker.' }, 503);
  }
  const providedSecret = c.req.header('x-webhook-secret')?.trim() || '';
  if (providedSecret !== expectedSecret) {
    return c.json({ ok: false, error: 'Webhook secret không hợp lệ.' }, 401);
  }

  await ensureOrderSchema(c.env.DB);
  const payload = await parsePayload(c.req.raw);
  const description = toText(payload.description) || toText(payload.content) || toText(payload.note);
  const refNo = toText(payload.refNo) || toText(payload.transactionId);
  const accountNumber = toText(payload.accountNo) || toText(payload.accountNumber);
  const amountVnd = toAmountVnd(payload.creditAmount) ?? toAmountVnd(payload.amount);
  const reference = extractOrderReference(description, refNo);
  const paymentCode = extractPaymentCode(description, refNo);
  const routeKey = getWebhookRouteKey(description, refNo);
  const externalReference = routeKey === 'nta' ? extractNtaOrderReference(description, refNo) : '';
  const externalPaymentCode = routeKey === 'nta' ? extractNtaPaymentCode(description, refNo) : '';
  const matchedReference = reference || paymentCode || externalReference || externalPaymentCode;

  if ((!reference && !paymentCode && !externalReference && !externalPaymentCode) || !amountVnd || amountVnd <= 0) {
    await recordPaymentWebhookEvent(c.env.DB, payload, {
      refNo,
      description,
      amountVnd,
      accountNumber,
      matchedReference,
      matchStatus: 'ignored',
      reason: 'missing_reference_or_amount',
    });
    return c.json({
      ok: true,
      matched: false,
      reason: 'missing_reference_or_amount',
    });
  }

  if (!normalizeAccountNumber(accountNumber)) {
    await recordPaymentWebhookEvent(c.env.DB, payload, {
      refNo,
      description,
      amountVnd,
      accountNumber,
      matchedReference,
      matchStatus: 'ignored',
      reason: 'missing_account_number',
    });
    return c.json({ ok: true, matched: false, reason: 'missing_account_number', reference: matchedReference });
  }

  if (!accountNumbersMatch(expectedAccountNumber, accountNumber)) {
    await recordPaymentWebhookEvent(c.env.DB, payload, {
      refNo,
      description,
      amountVnd,
      accountNumber,
      matchedReference,
      matchStatus: 'ignored',
      reason: 'account_mismatch',
    });
    return c.json({
      ok: true,
      matched: false,
      reason: 'account_mismatch',
      reference: matchedReference,
    });
  }

  if (routeKey === 'nta') {
    const forwarded = await forwardPaymentWebhook(c.env, payload, 'nta', {
      description,
      refNo,
      amountVnd,
      accountNumber,
      matchedReference,
    });
    await recordPaymentWebhookEvent(c.env.DB, payload, {
      refNo,
      description,
      amountVnd,
      accountNumber,
      matchedReference,
      matchStatus: forwarded.ok ? 'forwarded' : 'ignored',
      reason: forwarded.ok ? 'forwarded_to_nta' : forwarded.error || `forward_failed_${forwarded.status}`,
    });
    return c.json({
      ok: forwarded.ok,
      forwarded: true,
      route: 'nta',
      reference: matchedReference,
      status: forwarded.status,
      response: forwarded.body ?? forwarded.error ?? null,
    }, forwarded.ok ? 200 : 502);
  }

  const order = reference
    ? await c.env.DB
        .prepare(
          'SELECT id, access_token, amount_vnd, payment_status, full_name, email, plan_name, plan_slug, period_num, payment_code, payment_email_sent_at FROM orders WHERE id = ?',
        )
        .bind(reference)
        .first<{
          access_token: string | null;
          id: string;
          amount_vnd: number | null;
          payment_status: string | null;
          full_name: string;
          email: string;
          plan_name: string | null;
          plan_slug: string;
          period_num: number | null;
          payment_code: string | null;
          payment_email_sent_at: string | null;
        }>()
    : await c.env.DB
        .prepare(
          'SELECT id, access_token, amount_vnd, payment_status, full_name, email, plan_name, plan_slug, period_num, payment_code, payment_email_sent_at FROM orders WHERE payment_code = ?',
        )
        .bind(paymentCode)
        .first<{
          access_token: string | null;
          id: string;
          amount_vnd: number | null;
          payment_status: string | null;
          full_name: string;
          email: string;
          plan_name: string | null;
          plan_slug: string;
          period_num: number | null;
          payment_code: string | null;
          payment_email_sent_at: string | null;
        }>();
  const normalizedOrder =
    order && order.access_token
      ? order
      : order
        ? {
            ...order,
            access_token: buildOrderAccessToken(),
          }
        : null;
  if (order && !order.access_token) {
    await c.env.DB.prepare('UPDATE orders SET access_token = ? WHERE id = ?').bind(normalizedOrder?.access_token ?? null, order.id).run();
  }
  const matchedOrderReference = normalizedOrder?.id ?? reference;

  if (!normalizedOrder) {
    await recordPaymentWebhookEvent(c.env.DB, payload, {
      refNo,
      description,
      amountVnd,
      accountNumber,
      matchedReference: matchedOrderReference || paymentCode,
      matchStatus: 'ignored',
      reason: 'order_not_found',
    });
    return c.json({
      ok: true,
      matched: false,
      reason: 'order_not_found',
      reference: matchedOrderReference || paymentCode,
    });
  }

  if (typeof normalizedOrder.amount_vnd === 'number' && normalizedOrder.amount_vnd > 0 && normalizedOrder.amount_vnd !== amountVnd) {
    await recordPaymentWebhookEvent(c.env.DB, payload, {
      refNo,
      description,
      amountVnd,
      accountNumber,
      matchedReference: matchedOrderReference,
      matchStatus: 'ignored',
      reason: 'amount_mismatch',
    });
    return c.json({
      ok: true,
      matched: false,
      reason: 'amount_mismatch',
      reference: matchedOrderReference,
      expectedAmountVnd: normalizedOrder.amount_vnd,
      receivedAmountVnd: amountVnd,
    });
  }

  const paidAt = new Date().toISOString();
  await c.env.DB
    .prepare(
      `UPDATE orders
       SET payment_status = ?, payment_ref = ?, payment_note = ?, payment_amount = ?, paid_at = ?
       WHERE id = ?`,
    )
    .bind('paid', refNo || null, description || null, amountVnd, paidAt, matchedOrderReference)
    .run();

  await recordPaymentWebhookEvent(c.env.DB, payload, {
    refNo,
    description,
    amountVnd,
    accountNumber,
    matchedReference: matchedOrderReference,
    matchStatus: 'matched',
    reason: 'paid',
  });

  await sendOrderPaymentSuccessEmailIfNeeded(c.env, c.env.DB, matchedOrderReference, {
    amountVnd,
    paidAt,
    paymentCodeFallback: paymentCode ?? matchedOrderReference,
  });

  c.executionCtx.waitUntil(provisionPaidOrder(c.env, c.env.DB, matchedOrderReference).then(() => undefined));

  return c.json({
    ok: true,
    matched: true,
    reference: matchedOrderReference,
    paymentStatus: 'paid',
    accountNumber,
    amountVnd,
  });
});


const normalizeChatText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

const truncateChatText = (value: string, maxLength = 1600) => value.slice(0, maxLength).trim();

const ensureChatSchema = async (db: D1Database) => {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS chat_sessions (
        id TEXT PRIMARY KEY,
        visitor_name TEXT,
        visitor_phone TEXT,
        visitor_email TEXT,
        source TEXT NOT NULL DEFAULT 'website',
        page_url TEXT,
        status TEXT NOT NULL DEFAULT 'bot',
        lead_stage TEXT NOT NULL DEFAULT 'new',
        handoff_requested INTEGER NOT NULL DEFAULT 0,
        handoff_reason TEXT,
        last_intent TEXT,
        last_message_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
    )
    .run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS chat_sessions_updated_at_idx ON chat_sessions(updated_at DESC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS chat_sessions_status_idx ON chat_sessions(status, handoff_requested, updated_at DESC)`).run();
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        body TEXT NOT NULL,
        intent TEXT,
        metadata_json TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
      )`,
    )
    .run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS chat_messages_session_idx ON chat_messages(session_id, created_at ASC)`).run();
};

const getChatSessionById = async (db: D1Database, sessionId: string) => {
  const result = await db
    .prepare(
      `SELECT id, visitor_name, visitor_phone, visitor_email, source, page_url, status, lead_stage, handoff_requested, handoff_reason, last_intent, last_message_at, created_at, updated_at
       FROM chat_sessions
       WHERE id = ?`,
    )
    .bind(sessionId)
    .first<StoredChatSession>();
  return result ?? null;
};

const listChatMessages = async (db: D1Database, sessionId: string) => {
  const result = await db
    .prepare(
      `SELECT id, session_id, role, body, intent, metadata_json, created_at
       FROM chat_messages
       WHERE session_id = ?
       ORDER BY created_at ASC`,
    )
    .bind(sessionId)
    .all<StoredChatMessage>();
  return result.results ?? [];
};

const createChatSession = async (db: D1Database, input: { source?: string; pageUrl?: string | null }) => {
  const now = new Date().toISOString();
  const sessionId = `chat_${crypto.randomUUID().replaceAll('-', '')}`;
  await db
    .prepare(
      `INSERT INTO chat_sessions (
        id, source, page_url, status, lead_stage, handoff_requested, last_message_at, created_at, updated_at
      ) VALUES (?, ?, ?, 'bot', 'new', 0, ?, ?, ?)`,
    )
    .bind(sessionId, input.source || 'website', input.pageUrl || null, now, now, now)
    .run();
  return (await getChatSessionById(db, sessionId)) as StoredChatSession;
};

const appendChatMessage = async (
  db: D1Database,
  sessionId: string,
  role: 'user' | 'bot' | 'system',
  body: string,
  options: { intent?: string | null; metadata?: Record<string, unknown> | null } = {},
) => {
  const createdAt = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO chat_messages (id, session_id, role, body, intent, metadata_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      crypto.randomUUID(),
      sessionId,
      role,
      truncateChatText(body),
      options.intent ?? null,
      options.metadata ? JSON.stringify(options.metadata) : null,
      createdAt,
    )
    .run();
  await db
    .prepare(
      `UPDATE chat_sessions
       SET updated_at = ?, last_message_at = ?, last_intent = COALESCE(?, last_intent)
       WHERE id = ?`,
    )
    .bind(createdAt, createdAt, options.intent ?? null, sessionId)
    .run();
};

const buildCatalogRecommendation = (catalogPlans: Plan[], normalizedText: string) => {
  const mainlandPlans = catalogPlans
    .filter((plan) => !plan.hiddenFromCatalog && (plan.catalogGroup === 'mainland' || !plan.catalogGroup))
    .sort((left, right) => left.priceUsd - right.priceUsd);
  const compactPlan = mainlandPlans.find((plan) => (plan.durationDays ?? 0) <= 7) ?? mainlandPlans[0];
  const balancedPlan = mainlandPlans.find((plan) => (plan.durationDays ?? 0) >= 10 && (plan.durationDays ?? 0) <= 16) ?? mainlandPlans[1] ?? compactPlan;
  const heavyPlan = mainlandPlans.find((plan) => (plan.durationDays ?? 0) >= 30) ?? mainlandPlans.at(-1) ?? balancedPlan ?? compactPlan;

  if (/([1-7])\s*ngay/.test(normalizedText) || normalizedText.includes('7 ngay')) {
    return compactPlan;
  }
  if (/([8-9]|1[0-6])\s*ngay/.test(normalizedText) || normalizedText.includes('15 ngay')) {
    return balancedPlan;
  }
  if (/([2-9][0-9])\s*ngay/.test(normalizedText) || normalizedText.includes('30 ngay') || normalizedText.includes('o lau')) {
    return heavyPlan;
  }

  if (normalizedText.includes('hotspot') || normalizedText.includes('phat wifi') || normalizedText.includes('nhieu data')) {
    return heavyPlan;
  }

  return balancedPlan ?? compactPlan ?? heavyPlan ?? catalogPlans[0];
};

const extractTripDaysForSales = (message: string, historyMessages: string[] = []) => {
  const sources = [message, ...historyMessages].map((item) => normalizeChatText(item));
  for (const source of sources) {
    const stayMatch = source.match(/\b(\d+)\s*n\s*(\d+)\s*dem\b/);
    if (stayMatch) {
      const days = Number(stayMatch[1]);
      if (days > 0) return days;
    }
    const dayMatch = source.match(/\b(\d+)\s*ngay\b/);
    if (dayMatch) {
      const days = Number(dayMatch[1]);
      if (days > 0) return days;
    }
  }
  return null;
};

const buildChatActionLink = (plan: Plan) => `/mua-goi/${encodeURIComponent(getPlanPublicHandle(plan))}`;

const isRecommendationRequestMessage = (normalizedMessage: string) => {
  if (/\b\d+\s*ngay\b/.test(normalizedMessage)) {
    return true;
  }
  if (/\b\d+\s*n\s*\d+\s*dem\b/.test(normalizedMessage)) {
    return true;
  }
  return [
    'goi nao',
    'mua goi gi',
    'mua sim gi',
    'nen dung goi nao',
    'nen mua goi nao',
    'tu van goi',
    'chon goi',
    'di 2 ngay',
    'di 3 ngay',
    'di 1 ngay',
    '3n2 dem',
    '2n1 dem',
  ].some((keyword) => normalizedMessage.includes(keyword));
};

const buildDeterministicSalesReply = (message: string, historyMessages: string[] = [], catalogPlans: Plan[]) => {
  const normalizedMessage = normalizeChatText(message);
  const tripDays = extractTripDaysForSales(message, historyMessages);
  const visiblePlans = catalogPlans.filter((plan) => !plan.hiddenFromCatalog);
  const dailyPlans = visiblePlans.filter((plan) => {
    const dataAllowance = normalizeChatText(plan.dataAllowance || '');
    const validity = normalizeChatText(plan.validity || '');
    return /\/ngay/i.test(dataAllowance) || /theo ngay/i.test(validity);
  });

  const prefer2gbDaily = [...dailyPlans].sort((a, b) => {
    const score = (plan: Plan) => {
      const data = normalizeChatText(plan.dataAllowance || '');
      const ip = normalizeChatText(plan.ipExport || '');
      const price = Number(String(plan.priceVnd).replace(/[^\d]/g, '')) || 0;
      let points = 0;
      if (data.includes('2gb/ngay')) points += 1200;
      else if (data.includes('3gb/ngay')) points += 900;
      else if (data.includes('1gb/ngay')) points += 500;
      if (ip.includes('hk')) points += 120;
      if (plan.googleAccess) points += 80;
      points -= price / 1000;
      return points;
    };
    return score(b) - score(a);
  });

  const backupPack = visiblePlans
    .filter((plan) => !dailyPlans.includes(plan))
    .filter((plan) => {
      const validity = normalizeChatText(plan.validity || '');
      const data = normalizeChatText(plan.dataAllowance || '');
      const price = Number(String(plan.priceVnd).replace(/[^\d]/g, '')) || 0;
      return data.includes('3gb') && /15\s*ngay/i.test(validity) && price >= 100000;
    })
    .sort((a, b) => (Number(String(a.priceVnd).replace(/[^\d]/g, '')) || 0) - (Number(String(b.priceVnd).replace(/[^\d]/g, '')) || 0))[0] || null;

  const dailyPlan = prefer2gbDaily[0] || null;
  const totalPlan = backupPack;
  const ctaActions = [
    ...(dailyPlan ? [{ label: 'Mua 2GB/ngày', href: buildChatActionLink(dailyPlan), kind: 'primary' as const }] : []),
    ...(totalPlan ? [{ label: 'Xem gói tổng', href: buildChatActionLink(totalPlan), kind: 'secondary' as const }] : []),
  ];

  if (
    normalizedMessage.includes('ok cho a goi') ||
    normalizedMessage.includes('ok cho anh goi') ||
    normalizedMessage.includes('chot goi') ||
    normalizedMessage.includes('lay goi nay') ||
    normalizedMessage.includes('ok lay goi') ||
    normalizedMessage.includes('ok roi em') ||
    normalizedMessage.includes('ok roi') ||
    normalizedMessage.includes('roi em') ||
    normalizedMessage.includes('goi do') ||
    normalizedMessage.includes('chot cho anh') ||
    normalizedMessage.includes('chot cho a') ||
    normalizedMessage.includes('lay goi do')
  ) {
    const bubbles = [
      dailyPlan
        ? `Dạ được anh. Em giữ sẵn gói ${dailyPlan.name} cho mình rồi, anh bấm nút Mua 2GB/ngày bên dưới là sang trang chốt đơn luôn.`
        : 'Dạ được anh, anh bấm nút mua bên dưới là sang trang chốt đơn luôn.',
      totalPlan ? `Nếu muốn so sánh thêm trước khi chốt thì em để sẵn một nút xem gói tổng để anh chọn nhanh.` : 'Anh bấm xong là có thể điền thông tin và thanh toán luôn.',
    ];
    return {
      intent: 'sales-checkout-cta',
      handoffRequested: false,
      reply: bubbles.join('\n'),
      messages: bubbles,
      quickReplies: [],
      actions: ctaActions,
    };
  }

  if (
    (normalizedMessage.includes('sim ngay') && normalizedMessage.includes('tong')) ||
    normalizedMessage.includes('khac nhau gi') ||
    normalizedMessage.includes('sao lai dat hon') ||
    normalizedMessage.includes('dat hon 3gb') ||
    normalizedMessage.includes('mua 2gb thoi')
  ) {
    const bubbles = [
      'Đúng rồi anh, nhìn riêng giá tiền thì gói theo ngày sẽ thấy cao hơn gói tổng.',
      'Bù lại gói theo ngày dễ dùng hơn cho chuyến ngắn vì mỗi ngày anh có data mới, không phải canh từng chút xem còn bao nhiêu dung lượng.',
      'Còn gói tổng thì rẻ hơn vì mình dùng chung một cục data cho cả chu kỳ, ví dụ 3GB/15 ngày là phải tự chia 3GB đó trong suốt 15 ngày.',
    ];
    if (dailyPlan) {
      bubbles.push(`Nếu anh chỉ đi ngắn 2-3 ngày thì bên em vẫn nghiêng về ${dailyPlan.name} (${dailyPlan.priceVnd}/ngày) vì đủ dùng TikTok, Maps, Facebook cho nhu cầu phổ thông.`);
    }
    if (totalPlan) {
      bubbles.push(`Còn nếu anh ưu tiên tiết kiệm hơn thì có thể chuyển sang ${totalPlan.name} (${totalPlan.priceVnd}) theo kiểu gói tổng.`);
    }
    return {
      intent: 'sales-explain-daily-vs-total',
      handoffRequested: false,
      reply: bubbles.join('\n'),
      messages: bubbles,
      quickReplies: [],
      actions: ctaActions,
    };
  }

  const shouldRecommendNow = !!tripDays && isRecommendationRequestMessage(normalizedMessage);
  if (!shouldRecommendNow) return null;

  const mainDaily = prefer2gbDaily[0] || dailyPlans[0] || null;
  if (!mainDaily && !backupPack) return null;

  const bubbles: string[] = [];
  if (mainDaily) {
    const perDay = Number(String(mainDaily.priceVnd).replace(/[^\d]/g, '')) || 0;
    const total = perDay * tripDays;
    const totalText = new Intl.NumberFormat('vi-VN').format(total) + 'đ';
    bubbles.push(`Anh đi ${tripDays} ngày thì em nghiêng về ${mainDaily.name} (${mainDaily.priceVnd}/ngày) nha, tính ra khoảng ${totalText} cho cả chuyến.`);
    bubbles.push('Gói này hợp kiểu đi Đông Hưng/Nam Ninh ngắn ngày, đủ dùng TikTok, Google Maps, Facebook và đỡ phải ngồi canh dung lượng liên tục.');
  }
  if (backupPack) {
    bubbles.push(`Nếu anh muốn mua một lần cho gọn hơn thì em gợi ý thêm ${backupPack.name} (${backupPack.priceVnd}) theo kiểu gói tổng.`);
  }
  bubbles.push('Anh nghiêng về tiết kiệm hơn hay muốn dùng thoải mái hơn để em chốt đúng một gói cho anh?');

  return {
    intent: 'sales-recommendation',
    handoffRequested: false,
    reply: bubbles.join('\n'),
    messages: bubbles,
    quickReplies: [],
    actions: ctaActions,
  };
};

const isGreetingOnlyMessage = (normalized: string) => {
  const compact = normalized.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const greetingPatterns = [
    /^(alo|a lo|hello|hi|helo|hey|chao|chao em|em oi|oi em|ad oi|shop oi|tu van oi)$/,
    /^(alo em|alo shop|alo ad|xin chao|chao shop|chao ad)$/,
  ];
  return greetingPatterns.some((pattern) => pattern.test(compact));
};

const buildRuleBasedChatReply = (message: string, catalogPlans: Plan[]) => {
  const normalized = normalizeChatText(message);
  const recommendedPlan = buildCatalogRecommendation(catalogPlans, normalized);
  const compactPlan = catalogPlans.find((plan) => plan.slug === 'china-esim-1gb-7-days') ?? catalogPlans[0];
  const balancedPlan = catalogPlans.find((plan) => plan.slug === 'china-esim-3gb-15-days') ?? recommendedPlan ?? catalogPlans[1] ?? compactPlan;
  const heavyPlan = catalogPlans.find((plan) => plan.slug === 'china-esim-10gb-30-days') ?? recommendedPlan ?? catalogPlans.at(-1) ?? balancedPlan;
  const lines: string[] = [];
  let intent = 'general';
  let handoffRequested = false;

  if (!normalized || isGreetingOnlyMessage(normalized)) {
    return {
      intent: 'welcome',
      handoffRequested: false,
      reply:
        'Dạ em chào anh/chị. EsimCN đang hỗ trợ tư vấn eSIM Trung Quốc. Anh/chị chuẩn bị đi mấy ngày để em gợi ý đúng gói cho mình?',
      messages: ['Dạ em chào anh/chị 👋', 'EsimCN đang hỗ trợ tư vấn eSIM Trung Quốc.', 'Anh/chị chuẩn bị đi mấy ngày để em gợi ý đúng gói cho mình?'],
      quickReplies: [...CHAT_QUICK_REPLIES],
      actions: [],
    };
  }

  if (normalized.includes('gap tu van vien') || normalized.includes('nguoi that') || normalized.includes('goi lai') || normalized.includes('tu van vien')) {
    intent = 'handoff';
    handoffRequested = true;
    lines.push('EsimCN đã ghi nhận yêu cầu cần hỗ trợ thêm từ tư vấn viên.');
    lines.push('Anh/chị vui lòng để lại số Zalo hoặc số điện thoại để đội ngũ hỗ trợ liên hệ sớm.');
    lines.push('Trong lúc chờ, ' + balancedPlan.name + ' (' + balancedPlan.priceVnd + ') là gói được nhiều khách lựa chọn cho lịch trình phổ biến.');
  } else if (normalized.includes('google') || normalized.includes('facebook') || normalized.includes('tiktok') || normalized.includes('gmail') || normalized.includes('maps')) {
    intent = 'blocked-apps';
    lines.push('Các gói eSIM của EsimCN ưu tiên tuyến IP HK/SG nên Google, Gmail, Maps, Facebook và TikTok hoạt động ổn định hơn so với roaming thông thường.');
    lines.push('Với lịch trình khoảng 1-2 tuần, ' + balancedPlan.name + ' (' + balancedPlan.priceVnd + ') là lựa chọn phù hợp và dễ sử dụng.');
  } else if (normalized.includes('gia') || normalized.includes('bao nhieu') || normalized.includes('bang gia') || normalized.includes('goi pho bien')) {
    intent = 'pricing';
    lines.push('Một số gói được khách hàng lựa chọn nhiều hiện tại:');
    if (compactPlan) lines.push('- ' + compactPlan.name + ': ' + compactPlan.priceVnd);
    if (balancedPlan) lines.push('- ' + balancedPlan.name + ': ' + balancedPlan.priceVnd);
    if (heavyPlan) lines.push('- ' + heavyPlan.name + ': ' + heavyPlan.priceVnd);
    lines.push('Anh/chị đi trong bao nhiêu ngày để EsimCN gợi ý gói phù hợp hơn?');
  } else if (normalized.includes('esim') && (normalized.includes('iphone') || normalized.includes('samsung') || normalized.includes('ho tro'))) {
    intent = 'device-support';
    lines.push('Thiết bị cần hỗ trợ eSIM và ở trạng thái mở mạng để sử dụng.');
    lines.push('Thông thường iPhone từ XS/XR trở lên và nhiều dòng Samsung/Pixel đời mới sẽ hỗ trợ eSIM.');
    lines.push('Anh/chị có thể gửi model máy cụ thể để EsimCN kiểm tra giúp.');
  } else if (normalized.includes('sim vat ly') || normalized.includes('sim thuong')) {
    intent = 'physical-sim';
    lines.push('Hiện tại EsimCN tập trung tư vấn các gói eSIM Trung Quốc để cài QR trước chuyến đi.');
    lines.push('Nếu thiết bị không hỗ trợ eSIM, anh/chị có thể gửi model máy để được kiểm tra phương án phù hợp.');
  } else {
    intent = 'plan-recommendation';
    if (recommendedPlan) {
      lines.push('Theo nhu cầu vừa gửi, EsimCN đề xuất ' + recommendedPlan.name + ' (' + recommendedPlan.priceVnd + ').');
      lines.push('Gói này phù hợp cho lịch trình ' + (recommendedPlan.validity || 'ngắn ngày') + ', data ' + recommendedPlan.dataAllowance + ' và nhu cầu sử dụng các ứng dụng phổ biến.');
    } else {
      lines.push('Anh/chị vui lòng cho biết thêm số ngày đi và nhu cầu data để EsimCN tư vấn chính xác hơn.');
    }
    lines.push('Anh/chị có thể gửi thêm số ngày đi và nhu cầu sử dụng để EsimCN tư vấn sát hơn.');
  }

  return {
    intent,
    handoffRequested,
    reply: lines.join('\n'),
    messages: lines.slice(0, CHAT_SETTINGS.ai.maxBubbles),
    quickReplies: [],
    actions: [],
  };
};

const callOpenClawChatWebhook = async (
  env: Bindings,
  payload: {
    sessionId: string;
    message: string;
    messages: StoredChatMessage[];
    pageUrl?: string | null;
    chatSettings?: typeof CHAT_SETTINGS;
  },
) => {
  if (!env.OPENCLAW_CHAT_WEBHOOK) {
    return null;
  }

  const response = await fetch(env.OPENCLAW_CHAT_WEBHOOK, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(env.OPENCLAW_CHAT_SECRET ? { authorization: `Bearer ${env.OPENCLAW_CHAT_SECRET}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`OpenClaw webhook failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    reply?: string;
    handoffRequested?: boolean;
    quickReplies?: string[];
    intent?: string;
  };

  if (!data.reply?.trim()) {
    return null;
  }

  const rawMessages = Array.isArray((data as { messages?: unknown }).messages)
    ? ((data as { messages?: unknown[] }).messages ?? []).filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  return {
    reply: data.reply?.trim() || rawMessages.join('\n'),
    messages: rawMessages.length > 0 ? rawMessages.slice(0, CHAT_SETTINGS.ai.maxBubbles) : undefined,
    handoffRequested: Boolean(data.handoffRequested),
    quickReplies: data.quickReplies?.filter(Boolean).slice(0, 4) ?? [...CHAT_QUICK_REPLIES],
    intent: data.intent ?? 'openclaw',
  };
};

const serializeChatMessages = (messages: StoredChatMessage[]) =>
  messages.map((message) => ({
    id: message.id,
    role: message.role,
    body: message.body,
    createdAt: message.created_at,
    intent: message.intent,
  }));

const ensureChatSessionWithWelcome = async (db: D1Database, sessionId: string) => {
  const existingMessages = await listChatMessages(db, sessionId);
  if (existingMessages.length > 0) {
    return existingMessages;
  }

  await appendChatMessage(
    db,
    sessionId,
    'bot',
    'Xin chào. EsimCN hỗ trợ tư vấn các gói eSIM Trung Quốc phù hợp theo lịch trình sử dụng. Anh/chị cần hỗ trợ gói nào?',
    { intent: 'welcome' },
  );
  return listChatMessages(db, sessionId);
};

app.get('/styles.css', () =>
  new Response(globalStyles, {
    headers: {
      'content-type': 'text/css; charset=utf-8',
      'cache-control': 'public, max-age=300, stale-while-revalidate=86400',
    },
  }),
);


app.get('/chat-widget.js', () =>
  new Response(chatWidgetScript, {
    headers: {
      'content-type': 'application/javascript; charset=utf-8',
      'cache-control': 'public, max-age=300, stale-while-revalidate=86400',
    },
  }),
);

app.post('/api/chat/session', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Chat database is not configured.' }, 503);
  }

  await ensureChatSchema(c.env.DB);
  const payload = await parsePayload(c.req.raw);
  const requestedSessionId = toText(payload.sessionId);
  const pageUrl = toText(payload.pageUrl);
  const source = toText(payload.source) || 'website';
  let session = requestedSessionId ? await getChatSessionById(c.env.DB, requestedSessionId) : null;
  if (!session) {
    session = await createChatSession(c.env.DB, { source, pageUrl });
  }

  const messages = await ensureChatSessionWithWelcome(c.env.DB, session.id);
  return c.json({
    ok: true,
    session: {
      id: session.id,
      status: session.status,
      handoffRequested: Boolean(session.handoff_requested),
    },
    chatSettings: CHAT_SETTINGS,
    messages: serializeChatMessages(messages),
    quickReplies: [...CHAT_QUICK_REPLIES],
  });
});

app.get('/api/chat/messages', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Chat database is not configured.' }, 503);
  }

  await ensureChatSchema(c.env.DB);
  const sessionId = c.req.query('sessionId')?.trim() || '';
  if (!sessionId) {
    return c.json({ ok: false, error: 'Thiếu sessionId.' }, 400);
  }

  const session = await getChatSessionById(c.env.DB, sessionId);
  if (!session) {
    return c.json({ ok: false, error: 'Không tìm thấy phiên chat.' }, 404);
  }

  const messages = await ensureChatSessionWithWelcome(c.env.DB, sessionId);
  return c.json({
    ok: true,
    session: {
      id: session.id,
      status: session.status,
      handoffRequested: Boolean(session.handoff_requested),
    },
    chatSettings: CHAT_SETTINGS,
    messages: serializeChatMessages(messages),
    quickReplies: [...CHAT_QUICK_REPLIES],
  });
});

app.get('/api/chat/config', async (c) => c.json({ ok: true, chatSettings: CHAT_SETTINGS }));

app.post('/api/chat/message', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Chat database is not configured.' }, 503);
  }

  await ensureChatSchema(c.env.DB);
  const payload = await parsePayload(c.req.raw);
  const sessionId = toText(payload.sessionId);
  const message = truncateChatText(toText(payload.message), 1200);
  const pageUrl = toText(payload.pageUrl);
  if (!sessionId || !message) {
    return c.json({ ok: false, error: 'Thiếu sessionId hoặc nội dung chat.' }, 400);
  }

  const session = await getChatSessionById(c.env.DB, sessionId);
  if (!session) {
    return c.json({ ok: false, error: 'Không tìm thấy phiên chat.' }, 404);
  }

  await appendChatMessage(c.env.DB, sessionId, 'user', message, { intent: 'user-message', metadata: { pageUrl } });
  const existingMessages = await listChatMessages(c.env.DB, sessionId);
  const catalog = await loadCatalog(c.env);
  let replyPayload: {
    intent: string;
    handoffRequested: boolean;
    reply: string;
    messages?: string[];
    quickReplies: string[];
    actions?: { label: string; href: string; kind?: 'primary' | 'secondary' }[];
  } | null = null;

  const userHistoryMessages = existingMessages.filter((item) => item.role === 'user').map((item) => item.body);
  const normalizedMessage = normalizeChatText(message);

  if (!normalizedMessage || isGreetingOnlyMessage(normalizedMessage)) {
    replyPayload = buildRuleBasedChatReply(message, catalog.plans);
  } else {
    replyPayload = buildDeterministicSalesReply(message, userHistoryMessages, catalog.plans);
  }

  if (!replyPayload && c.env.GEMINI_API_KEY) {
    try {
      replyPayload = await callGeminiChat(c.env.GEMINI_API_KEY, CHAT_SETTINGS, {
        message,
        history: existingMessages.map((item) => ({ role: item.role, body: item.body })),
        plans: catalog.plans,
      });
    } catch (error) {
      console.error('gemini chat error', error);
    }
  }

  if (!replyPayload) {
    try {
      replyPayload = await callOpenClawChatWebhook(c.env, {
        sessionId,
        message,
        messages: existingMessages,
        pageUrl,
        chatSettings: CHAT_SETTINGS,
      });
    } catch (error) {
      console.error('chat webhook error', error);
    }
  }

  if (!replyPayload) {
    replyPayload = buildRuleBasedChatReply(message, catalog.plans);
  }
  if (!replyPayload) {
    return c.json({ ok: false, error: 'Không tạo được phản hồi chat.' }, 500);
  }

  await appendChatMessage(c.env.DB, sessionId, 'bot', replyPayload.reply, {
    intent: replyPayload.intent,
    metadata: { source: replyPayload.intent === 'openclaw' ? 'openclaw' : 'rule-based' },
  });

  const now = new Date().toISOString();
  await c.env.DB
    .prepare(
      `UPDATE chat_sessions
       SET page_url = COALESCE(?, page_url), status = ?, handoff_requested = ?, handoff_reason = ?, updated_at = ?, last_message_at = ?, last_intent = ?
       WHERE id = ?`,
    )
    .bind(
      pageUrl || null,
      replyPayload.handoffRequested ? 'waiting_human' : 'bot',
      replyPayload.handoffRequested ? 1 : session.handoff_requested,
      replyPayload.handoffRequested ? 'customer_requested' : session.handoff_reason,
      now,
      now,
      replyPayload.intent ?? null,
      sessionId,
    )
    .run();

  const messages = await listChatMessages(c.env.DB, sessionId);
  return c.json({
    ok: true,
    session: {
      id: sessionId,
      status: replyPayload.handoffRequested ? 'waiting_human' : 'bot',
    },
    chatSettings: CHAT_SETTINGS,
    handoffRequested: Boolean(replyPayload.handoffRequested),
    aiMode: c.env.GEMINI_API_KEY ? 'gemini' : c.env.OPENCLAW_CHAT_WEBHOOK ? 'openclaw' : 'rule_based',
    modelPreference: CHAT_SETTINGS.ai.preferredModel,
    responseMode: CHAT_SETTINGS.responseMode,
    bubbleTexts: replyPayload.messages ?? undefined,
    actions: replyPayload.actions ?? [],
    messages: serializeChatMessages(messages),
    quickReplies: replyPayload.quickReplies?.slice(0, 4) ?? [...CHAT_QUICK_REPLIES],
  });
});

app.post('/api/chat/handoff', async (c) => {
  if (!c.env.DB) {
    return c.json({ ok: false, error: 'Chat database is not configured.' }, 503);
  }

  await ensureChatSchema(c.env.DB);
  const payload = await parsePayload(c.req.raw);
  const sessionId = toText(payload.sessionId);
  const reason = truncateChatText(toText(payload.reason) || 'manual_request', 300);
  if (!sessionId) {
    return c.json({ ok: false, error: 'Thiếu sessionId.' }, 400);
  }

  const session = await getChatSessionById(c.env.DB, sessionId);
  if (!session) {
    return c.json({ ok: false, error: 'Không tìm thấy phiên chat.' }, 404);
  }

  const now = new Date().toISOString();
  await c.env.DB
    .prepare(
      `UPDATE chat_sessions
       SET status = 'waiting_human', handoff_requested = 1, handoff_reason = ?, updated_at = ?, last_message_at = ?
       WHERE id = ?`,
    )
    .bind(reason, now, now, sessionId)
    .run();
  await appendChatMessage(c.env.DB, sessionId, 'system', 'Khách yêu cầu gặp tư vấn viên.', { intent: 'handoff', metadata: { reason } });
  const messages = await listChatMessages(c.env.DB, sessionId);
  return c.json({ ok: true, handoffRequested: true, messages: serializeChatMessages(messages) });
});

app.get('/favicon.svg', () =>
  new Response(favicon, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=604800',
    },
  }),
);

app.get('/og/home.jpg', () =>
  new Response(socialPreviewImageBytes, {
    headers: {
      'content-type': 'image/jpeg',
      'cache-control': 'public, max-age=604800, immutable',
    },
  }),
);

app.get('/plans/:slug', async (c) => {
  const catalog = await loadCatalog(c.env);
  const plan = catalog.plans.find((item) => item.slug === c.req.param('slug'));
  if (!plan) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  return c.html(renderPlanPage(await getPageContext(c.env), plan, catalog.plans));
});

app.get('/blog/:slug', async (c) => {
  const article = articles.find((item) => item.slug === c.req.param('slug'));
  if (!article) {
    return c.html(renderNotFound(await getPageContext(c.env)), 404);
  }

  return c.html(renderArticlePage(await getPageContext(c.env), article));
});

app.get('/api/plans', async (c) => {
  const catalog = await loadCatalog(c.env);
  return c.json({
    ok: true,
    keyword: getContext(c.env).primaryKeyword,
    source: catalog.source,
    count: catalog.plans.length,
    plans: catalog.plans,
  });
});

app.post('/api/orders', async (c) => {
  const catalog = await loadCatalog(c.env);
  const payload = await parsePayload(c.req.raw);
  const fullName = toText(payload.fullName);
  const phone = toText(payload.phone) || toText(payload.whatsapp);
  const email = toText(payload.email);
  const whatsapp = phone;
  const country = toText(payload.country);
  const arrivalDate = toText(payload.arrivalDate);
  const planSlug = toText(payload.planSlug);
  const periodNum = toNumber(payload.periodNum);
  const quantity = Math.max(1, Math.min(99, Math.round(toNumber(payload.quantity) || 1)));
  const notes = toText(payload.notes);
  const source = toText(payload.source) || 'landing-page';
  const selectedPlan = catalog.plans.find((plan) => plan.slug === planSlug);

  if (!fullName || !phone || !email || !planSlug) {
    return c.json({ ok: false, error: 'Vui lòng nhập họ tên, số điện thoại, email và chọn gói cần mua.' }, 400);
  }

  if (!selectedPlan) {
    return c.json({ ok: false, error: 'Không tìm thấy gói bạn vừa chọn trong catalog hiện tại.' }, 400);
  }

  if (selectedPlan.periodRequired && (!periodNum || periodNum < 1 || periodNum > 365)) {
    return c.json({ ok: false, error: 'Gói theo ngày cần nhập số ngày dùng hợp lệ từ 1 đến 365.' }, 400);
  }

  const reference = `ECN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const accessToken = buildOrderAccessToken();
  const paymentCode = buildPaymentCode();
  const createdAt = new Date().toISOString();
  const amountUsd = Number((getPlanAmountUsd(selectedPlan, periodNum) * quantity).toFixed(2));
  const amountVnd = formatVndAmount(amountUsd);

  if (c.env.DB) {
    await ensureOrderSchema(c.env.DB);
    await c.env.DB.prepare(
      `INSERT INTO orders (
        id, access_token, full_name, phone, email, whatsapp, country, arrival_date, plan_slug, plan_name, package_code, quantity, payment_code, period_num, amount_usd, amount_vnd, payment_status, notes, catalog_source, source, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        reference,
        accessToken,
        fullName,
        phone,
        email,
        whatsapp,
        country,
        arrivalDate,
        planSlug,
        selectedPlan.name,
        selectedPlan.packageCode ?? null,
        quantity,
        paymentCode,
        periodNum,
        amountUsd,
        amountVnd,
        'pending',
        notes,
        catalog.source,
        source,
        createdAt,
      )
      .run();
  }

  return c.json({
    ok: true,
    reference,
    stored: Boolean(c.env.DB),
    plan: selectedPlan.name,
    quantity,
    periodNum,
    amountVnd,
    paymentCode,
    paymentUrl: c.env.DB ? buildPaymentPath(reference, accessToken) : null,
  });
});

app.post('/api/orders/:reference/payment-confirm', async (c) => {
  return c.json(
    {
      ok: false,
      error: 'Endpoint xác nhận thanh toán thủ công đã bị tắt. Hệ thống chỉ nhận thanh toán qua webhook bảo mật.',
    },
    410,
  );
});

app.get('/robots.txt', (c) =>
  new Response(renderRobots(getContext(c.env)), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  }),
);

app.get('/sitemap.xml', async (c) => {
  const catalog = await loadCatalog(c.env);
  return new Response(renderSitemap(getContext(c.env), catalog.plans), {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
    },
  });
});

app.notFound(async (c) => c.html(renderNotFound(await getPageContext(c.env)), 404));

export default app;
