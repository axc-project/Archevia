'use client';

import { useCart } from '@/lib/CartContext';
import { getPriceBySlug, formatPrice } from '@/data/pricing';

interface Props {
  slug: string;
  image?: string;
  variant?: 'primary' | 'gold' | 'outline';
  fullWidth?: boolean;
  showPrice?: boolean;
  className?: string;
}

export default function AddToCartButton({
  slug,
  image,
  variant = 'primary',
  fullWidth = false,
  showPrice = true,
  className = '',
}: Props) {
  const { addItem } = useCart();
  const product = getPriceBySlug(slug);

  if (!product) return null;

  const btnClass =
    variant === 'gold'
      ? 'btn btn-gold'
      : variant === 'outline'
        ? 'btn btn-outline'
        : 'btn btn-primary';

  return (
    <button
      onClick={() => addItem(product, image)}
      disabled={!product.inStock}
      className={`${btnClass} ${fullWidth ? 'w-full justify-center' : ''} ${className}`}
      style={{
        fontSize: '0.75rem',
        opacity: product.inStock ? 1 : 0.5,
        cursor: product.inStock ? 'pointer' : 'not-allowed',
      }}
    >
      {product.inStock ? (
        <>
          Add to Cart
          {showPrice && (
            <span
              style={{
                marginLeft: '0.5rem',
                fontFamily: 'var(--font-ibm-mono)',
                fontSize: '0.7rem',
              }}
            >
              {formatPrice(product.price)}
            </span>
          )}
        </>
      ) : (
        'Coming Soon'
      )}
    </button>
  );
}
