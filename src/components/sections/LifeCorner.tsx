import { useState } from 'react'

import { siteContent } from '../../content/content.zh-CN'

export function LifeCorner() {
  const { life } = siteContent
  const [openEntryId, setOpenEntryId] = useState<string | null>(null)

  return (
    <section
      className="section-shell life-corner page-grid"
      id="life-corner"
      aria-labelledby="life-corner-title"
    >
      <div className="life-corner__heading">
        <p className="section-index">04</p>
        <h2 id="life-corner-title">{life.title}</h2>
        <p>{life.introduction}</p>
      </div>

      <div className="life-entries">
        {life.entries.map((entry) => {
          const isOpen = entry.id === openEntryId
          const panelId = `life-entry-${entry.id}`

          return (
            <div className="life-entry" key={entry.id}>
              <button
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenEntryId(isOpen ? null : entry.id)}
              >
                <span>{entry.title}</span>
                <span aria-hidden="true">{isOpen ? '收起' : '展开'}</span>
              </button>
              {isOpen ? (
                <div className="life-entry__body" id={panelId}>
                  <p>{entry.body}</p>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
