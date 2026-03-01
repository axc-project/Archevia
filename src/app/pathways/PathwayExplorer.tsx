'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  interventions,
  pathwayConvergence,
  masterReferences,
  hallmarksFramework,
  type Intervention,
  type PathwayConvergence as PC,
} from '@/data/pathwayData';

/* ── helpers ── */
const allHallmarks = [...new Set(interventions.flatMap((i) => i.hallmarks))].sort();
const categories = [...new Set(interventions.map((i) => i.category))].sort();

const catColors: Record<string, { bg: string; text: string }> = {
  botanical: { bg: '#2d4a22', text: '#b8d4a8' },
  nutritional: { bg: '#4a3a22', text: '#d4c4a8' },
  traditional: { bg: '#3a2244', text: '#c4a8d4' },
  pharmaceutical: { bg: '#22384a', text: '#a8c4d4' },
  interventional: { bg: '#4a2222', text: '#d4a8a8' },
  metabolic: { bg: '#224a44', text: '#a8d4cc' },
};

function EvidenceBadge({ level }: { level: string }) {
  let bg = '#6b5b47';
  if (level.includes('uideline')) bg = '#2d6a4f';
  else if (level.startsWith('RCT')) bg = '#4a6741';
  else if (level.includes('Meta') || level.includes('Phase')) bg = '#8a7a3a';
  else if (level.includes('Animal') || level.includes('Small')) bg = '#7a5a3a';
  return (
    <span
      style={{
        background: bg,
        color: '#fdf8f0',
        padding: '2px 8px',
        fontSize: '0.6rem',
        fontFamily: 'var(--font-ibm-mono)',
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      {level}
    </span>
  );
}

function CatBadge({ cat }: { cat: string }) {
  const c = catColors[cat] || catColors.botanical;
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        padding: '2px 8px',
        fontSize: '0.55rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontFamily: 'var(--font-ibm-mono)',
      }}
    >
      {cat}
    </span>
  );
}

function RefList({ ids }: { ids: number[] }) {
  const refs = ids.map((id) => masterReferences.find((r) => r.id === id)).filter(Boolean);
  if (refs.length === 0) return null;
  return (
    <div style={{ marginTop: '1.25rem' }}>
      <p className="t-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem', marginBottom: '0.5rem' }}>
        Supporting Publications
      </p>
      <div className="space-y-2">
        {refs.map((r) =>
          r ? (
            <div key={r.id} style={{ fontSize: '0.7rem', color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 500, color: 'var(--color-ink)' }}>{r.authors}</span>{' '}
              {r.title}. <em>{r.journal}</em>. {r.year}
              {r.detail ? `; ${r.detail}` : ''}.
              {r.pmid && (
                <>
                  {' '}
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--color-emerald)', textDecoration: 'underline', fontFamily: 'var(--font-ibm-mono)', fontSize: '0.6rem' }}
                  >
                    PMID: {r.pmid}
                  </a>
                </>
              )}
              {r.doi && !r.pmid && (
                <>
                  {' '}
                  <a
                    href={`https://doi.org/${r.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--color-emerald)', textDecoration: 'underline', fontFamily: 'var(--font-ibm-mono)', fontSize: '0.6rem' }}
                  >
                    DOI
                  </a>
                </>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

/* ── main component ── */
export default function PathwayExplorer() {
  const [view, setView] = useState<'interventions' | 'pathways'>('interventions');
  const [search, setSearch] = useState('');
  const [hallmarkFilter, setHallmarkFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selected, setSelected] = useState<Intervention | null>(null);
  const [selectedPW, setSelectedPW] = useState<PC | null>(null);

  const filtered = useMemo(() => {
    return interventions.filter((i) => {
      const s = search.toLowerCase();
      const matchSearch =
        !s ||
        i.name.toLowerCase().includes(s) ||
        i.pathways.some((p) => p.toLowerCase().includes(s)) ||
        i.role.toLowerCase().includes(s) ||
        i.description.toLowerCase().includes(s);
      const matchH = !hallmarkFilter || i.hallmarks.some((h) => h.includes(hallmarkFilter));
      const matchC = !categoryFilter || i.category === categoryFilter;
      return matchSearch && matchH && matchC;
    });
  }, [search, hallmarkFilter, categoryFilter]);

  const filteredPW = useMemo(() => {
    if (!search) return pathwayConvergence;
    const s = search.toLowerCase();
    return pathwayConvergence.filter(
      (p) =>
        p.pathway.toLowerCase().includes(s) ||
        p.interventions.some((i) => i.toLowerCase().includes(s)) ||
        p.hallmarks.some((h) => h.toLowerCase().includes(s))
    );
  }, [search]);

  const relatedPW = selected
    ? pathwayConvergence.filter((p) => p.interventions.some((n) => n === selected.name))
    : [];

  const relatedInt = selectedPW
    ? interventions.filter((i) => selectedPW.interventions.includes(i.name))
    : [];

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--color-ink)', paddingBlock: 'clamp(3rem,8vw,5rem)' }}>
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <span className="geo-diamond" />
            <span className="t-label" style={{ color: 'var(--color-accent)' }}>
              Cancer Across Time and Civilizations — Interactive Reference
            </span>
          </div>
          <h1 className="t-display" style={{ color: 'var(--color-bg)', marginBottom: '0.75rem' }}>
            Pathway Explorer
          </h1>
          <p className="t-body" style={{ color: 'rgba(253,248,240,0.6)', maxWidth: '50rem' }}>
            Searchable database of {interventions.length} interventions, {pathwayConvergence.length} molecular
            pathways, and {masterReferences.length} peer-reviewed publications. Derived from Appendix A &amp; B of the
            published book.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div
        className="disclaimer-banner"
        role="note"
        style={{ paddingBlock: '0.7rem' }}
      >
        <div className="container">
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
              <path d="M8 1L1 13h14L8 1z" stroke="var(--color-accent-dark)" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="6" x2="8" y2="9.5" stroke="var(--color-accent-dark)" strokeWidth="1.5" />
              <circle cx="8" cy="11.5" r="0.75" fill="var(--color-accent-dark)" />
            </svg>
            <p className="text-xs" style={{ color: 'var(--color-accent-dark)', lineHeight: 1.65, fontFamily: 'var(--font-jost)' }}>
              <strong>Research &amp; Educational Use Only. </strong>
              This database organizes published research using the Hallmarks of Cancer academic framework
              (Hanahan &amp; Weinberg, <em>Cell</em> 2000 &amp; 2011). It does not constitute medical advice or
              treatment recommendations. All clinical decisions must be made by qualified healthcare professionals.
              {' '}<Link href="/disclaimer" style={{ textDecoration: 'underline' }}>Full disclaimer</Link>.
            </p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="flex gap-0 mb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
            {[
              { id: 'interventions' as const, label: 'Interventions', count: interventions.length },
              { id: 'pathways' as const, label: 'Pathway Convergence', count: pathwayConvergence.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setView(tab.id);
                  setSelected(null);
                  setSelectedPW(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: view === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                  color: view === tab.id ? 'var(--color-ink)' : 'var(--color-ink-faint)',
                  padding: '0.75rem 1.25rem',
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
                <span
                  style={{
                    marginLeft: '0.4rem',
                    fontFamily: 'var(--font-ibm-mono)',
                    fontSize: '0.6rem',
                    opacity: 0.5,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              type="text"
              placeholder="Search interventions, pathways, or publications…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
              style={{
                minWidth: '240px',
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-ink)',
                padding: '0.6rem 1rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-jost)',
                outline: 'none',
              }}
            />
            {view === 'interventions' && (
              <>
                <select
                  value={hallmarkFilter}
                  onChange={(e) => setHallmarkFilter(e.target.value)}
                  style={{
                    background: 'var(--color-bg-alt)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-jost)',
                  }}
                >
                  <option value="">All Hallmarks</option>
                  {allHallmarks.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    background: 'var(--color-bg-alt)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-jost)',
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* ═══ INTERVENTIONS LIST ═══ */}
          {view === 'interventions' && !selected && (
            <>
              <p className="text-xs mb-4" style={{ color: 'var(--color-ink-faint)' }}>
                {filtered.length} intervention{filtered.length !== 1 ? 's' : ''} — click any row for details,
                references, and pathway connections
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-accent)' }}>
                      {['Intervention', 'Category', 'Hallmark Targets', 'Key Pathways', 'Evidence', 'Assessed Role'].map(
                        (h) => (
                          <th
                            key={h}
                            className="t-label"
                            style={{
                              textAlign: 'left',
                              padding: '0.6rem 0.5rem',
                              fontSize: '0.6rem',
                              color: 'var(--color-accent)',
                            }}
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setSelected(item)}
                        className="cursor-pointer"
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          cursor: 'pointer',
                        }}
                      >
                        <td
                          style={{
                            padding: '0.6rem 0.5rem',
                            fontFamily: 'var(--font-cormorant)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          }}
                        >
                          {item.name}
                        </td>
                        <td style={{ padding: '0.6rem 0.5rem' }}>
                          <CatBadge cat={item.category} />
                        </td>
                        <td
                          style={{
                            padding: '0.6rem 0.5rem',
                            fontSize: '0.7rem',
                            color: 'var(--color-ink-muted)',
                            maxWidth: '200px',
                          }}
                        >
                          {item.hallmarks.join(', ')}
                        </td>
                        <td
                          style={{
                            padding: '0.6rem 0.5rem',
                            fontFamily: 'var(--font-ibm-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-ink-faint)',
                          }}
                        >
                          {item.pathways.slice(0, 3).join(', ')}
                          {item.pathways.length > 3 ? ` +${item.pathways.length - 3}` : ''}
                        </td>
                        <td style={{ padding: '0.6rem 0.5rem' }}>
                          <EvidenceBadge level={item.evidence} />
                        </td>
                        <td style={{ padding: '0.6rem 0.5rem', fontSize: '0.7rem', color: 'var(--color-ink-muted)' }}>
                          {item.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ═══ INTERVENTION DETAIL ═══ */}
          {view === 'interventions' && selected && (
            <div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-accent)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-jost)',
                  marginBottom: '1rem',
                  padding: 0,
                }}
              >
                ← Back to all interventions
              </button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Detail card */}
                <div className="card-manuscript p-6">
                  <div
                    style={{
                      height: '2px',
                      background: 'var(--color-accent)',
                      marginBottom: '1.25rem',
                      marginTop: '-1.5rem',
                      marginLeft: '-1.5rem',
                      marginRight: '-1.5rem',
                      width: 'calc(100% + 3rem)',
                    }}
                  />
                  <CatBadge cat={selected.category} />
                  <h2
                    className="t-heading-2"
                    style={{ fontFamily: 'var(--font-cormorant)', margin: '0.75rem 0 0.25rem' }}
                  >
                    {selected.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-ibm-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-ink-faint)',
                      marginBottom: '1rem',
                    }}
                  >
                    Chapter {selected.chapter} · Cancer Across Time and Civilizations
                  </p>

                  <p className="text-sm" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {selected.description}
                  </p>

                  {selected.safetyNote && (
                    <div
                      style={{
                        background: 'rgba(201,140,36,0.06)',
                        border: '1px solid rgba(201,140,36,0.15)',
                        padding: '0.75rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <p className="text-xs" style={{ color: 'var(--color-accent-dark)' }}>
                        <strong>Safety Note: </strong>
                        {selected.safetyNote}
                      </p>
                    </div>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <p className="t-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem', marginBottom: '0.4rem' }}>
                      Research Hallmark Categories
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selected.hallmarks.map((h) => (
                        <span
                          key={h}
                          style={{
                            background: 'rgba(201,140,36,0.1)',
                            color: 'var(--color-accent)',
                            padding: '3px 10px',
                            fontSize: '0.65rem',
                            border: '1px solid rgba(201,140,36,0.2)',
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <p className="t-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem', marginBottom: '0.4rem' }}>
                      Molecular Pathways Studied
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selected.pathways.map((p) => (
                        <span
                          key={p}
                          style={{
                            background: 'var(--color-bg-alt)',
                            color: 'var(--color-ink-muted)',
                            padding: '3px 10px',
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-ibm-mono)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="t-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem', marginBottom: '0.3rem' }}>
                        Highest Evidence Level
                      </p>
                      <EvidenceBadge level={selected.evidence} />
                    </div>
                    <div>
                      <p className="t-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem', marginBottom: '0.3rem' }}>
                        Assessed Role
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>{selected.role}</p>
                    </div>
                  </div>

                  {/* Archevia cross-link */}
                  {selected.arcieviaLink && (
                    <div
                      style={{
                        background: 'rgba(45,106,79,0.06)',
                        border: '1px solid rgba(45,106,79,0.15)',
                        padding: '0.75rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <p className="text-xs" style={{ color: 'var(--color-emerald)' }}>
                        <strong>Archevia Formulation: </strong>
                        This compound appears in an Archevia formulation.{' '}
                        <Link
                          href={`/formulations/${selected.arcieviaLink}`}
                          style={{ color: 'var(--color-emerald)', textDecoration: 'underline' }}
                        >
                          View formulation details →
                        </Link>
                      </p>
                    </div>
                  )}

                  <RefList ids={selected.references} />
                </div>

                {/* Related pathways */}
                <div>
                  <p className="t-label" style={{ color: 'var(--color-accent)', fontSize: '0.6rem', marginBottom: '0.75rem' }}>
                    Converging Pathways ({relatedPW.length})
                  </p>
                  {relatedPW.length === 0 ? (
                    <p className="text-sm" style={{ color: 'var(--color-ink-faint)' }}>
                      No pathway convergence data for this intervention.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {relatedPW.map((p, i) => (
                        <div key={i} className="card-manuscript p-4">
                          <p
                            style={{
                              fontFamily: 'var(--font-cormorant)',
                              fontSize: '1rem',
                              fontWeight: 500,
                              marginBottom: '0.4rem',
                            }}
                          >
                            {p.pathway}
                          </p>
                          <p className="text-xs mb-2" style={{ color: 'var(--color-ink-faint)' }}>
                            Also studied for effects on this pathway:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {p.interventions
                              .filter((n) => n !== selected.name)
                              .map((n) => (
                                <span
                                  key={n}
                                  onClick={() => {
                                    const found = interventions.find((i) => i.name === n);
                                    if (found) setSelected(found);
                                  }}
                                  style={{
                                    background: 'rgba(45,106,79,0.1)',
                                    color: 'var(--color-emerald)',
                                    padding: '2px 8px',
                                    fontSize: '0.6rem',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(45,106,79,0.2)',
                                  }}
                                >
                                  {n}
                                </span>
                              ))}
                          </div>
                          <p className="text-xs mt-2" style={{ color: 'var(--color-ink-faint)', fontStyle: 'italic' }}>
                            {p.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══ PATHWAYS LIST ═══ */}
          {view === 'pathways' && !selectedPW && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPW.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPW(p)}
                  className="card-manuscript p-5"
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    style={{
                      height: '2px',
                      background: 'var(--color-accent)',
                      marginBottom: '1rem',
                      marginTop: '-1.25rem',
                      marginLeft: '-1.25rem',
                      marginRight: '-1.25rem',
                      width: 'calc(100% + 2.5rem)',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {p.pathway}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ibm-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--color-accent)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {p.interventions.length} converging interventions
                  </p>
                  <p className="text-xs mb-3" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
                    {p.description.length > 140 ? p.description.slice(0, 140) + '…' : p.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.hallmarks.map((h) => (
                      <span key={h} style={{ fontSize: '0.55rem', color: 'var(--color-accent)' }}>
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══ PATHWAY DETAIL ═══ */}
          {view === 'pathways' && selectedPW && (
            <div>
              <button
                onClick={() => setSelectedPW(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-accent)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-jost)',
                  marginBottom: '1rem',
                  padding: 0,
                }}
              >
                ← Back to all pathways
              </button>

              <div className="card-manuscript p-6 mb-6">
                <div
                  style={{
                    height: '2px',
                    background: 'var(--color-accent)',
                    marginBottom: '1.25rem',
                    marginTop: '-1.5rem',
                    marginLeft: '-1.5rem',
                    marginRight: '-1.5rem',
                    width: 'calc(100% + 3rem)',
                  }}
                />
                <h2 className="t-heading-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  {selectedPW.pathway}
                </h2>
                <p className="text-sm mt-2 mb-4" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.7 }}>
                  {selectedPW.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedPW.hallmarks.map((h) => (
                    <span
                      key={h}
                      style={{
                        background: 'rgba(201,140,36,0.1)',
                        color: 'var(--color-accent)',
                        padding: '3px 10px',
                        fontSize: '0.65rem',
                        border: '1px solid rgba(201,140,36,0.2)',
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'var(--color-ink-faint)', fontStyle: 'italic' }}>
                  {selectedPW.note}
                </p>
              </div>

              <p className="t-label mb-3" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                Converging Interventions ({relatedInt.length})
              </p>
              <div className="space-y-2">
                {relatedInt.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setView('interventions');
                      setSelected(item);
                      setSelectedPW(null);
                    }}
                    className="card-manuscript p-4 flex items-center justify-between gap-4"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem', fontWeight: 500 }}>
                        {item.name}
                      </span>
                      <CatBadge cat={item.category} />
                    </div>
                    <EvidenceBadge level={item.evidence} />
                    <span
                      className="text-xs hidden sm:block"
                      style={{ color: 'var(--color-ink-faint)', minWidth: '120px', textAlign: 'right' }}
                    >
                      {item.role.length > 40 ? item.role.slice(0, 40) + '…' : item.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Framework attribution */}
          <div
            className="mt-12 p-4"
            style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-ink-faint)', lineHeight: 1.7 }}>
              <strong>Framework Reference:</strong> {hallmarksFramework.source}.{' '}
              {hallmarksFramework.note}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
