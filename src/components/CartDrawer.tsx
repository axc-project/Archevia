'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, getPriceBySlug } from '@/data/pricing';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, itemCount, subtotal, formattedSubtotal, clearCart } = useCart();

  if (!isOpen) return null;

  async function handleCheckout() {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

    // If Shopify is not configured, show a message
    if (!domain || !token) {
      alert(
        'Checkout is being configured. Please contact us at research@historicaltranslationproject.com to place your order, or check back soon.'
      );
      return;
    }

    // Build Shopify cart via Storefront API
    const variantItems = items
      .map((i) => {
        const product = getPriceBySlug(i.slug);
        return product?.shopifyVariantId
          ? { merchandiseId: product.shopifyVariantId, quantity: i.qty }
          : null;
      })
      .filter(Boolean);

    if (variantItems.length === 0) {
      alert(
        'Products are being added to our Shopify store. Please contact us to place your order.'
      );
      return;
    }

    try {
      const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({
          query: `mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
              cart { checkoutUrl }
              userErrors { field message }
            }
          }`,
          variables: {
            input: { lines: variantItems },
          },
        }),
      });

      const data = await res.json();
      const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert('Unable to create checkout. Please try again.');
      }
    } catch {
      alert('Checkout error. Please contact us to place your order.');
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(30,23,20,0.5)',
          zIndex: 90,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(380px, 90vw)',
          background: 'var(--color-surface)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(30,23,20,0.15)',
          borderLeft: '1px solid var(--color-border)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.3rem',
                fontWeight: 500,
                color: 'var(--color-ink)',
              }}
            >
              Your Cart
            </h2>
            <p className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: 'var(--color-ink-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center" style={{ paddingTop: '3rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.1rem',
                  color: 'var(--color-ink-faint)',
                  marginBottom: '1rem',
                }}
              >
                Your cart is empty
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn btn-outline"
                style={{ fontSize: '0.75rem' }}
              >
                Browse Formulations
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.slug}
                className="flex gap-4"
                style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {/* Thumbnail */}
                {item.image && (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--color-bg-alt)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{
                      fontFamily: 'var(--font-ibm-mono)',
                      color: 'var(--color-emerald)',
                    }}
                  >
                    {formatPrice(item.price)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.slug, item.qty - 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        background: 'var(--color-bg-alt)',
                        border: '1px solid var(--color-border)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      &minus;
                    </button>
                    <span
                      className="text-sm"
                      style={{
                        minWidth: '1.5rem',
                        textAlign: 'center',
                        fontFamily: 'var(--font-ibm-mono)',
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.slug, item.qty + 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        background: 'var(--color-bg-alt)',
                        border: '1px solid var(--color-border)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="text-xs ml-auto"
                      style={{
                        color: 'var(--color-ink-faint)',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div
            className="p-5 space-y-3"
            style={{
              borderTop: '1px solid var(--color-border)',
              background: 'var(--color-bg-alt)',
            }}
          >
            <div className="flex justify-between items-center">
              <span
                className="t-label"
                style={{ color: 'var(--color-ink-muted)', fontSize: '0.65rem' }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                {formattedSubtotal}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
              Shipping calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full justify-center"
              style={{ fontSize: '0.8rem', padding: '0.75rem' }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="text-xs w-full text-center"
              style={{
                color: 'var(--color-ink-faint)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
