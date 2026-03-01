'use client';

import { useState } from 'react';
import { monographs, categories } from '@/data/monographs';

export default function MonographBrowser() {
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = active
    ? monographs.filter((m) => m.category === active)
    : monographs;

  return (
    <div className="mt-10">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className="badge transition-colors"
          style={{
            background: active === null ? 'var(--color-accent)' : 'rgba(201,140,36,0.08)',
            color: active === null ? 'white' : 'var(--color-accent-dark)',
            borderColor: active === null ? 'var(--color-accent)' : 'rgba(201,140,36,0.25)',
            cursor: 'pointer',
          }}
        >
          All ({monographs.length})
        </button>
        {categories.map((cat) => {
          const count = monographs.filter((m) => m.category === cat).length;
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(isActive ? null : cat)}
              className="badge transition-colors"
              style={{
                background: isActive ? 'var(--color-accent)' : 'rgba(201,140,36,0.08)',
                color: isActive ? 'white' : 'var(--color-accent-dark)',
                borderColor: isActive ? 'var(--color-accent)' : 'rgba(201,140,36,0.25)',
                cursor: 'pointer',
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Monograph grid */}
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        {filtered.map((m) => (
          <article key={m.id} className="card-manuscript flex flex-col">
            {/* Top accent */}
            <div style={{ height: '2px', background: 'var(--color-accent)', width: '100%' }} />

            <div className="p-6 flex flex-col flex-1">
              {/* Header */}
              <div className="mb-3">
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    marginBottom: '0.15rem',
                  }}
                >
                  {m.commonName}
                </h3>
                <p
                  className="italic text-sm"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  {m.latinName}
                </p>
                <span
                  className="badge badge-gold mt-2"
                  style={{ fontSize: '0.55rem' }}
                >
                  {m.category}
                </span>
              </div>

              {expanded === m.id ? (
                <div className="space-y-4 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                  <div>
                    <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                      Historical Use
                    </p>
                    <p style={{ lineHeight: 1.7 }}>{m.historicalUse}</p>
                  </div>
                  <div>
                    <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                      Modern Evidence
                    </p>
                    <p style={{ lineHeight: 1.7 }}>{m.modernEvidence}</p>
                  </div>
                  <div>
                    <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                      Active Compounds
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {m.activeCompounds.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5"
                          style={{
                            background: 'rgba(31,159,110,0.06)',
                            color: 'var(--color-emerald)',
                            border: '1px solid rgba(31,159,110,0.2)',
                            fontFamily: 'var(--font-ibm-mono)',
                            fontSize: '0.7rem',
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                      Safety Notes
                    </p>
                    <p style={{ lineHeight: 1.7 }}>{m.safetyNotes}</p>
                  </div>
                  {m.formulaAppearance.length > 0 && (
                    <div>
                      <p className="t-label mb-1" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                        Appears In
                      </p>
                      <p>{m.formulaAppearance.join(', ')}</p>
                    </div>
                  )}
                  <div>
                    <p className="t-label mb-2" style={{ color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                      References
                    </p>
                    <ol className="list-decimal list-inside space-y-1.5">
                      {m.references.map((ref) => (
                        <li key={ref.id} className="text-xs" style={{ lineHeight: 1.6, color: 'var(--color-ink-muted)' }}>
                          {ref.authors} ({ref.year}). {ref.title}. <em>{ref.journal}</em>.{' '}
                          {ref.url && (
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: 'var(--color-emerald)', textDecoration: 'underline' }}
                            >
                              {ref.url.includes('doi.org') ? 'DOI' : 'PubMed'}
                            </a>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <button
                    onClick={() => setExpanded(null)}
                    className="t-label mt-2"
                    style={{
                      color: 'var(--color-accent)',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.65rem',
                    }}
                  >
                    Collapse ↑
                  </button>
                </div>
              ) : (
                <div className="mt-auto">
                  <p
                    className="text-sm mb-3"
                    style={{
                      color: 'var(--color-ink-muted)',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {m.modernEvidence}
                  </p>
                  <button
                    onClick={() => setExpanded(m.id)}
                    className="t-label"
                    style={{
                      color: 'var(--color-accent)',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.65rem',
                    }}
                  >
                    Read Full Monograph ↓
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
