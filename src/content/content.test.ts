import { describe, expect, it } from 'vitest'
import { siteContent } from './content.zh-CN'

describe('institute content model', () => {
  it('contains a complete curriculum, field guide and research method', () => {
    expect(siteContent.curriculum.stages).toHaveLength(4)
    expect(siteContent.fieldPractice.moments).toHaveLength(4)
    expect(siteContent.research.method).toHaveLength(5)
    expect(siteContent.boundaries.labels).toHaveLength(3)
    expect(siteContent.mentorship.escalation).toContain('立即停止')
  })

  it('keeps instructional classifications explicit', () => {
    expect(siteContent.apex.classification).toContain('教学示例')
    expect(siteContent.apex.disclaimer).toContain('不构成')
    expect(JSON.stringify(siteContent)).not.toMatch(/保证通过|一定可以|轻松拿下|绝对准确/)
  })
})
