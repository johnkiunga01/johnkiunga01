# NairoMarket Shopify Liquid Theme

This is a custom Shopify theme designed to look and feel like a high-end native application, optimized for large marketplaces with multiple vendors.

## How to Install (CRITICAL: READ THIS)

To avoid **404 errors** or "Invalid Theme" messages, you must zip the files correctly:

1.  **Open the `shopify-theme` folder** on your computer.
2.  **Select all the folders inside** (`assets`, `config`, `layout`, `sections`, `snippets`, `templates`).
3.  **Right-click and "Compress"** those items into a single ZIP file.
    *   **DO NOT** zip the `shopify-theme` folder itself. 
    *   **DO** zip the *contents* of the folder.
4.  **Upload to Shopify**:
    *   Go to **Online Store > Themes**.
    *   Click **Add theme > Upload zip file**.

## Features

-   **Native App Feel**: Uses Tailwind CSS for a modern, fast, and responsive UI.
-   **Standardized Typography**: Font sizes for product titles and prices have been standardized to match industry leaders like Kilimall.
-   **Multi-Vendor Ready**: Designed to work seamlessly with Shopify's native architecture and third-party multi-vendor apps.
-   **No API Keys Needed**: This theme uses Shopify's native Liquid engine, so you don't need to manage Storefront API tokens or GitHub secrets.

## Included Files

-   **Layout**: `layout/theme.liquid`
-   **Config (Required)**: 
    - `config/settings_schema.json`
    - `config/settings_data.json`
-   **Templates**: 
    - `templates/index.liquid`
    - `templates/collection.liquid`
    - `templates/product.liquid`
    - `templates/cart.liquid`
    - `templates/search.liquid`
    - `templates/404.liquid`
-   **Sections**:
    - `sections/header.liquid`
    - `sections/footer.liquid`
    - `sections/hero-carousel.liquid`
    - `sections/flash-sales.liquid`
-   **Snippets**:
    - `snippets/product-card.liquid`

## Font Sizes Applied

-   **Product Page Title**: `text-lg md:text-xl` (Standardized)
-   **Product Page Price**: `text-2xl` (Standardized)
-   **Product Card Price**: `text-base` (Standardized)
-   **Product Card Title**: `text-sm` (Standardized)

## Customization

You can change the primary colors in `layout/theme.liquid` inside the Tailwind configuration block:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#FF4D00', // Change this to your brand color
        // ...
      }
    }
  }
}
```
