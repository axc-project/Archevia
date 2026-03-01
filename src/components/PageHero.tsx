interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  arabicQuote?: string;
  arabicAttribution?: string;
  dark?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  arabicQuote,
  arabicAttribution,
  dark = false,
}: PageHeroProps) {
  return (
    <section
      style={{
        background: dark ? 'var(--color-ink)' : 'var(--color-bg-alt)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            {eyebrow && (
              <p className="t-label mb-3" style={{ color: 'var(--color-accent)' }}>
                {eyebrow}
              </p>
            )}
            <h1
              className="t-heading-1"
              style={{ color: dark ? 'var(--color-bg)' : 'var(--color-ink)' }}
            >
              {title}
            </h1>
          </div>
          <div>
            {subtitle && (
              <p
                className="t-body"
                style={{
                  color: dark ? 'rgba(253,248,240,0.6)' : 'var(--color-ink-muted)',
                  maxWidth: '34rem',
                }}
              >
                {subtitle}
              </p>
            )}
            {arabicQuote && (
              <blockquote
                className="mt-4"
                style={{
                  borderLeft: '3px solid var(--color-accent)',
                  paddingLeft: '1.25rem',
                }}
              >
                <p
                  className="t-arabic"
                  style={{
                    color: dark ? 'rgba(253,248,240,0.85)' : 'var(--color-ink)',
                    fontSize: '1.2rem',
                  }}
                >
                  {arabicQuote}
                </p>
                {arabicAttribution && (
                  <p
                    className="t-label mt-2"
                    style={{ color: 'var(--color-ink-faint)', fontSize: '0.6rem' }}
                  >
                    — {arabicAttribution}
                  </p>
                )}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
