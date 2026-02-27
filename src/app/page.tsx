import type { Metadata } from 'next';
import Link from 'next/link';
import { formulations } from '@/data/formulations';
import FormulationCard from '@/components/FormulationCard';

export const metadata: Metadata = {
  title: 'Historical Translation Project™ — Bridging Nine Centuries of Medical Scholarship',
};

const scholars = [
  {
    name: 'Moses Maimonides',
    arabicName: 'موسى بن ميمون',
    hebrewName: 'משה בן מיימון (רמב"ם)',
    dates: '1138–1204 CE',
    locus: 'Córdoba · Fustat (Cairo)',
    role: 'Court Physician, Ayyubid Sultanate',
    works: ['Regimen of Health', 'On Asthma', 'On Poisons', 'Medical Aphorisms (25 vols.)'],
    summary:
      'The most prolific Judeo-Arabic medical encyclopedist of the medieval period. Maimonides synthesized Galenic humoralism with direct clinical observation, producing ten major medical treatises for the Ayyubid royal court that remain primary sources for comparative pharmacognosy.',
  },
  {
    name: 'Ibn Sīnā (Avicenna)',
    arabicName: 'ابن سينا',
    dates: '980–1037 CE',
    locus: 'Bukhara · Hamadan · Isfahan',
    role: 'Chief Physician & Vizier',
    works: ['Al-Qānūn fī al-Ṭibb (5 vols.)', 'Kitāb al-Shifāʾ'],
    summary:
      'Author of the most widely-used medical textbook in history. The Canon of Medicine remained the standard curriculum at European and Islamic universities from the 12th through the 17th century. HTP focuses on Books II and IV: materia medica and compound remedies.',
  },
  {
    name: 'Ibn Zuhr (Avenzoar)',
    arabicName: 'ابن زهر',
    dates: '1094–1162 CE',
    locus: 'Seville · Marrakesh',
    role: 'Court Physician, Almohad Caliphate',
    works: ['Kitāb al-Taysīr', 'Kitāb al-Agdhiya'],
    summary:
      'The pre-eminent clinical empiricist of Al-Andalus, Ibn Zuhr introduced tracheotomy, parenteral feeding, and systematic experimental pathology — innovations translated and studied in depth by HTP scholars.',
  },
];

export default function HomePage() {
  const featuredFormulations = formulations.slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="parchment-hero relative overflow-hidden">
        {/* Geometric background ornament */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40Z' fill='none' stroke='%23c98c24' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container relative" style={{ paddingBlock: 'clamp(6rem,12vw,10rem)' }}>
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8 fade-on-scroll">
              <span className="geo-diamond" />
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                Archevia™ · In Collaboration with the Historical Translation Project™
              </span>
            </div>

            {/* Headline */}
            <h1 className="t-display mb-6 fade-on-scroll" style={{ animationDelay: '0.1s' }}>
              Nine Centuries of<br />
              <em>Medical Scholarship,</em><br />
              Rigorously Restored.
            </h1>

            {/* Sub */}
            <p
              className="t-body mb-10 fade-on-scroll"
              style={{
                maxWidth: '42rem',
                color: 'var(--color-ink-muted)',
                fontSize: '1.1rem',
                animationDelay: '0.2s',
              }}
            >
              The Historical Translation Project™ translates, authenticates, and contextualises
              the canonical Islamic-Jewish medical corpus — from Maimonides' <em>Regimen of Health</em>{' '}
              to Avicenna's <em>Canon of Medicine</em> — through the lens of modern phytochemistry
              and evidence-based pharmacognosy.
            </p>

            <div className="flex flex-wrap gap-4 fade-on-scroll" style={{ animationDelay: '0.3s' }}>
              <Link href="/formulations" className="btn btn-primary">
                Explore Formulations
              </Link>
              <Link href="/research" className="btn btn-outline">
                Research Methodology
              </Link>
            </div>
          </div>

          {/* Floating source card */}
          <div
            className="card-manuscript mt-16 p-6 max-w-sm fade-on-scroll"
            style={{ animationDelay: '0.4s' }}
          >
            <p className="t-label mb-2" style={{ color: 'var(--color-accent)' }}>
              Primary Source
            </p>
            <p
              className="t-arabic mb-3"
              style={{ color: 'var(--color-ink)', fontSize: '1.3rem' }}
            >
              الصحة خير من الغنى
            </p>
            <p className="italic text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              "Health is better than wealth."
            </p>
            <p className="t-label mt-3" style={{ color: 'var(--color-ink-faint)' }}>
              — Maimonides, Medical Aphorisms, §25
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}>
        <div className="container">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ paddingBlock: '2.5rem', gap: '0' }}
          >
            {[
              { val: '900+', label: 'Years of Source Material' },
              { val: '4',   label: 'Scholarly Traditions' },
              { val: '12',  label: 'Primary Languages' },
              { val: '40+', label: 'Active Formulations' },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center px-6 fade-on-scroll"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(253,248,240,0.1)' : 'none',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <p
                  className="t-heading-1"
                  style={{ color: 'var(--color-accent)', marginBottom: '0.25rem' }}
                >
                  {s.val}
                </p>
                <p className="t-label" style={{ color: 'rgba(253,248,240,0.5)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOLARS ── */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="mb-14 fade-on-scroll">
            <span className="t-label" style={{ color: 'var(--color-accent)' }}>
              Primary Corpus
            </span>
            <h2 className="t-heading-1 mt-2" style={{ maxWidth: '32rem' }}>
              The Scholars We Study
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {scholars.map((s, i) => (
              <article
                key={s.name}
                className="card-manuscript p-8 fade-on-scroll"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* Header */}
                <div className="mb-5">
                  <p className="t-label mb-1" style={{ color: 'var(--color-accent)' }}>
                    {s.dates}
                  </p>
                  <h3 className="t-heading-3">{s.name}</h3>
                  <p
                    className="t-arabic mt-1"
                    style={{ color: 'var(--color-ink-muted)', fontSize: '1rem' }}
                  >
                    {s.arabicName}
                  </p>
                  {s.hebrewName && (
                    <p
                      className="t-hebrew mt-0.5"
                      style={{ color: 'var(--color-ink-muted)', fontSize: '0.9rem' }}
                    >
                      {s.hebrewName}
                    </p>
                  )}
                </div>

                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}
                >
                  <span className="geo-diamond" style={{ width: '4px', height: '4px' }} />
                  <p className="t-label" style={{ color: 'var(--color-ink-faint)' }}>
                    {s.locus}
                  </p>
                </div>

                <p className="t-body text-sm mb-5" style={{ color: 'var(--color-ink-muted)' }}>
                  {s.summary}
                </p>

                <div>
                  <p className="t-label mb-2" style={{ color: 'var(--color-ink-faint)' }}>
                    Key Works
                  </p>
                  <ul className="space-y-1">
                    {s.works.map((w) => (
                      <li key={w} className="text-sm italic" style={{ color: 'var(--color-ink-muted)' }}>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED FORMULATIONS ── */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="fade-on-scroll">
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                Research Compounds
              </span>
              <h2 className="t-heading-1 mt-2">Featured Formulations</h2>
            </div>
            <Link href="/formulations" className="btn btn-outline fade-on-scroll">
              View All Formulations
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredFormulations.map((f, i) => (
              <FormulationCard key={f.slug} formulation={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH METHODOLOGY STRIP ── */}
      <section className="section" style={{ background: 'var(--color-ink)' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="t-label mb-4 block" style={{ color: 'var(--color-accent)' }}>
                Methodology
              </span>
              <h2 className="t-heading-1 mb-6 fade-on-scroll" style={{ color: 'var(--color-bg)' }}>
                Rigorous Scholarship.<br />Modern Context.
              </h2>
              <p
                className="t-body mb-8 fade-on-scroll"
                style={{ color: 'rgba(253,248,240,0.65)', maxWidth: '36rem' }}
              >
                Every HTP formulation undergoes a four-stage authentication process: primary
                manuscript review in original languages, cross-referencing against independent
                manuscript traditions, phytochemical compound identification, and alignment with
                contemporary evidence-based pharmacognosy literature.
              </p>
              <Link href="/research" className="btn btn-gold fade-on-scroll">
                Read Methodology
              </Link>
            </div>

            <div className="space-y-6">
              {[
                { n: '01', title: 'Manuscript Authentication', desc: 'Primary review of Arabic and Hebrew manuscripts against critical editions.' },
                { n: '02', title: 'Philological Translation', desc: 'Line-by-line rendering with apparatus noting manuscript variants and lacunae.' },
                { n: '03', title: 'Phytochemical Mapping', desc: 'Identification of active compounds via HPLC, NMR, and LC-MS databases.' },
                { n: '04', title: 'Clinical Evidence Review', desc: 'Systematic literature review against PUBMED, Cochrane, and WHO monographs.' },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className="flex gap-5 fade-on-scroll"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span
                    className="t-label shrink-0 mt-1"
                    style={{ color: 'var(--color-accent)', width: '2rem' }}
                  >
                    {step.n}
                  </span>
                  <div
                    style={{ borderLeft: '1px solid rgba(201,140,36,0.25)', paddingLeft: '1.25rem' }}
                  >
                    <h4 className="font-medium mb-1" style={{ color: 'var(--color-bg)' }}>
                      {step.title}
                    </h4>
                    <p className="text-sm" style={{ color: 'rgba(253,248,240,0.5)' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="section text-center"
        style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="container" style={{ maxWidth: '48rem' }}>
          <div className="ornament-rule mb-8 fade-on-scroll" />
          <h2 className="t-heading-1 mb-4 fade-on-scroll">Collaborate With HTP</h2>
          <p
            className="t-body mb-8 fade-on-scroll"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            We welcome partnerships with research institutions, pharmaceutical companies,
            clinical investigators, and independent scholars working at the intersection of
            medical history, ethnobotany, and translational research.
          </p>
          <Link href="/contact" className="btn btn-primary fade-on-scroll">
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
