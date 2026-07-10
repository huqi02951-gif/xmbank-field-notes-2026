import { CopyButton } from '../common/CopyButton'
import { useLanguage } from '../../i18n/LanguageProvider'

export function ClosingReflection() {
  const { reflection } = useLanguage().t
  return <section className="section-shell reflection page-grid" id="reflection" aria-labelledby="reflection-title">
    <div className="reflection__heading"><p className="section-index">{reflection.eyebrow}</p><h2 id="reflection-title">{reflection.title}</h2><p>{reflection.introduction}</p></div>
    <div className="reflection__prompts"><ol>{reflection.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol><CopyButton text={reflection.prompts.join('\n')} /></div>
  </section>
}

