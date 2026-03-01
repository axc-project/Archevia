import Link from 'next/link';
import Image from 'next/image';
import type { Formulation } from '@/data/formulations';

const categoryColors: Record<string, string> = {
  digestive:      'badge-emerald',
  cognitive:      'badge-gold',
  respiratory:    'badge-ink',
  botanical:      'badge-emerald',
  cardiovascular: 'badge-gold',
  urological:     'badge-ink',
  metabolic:      'badge-emerald',
  longevity:      'badge-gold',
};

const statusLabels: Record<Formulation['researchStatus'], string> = {
  'peer-reviewed': 'Peer-Reviewed',
  'historical':    'Historical Source',
  'in-progress':   'Research In Progress',
};

interface Props {
  formulation: Formulation;
  index?: number;
}

export default function FormulationCard({ formulation: f, index = 0 }: Props) {
  return (
    <article
      className="card-manuscript flex flex-col fade-on-scroll"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Top accent bar */}
      <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />

      {/* Product image */}
      {f.image && (
        <div
          className="flex items-center justify-center"
          style={{
            background: 'var(--color-bg-alt)',
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <Image
            src={f.image}
            alt={f.name}
            width={180}
            height={180}
            style={{ objectFit: 'contain', maxHeight: '160px' }}
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-7">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`badge ${categoryColors[f.category] || 'badge-ink'}`}>
            {f.category}
          </span>
          <span className="badge badge-ink">{statusLabels[f.researchStatus]}</span>
        </div>

        {/* Name */}
        <h3
          className="t-heading-3 mb-1"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {f.name}
        </h3>
        <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
          {f.tradeName} &middot; {f.serving}
        </p>

        {/* Tagline */}
        <p
          className="italic text-sm mb-4"
          style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6 }}
        >
          {f.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--color-border)',
            marginBlock: '0.75rem',
          }}
        />

        {/* Key Ingredients with amounts */}
        <div className="mb-5">
          <p className="t-label mb-2" style={{ color: 'var(--color-ink-faint)' }}>
            Key Ingredients
          </p>
          <div className="space-y-1">
            {f.keyIngredients.slice(0, 4).map((ing) => (
              <div
                key={ing.name}
                className="flex justify-between text-xs"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                <span>{ing.name}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-mono)',
                    color: 'var(--color-emerald)',
                    fontSize: '0.7rem',
                  }}
                >
                  {ing.amount}
                </span>
              </div>
            ))}
            {f.keyIngredients.length > 4 && (
              <p className="text-xs" style={{ color: 'var(--color-ink-faint)' }}>
                +{f.keyIngredients.length - 4} more
              </p>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto space-y-2">
          <Link
            href={`/formulations/${f.slug}`}
            className="btn btn-outline w-full justify-center"
            style={{ fontSize: '0.75rem' }}
          >
            View Full Dossier &rarr;
          </Link>
          {f.dossierUrl && (
            <a
              href={f.dossierUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold w-full justify-center"
              style={{ fontSize: '0.7rem' }}
            >
              Download PDF Dossier
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
