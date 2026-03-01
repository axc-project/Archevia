import type { Metadata } from 'next';
import { formulations } from '@/data/formulations';
import FormulationCard from '@/components/FormulationCard';
import PageHero from '@/components/PageHero';
import DisclaimerBanner from '@/components/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Formulations',
  description:
    'Historical pharmacognostic formulations derived from medieval Islamic-Jewish medical texts, contextualized with modern phytochemical evidence.',
};

export default function FormulationsPage() {
  const categories = ['all', 'digestive', 'cognitive', 'respiratory', 'cardiovascular'] as const;

  return (
    <>
      <PageHero
        eyebrow="Research Compounds"
        title="Formulations"
        subtitle="Each compound in the HTP portfolio traces directly to authenticated medieval manuscripts. Browse by category or review individual clinical dossiers."
        arabicQuote="الدواء المركب أقوى من المفرد"
        arabicAttribution="Avicenna, Al-Qānūn, Book II"
      />

      <DisclaimerBanner />

      <section className="section">
        <div className="container">
          {/* Category label legend */}
          <div className="flex flex-wrap gap-3 mb-12 fade-on-scroll">
            {categories.map((cat) => (
              <span
                key={cat}
                className="badge"
                style={{
                  background: cat === 'all' ? 'var(--color-ink)' : 'transparent',
                  color: cat === 'all' ? 'var(--color-bg)' : 'var(--color-ink-muted)',
                  borderColor: cat === 'all' ? 'var(--color-ink)' : 'var(--color-border-strong)',
                  cursor: 'default',
                  textTransform: 'capitalize',
                  padding: '0.35rem 0.9rem',
                }}
              >
                {cat === 'all' ? 'All Formulations' : cat}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {formulations.map((f, i) => (
              <FormulationCard key={f.slug} formulation={f} index={i} />
            ))}
          </div>

          {/* Empty callout */}
          <div
            className="mt-16 p-8 text-center fade-on-scroll"
            style={{
              border: '1px dashed var(--color-border-strong)',
            }}
          >
            <p className="t-label mb-2" style={{ color: 'var(--color-ink-faint)' }}>
              Ongoing Research
            </p>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)' }}>
              Additional formulations from the Ibn Sīnā and Ibn Rushd (Averroes) corpora are
              currently under philological review and will be published upon completion of
              peer authentication.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
