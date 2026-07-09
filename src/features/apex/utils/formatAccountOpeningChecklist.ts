import type { AccountOpeningResult } from '../types/accountOpening'

function numberedLines(items: readonly { name: string; note?: string }[]) {
  if (items.length === 0) {
    return ['暂无']
  }

  return items.map((item, index) => {
    const note = item.note ? ` — ${item.note}` : ''
    return `${index + 1}. ${item.name}${note}`
  })
}

export function formatAccountOpeningChecklist(
  kindLabel: string,
  result: AccountOpeningResult,
): string {
  return [
    kindLabel,
    '',
    '一、已准备材料',
    ...numberedLines(result.ready),
    '',
    '二、可补充材料',
    ...numberedLines(result.missing),
    '',
    result.disclaimer,
  ].join('\n')
}
