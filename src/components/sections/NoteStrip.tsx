import { siteContent } from '../../content/content.zh-CN'

export function NoteStrip() {
  const { noteStrip } = siteContent

  return (
    <aside className="note-strip" aria-labelledby="note-strip-title">
      <div>
        <p className="eyebrow">03 / 随手记</p>
        <h2 id="note-strip-title">{noteStrip.title}</h2>
        {noteStrip.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </aside>
  )
}
