# NairoMarket Native UI

A marketplace UI reference project combining a React/Vite storefront prototype with a Shopify Liquid theme implementation.

## What is included

- Responsive marketplace storefront built with React, TypeScript and Vite
- Product search, filtering, cart state, recently viewed items and quick view
- Shopify Storefront API product loading
- Mobile bottom navigation and desktop marketplace navigation
- A separate `shopify-theme/` implementation using Shopify Liquid
- Theme templates for home, collections, products, cart, search and 404 pages

## Project structure

```text
.
├── src/                 # React storefront prototype
├── shopify-theme/       # Shopify Liquid theme
├── .env.example
├── package.json
└── vite.config.ts
```

## Local development

Requirements: Node.js 18+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

For Shopify product loading, set:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

Use only a Storefront API token with the minimum permissions required by the storefront. Never commit Admin API tokens or private app secrets.

## Shopify Liquid theme

The `shopify-theme/` folder can be packaged independently for Shopify. Zip the contents of that folder—not the parent folder—before uploading through Shopify Admin.

## Status

This repository is preserved as a public legacy/reference project. Review API versions, checkout behavior, accessibility and production data handling before deploying it commercially.

## Migration

Originally developed under `John-Kiunga/Nairomarket-native-UI` and salvaged into the current GitHub account in October 2026.
