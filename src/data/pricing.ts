/**
 * PRICING CONFIGURATION
 * =====================
 * Edit prices and Shopify variant IDs here.
 * All prices are in USD.
 *
 * To connect to Shopify:
 * 1. Create products in your Shopify admin
 * 2. Copy each product's Storefront API variant ID
 *    (format: "gid://shopify/ProductVariant/XXXXXXXXXX")
 * 3. Paste them below
 * 4. Set NEXT_PUBLIC_SHOPIFY_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
 *    in your .env.local or Vercel environment variables
 */

export interface ProductPrice {
  slug: string;
  name: string;
  price: number;           // USD
  compareAtPrice?: number; // strikethrough price (optional)
  shopifyVariantId?: string; // Shopify Storefront API variant ID
  inStock: boolean;
}

export const formulationPrices: ProductPrice[] = [
  {
    slug: 'digestive-metabolic-core',
    name: 'Digestive Metabolic Core\u2122',
    price: 49.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined, // Add your Shopify variant ID here
    inStock: true,
  },
  {
    slug: 'cellular-resilience-complex',
    name: 'Cellular Resilience Complex\u2122',
    price: 59.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined,
    inStock: true,
  },
  {
    slug: 'circulatory-vitality-core',
    name: 'Circulatory Vitality Core\u2122',
    price: 54.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined,
    inStock: true,
  },
  {
    slug: 'urinary-flow-support',
    name: 'Urinary Flow Support\u2122',
    price: 49.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined,
    inStock: true,
  },
  {
    slug: 'metabolic-resilience-support',
    name: 'Metabolic Resilience Support\u2122',
    price: 44.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined,
    inStock: true,
  },
  {
    slug: 'cellular-vitality-complex',
    name: 'Cellular Vitality Complex\u2122',
    price: 64.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined,
    inStock: true,
  },
  {
    slug: 'cognitive-vitality-complex',
    name: 'Cognitive Vitality Complex\u2122',
    price: 54.95,
    compareAtPrice: undefined,
    shopifyVariantId: undefined,
    inStock: true,
  },
];

export function getPriceBySlug(slug: string): ProductPrice | undefined {
  return formulationPrices.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
