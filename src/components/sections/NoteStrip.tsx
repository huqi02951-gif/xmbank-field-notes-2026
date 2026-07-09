import { CopyButton } from '../common/CopyButton'
import { siteContent } from '../../content/content.zh-CN'
import { useLanguage } from '../../i18n/LanguageProvider'

export function NoteStrip() {
  const { t } = useLanguage()
  const { noteStrip } = t
  const copyText = siteContent.noteStrip.lines.join('\n')

  return (
    <aside className="note-strip" aria-labelledby="note-strip-title">
      <div>
        <p className="eyebrow">03 / 随手记</p>
        <h2 id="note-strip-title">{noteStrip.title}</h2>
        {noteStrip.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <CopyButton text={copyText} />
      </div>
    </aside>
  )
}
