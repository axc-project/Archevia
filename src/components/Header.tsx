'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/data/site';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled
          ? 'rgba(253,248,240,0.97)'
          : 'rgba(253,248,240,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(30,23,20,0.08)' : 'none',
      }}
    >
      <div className="container">
        <div
          className="flex items-center justify-between"
          style={{ paddingBlock: '0.75rem' }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline"
            style={{ color: 'var(--color-ink)' }}
          >
            <Image
              src="/images/brand/archevia-logo-sm.png"
              alt="Archevia"
              width={44}
              height={44}
              style={{ objectFit: 'contain' }}
            />
            <div className="hidden sm:block">
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  lineHeight: 1.15,
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
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-1.5 px-3 py-2 text-sm transition-colors"
                  style={{
                    fontFamily: 'var(--font-jost)',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    fontSize: '0.85rem',
                    color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                  {link.badge && (
                    <span className="badge badge-gold" style={{ fontSize: '0.5rem' }}>
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '0.75rem',
                        right: '0.75rem',
                        height: '1px',
                        background: 'var(--color-accent)',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  background: 'var(--color-ink)',
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform:
                    menuOpen
                      ? i === 0 ? 'translateY(8px) rotate(45deg)'
                        : i === 2 ? 'translateY(-8px) rotate(-45deg)'
                        : 'none'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            className="lg:hidden pb-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 py-3 px-2"
                style={{
                  color: pathname === link.href ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.95rem',
                }}
              >
                {link.label}
                {link.badge && (
                  <span className="badge badge-gold" style={{ fontSize: '0.55rem' }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
