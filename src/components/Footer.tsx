import Link from 'next/link';
import Image from 'next/image';
import { footerLinks, siteConfig } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-ink)',
        color: 'rgba(253,248,240,0.6)',
        borderTop: '3px solid var(--color-accent)',
      }}
    >
      <div className="container" style={{ paddingBlock: '4rem' }}>
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/brand/archevia-logo-sm.png"
                alt="Archevia"
                width={44}
                height={44}
                style={{ objectFit: 'contain', opacity: 0.9 }}
              />
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.1rem',
                    color: 'rgba(253,248,240,0.9)',
                    fontWeight: 600,
                  }}
                >
                  {siteConfig.name}
                </p>
                <p
                  className="t-label"
                  style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}
                >
                  {siteConfig.collaboration}
                </p>
              </div>
            </div>
            <p className="text-sm mb-6" style={{ maxWidth: '26rem', lineHeight: 1.7 }}>
              {siteConfig.description}
            </p>
            <p className="text-sm" style={{ color: 'rgba(253,248,240,0.35)' }}>
              {siteConfig.email}
            </p>
          </div>

          {/* Links */}
          {[
            { title: 'Archevia',   links: footerLinks.archevia },
            { title: 'Research',   links: footerLinks.research },
            { title: 'Scholars',   links: footerLinks.scholars },
          ].map((col) => (
            <div key={col.title}>
              <p
                className="t-label mb-4"
                style={{ color: 'var(--color-accent)', letterSpacing: '0.15em' }}
              >
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:text-parchment-100"
                      style={{ color: 'rgba(253,248,240,0.6)', textDecoration: 'none' }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(253,248,240,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(253,248,240,0.3)' }}>
            &copy; {year} {siteConfig.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs transition-colors"
                style={{ color: 'rgba(253,248,240,0.3)', textDecoration: 'none' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-6 p-4 text-xs"
          style={{
            background: 'rgba(201,140,36,0.06)',
            border: '1px solid rgba(201,140,36,0.15)',
            lineHeight: 1.65,
            color: 'rgba(253,248,240,0.4)',
          }}
        >
          <strong style={{ color: 'rgba(201,140,36,0.7)' }}>Important Notice:</strong>{' '}
          All formulations described on this website are presented for educational and historical
          research purposes only. They are not drugs, medical devices, or regulated therapeutic agents.
          These statements have not been evaluated by the Food and Drug Administration.
          These products are not intended to diagnose, treat, cure, or prevent any disease.
          Consult a qualified healthcare practitioner before use.
        </div>
      </div>
    </footer>
  );
}
