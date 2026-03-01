import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the Historical Translation Project™ for research collaboration, institutional partnerships, and dossier requests.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact the Institute"
        subtitle="We welcome partnerships with research institutions, pharmaceutical companies, clinical investigators, and independent scholars working at the intersection of medical history and translational pharmacognosy."
      />

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <div className="space-y-8">
                {[
                  {
                    title: 'Research Collaboration',
                    desc: 'Joint manuscript translation projects, co-authored phytochemical analyses, and clinical validation partnerships.',
                  },
                  {
                    title: 'Institutional Dossier Requests',
                    desc: 'Full clinical dossiers — including manuscript citations, evidence matrices, and GRADE-graded research summaries — are available to qualified institutions.',
                  },
                  {
                    title: 'CRO & Clinical Trials',
                    desc: 'For clinical trial collaboration, formulation consulting, or research partnerships.',
                  },
                  {
                    title: 'Press & Academic Enquiries',
                    desc: 'Interview requests, expert commentary on medieval Islamic-Jewish medicine, and speaking engagements.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="fade-on-scroll"
                    style={{
                      paddingLeft: '1.25rem',
                      borderLeft: '2px solid var(--color-accent)',
                    }}
                  >
                    <h3
                      className="font-medium mb-1"
                      style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
