import { useLanguage } from '../../i18n/LanguageProvider'

export function FieldPractice() {
  const { fieldPractice } = useLanguage().t
  return <section className="section-shell field-practice page-grid" id="field-practice" aria-labelledby="field-title">
    <div className="section-heading"><p className="section-index">{fieldPractice.eyebrow}</p><h2 id="field-title">{fieldPractice.title}</h2><p>{fieldPractice.introduction}</p></div>
    <div className="field-practice__list">{fieldPractice.moments.map((moment) => <article key={moment.index} className="field-moment">
      <p className="field-moment__index">{moment.index}</p><h3>{moment.title}</h3>
      <dl><div><dt>观察什么</dt><dd>{moment.observe}</dd></div><div><dt>怎样记录</dt><dd>{moment.record}</dd></div><div><dt>回来后问</dt><dd>{moment.ask}</dd></div></dl>
    </article>)}</div>
  </section>
}

