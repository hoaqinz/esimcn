## [Unreleased]
### Changed
- Reworked homepage and catalog toward a mobile-first app/shop layout.
- Switched primary visual system from blue SaaS styling to warmer red commerce styling.
- Tightened product selection, CTA hierarchy, and mobile spacing for faster purchase flow.
- Hardened payment webhook validation by matching the receiving account number before marking orders as paid.
- Disabled direct top-up checkout until the provider flow can target the correct ICCID safely.
- Made cookie parsing tolerant of malformed cookie values to avoid request crashes.

### Added
- Added admin dashboard with login, order monitoring, webhook event view, and pricing override controls.
- Added a self-hosted website chat widget with D1-backed chat sessions/messages, China eSIM-focused quick replies, and optional OpenClaw webhook integration.

### Removed
- Removed the expired third-party LiveChat embed from the storefront.
