# Tropa Threads

A single-page React + Vite + TypeScript landing site for a Laguna thrift and streetwear concept. Uses Tailwind CSS v4, Motion, and Lucide icons.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL Vite prints. For a production build, run `npm run build`; `npm run preview` serves the build locally.

## Customize before launch

- Edit sample names, prices, sizes, conditions, and descriptions in `src/data/products.ts`. These are **illustrative listings**, not confirmed stock. Verify availability and prices with the shop before publishing real listings.
- Replace photos in `public/images/` with photos of the actual items, keeping filenames or updating image paths in `src/data/products.ts` and `src/App.tsx`. The included demo photography is from [Pexels](https://www.pexels.com/license/) and [Unsplash](https://unsplash.com/license); it does not show verified Tropa Threads inventory or customers. See source URLs below.
- Set verified Facebook, Instagram, and Messenger URLs in `src/data/business.ts`. Until set, contact/social controls display an honest not-yet-connected message rather than redirecting to an unrelated page. Edit the shop location there too.
- Adjust copy in `src/App.tsx` and palette/typography tokens near the top of `src/index.css`. The monogram is in `src/components/BrandLogo.tsx` and `public/favicon.svg`.

## Demo photo credits / source IDs

Pexels: `34970891` (hero portrait), `28758241` (oversized tee), `23174711` (editorial), `8532616` (black tee), `22613978` (graphic tee), `34156907` (folded tees), `26601197` (rack), `30922974` (vintage rack), `26903620` (printed tee look), `18257675` (white tee), `907863` (hoodie). Unsplash: `photo-1588850561407-ed78c282e89b` (white cap), `photo-1521369909029-2afed882baee` (washed cap). Replace these illustrative images with actual shop photography for an accurate storefront.
