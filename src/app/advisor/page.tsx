'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAdvisor } from '@/lib/AdvisorContext';

export default function AdvisorPage() {
  const { open, isOpen } = useAdvisor();

  useEffect(() => {
    // Auto-open the floating advisor when visiting this page
    if (!isOpen) {
      const timer = setTimeout(open, 400);
      return () => clearTimeout(timer);
    }
  }, [open, isOpen]);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-ink)',
          paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
          borderBottom: '3px solid var(--color-accent)',
        }}
      >
        <div className="container" style={{ maxWidth: '58rem' }}>
          <div className="text-center">
            <span className="badge badge-gold mb-4" style={{ fontSize: '0.6rem', marginInline: 'auto' }}>
              AI Research Tool
            </span>
            <h1
              className="t-heading-1 mb-3"
              style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-cormorant)' }}
            >
              AI Research Advisor
            </h1>
            <p style={{ color: 'rgba(253,248,240,0.6)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '36rem', marginInline: 'auto' }}>
              Ask about botanicals, formulations, or health goals. The advisor will
              guide you to the right resources on our site and help build a personalised suggestion.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="disclaimer-banner" role="note" style={{ paddingBlock: '0.7rem' }}>
        <div className="container" style={{ maxWidth: '58rem' }}>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
              <path d="M8 1L1 13h14L8 1z" stroke="var(--color-accent-dark)" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="6" x2="8" y2="9.5" stroke="var(--color-accent-dark)" strokeWidth="1.5" />
              <circle cx="8" cy="11.5" r="0.75" fill="var(--color-accent-dark)" />
            </svg>
            <p className="text-xs" style={{ color: 'var(--color-accent-dark)', fontFamily: 'var(--font-jost)' }}>
              <strong>Educational Use Only.</strong> Not medical advice. Consult a healthcare
              professional before starting any supplement. Statements have not been evaluated by the FDA.
            </p>
          </div>
        </div>
      </div>

      {/* What it can do */}
      <section className="section">
        <div className="container" style={{ maxWidth: '58rem' }}>
          <div className="text-center mb-10">
            <h2 className="t-heading-2 mb-3">What You Can Ask</h2>
            <p className="t-body" style={{ color: 'var(--color-ink-muted)' }}>
              The advisor has access to our full database of formulations, monographs, pathways, and publications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Explore Formulations',
                desc: 'Ask about any of our 7 formulations, their ingredients, dosing, and evidence basis.',
                example: '"What’s in the Cellular Resilience Complex?"',
              },
              {
                title: 'Health Goal Guidance',
                desc: 'Describe your health goals and get personalised formulation suggestions.',
                example: '"I want support for digestion and energy"',
              },
              {
                title: 'Ingredient Deep Dives',
                desc: 'Ask about specific ingredients, their evidence levels, and safety profiles.',
                example: '"Tell me about berberine and its interactions"',
              },
              {
                title: 'Pathway Analysis',
                desc: 'Explore molecular pathways and which interventions target them.',
                example: '"What compounds target the NF-κB pathway?"',
              },
              {
                title: 'Safety & Interactions',
                desc: 'Get information about potential drug interactions and contraindications.',
                example: '"Are there any interactions with blood thinners?"',
              },
              {
                title: 'Historical Context',
                desc: 'Learn about the historical scholarship behind our formulations.',
                example: '"What did Maimonides say about digestion?"',
              },
            ].map((item) => (
              <div key={item.title} className="card-manuscript p-6">
                <h3 className="t-heading-3 mb-2" style={{ fontSize: '1rem' }}>{item.title}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--color-ink-muted)' }}>{item.desc}</p>
                <button
                  onClick={() => {
                    open();
                  }}
                  className="text-xs"
                  style={{
                    color: 'var(--color-accent)',
                    background: 'rgba(201,140,36,0.08)',
                    border: '1px solid rgba(201,140,36,0.15)',
                    borderRadius: '12px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-jost)',
                    fontStyle: 'italic',
                  }}
                >
                  {item.example}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="t-body" style={{ color: 'var(--color-ink-faint)' }}>
              Click the gold chat button in the bottom-right corner to start a conversation,
              or <button onClick={open} style={{ color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'var(--font-jost)' }}>open the advisor now</button>.
            </p>
          </div>
        </div>
      </section>

      {/* Related resources */}
      <section className="section" style={{ background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container text-center" style={{ maxWidth: '48rem' }}>
          <h2 className="t-heading-2 mb-4">Explore Directly</h2>
          <p className="t-body mb-8" style={{ color: 'var(--color-ink-muted)' }}>
            Prefer to browse on your own? These resources are also available to explore.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link href="/formulations" className="btn btn-primary">All Formulations</Link>
            <Link href="/monographs" className="btn btn-outline">Monograph Database</Link>
            <Link href="/pathways" className="btn btn-outline">Pathway Explorer</Link>
          </div>
        </div>
      </section>
    </>
  );
}
