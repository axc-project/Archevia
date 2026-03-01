import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Publications & Resources',
  description:
    'Books, research papers, and scholarly resources published by the Historical Translation Project\u2122.',
};

const books = [
  {
    title: 'Rambam\u2019s Guide to Health',
    subtitle: 'A Practical Modern Interpretation',
    author: 'Avi Rosenberg',
    year: '2024',
    image: '/images/books/rambam-cover.jpg',
    description:
      'A structured guide to preventive health drawn from Maimonides\u2019 principles \u2014 translated into modern language and organised into actionable frameworks. The book emphasises routine, digestion, timing, and constitutional balance as the foundation of long-term resilience. Includes Appendix A: a 30-ingredient pharmacopoeia mapping historical botanicals to modern phytochemistry.',
    amazonUrl: 'https://www.amazon.com/dp/B0DFB7TQR8',
    category: 'Primary Text',
    status: 'Available',
  },
  {
    title: 'Cancer Across Time and Civilizations',
    subtitle: 'A Historical and Biological Translation',
    author: 'Avi Rosenberg',
    year: '2025',
    image: '/images/books/cancer-cover.jpg',
    description:
      'A sweeping narrative that tracks how civilizations described malignant growth, systemic decline, and terrain across time \u2014 then maps those observations onto modern biology. Built for clinicians and serious readers, it frames historical insight as a lens for supportive strategy without making treatment claims.',
    amazonUrl: 'https://www.amazon.com/dp/B0DTFRRFK1',
    category: 'Research Monograph',
    status: 'Available',
  },
];

const papers = [
  {
    title: 'Formulation Optimisation Review',
    subtitle: 'Four-Formula Comprehensive Assessment',
    description:
      'A complete optimisation review of the four core HTP formulations \u2014 covering modern supplement landscape analysis, formula-by-formula evidence assessment, dose rationale, and pill burden considerations.',
    type: 'Internal Research Document',
    date: 'February 2026',
    status: 'In Preparation',
  },
  {
    title: 'Pill Burden Optimisation & Berberine Evaluation',
    subtitle: 'Addendum to the Formulation Optimisation Review',
    description:
      'Supplement addressing compliance rates, tiered product architecture strategy, and a dedicated evaluation of berberine HCl as a standalone metabolic support module.',
    type: 'Internal Research Document',
    date: 'February 2026',
    status: 'In Preparation',
  },
];

const externalResources = [
  {
    title: 'WHO Monographs on Selected Medicinal Plants, Vols. 1\u20134',
    url: 'https://www.who.int/publications/i/item/9241545178',
    description: 'The primary international reference for botanical drug monographs. HTP cross-references all formulations against WHO monograph data.',
  },
  {
    title: 'ESCOP Monographs (European Scientific Cooperative on Phytotherapy)',
    url: 'https://escop.com/monographs/',
    description: 'European phytotherapy monographs providing clinical evidence summaries and therapeutic indications for botanical medicines.',
  },
  {
    title: 'EMA/HMPC Herbal Monographs',
    url: 'https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products',
    description: 'European Medicines Agency herbal monographs with traditional use and well-established use classifications.',
  },
  {
    title: 'NCCIH Herbs at a Glance',
    url: 'https://www.nccih.nih.gov/health/herbsataglance',
    description: 'National Center for Complementary and Integrative Health \u2014 evidence summaries for common botanicals.',
  },
  {
    title: 'Cochrane Library \u2014 Complementary Medicine',
    url: 'https://www.cochranelibrary.com/',
    description: 'Systematic reviews and meta-analyses \u2014 the gold standard for clinical evidence synthesis.',
  },
  {
    title: 'PubChem Compound Database',
    url: 'https://pubchem.ncbi.nlm.nih.gov/',
    description: 'NCBI chemical compound reference used for active compound fingerprinting in HTP phytochemical mapping.',
  },
];

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publications & Resources"
        title="Foundational Texts & Research"
        subtitle="The primary publications and scholarly resources that anchor the Historical Translation Project\u2122 research programme."
      />

      {/* ── BOOKS ── */}
      <section className="section">
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Books
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Published Volumes</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {books.map((book, i) => (
              <article
                key={book.title}
                className="card-manuscript flex flex-col fade-on-scroll"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* Top accent */}
                <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />

                {/* Book cover */}
                {book.image && (
                  <div
                    className="flex items-center justify-center"
                    style={{
                      background: 'var(--color-bg-alt)',
                      padding: '2rem',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={180}
                      height={260}
                      style={{ objectFit: 'contain', maxHeight: '240px', boxShadow: '0 4px 20px rgba(30,23,20,0.15)' }}
                    />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-gold">{book.category}</span>
                    <span className="badge badge-emerald">{book.status}</span>
                  </div>

                  <h3
                    className="t-heading-3 mb-1"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {book.title}
                  </h3>
                  <p className="t-label mb-1" style={{ color: 'var(--color-accent)' }}>
                    {book.subtitle}
                  </p>
                  <p className="text-xs mb-4" style={{ color: 'var(--color-ink-faint)' }}>
                    {book.author} \u00b7 {book.year}
                  </p>

                  <p
                    className="t-body text-sm mb-6"
                    style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}
                  >
                    {book.description}
                  </p>

                  <div className="mt-auto flex gap-3">
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: '0.7rem' }}
                    >
                      Purchase on Amazon \u2192
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH PAPERS ── */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            Research Documents
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Working Papers</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper, i) => (
              <div
                key={paper.title}
                className="card-manuscript p-8 fade-on-scroll"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-ink">{paper.type}</span>
                  <span className="badge badge-gold">{paper.status}</span>
                </div>
                <h3 className="t-heading-3 mb-1">{paper.title}</h3>
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  {paper.subtitle}
                </p>
                <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                  {paper.description}
                </p>
                <p className="text-xs mt-4" style={{ color: 'var(--color-ink-faint)' }}>
                  {paper.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL DOSSIERS ── */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="fade-on-scroll">
              <span className="t-label" style={{ color: 'var(--color-accent)' }}>
                Dossiers
              </span>
              <h2 className="t-heading-2 mt-2 mb-6">Clinician-Ready Formula Dossiers</h2>
              <p className="t-body" style={{ color: 'var(--color-ink-muted)' }}>
                Each HTP formulation has a corresponding technical dossier with: historical lineage
                and manuscript citations, modern evidence signals with GRADE-graded summaries,
                ingredient-by-ingredient rationale, safety and stacking guidance, CYP450 interaction
                profiles, and a curated reference list with DOI/PubMed links.
              </p>
              <div className="flex gap-4 mt-8">
                <Link href="/formulations" className="btn btn-primary">
                  View Formulations
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Request Dossier
                </Link>
              </div>
            </div>
            <div className="fade-on-scroll" style={{ animationDelay: '0.15s' }}>
              <div
                className="p-8"
                style={{
                  background: 'var(--color-ink)',
                  border: '1px solid rgba(201,140,36,0.25)',
                }}
              >
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  Dossier Contents
                </p>
                <ul className="space-y-3">
                  {[
                    'Supplement facts table with standardisation details',
                    'Historical foundation with manuscript citations',
                    'Modern biological overview with mechanism diagrams',
                    'Ingredient-by-ingredient evidence profiles',
                    'CYP450 interaction matrix and safety analysis',
                    'Stacking guidance across the HTP system',
                    '15\u201320+ peer-reviewed references per dossier',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: 'rgba(253,248,240,0.65)' }}
                    >
                      <span style={{ color: 'var(--color-accent)', marginTop: '2px' }}>\u25c6</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXTERNAL RESOURCES ── */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>
            External Resources
          </span>
          <h2 className="t-heading-2 mt-2 mb-10">Reference Databases & Authorities</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalResources.map((res, i) => (
              <a
                key={res.title}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="card-manuscript p-6 flex flex-col fade-on-scroll no-underline group"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <span className="geo-diamond mb-3" />
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {res.title}
                </h3>
                <p className="text-xs flex-1" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                  {res.description}
                </p>
                <span
                  className="t-label mt-4"
                  style={{ color: 'var(--color-emerald)', fontSize: '0.6rem' }}
                >
                  Visit Resource \u2192
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MONOGRAPH DB LINK ── */}
      <section
        className="section text-center"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="container" style={{ maxWidth: '48rem' }}>
          <div className="ornament-rule mb-8 fade-on-scroll" />
          <h2 className="t-heading-2 mb-4 fade-on-scroll">Ingredient Monograph Database</h2>
          <p className="t-body mb-8 fade-on-scroll" style={{ color: 'var(--color-ink-muted)' }}>
            Browse our curated database of 49 ingredient monographs spanning 11 therapeutic
            categories \u2014 each with historical context, modern evidence, active compounds,
            safety notes, and peer-reviewed references.
          </p>
          <Link href="/monographs" className="btn btn-primary fade-on-scroll">
            Browse Monographs
          </Link>
        </div>
      </section>
    </>
  );
}
