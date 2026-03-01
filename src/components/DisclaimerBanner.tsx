interface DisclaimerBannerProps {
  text?: string;
  compact?: boolean;
}

export default function DisclaimerBanner({ text, compact = false }: DisclaimerBannerProps) {
  const defaultText =
    'This formulation is presented for educational and historical research purposes only. It is not a drug, medical device, or regulated therapeutic agent. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a qualified healthcare practitioner before use.';

  return (
    <div
      className="disclaimer-banner"
      role="note"
      aria-label="Research disclaimer"
      style={{ paddingBlock: compact ? '0.6rem' : '0.9rem' }}
    >
      <div className="container">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="mt-0.5 shrink-0"
          >
            <path
              d="M8 1L1 13h14L8 1z"
              stroke="var(--color-accent-dark)"
              strokeWidth="1.5"
              fill="none"
            />
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
            {text ?? defaultText}
          </p>
        </div>
      </div>
    </div>
  );
}
