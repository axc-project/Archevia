'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ── markdown link parser (opens new tab) ── */
function renderMsg(text: string) {
  // Bold: **text**
  let processed = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  processed = processed.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  // Links: [text](/path)
  processed = processed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer" style="color:#1f9f6e;text-decoration:underline">$1 ↗</a>'
  );
  return processed;
}

export default function FloatingAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content:
        "Welcome to the Archevia™ Research Advisor. I can help you explore our formulations, understand ingredients and pathways, or build a personalised suggestion based on your health goals.\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const send = useCallback(
    async (overrideText?: string) => {
      const text = overrideText ?? input.trim();
      if (!text || loading) return;

      const userMsg = { role: 'user' as const, content: text };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setLoading(true);

      try {
        const res = await fetch('/api/advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        const reply = data.reply ?? 'I apologise — please try again.';
        // Strip cart JSON blocks from floating widget (those only work on full advisor page)
        const clean = reply.replace(/```cart\n?[\s\S]*?\n?```/g, '').trim();
        setMessages((prev) => [...prev, { role: 'assistant', content: clean }]);
        if (isMinimized) setHasNew(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Connection error — please try again.' },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, isMinimized]
  );

  /* ── Floating button ── */
  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setHasNew(false);
        }}
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
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 9999,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Ask the AI Research Advisor"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.477 2 2 5.813 2 10.5c0 2.65 1.33 5.023 3.438 6.614L4 22l4.35-2.175C9.513 20.267 10.727 20.5 12 20.5c5.523 0 10-3.813 10-8.5S17.523 2 12 2z"
            fill="white"
          />
          <circle cx="8" cy="10.5" r="1.25" fill="var(--color-accent)" />
          <circle cx="12" cy="10.5" r="1.25" fill="var(--color-accent)" />
          <circle cx="16" cy="10.5" r="1.25" fill="var(--color-accent)" />
        </svg>
        {hasNew && (
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#e53e3e',
              border: '2px solid var(--color-bg)',
            }}
          />
        )}
      </button>
    );
  }

  /* ── Minimized bar ── */
  if (isMinimized) {
    return (
      <div
        onClick={() => {
          setIsMinimized(false);
          setHasNew(false);
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '280px',
          background: 'var(--color-ink)',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          zIndex: 9999,
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.477 2 2 5.813 2 10.5c0 2.65 1.33 5.023 3.438 6.614L4 22l4.35-2.175C9.513 20.267 10.727 20.5 12 20.5c5.523 0 10-3.813 10-8.5S17.523 2 12 2z"
                fill="var(--color-accent)"
              />
            </svg>
            <span
              style={{
                color: 'var(--color-bg)',
                fontFamily: 'var(--font-jost)',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              AI Research Advisor
            </span>
            {hasNew && (
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#e53e3e',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
                setHasNew(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(253,248,240,0.5)',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '2px 6px',
                lineHeight: 1,
              }}
              aria-label="Expand"
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setIsMinimized(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(253,248,240,0.5)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: '2px 6px',
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Full chat window ── */
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '380px',
        maxWidth: 'calc(100vw - 32px)',
        height: '520px',
        maxHeight: 'calc(100vh - 100px)',
        background: 'var(--color-bg)',
        borderRadius: '12px',
        boxShadow: '0 12px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(201,140,36,0.15)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'var(--color-ink)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.477 2 2 5.813 2 10.5c0 2.65 1.33 5.023 3.438 6.614L4 22l4.35-2.175C9.513 20.267 10.727 20.5 12 20.5c5.523 0 10-3.813 10-8.5S17.523 2 12 2z"
              fill="var(--color-accent)"
            />
          </svg>
          <div>
            <p
              style={{
                color: 'var(--color-bg)',
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1rem',
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              AI Research Advisor
            </p>
            <p
              style={{
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-jost)',
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Archevia™ · Educational Use Only
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(253,248,240,0.5)',
              cursor: 'pointer',
              fontSize: '1.1rem',
              padding: '4px 6px',
              lineHeight: 1,
            }}
            aria-label="Minimize"
          >
            —
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsMinimized(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(253,248,240,0.5)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              padding: '4px 6px',
              lineHeight: 1,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Disclaimer bar */}
      <div
        style={{
          background: 'rgba(201,140,36,0.08)',
          borderBottom: '1px solid rgba(201,140,36,0.12)',
          padding: '6px 16px',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontSize: '0.55rem',
            color: 'var(--color-accent-dark)',
            fontFamily: 'var(--font-jost)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Not medical advice. Consult a healthcare professional before starting any supplement.
        </p>
      </div>

      {/* Messages */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background:
                m.role === 'user'
                  ? 'var(--color-accent)'
                  : 'rgba(30,23,20,0.035)',
              color: m.role === 'user' ? 'white' : 'var(--color-ink)',
              padding: '10px 14px',
              borderRadius:
                m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              fontSize: '0.8rem',
              lineHeight: 1.65,
              fontFamily: 'var(--font-jost)',
              border:
                m.role === 'user' ? 'none' : '1px solid rgba(30,23,20,0.06)',
            }}
            dangerouslySetInnerHTML={{
              __html: renderMsg(m.content).replace(/\n/g, '<br/>'),
            }}
          />
        ))}
        {loading && (
          <div
            style={{
              alignSelf: 'flex-start',
              background: 'rgba(30,23,20,0.035)',
              border: '1px solid rgba(30,23,20,0.06)',
              padding: '10px 14px',
              borderRadius: '12px 12px 12px 2px',
              fontSize: '0.85rem',
              color: 'var(--color-ink-faint)',
              fontFamily: 'var(--font-jost)',
            }}
          >
            <span className="advisor-dots">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </span>
          </div>
        )}
      </div>

      {/* Quick questions (only if single welcome message) */}
      {messages.length === 1 && (
        <div
          style={{
            padding: '0 16px 8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            flexShrink: 0,
          }}
        >
          {[
            'What formulation helps with digestion?',
            'Tell me about the Pathway Explorer',
            'Help me choose a supplement',
          ].map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              style={{
                background: 'rgba(201,140,36,0.08)',
                border: '1px solid rgba(201,140,36,0.15)',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '0.65rem',
                color: 'var(--color-accent-dark)',
                fontFamily: 'var(--font-jost)',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        style={{
          borderTop: '1px solid rgba(30,23,20,0.08)',
          padding: '10px 12px',
          display: 'flex',
          gap: '8px',
          flexShrink: 0,
          background: 'white',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Ask about formulations, pathways..."
          style={{
            flex: 1,
            border: '1px solid rgba(30,23,20,0.1)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-jost)',
            outline: 'none',
            background: 'var(--color-bg)',
            color: 'var(--color-ink)',
          }}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{
            background:
              input.trim() && !loading
                ? 'var(--color-accent)'
                : 'rgba(201,140,36,0.3)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: input.trim() && !loading ? 'pointer' : 'default',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Dots animation */}
      <style>{`
        .advisor-dots {
          display: inline-flex;
          gap: 4px;
        }
        .advisor-dots span {
          animation: advisorPulse 1.4s ease-in-out infinite;
        }
        .advisor-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .advisor-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes advisorPulse {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
