import { describe, expect, it } from 'vitest'

import { convertText, convertValue } from './convert'

describe('convertText', () => {
  it('returns Simplified Chinese unchanged', async () => {
    await expect(convertText('资料与对公业务', 'zh-CN')).resolves.toBe('资料与对公业务')
  })

  it('converts display text to Taiwan Traditional while preserving protected banking terms', async () => {
    const source =
      '资料会用于厦门银行 APEX 2026 统一社会信用代码 法定代表人 受益所有人 银行承兑汇票 对公业务 授信 贷后管理。'

    const converted = await convertText(source, 'zh-TW')

    expect(converted).toContain('資料')
    expect(converted).toContain('厦门银行')
    expect(converted).toContain('APEX')
    expect(converted).toContain('2026')
    expect(converted).toContain('统一社会信用代码')
    expect(converted).toContain('法定代表人')
    expect(converted).toContain('受益所有人')
    expect(converted).toContain('银行承兑汇票')
    expect(converted).toContain('对公业务')
    expect(converted).toContain('授信')
    expect(converted).toContain('贷后管理')
  })
})

describe('convertValue', () => {
  it('recursively converts strings in nested values without mutating the source object', async () => {
    const source = {
      title: '资料整理',
      items: ['开户资料', { label: '风险提示', count: 2, enabled: true, empty: null }],
      missing: undefined,
    }

    const converted = await convertValue(source, 'zh-TW')

    expect(converted).toEqual({
      title: '資料整理',
      items: ['開戶資料', { label: '風險提示', count: 2, enabled: true, empty: null }],
      missing: undefined,
    })
    expect(source).toEqual({
      title: '资料整理',
      items: ['开户资料', { label: '风险提示', count: 2, enabled: true, empty: null }],
      missing: undefined,
    })
  })
})
