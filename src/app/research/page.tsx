import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Research Methodology',
  description:
    'How the Historical Translation Project translates classical medical manuscripts and uses AI-assisted analysis to develop evidence-based botanical formulations.',
};

const corpus = [
  {
    id: 'rambam',
    scholar: 'Moses Maimonides (Rambam)',
    arabicName: 'موسى بن ميمون',
    hebrewName: 'משה בן מימון',
    dates: '1138–1204 CE',
    works: [
      { title: 'Regimen of Health', arabic: 'تدبير الصحة', focus: 'Dietetics, gastric temperament, aromatic botanicals' },
      { title: 'On Asthma', arabic: 'مقالة في الربو', focus: 'Respiratory phytotherapy, air quality, humoral imbalance' },
      { title: 'On Poisons & Their Antidotes', arabic: 'المقالة في الترياق', focus: 'Toxicology, antidotal compounds' },
      { title: 'Medical Aphorisms (25 vols.)', arabic: 'الفصول في الطب', focus: 'Systematic clinical pharmacology derived from Galen' },
    ],
  },
  {
    id: 'avicenna',
    scholar: 'Ibn Sīnā (Avicenna)',
    arabicName: 'أبو علي الحسين بن عبد الله بن سينا',
    dates: '980–1037 CE',
    works: [
      { title: 'Al-Qānūn fī al-Ṭibb — Book II', arabic: 'القانون في الطب', focus: 'Materia medica: 800+ simple drugs' },
      { title: 'Al-Qānūn fī al-Ṭibb — Book IV', arabic: 'القانون في الطب', focus: 'Compound remedies, pulmonary & neurological formulations' },
    ],
  },
  {
    id: 'avenzoar',
    scholar: 'Ibn Zuhr (Avenzoar)',
    arabicName: 'أبو مروان عبد الملك بن زهر',
    dates: '1094–1162 CE',
    works: [
      { title: 'Kitāb al-Taysīr', arabic: 'كتاب التيسير في المداواة والتدبير', focus: 'Clinical pharmacotherapy, empirical case studies' },
      { title: 'Kitāb al-Agdhiya', arabic: 'كتاب الأغذية', focus: 'Nutritional pharmacology, food as medicine' },
    ],
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research Methodology"
        title="From Ancient Manuscript to Modern Formulation"
        subtitle="We translate classical medical texts, identify their botanical ingredients using AI-assisted analysis, and validate them against current peer-reviewed evidence."
      />

      {/* Our Approach */}
      <section className="section">
        <div className="container" style={{ maxWidth: 'var(--prose-max)' }}>
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Our Approach
          </span>
          <h2 className="t-heading-2 mt-2 mb-6">What We Do</h2>
          <div className="space-y-4">
            <p className="t-body" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.8 }}>
              The Historical Translation Project begins with original medical manuscripts from the
              Islamic-Jewish scholarly tradition — texts written by physician-scholars like
              Maimonides, Avicenna, and Avenzoar between the 10th and 13th centuries. These texts
              contain detailed descriptions of botanical remedies, compound formulations, and
              therapeutic observations developed over centuries of clinical practice.
            </p>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.8 }}>
              We translate these manuscripts from their original Arabic and Hebrew, then use
              AI-assisted analysis to identify the modern-day botanical equivalents of the
              ingredients described in the classical texts. Once identified, we cross-reference
              each ingredient against the current scientific literature — peer-reviewed studies,
              clinical trials, and pharmacological research — to determine whether modern evidence
              supports the historical uses described in the manuscripts.
            </p>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.8 }}>
              Where the historical record and modern science converge, we develop formulations
              that honour the original scholarship while meeting contemporary standards for
              ingredient quality, dosing, and safety. This is an ongoing, evolving project —
              as we translate more texts and as new research emerges, our formulations and
              recommendations continue to be refined and expanded.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            The Process
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">How a Formulation Takes Shape</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                n: '01',
                title: 'Manuscript Translation',
                detail: 'We work from available editions and manuscripts of classical medical texts — translating passages that describe botanical remedies, compound formulations, and their intended applications from the original Arabic and Hebrew into English. Our focus is on texts with clear pharmaceutical content: ingredient lists, preparation methods, and clinical observations recorded by the original physician-authors.',
              },
              {
                n: '02',
                title: 'AI-Assisted Botanical Identification',
                detail: 'Historical texts use classical Arabic and Hebrew names for plants and minerals that don’t always have obvious modern equivalents. We use AI analysis alongside botanical reference databases to identify the most likely modern-day species and compounds corresponding to each historical ingredient — accounting for regional naming variations, taxonomic changes, and historical context.',
              },
              {
                n: '03',
                title: 'Scientific Evidence Review',
                detail: 'For each identified ingredient, we search the peer-reviewed literature — PubMed, Cochrane, clinical trial registries — for modern scientific evidence that supports (or contradicts) the historical use. We document the type and strength of evidence available: from laboratory studies through to randomised controlled trials. Where evidence is limited or absent, we say so clearly.',
              },
              {
                n: '04',
                title: 'Formulation Development',
                detail: 'When an ingredient has both strong historical documentation and meaningful modern evidence, it becomes a candidate for an Archevia™ formulation. We determine appropriate dosing based on published clinical studies, consider bioavailability and safety profiles, and assemble formulations that group complementary ingredients. Every formulation is documented in a technical dossier with full references.',
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
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing project */}
      <section className="section">
        <div className="container" style={{ maxWidth: 'var(--prose-max)' }}>
          <div
            className="card-manuscript p-8 fade-on-scroll"
            style={{ borderLeft: '3px solid var(--color-accent)' }}
          >
            <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
              An Ongoing Project
            </p>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.8 }}>
              The Historical Translation Project is not a finished body of work — it is a living,
              evolving research programme. We are continually translating new manuscript sources,
              identifying additional botanical ingredients, and incorporating the latest published
              evidence into our formulations. As new clinical trials are completed and new texts
              are translated, our database of monographs, formulations, and pathway analyses
              will continue to grow and be refined. We believe the best formulations come from
              an honest, iterative process — not from claiming more certainty than the evidence warrants.
            </p>
          </div>
        </div>
      </section>

      {/* Corpus */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Primary Corpus
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Source Texts Under Active Study</h2>

          <div className="space-y-10">
            {corpus.map((c, i) => (
              <div
                key={c.id}
                id={c.id}
                className="card-manuscript p-8 fade-on-scroll"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="t-heading-3 mb-1">{c.scholar}</h3>
                    <p
                      className="t-arabic mb-1"
                      style={{ color: 'var(--color-ink-muted)', fontSize: '1rem' }}
                    >
                      {c.arabicName}
                    </p>
                    {c.hebrewName && (
                      <p
                        className="t-hebrew"
                        style={{ color: 'var(--color-ink-muted)', fontSize: '0.9rem' }}
                      >
                        {c.hebrewName}
                      </p>
                    )}
                    <p
                      className="t-label mt-3"
                      style={{ color: 'var(--color-ink-faint)' }}
                    >
                      {c.dates}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                      Active Source Texts
                    </p>
                    <div className="space-y-3">
                      {c.works.map((w) => (
                        <div
                          key={w.title}
                          className="flex gap-4 pb-3"
                          style={{ borderBottom: '1px solid var(--color-border)' }}
                        >
                          <span className="geo-diamond mt-1.5 shrink-0" />
                          <div>
                            <p
                              style={{
                                fontFamily: 'var(--font-cormorant)',
                                fontWeight: 500,
                                fontSize: '1.05rem',
                              }}
                            >
                              {w.title}
                            </p>
                            <p
                              className="t-arabic text-sm"
                              style={{ color: 'var(--color-ink-muted)' }}
                            >
                              {w.arabic}
                            </p>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: 'var(--color-ink-faint)' }}
                            >
                              Focus: {w.focus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section">
        <div className="container" style={{ maxWidth: 'var(--prose-max)' }}>
          <div
            className="p-8 fade-on-scroll"
            style={{
              background: 'rgba(201,140,36,0.05)',
              border: '1px solid rgba(201,140,36,0.2)',
            }}
          >
            <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
              Important Note
            </p>
            <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              All Archevia™ formulations are dietary supplements. They are not intended to diagnose,
              treat, cure, or prevent any disease. The historical manuscript references provide
              scholarly context but do not constitute clinical evidence. Formulation dossiers
              clearly distinguish between historical documentation and modern scientific evidence.
              Always consult a qualified healthcare professional before starting any supplement regimen.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section text-center"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="container" style={{ maxWidth: '48rem' }}>
          <div className="ornament-rule mb-8 fade-on-scroll" />
          <h2 className="t-heading-2 mb-4 fade-on-scroll">Explore the Evidence</h2>
          <p
            className="t-body mb-8 fade-on-scroll"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Browse our curated database of 49 ingredient monographs — each with historical
            context, modern evidence, active compounds, and peer-reviewed references. Or explore
            the Pathway Explorer for intervention-level data from our published research.
          </p>
          <div className="flex justify-center flex-wrap gap-4 fade-on-scroll">
            <Link href="/monographs" className="btn btn-primary">
              Browse Monographs
            </Link>
            <Link href="/pathways" className="btn btn-outline">
              Pathway Explorer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
