import { useLanguage } from '../../i18n/LanguageProvider'

export function ResearchStudio() {
  const { research } = useLanguage().t
  return <section className="section-shell research-studio page-grid" id="research-studio" aria-labelledby="research-title">
    <div className="section-heading"><p className="section-index">{research.eyebrow}</p><h2 id="research-title">{research.title}</h2><p>{research.introduction}</p></div>
    <div className="research-studio__body"><ol className="research-method">{research.method.map(([verb, title, body], index) => <li key={verb}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{verb}</small><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      <aside className="quality-standard"><p className="eyebrow">QUALITY STANDARD</p><h3>一项值得提交的成果</h3><ul>{research.criteria.map((item) => <li key={item}>{item}</li>)}</ul></aside>
    </div>
  </section>
}

