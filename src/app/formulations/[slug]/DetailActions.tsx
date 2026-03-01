'use client';

import AddToCartButton from '@/components/AddToCartButton';
import { getPriceBySlug, formatPrice } from '@/data/pricing';

export default function DetailActions({
  slug,
  dossierUrl,
  image,
}: {
  slug: string;
  dossierUrl?: string;
  image?: string;
}) {
  const pricing = getPriceBySlug(slug);

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <AddToCartButton slug={slug} image={image} variant="gold" showPrice />
      {dossierUrl && (
        <a
          href={dossierUrl}
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{
            fontSize: '0.75rem',
            color: 'rgba(253,248,240,0.85)',
            border: '1px solid rgba(253,248,240,0.3)',
            background: 'transparent',
          }}
        >
          Technical Dossier (PDF)
        </a>
      )}
    </div>
  );
}
