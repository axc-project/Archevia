import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Archevia and the Historical Translation Project \u2014 our mission, goals, and research methodology.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Archevia\u2122 &amp; the Historical Translation Project\u2122"
        subtitle="Archevia develops evidence-based botanical formulations in collaboration with the Historical Translation Project, a research initiative focused on the classical Islamic-Jewish medical corpus."
        arabicQuote={'\u0627\u0644\u0639\u0644\u0645 \u0646\u0648\u0631'}
        arabicAttribution="Classical Arabic proverb \u2014 \u2018Knowledge is light.\u2019"
      />

      {/* ── What the HTP Does ── */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                The Historical Translation Project\u2122
              </span>
              <h2 className="t-heading-2 mt-2 mb-6">What We Do</h2>
              <div className="prose-htp space-y-4" style={{ color: 'var(--color-ink-muted)' }}>
                <p>
                  The Historical Translation Project\u2122 (HTP) translates, authenticates, and
                  contextualises canonical medical texts of the medieval Islamic-Jewish world.
                  The primary focus is the pharmacognostic and dietetic treatises of Moses
                  Maimonides (Rambam), Ibn S\u012bn\u0101 (Avicenna), and Ibn Zuhr (Avenzoar).
                </p>
                <p>
                  Archevia\u2122 is the consumer-facing supplement brand that emerges from this
                  research. Each formulation is grounded in manuscript-level scholarship and
                  cross-referenced against modern clinical evidence before becoming a product.
                </p>
              </div>
            </div>

            <div>
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                Goals
              </span>
              <h2 className="t-heading-2 mt-2 mb-6">What We Aim to Achieve</h2>
              <div className="prose-htp space-y-4" style={{ color: 'var(--color-ink-muted)' }}>
                <p>
                  Recover and translate primary-source medical texts from the medieval
                  Islamic-Jewish tradition, working from authenticated Arabic and Hebrew
                  manuscripts rather than secondary compilations.
                </p>
                <p>
                  Bridge the gap between historical pharmacognosy and modern evidence-based
                  phytotherapy by mapping classical botanical descriptions to contemporary
                  phytochemical profiles and clinical literature.
                </p>
                <p>
                  Develop botanical supplement formulations that are transparent in their
                  historical lineage, ingredient quantities, evidence basis, and safety
                  profiles \u2014 and make this information publicly accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            How We Work
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Research Methodology</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                n: '01',
                title: 'Manuscript Review',
                desc: 'Identification and review of primary manuscripts in Judeo-Arabic, classical Arabic, and medieval Hebrew. We prioritise authenticated critical editions and cross-reference multiple manuscript traditions where available.',
              },
              {
                n: '02',
                title: 'Translation & Contextualisation',
                desc: 'Line-by-line rendering of relevant pharmacognostic passages, noting terminology variants and botanical identifications. Historical context is provided alongside each translation.',
              },
              {
                n: '03',
                title: 'Phytochemical Identification',
                desc: 'Historical botanical names are mapped to modern taxonomy and active compound profiles using peer-reviewed pharmacognosy databases, WHO monographs, and ESCOP references.',
              },
              {
                n: '04',
                title: 'Evidence Review & Formulation',
                desc: 'Systematic review of modern clinical literature (PubMed, Cochrane, EMBASE) for each ingredient. Formulations are designed with documented quantities, standardisation details, and safety profiles.',
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className="card-manuscript p-8 fade-on-scroll"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p
                  className="t-label mb-3"
                  style={{
                    color: 'var(--color-accent)',
                    fontSize: '2rem',
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                  }}
                >
                  {step.n}
                </p>
                <h3 className="t-heading-3 mb-4">{step.title}</h3>
                <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primary Scholars ── */}
      <section className="section">
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Primary Corpus
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">The Scholars We Study</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Moses Maimonides (Rambam)',
                arabic: '\u0645\u0648\u0633\u0649 \u0628\u0646 \u0645\u064a\u0645\u0648\u0646',
                dates: '1138\u20131204 CE',
                works: 'Regimen of Health, On Asthma, On Poisons, Medical Aphorisms',
              },
              {
                name: 'Ibn S\u012bn\u0101 (Avicenna)',
                arabic: '\u0627\u0628\u0646 \u0633\u064a\u0646\u0627',
                dates: '980\u20131037 CE',
                works: 'Al-Q\u0101n\u016bn f\u012b al-\u1e6cibb (The Canon of Medicine)',
              },
              {
                name: 'Ibn Zuhr (Avenzoar)',
                arabic: '\u0627\u0628\u0646 \u0632\u0647\u0631',
                dates: '1094\u20131162 CE',
                works: 'Kit\u0101b al-Tays\u012br, Kit\u0101b al-Agdhiya',
              },
            ].map((s, i) => (
              <div
                key={s.name}
                className="card-manuscript p-8 fade-on-scroll"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <p className="t-label mb-1" style={{ color: 'var(--color-accent)' }}>
                  {s.dates}
                </p>
                <h3 className="t-heading-3 mb-1">{s.name}</h3>
                <p className="t-arabic mt-1 mb-4" style={{ color: 'var(--color-ink-muted)', fontSize: '1rem' }}>
                  {s.arabic}
                </p>
                <p className="t-label mb-1" style={{ color: 'var(--color-ink-faint)' }}>Key Works</p>
                <p className="text-sm italic" style={{ color: 'var(--color-ink-muted)' }}>{s.works}</p>
              </div>
            ))}
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
          <h2 className="t-heading-2 mb-4 fade-on-scroll">Explore the Research</h2>
          <p className="t-body mb-8 fade-on-scroll" style={{ color: 'var(--color-ink-muted)' }}>
            Browse our formulations, ingredient monograph database, technical dossiers,
            and published works.
          </p>
          <div className="flex flex-wrap gap-4 justify-center fade-on-scroll">
            <Link href="/formulations" className="btn btn-primary">Formulations</Link>
            <Link href="/monographs" className="btn btn-outline">Monograph Database</Link>
            <Link href="/publications" className="btn btn-outline">Publications</Link>
          </div>
        </div>
      </section>
    </>
  );
}
