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
        arabicQuote={'العلم بالأدوية أساس الطب'}
        arabicAttribution="Ibn Sīnā, Al-Qānūn fī al-Ṭibb — 'Knowledge of drugs is the foundation of medicine.'"
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
