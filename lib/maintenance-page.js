const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Self-contained HTML served with HTTP 503 while the site is switched off. */
export function maintenanceHtml(s) {
  const tel = `+1${String(s.phone).replace(/\D/g, '')}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s.maintenanceTitle)} | ${esc(s.businessName)}</title><meta name="robots" content="noindex">
<style>
:root{--p:${/^#[0-9a-f]{3,8}$/i.test(s.colorPrimary) ? s.colorPrimary : '#3d2c5e'};--a:${/^#[0-9a-f]{3,8}$/i.test(s.colorAccent) ? s.colorAccent : '#c8a45c'}}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--p);color:#fff;font-family:Georgia,'Times New Roman',serif;text-align:center;padding:24px}
main{max-width:560px}img{width:160px;height:auto}h1{font-size:2.2rem;margin:.5em 0}p{font-family:system-ui,sans-serif;line-height:1.6;opacity:.92}
a{color:var(--a);font-family:system-ui,sans-serif;font-weight:700;text-decoration:none;display:inline-block;margin:6px 10px}
</style></head><body><main>
<img src="${esc(s.logoUrl)}" alt="${esc(s.businessName)}">
<h1>${esc(s.maintenanceTitle)}</h1><p>${esc(s.maintenanceMessage)}</p>
<p><a href="tel:${tel}">${esc(s.phone)}</a><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></p>
</main></body></html>`;
}
