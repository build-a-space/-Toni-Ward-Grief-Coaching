import Breadcrumbs from './Breadcrumbs';

export default function PageHero({ eyebrow, title, lead, breadcrumbs, image }) {
  return (
    <section className="page-hero" style={image ? { '--hero-img': `url("${image}")` } : undefined}>
      <div className="container">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
    </section>
  );
}
