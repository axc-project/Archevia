import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Archevia and the Historical Translation Project — our mission, goals, and research methodology.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Archevia™ &amp; the Historical Translation Project™"
        subtitle="Archevia develops evidence-based botanical formulations in collaboration with the Historical Translation Project, a research initiative focused on the classical Islamic-Jewish medical corpus."
        arabicQuote={'العلم نور'}
        arabicAttribution="Classical Arabic proverb — ‘Knowledge is light.’"
      />

      {/* ── What the HTP Does ── */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                The Historical Translation Project™
              </span>
              <h2 className="t-heading-2 mt-2 mb-6">What We Do</h2>
              <div className="prose-htp space-y-4" style={{ color: 'var(--color-ink-muted)' }}>
                <p>
                  The Historical Translation Project™ (HTP) translates classical medical texts
                  from the medieval Islamic-Jewish tradition and uses AI-assisted analysis to
                  identify modern botanical equivalents of historically documented remedies.
                  The primary focus is the pharmacognostic and dietetic treatises of Moses
                  Maimonides (Rambam), Ibn Sīnā (Avicenna), and Ibn Zuhr (Avenzoar).
                </p>
                <p>
                  Archevia™ is the consumer-facing supplement brand that emerges from this
                  research. Each formulation is grounded in translated manuscript sources and
                  cross-referenced against modern peer-reviewed evidence before becoming a product.
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
                  Translate primary-source medical texts from the medieval
                  Islamic-Jewish tradition, working from available Arabic and Hebrew
                  manuscripts and published critical editions.
                </p>
                <p>
                  Bridge the gap between historical pharmacognosy and modern evidence-based
                  phytotherapy by mapping classical botanical descriptions to contemporary
                  phytochemical profiles and clinical literature.
                </p>
                <p>
                  Develop botanical supplement formulations that are transparent in their
                  historical lineage, ingredient quantities, evidence basis, and safety
                  profiles — and make this information publicly accessible.
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
                title: 'Manuscript Translation',
                desc: 'We translate medical passages from available original Arabic and Hebrew manuscripts, focusing on texts with clear pharmaceutical content — ingredient lists, preparation methods, and clinical observations.',
              },
              {
                n: '02',
                title: 'AI-Assisted Identification',
                desc: 'Classical botanical names are matched to modern species using AI analysis and botanical reference databases, accounting for regional naming variations and taxonomic changes.',
              },
              {
                n: '03',
                title: 'Scientific Evidence Review',
                desc: 'Each identified ingredient is cross-referenced against the peer-reviewed literature — PubMed, Cochrane, clinical trial registries — to find modern evidence supporting (or contradicting) the historical use.',
              },
              {
                n: '04',
                title: 'Formulation Development',
                desc: 'Ingredients with both historical documentation and meaningful modern evidence become candidates for Archevia™ formulations, with dosing based on published clinical studies and full safety documentation.',
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
                arabic: 'موسى بن ميمون',
                dates: '1138–1204 CE',
                works: 'Regimen of Health, On Asthma, On Poisons, Medical Aphorisms',
              },
              {
                name: 'Ibn Sīnā (Avicenna)',
                arabic: 'ابن سينا',
                dates: '980–1037 CE',
                works: 'Al-Qānūn fī al-Ṭibb (The Canon of Medicine)',
              },
              {
                name: 'Ibn Zuhr (Avenzoar)',
                arabic: 'ابن زهر',
                dates: '1094–1162 CE',
                works: 'Kitāb al-Taysīr, Kitāb al-Agdhiya',
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
