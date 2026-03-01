import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { formulations } from '@/data/formulations';
import { formulationPrices, formatPrice } from '@/data/pricing';
import ShopGrid from './ShopGrid';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Order Archevia formulations and published books.',
};

const books = [
  {
    title: "Rambam's Guide to Health",
    subtitle: 'A Practical Modern Interpretation of Preventive Medicine',
    image: '/images/books/rambam-cover.jpg',
    format: 'Paperback & Kindle',
    url: 'https://www.amazon.com/Rambams-Guide-Health-Interpretation-Preventive/dp/B0GPNWH877/',
  },
  {
    title: 'Cancer Across Time and Civilizations',
    subtitle: 'A Historical and Biological Translation',
    image: '/images/books/cancer-cover.jpg',
    format: 'Paperback & Kindle',
    url: 'https://www.amazon.com/Cancer-Across-Time-Civilizations-Translation/dp/B0GQ5C7DJZ/',
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Order Formulations & Books"
        subtitle="Browse the complete Archevia product line and our published works."
      />

      {/* Formulations - client component for cart */}
      <ShopGrid formulations={formulations} prices={formulationPrices} />

      {/* Books */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <span className="t-label" style={{ color: 'var(--color-accent)' }}>Books</span>
          <h2 className="t-heading-2 mt-2 mb-10">Published Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {books.map((book, i) => (
              <div
                key={book.title}
                className="card-manuscript flex flex-col fade-on-scroll"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div style={{ height: '3px', background: 'var(--color-accent)', width: '100%' }} />
                <div
                  className="flex items-center justify-center"
                  style={{ background: 'var(--color-bg)', padding: '2rem', borderBottom: '1px solid var(--color-border)' }}
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={160}
                    height={230}
                    style={{ objectFit: 'contain', maxHeight: '210px', boxShadow: '0 4px 20px rgba(30,23,20,0.15)' }}
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="t-heading-3 mb-1">{book.title}</h3>
                  <p className="t-label mb-2" style={{ color: 'var(--color-accent)' }}>{book.subtitle}</p>
                  <p className="text-xs mb-5" style={{ color: 'var(--color-ink-faint)' }}>{book.format}</p>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-full justify-center mt-auto"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Order on Amazon &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Advisor CTA */}
      <section className="section text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '42rem' }}>
          <div className="ornament-rule mb-8 fade-on-scroll" />
          <h2 className="t-heading-2 mb-4 fade-on-scroll">Not Sure Where to Start?</h2>
          <p className="t-body mb-8 fade-on-scroll" style={{ color: 'var(--color-ink-muted)' }}>
            Our AI Research Advisor can help you find the right formulations based on your health goals.
          </p>
          <Link href="/advisor" className="btn btn-primary fade-on-scroll">Talk to the AI Advisor</Link>
        </div>
      </section>
    </>
  );
}
