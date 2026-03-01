import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Use' };

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 'var(--prose-max)' }}>
        <h1 className="t-heading-1 mb-8">Terms of Use</h1>
        <div className="prose-htp space-y-6" style={{ color: 'var(--color-ink-muted)' }}>
          <p>
            By accessing this website, you agree to use the content solely for personal,
            educational, and non-commercial research purposes.
          </p>
          <p>
            All text, translations, and original content on this website is the intellectual
            property of the Historical Translation Project™ and may not be reproduced,
            redistributed, or used in commercial publications without prior written consent.
          </p>
          <p>
            The Historical Translation Project™ reserves the right to modify or discontinue
            any part of this website at any time without notice. The disclaimers and
            limitations of liability set out in our Disclaimer page apply in full to all
            use of this website.
          </p>
          <p>Last updated: January 2025.</p>
        </div>
      </div>
    </section>
  );
}
