# Wellcare Medicose 2.0 — Cloudflare deployment

## Build
- Framework: Vite + React
- Production branch: main
- Build command: npm run build
- Output directory: dist
- Macaly: not used

## Planned production modules
- Customer authentication: Google OAuth + phone OTP
- Product catalogue and search
- Cart and checkout
- Orders and order tracking
- Customer profile and addresses
- Admin product/inventory management
- Staff order workflow
- PWA/installable experience

Authentication must be connected to a real backend/provider before production use; UI buttons are not treated as working authentication until the callback/session flow is verified.
