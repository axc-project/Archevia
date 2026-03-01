'use client';

import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import { formatPrice, type ProductPrice } from '@/data/pricing';

interface Formulation {
  slug: string;
  name: string;
  tradeName: string;
  category: string;
  tagline: string;
  serving: string;
  image?: string;
  dossierUrl?: string;
}

export default function ShopGrid({
  formulations,
  prices,
}: {
  formulations: Formulation[];
  prices: ProductPrice[];
}) {
  return (
    <section className="section">
      <div className="container">
        <span className="t-label" style={{ color: 'var(--color-accent)' }}>Formulations</span>
        <h2 className="t-heading-2 mt-2 mb-10">Botanical Supplement Line</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {formulations.map((f, i) => {
            const pricing = prices.find((p) => p.slug === f.slug);
            return (
              <article
                key={f.slug}
                className="card-manuscript flex flex-col fade-on-scroll"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />

                {f.image && (
                  <Link
                    href={`/formulations/${f.slug}`}
                    className="flex items-center justify-center"
                    style={{ background: 'var(--color-bg-alt)', padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}
                  >
                    <Image
                      src={f.image}
                      alt={f.name}
                      width={140}
                      height={140}
                      style={{ objectFit: 'contain', maxHeight: '130px' }}
                    />
                  </Link>
                )}

                <div className="p-5 flex flex-col flex-1">
                  <span className="badge badge-gold mb-3" style={{ textTransform: 'capitalize', alignSelf: 'flex-start' }}>
                    {f.category}
                  </span>
                  <Link
                    href={`/formulations/${f.slug}`}
                    style={{ textDecoration: 'none', color: 'var(--color-ink)' }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                      {f.name}
                    </h3>
                  </Link>
                  <p className="t-label mb-1" style={{ color: 'var(--color-accent)' }}>
                    {f.tradeName} &middot; {f.serving}
                  </p>

                  {/* Price */}
                  {pricing && (
                    <div className="flex items-baseline gap-2 mb-3">
                      <span style={{ fontFamily: 'var(--font-ibm-mono)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-ink)' }}>
                        {formatPrice(pricing.price)}
                      </span>
                      {pricing.compareAtPrice && (
                        <span style={{ fontFamily: 'var(--font-ibm-mono)', fontSize: '0.8rem', color: 'var(--color-ink-faint)', textDecoration: 'line-through' }}>
                          {formatPrice(pricing.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  )}

                  <p
                    className="text-xs mb-4 flex-1"
                    style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {f.tagline}
                  </p>

                  <div className="space-y-2 mt-auto">
                    <AddToCartButton slug={f.slug} image={f.image} variant="primary" fullWidth />
                    <Link
                      href={`/formulations/${f.slug}`}
                      className="btn btn-outline w-full justify-center"
                      style={{ fontSize: '0.7rem' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
