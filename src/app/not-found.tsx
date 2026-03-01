import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        paddingBlock: '6rem',
        background: 'var(--color-bg)',
      }}
    >
      <div className="container text-center" style={{ maxWidth: '36rem' }}>
        <p
          className="t-label mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          404 — Page Not Found
        </p>
        <h1
          className="t-heading-1 mb-6"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          This folio does not exist.
        </h1>
        <p
          className="t-body mb-8"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          The manuscript page you are seeking has either been moved to another collection,
          or was never part of the corpus.
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
