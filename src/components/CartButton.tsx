'use client';

import { useCart } from '@/lib/CartContext';

export default function CartButton() {
  const { toggleCart, itemCount } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2"
      aria-label={`Cart (${itemCount} items)`}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {/* Cart icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>

      {/* Badge */}
      {itemCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '0',
            right: '-2px',
            background: 'var(--color-accent)',
            color: 'white',
            fontSize: '0.55rem',
            fontFamily: 'var(--font-ibm-mono)',
            fontWeight: 600,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
