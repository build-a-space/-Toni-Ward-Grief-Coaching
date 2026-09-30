import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/messages';
import { getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

const clean = (v, max) => String(v ?? '').trim().slice(0, max);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — pretend success for bots.
  if (body.website) return NextResponse.json({ ok: true });

  const msg = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    topic: clean(body.topic, 60),
    message: clean(body.message, 4000),
  };
  if (!msg.name || !msg.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email)) {
    return NextResponse.json({ error: 'Please include your name, a valid email and a message.' }, { status: 400 });
  }

  let stored = false;
  try {
    await addMessage(msg);
    stored = true;
  } catch (err) {
    console.error('Could not store contact message:', err.message);
  }

  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const s = await getSettings();
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Website <onboarding@resend.dev>',
          to: [s.email],
          reply_to: msg.email,
          subject: `New website message from ${msg.name} (${msg.topic || 'General'})`,
          text: `Name: ${msg.name}\nEmail: ${msg.email}\nPhone: ${msg.phone}\nTopic: ${msg.topic}\n\n${msg.message}`,
        }),
      });
      emailed = res.ok;
    } catch (err) {
      console.error('Could not email contact message:', err.message);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json({ error: 'We could not send your message right now. Please call or email instead.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
