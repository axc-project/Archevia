'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdvisor } from '@/lib/AdvisorContext';

/* ── render message with clickable links (navigates without losing chat) ── */
function MessageBubble({
  content,
  isUser,
  onLinkClick,
}: {
  content: string;
  isUser: boolean;
  onLinkClick: (href: string) => void;
}) {
  // Parse markdown: **bold**, *italic*, [text](url)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const lines = content.split('\n');

  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '85%',
        background: isUser ? 'var(--color-accent)' : 'rgba(30,23,20,0.035)',
        color: isUser ? 'white' : 'var(--color-ink)',
        padding: '10px 14px',
        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        fontSize: '0.8rem',
        lineHeight: 1.65,
        fontFamily: 'var(--font-jost)',
        border: isUser ? 'none' : '1px solid rgba(30,23,20,0.06)',
      }}
    >
      {lines.map((line, li) => {
        const elements: React.ReactNode[] = [];
        let idx = 0;
        const lineRegex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
        let m: RegExpExecArray | null;

        while ((m = lineRegex.exec(line)) !== null) {
          if (m.index > idx) {
            elements.push(line.slice(idx, m.index));
          }
          if (m[2]) {
            // Bold
            elements.push(<strong key={`b${li}-${idx}`}>{m[2]}</strong>);
          } else if (m[3]) {
            // Italic
            elements.push(<em key={`i${li}-${idx}`}>{m[3]}</em>);
          } else if (m[4] && m[5]) {
            // Link
            const href = m[5];
            const isInternal = href.startsWith('/');
            elements.push(
              <a
                key={`a${li}-${idx}`}
                href={href}
                onClick={(e) => {
                  if (isInternal) {
                    e.preventDefault();
                    onLinkClick(href);
                  }
                }}
                target={isInternal ? undefined : '_blank'}
                rel={isInternal ? undefined : 'noreferrer'}
                style={{
                  color: isUser ? 'white' : 'var(--color-emerald)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                {m[4]}{isInternal ? '' : ' ↗'}
              </a>
            );
          }
          idx = m.index + m[0].length;
        }

        if (idx < line.length) {
          elements.push(line.slice(idx));
        }

        return (
          <span key={li}>
            {li > 0 && <br />}
            {elements.length > 0 ? elements : ' '}
          </span>
        );
      })}
    </div>
  );
}

export default function FloatingAdvisor() {
  const {
    messages, isOpen, isMinimized, loading, hasNew,
    open, close, minimize, expand, send, clearNew,
  } = useAdvisor();
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = (overrideText?: string) => {
    const text = overrideText ?? input.trim();
    if (!text) return;
    setInput('');
    send(text);
  };

  const handleLinkClick = (href: string) => {
    // Navigate without losing chat state (context persists)
    router.push(href);
  };

  // On /advisor page, auto-open the floating chat
  useEffect(() => {
    if (pathname === '/advisor' && !isOpen) {
      open();
    }
  }, [pathname, isOpen, open]);

  /* ── Floating button ── */
  if (!isOpen) {
    return (
      <button
        onClick={() => { open(); clearNew(); }}
        aria-label="Open AI Research Advisor"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(201,140,36,0.4), 0 2px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s',
          zIndex: 9999,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        title="Ask the AI Research Advisor"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.65 1.33 5.023 3.438 6.614L4 22l4.35-2.175C9.513 20.267 10.727 20.5 12 20.5c5.523 0 10-3.813 10-8.5S17.523 2 12 2z" fill="white"/>
          <circle cx="8" cy="10.5" r="1.25" fill="var(--color-accent)"/>
          <circle cx="12" cy="10.5" r="1.25" fill="var(--color-accent)"/>
          <circle cx="16" cy="10.5" r="1.25" fill="var(--color-accent)"/>
        </svg>
        {hasNew && (
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '14px', height: '14px', borderRadius: '50%', background: '#e53e3e', border: '2px solid var(--color-bg)' }} />
        )}
      </button>
    );
  }

  /* ── Minimized bar ── */
  if (isMinimized) {
    return (
      <div
        onClick={() => { expand(); clearNew(); }}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', width: '280px',
          background: 'var(--color-ink)', borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)', zIndex: 9999, cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.65 1.33 5.023 3.438 6.614L4 22l4.35-2.175C9.513 20.267 10.727 20.5 12 20.5c5.523 0 10-3.813 10-8.5S17.523 2 12 2z" fill="var(--color-accent)"/>
            </svg>
            <span style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-jost)', fontSize: '0.8rem', fontWeight: 500 }}>
              AI Research Advisor
            </span>
            {hasNew && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e53e3e', flexShrink: 0 }} />}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={(e) => { e.stopPropagation(); expand(); clearNew(); }} style={{ background: 'none', border: 'none', color: 'rgba(253,248,240,0.5)', cursor: 'pointer', fontSize: '1rem', padding: '2px 6px', lineHeight: 1 }} aria-label="Expand">↑</button>
            <button onClick={(e) => { e.stopPropagation(); close(); }} style={{ background: 'none', border: 'none', color: 'rgba(253,248,240,0.5)', cursor: 'pointer', fontSize: '1.1rem', padding: '2px 6px', lineHeight: 1 }} aria-label="Close">×</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Full chat window ── */
  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', width: '380px',
      maxWidth: 'calc(100vw - 32px)', height: '520px', maxHeight: 'calc(100vh - 100px)',
      background: 'var(--color-bg)', borderRadius: '12px',
      boxShadow: '0 12px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(201,140,36,0.15)',
      zIndex: 9999, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ background: 'var(--color-ink)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.65 1.33 5.023 3.438 6.614L4 22l4.35-2.175C9.513 20.267 10.727 20.5 12 20.5c5.523 0 10-3.813 10-8.5S17.523 2 12 2z" fill="var(--color-accent)"/>
          </svg>
          <div>
            <p style={{ color: 'var(--color-bg)', fontFamily: 'var(--font-cormorant)', fontSize: '1rem', fontWeight: 600, margin: 0, lineHeight: 1.2 }}>
              AI Research Advisor
            </p>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-jost)', fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              Archevia™ · Educational Use Only
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button onClick={minimize} style={{ background: 'none', border: 'none', color: 'rgba(253,248,240,0.5)', cursor: 'pointer', fontSize: '1.1rem', padding: '4px 6px', lineHeight: 1 }} aria-label="Minimize">—</button>
          <button onClick={close} style={{ background: 'none', border: 'none', color: 'rgba(253,248,240,0.5)', cursor: 'pointer', fontSize: '1.2rem', padding: '4px 6px', lineHeight: 1 }} aria-label="Close">×</button>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ background: 'rgba(201,140,36,0.08)', borderBottom: '1px solid rgba(201,140,36,0.12)', padding: '6px 16px', flexShrink: 0 }}>
        <p style={{ fontSize: '0.55rem', color: 'var(--color-accent-dark)', fontFamily: 'var(--font-jost)', margin: 0, lineHeight: 1.5 }}>
          Not medical advice. Consult a healthcare professional before starting any supplement.
        </p>
      </div>

      {/* Messages */}
      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} content={m.content} isUser={m.role === 'user'} onLinkClick={handleLinkClick} />
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', background: 'rgba(30,23,20,0.035)', border: '1px solid rgba(30,23,20,0.06)', padding: '10px 14px', borderRadius: '12px 12px 12px 2px', fontSize: '0.85rem', color: 'var(--color-ink-faint)', fontFamily: 'var(--font-jost)' }}>
            <span className="advisor-dots"><span>●</span><span>●</span><span>●</span></span>
          </div>
        )}
      </div>

      {/* Quick questions */}
      {messages.length === 1 && (
        <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
          {['What formulation helps with digestion?', 'Tell me about the Pathway Explorer', 'Help me choose a supplement'].map((q) => (
            <button key={q} onClick={() => handleSend(q)} style={{ background: 'rgba(201,140,36,0.08)', border: '1px solid rgba(201,140,36,0.15)', borderRadius: '16px', padding: '6px 12px', fontSize: '0.65rem', color: 'var(--color-accent-dark)', fontFamily: 'var(--font-jost)', cursor: 'pointer' }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ borderTop: '1px solid rgba(30,23,20,0.08)', padding: '10px 12px', display: 'flex', gap: '8px', flexShrink: 0, background: 'white' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask about formulations, pathways..."
          style={{ flex: 1, border: '1px solid rgba(30,23,20,0.1)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', fontFamily: 'var(--font-jost)', outline: 'none', background: 'var(--color-bg)', color: 'var(--color-ink)' }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          style={{ background: input.trim() && !loading ? 'var(--color-accent)' : 'rgba(201,140,36,0.3)', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: input.trim() && !loading ? 'pointer' : 'default', flexShrink: 0 }}
          aria-label="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <style>{`
        .advisor-dots { display: inline-flex; gap: 4px; }
        .advisor-dots span { animation: advisorPulse 1.4s ease-in-out infinite; }
        .advisor-dots span:nth-child(2) { animation-delay: 0.2s; }
        .advisor-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes advisorPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
      `}</style>
    </div>
  );
}
