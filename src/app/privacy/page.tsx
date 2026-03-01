import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 'var(--prose-max)' }}>
        <h1 className="t-heading-1 mb-8">Privacy Policy</h1>
        <div className="prose-htp space-y-6" style={{ color: 'var(--color-ink-muted)' }}>
          <p>
            The Historical Translation Project™ collects only the personal information you
            voluntarily provide when submitting enquiries through our contact form (name,
            email address, institution, and message content).
          </p>
          <p>
            We do not sell, rent, or share your personal information with third parties.
            Contact form submissions are retained only for the purpose of responding to your
            enquiry and are deleted after correspondence is resolved.
          </p>
          <p>
            This website does not use tracking cookies, advertising networks, or third-party
            analytics beyond standard Vercel deployment analytics (aggregate, anonymised).
          </p>
          <p>
            For privacy enquiries, contact us at research@historicaltranslationproject.com.
          </p>
          <p>Last updated: January 2025.</p>
        </div>
      </div>
    </section>
  );
}
