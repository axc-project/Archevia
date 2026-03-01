import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Research Methodology',
  description:
    'The four-stage manuscript authentication and phytochemical mapping methodology used by the Historical Translation Project™.',
};

const corpus = [
  {
    id: 'rambam',
    scholar: 'Moses Maimonides (Rambam)',
    arabicName: 'موسى بن ميمون',
    hebrewName: 'משה בן מיימון',
    dates: '1138–1204 CE',
    works: [
      { title: 'Regimen of Health', arabic: 'تدبير الصحة', hebrew: 'הנהגת הבריאות', focus: 'Dietetics, gastric temperament, aromatic botanicals' },
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
        title="How We Authenticate & Translate"
        subtitle="Every HTP formulation undergoes a rigorous four-stage process designed to ensure philological fidelity and modern scientific relevance."
      />

      {/* Four Stages */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                n: '01',
                title: 'Primary Manuscript Review',
                detail: `All translations originate from authenticated manuscript traditions — Leiden Oriental Collection, Cairo National Library critical editions, and the Vatican Apostolic Library holdings. We do not rely on secondary or tertiary printed editions without independent manuscript verification. Each text is reviewed in original Judeo-Arabic, classical Arabic, or medieval Hebrew.`,
              },
              {
                n: '02',
                title: 'Philological Translation & Apparatus',
                detail: `Line-by-line rendering includes full apparatus noting manuscript variants, scribal errors (tahrīf), lacunae, and editorial emendations. Where multiple manuscript recensions exist, we produce a critical collation. Technical botanical and pharmaceutical terminology is cross-referenced against Dozy's Supplément, Lane's Arabic-English Lexicon, and Jastrow's Dictionary of the Targumim.`,
              },
              {
                n: '03',
                title: 'Phytochemical Compound Mapping',
                detail: `Botanical identifications proceed from historical Arabic/Hebrew name → taxonomic identification → active compound fingerprint via HPLC, LC-MS, and NMR reference databases. We cross-reference against the WHO Monographs on Selected Medicinal Plants, ESCOP Monographs, and NCBI PubChem compound database to confirm botanical identity and principal phytochemical constituents.`,
              },
              {
                n: '04',
                title: 'Clinical Evidence Review',
                detail: `Systematic literature review against PubMed, Cochrane Library, and EMBASE databases. Evidence is graded using GRADE methodology. Formulation dossiers distinguish clearly between (a) historical documentation, (b) preclinical evidence, (c) completed RCT data for individual components, and (d) completed RCT data for full compound formulations. No therapeutic claims are made beyond what the evidence supports.`,
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
                  {/* Scholar header */}
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

                  {/* Works */}
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

      {/* Compliance note */}
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
              Regulatory Framework Awareness
            </p>
            <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              HTP dossiers are prepared with awareness of applicable regulatory frameworks including
              the EU Traditional Herbal Medicinal Products Directive (2004/24/EC), FDA botanical drug
              development guidance, WHO monograph methodology, and the ICH Q8/Q9 pharmaceutical
              development guidelines. All documents are classified as research reference materials
              and do not constitute a regulatory submission or marketing authorisation application.
            </p>
          </div>
        </div>
      </section>
      {/* Monograph Database CTA */}
      <section
        className="section text-center"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="container" style={{ maxWidth: '48rem' }}>
          <div className="ornament-rule mb-8 fade-on-scroll" />
          <h2 className="t-heading-2 mb-4 fade-on-scroll">Ingredient Evidence Library</h2>
          <p
            className="t-body mb-8 fade-on-scroll"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Browse our curated database of 49 ingredient monographs spanning 11 therapeutic
            categories — each with historical context, modern evidence, active compounds,
            and peer-reviewed references.
          </p>
          <a href="/monographs" className="btn btn-primary fade-on-scroll">
            Browse Monographs
          </a>
        </div>
      </section>
    </>
  );
}
