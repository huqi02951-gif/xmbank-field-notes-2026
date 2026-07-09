import { siteContent } from '../../content/content.zh-CN'

export function BusinessMoments() {
  const { moments } = siteContent

  return (
    <section
      className="section-shell business-moments"
      id="business-moments"
      aria-labelledby="business-moments-title"
    >
      <div className="section-heading section-heading--wide page-grid">
        <p className="section-index">02</p>
        <h2 id="business-moments-title">{moments.title}</h2>
      </div>

      <article className="moment moment--dialogue page-grid">
        <div className="moment__heading">
          <p className="eyebrow">{moments.dialogue.eyebrow}</p>
          <h3>{moments.dialogue.title}</h3>
        </div>
        <div className="dialogue-layout">
          <blockquote>{moments.dialogue.quote}</blockquote>
          <div>
            <h4>银行会关注</h4>
            <ul>
              {moments.dialogue.concerns.map((concern) => (
                <li key={concern}>{concern}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="moment__closing">{moments.dialogue.closing}</p>
      </article>

      <article className="moment moment--workspace page-grid">
        <div className="moment__heading">
          <p className="eyebrow">{moments.workspace.eyebrow}</p>
          <h3>{moments.workspace.title}</h3>
        </div>
        <div className="workspace-layout">
          <div>
            <h4>桌面上的碎片</h4>
            <ul className="material-fragments">
              {moments.workspace.fragments.map((fragment) => (
                <li key={fragment}>{fragment}</li>
              ))}
            </ul>
          </div>
          <div className="workspace-questions">
            <h4>整理后会追问</h4>
            <ol>
              {moments.workspace.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </div>
        </div>
        <p className="moment__closing">{moments.workspace.closing}</p>
      </article>

      <article className="moment moment--questions page-grid">
        <div className="moment__heading">
          <p className="eyebrow">{moments.questions.eyebrow}</p>
          <h3>{moments.questions.title}</h3>
        </div>
        <ol className="four-questions">
          {moments.questions.items.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
        <p className="moment__closing moment__closing--note">{moments.questions.closing}</p>
      </article>
    </section>
  )
}
