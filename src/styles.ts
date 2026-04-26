import { HERO_BANNER_BASE64 } from './heroBanner';

export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

:root {
  --bg: #ffffff;
  --surface: #ffffff;
  --surface-soft: #fff8f2;
  --surface-muted: #f8efe6;
  --text: #111111;
  --text-soft: #333333;
  --text-faint: #666666;
  --line: #eadbcf;
  --line-strong: #e1cabb;
  --primary: #c5411c;
  --primary-deep: #973114;
  --primary-soft: rgba(197, 65, 28, 0.1);
  --accent: #20354d;
  --shadow: 0 24px 60px rgba(68, 41, 26, 0.08);
  --shadow-soft: 0 14px 36px rgba(68, 41, 26, 0.07);
  --wrap: min(1220px, calc(100vw - 40px));
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(circle at top left, rgba(197, 65, 28, 0.07), transparent 20%),
    linear-gradient(180deg, #fffdfb 0%, #ffffff 220px, #fffaf5 100%);
  color: var(--text);
  font-family: 'Manrope', sans-serif;
  line-height: 1.58;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

button,
input,
select,
textarea {
  font: inherit;
}

[hidden] {
  display: none !important;
}

::selection {
  background: rgba(197, 65, 28, 0.16);
}

.page-shell {
  min-height: 100vh;
  overflow-x: hidden;
}

.wrap {
  width: var(--wrap);
  margin: 0 auto;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 320ms ease, transform 320ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.field-grid[hidden] {
  display: none !important;
}

label {
  display: grid;
  gap: 8px;
  color: var(--text);
  font-size: 0.94rem;
  font-weight: 600;
}

input,
select,
textarea {
  width: 100%;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
}

textarea {
  min-height: 128px;
  padding: 14px;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: 2px solid rgba(197, 65, 28, 0.14);
  border-color: rgba(197, 65, 28, 0.42);
}

.button,
.nav-cta {
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
}

.button:hover,
.nav-cta:hover,
.trip-plan-button:hover {
  transform: translateY(-1px);
}

.button-primary,
.nav-cta {
  background: linear-gradient(135deg, #d04e28 0%, #b83c1b 100%);
  border-color: #b83c1b;
  color: #ffffff;
  box-shadow: 0 16px 28px rgba(197, 65, 28, 0.2);
}

.button-secondary {
  background: var(--surface);
  border-color: var(--line-strong);
  color: var(--text);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.status,
.form-note,
.section-copy,
.page-lead,
.guide-meta,
.product-desc,
.article-content p,
.article-content li,
.article-aside p {
  color: var(--text-soft);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 250, 245, 0.9);
  border-bottom: 1px solid rgba(234, 219, 207, 0.9);
  backdrop-filter: blur(16px);
}

.header-inner {
  width: var(--wrap);
  min-height: 74px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.brand-logo-only {
  gap: 0;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: inline-grid;
  place-items: center;
  background: linear-gradient(135deg, #d04e28 0%, #8f2f18 100%);
  box-shadow: 0 14px 28px rgba(197, 65, 28, 0.18);
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
}

.brand-mark-image {
  display: block;
  width: auto;
  height: 78px;
  max-width: min(280px, 42vw);
  object-fit: contain;
}

.brand-copy {
  display: grid;
  gap: 2px;
}

.brand-copy strong {
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.02rem;
  letter-spacing: -0.03em;
}

.brand-copy span {
  color: var(--text-faint);
  font-size: 0.88rem;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 22px;
  color: var(--text-soft);
  font-size: 0.95rem;
  font-weight: 600;
}

.header-nav a:hover,
.header-link:hover,
.header-support:hover,
.footer-links a:hover,
.text-link:hover {
  color: var(--primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.header-link,
.header-support {
  color: var(--text-soft);
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
}

.site-footer {
  margin-top: 44px;
  padding: 30px 0 54px;
  border-top: 1px solid var(--line);
  background: rgba(255, 250, 245, 0.7);
}

.footer-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 28px;
  align-items: start;
}

.footer-brand,
.footer-meta {
  display: grid;
  gap: 14px;
}

.site-footer strong {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.02rem;
  letter-spacing: -0.03em;
}

.site-footer p {
  margin: 8px 0 0;
  max-width: 44ch;
  color: var(--text-soft);
  font-size: 0.92rem;
  line-height: 1.7;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 14px;
  color: var(--text-soft);
}

.footer-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 18px;
  color: var(--text-soft);
}

.footer-links a,
.footer-contact a {
  color: var(--text-soft);
  font-size: 0.92rem;
  font-weight: 600;
}

.section-kicker {
  width: fit-content;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--primary-soft);
  border: 1px solid rgba(197, 65, 28, 0.14);
  color: var(--primary-deep);
  display: inline-flex;
  align-items: center;
  font-size: var(--home-kicker-size, 0.8rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.section-head,
.store-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
}

.section-head {
  margin-bottom: 16px;
}

.section-title,
.page-title {
  margin: 10px 0 0;
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.04em;
  line-height: 1.22;
}

.section-title {
  font-size: var(--home-section-title-size, clamp(1.08rem, 1.45vw, 1.35rem));
}

.page-title {
  max-width: 14ch;
  font-size: clamp(1.8rem, 3.2vw, 3rem);
}

.page-lead,
.section-copy {
  margin: 14px 0 0;
  max-width: 54ch;
  font-size: var(--home-copy-size, 0.94rem);
  line-height: var(--home-copy-line, 1.76);
}

.mobile-app-shell {
  display: none;
}

.mobile-app-nav,
.mobile-app-brand,
.mobile-app-brand-copy,
.mobile-app-banner-copy,
.mobile-app-plan,
.mobile-app-plan-copy,
.mobile-app-plan-side,
.mobile-app-why-head,
.mobile-app-why-item {
  display: grid;
}

.mobile-app-nav {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
}

.mobile-app-brand {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  color: #f8fbff;
}

.mobile-app-brand-logo-only {
  grid-template-columns: auto;
  gap: 0;
}

.mobile-app-brand-image {
  display: block;
  width: auto;
  height: 34px;
  max-width: min(148px, 44vw);
  object-fit: contain;
}

.mobile-app-logo {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 152, 92, 0.96), rgba(255, 111, 47, 0.92));
  box-shadow: 0 12px 26px rgba(255, 115, 52, 0.34);
  color: #fff;
  display: inline-grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.84rem;
  font-weight: 800;
}

.mobile-app-brand-copy {
  gap: 2px;
}

.mobile-app-brand-copy strong {
  color: #f8fbff;
  font-size: 0.96rem;
  letter-spacing: -0.03em;
}

.mobile-app-brand-copy small {
  color: rgba(218, 230, 255, 0.68);
  font-size: 0.76rem;
}

.mobile-app-menu {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #f5f8ff;
  display: inline-grid;
  place-items: center;
  font-size: 1rem;
  font-weight: 700;
}

.mobile-app-banner {
  position: relative;
  overflow: hidden;
}

.mobile-app-banner-copy {
  position: relative;
  z-index: 1;
}

.mobile-app-plan {
  width: 100%;
  text-align: left;
}

.mobile-app-plan-copy,
.mobile-app-plan-side {
  gap: 4px;
}

.mobile-app-plan-price,
.mobile-app-plan-cta,
.mobile-app-banner-badge,
.mobile-app-banner-signal,
.mobile-app-banner-cta,
.mobile-app-why-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mobile-app-why-grid {
  display: grid;
}

.detail-home {
  display: grid;
  gap: 28px;
  padding: 28px 0 92px;
}

.page-home {
  background:
    radial-gradient(circle at 12% 16%, rgba(255, 255, 255, 0.94), transparent 22%),
    radial-gradient(circle at 82% 12%, rgba(173, 198, 255, 0.26), transparent 26%),
    radial-gradient(circle at 50% 32%, rgba(255, 255, 255, 0.6), transparent 36%),
    linear-gradient(180deg, #f4f7fd 0%, #f9fbff 26%, #eef3fb 100%);
}

.page-home .site-header {
  background: rgba(248, 251, 255, 0.72);
  border-bottom: 1px solid rgba(215, 227, 245, 0.78);
  box-shadow: 0 16px 40px rgba(148, 168, 199, 0.08);
}

.page-home .brand-mark {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(228, 236, 247, 0.88)),
    linear-gradient(135deg, #a88446, #f8dfb1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 16px 34px rgba(164, 178, 199, 0.22);
  color: #8b6b2b;
}

.page-home .nav-cta {
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(187, 221, 255, 0.98), rgba(112, 174, 239, 0.95));
  border-color: rgba(130, 171, 214, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 14px 26px rgba(115, 159, 216, 0.24);
}

.china-hero {
  position: relative;
  padding: 10px 0 6px;
}

.china-hero::before {
  content: '';
  position: absolute;
  inset: 14px 0 auto;
  height: 560px;
  background:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.92), transparent 24%),
    radial-gradient(circle at 85% 22%, rgba(255, 255, 255, 0.74), transparent 22%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.08));
  pointer-events: none;
  filter: blur(4px);
}

.china-hero-shell {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
  gap: 34px;
  min-height: 760px;
  padding: 34px 0 10px;
}

.china-hero-copy,
.china-hero-visual {
  position: relative;
  z-index: 1;
}

.china-hero-copy {
  display: grid;
  align-content: start;
  gap: 18px;
  padding-top: 34px;
}

.china-hero-kicker {
  color: #7f8ba3;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.china-hero-title {
  max-width: 10.5ch;
  margin: 0;
  color: #303a4f;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(3.3rem, 5vw, 5.1rem);
  letter-spacing: -0.075em;
  line-height: 0.96;
}

.china-hero-lead {
  max-width: 33rem;
  margin: 0;
  color: #667389;
  font-size: 1.04rem;
  line-height: 1.8;
}

.china-hero-inline,
.china-glass-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.china-hero-primary,
.china-hero-secondary {
  min-height: 58px;
  padding: 0 26px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.china-hero-primary:hover,
.china-hero-secondary:hover {
  transform: translateY(-1px);
}

.china-hero-primary {
  color: #fff;
  background: linear-gradient(180deg, rgba(162, 209, 252, 1), rgba(97, 155, 223, 1));
  border: 1px solid rgba(128, 169, 216, 0.92);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 18px 34px rgba(111, 160, 222, 0.28);
}

.china-hero-secondary {
  color: #4a5871;
  border: 1px solid rgba(206, 218, 236, 0.92);
  background: rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    0 16px 30px rgba(157, 174, 202, 0.14);
}

.china-hero-proof,
.china-glass-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.china-hero-proof span,
.china-glass-list span,
.china-hero-fact {
  border: 1px solid rgba(221, 229, 243, 0.88);
  background: rgba(255, 255, 255, 0.52);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 14px 28px rgba(162, 176, 199, 0.12);
  color: #5a6881;
}

.china-hero-proof span,
.china-glass-list span {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 600;
}

.china-glass-card {
  max-width: 29rem;
  margin-top: 6px;
  padding: 22px 22px 24px;
  border-radius: 34px;
  border: 1px solid rgba(227, 234, 245, 0.96);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(240, 245, 252, 0.54)),
    rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    0 30px 80px rgba(166, 179, 202, 0.22);
  backdrop-filter: blur(22px);
}

.china-glass-head,
.china-glass-slot-top,
.china-glass-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.china-glass-head {
  margin-bottom: 20px;
}

.china-glass-head small,
.china-glass-price small,
.china-glass-slot-top span {
  color: #7e8aa0;
  font-size: 0.82rem;
  font-weight: 700;
}

.china-glass-head strong {
  display: block;
  margin-top: 4px;
  color: #313a4f;
  font-size: 1.76rem;
  letter-spacing: -0.04em;
}

.china-glass-badge {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 184, 160, 0.95), rgba(238, 117, 93, 0.92));
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 800;
}

.china-glass-slots {
  display: grid;
  gap: 18px;
}

.china-glass-slot {
  display: grid;
  gap: 10px;
}

.china-glass-slot-top strong {
  color: #3a465d;
  font-size: 1.25rem;
  letter-spacing: -0.04em;
}

.china-glass-meter {
  position: relative;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(232, 239, 248, 0.94), rgba(215, 225, 238, 0.86));
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.85);
}

.china-glass-meter span {
  position: absolute;
  top: 50%;
  left: 52%;
  width: 78px;
  height: 28px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 26% 50%, rgba(255, 255, 255, 0.98), transparent 16%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.94), transparent 14%),
    radial-gradient(circle at 74% 50%, rgba(255, 255, 255, 0.98), transparent 16%),
    linear-gradient(180deg, rgba(179, 220, 255, 0.98), rgba(108, 166, 229, 0.96));
  border: 1px solid rgba(150, 188, 231, 0.92);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 10px 18px rgba(125, 162, 211, 0.24);
  transform: translate(-50%, -50%);
}

.china-glass-price {
  margin-top: 22px;
  align-items: end;
}

.china-glass-price strong {
  color: #2d3750;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.3rem, 3vw, 3.2rem);
  letter-spacing: -0.07em;
}

.china-glass-price p {
  margin: 8px 0 0;
  color: #738198;
  font-size: 0.9rem;
}

.china-glass-list {
  margin-top: 18px;
}

.china-hero-visual {
  min-height: 720px;
  display: grid;
  align-content: center;
}

.china-orbit {
  position: absolute;
  border-radius: 999px;
  border: 1px solid rgba(227, 235, 246, 0.82);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.08)),
    rgba(255, 255, 255, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 30px 72px rgba(165, 182, 210, 0.18);
  filter: blur(0.2px);
}

.china-orbit-one {
  top: 64px;
  right: 40px;
  width: 520px;
  height: 180px;
  transform: rotate(-24deg);
}

.china-orbit-two {
  right: 16px;
  bottom: 150px;
  width: 620px;
  height: 230px;
  transform: rotate(22deg);
}

.china-chip-stage {
  position: relative;
  width: min(100%, 720px);
  min-height: 560px;
  margin-left: auto;
  display: grid;
  place-items: center;
}

.china-chip-card {
  position: relative;
  width: 330px;
  min-height: 430px;
  padding: 24px 24px 32px;
  border-radius: 44px;
  border: 1px solid rgba(239, 243, 250, 0.92);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(230, 237, 247, 0.45)),
    rgba(255, 255, 255, 0.26);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 36px 84px rgba(169, 182, 206, 0.24);
  backdrop-filter: blur(26px);
  transform: rotate(10deg);
}

.china-chip-card::before,
.china-chip-card::after {
  content: '';
  position: absolute;
  border-radius: 40px;
  inset: -14px;
  border: 1px solid rgba(244, 247, 252, 0.66);
  opacity: 0.76;
}

.china-chip-card::after {
  inset: 28px -120px;
  transform: rotate(18deg);
  opacity: 0.36;
}

.china-chip-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.china-chip-card-mark,
.china-chip-card-route {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 800;
}

.china-chip-card-mark {
  background: rgba(255, 255, 255, 0.68);
  color: #6f7b92;
}

.china-chip-card-route {
  color: #8d6a2b;
  background: linear-gradient(135deg, rgba(253, 240, 197, 0.96), rgba(223, 195, 122, 0.96));
}

.china-chip-core {
  width: 190px;
  aspect-ratio: 1;
  margin: 54px auto 24px;
  padding: 18px;
  border-radius: 36px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(237, 228, 204, 0.92)),
    linear-gradient(135deg, #f7e2ab, #c9a35e);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.96),
    0 24px 44px rgba(172, 154, 108, 0.22);
}

.china-chip-grid {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background:
    linear-gradient(90deg, rgba(133, 98, 32, 0.88) 0 10%, transparent 10% 22%, rgba(133, 98, 32, 0.88) 22% 32%, transparent 32% 44%, rgba(133, 98, 32, 0.88) 44% 54%, transparent 54% 66%, rgba(133, 98, 32, 0.88) 66% 76%, transparent 76% 88%, rgba(133, 98, 32, 0.88) 88% 100%),
    linear-gradient(0deg, rgba(133, 98, 32, 0.88) 0 10%, transparent 10% 22%, rgba(133, 98, 32, 0.88) 22% 32%, transparent 32% 44%, rgba(133, 98, 32, 0.88) 44% 54%, transparent 54% 66%, rgba(133, 98, 32, 0.88) 66% 76%, transparent 76% 88%, rgba(133, 98, 32, 0.88) 88% 100%);
  opacity: 0.88;
}

.china-chip-card strong {
  display: block;
  text-align: center;
  color: #8a682d;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2.3rem;
  letter-spacing: -0.06em;
}

.china-chip-card p {
  margin: 10px 0 0;
  text-align: center;
  color: #738096;
  font-size: 0.92rem;
}

.china-hero-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  width: min(100%, 720px);
  margin: -28px 0 0 auto;
}

.china-hero-fact {
  min-height: 82px;
  padding: 18px 20px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  font-size: 0.98rem;
  font-weight: 600;
}

.china-hero-fact.is-wide {
  grid-column: span 2;
}

.china-reasons {
  padding: 18px 0 10px;
}

.china-reasons-head {
  max-width: 56rem;
  margin-bottom: 22px;
}

.china-reasons-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.china-reason-card {
  min-height: 240px;
  padding: 24px 22px;
  border-radius: 28px;
  border: 1px solid rgba(227, 234, 244, 0.92);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(237, 243, 251, 0.56)),
    rgba(255, 255, 255, 0.46);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    0 24px 54px rgba(169, 184, 208, 0.16);
  display: grid;
  align-content: start;
  gap: 16px;
}

.china-reason-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: inline-grid;
  place-items: center;
  color: #6582aa;
  background: rgba(255, 255, 255, 0.74);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    0 12px 28px rgba(156, 175, 201, 0.18);
}

.china-reason-icon svg {
  width: 26px;
  height: 26px;
}

.china-reason-card strong {
  color: #334058;
  font-size: 1.3rem;
  line-height: 1.14;
  letter-spacing: -0.04em;
}

.china-reason-card p {
  margin: 0;
  color: #6d7b91;
  font-size: 0.94rem;
  line-height: 1.68;
}

.page-home .site-header {
  display: none;
}

.page-home {
  --home-radius-card: 10px;
  --home-radius-control: 8px;
  --home-radius-chip: 6px;
  --home-kicker-size: 0.74rem;
  --home-section-title-size: 1.14rem;
  --home-title-size: 1rem;
  --home-copy-size: 0.92rem;
  --home-copy-line: 1.78;
  --home-ink: #111111;
  --home-copy: #2f2f2f;
  --home-accent: #e53935;
  --home-accent-deep: #d32f2f;
  --home-soft-line: rgba(255, 209, 214, 0.78);
}

.rose-showcase {
  position: relative;
  padding: 106px 0 10px;
}

.rose-showcase::before {
  content: none;
}

.rose-shell {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 14px;
}

.home-node-shell {
  padding: 28px;
  border: 1px solid rgba(230, 184, 154, 0.24);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 253, 250, 0.96), rgba(255, 248, 243, 0.92));
  box-shadow:
    0 20px 42px rgba(186, 102, 49, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.home-node-shell-wide {
  padding: 30px;
}

.rose-homebar {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: var(--wrap);
  z-index: 50;
  min-height: 74px;
  padding: 0 18px;
  border: 1px solid rgba(226, 150, 96, 0.28);
  border-radius: 16px;
  background: rgba(255, 251, 247, 0.96);
  box-shadow: 0 16px 34px rgba(167, 95, 45, 0.1);
  backdrop-filter: blur(10px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
}

.rose-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.rose-brand-logo-only {
  gap: 0;
}

.rose-brand-mark,
.rose-reason-icon {
  width: 42px;
  height: 42px;
  border-radius: var(--home-radius-control);
  display: inline-grid;
  place-items: center;
  color: #d32f2f;
  background: linear-gradient(180deg, #fff4eb, #ffe7d8);
  box-shadow: 0 12px 24px rgba(204, 98, 32, 0.12);
}

.rose-brand-mark svg,
.rose-reason-icon svg {
  width: 18px;
  height: 18px;
}

.rose-brand-mark img {
  width: auto;
  height: 72px;
  max-width: min(260px, 30vw);
  object-fit: contain;
  display: block;
  border-radius: 0;
  padding: 0;
}

.rose-brand-logo-only .rose-brand-mark {
  width: auto;
  height: auto;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  color: inherit;
}

.rose-brand-copy {
  display: grid;
  gap: 2px;
}

.rose-brand-copy strong {
  color: #111111;
  font-size: 0.96rem;
  letter-spacing: -0.04em;
}

.rose-brand-copy span {
  color: #555555;
  font-size: 0.74rem;
}

.rose-nav {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.rose-nav a,
.rose-link {
  color: #111111;
  font-size: 0.82rem;
  font-weight: 600;
}

.rose-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rose-cta,
.rose-secondary {
  min-height: 42px;
  padding: 0 16px;
  border-radius: var(--home-radius-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
}

.rose-cta {
  color: #fff;
  background: linear-gradient(135deg, #f26d2d, #d74a19);
  box-shadow: 0 16px 30px rgba(210, 94, 31, 0.22);
}

.rose-secondary {
  color: #111111;
  border: 1px solid rgba(230, 157, 102, 0.32);
  background: rgba(255, 251, 247, 0.9);
}

.rose-hero {
  position: relative;
  min-height: 500px;
  border-radius: 20px;
  overflow: hidden;
  background: url('data:image/jpeg;base64,${HERO_BANNER_BASE64}') center 42%/cover no-repeat;
  box-shadow: 0 28px 70px rgba(186, 102, 49, 0.14);
  border: 1px solid rgba(237, 164, 108, 0.18);
}

.rose-hero-gallery {
  background: #fff7f0;
}

.rose-hero-slides,
.mobile-app-banner-gallery {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.rose-hero-image,
.mobile-app-banner-gallery .mobile-app-banner-image {
  position: absolute;
  inset: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
}

.rose-hero-image.is-active,
.mobile-app-banner-gallery .mobile-app-banner-image.is-active {
  opacity: 1;
  visibility: visible;
}

.rose-hero-image {
  height: 500px;
  object-fit: cover;
}

.rose-cta-row,
.rose-plan-tag-row,
.rose-plan-meta,
.rose-plan-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.rose-badge,
.rose-chip-label,
.rose-plan-tag {
  min-height: 28px;
  padding: 0 10px;
  border-radius: var(--home-radius-chip);
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 700;
}


.rose-plan-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.rose-picker {
  display: grid;
  gap: 22px;
}

.rose-picker-head {
  display: grid;
  gap: 14px;
  justify-items: start;
  margin-bottom: 4px;
}

.rose-picker-head .section-title {
  max-width: none;
  margin-top: 0;
  font-size: var(--home-section-title-size);
  line-height: 1.28;
  letter-spacing: -0.04em;
}

.rose-picker-head .section-copy {
  max-width: 34rem;
  margin: 0;
  font-size: var(--home-copy-size);
  line-height: var(--home-copy-line);
}

.rose-plan-card,
.rose-reason-card {
  padding: 22px;
  border-radius: 14px;
  border: 1px solid rgba(230, 188, 159, 0.32);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 24px rgba(178, 101, 59, 0.06);
}

.rose-plan-card {
  display: grid;
  gap: 18px;
  min-width: 0;
  height: 100%;
  padding: 20px;
  background:
    radial-gradient(circle at top right, rgba(255, 129, 79, 0.1), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 244, 0.92));
  box-shadow: 0 18px 34px rgba(178, 101, 59, 0.08);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.rose-plan-card:hover {
  transform: translateY(-2px);
  border-color: rgba(211, 71, 37, 0.18);
  box-shadow: 0 22px 42px rgba(178, 101, 59, 0.12);
}

.rose-plan-card-head,
.rose-plan-copy {
  display: grid;
  gap: 12px;
}

.rose-plan-tag {
  width: fit-content;
  color: #d14764;
  background: #fff1f4;
}

.rose-plan-tag.is-tiktok {
  color: #fff;
  background: linear-gradient(135deg, #171717, #ff4f4f);
  box-shadow: 0 10px 18px rgba(255, 79, 79, 0.16);
  border-radius: 8px;
}

.rose-plan-tag.is-unlimited {
  color: #6e4500;
  background: linear-gradient(135deg, #fff4d9, #ffd47f);
  border-radius: 8px;
}

.rose-plan-card strong,
.rose-reason-card strong {
  color: var(--home-ink);
  font-size: 1.05rem;
  line-height: 1.32;
  letter-spacing: -0.03em;
}

.rose-plan-card p,
.rose-reason-card p {
  margin: 0;
  color: var(--home-copy);
  font-size: var(--home-copy-size);
  line-height: var(--home-copy-line);
}

.rose-plan-meta span {
  min-height: 34px;
  padding: 0 12px;
  border-radius: var(--home-radius-chip);
  background: rgba(255, 245, 246, 0.92);
  color: #687286;
  display: inline-flex;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 700;
}

.rose-plan-apps {
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid rgba(232, 219, 211, 0.9);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 246, 241, 0.96));
}

.rose-plan-apps .support-app-row {
  flex-wrap: nowrap;
  gap: 4px;
}

.rose-plan-apps .support-app-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  box-shadow: 0 9px 16px rgba(120, 88, 73, 0.09);
}

.rose-plan-apps .support-app-icon svg {
  width: 25px;
  height: 25px;
}

.rose-plan-apps p {
  color: var(--text-soft);
  font-size: 0.76rem;
  line-height: 1.45;
}

.rose-plan-bottom {
  display: grid;
  gap: 14px;
  margin-top: auto;
  padding-top: 2px;
}

.rose-plan-price {
  display: grid;
  gap: 4px;
}

.rose-plan-price span {
  color: var(--text-faint);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.rose-plan-price b {
  color: var(--home-accent-deep);
  font-size: 1.2rem;
  line-height: 1.1;
}

.rose-plan-price small {
  color: var(--text-soft);
  font-size: 0.78rem;
  line-height: 1.5;
}

.rose-plan-buy-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: stretch;
  gap: 10px;
}

.rose-plan-order-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
}

.rose-plan-order-row.is-single {
  grid-template-columns: minmax(0, 1fr);
}

.rose-plan-meta-box,
.rose-plan-quantity {
  min-height: 0;
  padding: 9px 10px 9px 12px;
  border: 1px solid rgba(224, 205, 194, 0.88);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 244, 0.92));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.rose-plan-meta-box {
  justify-items: stretch;
}

.rose-plan-meta-box-label,
.rose-plan-quantity-label {
  color: var(--text-soft);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-transform: none;
  white-space: nowrap;
  flex: 1 1 auto;
}

.rose-plan-days-box .rose-plan-quantity-controls {
  justify-content: flex-end;
}

.rose-plan-quantity-controls {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  min-width: 0;
  width: auto;
  flex: 0 0 auto;
}

.rose-plan-quantity-step {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: #fff1ef;
  color: var(--home-accent-deep);
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  font-weight: 800;
  line-height: 1;
}

.rose-plan-quantity-input {
  width: 34px;
  min-height: auto;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--text);
  text-align: center;
  font-size: 0.82rem;
  font-weight: 800;
}

.rose-plan-quantity-input::-webkit-outer-spin-button,
.rose-plan-quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.rose-plan-quantity-input[type='number'] {
  -moz-appearance: textfield;
}

.rose-plan-buy {
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid rgba(190, 60, 33, 0.22);
  border-radius: 14px;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7445 0%, #d34725 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 14px 28px rgba(211, 71, 37, 0.22);
  width: 100%;
  cursor: pointer;
}

.rose-plan-buy:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 30px rgba(211, 71, 37, 0.26);
}

.rose-reasons {
  padding: 6px 0 10px;
}

.rose-reasons-head {
  display: grid;
  gap: 14px;
  max-width: 58rem;
  margin-bottom: 30px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(230, 188, 159, 0.22);
}

.rose-reasons-head .section-title {
  margin-top: 0;
  line-height: 1.28;
}

.detail-section-head .section-title {
  font-size: var(--home-section-title-size);
  line-height: 1.3;
}

.home-inline-badge {
  width: fit-content;
  min-height: 24px;
  padding: 0 8px;
  border-radius: var(--home-radius-chip);
  background: #fff1df;
  border: 1px solid rgba(224, 139, 46, 0.24);
  color: #b66b12;
  display: inline-flex;
  align-items: center;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.home-inline-badge.is-tiktok {
  color: #fff;
  background: linear-gradient(135deg, #171717, #ff5b4d);
  border-color: rgba(255, 91, 77, 0.3);
  box-shadow: 0 10px 18px rgba(255, 91, 77, 0.18);
  border-radius: 8px;
}

.home-inline-badge.is-unlimited {
  color: #6e4500;
  background: linear-gradient(135deg, #fff4d9, #ffd47f);
  border-color: rgba(255, 166, 67, 0.24);
  border-radius: 8px;
}

.badge-has-icon {
  gap: 6px;
}

.badge-icon {
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 14px;
}

.badge-icon svg {
  width: 100%;
  height: 100%;
}

.home-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.support-meta-text {
  display: none;
}

.plan-title-inline {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.plan-title-copy {
  min-width: 0;
}

.plan-title-badge {
  min-height: 22px;
  padding: 0 8px;
  border-radius: 7px;
  border: 1px solid rgba(255, 176, 82, 0.28);
  background: linear-gradient(135deg, #fff4d8, #ffd682);
  color: #6e4500;
  display: inline-flex;
  align-items: center;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.plan-title-badge.is-apps {
  box-shadow: 0 8px 16px rgba(255, 184, 92, 0.16);
}

.support-app-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
}

.support-app-text {
  color: var(--text-soft);
  font-size: 0.82rem;
  font-weight: 600;
}

.support-app-icon {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid rgba(220, 213, 205, 0.92);
  background: #fff;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(60, 32, 20, 0.05);
}

.support-app-icon svg {
  width: 11px;
  height: 11px;
}

.support-app-icon.is-tiktok {
  background: linear-gradient(135deg, #171717, #ff5b4d);
  border-color: rgba(255, 91, 77, 0.28);
  color: #fff;
}

.support-app-icon.is-google {
  color: #4285f4;
}

.support-app-icon.is-gmail {
  color: #ea4335;
}

.support-app-icon.is-maps {
  color: #1a9c5c;
}

.support-app-icon.is-facebook {
  color: #1877f2;
}

.support-app-icon.is-apps {
  background: linear-gradient(135deg, #fff4d9, #ffe8a9);
  border-color: rgba(255, 183, 77, 0.28);
  color: #8b5a00;
}

.detail-review-card strong,
.detail-step-card strong,
.detail-info-card strong,
.detail-included-card strong,
.faq-card strong {
  font-size: 1rem;
  line-height: 1.5;
}

.detail-review-card,
.detail-info-card,
.detail-step-card,
.detail-faq-item,
.detail-order-card {
  border: 1px solid rgba(230, 188, 159, 0.32);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 12px 24px rgba(178, 101, 59, 0.06);
}

.rose-reasons-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.rose-reason-card {
  display: grid;
  align-content: start;
  gap: 18px;
}

.rose-travel-promo-section {
  padding: 2px 0 4px;
}

.rose-travel-promo {
  padding: 24px 36px;
  border-radius: 22px;
  border: 1px solid rgba(255, 165, 139, 0.32);
  background:
    radial-gradient(circle at top right, rgba(255, 219, 205, 0.18), transparent 28%),
    radial-gradient(circle at 14% 18%, rgba(255, 255, 255, 0.12), transparent 18%),
    radial-gradient(circle at bottom left, rgba(255, 137, 103, 0.22), transparent 34%),
    linear-gradient(135deg, #c93018 0%, #e94922 38%, #ff6a38 100%);
  box-shadow: 0 28px 60px rgba(190, 56, 20, 0.24);
  display: grid;
  grid-template-columns: minmax(0, 1.95fr) minmax(320px, 0.82fr);
  gap: 32px;
  align-items: stretch;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  animation: travelPromoShift 11s ease-in-out infinite alternate;
}

.rose-travel-promo::before,
.rose-travel-promo::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  z-index: 0;
}

.rose-travel-promo::before {
  width: 320px;
  height: 320px;
  top: -120px;
  right: -70px;
  background: radial-gradient(circle, rgba(255, 238, 228, 0.28), rgba(255, 238, 228, 0));
  animation: travelPromoFloat 9s ease-in-out infinite;
}

.rose-travel-promo::after {
  width: 220px;
  height: 220px;
  bottom: -90px;
  left: -30px;
  background: radial-gradient(circle, rgba(255, 196, 173, 0.22), rgba(255, 196, 173, 0));
  animation: travelPromoFloat 7s ease-in-out infinite reverse;
}

.rose-travel-promo-copy,
.rose-travel-promo-actions {
  display: grid;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.rose-travel-promo-title-stack {
  display: grid;
  gap: 4px;
}

.rose-travel-promo-kicker {
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 222, 208, 0.28);
  background: rgba(255, 243, 236, 0.12);
  color: #fff4ec;
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.rose-travel-promo-title {
  margin: 0;
  color: #fff7f2;
  font-size: 1.7rem;
  line-height: 1.06;
  letter-spacing: -0.025em;
  font-weight: 700;
  max-width: none;
}

.rose-travel-promo-subtitle {
  margin: 0;
  color: rgba(255, 244, 237, 0.92);
  font-size: 0.96rem;
  line-height: 1.42;
  font-weight: 600;
}

.rose-travel-promo p {
  margin: 0;
  color: rgba(255, 243, 237, 0.9);
  font-size: 0.96rem;
  line-height: 1.55;
  max-width: 48rem;
}

.rose-travel-promo-lead {
  max-width: 44rem;
}

.rose-travel-promo-note {
  color: rgba(255, 238, 230, 0.78);
  font-size: 0.92rem;
}

.rose-travel-promo-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.rose-travel-promo-points span {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 246, 240, 0.14);
  border: 1px solid rgba(255, 232, 221, 0.22);
  color: #fff4ed;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 700;
}

.rose-travel-promo-actions {
  align-content: start;
  padding: 20px 22px;
  border-radius: 18px;
  border: 1px solid rgba(255, 227, 216, 0.2);
  background: linear-gradient(180deg, rgba(255, 249, 245, 0.16), rgba(255, 242, 235, 0.1));
  backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
  justify-items: start;
}

.rose-travel-promo-tag {
  width: fit-content;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 245, 239, 0.16);
  border: 1px solid rgba(255, 226, 213, 0.24);
  color: #fff2ea;
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.rose-travel-promo-side-title {
  margin: 0;
  color: #fff9f6;
  font-size: 1.24rem;
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 700;
  max-width: none;
}

.rose-travel-promo-primary {
  min-height: 48px;
  padding: 0 24px;
  width: fit-content;
  border-radius: 14px;
  background: linear-gradient(135deg, #fff7f3, #ffe2d3);
  color: #bf3f1a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.96rem;
  font-weight: 800;
  box-shadow: 0 18px 30px rgba(115, 26, 5, 0.22);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.rose-travel-promo-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 22px 34px rgba(115, 26, 5, 0.28);
}

@keyframes travelPromoShift {
  0% {
    background-position: 0% 50%;
    box-shadow: 0 28px 60px rgba(190, 56, 20, 0.24);
  }

  100% {
    background-position: 100% 50%;
    box-shadow: 0 34px 72px rgba(190, 56, 20, 0.28);
  }
}

@keyframes travelPromoFloat {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(-12px, 10px, 0) scale(1.04);
  }

  100% {
    transform: translate3d(8px, -6px, 0) scale(0.98);
  }
}

.desktop-picker-card {
  position: relative;
  overflow: hidden;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(230, 188, 159, 0.38);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 249, 244, 0.94));
  box-shadow:
    0 18px 40px rgba(186, 102, 49, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: grid;
  gap: 14px;
}

.desktop-picker-card::before {
  content: '';
  position: absolute;
  inset: -20% auto auto -6%;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 224, 229, 0.9), rgba(255, 224, 229, 0));
  pointer-events: none;
}

.desktop-picker-card > * {
  position: relative;
  z-index: 1;
}

.desktop-picker-card-hero {
  gap: 14px;
}

.desktop-picker-type-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.desktop-picker-type {
  min-height: 40px;
  padding: 0 12px;
  border-radius: var(--home-radius-control);
  border: 1px solid rgba(255, 224, 227, 0.96);
  background: linear-gradient(180deg, #ffffff, #fff6f7);
  color: #5d677d;
  font-size: 0.78rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(229, 103, 121, 0.05);
}

.desktop-picker-type.is-selected {
  color: #fff;
  background: linear-gradient(135deg, #ff6f6f, #eb4057);
  border-color: transparent;
  box-shadow: 0 16px 26px rgba(235, 64, 87, 0.16);
}

.desktop-picker-type.is-disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.desktop-picker-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.desktop-picker-control {
  display: grid;
  gap: 8px;
  padding: 14px 14px 12px;
  border-radius: var(--home-radius-card);
  background: rgba(255, 252, 252, 0.98);
  border: 1px solid rgba(255, 230, 232, 0.94);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.desktop-picker-head,
.desktop-picker-summary,
.desktop-picker-price,
.desktop-picker-actions {
  display: flex;
  gap: 8px;
}

.desktop-picker-head,
.desktop-picker-summary,
.desktop-picker-actions {
  justify-content: space-between;
}

.desktop-picker-head strong,
.desktop-picker-summary strong {
  color: var(--home-ink);
}

.desktop-picker-head span,
.desktop-picker-note,
.desktop-picker-summary p,
.desktop-picker-hint {
  color: var(--home-copy);
}

.desktop-picker-head span {
  min-height: 28px;
  padding: 0 8px;
  border-radius: var(--home-radius-control);
  background: #fff2f5;
  color: #d04b67;
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 700;
}

.desktop-picker-input-chip {
  min-height: 32px;
  padding: 0 8px 0 10px;
  border-radius: var(--home-radius-control);
  border: 1px solid rgba(255, 217, 222, 0.96);
  background: #fff7f9;
  color: #8c6b77;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.desktop-picker-input-chip span {
  min-height: auto;
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: 0.68rem;
}

.desktop-picker-input,
.desktop-picker-select {
  border: 0;
  background: transparent;
  color: #c84361;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  outline: none;
}

.desktop-picker-input {
  width: 44px;
  padding: 0;
}

.desktop-picker-input::-webkit-outer-spin-button,
.desktop-picker-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.desktop-picker-input[type='number'] {
  -moz-appearance: textfield;
}

.desktop-picker-input-chip-select {
  padding-right: 14px;
}

.desktop-picker-select {
  padding-right: 16px;
  cursor: pointer;
}

.desktop-picker-range-shell {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 10px;
  border: 1px solid rgba(255, 217, 222, 0.96);
  border-radius: var(--home-radius-control);
  background: linear-gradient(180deg, #fffdfd, #fff5f7);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.96),
    0 8px 18px rgba(226, 120, 139, 0.08);
  --range-progress: 0%;
}

.desktop-picker-range-track {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 8px;
  border-radius: var(--home-radius-chip);
  background: linear-gradient(90deg, #f8d9df, #f7e8eb);
  overflow: hidden;
  pointer-events: none;
}

.desktop-picker-range-fill {
  display: block;
  width: var(--range-progress);
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff7c96, #e24563);
  box-shadow: 0 0 16px rgba(226, 69, 99, 0.24);
}

.desktop-picker-range {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  touch-action: manipulation;
}

.desktop-picker-range::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: var(--home-radius-chip);
  background: transparent;
}

.desktop-picker-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  margin-top: -7px;
  border-radius: var(--home-radius-chip);
  border: 4px solid #fff;
  background: linear-gradient(135deg, #ff7a95, #e24563);
  box-shadow: 0 10px 18px rgba(226, 69, 99, 0.24);
  cursor: pointer;
}

.desktop-picker-range::-moz-range-track {
  height: 8px;
  border-radius: var(--home-radius-chip);
  background: transparent;
}

.desktop-picker-range::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: var(--home-radius-chip);
  border: 4px solid #fff;
  background: linear-gradient(135deg, #ff7a95, #e24563);
  box-shadow: 0 10px 18px rgba(226, 69, 99, 0.24);
  cursor: pointer;
}

.desktop-picker-scale {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #98808b;
  font-size: 0.7rem;
  font-weight: 600;
}

.desktop-picker-note {
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.6;
}

.desktop-picker-summary {
  align-items: center;
  padding: 14px 16px;
  border-radius: var(--home-radius-card);
  background: linear-gradient(135deg, #fff7f8, #fff1f4);
  border: 1px solid rgba(255, 225, 228, 0.98);
}

.desktop-picker-summary-label,
.desktop-picker-price span {
  color: #a0828d;
  font-size: 0.72rem;
  font-weight: 700;
}

.desktop-picker-summary-copy {
  display: grid;
  gap: 8px;
}

.desktop-picker-summary strong {
  display: block;
  font-size: 0.94rem;
  line-height: 1.26;
}

.desktop-picker-summary p {
  margin: 8px 0 0;
}

.desktop-picker-price {
  flex-direction: column;
  align-items: flex-end;
}

.desktop-picker-price strong {
  color: var(--home-accent-deep);
  font-size: 1.36rem;
  line-height: 1;
}

.desktop-picker-actions {
  align-items: center;
  justify-content: space-between;
}

.desktop-picker-action-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.desktop-picker-quantity {
  min-height: 34px;
  padding: 0 4px 0 0;
  border-radius: var(--home-radius-control);
  border: 1px solid rgba(255, 224, 229, 0.98);
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.desktop-picker-quantity-label {
  color: #b77a89;
  padding: 0 8px 0 10px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.desktop-picker-quantity-step {
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: var(--home-radius-chip);
  background: #fff2f5;
  color: #d04a67;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1;
}

.desktop-picker-quantity-input {
  width: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #cb4764;
  text-align: center;
  font: inherit;
  font-size: 0.74rem;
  font-weight: 700;
  outline: none;
}

.desktop-picker-action-group .button {
  min-height: 34px;
  padding: 0 14px;
  font-size: 0.74rem;
  box-shadow: 0 10px 18px rgba(208, 78, 40, 0.18);
  border-radius: var(--home-radius-control);
}

.desktop-picker-quantity-input::-webkit-outer-spin-button,
.desktop-picker-quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.desktop-picker-quantity-input[type='number'] {
  -moz-appearance: textfield;
}

.desktop-picker-hint {
  max-width: 34rem;
  font-size: 0.74rem;
  line-height: 1.6;
}

.detail-plan-grid-hidden {
  display: none !important;
}

.poster-showcase {
  position: relative;
  padding: 18px 0 8px;
}

.poster-showcase::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.18) 28%, rgba(255, 255, 255, 0.34) 100%),
    url('https://images.unsplash.com/photo-1547981609-4b6bfe67db7e?auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center 28%;
  opacity: 0.66;
  filter: saturate(0.72) blur(0.2px);
  pointer-events: none;
}

.poster-showcase::after {
  content: '';
  position: absolute;
  inset: 24px 0 0;
  background:
    radial-gradient(circle at 12% 14%, rgba(255, 255, 255, 0.94), transparent 18%),
    radial-gradient(circle at 84% 26%, rgba(202, 220, 250, 0.52), transparent 22%),
    linear-gradient(180deg, rgba(241, 246, 253, 0.92), rgba(238, 244, 252, 0.48) 48%, rgba(242, 246, 252, 0.82));
  pointer-events: none;
}

.poster-shell {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 26px;
}

.poster-nav {
  min-height: 78px;
  padding: 0 18px;
  border-radius: 26px;
  border: 1px solid rgba(234, 239, 247, 0.94);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(241, 246, 253, 0.62)),
    rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 18px 40px rgba(173, 184, 202, 0.18);
  backdrop-filter: blur(16px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
}

.poster-brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.poster-brand-mark {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: inline-grid;
  place-items: center;
  color: #a17d39;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(239, 241, 245, 0.92)),
    linear-gradient(135deg, #ae8b47, #eed39e);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.96),
    0 14px 30px rgba(162, 174, 198, 0.18);
}

.poster-brand-mark svg {
  width: 24px;
  height: 24px;
}

.poster-brand-copy {
  display: grid;
  gap: 2px;
}

.poster-brand-copy strong {
  color: #2f384d;
  font-size: 1.18rem;
  letter-spacing: -0.04em;
}

.poster-brand-copy span {
  color: #8b95a8;
  font-size: 0.82rem;
}

.poster-nav-links {
  display: flex;
  justify-content: center;
  gap: 34px;
}

.poster-nav-links a,
.poster-contact {
  color: #475469;
  font-size: 1rem;
  font-weight: 500;
}

.poster-nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.poster-cta {
  min-height: 54px;
  padding: 0 24px;
  border-radius: 999px;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(174, 215, 255, 0.98), rgba(96, 153, 221, 0.96));
  border: 1px solid rgba(132, 176, 226, 0.92);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    0 16px 30px rgba(112, 157, 217, 0.24);
}

.poster-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(540px, 1.1fr);
  gap: 30px;
  min-height: 900px;
  padding: 12px 6px 0;
}

.poster-copy,
.poster-visual {
  position: relative;
  z-index: 1;
}

.poster-copy {
  display: grid;
  align-content: start;
  gap: 24px;
  padding: 48px 0 0 10px;
}

.poster-title {
  max-width: 8ch;
  margin: 0;
  color: #31384b;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(3.7rem, 5.7vw, 5.5rem);
  line-height: 0.96;
  letter-spacing: -0.09em;
}

.poster-lead {
  max-width: 29rem;
  margin: 0;
  color: #5e6a80;
  font-size: 1.08rem;
  line-height: 1.82;
}

.poster-purchase-card {
  width: min(100%, 520px);
  margin-top: 0;
  padding: 26px 28px 30px;
  border-radius: 34px;
  border: 1px solid rgba(233, 238, 247, 0.96);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 246, 252, 0.62)),
    rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 28px 80px rgba(173, 184, 202, 0.24);
  backdrop-filter: blur(20px);
  display: grid;
  gap: 22px;
}

.poster-purchase-head {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #2f3950;
  font-size: 1.08rem;
  font-weight: 700;
}

.poster-flag {
  min-width: 54px;
  height: 32px;
  border-radius: 10px;
  display: inline-grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(246, 153, 136, 0.94), rgba(216, 82, 67, 0.92));
  box-shadow: 0 12px 22px rgba(219, 98, 81, 0.18);
}

.poster-slider-group {
  display: grid;
  gap: 10px;
}

.poster-slider-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #334057;
}

.poster-slider-top span {
  font-size: 1rem;
  font-weight: 600;
}

.poster-slider-top strong {
  font-size: 1rem;
  font-weight: 700;
}

.poster-slider-shell {
  position: relative;
  height: 28px;
  display: grid;
  align-items: center;
}

.poster-slider-input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background:
    linear-gradient(90deg, rgba(184, 222, 255, 0.92), rgba(184, 222, 255, 0.92)) 0/var(--range-progress, 50%) 100% no-repeat,
    linear-gradient(90deg, rgba(221, 229, 239, 0.96), rgba(214, 224, 236, 0.96));
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.92);
}

.poster-slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 76px;
  height: 32px;
  border: 1px solid rgba(145, 185, 231, 0.96);
  border-radius: 999px;
  background:
    radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.98), transparent 12%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.98), transparent 12%),
    radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.98), transparent 12%),
    linear-gradient(180deg, rgba(183, 221, 255, 1), rgba(101, 158, 224, 0.98));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 10px 18px rgba(122, 166, 222, 0.26);
  cursor: pointer;
}

.poster-slider-input::-moz-range-thumb {
  width: 76px;
  height: 32px;
  border: 1px solid rgba(145, 185, 231, 0.96);
  border-radius: 999px;
  background:
    radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.98), transparent 12%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.98), transparent 12%),
    radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.98), transparent 12%),
    linear-gradient(180deg, rgba(183, 221, 255, 1), rgba(101, 158, 224, 0.98));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 10px 18px rgba(122, 166, 222, 0.26);
  cursor: pointer;
}

.poster-slider-scale {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #8c95a6;
  font-size: 0.9rem;
}

.poster-price {
  margin-top: 6px;
  color: #2f3850;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.8rem, 3.6vw, 3.7rem);
  line-height: 1;
  letter-spacing: -0.08em;
  text-align: center;
}

.poster-buy-button {
  min-height: 66px;
  border-radius: 999px;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(176, 217, 255, 0.98), rgba(87, 148, 219, 0.98));
  border: 1px solid rgba(135, 178, 228, 0.96);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 18px 34px rgba(110, 156, 221, 0.24);
}

.poster-benefits {
  display: grid;
  gap: 14px;
}

.poster-benefits span {
  padding-left: 34px;
  position: relative;
  color: #4f5b71;
  font-size: 1rem;
}

.poster-benefits span::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 0;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background:
    radial-gradient(circle at center, rgba(255, 255, 255, 0.98) 0 28%, transparent 30%),
    linear-gradient(180deg, rgba(246, 250, 255, 0.96), rgba(229, 237, 247, 0.9));
  border: 1px solid rgba(218, 226, 238, 0.92);
  box-shadow: 0 10px 20px rgba(170, 182, 201, 0.16);
}

.poster-visual {
  min-height: 700px;
  display: grid;
  align-content: start;
  position: relative;
}

.poster-fluid {
  position: absolute;
  border-radius: 999px;
  border: 1px solid rgba(236, 241, 248, 0.88);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.52), rgba(255, 255, 255, 0.1)),
    rgba(255, 255, 255, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 24px 64px rgba(185, 197, 216, 0.2);
  backdrop-filter: blur(14px);
}

.poster-fluid-one {
  top: 58px;
  right: 62px;
  width: 500px;
  height: 170px;
  transform: rotate(-26deg);
}

.poster-fluid-two {
  right: -24px;
  top: 184px;
  width: 730px;
  height: 300px;
  transform: rotate(34deg);
}

.poster-sim-card-wrap {
  position: relative;
  z-index: 1;
  margin: 74px 0 0 116px;
  width: 420px;
  display: grid;
  place-items: center;
}

.poster-sim-card {
  width: 346px;
  min-height: 468px;
  padding: 34px 26px;
  border-radius: 40px;
  border: 1px solid rgba(236, 241, 248, 0.94);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(233, 238, 246, 0.56)),
    rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.96),
    0 34px 80px rgba(173, 185, 205, 0.24);
  backdrop-filter: blur(22px);
  transform: rotate(12deg);
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 20px;
}

.poster-sim-chip {
  width: 168px;
  aspect-ratio: 1;
  margin-top: 28px;
  padding: 18px;
  border-radius: 34px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(241, 231, 203, 0.92)),
    linear-gradient(135deg, #f1ddb0, #cfa861);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.96),
    0 18px 36px rgba(175, 157, 111, 0.2);
}

.poster-sim-chip-core {
  width: 100%;
  height: 100%;
  border-radius: 22px;
  background:
    linear-gradient(90deg, rgba(136, 102, 39, 0.9) 0 12%, transparent 12% 24%, rgba(136, 102, 39, 0.9) 24% 36%, transparent 36% 48%, rgba(136, 102, 39, 0.9) 48% 60%, transparent 60% 72%, rgba(136, 102, 39, 0.9) 72% 84%, transparent 84% 100%),
    linear-gradient(0deg, rgba(136, 102, 39, 0.9) 0 12%, transparent 12% 24%, rgba(136, 102, 39, 0.9) 24% 36%, transparent 36% 48%, rgba(136, 102, 39, 0.9) 48% 60%, transparent 60% 72%, rgba(136, 102, 39, 0.9) 72% 84%, transparent 84% 100%);
}

.poster-sim-card strong {
  color: #956f2f;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2.35rem;
  letter-spacing: -0.06em;
}

.poster-feature-panel {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  width: min(100%, 580px);
  margin: 28px 0 0 auto;
}

.poster-feature-item {
  min-height: 104px;
  padding: 22px 24px;
  border-radius: 28px;
  border: 1px solid rgba(233, 238, 246, 0.94);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(239, 244, 251, 0.6)),
    rgba(255, 255, 255, 0.46);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 20px 44px rgba(173, 185, 204, 0.18);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
}

.poster-feature-item.is-wide {
  grid-column: span 2;
}

.poster-feature-icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  color: #677892;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(223, 230, 240, 0.94);
}

.poster-feature-icon svg {
  width: 20px;
  height: 20px;
}

.poster-feature-item strong {
  color: #3a465d;
  font-size: 1.02rem;
  line-height: 1.3;
}

.poster-reasons {
  padding: 0 0 8px;
}

.poster-reasons-head {
  margin-bottom: 24px;
  text-align: center;
}

.poster-reasons-head h2 {
  max-width: 18ch;
  margin: 0 auto;
  color: #37425a;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.8rem, 2.7vw, 2.8rem);
  line-height: 1.18;
  letter-spacing: -0.06em;
}

.poster-reasons-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.poster-reason-card {
  min-height: 270px;
  padding: 28px 24px;
  border-radius: 28px;
  border: 1px solid rgba(232, 237, 246, 0.96);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(239, 244, 251, 0.62)),
    rgba(255, 255, 255, 0.46);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 24px 54px rgba(173, 185, 204, 0.18);
  display: grid;
  align-content: start;
  justify-items: center;
  gap: 18px;
  text-align: center;
}

.poster-reason-icon {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  color: #72829d;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(236, 241, 248, 0.86));
  border: 1px solid rgba(225, 232, 242, 0.96);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.98),
    0 18px 34px rgba(177, 188, 207, 0.18);
}

.poster-reason-icon svg {
  width: 32px;
  height: 32px;
}

.poster-reason-card strong {
  color: #37445b;
  font-size: 1.4rem;
  line-height: 1.16;
  letter-spacing: -0.04em;
}

.poster-reason-card p {
  margin: 0;
  color: #708097;
  font-size: 0.94rem;
  line-height: 1.7;
}

.detail-hero {
  padding-top: 8px;
}

.detail-hero-grid,
.detail-options-grid,
.detail-meta-grid {
  display: grid;
  gap: 24px;
}

.detail-hero-grid {
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  align-items: stretch;
}

.detail-options-grid {
  grid-template-columns: minmax(0, 1fr) 360px;
  align-items: start;
}

.detail-options-grid.detail-options-grid-single {
  grid-template-columns: minmax(0, 1fr);
}

#packages > .wrap {
  width: min(1360px, calc(100vw - 40px));
}

.detail-meta-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.detail-poster,
.detail-summary,
.detail-choice-box,
.detail-order-card,
.detail-review-card,
.detail-info-card,
.detail-step-card,
.detail-faq-item {
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.detail-poster,
.detail-summary,
.detail-choice-box,
.detail-order-card,
.detail-info-card,
.detail-faq-item {
  border-radius: var(--home-radius-card);
}

.detail-poster {
  padding: 22px;
}

.detail-breadcrumb {
  color: var(--text-faint);
  font-size: 0.9rem;
  font-weight: 600;
}

.detail-poster-card {
  position: relative;
  min-height: 520px;
  margin-top: 14px;
  padding: 22px;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(circle at 88% 12%, rgba(255, 255, 255, 0.16), transparent 18%),
    radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.16), transparent 16%),
    linear-gradient(135deg, #d4542e 0%, #b93f1d 48%, #8d2b15 100%);
  color: #fff6f0;
}

.detail-poster-card::before {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 46%;
  background:
    linear-gradient(180deg, transparent, rgba(68, 20, 10, 0.22)),
    radial-gradient(circle at 50% 110%, rgba(255, 255, 255, 0.18), transparent 38%);
}

.detail-poster-chips {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-poster-chips span {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 700;
}

.detail-poster-device {
  position: relative;
  z-index: 1;
  width: min(240px, 50%);
  aspect-ratio: 0.54;
  margin: 48px auto 18px;
  padding: 18px 16px;
  border: 4px solid rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  background: rgba(67, 18, 10, 0.2);
  box-shadow:
    0 0 0 10px rgba(255, 255, 255, 0.08),
    0 24px 60px rgba(47, 12, 6, 0.34);
}

.detail-poster-device::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 50%;
  width: 72px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.48);
  transform: translateX(-50%);
}

.detail-poster-screen {
  position: relative;
  height: 100%;
  border-radius: 28px;
  background:
    radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, 0.04) 46%, transparent 47%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06));
  display: grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.72rem, 4vw, 2.7rem);
  letter-spacing: -0.05em;
}

.detail-poster-copy {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 8px;
  max-width: 30rem;
}

.detail-poster-copy strong {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.34rem, 2.2vw, 1.9rem);
  letter-spacing: -0.04em;
  line-height: 1.04;
}

.detail-poster-copy p {
  margin: 0;
  color: rgba(255, 246, 240, 0.86);
  font-size: 0.92rem;
}

.detail-summary {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 24px;
}

.detail-title {
  margin: 0;
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.74rem, 3vw, 2.6rem);
  letter-spacing: -0.055em;
  line-height: 1.01;
}

.detail-rating-row,
.detail-proof-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.detail-rating-score {
  min-height: 36px;
  padding: 0 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2b52d8, #1f44bc);
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
}

.detail-rating-row strong {
  color: var(--text);
  font-size: 0.95rem;
}

.detail-rating-row span:last-child,
.detail-proof-row span {
  color: var(--text-soft);
  font-size: 0.88rem;
}

.detail-proof-row span {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface-soft);
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}

.detail-check-list {
  display: grid;
  gap: 10px;
}

.detail-check-item {
  padding-left: 18px;
  position: relative;
  color: var(--text-soft);
}

.detail-check-item::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--primary);
}

.detail-price-panel {
  display: grid;
  gap: 14px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, #fffdfa, #fff4ec);
}

.detail-price-main {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.detail-price-main small {
  color: var(--text-faint);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.detail-price-main strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.6rem, 2.3vw, 2.2rem);
  letter-spacing: -0.05em;
}

.detail-price-copy {
  display: grid;
  gap: 4px;
}

.detail-price-copy b,
.detail-order-selected b {
  color: var(--text);
  font-size: 0.95rem;
}

.detail-price-copy p,
.detail-order-selected p {
  margin: 0;
  color: var(--text-soft);
}

.detail-section,
.detail-options {
  padding: 14px 0;
}

.detail-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 26px;
}

.detail-choice-box {
  display: grid;
  gap: 18px;
  padding: 22px;
  margin-bottom: 18px;
}

.detail-choice-group h3 {
  margin: 0;
  color: var(--text);
  font-size: 1rem;
}

.detail-choice-group p {
  margin: 6px 0 0;
  color: var(--text-soft);
  font-size: 0.88rem;
}

.detail-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.detail-chip {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fff;
  display: inline-flex;
  align-items: center;
  color: var(--text);
  font-size: 0.84rem;
  font-weight: 600;
}

.detail-tab-row {
  margin-bottom: 18px;
}

.detail-plan-grid,
.detail-review-grid,
.detail-step-grid {
  display: grid;
  gap: 22px;
}

.detail-plan-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.detail-review-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.detail-step-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.detail-plan-card {
  width: 100%;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  display: grid;
  gap: 14px;
  text-align: left;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.detail-plan-card:hover {
  transform: translateY(-2px);
  border-color: rgba(197, 65, 28, 0.34);
}

.detail-plan-card.is-selected {
  border-color: rgba(197, 65, 28, 0.42);
  box-shadow: 0 0 0 2px rgba(197, 65, 28, 0.08), 0 18px 34px rgba(197, 65, 28, 0.12);
}

.detail-plan-top,
.detail-plan-bottom,
.detail-order-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.detail-plan-badge,
.detail-plan-route {
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 800;
}

.detail-plan-badge {
  background: var(--primary-soft);
  color: var(--primary-deep);
}

.detail-plan-route {
  border: 1px solid var(--line);
  color: var(--text-soft);
}

.detail-plan-card h3 {
  margin: 0;
  color: var(--text);
  font-size: var(--home-title-size);
  line-height: 1.5;
}

.detail-plan-card p {
  margin: 0;
  color: var(--text-soft);
  font-size: var(--home-copy-size);
  line-height: var(--home-copy-line);
}

.detail-plan-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.detail-plan-stats div {
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface-soft);
  display: grid;
  gap: 4px;
}

.detail-plan-stats span {
  color: var(--text-faint);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.detail-plan-stats strong {
  color: var(--text);
  font-size: 0.86rem;
}

.detail-plan-price {
  display: grid;
  gap: 2px;
}

.detail-plan-price small {
  color: var(--text-faint);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.detail-plan-price strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.16rem;
  letter-spacing: -0.04em;
}

.detail-plan-cta {
  min-height: 40px;
  padding: 0 14px;
  border-radius: var(--home-radius-control);
  background: var(--primary);
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 700;
}

.detail-order-rail {
  position: sticky;
  top: 96px;
}

.detail-order-card {
  display: grid;
  gap: 16px;
  padding: 22px;
}

.detail-order-price span {
  color: var(--text-faint);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.detail-order-price strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.36rem;
  letter-spacing: -0.05em;
}

.detail-order-selected {
  display: grid;
  gap: 4px;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: var(--home-radius-card);
  background: var(--surface-soft);
}

.checkout-summary-line {
  color: var(--text-soft);
  font-size: 0.88rem;
  font-weight: 700;
}

.detail-order-form {
  display: grid;
  gap: 14px;
}

.detail-order-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-order-submit {
  width: 100%;
}

.detail-review-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.detail-review-summary strong {
  color: var(--text);
  font-size: 0.95rem;
}

.detail-review-summary span:last-child {
  color: var(--text-soft);
}

.detail-review-card {
  padding: 20px;
  border-radius: var(--home-radius-card);
}

.detail-review-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.detail-review-top span {
  width: 42px;
  height: 42px;
  border-radius: var(--home-radius-chip);
  background: linear-gradient(135deg, #d04e28, #a53418);
  color: #fff;
  display: inline-grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
}

.detail-review-top div {
  display: grid;
  gap: 2px;
}

.detail-review-top strong {
  color: var(--text);
  font-size: var(--home-title-size);
}

.detail-review-top small,
.detail-review-card p {
  color: var(--text-soft);
}

.detail-review-card p {
  margin: 0;
  font-size: var(--home-copy-size);
}

.detail-info-card {
  padding: 22px;
}

.detail-info-list {
  display: grid;
  gap: 14px;
}

.detail-info-row {
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.detail-info-row:first-child {
  padding-top: 0;
  border-top: none;
}

.detail-info-row strong {
  color: var(--text);
  font-size: var(--home-title-size);
}

.detail-info-row p {
  margin: 6px 0 0;
  color: var(--text-soft);
  font-size: var(--home-copy-size);
}

.detail-include-list {
  display: grid;
  gap: 12px;
}

.detail-include-item {
  min-height: 58px;
  padding: 14px 16px 14px 42px;
  position: relative;
  border-radius: var(--home-radius-card);
  border: 1px solid var(--line);
  background: var(--surface-soft);
  color: var(--text);
  display: flex;
  align-items: center;
  font-size: var(--home-copy-size);
  font-weight: 600;
}

.detail-include-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 16px;
  width: 12px;
  height: 12px;
  border-radius: var(--home-radius-chip);
  background: var(--primary);
  transform: translateY(-50%);
}

.detail-step-card {
  padding: 22px;
  background: linear-gradient(180deg, #fffdfa, #fff6ef);
}

.detail-step-card span {
  width: 42px;
  height: 42px;
  border-radius: var(--home-radius-control);
  background: var(--primary-soft);
  color: var(--primary-deep);
  display: inline-grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
}

.detail-step-card strong {
  display: block;
  margin-top: 16px;
  color: var(--text);
  font-size: var(--home-title-size);
}

.detail-step-card p {
  margin: 8px 0 0;
  color: var(--text-soft);
  font-size: var(--home-copy-size);
}

.detail-faq-list {
  display: grid;
  gap: 12px;
}

.detail-faq-item {
  padding: 20px;
}

.detail-section .home-node-shell,
.rose-reasons .home-node-shell,
.detail-options .home-node-shell {
  display: grid;
  gap: 24px;
}

.detail-section-head {
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(230, 188, 159, 0.22);
}

.detail-faq-item strong {
  color: var(--text);
  font-size: var(--home-title-size);
}

.detail-faq-item p {
  margin: 8px 0 0;
  color: var(--text-soft);
}

.mobile-buy-bar {
  position: fixed;
  right: 18px;
  bottom: 18px;
  left: 18px;
  z-index: 45;
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(255, 253, 250, 0.96);
  box-shadow: 0 18px 40px rgba(60, 32, 20, 0.14);
  backdrop-filter: blur(14px);
  opacity: 0;
  pointer-events: none;
  transform: translateY(16px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.mobile-buy-bar.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.mobile-buy-copy {
  display: grid;
  gap: 2px;
}

.mobile-buy-copy small {
  color: var(--text-faint);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mobile-buy-copy strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.08rem;
}

.mobile-buy-button {
  min-width: 108px;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, #d04e28 0%, #b83c1b 100%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.store-home {
  display: grid;
  gap: 28px;
  padding: 28px 0 20px;
}

.store-hero {
  padding-top: 6px;
}

.store-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 30px;
  align-items: start;
}

.store-hero-copy {
  display: grid;
  gap: 14px;
}

.store-title {
  margin: 0;
  max-width: 12ch;
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2.3rem, 4.6vw, 3.95rem);
  letter-spacing: -0.06em;
  line-height: 0.94;
}

.store-lead {
  margin: 0;
  max-width: 56ch;
  color: var(--text-soft);
  font-size: 0.98rem;
}

.store-proof-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.store-proof-row span {
  min-height: 34px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.84);
  display: inline-flex;
  align-items: center;
  color: var(--accent);
  font-size: 0.88rem;
  font-weight: 600;
}

.store-hero-meta {
  display: grid;
  gap: 4px;
}

.store-hero-meta strong {
  color: var(--text);
  font-size: 0.98rem;
  font-weight: 800;
}

.store-hero-meta p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.92rem;
}

.store-journey-grid,
.store-feature-band {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.store-journey-card,
.store-feature-card {
  position: relative;
  padding: 16px;
  border: 1px solid rgba(197, 65, 28, 0.18);
  border-radius: 16px;
  background:
    radial-gradient(circle at top right, rgba(197, 65, 28, 0.08), transparent 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 246, 239, 0.96) 100%);
  display: grid;
  gap: 10px;
  text-align: left;
  color: var(--text);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.store-journey-card:hover,
.store-feature-card:hover {
  transform: translateY(-2px);
  border-color: rgba(197, 65, 28, 0.32);
}

.store-journey-card.is-selected {
  border-color: rgba(197, 65, 28, 0.45);
  background:
    radial-gradient(circle at top right, rgba(197, 65, 28, 0.14), transparent 46%),
    linear-gradient(180deg, #fff7f1 0%, #fff0e6 100%);
  box-shadow: 0 0 0 2px rgba(197, 65, 28, 0.08), 0 18px 34px rgba(197, 65, 28, 0.12);
}

.store-journey-card small,
.store-feature-card small {
  color: var(--primary-deep);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.store-journey-line {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

.store-journey-line strong {
  color: var(--text);
  font-size: 0.98rem;
  line-height: 1.2;
}

.store-journey-line b {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.16rem;
  letter-spacing: -0.04em;
}

.store-journey-card strong,
.store-feature-card strong {
  font-size: 1rem;
  line-height: 1.32;
}

.store-journey-card p,
.store-feature-card p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.86rem;
  line-height: 1.45;
}

.store-order-rail {
  position: sticky;
  top: 96px;
}

.store-order-card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--shadow);
  transition: box-shadow 180ms ease, border-color 180ms ease;
}

.store-order-card.pulse-active {
  animation: orderPulse 520ms ease;
}

.store-order-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.store-order-flow span {
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--surface-soft);
  border: 1px solid var(--line);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
}

.store-order-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

.store-order-head span {
  color: var(--text-faint);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.store-order-head strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.95rem;
  letter-spacing: -0.05em;
}

.store-order-selected {
  display: grid;
  gap: 4px;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface-soft);
}

.store-order-selected b {
  color: var(--text);
  font-size: 1rem;
  line-height: 1.35;
}

.store-order-selected p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.92rem;
}

.store-order-form {
  display: grid;
  gap: 14px;
}

.store-order-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.store-submit {
  width: 100%;
}

.store-order-note {
  color: var(--text-soft);
  font-size: 0.9rem;
}

.store-catalog,
.trip-plan-section,
.section,
.store-support {
  padding: 4px 0 8px;
}

.store-section-head {
  margin-bottom: 18px;
}

.store-tab-row,
.trip-filter-bar {
  margin-bottom: 16px;
}

.market-tab-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.market-tab {
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.market-tab.is-active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.market-tab:hover {
  transform: translateY(-1px);
  border-color: rgba(197, 65, 28, 0.34);
}

.store-choice-guide {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.store-choice-guide span {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 248, 242, 0.9);
  border: 1px dashed rgba(197, 65, 28, 0.2);
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 700;
}

.store-product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.store-product-card {
  width: 100%;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  display: grid;
  gap: 14px;
  text-align: left;
  color: var(--text);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.store-product-card:hover {
  transform: translateY(-2px);
  border-color: rgba(197, 65, 28, 0.36);
}

.store-product-card.is-selected {
  border-color: rgba(197, 65, 28, 0.42);
  box-shadow: 0 0 0 2px rgba(197, 65, 28, 0.08), 0 18px 34px rgba(197, 65, 28, 0.12);
}

.store-product-top,
.store-product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.store-product-badge,
.store-product-route {
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 800;
}

.store-product-badge {
  background: var(--primary-soft);
  color: var(--primary-deep);
}

.store-product-route {
  border: 1px solid var(--line);
  color: var(--text-soft);
}

.store-product-route.is-tiktok {
  border-color: rgba(255, 91, 77, 0.26);
  background: linear-gradient(135deg, #1d1d1d, #ff5b4d);
  color: #fff;
  border-radius: 8px;
}

.store-product-route.is-unlimited {
  border-color: rgba(255, 167, 76, 0.28);
  background: linear-gradient(135deg, #fff4d8, #ffd47b);
  color: #6e4500;
  border-radius: 8px;
}

.store-product-main h3 {
  margin: 0;
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.34;
}

.store-product-main .plan-title-inline,
.product-name .plan-title-inline,
.trip-plan-title .plan-title-inline,
.page-title .plan-title-inline {
  display: inline-flex;
}

.store-product-main p {
  margin: 6px 0 0;
  color: var(--text-soft);
  font-size: 0.92rem;
}

.store-product-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.store-product-stat {
  padding: 12px;
  border-radius: 14px;
  background: var(--surface-soft);
  border: 1px solid var(--line);
  display: grid;
  gap: 4px;
}

.store-product-stat span {
  color: var(--text-faint);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.store-product-stat strong {
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.28;
}

.store-product-bottom small {
  display: block;
  color: var(--text-soft);
  font-size: 0.84rem;
}

.store-product-bottom strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.2rem;
  letter-spacing: -0.04em;
}

.store-product-price {
  display: grid;
  gap: 2px;
}

.store-product-price small {
  color: var(--text-faint);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.store-product-link {
  min-height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  background: var(--primary);
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 700;
}

.store-product-foot {
  display: grid;
  gap: 5px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
}

.store-product-foot small {
  color: var(--text-soft);
  font-size: 0.84rem;
}

.store-product-foot .support-app-row,
.detail-order-selected .support-app-row,
.checkout-summary-selected .support-app-row,
.mobile-app-plan-focus-copy .support-app-row,
.desktop-picker-summary-copy .support-app-row {
  margin-top: 2px;
}

.store-product-foot .support-app-icon,
.detail-order-selected .support-app-icon,
.checkout-summary-selected .support-app-icon,
.mobile-app-plan-focus-copy .support-app-icon,
.desktop-picker-summary-copy .support-app-icon {
  width: 20px;
  height: 20px;
}

.store-product-foot .support-app-icon svg,
.detail-order-selected .support-app-icon svg,
.checkout-summary-selected .support-app-icon svg,
.mobile-app-plan-focus-copy .support-app-icon svg,
.desktop-picker-summary-copy .support-app-icon svg {
  width: 11px;
  height: 11px;
}

.market-empty {
  margin-top: 12px;
  color: var(--text-soft);
}

.store-support-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.info-panel,
.plan-summary,
.spec-card,
.article-aside,
.article-content,
.product-card {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.info-list {
  display: grid;
  gap: 0;
}

.info-row,
.faq-row {
  padding: 16px 0;
  border-top: 1px solid var(--line);
}

.info-row:first-child,
.faq-row:first-child {
  padding-top: 0;
  border-top: none;
}

.info-row {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
}

.info-row span {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--primary-soft);
  color: var(--primary-deep);
  display: inline-grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
}

.info-row strong,
.faq-row strong {
  color: var(--text);
}

.info-row p,
.faq-row p {
  margin: 6px 0 0;
  color: var(--text-soft);
  font-size: 0.94rem;
}

.page-hero {
  padding: 40px 0 22px;
}

.catalog-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}

.catalog-hero-side {
  display: grid;
}

.catalog-side-card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 242, 0.94));
  box-shadow: var(--shadow-soft);
  display: grid;
  gap: 12px;
}

.catalog-side-card strong {
  color: var(--text);
  font-size: 1.04rem;
  line-height: 1.4;
}

.catalog-side-card p {
  margin: 0;
  color: var(--text-soft);
}

.catalog-summary {
  padding-top: 0;
}

.catalog-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.catalog-stat-card {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  display: grid;
  gap: 8px;
}

.catalog-stat-card span {
  color: var(--text-faint);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.catalog-stat-card strong {
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  line-height: 1;
}

.catalog-stat-card small {
  color: var(--text-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}

.catalog-section-head {
  margin-bottom: 18px;
}

.catalog-section-head .section-title {
  margin-top: 0;
}

.catalog-section-head .section-copy {
  margin-bottom: 0;
}

.catalog-toolbar {
  margin-bottom: 16px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  display: grid;
  gap: 14px;
}

.catalog-toolbar-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.catalog-filter-field {
  display: grid;
  gap: 6px;
}

.catalog-filter-field span {
  color: var(--text-faint);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.catalog-filter-input,
.catalog-filter-select {
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--text);
  font: inherit;
}

.catalog-filter-input:focus,
.catalog-filter-select:focus {
  outline: none;
  border-color: rgba(197, 65, 28, 0.42);
  box-shadow: 0 0 0 3px rgba(197, 65, 28, 0.08);
}

.catalog-toolbar-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-soft);
  font-size: 0.9rem;
}

.catalog-toolbar-meta strong {
  color: var(--text);
  font-size: 0.96rem;
}

.page-hero-inner,
.split-layout,
.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;
  align-items: start;
}

.guide-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
  font-size: 0.9rem;
  font-weight: 600;
}

.trip-plan-list {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.trip-plan-row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(240px, 0.9fr) 180px;
  gap: 20px;
  align-items: center;
  padding: 22px 24px;
  border-bottom: 1px solid var(--line);
}

.trip-plan-row:last-child {
  border-bottom: none;
}

.trip-plan-main,
.trip-plan-side {
  display: grid;
  gap: 8px;
}

.trip-plan-tag {
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary-deep);
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 800;
}

.trip-plan-title h3 {
  margin: 0;
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.34;
}

.trip-plan-main p,
.trip-plan-side small {
  margin: 0;
  color: var(--text-soft);
}

.trip-plan-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.trip-plan-meta span {
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface-soft);
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 600;
}

.trip-plan-side {
  justify-items: end;
  text-align: right;
}

.trip-plan-side strong {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.45rem;
  letter-spacing: -0.04em;
}

.trip-plan-button {
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #d04e28 0%, #b83c1b 100%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 14px 26px rgba(197, 65, 28, 0.18);
}

.section-soft {
  background: linear-gradient(180deg, rgba(255, 248, 242, 0.7), rgba(246, 241, 234, 0.5));
}

.price-block {
  display: grid;
  gap: 2px;
}

.price-main {
  color: var(--primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  letter-spacing: -0.05em;
}

.price-sub,
.price-flag {
  color: var(--text-soft);
  font-size: 0.92rem;
}

.summary-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}

.summary-row:first-of-type {
  border-top: none;
  padding-top: 0;
}

.feature-list {
  margin: 16px 0 0;
  padding-left: 18px;
  color: var(--text-soft);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.product-card {
  display: grid;
  gap: 16px;
}

.product-head {
  display: grid;
  gap: 8px;
}

.product-badge,
.product-pill {
  width: fit-content;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 800;
}

.product-badge {
  background: var(--primary-soft);
  color: var(--primary-deep);
}

.product-pill {
  border: 1px solid var(--line);
  color: var(--text-soft);
}

.product-name {
  margin: 0;
  color: var(--text);
  font-size: 1.1rem;
}

.product-desc {
  margin: 0;
  font-size: 0.94rem;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.text-link {
  color: var(--primary-deep);
  font-weight: 700;
}

.article-body {
  display: grid;
  grid-template-columns: 1fr;
}

.article-layout .page-title {
  max-width: 18ch;
  letter-spacing: -0.028em;
  line-height: 1.12;
  font-weight: 700;
}

.article-layout .page-lead {
  max-width: 62ch;
  font-size: 1rem;
  line-height: 1.74;
}

.article-layout .guide-meta {
  gap: 12px;
  margin-top: 18px;
  font-size: 0.92rem;
  font-weight: 600;
}

.article-aside {
  gap: 14px;
}

.article-aside h3 {
  margin: 0;
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.2rem;
  line-height: 1.26;
  letter-spacing: -0.018em;
  font-weight: 700;
}

.article-content {
  padding: 28px;
}

.article-content h2 {
  margin: 0 0 10px;
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.34rem;
  line-height: 1.18;
  letter-spacing: -0.022em;
  font-weight: 700;
}

.article-content p,
.article-content li {
  font-size: 1rem;
  line-height: 1.82;
}

.article-content p {
  margin: 0;
}

.article-content p + p {
  margin-top: 16px;
}

.article-section + .article-section {
  margin-top: 30px;
}

.article-content ul {
  padding-left: 18px;
  margin: 14px 0 0;
}

.article-content li + li {
  margin-top: 6px;
}

.article-related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.article-related-card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  text-decoration: none;
  color: inherit;
  display: grid;
  gap: 10px;
}

.article-related-card span {
  color: var(--text-soft);
  font-size: 0.8rem;
  font-weight: 700;
}

.article-related-card strong {
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.02rem;
  line-height: 1.35;
}

.article-related-card p {
  margin: 0;
  color: var(--text-soft);
}

.article-related-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-strong);
}

.checkout-page {
  padding-bottom: 28px;
}

.checkout-mobile-top {
  display: none;
}

.checkout-mobile-sheet {
  display: none;
}

.checkout-hero {
  padding-bottom: 10px;
}

.checkout-hero-inner,
.checkout-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.78fr);
  gap: 22px;
  align-items: start;
}

.checkout-title {
  max-width: 13ch;
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  line-height: 1.08;
}

.checkout-page .page-lead {
  max-width: 48ch;
  font-size: 0.9rem;
}

.checkout-top-note,
.checkout-summary-card,
.checkout-form-card {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-soft);
}

.checkout-top-note {
  display: grid;
  gap: 8px;
  background: linear-gradient(180deg, rgba(255, 248, 242, 0.96), rgba(255, 255, 255, 0.96));
}

.checkout-top-note strong,
.checkout-form-head h2,
.checkout-summary-head strong {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.checkout-top-note strong {
  color: var(--text);
  font-size: 0.92rem;
  letter-spacing: -0.04em;
}

.checkout-top-note p,
.checkout-form-head p,
.checkout-summary-selected p,
.checkout-form-note {
  margin: 0;
  color: var(--text-soft);
}

.checkout-summary-card {
  display: grid;
  gap: 18px;
  position: sticky;
  top: 92px;
}

.checkout-summary-head {
  display: grid;
  gap: 6px;
}

.checkout-summary-kicker,
.checkout-form-eyebrow {
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.checkout-summary-head strong {
  color: var(--primary);
  font-size: 1.92rem;
  letter-spacing: -0.05em;
}

.checkout-summary-selected {
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface-soft);
}

.checkout-summary-selected b {
  color: var(--text);
  font-size: 0.96rem;
  line-height: 1.35;
}

.checkout-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.checkout-stat {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 12px;
  background: linear-gradient(180deg, #fff9f5, #ffffff);
  border: 1px solid var(--line);
}

.checkout-stat span {
  color: var(--text-faint);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.checkout-stat strong {
  color: var(--text);
  font-size: 0.94rem;
  line-height: 1.34;
}

.checkout-perk-list {
  display: grid;
  gap: 10px;
}

.checkout-perk-list span {
  padding-left: 18px;
  position: relative;
  color: var(--text-soft);
  font-size: 0.92rem;
}

.checkout-perk-list span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #d04e28, #b83c1b);
}

.checkout-form-card {
  display: grid;
  gap: 14px;
}

.checkout-form-head {
  display: grid;
  gap: 8px;
}

.checkout-form-head h2 {
  margin: 0;
  color: var(--text);
  max-width: 18ch;
  font-size: 1.22rem;
  letter-spacing: -0.05em;
  line-height: 1.14;
}

.checkout-form {
  display: grid;
  gap: 14px;
}

.checkout-email-field {
  display: grid;
  gap: 8px;
  color: var(--text);
  font-size: 0.94rem;
  font-weight: 600;
}

.checkout-email-input-wrap {
  position: relative;
  display: grid;
}

.checkout-plan-input {
  display: none;
}

.checkout-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.checkout-confirm {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(197, 65, 28, 0.14);
  border-radius: 12px;
  background: #fff8f3;
  font-size: 0.92rem;
  font-weight: 600;
}

.checkout-confirm input {
  width: 18px;
  min-width: 18px;
  min-height: 18px;
  height: 18px;
  margin: 2px 0 0;
  padding: 0;
  border-radius: 6px;
  accent-color: var(--primary);
}

.checkout-confirm span {
  color: var(--text);
  line-height: 1.5;
}

.checkout-email-suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 12;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(214, 191, 178, 0.92);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 18px 36px rgba(125, 86, 65, 0.14);
  backdrop-filter: blur(12px);
}

.checkout-email-suggestion {
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(233, 215, 205, 0.92);
  border-radius: 12px;
  background: linear-gradient(180deg, #fffaf7, #fff2eb);
  color: #8b3d1d;
  font-size: 0.79rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.checkout-email-suggestion:hover,
.checkout-email-suggestion:focus-visible {
  border-color: rgba(211, 71, 37, 0.28);
  background: linear-gradient(180deg, #fff5ef, #ffe8da);
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(211, 71, 37, 0.1);
  outline: none;
}

.checkout-field-note {
  color: var(--text-faint);
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.5;
}

.checkout-period-card {
  display: block;
  padding: 16px;
  border: 1px solid rgba(197, 65, 28, 0.22);
  border-radius: 14px;
  background: linear-gradient(180deg, #fff5ec, #ffffff);
  box-shadow: 0 10px 22px rgba(197, 65, 28, 0.07);
}

.checkout-period-input {
  display: grid;
  gap: 6px;
}

.checkout-period-input span {
  color: var(--text-faint);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.checkout-period-input input {
  min-height: 68px;
  padding: 0 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.98);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  text-align: center;
}

.checkout-submit {
  width: 100%;
}

.order-lookup-form {
  gap: 14px;
}

.order-lookup-divider {
  position: relative;
  text-align: center;
  margin: 2px 0;
}

.order-lookup-divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: var(--line);
}

.order-lookup-divider span {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: #fffaf6;
  border: 1px solid rgba(223, 209, 197, 0.76);
  color: var(--text-faint);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.order-lookup-note {
  min-height: 20px;
}

.order-lookup-results {
  display: grid;
  gap: 14px;
  padding-top: 4px;
  border-top: 1px solid rgba(223, 209, 197, 0.7);
}

.order-lookup-results-head {
  gap: 4px;
}

.order-lookup-list {
  display: grid;
  gap: 12px;
}

.order-lookup-item {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, #fffaf6, #ffffff);
}

.order-lookup-item-top,
.order-lookup-item-copy,
.order-lookup-meta-item {
  display: grid;
}

.order-lookup-item-top {
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: start;
}

.order-lookup-item-copy {
  gap: 6px;
}

.order-lookup-reference {
  color: var(--primary);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.order-lookup-item-copy strong {
  color: var(--text);
  font-size: 0.98rem;
  line-height: 1.34;
}

.order-lookup-item-copy p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.88rem;
  line-height: 1.48;
}

.order-lookup-status {
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(197, 65, 28, 0.14);
  background: #fff7f2;
  color: var(--primary-deep);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.76rem;
  font-weight: 800;
  white-space: nowrap;
}

.order-lookup-status.is-paid {
  border-color: rgba(40, 125, 72, 0.14);
  background: #f1fbf4;
  color: #216b36;
}

.order-lookup-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.order-lookup-meta-item {
  gap: 4px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(226, 213, 202, 0.9);
  background: rgba(255, 255, 255, 0.9);
}

.order-lookup-meta-item span {
  color: var(--text-faint);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.order-lookup-meta-item strong {
  color: var(--text);
  font-size: 0.86rem;
  line-height: 1.4;
}

.payment-qr-card {
  display: grid;
  gap: 16px;
}

.payment-mobile-sheet {
  display: none;
}

.payment-qr-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(180deg, #fff9f5, #ffffff);
  border: 1px solid var(--line);
}

.payment-qr-image {
  width: min(100%, 360px);
  height: auto;
  display: block;
}

.payment-detail-list {
  display: grid;
  gap: 10px;
}

.payment-detail-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface-soft);
}

.payment-detail-row-block {
  grid-template-columns: minmax(0, 1fr);
}

.payment-detail-copy {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.payment-detail-copy span {
  color: var(--text-faint);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.payment-detail-copy strong {
  color: var(--text);
  font-size: 0.94rem;
  line-height: 1.4;
  word-break: break-word;
}

.payment-detail-copy p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.84rem;
  line-height: 1.5;
  word-break: break-word;
}

.payment-detail-row-strong .payment-detail-copy strong {
  color: var(--primary);
  font-size: 1.18rem;
}

.payment-copy-button {
  min-width: 64px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid rgba(197, 65, 28, 0.18);
  border-radius: 10px;
  background: #fff;
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 800;
}

.payment-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.payment-meta-item {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--surface-soft);
}

.payment-meta-item span {
  color: var(--text-faint);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.payment-meta-item strong {
  color: var(--text);
  font-size: 0.94rem;
  line-height: 1.4;
  word-break: break-word;
}

.payment-meta-item-strong strong {
  color: var(--primary);
  font-size: 1.08rem;
}

.payment-meta-item-wide {
  grid-column: 1 / -1;
}

.payment-action-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.payment-action-row-multi {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.payment-action-row-dual {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.payment-action-row-single {
  grid-template-columns: 1fr;
}

.payment-bank-app-card {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(214, 197, 186, 0.9);
  background: linear-gradient(180deg, rgba(255, 248, 244, 0.95), rgba(255, 255, 255, 0.98));
}

.payment-bank-app-head {
  display: grid;
  gap: 4px;
}

.payment-bank-app-head strong {
  color: var(--text);
  font-size: 1rem;
}

.payment-bank-app-head p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.84rem;
  line-height: 1.6;
}

.payment-bank-app-section {
  display: grid;
  gap: 10px;
}

.payment-bank-app-section-head {
  display: grid;
  gap: 3px;
}

.payment-bank-app-section-head strong {
  color: var(--text);
  font-size: 0.84rem;
}

.payment-bank-app-section-head span,
.payment-bank-app-footnote {
  color: var(--text-faint);
  font-size: 0.74rem;
  line-height: 1.55;
}

.payment-bank-app-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.payment-bank-app-link {
  min-height: 54px;
  padding: 10px 12px;
  border-radius: 14px;
  display: grid;
  gap: 2px;
  justify-items: start;
  align-content: center;
  text-align: left;
}

.payment-bank-app-link span {
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--text);
}

.payment-bank-app-link small {
  color: var(--text-faint);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.payment-bank-app-link-primary {
  border-color: rgba(197, 65, 28, 0.22);
  background: linear-gradient(180deg, rgba(255, 247, 242, 0.98), rgba(255, 255, 255, 0.98));
}

.payment-bank-app-more {
  display: grid;
  gap: 10px;
}

.payment-bank-app-more summary {
  cursor: pointer;
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 800;
  list-style: none;
}

.payment-bank-app-more summary::-webkit-details-marker {
  display: none;
}

.payment-confirm-button,
.payment-open-qr {
  width: 100%;
}

.payment-confirm-button[disabled] {
  opacity: 0.72;
  cursor: not-allowed;
}

.payment-note {
  text-align: left;
}

.payment-success-card {
  gap: 14px;
}

.page-payment-success .checkout-grid {
  grid-template-areas: "summary detail";
}

.page-payment-success .checkout-summary-card {
  grid-area: summary;
}

.page-payment-success .payment-success-card {
  grid-area: detail;
}

.page-payment-success .checkout-summary-head {
  gap: 4px;
}

.page-payment-success .checkout-summary-kicker {
  font-size: 0.72rem;
}

.page-payment-success .checkout-summary-head strong {
  font-size: 1.22rem;
  letter-spacing: -0.03em;
}

.page-payment-success .checkout-summary-selected b {
  font-size: 0.88rem;
}

.page-payment-success .checkout-summary-selected p,
.page-payment-success .checkout-form-note,
.page-payment-success .checkout-perk-list span {
  font-size: 0.8rem;
  line-height: 1.45;
}

.page-payment-success .checkout-stat span,
.page-payment-success .payment-meta-item span {
  font-size: 0.7rem;
}

.page-payment-success .checkout-stat strong,
.page-payment-success .payment-meta-item strong {
  font-size: 0.86rem;
}

.page-payment-success .payment-meta-item-strong strong {
  font-size: 1rem;
}

.payment-success-banner {
  display: grid;
  gap: 6px;
}

.page-payment-success .payment-success-banner {
  gap: 4px;
}

.payment-success-banner strong {
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.2;
}

.page-payment-success .payment-success-banner strong {
  font-size: 0.96rem;
}

.payment-success-banner p {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.9rem;
  line-height: 1.5;
}

.page-payment-success .payment-success-banner p {
  font-size: 0.82rem;
  line-height: 1.45;
}

.payment-success-badge {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(230, 91, 71, 0.1);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.page-payment-success .payment-success-badge {
  padding: 6px 10px;
  font-size: 0.68rem;
}

.payment-esim-list {
  display: grid;
  gap: 14px;
}

.payment-esim-card {
  display: grid;
  gap: 12px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid rgba(230, 91, 71, 0.14);
  background:
    radial-gradient(circle at top right, rgba(230, 91, 71, 0.08), transparent 42%),
    linear-gradient(180deg, #fffdfb, #fff8f3);
}

.payment-esim-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.payment-esim-card-head strong {
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.3;
}

.payment-esim-card-label {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(230, 91, 71, 0.1);
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.payment-demo-qr-wrap {
  background:
    radial-gradient(circle at top, rgba(230, 91, 71, 0.12), transparent 55%),
    linear-gradient(180deg, #fff9f5, #ffffff);
}

.payment-real-qr-wrap {
  background:
    radial-gradient(circle at top, rgba(230, 91, 71, 0.1), transparent 52%),
    linear-gradient(180deg, #fff8f3, #ffffff);
}

.payment-demo-qr-image {
  width: min(100%, 300px);
}

.payment-real-qr-image {
  width: min(100%, 320px);
}

.payment-success-meta-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.payment-demo-code {
  font-family: "SFMono-Regular", ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace;
  font-size: 0.84rem;
}

.page-payment-success .payment-demo-code {
  font-size: 0.76rem;
}

.payment-demo-note {
  background: rgba(230, 91, 71, 0.06);
  border: 1px dashed rgba(230, 91, 71, 0.22);
  border-radius: 16px;
  padding: 12px 14px;
}

.payment-addon-card {
  display: grid;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(230, 91, 71, 0.14);
  background: #fffaf7;
}

.payment-addon-card[hidden] {
  display: none;
}

.payment-addon-card[data-state='error'] {
  border-color: rgba(179, 37, 37, 0.16);
  background: #fff8f8;
}

.payment-addon-head {
  display: grid;
  gap: 4px;
}

.payment-addon-head strong {
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.2;
}

.payment-addon-head span {
  color: var(--text-faint);
  font-size: 0.76rem;
  line-height: 1.4;
}

.payment-addon-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.payment-addon-item,
.payment-addon-row {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #ffffff;
}

.payment-addon-item span,
.payment-addon-row p {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.76rem;
  line-height: 1.4;
}

.payment-addon-item strong,
.payment-addon-row strong,
.payment-addon-price {
  color: var(--text);
  font-size: 0.92rem;
  line-height: 1.3;
}

.payment-addon-item-wide {
  grid-column: 1 / -1;
}

.payment-addon-list {
  display: grid;
  gap: 10px;
}

.payment-addon-row {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
}

.payment-addon-copy {
  display: grid;
  gap: 4px;
}

.payment-addon-action {
  display: grid;
  gap: 8px;
  justify-items: end;
}

.payment-addon-price {
  color: var(--primary);
  font-weight: 800;
  white-space: nowrap;
}

.payment-addon-button {
  min-width: 178px;
}

.payment-mobile-details {
  display: none;
}

.payment-mobile-details summary {
  list-style: none;
}

.payment-mobile-details summary::-webkit-details-marker {
  display: none;
}

.payment-mobile-details-body {
  display: grid;
}

.payment-mobile-details-row {
  display: grid;
}

.payment-wait-button {
  width: 100%;
}

.payment-wait-button.is-active {
  box-shadow: 0 16px 34px rgba(197, 65, 28, 0.18);
}

.payment-waiting-card {
  display: none;
  gap: 10px;
  justify-items: center;
  padding: 18px 16px;
  border-radius: 18px;
  border: 1px solid rgba(230, 91, 71, 0.18);
  background:
    radial-gradient(circle at top, rgba(230, 91, 71, 0.08), transparent 60%),
    linear-gradient(180deg, #fff8f3, #ffffff);
  text-align: center;
}

.payment-waiting-card.is-visible {
  display: grid;
}

.payment-waiting-card strong {
  color: var(--text);
  font-size: 0.98rem;
  line-height: 1.25;
}

.payment-waiting-card p {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.9rem;
  line-height: 1.55;
}

.payment-waiting-spinner {
  width: 38px;
  height: 38px;
}

.payment-provisioning-card {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 28px 20px;
  border-radius: 22px;
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at top, rgba(230, 91, 71, 0.09), transparent 56%),
    linear-gradient(180deg, #fff9f5, #ffffff);
  text-align: center;
}

.payment-provisioning-card strong {
  color: var(--text);
  font-size: 1.02rem;
  line-height: 1.25;
}

.payment-provisioning-card p {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.93rem;
  line-height: 1.6;
}

.payment-provisioning-spinner {
  width: 42px;
  height: 42px;
}

.payment-real-qr-link {
  text-decoration: none;
}

.payment-success-meta-grid a {
  color: inherit;
  text-decoration: none;
}

.payment-success-meta-grid a:hover {
  color: var(--primary);
}

.payment-success-loading {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(18, 14, 12, 0.42);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 180ms ease, visibility 180ms ease;
}

.payment-success-loading.is-visible {
  opacity: 1;
  visibility: visible;
}

.payment-success-loading-card {
  width: min(100%, 320px);
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 24px 20px;
  border-radius: 24px;
  background: linear-gradient(180deg, #fffaf7, #ffffff);
  border: 1px solid rgba(230, 91, 71, 0.14);
  box-shadow: 0 24px 60px rgba(40, 24, 16, 0.18);
  text-align: center;
}

.payment-success-loading-card strong {
  color: var(--text);
  font-size: 1.02rem;
  line-height: 1.25;
}

.payment-success-loading-card p {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.9rem;
  line-height: 1.55;
}

.payment-success-loading-spinner {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 4px solid rgba(230, 91, 71, 0.16);
  border-top-color: var(--primary);
  animation: payment-spin 0.72s linear infinite;
}

@keyframes payment-spin {
  to {
    transform: rotate(360deg);
  }
}

.checkout-form-note {
  font-size: 0.92rem;
}

.checkout-mobile-sheet-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkout-mobile-sheet-main,
.checkout-mobile-sheet-copy,
.checkout-mobile-sheet-price {
  display: grid;
}

.checkout-mobile-sheet-main,
.checkout-mobile-sheet-copy {
  gap: 10px;
}

.checkout-mobile-sheet-main {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
}

.checkout-mobile-sheet-price {
  gap: 4px;
  justify-items: end;
}

.checkout-mobile-sheet-price small {
  color: var(--text-faint);
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.checkout-mobile-head-kicker,
.checkout-mobile-sheet-kicker {
  color: var(--text-faint);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.checkout-mobile-back {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(220, 207, 198, 0.84);
  background: rgba(255, 255, 255, 0.94);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.76rem;
  font-weight: 700;
  box-shadow: 0 10px 22px rgba(154, 108, 86, 0.1);
}

@keyframes orderPulse {
  0% {
    box-shadow: var(--shadow);
    border-color: var(--line);
  }

  40% {
    box-shadow: 0 0 0 4px rgba(197, 65, 28, 0.08), 0 24px 48px rgba(197, 65, 28, 0.14);
    border-color: rgba(197, 65, 28, 0.42);
  }

  100% {
    box-shadow: var(--shadow);
    border-color: var(--line);
  }
}

@media (max-width: 1120px) {
  .desktop-picker-grid,
  .rose-hero,
  .rose-plan-strip,
  .rose-reasons-grid,
  .poster-hero,
  .china-hero-shell,
  .detail-hero-grid,
  .detail-options-grid,
  .detail-meta-grid,
  .detail-review-grid,
  .detail-step-grid,
  .store-hero-grid,
  .store-support-grid,
  .page-hero-inner,
  .checkout-hero-inner,
  .checkout-grid,
  .split-layout,
  .article-layout,
  .products-grid {
    grid-template-columns: 1fr;
  }

  .store-order-rail {
    position: static;
  }

  .detail-order-rail {
    position: static;
  }

  .poster-nav {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 18px;
  }

  .rose-homebar {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 18px;
  }

  .rose-nav,
  .rose-actions {
    flex-wrap: wrap;
    justify-content: center;
  }

  .rose-hero {
    min-height: auto;
  }

  .rose-picker-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .rose-feature-stack {
    position: static;
    width: 100%;
    margin-top: 18px;
  }

  .rose-plan-strip,
  .rose-reasons-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .rose-travel-promo {
    grid-template-columns: 1fr;
    padding: 22px 24px;
  }

  .rose-travel-promo-title {
    font-size: 1.46rem;
    line-height: 1.12;
  }

  .rose-travel-promo-side-title {
    font-size: 1.16rem;
  }

  .desktop-picker-grid {
    grid-template-columns: 1fr;
  }

  .poster-nav-links,
  .poster-nav-actions {
    flex-wrap: wrap;
    justify-content: center;
  }

  .poster-hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .poster-copy {
    padding-top: 20px;
  }

  .poster-purchase-card {
    width: 100%;
  }

  .poster-sim-card-wrap {
    margin: 80px auto 0;
  }

  .poster-feature-panel {
    margin: 48px auto 0;
  }

  .poster-reasons-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .china-hero-shell {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .china-hero-copy {
    padding-top: 10px;
  }

  .china-hero-visual,
  .china-chip-stage,
  .china-hero-facts {
    margin-left: 0;
    width: 100%;
  }

  .china-reasons-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-plan-grid {
    grid-template-columns: 1fr;
  }

  .store-product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .catalog-hero-grid,
  .catalog-stat-grid,
  .catalog-toolbar-grid {
    grid-template-columns: 1fr;
  }

  .trip-plan-row {
    grid-template-columns: 1fr;
  }

  .trip-plan-side {
    justify-items: start;
    text-align: left;
  }
}

@media (max-width: 840px) {
  .desktop-picker-actions,
  .rose-reasons-grid,
  .poster-reasons-grid,
  .china-reasons-grid,
  .detail-review-grid,
  .detail-step-grid,
  .store-journey-grid,
  .store-feature-band,
  .store-product-grid {
    grid-template-columns: 1fr;
  }

  .catalog-toolbar-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-order-grid,
  .checkout-form-grid,
  .checkout-period-card,
  .checkout-stat-grid,
  .detail-plan-stats,
  .store-order-grid,
  .store-product-stats,
  .products-grid {
    grid-template-columns: 1fr;
  }

  .section-head,
  .china-glass-price,
  .detail-section-head,
  .store-section-head,
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .china-hero-facts {
    grid-template-columns: 1fr;
  }

  .desktop-picker-type-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .desktop-picker-summary,
  .desktop-picker-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .china-hero-fact.is-wide {
    grid-column: auto;
  }

  .poster-feature-panel {
    grid-template-columns: 1fr;
  }

  .poster-feature-item.is-wide {
    grid-column: auto;
  }

  .desktop-picker-actions {
    align-items: flex-start;
  }

  .rose-plan-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .rose-plan-strip .rose-plan-card:nth-child(n + 7) {
    display: none;
  }

  .rose-plan-card {
    padding: 14px;
    gap: 12px;
    border-radius: 12px;
  }

  .rose-plan-card-head,
  .rose-plan-copy,
  .rose-plan-bottom,
  .rose-plan-price,
  .rose-plan-buy-row {
    gap: 8px;
  }

  .rose-plan-tag-row {
    gap: 6px;
  }

  .rose-plan-tag {
    min-height: 24px;
    padding: 0 8px;
    font-size: 0.6rem;
  }

  .rose-plan-apps {
    padding: 8px 9px;
    gap: 6px;
    border-radius: 10px;
  }

  .rose-plan-apps p,
  .rose-plan-price small {
    display: none;
  }

  .rose-plan-card strong {
    font-size: 0.86rem;
    line-height: 1.35;
  }

  .rose-plan-price span {
    font-size: 0.62rem;
  }

  .rose-plan-price b {
    font-size: 1rem;
  }

  .rose-plan-meta-box,
  .rose-plan-quantity {
    padding: 8px;
    border-radius: 10px;
    gap: 6px;
  }

  .rose-plan-meta-box-label,
  .rose-plan-quantity-label {
    font-size: 0.62rem;
  }

  .rose-plan-quantity-controls {
    gap: 4px;
  }

  .rose-plan-quantity-step {
    width: 24px;
    height: 24px;
    border-radius: 7px;
  }

  .rose-plan-quantity-input {
    width: 24px;
    font-size: 0.72rem;
  }

  .rose-plan-buy {
    min-height: 38px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 0.82rem;
  }
}

@media (max-width: 760px) {
  :root {
    --wrap: calc(100vw - 18px);
  }

  .page-checkout .wrap,
  .checkout-mobile-top .wrap {
    width: min(100%, calc(100vw - 24px));
    max-width: calc(100vw - 24px);
  }

  body {
    background:
      radial-gradient(circle at top, rgba(246, 100, 86, 0.08), transparent 24%),
      linear-gradient(180deg, #fffdfa 0%, #ffffff 240px, #fff8f4 100%);
    color: var(--text);
  }

  .site-header {
    display: none;
  }

  .page-checkout .site-header {
    display: none;
  }

  .checkout-mobile-top {
    display: block;
    padding: 8px 0 4px;
  }

  .checkout-mobile-top .wrap {
    display: grid;
    gap: 8px;
  }

  .page-checkout .mobile-app-nav {
    grid-template-columns: minmax(0, 1fr);
    padding: 0 2px;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }

  .page-checkout .mobile-app-brand {
    gap: 8px;
    min-width: 0;
  }

  .page-checkout .mobile-app-brand-wordmark .mobile-app-brand-copy {
    gap: 0;
  }

  .page-checkout .mobile-app-brand-wordmark .mobile-app-brand-copy strong {
    font-size: 1.08rem;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .page-checkout .mobile-app-brand-wordmark .mobile-app-brand-copy small {
    font-size: 0.56rem;
    letter-spacing: 0.22em;
  }

  .checkout-mobile-back {
    display: none;
  }

  .checkout-mobile-head {
    display: grid;
    gap: 3px;
    justify-items: start;
    padding: 2px 2px 0;
    text-align: left;
  }

  .checkout-mobile-head-kicker {
    font-size: 0.58rem;
    letter-spacing: 0.08em;
  }

  .checkout-mobile-head h2 {
    margin: 0;
    color: #241d19;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.08rem;
    letter-spacing: -0.028em;
    line-height: 1.22;
  }

  .page-checkout .checkout-hero {
    display: none;
  }

  .checkout-page {
    padding-top: 0;
    padding-bottom: 16px;
  }

  .page-checkout .checkout-section {
    padding-top: 0;
  }

  .checkout-top-note,
  .checkout-summary-card,
  .checkout-form-card {
    padding: 18px 16px;
    border-radius: 22px;
  }

  .support-app-row {
    gap: 5px;
  }

  .support-app-icon,
  .store-product-foot .support-app-icon,
  .detail-order-selected .support-app-icon,
  .checkout-summary-selected .support-app-icon,
  .mobile-app-plan-focus-copy .support-app-icon,
  .desktop-picker-summary-copy .support-app-icon {
    width: 18px;
    height: 18px;
    border-radius: 6px;
  }

  .support-app-icon svg,
  .store-product-foot .support-app-icon svg,
  .detail-order-selected .support-app-icon svg,
  .checkout-summary-selected .support-app-icon svg,
  .mobile-app-plan-focus-copy .support-app-icon svg,
  .desktop-picker-summary-copy .support-app-icon svg {
    width: 10px;
    height: 10px;
  }

  .plan-title-inline {
    gap: 6px;
  }

  .plan-title-badge {
    min-height: 20px;
    padding: 0 7px;
    font-size: 0.6rem;
  }

  .checkout-summary-card {
    display: none;
  }

  .checkout-mobile-sheet {
    display: grid;
    gap: 12px;
    padding: 16px 16px 15px;
    border: 1px solid rgba(226, 210, 201, 0.92);
    border-radius: 20px;
    background:
      radial-gradient(circle at top right, rgba(208, 78, 40, 0.1), transparent 34%),
      linear-gradient(180deg, rgba(255, 253, 250, 0.99), rgba(255, 247, 241, 0.98));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.72),
      0 14px 30px rgba(140, 97, 73, 0.08);
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .checkout-mobile-sheet-kicker {
    color: var(--primary);
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .checkout-mobile-sheet-main {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .checkout-mobile-sheet-copy {
    min-width: 0;
    gap: 10px;
  }

  .checkout-mobile-sheet-price {
    min-width: 0;
    padding-top: 10px;
    padding-left: 0;
    border-top: 1px solid rgba(226, 210, 201, 0.92);
    justify-items: start;
  }

  .checkout-mobile-sheet-price small {
    color: #7a665c;
    font-size: 0.58rem;
    letter-spacing: 0.08em;
  }

  .checkout-mobile-sheet-price strong {
    color: var(--primary);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.26rem;
    letter-spacing: -0.03em;
    line-height: 1;
    white-space: nowrap;
  }

  .checkout-mobile-sheet b {
    color: var(--text);
    font-size: 0.98rem;
    line-height: 1.34;
  }

  .checkout-mobile-sheet-meta {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 7px;
  }

  .checkout-mobile-sheet-meta span {
    min-height: 30px;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(226, 210, 201, 0.92);
    color: #6d5d55;
    display: inline-flex;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .checkout-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .payment-meta-grid {
    grid-template-columns: 1fr;
  }

  .payment-success-meta-grid {
    grid-template-columns: 1fr;
  }

  .payment-action-row {
    grid-template-columns: 1fr;
  }

  .page-payment .checkout-form-card {
    padding: 14px;
    gap: 12px;
  }

  .page-payment .checkout-mobile-head {
    gap: 2px;
  }

  .page-payment .checkout-mobile-head h2 {
    font-size: 0.96rem;
    letter-spacing: -0.025em;
  }

  .page-payment .checkout-mobile-head p {
    margin: 0;
    color: #7d695e;
    font-size: 0.68rem;
    line-height: 1.45;
  }

  .page-payment .payment-mobile-sheet {
    display: grid;
    gap: 10px;
    padding: 14px;
    border: 1px solid rgba(226, 210, 201, 0.92);
    border-radius: 18px;
    background:
      radial-gradient(circle at top right, rgba(208, 78, 40, 0.08), transparent 34%),
      linear-gradient(180deg, rgba(255, 253, 250, 0.99), rgba(255, 247, 241, 0.98));
  }

  .page-payment .payment-mobile-sheet-top {
    display: grid;
    gap: 10px;
  }

  .page-payment .payment-mobile-sheet-copy {
    display: grid;
    gap: 5px;
  }

  .page-payment .payment-mobile-sheet-kicker {
    color: var(--primary);
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .page-payment .payment-mobile-sheet-copy b {
    color: var(--text);
    font-size: 0.94rem;
    line-height: 1.34;
  }

  .page-payment .payment-mobile-sheet-price {
    display: grid;
    gap: 3px;
    padding-top: 10px;
    border-top: 1px solid rgba(226, 210, 201, 0.92);
  }

  .page-payment .payment-mobile-sheet-price small {
    color: #7a665c;
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .page-payment .payment-mobile-sheet-price strong {
    color: var(--primary);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.22rem;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .page-payment .payment-mobile-sheet-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .page-payment .payment-mobile-sheet-meta span {
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid rgba(226, 210, 201, 0.92);
    background: rgba(255, 255, 255, 0.82);
    color: #6d5d55;
    display: inline-flex;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 700;
  }

  .page-payment .payment-qr-wrap {
    padding: 12px;
    border-radius: 18px;
  }

  .page-payment .payment-qr-image {
    width: min(100%, 250px);
  }

  .page-payment .payment-detail-list {
    gap: 8px;
  }

  .page-payment .payment-detail-row {
    padding: 12px;
    border-radius: 14px;
    gap: 10px;
  }

  .page-payment .payment-detail-copy span {
    font-size: 0.64rem;
  }

  .page-payment .payment-detail-copy strong {
    font-size: 0.84rem;
    line-height: 1.34;
  }

  .page-payment .payment-detail-copy p {
    font-size: 0.74rem;
    line-height: 1.45;
  }

  .page-payment .payment-detail-row-strong .payment-detail-copy strong {
    font-size: 1.02rem;
  }

  .page-payment .payment-copy-button {
    min-width: 56px;
    height: 32px;
    padding: 0 10px;
    border-radius: 9px;
    font-size: 0.74rem;
  }

  .page-payment .payment-note {
    font-size: 0.74rem;
    line-height: 1.5;
  }

  .page-payment .payment-wait-button,
  .page-payment .payment-open-qr {
    min-height: 48px;
    border-radius: 14px;
  }

  .checkout-summary-head strong {
    font-size: 1.4rem;
  }

  .checkout-form-head h2 {
    max-width: none;
    font-size: 1.08rem;
    line-height: 1.24;
    letter-spacing: -0.025em;
  }

  .checkout-form-head {
    gap: 5px;
    padding-bottom: 0;
  }

  .checkout-top-note strong {
    font-size: 0.84rem;
  }

  .checkout-top-note p,
  .checkout-form-head p,
  .checkout-summary-selected p,
  .checkout-form-note,
  .checkout-perk-list span {
    font-size: 0.78rem;
    line-height: 1.56;
  }

  .checkout-summary-selected b,
  .checkout-stat strong {
    font-size: 0.84rem;
  }

  .checkout-form {
    gap: 13px;
  }

  .checkout-form-card {
    gap: 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 249, 244, 0.98));
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .checkout-form-grid label,
  .checkout-form > label,
  .checkout-email-field {
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .checkout-form input,
  .checkout-form select,
  .checkout-form textarea {
    min-height: 52px;
    padding: 0 14px;
    border-radius: 16px;
    font-size: 0.94rem;
    background: #fffdfb;
  }

  .checkout-period-input input {
    min-height: 56px;
    font-size: 1.15rem;
  }

  .checkout-stat span,
  .checkout-summary-kicker,
  .checkout-form-eyebrow {
    font-size: 0.68rem;
  }

  .checkout-form-note {
    display: none;
  }

  .checkout-confirm {
    gap: 10px;
    padding: 13px 14px;
    border-radius: 16px;
    font-size: 0.82rem;
    background: linear-gradient(180deg, #fff9f5, #fff5ef);
  }

  .checkout-email-suggestions {
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    padding: 6px;
    border-radius: 14px;
  }

  .checkout-email-suggestion {
    min-height: 32px;
    padding: 0 10px;
    font-size: 0.74rem;
  }

  .checkout-field-note {
    font-size: 0.73rem;
    line-height: 1.52;
  }

  .status[data-form-status] {
    font-size: 0.76rem;
    line-height: 1.48;
    color: #7a675d;
  }

  .checkout-submit {
    min-height: 54px;
    border-radius: 16px;
    box-shadow: 0 18px 28px rgba(197, 65, 28, 0.16);
  }

  .page-checkout .site-footer {
    display: none;
  }

  .order-lookup-divider {
    margin: 0;
  }

  .order-lookup-results {
    gap: 10px;
  }

  .order-lookup-item {
    gap: 10px;
    padding: 12px;
    border-radius: 16px;
  }

  .order-lookup-item-top,
  .order-lookup-meta-grid {
    grid-template-columns: 1fr;
  }

  .order-lookup-item-copy strong,
  .order-lookup-meta-item strong {
    font-size: 0.78rem;
  }

  .order-lookup-item-copy p,
  .order-lookup-note {
    font-size: 0.68rem;
    line-height: 1.45;
  }

  .order-lookup-reference,
  .order-lookup-meta-item span,
  .order-lookup-status,
  .order-lookup-divider span {
    font-size: 0.64rem;
  }

  .order-lookup-meta-item {
    padding: 10px 12px;
    border-radius: 14px;
  }

  .page-payment-success .checkout-summary-head strong {
    font-size: 1.04rem;
  }

  .page-payment-success .checkout-grid {
    grid-template-columns: 1fr !important;
    grid-template-areas:
      "detail"
      "summary" !important;
    gap: 10px !important;
  }

  .page-payment-success .checkout-form-card {
    order: 1;
    padding: 12px;
    gap: 10px;
  }

  .page-payment-success .checkout-summary-card {
    order: 2;
    padding: 12px;
    gap: 10px;
  }

  .payment-bank-app-card {
    padding: 14px;
  }

  .payment-bank-app-head p {
    font-size: 0.8rem;
  }

  .payment-bank-app-link {
    min-height: 50px;
    padding: 10px;
  }

  .page-payment-success .checkout-mobile-head h2 {
    font-size: 0.72rem !important;
  }

  .page-payment-success .checkout-mobile-head p {
    font-size: 0.56rem !important;
    line-height: 1.35;
  }

  .page-payment-success .checkout-summary-selected b,
  .page-payment-success .checkout-stat strong,
  .page-payment-success .payment-meta-item strong {
    font-size: 0.7rem !important;
  }

  .page-payment-success .checkout-summary-selected p,
  .page-payment-success .checkout-form-note,
  .page-payment-success .checkout-perk-list span,
  .page-payment-success .payment-success-banner p {
    font-size: 0.62rem !important;
  }

  .page-payment-success .payment-success-banner strong {
    font-size: 0.76rem !important;
  }

  .page-payment-success .payment-esim-list {
    gap: 10px;
  }

  .page-payment-success .payment-esim-card {
    gap: 10px;
    padding: 10px;
    border-radius: 16px;
  }

  .page-payment-success .payment-esim-card-head {
    gap: 8px;
    align-items: flex-start;
  }

  .page-payment-success .payment-esim-card-head strong {
    font-size: 0.72rem;
  }

  .page-payment-success .payment-esim-card-label {
    min-height: 24px;
    padding: 0 8px;
    font-size: 0.62rem;
  }

  .page-payment-success .payment-demo-code {
    font-size: 0.6rem !important;
  }

  .page-payment-success .payment-qr-wrap {
    padding: 10px;
    border-radius: 16px;
  }

  .page-payment-success .payment-real-qr-image {
    width: min(100%, 220px);
  }

  .page-payment-success .checkout-perk-list {
    display: none !important;
  }

  .page-payment-success .payment-success-meta-grid {
    display: none !important;
  }

  .page-payment-success .payment-mobile-details {
    display: grid;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(230, 91, 71, 0.14);
    background: #fff9f6;
  }

  .page-payment-success .payment-mobile-details[open] {
    gap: 10px;
  }

  .page-payment-success .payment-mobile-details summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    cursor: pointer;
    color: var(--primary-deep);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  .page-payment-success .payment-mobile-details summary::after {
    content: '+';
    color: var(--primary);
    font-size: 0.9rem;
    line-height: 1;
  }

  .page-payment-success .payment-mobile-details[open] summary::after {
    content: '−';
  }

  .page-payment-success .payment-mobile-details-body {
    gap: 8px;
    padding-top: 2px;
  }

  .page-payment-success .payment-mobile-details-row {
    gap: 2px;
    padding-top: 8px;
    border-top: 1px solid rgba(230, 91, 71, 0.1);
  }

  .page-payment-success .payment-mobile-details-row:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .page-payment-success .payment-mobile-details-row span {
    color: var(--text-faint);
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .page-payment-success .payment-mobile-details-row strong {
    color: var(--text);
    font-size: 0.72rem;
    line-height: 1.42;
    word-break: break-word;
  }

  .page-payment-success .payment-addon-card {
    gap: 10px;
    padding: 12px;
    border-radius: 16px;
  }

  .page-payment-success .payment-addon-head strong {
    font-size: 0.78rem;
  }

  .page-payment-success .payment-addon-head span,
  .page-payment-success .payment-addon-item span,
  .page-payment-success .payment-addon-row p {
    font-size: 0.66rem;
  }

  .page-payment-success .payment-addon-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .page-payment-success .payment-addon-item,
  .page-payment-success .payment-addon-row {
    padding: 10px 12px;
    border-radius: 14px;
  }

  .page-payment-success .payment-addon-item strong,
  .page-payment-success .payment-addon-row strong,
  .page-payment-success .payment-addon-price {
    font-size: 0.76rem;
  }

  .page-payment-success .payment-addon-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .page-payment-success .payment-addon-price {
    white-space: normal;
  }

  .header-inner {
    min-height: 68px;
    padding: 10px 0;
    gap: 12px;
  }

  .header-nav {
    display: none;
  }

  .header-actions {
    width: auto;
    margin-left: auto;
    gap: 10px;
  }

  .header-support {
    display: none;
  }

  .brand-copy span {
    display: none;
  }

  .nav-cta {
    min-height: 42px;
    padding: 0 16px;
    border-radius: 12px;
  }

  .store-home {
    gap: 24px;
    padding-top: 0;
  }

  .detail-home {
    gap: 14px;
    padding-top: 8px;
    padding-bottom: 24px;
    justify-items: center;
  }

  .detail-home > :not(.mobile-app-shell):not(.detail-options) {
    display: none !important;
  }

  .rose-reasons,
  .poster-showcase,
  .poster-reasons {
    display: none !important;
  }

  .detail-home + .site-footer {
    display: none;
  }

  .detail-options,
  .detail-options-main,
  .detail-options-grid.detail-options-grid-single {
    width: 100%;
  }

  .detail-options .home-node-shell {
    gap: 12px;
    padding: 8px 6px;
  }

  #packages > .wrap {
    width: calc(100vw - 2px);
    max-width: none;
  }

  .detail-section-head {
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .detail-section-head .button {
    flex: 0 0 auto;
    min-height: 32px;
    padding: 0 9px;
    border-radius: 9px;
    font-size: 0.66rem;
  }

  .detail-section-head .section-title {
    font-size: 0.82rem;
    line-height: 1.18;
  }

  .detail-section-head .section-copy {
    max-width: 11rem;
    font-size: 0.62rem;
    line-height: 1.45;
  }

  .mobile-app-shell {
    display: grid;
    gap: 14px;
    width: min(100%, 404px);
    margin: 0 auto;
    padding: 8px 10px 18px;
    border-radius: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    position: relative;
  }

  .mobile-app-shell > * {
    min-width: 0;
  }

  .mobile-app-brand-wordmark .mobile-app-brand-copy strong {
    color: #d73e35;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.52rem;
    letter-spacing: -0.05em;
  }

  .mobile-app-brand-wordmark .mobile-app-brand-copy small {
    color: #c74f41;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.26em;
  }

  .mobile-app-brand-logo-only {
    align-items: center;
  }

  .mobile-app-brand-image {
    height: 34px;
    max-width: min(160px, 44vw);
  }

  .mobile-app-control {
    min-height: 42px;
    padding: 0 14px;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid rgba(220, 207, 198, 0.8);
    box-shadow: 0 14px 30px rgba(145, 99, 72, 0.12);
    color: #291f1a;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.92rem;
    font-weight: 700;
  }

  .mobile-app-control-flag {
    font-size: 0.98rem;
  }

  .mobile-app-control-dot {
    color: #a18e82;
  }

  .mobile-app-control-menu {
    font-size: 1rem;
  }

  .mobile-app-banner {
    min-height: 0;
    padding: 0;
    border-radius: 20px;
    overflow: hidden;
    background: transparent;
    box-shadow: 0 18px 36px rgba(154, 108, 86, 0.12);
  }

  .mobile-app-banner::before {
    display: none;
  }

  .mobile-app-banner-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .mobile-app-banner-gallery {
    align-items: stretch;
    aspect-ratio: 16 / 9;
  }

  .mobile-app-banner-gallery .mobile-app-banner-image {
    height: 100%;
    object-fit: contain;
  }

  .rose-plan-strip {
    gap: 6px;
    align-items: start;
  }

  .rose-plan-card {
    padding: 9px;
    gap: 8px;
    min-width: 0;
    overflow: hidden;
  }

  .rose-plan-card-head,
  .rose-plan-copy,
  .rose-plan-bottom,
  .rose-plan-price,
  .rose-plan-buy-row,
  .rose-plan-order-row {
    gap: 6px;
  }

  .rose-plan-order-row {
    padding-top: 2px;
  }

  .rose-plan-apps {
    padding: 6px;
  }

  .rose-plan-tag.is-unlimited {
    display: none;
  }

  .rose-plan-apps .support-app-icon {
    width: 20px;
    height: 20px;
    border-radius: 6px;
  }

  .rose-plan-apps .support-app-icon svg {
    width: 16px;
    height: 16px;
  }

  .rose-plan-card strong {
    font-size: 0.76rem;
    line-height: 1.24;
  }

  .rose-plan-price span {
    display: none;
  }

  .rose-plan-price b {
    font-size: 0.88rem;
  }

  .rose-plan-meta-box,
  .rose-plan-quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    gap: 8px;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .rose-plan-meta-box-label,
  .rose-plan-quantity-label {
    font-size: 0.56rem;
    white-space: nowrap;
  }

  .rose-plan-days-box .rose-plan-quantity-controls,
  .rose-plan-quantity-controls {
    width: auto;
    justify-content: flex-end;
  }

  .rose-plan-quantity-step {
    width: 20px;
    height: 20px;
    border-radius: 6px;
  }

  .rose-plan-quantity-input {
    width: 16px;
    font-size: 0.64rem;
  }

  .rose-plan-buy {
    min-height: 34px;
    font-size: 0.72rem;
  }

  .mobile-app-banner-copy {
    gap: 10px;
    margin-top: 0;
    max-width: 11.9rem;
  }

  .mobile-app-banner-copy h2 {
    margin: 0;
    color: #231d1b;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.98rem;
    line-height: 1.08;
    letter-spacing: -0.045em;
  }

  .mobile-app-banner-copy p {
    margin: 0;
    color: #413632;
    font-size: 0.72rem;
    line-height: 1.38;
  }

  .mobile-app-banner-cta {
    min-height: 36px;
    padding: 0 10px 0 8px;
    width: fit-content;
    border-radius: 12px;
    background: linear-gradient(135deg, #f96b5d, #dc453c);
    box-shadow: 0 18px 26px rgba(221, 69, 60, 0.24);
    color: #fff;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .mobile-app-banner-cta-icon,
  .mobile-app-banner-cta-arrow {
    width: 18px;
    height: 18px;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
  }

  .mobile-app-banner-cta-icon {
    background: transparent;
  }

  .mobile-app-banner-cta-arrow {
    width: 18px;
    height: 18px;
    background: transparent;
  }

  .mobile-app-banner-cta svg,
  .mobile-app-feature-icon svg,
  .mobile-app-support-icon svg,
  .mobile-app-note svg,
  .mobile-app-store-mark svg,
  .mobile-app-store-button svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  .mobile-app-feature-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    margin-top: 2px;
    padding: 10px 4px;
    border-radius: 16px;
    background: #ffffff;
    border: 1px solid rgba(233, 220, 213, 0.8);
    box-shadow: 0 18px 40px rgba(154, 108, 86, 0.12);
  }

  .mobile-app-feature-item {
    justify-items: center;
    gap: 6px;
    padding: 0 4px;
    text-align: center;
  }

  .mobile-app-feature-item + .mobile-app-feature-item {
    border-left: 1px solid rgba(238, 227, 221, 0.92);
  }

  .mobile-app-feature-icon {
    width: auto;
    height: auto;
    background: transparent;
    color: #e4544a;
    display: inline-grid;
    place-items: center;
  }

  .mobile-app-feature-item strong {
    color: #261e1a;
    font-size: 0.58rem;
    line-height: 1.16;
  }

  .mobile-app-feature-item small {
    color: #51453f;
    font-size: 0.54rem;
    line-height: 1.16;
  }

  .mobile-app-feature-copy {
    display: grid;
    gap: 2px;
  }

  .mobile-app-offer-head {
    display: grid;
    gap: 2px;
    justify-items: center;
    padding-top: 2px;
    text-align: center;
  }

  .mobile-app-offer-head h2 {
    margin: 0;
    color: #221b18;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    letter-spacing: -0.04em;
  }

  .mobile-app-offer-head p {
    margin: 0;
    color: #76665f;
    font-size: 0.66rem;
  }

  .mobile-app-offer-head p span {
    color: #d7c3ba;
    letter-spacing: -0.1em;
  }

  .mobile-app-plan-picker {
    display: grid;
    gap: 10px;
    padding: 12px;
    border: 1px solid rgba(236, 223, 217, 0.96);
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 14px 32px rgba(154, 108, 86, 0.1);
    min-width: 0;
  }

  .mobile-app-plan-picker > * {
    min-width: 0;
  }

  .mobile-app-plan-slider-head {
    display: grid;
    gap: 2px;
  }

  .mobile-app-plan-slider-copy {
    display: grid;
    gap: 2px;
  }

  .mobile-app-plan-slider-copy small {
    color: #8a776f;
    font-size: 0.54rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .mobile-app-plan-slider-copy strong {
    color: #241d19;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.7rem;
    letter-spacing: -0.04em;
  }

  .mobile-app-type-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .mobile-app-type-chip {
    min-height: 44px;
    padding: 10px 12px;
    border: 1px solid rgba(233, 214, 206, 0.98);
    border-radius: 12px;
    background: #fff8f5;
    color: #755f57;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: none;
  }

  .mobile-app-type-chip span {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.6rem;
    letter-spacing: -0.03em;
    line-height: 1.15;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .mobile-app-type-chip.is-selected {
    border-color: rgba(223, 81, 71, 0.92);
    background: linear-gradient(180deg, #fff3ee, #ffe9e2);
    color: #d8463c;
    box-shadow: 0 10px 18px rgba(223, 81, 71, 0.12);
  }

  .mobile-app-type-chip.is-disabled {
    opacity: 0.55;
  }

  .mobile-app-picker-group {
    display: grid;
    gap: 6px;
    position: relative;
    z-index: 0;
  }

  .mobile-app-picker-group.is-active {
    z-index: 4;
  }

  .mobile-app-picker-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #2a211e;
    font-size: 0.6rem;
    font-weight: 700;
  }

  .mobile-app-picker-head > span {
    min-height: 24px;
    padding: 0 10px;
    border-radius: 999px;
    background: #fff3ee;
    border: 1px solid rgba(223, 81, 71, 0.14);
    color: #df5147;
    display: inline-flex;
    align-items: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .mobile-app-picker-day-entry {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    min-width: auto;
    padding: 0;
  }

  .mobile-app-picker-day-step {
    width: 28px;
    min-height: 28px;
    border: 1px solid rgba(223, 81, 71, 0.22);
    border-radius: 8px;
    background: #fff7f3;
    color: #dd4a40;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  .mobile-app-picker-day-step:active {
    transform: translateY(1px);
  }

  .mobile-app-picker-day-input {
    width: 38px;
    min-height: 28px;
    padding: 0 5px;
    border: 1px solid rgba(223, 81, 71, 0.28);
    border-radius: 8px;
    background: #fff;
    color: #2a211e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
    text-align: center;
    outline: none;
    box-shadow: inset 0 1px 2px rgba(42, 33, 30, 0.06);
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .mobile-app-picker-day-input:focus {
    border-color: rgba(223, 81, 71, 0.56);
    box-shadow:
      0 0 0 3px rgba(239, 95, 82, 0.14),
      inset 0 1px 2px rgba(42, 33, 30, 0.06);
  }

  .mobile-app-picker-day-input::selection {
    background: rgba(239, 95, 82, 0.18);
  }

  .mobile-app-picker-day-input::-webkit-outer-spin-button,
  .mobile-app-picker-day-input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  .mobile-app-picker-day-unit {
    color: #dd4a40;
    font-size: 0.58rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .mobile-app-picker-note {
    color: #816e66;
    font-size: 0.56rem;
    line-height: 1.42;
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff8f5;
    border: 1px solid rgba(238, 227, 221, 0.92);
  }

  .mobile-app-day-shortcuts {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
  }

  .mobile-app-day-scale {
    position: relative;
    height: 12px;
    margin-top: -1px;
  }

  .mobile-app-day-scale-mark {
    position: absolute;
    top: 0;
    left: var(--day-mark-progress);
    color: #8a776f;
    font-size: 0.52rem;
    font-weight: 700;
    line-height: 1;
    transform: translateX(-50%);
    white-space: nowrap;
    pointer-events: none;
  }

  .mobile-app-day-scale-mark:first-child {
    transform: translateX(0);
  }

  .mobile-app-day-scale-mark:last-child {
    transform: translateX(-100%);
  }

  .mobile-app-day-shortcut {
    min-height: 28px;
    padding: 0 6px;
    border: 1px solid rgba(223, 81, 71, 0.16);
    border-radius: 999px;
    background: #fff7f3;
    color: #7a665f;
    font-size: 0.54rem;
    font-weight: 700;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-app-day-shortcut.is-selected {
    border-color: rgba(223, 81, 71, 0.28);
    background: linear-gradient(180deg, #fff0ea, #ffe5dc);
    color: #dd4a40;
  }

  .mobile-app-picker-range-shell {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 38px;
    padding: 0 10px;
    border: 1px solid rgba(223, 81, 71, 0.14);
    border-radius: 999px;
    background: linear-gradient(180deg, #fffdfb, #fff7f3);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92),
      0 6px 16px rgba(223, 81, 71, 0.08);
    --range-progress: 50%;
    overflow: visible;
  }

  .mobile-app-picker-range-bubble {
    position: absolute;
    left: var(--range-progress);
    bottom: calc(100% + 8px);
    min-width: 30px;
    height: 24px;
    padding: 0 8px;
    border-radius: 999px;
    background: linear-gradient(135deg, #ef5f52, #dd453c);
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    transform: translateX(-50%) translateY(6px) scale(0.94);
    box-shadow: 0 8px 18px rgba(223, 81, 71, 0.18);
    pointer-events: none;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      visibility 0.18s ease;
  }

  .mobile-app-picker-range-bubble::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 8px;
    height: 8px;
    background: #dd453c;
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 2px;
  }

  .mobile-app-picker-range-bubble.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0) scale(1);
  }

  .mobile-app-picker-range-shell-data .mobile-app-picker-range-bubble {
    min-width: 46px;
    padding: 0 10px;
    font-size: 0.56rem;
  }

  .mobile-app-picker-range-visual {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 8px;
    border-radius: 999px;
    background: #f2ddd7;
    overflow: hidden;
    pointer-events: none;
  }

  .mobile-app-picker-range-fill {
    display: block;
    width: var(--range-progress);
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #ef5f52, #dd453c);
    box-shadow: 0 0 12px rgba(239, 95, 82, 0.24);
  }

  .mobile-app-picker-range {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: auto;
    height: 36px;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
    touch-action: manipulation;
  }

  .mobile-app-picker-range::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 999px;
    background: transparent;
  }

  .mobile-app-picker-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    margin-top: -7px;
    border: 4px solid #fff;
    border-radius: 50%;
    background: linear-gradient(135deg, #f76b5d, #dd453c);
    box-shadow: 0 10px 20px rgba(239, 95, 82, 0.24);
  }

  .mobile-app-picker-range::-moz-range-track {
    height: 8px;
    border-radius: 999px;
    background: transparent;
  }

  .mobile-app-picker-range::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border: 4px solid #fff;
    border-radius: 50%;
    background: linear-gradient(135deg, #f76b5d, #dd453c);
    box-shadow: 0 10px 20px rgba(239, 95, 82, 0.24);
  }

  .mobile-app-data-scale {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .mobile-app-data-scale span {
    min-height: 30px;
    padding: 6px 6px;
    border-radius: 9px;
    background: #fff7f3;
    color: #7a665f;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.54rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-app-data-scale span.is-selected {
    background: linear-gradient(180deg, #fff0ea, #ffe5dc);
    color: #dd4a40;
  }

  .mobile-app-plan-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(52px, 1fr));
    gap: 6px;
  }

  .mobile-app-plan-step {
    appearance: none;
    -webkit-appearance: none;
    min-height: 30px;
    padding: 0 0 3px;
    border: none;
    border-radius: 0;
    background: transparent;
    color: #6f5e57;
    display: grid;
    gap: 3px;
    justify-items: center;
    text-align: center;
    box-shadow: none;
    cursor: pointer;
  }

  .mobile-app-plan-step::before {
    content: '';
    width: 100%;
    height: 4px;
    border-radius: 999px;
    background: #f2e2db;
    display: block;
  }

  .mobile-app-plan-step span {
    color: inherit;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.58rem;
    letter-spacing: -0.04em;
    line-height: 1.1;
  }

  .mobile-app-plan-step small {
    color: inherit;
    font-size: 0.5rem;
    line-height: 1.18;
  }

  .mobile-app-plan-step.is-selected {
    color: #df5147;
  }

  .mobile-app-plan-step.is-selected::before {
    background: linear-gradient(135deg, #f76b5d, #dd453c);
    box-shadow: 0 6px 16px rgba(239, 95, 82, 0.22);
  }

  .mobile-app-plan-focus {
    display: grid;
    gap: 10px;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .mobile-app-plan-metrics {
    display: grid;
    grid-template-columns: 0.92fr 0.92fr 1.16fr;
    gap: 8px;
  }

  .mobile-app-plan-stat {
    min-height: 54px;
    padding: 9px 8px;
    border: 1px solid rgba(236, 223, 217, 0.96);
    border-radius: 12px;
    background: #fffdfa;
    display: grid;
    gap: 3px;
  }

  .mobile-app-plan-stat span {
    color: #8a776f;
    font-size: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mobile-app-plan-stat strong {
    color: #241d19;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: -0.04em;
    line-height: 1.14;
  }

  .mobile-app-plan-stat.is-price strong {
    color: #de4d43;
    font-size: 0.78rem;
  }

  .mobile-app-plan-focus-copy {
    display: grid;
    gap: 4px;
  }

  .mobile-app-plan-focus-copy strong {
    color: #231c18;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .mobile-app-plan-focus-meta {
    margin: 0;
    color: #6f5f58;
    font-size: 0.56rem;
    line-height: 1.38;
  }

  .mobile-app-plan-focus-note {
    color: #7a6760;
    font-size: 0.54rem;
    line-height: 1.42;
  }

  .mobile-app-plan-focus-note code {
    padding: 0 4px;
    border-radius: 6px;
    background: #fff4ef;
    color: #d74d43;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.52rem;
  }

  .mobile-app-variant-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .mobile-app-variant-chip {
    appearance: none;
    -webkit-appearance: none;
    min-height: 30px;
    width: 100%;
    padding: 0 8px;
    border: 1px solid rgba(236, 223, 217, 0.96);
    border-radius: 10px;
    background: #fffaf8;
    color: #6d5c55;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: none;
    cursor: pointer;
  }

  .mobile-app-variant-chip span {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.54rem;
    letter-spacing: -0.03em;
    line-height: 1.16;
  }

  .mobile-app-variant-chip.is-selected {
    border-color: rgba(236, 89, 78, 0.94);
    background: linear-gradient(180deg, #fff4ef, #fff0eb);
    color: #df5147;
    box-shadow: 0 8px 16px rgba(236, 89, 78, 0.1);
  }

  .mobile-app-picker-catalog {
    display: none;
  }

  .mobile-app-plan-focus-cta {
    width: 100%;
    min-height: 36px;
    padding: 0 12px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f66456, #dd453c);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.66rem;
    font-weight: 700;
  }

  .internal-pricing-board {
    display: grid;
    gap: 10px;
    margin-top: 14px;
    padding: 14px 12px;
    border: 1px solid rgba(236, 223, 217, 0.96);
    border-radius: 18px;
    background: linear-gradient(180deg, #fffdfb, #fff7f3);
    box-shadow: 0 14px 28px rgba(165, 120, 98, 0.1);
  }

  .internal-pricing-head {
    display: grid;
    gap: 4px;
  }

  .internal-pricing-head small {
    color: #d85146;
    font-size: 0.54rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .internal-pricing-head strong {
    color: #221b18;
    font-size: 0.78rem;
    line-height: 1.2;
  }

  .internal-pricing-head p {
    margin: 0;
    color: #786660;
    font-size: 0.58rem;
    line-height: 1.45;
  }

  .internal-pricing-ranges,
  .internal-pricing-grid {
    display: grid;
    gap: 8px;
  }

  .internal-pricing-range,
  .internal-pricing-card {
    display: grid;
    gap: 6px;
    padding: 10px;
    border: 1px solid rgba(236, 223, 217, 0.96);
    border-radius: 14px;
    background: #fffdfa;
  }

  .internal-pricing-range strong,
  .internal-pricing-card-head strong {
    color: #231c18;
    font-size: 0.68rem;
    line-height: 1.25;
  }

  .internal-pricing-range span,
  .internal-pricing-card-head span {
    color: #dd4a40;
    font-size: 0.52rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .internal-pricing-range small,
  .internal-pricing-card-head small {
    color: #7c6a63;
    font-size: 0.54rem;
    line-height: 1.35;
  }

  .internal-pricing-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px 8px;
    margin: 0;
  }

  .internal-pricing-stats div {
    display: grid;
    gap: 2px;
    padding: 8px 9px;
    border-radius: 10px;
    background: #fff7f3;
  }

  .internal-pricing-stats dt {
    color: #88766e;
    font-size: 0.48rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .internal-pricing-stats dd {
    margin: 0;
    color: #241d19;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.64rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .internal-pricing-board-review {
    background: linear-gradient(180deg, #fff8f4, #fff2eb);
    border-color: rgba(237, 206, 193, 0.98);
  }

  .internal-pricing-head-review strong {
    font-size: 0.82rem;
  }

  .internal-pricing-grid-review {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .internal-pricing-card-review {
    background: rgba(255, 255, 255, 0.96);
    border-color: rgba(233, 207, 196, 0.98);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.9);
  }

  .internal-pricing-stats-review div.is-accent {
    background: linear-gradient(180deg, #fff0e8, #ffe6db);
    border: 1px solid rgba(231, 137, 108, 0.24);
  }

  .internal-pricing-stats-review div.is-accent dt,
  .internal-pricing-stats-review div.is-accent dd {
    color: #b43b26;
  }

  .mobile-app-plan-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 7px;
    align-items: stretch;
  }

  .mobile-app-plan-card {
    position: relative;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    align-content: stretch;
    gap: 8px;
    padding: 8px 6px 8px;
    border-radius: 14px;
    border: 1px solid rgba(237, 225, 219, 0.92);
    background: #ffffff;
    box-shadow: 0 10px 22px rgba(154, 108, 86, 0.08);
    color: #251d1a;
    height: 100%;
  }

  .mobile-app-plan-card.is-featured,
  .mobile-app-plan-card.is-selected {
    border-color: rgba(236, 89, 78, 0.94);
    box-shadow: 0 0 0 1px rgba(236, 89, 78, 0.12), 0 12px 22px rgba(236, 89, 78, 0.1);
  }

  .mobile-app-plan-headbar,
  .mobile-app-plan-headline {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 4px;
    min-height: 32px;
  }

  .mobile-app-plan-headbar {
    min-height: 40px;
    margin: -8px -6px 0;
    padding: 8px 6px 5px;
    border-radius: 12px 12px 10px 10px;
    background: linear-gradient(135deg, #f87364, #e44c41);
    color: #fff;
  }

  .mobile-app-plan-headbar strong,
  .mobile-app-plan-headline strong {
    font-family: 'Plus Jakarta Sans', sans-serif;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .mobile-app-plan-headbar strong {
    color: #ffffff;
    font-size: 0.9rem;
  }

  .mobile-app-plan-headbar span {
    color: rgba(255, 255, 255, 0.92);
    font-size: 0.52rem;
    font-weight: 600;
    transform: translateY(-2px);
  }

  .mobile-app-plan-headline {
    justify-items: center;
    text-align: center;
  }

  .mobile-app-plan-headline strong {
    color: #1f1a18;
    font-size: 0.9rem;
  }

  .mobile-app-plan-headline span {
    color: #4c3f39;
    font-size: 0.52rem;
    font-weight: 600;
    transform: translateY(-1px);
  }

  .mobile-app-plan-copy em {
    min-height: 24px;
    padding: 0 8px;
    border-radius: 999px;
    background: linear-gradient(180deg, #fff2ef, #fff9f7);
    color: #342926;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.58rem;
    font-style: normal;
    font-weight: 700;
  }

  .mobile-app-plan-kicker {
    color: #7e6d66;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.32;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    text-align: left;
  }

  .mobile-app-plan-copy {
    display: grid;
    grid-template-rows: auto auto auto minmax(24px, 1fr);
    align-content: start;
    justify-items: center;
    gap: 6px;
    height: 100%;
  }

  .mobile-app-plan-copy p {
    margin: 0;
    color: #463834;
    font-size: 0.54rem;
    font-weight: 500;
    text-align: center;
    min-height: 1.4em;
  }

  .mobile-app-plan-foot {
    color: #6e5f58;
    font-size: 0.49rem;
    line-height: 1.2;
    text-align: center;
    min-height: 2.2em;
    display: block;
    max-width: 7.5ch;
  }

  .mobile-app-plan-side {
    justify-items: stretch;
    gap: 8px;
    align-content: end;
  }

  .mobile-app-plan-price {
    color: #d23e36;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-align: center;
  }

  .mobile-app-plan-cta {
    min-height: 28px;
    padding: 0 8px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f66456, #dd453c);
    box-shadow: 0 12px 18px rgba(221, 69, 60, 0.2);
    color: #fff;
    font-size: 0.58rem;
    font-weight: 700;
  }

  .mobile-app-note {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 2px 0 0;
    color: #c84d41;
    text-align: center;
    font-size: 0.94rem;
    font-weight: 600;
  }

  .mobile-app-note span {
    color: #f58b4f;
  }

  .mobile-app-support-strip {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    padding: 12px 8px;
    border-radius: 16px;
    border: 1px solid rgba(235, 224, 218, 0.92);
    background: #ffffff;
    box-shadow: 0 16px 34px rgba(154, 108, 86, 0.1);
  }

  .mobile-app-support-item {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    padding: 0 8px;
  }

  .mobile-app-support-item + .mobile-app-support-item {
    border-left: 1px solid rgba(238, 227, 221, 0.92);
  }

  .mobile-app-support-icon {
    width: auto;
    height: auto;
    background: transparent;
    color: #d54b42;
    display: inline-grid;
    place-items: center;
  }

  .mobile-app-support-item strong {
    color: #281f1b;
    font-size: 0.76rem;
    line-height: 1.16;
  }

  .mobile-app-support-item small {
    color: #62534d;
    font-size: 0.72rem;
    line-height: 1.16;
  }

  .mobile-app-cta-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    padding: 18px 16px;
    border-radius: 16px;
    border: 1px solid rgba(235, 224, 218, 0.92);
    background: #ffffff;
    box-shadow: 0 18px 36px rgba(154, 108, 86, 0.12);
  }

  .mobile-app-store-head,
  .mobile-app-store-copy {
    display: grid;
  }

  .mobile-app-store-head {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .mobile-app-store-mark {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #fff0eb, #ffffff);
    border: 1px solid rgba(236, 223, 217, 0.96);
    color: #df4c42;
    display: inline-grid;
    place-items: center;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
  }

  .mobile-app-store-copy {
    gap: 4px;
  }

  .mobile-app-store-copy strong {
    color: #281f1b;
    font-size: 1.02rem;
  }

  .mobile-app-store-copy p {
    margin: 0;
    color: #b98b3f;
    font-size: 0.86rem;
  }

  .mobile-app-store-button {
    min-height: 46px;
    padding: 0 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f66456, #dd453c);
    box-shadow: 0 16px 22px rgba(221, 69, 60, 0.22);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.92rem;
    font-weight: 700;
  }

  .store-title,
  .page-title {
    max-width: 100%;
    font-size: clamp(1.72rem, 8vw, 2.45rem);
  }

  .page-checkout .checkout-title {
    max-width: none;
    font-size: 1.34rem;
    line-height: 1.14;
  }

  .detail-hero {
    display: none;
  }

  .detail-poster {
    padding: 0;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .detail-breadcrumb {
    display: none;
  }

  .detail-poster-card {
    min-height: 360px;
    margin-top: 0;
    border-radius: 0 0 24px 24px;
  }

  .detail-poster-device {
    width: 168px;
    margin-top: 34px;
    margin-bottom: 14px;
  }

  .detail-options {
    padding-top: 2px;
  }

  .detail-options-main {
    display: block;
  }

  .detail-choice-box,
  .detail-order-card,
  .detail-info-card,
  .detail-faq-item,
  .detail-review-card,
  .detail-step-card {
    padding: 18px;
    border-color: rgba(235, 224, 218, 0.92);
    background: #ffffff;
    box-shadow: 0 18px 34px rgba(154, 108, 86, 0.12);
  }

  .detail-order-card,
  .detail-info-card,
  .detail-review-card,
  .detail-step-card,
  .detail-faq-item {
    color: var(--text);
  }

  .store-order-card,
  .info-panel,
  .plan-summary,
  .spec-card,
  .article-aside,
  .article-content,
  .product-card {
    padding: 18px;
  }

  .article-related-grid {
    grid-template-columns: 1fr;
  }

  .detail-section-head .section-kicker,
  .detail-section-head .section-title,
  .detail-section-head .section-copy,
  .detail-review-summary strong,
  .detail-faq-item strong,
  .detail-step-card strong,
  .detail-info-row strong,
  .detail-review-top strong,
  .detail-order-selected b,
  .detail-order-price span,
  .detail-order-steps span,
  .detail-review-summary .detail-rating-score {
    color: var(--text);
  }

  .detail-section-head .section-copy,
  .detail-review-summary span:last-child,
  .detail-review-top small,
  .detail-review-card p,
  .detail-info-row p,
  .detail-step-card p,
  .detail-faq-item p,
  .detail-order-selected p,
  .store-order-note,
  .status,
  label,
  .detail-order-price span {
    color: var(--text-soft);
  }

  .detail-section-head .section-title {
    color: var(--text);
  }

  .detail-order-price strong,
  .detail-plan-price strong,
  .detail-price-main strong,
  .mobile-buy-copy strong {
    color: var(--primary);
  }

  .detail-order-selected,
  .detail-include-item {
    border-color: rgba(235, 224, 218, 0.92);
    background: #fff8f4;
    color: var(--text);
  }

  .detail-order-steps span {
    border-color: rgba(235, 224, 218, 0.92);
    background: #fff8f4;
    color: var(--text-soft);
  }

  .detail-review-top span,
  .detail-step-card span {
    background: rgba(246, 100, 86, 0.12);
    color: var(--primary);
  }

  .detail-rating-score {
    background: linear-gradient(135deg, #ef6456, #dd453c);
  }

  .detail-section-head {
    margin-bottom: 14px;
  }

  .detail-review-summary {
    margin-bottom: 12px;
  }

  .detail-order-card input,
  .detail-order-card select,
  .detail-order-card textarea {
    border-color: rgba(235, 224, 218, 0.92);
    background: #fffdfa;
    color: var(--text);
  }

  .detail-order-card input::placeholder {
    color: var(--text-faint);
  }

  .detail-info-row {
    border-color: rgba(235, 224, 218, 0.92);
  }

  .site-footer {
    margin-top: 12px;
    border-top-color: rgba(235, 224, 218, 0.92);
    background: transparent;
  }

  .site-footer strong,
  .footer-links a,
  .footer-contact a {
    color: var(--text);
  }

  .site-footer p {
    color: var(--text-soft);
  }

  .store-order-grid,
  .detail-options-grid,
  .detail-meta-grid,
  .detail-order-grid,
  .detail-plan-grid,
  .detail-review-grid,
  .detail-step-grid,
  .store-journey-grid,
  .store-feature-band,
  .store-product-grid,
  .store-product-stats,
  .products-grid {
    grid-template-columns: 1fr;
  }

  .mobile-buy-bar {
    display: flex;
    right: 12px;
    bottom: 12px;
    left: 12px;
    padding: 10px 10px 10px 14px;
    border-radius: 14px;
    gap: 10px;
    border-color: rgba(235, 224, 218, 0.92);
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 16px 36px rgba(154, 108, 86, 0.16);
  }

  .mobile-buy-copy strong {
    font-size: 0.98rem;
  }

  .mobile-buy-copy small {
    color: var(--text-faint);
  }

  .mobile-buy-button {
    min-width: 92px;
    min-height: 44px;
    padding: 0 16px;
    background: linear-gradient(135deg, #ffb96b 0%, #ff8a45 100%);
  }

  .market-tab-row {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .market-tab-row::-webkit-scrollbar {
    display: none;
  }

  .market-tab {
    flex: 0 0 auto;
  }

  .footer-inner {
    gap: 16px;
  }

  .footer-brand,
  .footer-meta {
    gap: 12px;
  }

  .site-footer {
    padding: 22px 0 28px;
  }

  .site-footer strong {
    font-size: 0.96rem;
  }

  .site-footer p {
    margin: 6px 0 0;
    max-width: none;
    font-size: 0.82rem;
    line-height: 1.62;
  }

  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 14px;
    width: 100%;
  }

  .footer-contact {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid rgba(235, 224, 218, 0.92);
  }

  .footer-links a,
  .footer-contact a {
    font-size: 0.84rem;
    line-height: 1.4;
  }
}

.page-admin {
  background:
    linear-gradient(180deg, rgba(18, 26, 38, 0.03), transparent 160px),
    #f3f1ee;
}

.page-admin .section-kicker,
.page-admin .admin-sidebar-kicker {
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}

.page-admin .button {
  min-height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 0.84rem;
  box-shadow: none;
}

.page-admin input,
.page-admin select,
.page-admin textarea {
  min-height: 34px;
  padding: 0 10px;
  border-radius: 7px;
  border-color: #d8d2cb;
  background: #fff;
  font-size: 0.84rem;
}

.page-admin textarea {
  min-height: 64px;
  padding: 10px 12px;
}

.admin-login-main {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
}

.admin-login-shell {
  width: min(100%, 520px);
}

.admin-login-card,
.admin-sidebar,
.admin-surface,
.admin-metric-pill {
  border: 1px solid #ddd5ce;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 8px 18px rgba(63, 42, 28, 0.035);
}

.admin-login-card {
  display: grid;
  gap: 12px;
  padding: 20px;
}

.admin-login-copy {
  display: grid;
  gap: 8px;
}

.admin-login-copy h1,
.admin-appbar-copy h1,
.admin-toolbar-copy h1,
.admin-surface-head h2,
.admin-stage-head h2,
.admin-command-head h2,
.admin-hero-panel-head h2 {
  margin: 0;
  font-size: clamp(0.96rem, 1.1vw, 1.22rem);
  line-height: 1.16;
  letter-spacing: -0.01em;
}

.admin-login-copy p,
.admin-appbar-copy p,
.admin-toolbar-copy p,
.admin-sidebar-brand p,
.admin-surface-head p,
.admin-stage-head p,
.admin-command-head p,
.admin-pricing-toolbar-copy p,
.admin-empty-state,
.admin-flash p {
  margin: 0;
  color: #72645a;
  font-size: 0.8rem;
  line-height: 1.45;
}

.admin-login-form {
  display: grid;
  gap: 14px;
}

.admin-login-form button {
  width: 100%;
}

.admin-login-disabled,
.admin-empty-state,
.admin-flash {
  display: grid;
  gap: 4px;
  padding: 10px 11px;
  border-radius: 10px;
  border: 1px solid #ddd5ce;
  background: #faf6f2;
}

.admin-login-disabled strong,
.admin-flash strong,
.admin-empty-state {
  color: #201816;
  font-weight: 700;
}

.admin-login-links,
.admin-toolbar-actions,
.admin-sidebar-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.admin-login-links a,
.admin-sidebar-links a,
.admin-cell-actions a {
  color: #b44423;
  font-weight: 700;
}

.admin-main {
  padding: 18px 0 34px;
}

.admin-shell-grid {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.admin-sidebar {
  position: sticky;
  top: 12px;
  display: grid;
  gap: 14px;
  padding: 16px 14px;
  background:
    radial-gradient(circle at top left, rgba(255, 243, 233, 0.96), rgba(255, 255, 255, 0.96) 58%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(251, 248, 244, 0.96));
}

.admin-sidebar-brand,
.admin-appbar-copy,
.admin-stage-head > div,
.admin-surface-head > div,
.admin-command-head,
.admin-pricing-toolbar-copy,
.admin-hero-panel-head > div {
  display: grid;
  gap: 8px;
}

.admin-sidebar-kicker {
  color: #b44423;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.admin-sidebar-brand strong {
  font-size: 1.04rem;
  line-height: 1.12;
}

.admin-sidebar-nav {
  display: grid;
  gap: 6px;
}

.admin-sidebar-nav a {
  min-height: 34px;
  padding: 0 11px;
  border-radius: 10px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #2e231e;
  font-weight: 700;
  font-size: 0.84rem;
  background: rgba(255, 255, 255, 0.45);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
}

.admin-sidebar-nav a:hover {
  transform: translateX(2px);
  border-color: rgba(180, 68, 35, 0.18);
  background: #fff5ee;
  color: #b44423;
}

.admin-sidebar-nav a span {
  min-width: 28px;
  padding: 2px 7px;
  border-radius: 999px;
  background: #f3eae4;
  color: #6f5f55;
  font-size: 0.66rem;
  text-align: center;
}

.admin-sidebar-stack {
  display: grid;
  gap: 8px;
}

.admin-sidebar-mini {
  display: grid;
  gap: 4px;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid #e8ddd4;
  background: rgba(255, 255, 255, 0.74);
}

.admin-sidebar-mini span {
  color: #7e6f65;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.admin-sidebar-mini strong {
  color: #211916;
  font-size: 0.84rem;
  line-height: 1.35;
}

.admin-sidebar-mini small {
  color: #76685f;
  font-size: 0.71rem;
  line-height: 1.4;
}

.admin-workspace {
  display: grid;
  gap: 16px;
}

.admin-appbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.admin-appbar-copy {
  gap: 6px;
}

.admin-appbar-actions,
.admin-sidebar-links,
.admin-pricing-toolbar-actions,
.admin-command-links,
.admin-surface-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.admin-appbar-actions {
  justify-content: flex-end;
}

.admin-sidebar-links a,
.admin-cell-actions a {
  color: #b44423;
  font-weight: 700;
}

.admin-overview-grid,
.admin-stage,
.admin-surface-list {
  display: grid;
  gap: 14px;
}

.admin-tab-panel[hidden] {
  display: none !important;
}

.admin-tab-panel {
  display: grid;
  gap: 14px;
}

.admin-tab-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.admin-tab-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #e6dbd2;
  background: rgba(255, 255, 255, 0.78);
  color: #6d5f56;
  font-size: 0.78rem;
  font-weight: 700;
  transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease;
}

.admin-tab-chip:hover,
.admin-tab-chip.is-active,
.admin-sidebar-nav a.is-active {
  transform: translateY(-1px);
  border-color: rgba(180, 68, 35, 0.22);
  background: linear-gradient(180deg, #fff4ed, #fff8f4);
  color: #a53a1c;
}

.admin-overview-grid {
  grid-template-columns: minmax(0, 1.28fr) minmax(320px, 0.92fr);
  align-items: start;
}

.admin-settings-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 14px;
  align-items: start;
}

.admin-settings-form,
.admin-settings-preview {
  padding: 18px;
}

.admin-settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.admin-settings-field {
  display: grid;
  gap: 6px;
}

.admin-settings-field-wide {
  grid-column: 1 / -1;
}

.admin-settings-field span {
  color: #6d5f56;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.admin-settings-field input,
.admin-settings-field textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #e6dbd2;
  background: rgba(255, 255, 255, 0.92);
  color: #1f1714;
  font: inherit;
  resize: vertical;
}

.admin-settings-field small {
  color: #7a6a61;
  font-size: 0.72rem;
  line-height: 1.45;
}

.admin-settings-asset-tools {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.admin-settings-asset-thumb {
  min-height: 88px;
  border-radius: 16px;
  border: 1px dashed #e1d2c7;
  background: linear-gradient(180deg, rgba(255, 250, 247, 0.98), rgba(255, 244, 238, 0.88));
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 8px;
}

.admin-settings-asset-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.admin-settings-asset-tools-gallery {
  grid-template-columns: minmax(0, 1fr);
}

.admin-settings-asset-thumb-gallery {
  min-height: 112px;
  grid-template-columns: repeat(auto-fill, minmax(86px, 1fr));
  gap: 8px;
  place-items: stretch;
}

.admin-settings-asset-thumb-gallery img {
  min-height: 86px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(225, 210, 199, 0.7);
}

.admin-settings-asset-thumb span {
  color: #8a7367;
  font-size: 0.72rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.45;
}

.admin-settings-asset-actions {
  display: grid;
  gap: 8px;
  align-content: start;
}

.admin-settings-upload-button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 42px;
  overflow: hidden;
}

.admin-settings-upload-button input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.admin-settings-upload-button.is-disabled {
  opacity: 0.58;
  pointer-events: none;
}

.admin-settings-upload-button.is-busy {
  opacity: 0.72;
}

.admin-settings-asset-actions small {
  margin: 0;
}

.admin-settings-asset-actions small[data-tone='success'] {
  color: #1d7a4d;
}

.admin-settings-asset-actions small[data-tone='error'] {
  color: #b7392b;
}

.admin-settings-asset-actions small[data-tone='loading'] {
  color: #a35b1d;
}

.admin-settings-preview {
  display: grid;
  gap: 12px;
}

.admin-settings-preview-card,
.admin-settings-preview-meta {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #eadfd5;
  background: rgba(255, 255, 255, 0.82);
}

.admin-settings-preview-card {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
}

.admin-settings-logo,
.admin-settings-logo-fallback {
  width: 56px;
  height: 56px;
  border-radius: 16px;
}

.admin-settings-logo {
  object-fit: contain;
  display: block;
  border: 1px solid #ebddd2;
  background: #fff;
  padding: 4px;
}

.admin-settings-logo-fallback {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #d04e28 0%, #8f2f18 100%);
  box-shadow: 0 14px 28px rgba(197, 65, 28, 0.18);
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 800;
}

.admin-settings-preview-copy {
  display: grid;
  gap: 4px;
}

.admin-settings-preview-copy strong,
.admin-settings-preview-meta strong {
  color: #1f1714;
  font-size: 0.9rem;
  line-height: 1.45;
}

.admin-settings-preview-copy p,
.admin-settings-preview-copy small {
  margin: 0;
  color: #6d5f56;
  line-height: 1.5;
}

.admin-settings-preview-meta span {
  color: #8b7366;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.admin-hero-panel,
.admin-command-panel {
  padding: 18px;
}

.admin-hero-panel {
  background:
    radial-gradient(circle at top right, rgba(255, 240, 231, 0.95), rgba(255, 255, 255, 0.96) 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(251, 248, 244, 0.98));
}

.admin-hero-panel-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.admin-hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.admin-hero-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid #ebddd2;
  color: #705f55;
  font-size: 0.72rem;
  font-weight: 700;
}

.admin-glance-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.admin-metric-pill {
  display: grid;
  gap: 6px;
  min-height: 92px;
  padding: 13px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.88);
}

.admin-metric-pill span {
  color: #7b6e64;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.admin-metric-pill strong {
  color: #1f1714;
  font-size: 0.96rem;
  line-height: 1.3;
  font-weight: 800;
}

.admin-brief-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.admin-brief-card {
  display: grid;
  gap: 6px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #eaded4;
  background: rgba(255, 255, 255, 0.76);
}

.admin-brief-card strong {
  color: #211916;
  font-size: 0.9rem;
  line-height: 1.3;
}

.admin-brief-card p {
  margin: 0;
  color: #6d5f56;
  font-size: 0.77rem;
  line-height: 1.5;
}

.admin-command-panel {
  gap: 14px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 250, 255, 0.98)),
    radial-gradient(circle at top left, rgba(232, 240, 255, 0.72), transparent 50%);
}

.admin-command-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.admin-command-stat {
  display: grid;
  gap: 5px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #dfe7f2;
  background: rgba(255, 255, 255, 0.84);
}

.admin-command-stat span {
  color: #6e7481;
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.admin-command-stat strong {
  color: #162033;
  font-size: 1rem;
  line-height: 1.2;
}

.admin-command-stat small {
  color: #647084;
  font-size: 0.72rem;
  line-height: 1.45;
}

.admin-command-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.admin-command-links .button {
  width: 100%;
}

.admin-stage-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
}

.admin-stage-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}

.admin-stage-pricing {
  gap: 14px;
}

.admin-flash-success {
  background: #edf8f0;
  border-color: rgba(71, 149, 95, 0.22);
}

.admin-flash-error {
  background: #fff2ed;
  border-color: rgba(197, 65, 28, 0.18);
}

.admin-flash-info {
  background: #eef3ff;
  border-color: rgba(76, 104, 173, 0.18);
}

.admin-surface {
  display: grid;
  gap: 12px;
  padding: 16px;
  min-width: 0;
}

.admin-panel {
  align-content: start;
}

.admin-surface-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: start;
}

.admin-surface-head > strong {
  white-space: nowrap;
  color: #231a17;
  font-size: 0.8rem;
  font-weight: 700;
}

.admin-search-field,
.admin-bulk-field {
  display: grid;
  gap: 4px;
  color: #6d5f56;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.admin-search-field {
  min-width: min(100%, 320px);
}

.admin-search-field input {
  min-height: 40px;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 0.83rem;
  font-weight: 600;
}

.admin-operations-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.05fr) minmax(0, 0.9fr);
  gap: 12px;
  align-items: start;
}

.admin-panel-scroll {
  display: grid;
  gap: 10px;
  max-height: 760px;
  overflow: auto;
  padding-right: 4px;
}

.admin-panel-scroll::-webkit-scrollbar,
.admin-table-wrap::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.admin-panel-scroll::-webkit-scrollbar-thumb,
.admin-table-wrap::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(136, 117, 104, 0.24);
}

.admin-pricing-shell {
  gap: 14px;
  padding: 18px;
}

.admin-pricing-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: start;
}

.admin-pricing-empty {
  margin-top: -2px;
}

.admin-bulk-form,
.admin-surface-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-bulk-form {
  width: 100%;
  flex-wrap: wrap;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #e6ddd6;
  background: #faf7f3;
}

.admin-bulk-form-compact {
  width: auto;
  flex: 1 1 520px;
  justify-content: flex-end;
  padding: 0;
  border: none;
  background: transparent;
}

.admin-bulk-form-compact .admin-bulk-copy {
  min-width: 150px;
  margin-right: 0;
}

.admin-bulk-form-compact .admin-bulk-copy strong {
  font-size: 0.76rem;
}

.admin-bulk-form-compact .admin-bulk-copy span {
  font-size: 0.68rem;
}

.admin-bulk-copy {
  display: grid;
  gap: 2px;
  margin-right: auto;
}

.admin-bulk-copy strong {
  color: #1f1714;
  font-size: 0.82rem;
  font-weight: 700;
}

.admin-bulk-copy span {
  color: #75685f;
  font-size: 0.72rem;
}

.admin-bulk-field select,
.admin-bulk-field input {
  min-height: 38px;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 0.82rem;
  font-weight: 600;
}

.admin-bulk-field-scope {
  width: 190px;
}

.admin-bulk-field-slider {
  flex: 1 1 280px;
  min-width: 220px;
}

.admin-bulk-form-compact .admin-bulk-field-slider {
  flex: 0 1 220px;
  min-width: 180px;
}

.admin-bulk-slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-bulk-slider-row input[type='range'] {
  min-height: auto;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: linear-gradient(90deg, #b44423 0%, #b44423 var(--bulk-progress, 0%), #eadfd6 var(--bulk-progress, 0%), #eadfd6 100%);
  box-shadow: none;
  appearance: none;
  height: 6px;
}

.admin-bulk-slider-row input[type='range']:focus {
  outline: none;
}

.admin-bulk-slider-row input[type='range']::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #b44423;
  box-shadow: 0 2px 6px rgba(111, 45, 22, 0.24);
  appearance: none;
}

.admin-bulk-slider-row input[type='range']::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: transparent;
}

.admin-bulk-slider-row input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #b44423;
  box-shadow: 0 2px 6px rgba(111, 45, 22, 0.24);
}

.admin-bulk-percent-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  background: #f7eee7;
  color: #9d391b;
  font-size: 0.78rem;
  font-weight: 800;
}

.admin-bulk-field-number {
  width: 84px;
}

.admin-bulk-form-compact .admin-bulk-field-number {
  width: 76px;
}

.admin-bulk-form .button {
  min-height: 38px;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 0.8rem;
}

.admin-bulk-form-compact .button {
  min-height: 34px;
  padding: 0 11px;
}

.admin-card-list,
.admin-customer-grid {
  display: grid;
  gap: 10px;
}

.admin-customer-grid {
  grid-template-columns: 1fr;
}

.admin-customer-card,
.admin-order-card,
.admin-webhook-card {
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e8dfd7;
  border-radius: 14px;
  background: linear-gradient(180deg, #fffefd, #ffffff);
}

.admin-customer-card {
  background: linear-gradient(180deg, #fbfdff, #ffffff);
  border-color: #dce5f0;
}

.admin-webhook-card {
  background: linear-gradient(180deg, #fafdff, #ffffff);
  border-color: #dce8f3;
}

.admin-customer-card-top,
.admin-order-card-top,
.admin-webhook-card-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: start;
}

.admin-customer-card-copy,
.admin-customer-card-status,
.admin-order-card-copy,
.admin-webhook-card-copy,
.admin-order-card-amount,
.admin-webhook-card-status {
  display: grid;
  gap: 5px;
}

.admin-customer-card-copy strong,
.admin-order-card-copy strong,
.admin-webhook-card-copy strong {
  color: #221916;
  font-size: 0.92rem;
  line-height: 1.3;
}

.admin-customer-card-copy p,
.admin-order-card-copy p,
.admin-webhook-card-copy p,
.admin-customer-card-status span,
.admin-order-card-amount span,
.admin-webhook-card-status span,
.admin-customer-meta-strip span {
  margin: 0;
  color: #72645a;
  font-size: 0.76rem;
  line-height: 1.45;
}

.admin-customer-card-status,
.admin-order-card-amount,
.admin-webhook-card-status {
  justify-items: end;
  text-align: right;
}

.admin-customer-card-status strong,
.admin-order-card-amount strong,
.admin-webhook-card-status strong {
  color: #1f1714;
  font-size: 0.9rem;
  line-height: 1.25;
}

.admin-customer-meta-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.admin-customer-meta-strip div,
.admin-order-detail-grid div {
  display: grid;
  gap: 4px;
  padding: 10px 11px;
  border-radius: 10px;
  border: 1px solid #f0e7e0;
  background: #fffaf7;
}

.admin-order-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}

.admin-order-detail-grid dt {
  color: #7c6f64;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.admin-order-detail-grid dd {
  margin: 0;
  color: #1f1714;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.42;
  word-break: break-word;
}

.admin-order-card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.admin-order-action-form {
  margin: 0;
}

.admin-order-action-form .button {
  min-height: 30px;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 0.76rem;
}

.admin-order-action-note {
  display: inline-block;
  color: #7c6f64;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
}

.admin-table-wrap {
  overflow: auto;
  max-height: 620px;
  border-radius: 14px;
  border: 1px solid #ece4dd;
}

.admin-table,
.admin-pricing-table {
  width: 100%;
  min-width: 920px;
  border-collapse: collapse;
  background: #fff;
}

.admin-table th,
.admin-table td,
.admin-pricing-table th,
.admin-pricing-table td {
  padding: 10px 10px;
  border-top: 1px solid #ece4dd;
  text-align: left;
  vertical-align: top;
  font-size: 0.82rem;
}

.admin-table thead th,
.admin-pricing-table thead th {
  border-top: none;
  color: #7c6f64;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.98);
  z-index: 1;
}

.admin-table thead th.is-number,
.admin-pricing-table thead th.is-number,
.admin-cell-number {
  text-align: right;
  white-space: nowrap;
}

.admin-table tbody td strong,
.admin-table tbody td a,
.admin-pricing-table tbody td strong {
  display: block;
  color: #221916;
  font-weight: 700;
  font-size: 0.84rem;
}

.admin-table tbody td span,
.admin-pricing-table tbody td span,
.admin-cell-plan small,
.admin-cell-note small {
  display: block;
  margin-top: 3px;
  color: #7c6f64;
  font-size: 0.68rem;
  line-height: 1.4;
}

.admin-plan-variant-note {
  display: block;
  margin-top: 4px;
  color: #9a4c2f;
  font-size: 0.67rem;
  font-style: normal;
  line-height: 1.4;
}

.admin-cell-plan {
  min-width: 240px;
}

.admin-cell-input {
  min-width: 110px;
}

.admin-cell-note {
  min-width: 170px;
}

.admin-cell-input input,
.admin-cell-note input {
  min-width: 100%;
}

.admin-row-form {
  display: none;
}

.admin-action-stack {
  display: grid;
  gap: 5px;
  min-width: 86px;
}

.admin-action-stack .button {
  min-height: 28px;
  border-radius: 7px;
  padding: 0 8px;
  font-size: 0.76rem;
}

.admin-action-stack a {
  font-size: 0.72rem;
}

.admin-group-shell {
  overflow: hidden;
  border-radius: 16px;
}

.admin-group-shell[hidden] {
  display: none !important;
}

.admin-group-summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 16px;
  cursor: pointer;
}

.admin-group-summary::-webkit-details-marker {
  display: none;
}

.admin-group-summary-copy,
.admin-group-summary-meta {
  display: grid;
  gap: 5px;
}

.admin-group-summary-copy strong {
  color: #221916;
  font-size: 0.92rem;
  line-height: 1.2;
}

.admin-group-summary-copy p,
.admin-group-summary-meta span {
  margin: 0;
  color: #72645a;
  font-size: 0.76rem;
  line-height: 1.45;
}

.admin-group-summary-meta {
  justify-items: end;
  text-align: right;
  min-width: 112px;
}

.admin-group-summary-meta strong {
  color: #b44423;
  font-size: 0.96rem;
}

.admin-group-body {
  display: grid;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid #ece4dd;
}

.admin-group-shell:not([open]) .admin-group-body {
  display: none;
}

.admin-metric-accent {
  border-color: rgba(180, 68, 35, 0.24);
  background: #fff4ee;
}

.admin-metric-warning {
  border-color: rgba(195, 139, 38, 0.22);
  background: #fff8ec;
}

@media (max-width: 1380px) {
  .admin-overview-grid {
    grid-template-columns: 1fr;
  }

  .admin-settings-layout {
    grid-template-columns: 1fr;
  }

  .admin-glance-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .admin-operations-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #webhooks {
    grid-column: 1 / -1;
  }
}

@media (max-width: 1180px) {
  .admin-shell-grid {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: static;
  }
}

@media (max-width: 900px) {
  .admin-appbar,
  .admin-stage-head,
  .admin-surface-head,
  .admin-bulk-form,
  .admin-group-summary,
  .admin-pricing-toolbar,
  .admin-hero-panel-head {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-appbar-actions form,
  .admin-appbar-actions form button,
  .admin-command-links,
  .admin-command-links .button {
    width: 100%;
  }

  .admin-stage-controls,
  .admin-surface-actions,
  .admin-bulk-field,
  .admin-bulk-field-scope,
  .admin-bulk-field-number,
  .admin-search-field {
    width: 100%;
  }

  .admin-bulk-form-compact {
    width: 100%;
    flex: 1 1 auto;
    padding-top: 8px;
  }

  .admin-bulk-slider-row {
    flex-wrap: wrap;
  }

  .admin-bulk-form .button {
    width: 100%;
  }

  .admin-glance-grid,
  .admin-command-stat-grid,
  .admin-brief-grid,
  .admin-operations-grid,
  .admin-settings-grid {
    grid-template-columns: 1fr;
  }

  #webhooks {
    grid-column: auto;
  }

  .admin-customer-meta-strip,
  .admin-order-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .admin-settings-asset-tools {
    grid-template-columns: 1fr;
  }

  .admin-settings-asset-thumb {
    min-height: 120px;
  }
}

@media (max-width: 640px) {
  .admin-login-main {
    padding: 18px 12px;
  }

  .admin-login-card,
  .admin-sidebar,
  .admin-surface,
  .admin-summary-card {
    border-radius: 12px;
  }

  .admin-login-card,
  .admin-sidebar,
  .admin-surface {
    padding: 14px;
  }

  .admin-main {
    padding-bottom: 28px;
  }

  .admin-customer-card-top,
  .admin-order-card-top,
  .admin-webhook-card-top,
  .admin-settings-preview-card {
    grid-template-columns: 1fr;
  }

  .admin-customer-card-status,
  .admin-order-card-amount,
  .admin-webhook-card-status,
  .admin-group-summary-meta {
    justify-items: start;
    text-align: left;
  }

  .admin-customer-meta-strip,
  .admin-order-detail-grid,
  .admin-glance-grid,
  .admin-command-stat-grid {
    grid-template-columns: 1fr;
  }

  .admin-hero-tags {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .button,
  .nav-cta,
  .detail-plan-card,
  .store-journey-card,
  .store-feature-card,
  .store-product-card,
  .market-tab,
  .trip-plan-button,
  .store-order-card {
    transition: none !important;
    animation: none !important;
  }
}
`;
