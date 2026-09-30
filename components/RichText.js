import Link from 'next/link';

// Minimal inline markup for content strings:
//   **keyword**        -> <strong>keyword</strong>
//   [anchor](/path)    -> internal <Link> (or external <a> for http links)
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function plainText(str = '') {
  return String(str).replace(TOKEN, (_, bold, text) => bold ?? text);
}

export default function RichText({ text }) {
  const out = [];
  let last = 0;
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={m.index}>{m[1]}</strong>);
    } else if (m[3].startsWith('http')) {
      out.push(<a key={m.index} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>);
    } else {
      out.push(<Link key={m.index} href={m[3]}>{m[2]}</Link>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
