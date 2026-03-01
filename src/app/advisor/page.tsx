'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Message = { role: 'user' | 'assistant'; content: string };
type CartItem = { slug: string; name: string };

/* Simple markdown link parser: [text](/path) -> <a> */
function renderContent(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          style={{ color: 'var(--color-emerald)', textDecoration: 'underline' }}
        >
          {match[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* Extract cart JSON from response and strip it from display text */
function extractCart(text: string): { display: string; cart: CartItem[] } {
  const cartMatch = text.match(/```cart\n?([\s\S]*?)\n?```/);
  if (cartMatch) {
    try {
      const cart = JSON.parse(cartMatch[1]) as CartItem[];
      const display = text.replace(/```cart\n?[\s\S]*?\n?```/, '').trim();
      return { display, cart };
    } catch {
      return { display: text, cart: [] };
    }
  }
  return { display: text, cart: [] };
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(override?: string) {
    const text = override || input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: 'user', content: text };
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
      const { display, cart: newCart } = extractCart(data.reply);
      setMessages([...next, { role: 'assistant', content: display }]);
      if (newCart.length > 0) {
        setCart((prev) => {
          const slugs = new Set(prev.map((c) => c.slug));
          return [...prev, ...newCart.filter((c) => !slugs.has(c.slug))];
        });
      }
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: 'I apologise \u2014 an error occurred. Please try again.' },
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
          paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
          borderBottom: '3px solid var(--color-accent)',
        }}
      >
        <div className="container" style={{ maxWidth: '58rem' }}>
          <div className="text-center">
            <span className="badge badge-gold mb-4" style={{ fontSize: '0.6rem', marginInline: 'auto' }}>
              Powered by Claude
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

      {/* ── DISCLAIMER ── */}
      <div className="disclaimer-banner" role="note" style={{ paddingBlock: '0.6rem' }}>
        <div className="container" style={{ maxWidth: '58rem' }}>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
              <path d="M8 1L1 13h14L8 1z" stroke="var(--color-accent-dark)" strokeWidth="1.5" fill="none" />
              <line x1="8" y1="6" x2="8" y2="9.5" stroke="var(--color-accent-dark)" strokeWidth="1.5" />
              <circle cx="8" cy="11.5" r="0.75" fill="var(--color-accent-dark)" />
            </svg>
            <p className="text-xs" style={{ color: 'var(--color-accent-dark)', lineHeight: 1.65, fontFamily: 'var(--font-jost)' }}>
              <strong>Educational Use Only. </strong>
              Not medical advice. Consult a healthcare professional before starting any supplement.
              Statements have not been evaluated by the FDA.
            </p>
          </div>
        </div>
      </div>

      {/* ── CHAT + CART LAYOUT ── */}
      <section className="section" style={{ paddingBlock: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        <div className="container" style={{ maxWidth: '58rem' }}>
          <div className={cart.length > 0 ? 'grid md:grid-cols-[1fr,280px] gap-6' : ''}>
            {/* Chat panel */}
            <div className="card-manuscript" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: '520px' }}>
                {messages.length === 0 && (
                  <div className="text-center" style={{ paddingBlock: '3rem' }}>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', color: 'var(--color-ink-faint)', marginBottom: '0.5rem' }}>
                      How can I help you today?
                    </p>
                    <p className="text-sm mb-6" style={{ color: 'var(--color-ink-faint)' }}>
                      Tell me about your health goals, or ask about a specific ingredient or formulation.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        'Help me choose the right formulations',
                        'What supports healthy digestion?',
                        'Tell me about saffron for cognitive support',
                        'What did Maimonides say about heart health?',
                      ].map((q) => (
                        <button
                          key={q}
                          className="text-xs px-3 py-1.5 transition-colors"
                          style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-jost)', cursor: 'pointer' }}
                          onClick={() => send(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className="flex" style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div
                      className="max-w-[85%] px-4 py-3"
                      style={{
                        background: m.role === 'user' ? 'var(--color-ink)' : 'var(--color-bg-alt)',
                        color: m.role === 'user' ? 'var(--color-bg)' : 'var(--color-ink)',
                        fontFamily: 'var(--font-jost)',
                        fontSize: '0.88rem',
                        lineHeight: 1.7,
                        borderRadius: '2px',
                      }}
                    >
                      <div style={{ whiteSpace: 'pre-wrap' }}>
                        {m.role === 'assistant' ? renderContent(m.content) : m.content}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex">
                    <div className="px-4 py-3" style={{ background: 'var(--color-bg-alt)', color: 'var(--color-ink-faint)', fontFamily: 'var(--font-jost)', fontSize: '0.88rem', borderRadius: '2px' }}>
                      <span className="animate-shimmer inline-block" style={{ background: 'linear-gradient(90deg, var(--color-ink-faint), var(--color-accent), var(--color-ink-faint))', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Consulting the corpus&hellip;
                      </span>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="p-4 flex gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ask about botanicals, formulations, or health goals&hellip;"
                  className="flex-1"
                  style={{ padding: '0.6rem 0.85rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-ink)', fontFamily: 'var(--font-jost)', fontSize: '0.88rem', outline: 'none' }}
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem', opacity: loading || !input.trim() ? 0.5 : 1 }}
                >
                  Send
                </button>
              </div>
            </div>

            {/* Cart panel */}
            {cart.length > 0 && (
              <aside className="space-y-4">
                <div className="card-manuscript p-5">
                  <div style={{ height: '2px', background: 'var(--color-emerald)', marginBottom: '1rem', marginTop: '-1.25rem', marginLeft: '-1.25rem', marginRight: '-1.25rem', width: 'calc(100% + 2.5rem)' }} />
                  <p className="t-label mb-4" style={{ color: 'var(--color-emerald)', fontSize: '0.6rem' }}>
                    Suggested Formulations
                  </p>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.slug} className="flex items-start gap-3">
                        <span style={{ color: 'var(--color-accent)', marginTop: '2px', fontSize: '0.7rem' }}>{'\u25c6'}</span>
                        <div>
                          <Link
                            href={`/formulations/${item.slug}`}
                            style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-ink)', textDecoration: 'none' }}
                          >
                            {item.name}
                          </Link>
                          <div className="flex gap-2 mt-1">
                            <Link
                              href={`/formulations/${item.slug}`}
                              className="text-xs"
                              style={{ color: 'var(--color-emerald)', textDecoration: 'underline' }}
                            >
                              View
                            </Link>
                            <a
                              href={`/dossiers/${item.slug}-dossier.pdf`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs"
                              style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
                            >
                              PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setCart([])}
                    className="t-label mt-4 block"
                    style={{ color: 'var(--color-ink-faint)', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontSize: '0.55rem' }}
                  >
                    Clear suggestions
                  </button>
                </div>
              </aside>
            )}
          </div>

          <p className="text-center mt-4" style={{ fontSize: '0.65rem', color: 'var(--color-ink-faint)' }}>
            *These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>
    </>
  );
}
