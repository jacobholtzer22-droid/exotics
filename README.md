# Exotics — THCa Flower & Streetwear Store

Complete rebuild of exotics.com (Nigel's Michigan hemp + apparel brand) as a modern
Next.js 14 storefront. All 78 products, variants, prices, THC potency data, and images
were pulled from the live Shopify store on July 22, 2026.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- framer-motion for animations (scroll reveals, stagger grids, cart/menu transitions)
- lucide-react icons
- No database — the catalog lives in `lib/catalog.json` (generated from the Shopify
  `products.json` export), images in `public/images/products/<handle>/` (WebP, ~24MB)

## How the store works

- **Cart**: client-side (`lib/cart.tsx` React context), persisted in localStorage.
- **Checkout collects an order request — no online payment.** The customer submits
  contact + shipping info; the confirmation screen tells them the team will reach out
  to arrange payment and shipping (matches how Nigel takes payment today).
- **Age gate**: 21+ modal on first visit (localStorage `exotics-age-verified`).
- **Compliance**: Farm Bill + FDA disclaimers in the footer, restricted-state list
  (FL, HI, ID, MN, OR, RI, UT, VT) enforced at checkout — selecting a restricted state
  with THCa items in the cart blocks the order with an explanation.
- **CRM wiring (optional)**: checkout POSTs the order to the Align & Acquire CRM
  `/api/contact` (order folded into `message`) once `NEXT_PUBLIC_BUSINESS_SLUG` is set
  to Nigel's real `Business.slug`. Until then (`REPLACE_ME_EXOTICS`) it skips the
  network call and still shows the confirmation.

## Routes

`/` home · `/shop` (+ `?cat=flower|drinks|edibles|apparel|accessories`) ·
`/shop/[handle]` (78 product pages, SSG) · `/cart` · `/checkout` · `/about` ·
`/contact` · `/faq` · `/lab-results` · `/shipping-policy` · `/refund-policy` ·
`/privacy-policy` · sitemap + robots

## Dev

```bash
npm install
npm run dev   # preview config "exotics-dev" (port 3014) in missedcall-ai .claude/launch.json
```

## Open TODOs before launch

- [ ] Onboard Nigel in the CRM and set `NEXT_PUBLIC_BUSINESS_SLUG` to the real slug
      (checkout orders then land in the dashboard as website leads).
- [ ] Decide the order-notification path (CRM owner notifications need
      ownerEmail/ownerPhone configured in admin).
- [ ] Real COA PDFs for the Lab Results page (currently links to email request).
- [ ] Confirm final domain + update `lib/site.ts` `url` (currently exotics.com).
- [ ] Business hours / physical store info if he wants the store locator carried over
      (old site used a Stockist embed — not rebuilt).
- [ ] Swig 300mg flavor lineup shows same 6 flavors as 100mg — confirm.
- [ ] Product descriptions were carried over from the old site verbatim — Nigel may
      want a copy pass.
