import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import MonographBrowser from '@/components/MonographBrowser';
import DisclaimerBanner from '@/components/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Ingredient Monograph Database',
  description:
    'Browse 49 curated ingredient monographs with historical context, modern evidence, active compounds, safety notes, and peer-reviewed references.',
};

export default function MonographsPage() {
  return (
    <>
      <PageHero
        eyebrow="Evidence Library"
        title="49-Ingredient Monograph Database"
        subtitle="Each monograph includes historical context from the HTP manuscript corpus, modern clinical evidence, active compound identification, safety notes, and peer-reviewed references with DOI/PubMed links."
        arabicQuote={'\u0627\u0644\u0639\u0644\u0645 \u0628\u0627\u0644\u0623\u062f\u0648\u064a\u0629 \u0623\u0633\u0627\u0633 \u0627\u0644\u0637\u0628'}
        arabicAttribution="Ibn S\u012bn\u0101, Al-Q\u0101n\u016bn f\u012b al-\u1e6cibb \u2014 \u2018Knowledge of drugs is the foundation of medicine.\u2019"
      />

      <DisclaimerBanner />

      <section className="section">
        <div className="container">
          <div className="mb-8 fade-on-scroll">
            <span className="t-label" style={{ color: 'var(--color-accent)' }}>
              Browse by Category
            </span>
            <h2 className="t-heading-2 mt-2">
              Curated Ingredient Evidence Profiles
            </h2>
            <p
              className="t-body mt-3"
              style={{ color: 'var(--color-ink-muted)', maxWidth: 'var(--prose-max)' }}
            >
              This database spans 11 therapeutic categories drawn from the Maimonidean pharmacopoeia,
              the Canon of Medicine, and contemporary phytotherapy evidence. Each entry is cross-referenced
              against WHO, ESCOP, and EMA monographs where available.
            </p>
          </div>

          <MonographBrowser />
        </div>
      </section>
    </>
  );
}
