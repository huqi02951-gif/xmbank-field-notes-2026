import { useLanguage } from '../../i18n/LanguageProvider'

export function MentorshipProtocol() {
  const { mentorship, boundaries } = useLanguage().t
  return <section className="section-shell mentorship page-grid" id="mentorship" aria-labelledby="mentorship-title">
    <div className="section-heading"><p className="section-index">{mentorship.eyebrow}</p><h2 id="mentorship-title">{mentorship.title}</h2><p>{mentorship.introduction}</p></div>
    <div className="mentorship__body"><div className="mentorship__rhythm">{mentorship.protocol.map(([time, title, body]) => <article key={title}><time>{time}</time><h3>{title}</h3><p>{body}</p></article>)}</div>
      <aside className="escalation"><p className="eyebrow">ESCALATE EARLY</p><h3>{mentorship.escalationTitle}</h3><p>{mentorship.escalation}</p></aside>
      <div className="content-boundaries"><h3>{boundaries.title}</h3>{boundaries.labels.map(([title, body]) => <article key={title}><h4>{title}</h4><p>{body}</p></article>)}</div>
    </div>
  </section>
}

