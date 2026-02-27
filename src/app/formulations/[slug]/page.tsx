import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formulations, getFormulationBySlug } from '@/data/formulations';
import DisclaimerBanner from '@/components/DisclaimerBanner';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return formulations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFormulationBySlug(params.slug);
  if (!f) return {};
  return { title: f.name, description: f.tagline };
}

const statusMeta = {
  'peer-reviewed': { label: 'Peer-Reviewed Evidence', color: '#1f9f6e' },
  'historical':    { label: 'Historical Documentation', color: '#c98c24' },
  'in-progress':   { label: 'Research In Progress', color: '#9a8b77' },
};

export default function FormulationDetailPage({ params }: Props) {
  const f = getFormulationBySlug(params.slug);
  if (!f) notFound();

  const status = statusMeta[f.researchStatus];

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--color-ink)',
          paddingBlock: 'clamp(4rem,8vw,7rem)',
          borderBottom: '3px solid var(--color-accent)',
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link
              href="/formulations"
              className="t-label"
              style={{ color: 'rgba(253,248,240,0.4)', textDecoration: 'none' }}
            >
              Formulations
            </Link>
            <span style={{ color: 'rgba(253,248,240,0.2)' }}>&rsaquo;</span>
            <span className="t-label" style={{ color: 'var(--color-accent)' }}>
              {f.tradeName}
            </span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>
                  {f.category}
                </span>
                <span
                  className="badge"
                  style={{
                    background: `${status.color}18`,
                    color: status.color,
                    borderColor: `${status.color}40`,
                  }}
                >
                  {status.label}
                </span>
              </div>

              <h1
                className="t-heading-1 mb-2"
                style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-cormorant)' }}
              >
                {f.name}
              </h1>
              <p className="t-label mb-6" style={{ color: 'var(--color-accent)' }}>
                {f.tradeName} &middot; {f.serving}
              </p>
              <p
                className="text-base italic"
                style={{ color: 'rgba(253,248,240,0.65)', lineHeight: 1.7 }}
              >
                {f.tagline}
              </p>

              {/* Dossier download */}
              {f.dossierUrl && (
                <a
                  href={f.dossierUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold mt-6"
                  style={{ fontSize: '0.75rem' }}
                >
                  Download Technical Dossier (PDF)
                </a>
              )}
            </div>

            {/* Product image + source card */}
            <div className="space-y-6">
              {f.image && (
                <div
                  className="flex items-center justify-center p-8"
                  style={{
                    background: 'rgba(253,248,240,0.06)',
                    border: '1px solid rgba(201,140,36,0.15)',
                  }}
                >
                  <Image
                    src={f.image}
                    alt={f.name}
                    width={240}
                    height={240}
                    style={{ objectFit: 'contain', maxHeight: '220px' }}
                  />
                </div>
              )}
              <div
                className="card-manuscript p-6"
                style={{ background: 'rgba(253,248,240,0.04)' }}
              >
                <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
                  Historical Source
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.2rem',
                    color: 'rgba(253,248,240,0.9)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {f.historicalSource}
                </p>
                {f.historicalSourceArabic && (
                  <p className="t-arabic mb-1" style={{ color: 'rgba(253,248,240,0.6)', fontSize: '1.05rem' }}>
                    {f.historicalSourceArabic}
                  </p>
                )}
                {f.historicalSourceHebrew && (
                  <p className="t-hebrew" style={{ color: 'rgba(253,248,240,0.6)', fontSize: '0.95rem' }}>
                    {f.historicalSourceHebrew}
                  </p>
                )}
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(201,140,36,0.2)' }}>
                  <p className="t-label mb-0.5" style={{ color: 'rgba(253,248,240,0.4)' }}>Primary Scholar</p>
                  <p style={{ color: 'rgba(253,248,240,0.85)', fontSize: '0.95rem' }}>{f.primaryScholar}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(253,248,240,0.4)' }}>{f.period}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerBanner text={f.disclaimer} />

      {/* ── BODY ── */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="md:col-span-2">
              {/* Summary */}
              <div className="mb-12 fade-on-scroll">
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>
                  Historical Context &amp; Pharmacognostic Summary
                </p>
                <p
                  className="prose-htp t-body"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--color-ink)' }}
                >
                  {f.summary}
                </p>
              </div>

              {/* Supplement Facts Table */}
              <div className="mb-12 fade-on-scroll">
                <p className="t-label mb-6" style={{ color: 'var(--color-accent)' }}>
                  Supplement Facts &mdash; Serving Size: {f.serving}
                </p>
                <div className="space-y-3">
                  {f.keyIngredients.map((ing, i) => (
                    <div
                      key={ing.name}
                      className="card-manuscript p-5 fade-on-scroll"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-baseline gap-3 mb-1">
                            <p
                              style={{
                                fontFamily: 'var(--font-cormorant)',
                                fontSize: '1.15rem',
                                fontWeight: 500,
                              }}
                            >
                              {ing.name}
                            </p>
                            <span
                              style={{
                                fontFamily: 'var(--font-ibm-mono)',
                                fontSize: '0.8rem',
                                color: 'var(--color-emerald)',
                                fontWeight: 500,
                              }}
                            >
                              {ing.amount}
                            </span>
                          </div>
                          {ing.standardisation && (
                            <p className="text-xs mb-1" style={{ color: 'var(--color-ink-faint)', fontFamily: 'var(--font-ibm-mono)' }}>
                              Std. to {ing.standardisation}
                            </p>
                          )}
                          {ing.arabicName && (
                            <p className="t-arabic text-sm" style={{ color: 'var(--color-ink-muted)' }}>{ing.arabicName}</p>
                          )}
                          {ing.hebrewName && (
                            <p className="t-hebrew text-sm" style={{ color: 'var(--color-ink-muted)' }}>{ing.hebrewName}</p>
                          )}
                        </div>
                        <div>
                          <p className="t-label mb-1" style={{ color: 'var(--color-ink-faint)' }}>Therapeutic Role</p>
                          <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>{ing.role}</p>
                          {ing.modernEquivalent && (
                            <>
                              <p className="t-label mt-2 mb-1" style={{ color: 'var(--color-ink-faint)' }}>Modern Botanical ID</p>
                              <p className="text-xs" style={{ fontFamily: 'var(--font-ibm-mono)', color: 'var(--color-emerald)' }}>
                                {ing.modernEquivalent}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: 'var(--color-ink-faint)' }}>
                  Other Ingredients: {f.otherIngredients}
                </p>
              </div>

              {/* Clinical notes */}
              <div className="fade-on-scroll">
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>Clinical Research Notes</p>
                <div className="p-6" style={{ background: 'rgba(31,159,110,0.05)', border: '1px solid rgba(31,159,110,0.2)' }}>
                  <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)' }}>{f.clinicalNotes}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick facts */}
              <div className="card-manuscript p-6 fade-on-scroll">
                <p className="t-label mb-4" style={{ color: 'var(--color-accent)' }}>Quick Reference</p>
                <dl className="space-y-3">
                  {[
                    { dt: 'Category',    dd: f.category.charAt(0).toUpperCase() + f.category.slice(1) },
                    { dt: 'Code',        dd: f.tradeName },
                    { dt: 'Serving',     dd: f.serving },
                    { dt: 'Scholar',     dd: f.primaryScholar },
                    { dt: 'Period',      dd: f.period },
                    { dt: 'Ingredients', dd: `${f.keyIngredients.length} documented` },
                    { dt: 'Status',      dd: statusMeta[f.researchStatus].label },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex justify-between gap-3" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                      <dt className="t-label text-xs" style={{ color: 'var(--color-ink-faint)' }}>{dt}</dt>
                      <dd className="text-xs text-right" style={{ color: 'var(--color-ink-muted)' }}>{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* PDF Dossier CTA */}
              {f.dossierUrl && (
                <div className="p-6 text-center fade-on-scroll" style={{ background: 'var(--color-ink)', border: '1px solid rgba(201,140,36,0.25)' }}>
                  <p className="t-label mb-3" style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}>Technical Dossier</p>
                  <p className="text-sm mb-4" style={{ color: 'rgba(253,248,240,0.65)' }}>
                    Full dossier with manuscript citations, evidence matrix, ingredient profiles, and references.
                  </p>
                  <a href={f.dossierUrl} target="_blank" rel="noreferrer" className="btn btn-gold w-full justify-center text-xs">
                    View PDF Dossier
                  </a>
                </div>
              )}

              {/* Contact */}
              <div className="p-6 text-center fade-on-scroll" style={{ background: 'rgba(201,140,36,0.05)', border: '1px solid rgba(201,140,36,0.15)' }}>
                <p className="t-label mb-3" style={{ color: 'var(--color-accent)', fontSize: '0.65rem' }}>Institutional Access</p>
                <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                  Request expanded clinical dossier with GRADE-graded evidence summaries.
                </p>
                <Link href="/contact" className="btn btn-outline w-full justify-center text-xs">
                  Request Full Dossier
                </Link>
              </div>

              <Link href="/formulations" className="btn btn-outline w-full justify-center fade-on-scroll" style={{ fontSize: '0.75rem' }}>
                &larr; All Formulations
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
