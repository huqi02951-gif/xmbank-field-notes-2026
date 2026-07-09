import { describe, expect, it } from 'vitest'

import { accountOpeningMaterials } from '../fixtures/accountOpeningMaterials'
import { buildAccountOpeningResult } from './buildAccountOpeningResult'
import { formatAccountOpeningChecklist } from './formatAccountOpeningChecklist'

const disclaimer = '示例仅用于理解材料结构，实际办理前请以当地网点最新要求为准。'

describe('buildAccountOpeningResult', () => {
  it.each([
    ['basic', ['entity-qualification', 'representative-identity']],
    ['general', ['entity-qualification', 'seal-authorization']],
    ['special', ['entity-qualification', 'control-relationship']],
  ] as const)('builds ready and missing material groups for %s accounts', (kind, selectedIds) => {
    const result = buildAccountOpeningResult(kind, selectedIds)

    expect(result.ready.map((material) => material.id)).toEqual(selectedIds)
    expect(result.missing.length).toBeGreaterThan(0)
    expect(result.disclaimer).toBe(disclaimer)
  })

  it('returns all required materials as missing for an empty selection', () => {
    const result = buildAccountOpeningResult('basic', [])

    expect(result.ready).toEqual([])
    expect(result.missing.map((material) => material.id)).toEqual([
      'entity-qualification',
      'representative-identity',
      'control-relationship',
      'operating-premises',
      'seal-authorization',
    ])
  })

  it('ignores unknown ids, keeps stable fixture order, and does not mutate source fixtures', () => {
    const before = structuredClone(accountOpeningMaterials)

    const result = buildAccountOpeningResult('special', [
      'unknown-private-field',
      'seal-authorization',
      'entity-qualification',
    ])

    expect(result.ready.map((material) => material.id)).toEqual([
      'entity-qualification',
      'seal-authorization',
    ])
    expect(accountOpeningMaterials).toEqual(before)
  })
})

describe('formatAccountOpeningChecklist', () => {
  it('formats numbered ready and missing sections without sensitive or absolute operational language', () => {
    const result = buildAccountOpeningResult('basic', [
      'entity-qualification',
      'representative-identity',
    ])

    const formatted = formatAccountOpeningChecklist('基本户示例', result)

    expect(formatted).toContain('基本户示例')
    expect(formatted).toContain('一、已准备材料')
    expect(formatted).toContain('1. 主体资格材料')
    expect(formatted).toContain('2. 代表人或经办人身份材料')
    expect(formatted).toContain('二、可补充材料')
    expect(formatted).toContain('1. 控制关系说明')
    expect(formatted).toContain(disclaimer)
    expect(formatted).not.toMatch(
      /(?:有限公司|张三|身份证号|手机号|电话|账户号|账号|授信额度|万元|费用|收费|内部系统|客户经理|必须|务必|应当|上传|导出|保存)/,
    )
  })
})
