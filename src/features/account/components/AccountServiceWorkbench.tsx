import { useMemo, useState } from 'react'

import { CopyButton } from '../../../components/common/CopyButton'
import type { AccountToolkitContent } from '../../../content/portal'

export function AccountServiceWorkbench({ content }: { content: AccountToolkitContent }) {
  const [scenarioId, setScenarioId] = useState(content.scenarios[0].id)
  const scenario = content.scenarios.find((item) => item.id === scenarioId) ?? content.scenarios[0]

  const customerMessage = useMemo(() => [
    content.messageIntro,
    '',
    `【办理事项】${scenario.title}`,
    '',
    `【线上预约】${content.appointmentPath.join(' → ')}`,
    '',
    '【请准备的材料】',
    ...scenario.materials.map((item, index) => `${index + 1}. ${item}`),
    '',
    content.messageClosing,
  ].join('\n'), [content, scenario])

  return (
    <section className="account-toolkit" aria-labelledby="account-toolkit-title">
      <header className="account-toolkit__intro">
        <div>
          <p className="portal-kicker">APEX · PRACTICAL SERVICE</p>
          <h2 id="account-toolkit-title">{content.title}</h2>
          <p>{content.intro}</p>
        </div>
        <small>{content.sourceNote}</small>
      </header>

      <div className="scenario-tabs" role="tablist" aria-label={content.title}>
        {content.scenarios.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.id === scenario.id}
            className={item.id === scenario.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => setScenarioId(item.id)}
          >
            <small>{item.label}</small>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      <div className="account-toolkit__grid" key={scenario.id}>
        <section className="service-panel service-panel--wide">
          <header><span>01</span><div><h3>{scenario.title}</h3><p>{scenario.description}</p></div></header>
          <div className="material-checklist">
            {scenario.materials.map((item) => (
              <label key={item}>
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <p className="service-panel__hint">勾选仅用于现场核对，不保存任何资料或进度。</p>
        </section>

        <section className="service-panel">
          <header><span>02</span><div><h3>{content.appointmentTitle}</h3></div></header>
          <div className="appointment-path" aria-label={content.appointmentPath.join('至')}>
            {content.appointmentPath.map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}
          </div>
          <ul>{content.appointmentNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="service-panel">
          <header><span>03</span><div><h3>{content.contactTitle}</h3></div></header>
          <ol>{content.contactSteps.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section className="service-panel service-panel--counter">
          <header><span>04</span><div><h3>{content.counterTitle}</h3><p>{content.counterIntro}</p></div></header>
          <div className="counter-materials">
            {content.counterMaterials.map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, '0')}</b><span>{item}</span></div>)}
          </div>
        </section>

        <section className="service-panel service-panel--message">
          <header><span>05</span><div><h3>{content.messageTitle}</h3><p>已根据当前场景自动带入预约路径与材料清单。</p></div></header>
          <pre>{customerMessage}</pre>
          <CopyButton text={customerMessage} mode="direct" />
        </section>
      </div>
    </section>
  )
}
