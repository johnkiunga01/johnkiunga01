import { Product } from "../types";

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const GRAPHQL_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          collections(first: 1) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchShopifyProducts(): Promise<Product[] | null> {
  if (!domain || !storefrontAccessToken) {
    console.log("Shopify credentials not found. Using template data.");
    return null;
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { first: 20 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const json = await response.json();
    const shopifyProducts = json.data.products.edges;

    return shopifyProducts.map((edge: any, index: number) => {
      const node = edge.node;
      const variant = node.variants.edges[0]?.node;
      const image = node.images.edges[0]?.node?.url || "https://picsum.photos/800/800";
      const category = node.collections.edges[0]?.node?.title || "General";

      return {
        id: index + 1000, // Offset to avoid conflicts with mock IDs
        name: node.title,
        price: `${variant?.price?.currencyCode || "KSh"} ${parseFloat(variant?.price?.amount || "0").toLocaleString()}`,
        oldPrice: variant?.compareAtPrice ? `${variant.compareAtPrice.currencyCode} ${parseFloat(variant.compareAtPrice.amount).toLocaleString()}` : undefined,
        image: image,
        category: category,
        rating: 0,
        reviews: 0,
        discount: variant?.compareAtPrice ? Math.round((1 - (parseFloat(variant.price.amount) / parseFloat(variant.compareAtPrice.amount))) * 100) : undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    return null;
  }
}
