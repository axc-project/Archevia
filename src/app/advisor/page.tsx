'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            'I apologise — an error occurred while processing your query. Please try again or contact research@historicaltranslationproject.com for direct assistance.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--color-ink)',
          paddingBlock: 'clamp(3rem, 6vw, 5rem)',
          borderBottom: '3px solid var(--color-accent)',
        }}
      >
        <div className="container" style={{ maxWidth: '52rem' }}>
          <div className="text-center">
            <span className="badge badge-gold mb-5" style={{ fontSize: '0.6rem', marginInline: 'auto' }}>
              Powered by Claude
            </span>
            <h1
              className="t-heading-1 mb-4"
              style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-cormorant)' }}
            >
              AI Research Advisor
            </h1>
            <p
              style={{
                color: 'rgba(253,248,240,0.6)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '38rem',
                marginInline: 'auto',
              }}
            >
              Ask questions about botanical ingredients, historical medical traditions,
              formulation rationale, phytochemical evidence, or general wellness education.
            </p>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div
        className="disclaimer-banner"
        role="note"
        aria-label="AI advisor disclaimer"
        style={{ paddingBlock: '0.7rem' }}
      >
        <div className="container" style={{ maxWidth: '52rem' }}>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
              <path d="M8 1L1 13h14L8 1z" stroke="var(--color-accent-dark)" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="6" x2="8" y2="9.5" stroke="var(--color-accent-dark)" strokeWidth="1.5" />
              <circle cx="8" cy="11.5" r="0.75" fill="var(--color-accent-dark)" />
            </svg>
            <p
              className="text-xs"
              style={{
                color: 'var(--color-accent-dark)',
                lineHeight: 1.65,
                fontFamily: 'var(--font-jost)',
              }}
            >
              <strong>Research &amp; Educational Use Only. </strong>
              This AI advisor provides educational information consistent with DSHEA (1994). It does
              not provide medical advice, diagnose conditions, or recommend treatments. All responses
              use structure/function language. These statements have not been evaluated by the FDA.
              Consult a qualified healthcare professional before starting any supplement regimen.
            </p>
          </div>
        </div>
      </div>

      {/* ── CHAT ── */}
      <section className="section" style={{ paddingBlock: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          <div
            className="card-manuscript"
            style={{
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top accent bar */}
            <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto p-6 space-y-4"
              style={{ maxHeight: '520px' }}
            >
              {messages.length === 0 && (
                <div className="text-center" style={{ paddingBlock: '4rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.4rem',
                      color: 'var(--color-ink-faint)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    What would you like to explore?
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-ink-faint)' }}>
                    Example: &ldquo;What is the historical evidence for hawthorn in cardiac
                    tonic therapy?&rdquo;
                  </p>

                  {/* Suggested queries */}
                  <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {[
                      'What did Maimonides say about digestion?',
                      'Evidence for saffron in cognitive support?',
                      'How does the Canon classify respiratory herbs?',
                    ].map((q) => (
                      <button
                        key={q}
                        className="text-xs px-3 py-1.5 transition-colors"
                        style={{
                          border: '1px solid var(--color-border)',
                          background: 'var(--color-bg)',
                          color: 'var(--color-ink-muted)',
                          fontFamily: 'var(--font-jost)',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setInput(q);
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className="flex"
                  style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div
                    className="max-w-[85%] px-5 py-3"
                    style={{
                      background:
                        m.role === 'user'
                          ? 'var(--color-ink)'
                          : 'var(--color-bg-alt)',
                      color:
                        m.role === 'user'
                          ? 'var(--color-bg)'
                          : 'var(--color-ink)',
                      fontFamily: 'var(--font-jost)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      borderRadius: '2px',
                    }}
                  >
                    <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex">
                  <div
                    className="px-5 py-3"
                    style={{
                      background: 'var(--color-bg-alt)',
                      color: 'var(--color-ink-faint)',
                      fontFamily: 'var(--font-jost)',
                      fontSize: '0.9rem',
                      borderRadius: '2px',
                    }}
                  >
                    <span className="animate-shimmer inline-block" style={{ background: 'linear-gradient(90deg, var(--color-ink-faint), var(--color-accent), var(--color-ink-faint))', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Consulting the corpus&hellip;
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div
              className="p-4 flex gap-3"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about botanicals, historical traditions, or formulations&hellip;"
                className="flex-1"
                style={{
                  padding: '0.65rem 0.9rem',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="btn btn-primary"
                style={{
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.75rem',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Footer note */}
          <p
            className="text-center mt-5"
            style={{
              fontSize: '0.7rem',
              color: 'var(--color-ink-faint)',
              fontFamily: 'var(--font-jost)',
            }}
          >
            *These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>
    </>
  );
}
