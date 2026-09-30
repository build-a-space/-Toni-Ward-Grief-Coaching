export default function Faq({ faqs, title = 'Frequently Asked Questions' }) {
  if (!faqs?.length) return null;
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container narrow">
        <h2 id="faq-title" className="section-title">{title}</h2>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
