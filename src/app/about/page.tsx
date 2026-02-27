import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The Historical Translation Project™ was founded to bridge nine centuries of Islamic-Jewish medical scholarship with modern pharmacognosy and translational research.',
};

const team = [
  {
    name: 'Avi Rosenberg',
    title: 'Founder & Director of Research',
    credentials: 'Medical Historian · Research Editor · CRO Executive',
    bio: 'Founder of the Historical Translation Project™ and Axella Research, a boutique CRO specializing in early-phase clinical trials. Deep expertise in Maimonidean medical writings, medieval Arabic and Hebrew texts, and the translation of classical medicine concepts into modern scientific frameworks.',
  },
];

const advisors = [
  {
    name: 'Advisory Board',
    note: 'The HTP Advisory Board comprises scholars in medical history, Arabic philology, Hebrew linguistics, and evidence-based pharmacognosy. Board members are available to institutional collaborators upon request.',
  },
];

const milestones = [
  { year: '2019', event: 'Historical Translation Project™ formally established.' },
  { year: '2021', event: 'First formulation dossiers completed using Maimonidean pharmacopoeia.' },
  { year: '2022', event: 'Partnership with clinical researchers for phytochemical authentication.' },
  { year: '2023', event: 'Expansion into Ibn Sīnā and Ibn Zuhr manuscript corpora.' },
  { year: '2024', event: 'Digital platform launched; machine-readable compendium in development.' },
  { year: '2025', event: 'Integration with Axella Research CRO clinical trial infrastructure.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Institute"
        title="Bridging Nine Centuries of Medical Scholarship"
        subtitle="Founded in 2019, the Historical Translation Project™ is a research initiative dedicated to recovering, authenticating, and scientifically contextualising the classical Islamic-Jewish medical corpus."
        arabicQuote="العلم نور"
        arabicAttribution="Classical Arabic proverb — 'Knowledge is light.'"
      />

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                Our Mission
              </span>
              <h2 className="t-heading-2 mt-2 mb-6">What We Do</h2>
              <div className="prose-htp space-y-4" style={{ color: 'var(--color-ink-muted)' }}>
                <p>
                  The Historical Translation Project™ translates, authenticates, and modernly
                  contextualises canonical medical texts of the medieval Islamic-Jewish world —
                  with particular focus on the pharmacognostic and dietetic treatises of
                  Maimonides (Rambam), Ibn Sīnā (Avicenna), and Ibn Zuhr (Avenzoar).
                </p>
                <p>
                  Our methodology bridges philological rigour — working from authenticated
                  Arabic and Hebrew manuscripts — with contemporary phytochemical analysis,
                  clinical evidence review, and regulatory-grade dossier preparation.
                </p>
                <p>
                  We serve research institutions, pharmaceutical developers, clinical
                  investigators, and practitioners who seek primary-source grounding for
                  botanical and compound pharmacognosy.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: '◈',
                  title: 'Manuscript Authentication',
                  desc: 'Direct engagement with Leiden, Cairo, and Vatican critical editions. No secondary synthesis without primary-source verification.',
                },
                {
                  icon: '◈',
                  title: 'Multilingual Scholarship',
                  desc: 'Working competency in Judeo-Arabic, classical Arabic, medieval Hebrew, and Latin medical texts.',
                },
                {
                  icon: '◈',
                  title: 'Translational Bridge',
                  desc: 'Each historical compound mapped to modern phytochemistry via HPLC, NMR, and peer-reviewed pharmacognosy databases.',
                },
                {
                  icon: '◈',
                  title: 'Regulatory Readiness',
                  desc: 'Dossiers prepared with awareness of EU THMPD, FDA botanical guidance, and WHO monograph frameworks.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="card-manuscript p-6 flex gap-4 fade-on-scroll"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span
                    style={{
                      color: 'var(--color-accent)',
                      fontSize: '1.2rem',
                      lineHeight: 1,
                      marginTop: '2px',
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3
                      className="font-medium mb-1"
                      style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Leadership
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Research Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card-manuscript p-8 fade-on-scroll">
                <div
                  className="w-14 h-14 mb-5 flex items-center justify-center text-lg"
                  style={{
                    background: 'var(--color-ink)',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="t-heading-3 mb-1">{member.name}</h3>
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  {member.title}
                </p>
                <p className="text-xs mb-3" style={{ color: 'var(--color-ink-faint)' }}>
                  {member.credentials}
                </p>
                <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Advisory */}
          <div
            id="advisory"
            className="mt-10 p-8 fade-on-scroll"
            style={{ border: '1px dashed var(--color-border-strong)' }}
          >
            <span className="t-label" style={{ color: 'var(--color-accent)' }}>
              Advisory Board
            </span>
            <p className="t-body mt-2 text-sm" style={{ color: 'var(--color-ink-muted)', maxWidth: '48rem' }}>
              {advisors[0].note}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Institutional History
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Milestones</h2>
          <div
            className="timeline-line space-y-8 pl-6"
            style={{ maxWidth: '40rem' }}
          >
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative flex gap-6 items-start fade-on-scroll"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span
                  className="absolute -left-2 top-1.5 w-4 h-4 flex items-center justify-center"
                  style={{ color: 'var(--color-accent)', fontSize: '0.7rem' }}
                >
                  ◆
                </span>
                <div className="pl-4">
                  <p className="t-label" style={{ color: 'var(--color-accent)' }}>
                    {m.year}
                  </p>
                  <p className="t-body text-sm mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
