import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
};

export default function DisclaimerPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 'var(--prose-max)' }}>
        <h1 className="t-heading-1 mb-8">Disclaimer</h1>
        <div className="prose-htp space-y-6" style={{ color: 'var(--color-ink-muted)' }}>
          <p>
            <strong style={{ color: 'var(--color-ink)' }}>Educational and Research Use Only.</strong>{' '}
            All content published by the Historical Translation Project™ — including formulation
            descriptions, ingredient analyses, historical translations, and clinical notes — is
            presented solely for educational, historical research, and informational purposes.
          </p>
          <p>
            Nothing on this website constitutes medical advice, a clinical recommendation,
            a regulatory submission, or a marketing claim. No formulation described herein
            is a drug, medical device, or regulated therapeutic agent under any applicable
            regulatory framework including but not limited to the US Food, Drug, and Cosmetic
            Act; the EU Medicinal Products Directive; or the UK Medicines Act.
          </p>
          <p>
            <strong style={{ color: 'var(--color-ink)' }}>FDA Notice.</strong>{' '}
            These statements have not been evaluated by the Food and Drug Administration.
            These products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p>
            <strong style={{ color: 'var(--color-ink)' }}>Professional Consultation.</strong>{' '}
            Persons with medical conditions, pregnant or nursing women, and individuals taking
            prescription medications must consult a qualified healthcare practitioner before
            using any botanical or herbal preparation described on this website.
          </p>
          <p>
            <strong style={{ color: 'var(--color-ink)' }}>Accuracy.</strong>{' '}
            While every effort is made to ensure philological and scientific accuracy,
            the Historical Translation Project™ makes no warranty — express or implied —
            regarding the completeness, correctness, or fitness for any particular purpose
            of information provided on this website.
          </p>
          <p>
            Last updated: January 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
