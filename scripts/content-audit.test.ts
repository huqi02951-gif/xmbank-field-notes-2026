import { describe, expect, it } from 'vitest'

import { auditText } from './content-audit.mjs'

describe('auditText', () => {
  it.each([
    ['mainland-id', '身份证号 110105199001011234'],
    ['taiwan-id', '证件 A123456789'],
    ['mobile-phone', '手机号 13800138000'],
    ['bank-account', '账号 6222021234567890123'],
    ['unified-social-credit-code', '统一社会信用代码 91350200M00000000X'],
    ['email', 'mail user@example.com'],
    ['secret-assignment', 'API_KEY = "sk-test-secret"'],
    ['cookie-assignment', 'cookie: sessionid=abcdef123456'],
    ['internal-url', 'http://localhost:5173/admin'],
    ['private-network-url', 'https://192.168.1.10/report'],
    ['mac-path', '/Users/daisy/private/file.pdf'],
    ['linux-path', '/home/daisy/private/file.txt'],
    ['windows-path', 'C:\\\\Users\\\\daisy\\\\Desktop\\\\file.txt'],
    ['finance-record', '客户 张三 授信额度 500万元 到期日 2026-12-31'],
    ['pdf-path', 'source-private/导师行前会.pdf'],
  ])('flags %s', (ruleName, text) => {
    const findings = auditText('fixture.txt', text)

    expect(findings.some((finding) => finding.rule === ruleName)).toBe(true)
  })

  it('allows safe prose and source commit hashes', () => {
    const findings = auditText(
      'README.md',
      [
        '示例仅用于理解材料结构，不上传、不保存、不连接内部系统。',
        'APEX baseline commit 1aa4375c7bf88518e309fcbe636158cd67bf31f8.',
      ].join('\n'),
    )

    expect(findings).toEqual([])
  })
})
