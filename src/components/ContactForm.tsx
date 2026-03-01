'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const enquiryTypes = [
  'Research Collaboration',
  'Institutional Dossier Request',
  'CRO / Clinical Trial Enquiry',
  'Press / Academic',
  'General Enquiry',
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    institution: '',
    enquiryType: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request — replace with actual API endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div
        className="card-manuscript p-10 text-center flex flex-col items-center gap-4"
        style={{ minHeight: '24rem', justifyContent: 'center' }}
      >
        <span
          style={{
            width: '3rem',
            height: '3rem',
            background: 'var(--color-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem',
          }}
        >
          ✓
        </span>
        <h3 className="t-heading-3">Message Received</h3>
        <p className="t-body text-sm" style={{ color: 'var(--color-ink-muted)', maxWidth: '24rem' }}>
          Thank you for reaching out. A member of the HTP research team will respond within
          2–3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card-manuscript p-8 space-y-6">
        <p className="t-label" style={{ color: 'var(--color-accent)' }}>
          Enquiry Form
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full Name" required>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Dr. Jane Smith"
            />
          </Field>
          <Field label="Email Address" required>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="j.smith@institution.edu"
            />
          </Field>
        </div>

        <Field label="Institution / Organisation">
          <input
            type="text"
            name="institution"
            value={form.institution}
            onChange={handleChange}
            placeholder="University of Oxford"
          />
        </Field>

        <Field label="Enquiry Type" required>
          <select
            name="enquiryType"
            value={form.enquiryType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select enquiry type
            </option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" required>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Please describe your research interest or enquiry…"
          />
        </Field>

        <button
          type="submit"
          className="btn btn-primary w-full justify-center"
          disabled={status === 'submitting'}
          style={{ opacity: status === 'submitting' ? 0.65 : 1 }}
        >
          {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
        </button>

        <p className="text-xs text-center" style={{ color: 'var(--color-ink-faint)' }}>
          Your information is not shared with third parties. Response time: 2–3 business days.
        </p>
      </div>

      <style jsx>{`
        input,
        textarea,
        select {
          width: 100%;
          padding: 0.65rem 0.9rem;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-ink);
          font-family: var(--font-jost);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.15s;
          appearance: none;
        }
        input:focus,
        textarea:focus,
        select:focus {
          border-color: var(--color-accent);
        }
        textarea {
          resize: vertical;
          min-height: 8rem;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="t-label block mb-1.5"
        style={{ color: 'var(--color-ink-muted)', fontSize: '0.65rem' }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}
