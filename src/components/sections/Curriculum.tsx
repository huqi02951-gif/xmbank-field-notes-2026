import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageProvider'

export function Curriculum() {
  const { t } = useLanguage()
  const { curriculum } = t
  const [active, setActive] = useState(0)
  const stage = curriculum.stages[active]

  return (
    <section className="section-shell curriculum page-grid" id="curriculum" aria-labelledby="curriculum-title">
      <div className="section-heading">
        <p className="section-index">{curriculum.eyebrow}</p>
        <h2 id="curriculum-title">{curriculum.title}</h2>
        <p>{curriculum.introduction}</p>
      </div>
      <div className="curriculum__body">
        <div className="curriculum__tabs" role="tablist" aria-label="课程阶段">
          {curriculum.stages.map((item, index) => (
            <button key={item.id} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              <small>{String(index + 1).padStart(2, '0')}</small><span>{item.verb}</span>
            </button>
          ))}
        </div>
        <article className="curriculum__stage">
          <p className="eyebrow">{stage.verb}</p><h3>{stage.title}</h3><p className="curriculum__premise">{stage.premise}</p>
          <div className="curriculum__grid">
            <div><h4>核心问题</h4><ul>{stage.questions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h4>建议实践</h4><p>{stage.practice}</p></div>
            <div><h4>可见产出</h4><p>{stage.output}</p></div>
            <div><h4>导师反馈点</h4><p>{stage.mentorCheck}</p></div>
          </div>
        </article>
      </div>
    </section>
  )
}

