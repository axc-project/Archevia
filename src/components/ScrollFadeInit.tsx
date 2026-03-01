'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollFadeInit() {
  const pathname = usePathname();

  const observeAll = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    document.querySelectorAll('.fade-on-scroll:not(.in-view)').forEach((el) => {
      observer.observe(el);
    });

    return observer;
  }, []);

  useEffect(() => {
    // Reset all fade elements on navigation so they can re-animate
    document.querySelectorAll('.fade-on-scroll.in-view').forEach((el) => {
      el.classList.remove('in-view');
    });

    // Run immediately
    const observer = observeAll();

    // Also watch for new elements being added to the DOM (dynamic rendering)
    const mutation = new MutationObserver(() => {
      document.querySelectorAll('.fade-on-scroll:not(.in-view)').forEach((el) => {
        observer.observe(el);
      });
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname, observeAll]);

  return null;
}
