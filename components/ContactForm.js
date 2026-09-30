'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please call or email instead.');
      form.reset();
      setStatus({ state: 'sent', message: 'Thank you — your message was sent. Toni will be in touch soon.' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <label>
          Name<span aria-hidden="true">*</span>
          <input name="name" required autoComplete="name" maxLength={120} />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
      </div>
      <label>
        Email<span aria-hidden="true">*</span>
        <input name="email" type="email" required autoComplete="email" maxLength={200} />
      </label>
      <label>
        How can Toni help?
        <select name="topic" defaultValue="Free consultation">
          <option>Free consultation</option>
          <option>Grief coaching</option>
          <option>Widow support</option>
          <option>Online sessions</option>
          <option>Workshops / speaking</option>
          <option>Membership</option>
          <option>Other</option>
        </select>
      </label>
      <label>
        Message<span aria-hidden="true">*</span>
        <textarea name="message" rows={5} required maxLength={4000} />
      </label>
      {/* Honeypot: hidden from people, tempting for bots */}
      <label className="hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="btn btn-primary" type="submit" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      <p className={`form-status ${status.state}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
