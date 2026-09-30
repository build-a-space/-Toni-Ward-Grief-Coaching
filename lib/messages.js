import 'server-only';
import crypto from 'node:crypto';
import { kvGet, kvSet } from './store';
import { MESSAGES_KEY } from './defaults';

const MAX_MESSAGES = 500;

export async function listMessages() {
  return (await kvGet(MESSAGES_KEY)) || [];
}

export async function addMessage(msg) {
  const all = await listMessages();
  const entry = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false, ...msg };
  await kvSet(MESSAGES_KEY, [entry, ...all].slice(0, MAX_MESSAGES));
  return entry;
}

export async function updateMessages(fn) {
  const all = await listMessages();
  await kvSet(MESSAGES_KEY, fn(all));
}
