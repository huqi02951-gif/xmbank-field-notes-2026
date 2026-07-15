import { expect, test } from '@playwright/test'

test('complete portal navigation, search and bilingual chapter work', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: '从一项业务，理解一家银行。' })).toBeVisible()
  await page.getByRole('textbox', { name: '搜索知识与工具' }).fill('重大预警')
  await page.getByRole('link', { name: /贷后重大预警客户续报/ }).click()
  await expect(page.getByRole('heading', { level: 1, name: '贷后重大预警客户续报' })).toBeVisible()
  await expect(page.getByText('小海螺批量查询与截图')).toBeVisible()
  await page.getByRole('button', { name: '繁體' }).click()
  await expect(page.getByRole('heading', { level: 1, name: '貸後重大預警客戶續報' })).toBeVisible()
  expect(errors).toEqual([])
})

test('account toolkit supports practical scenario switching without read tracking', async ({ page }) => {
  await page.goto('/#/module/account/materials')
  await expect(page.getByRole('heading', { level: 1, name: '开户与变更实用工作台' })).toBeVisible()
  await expect(page.getByText('开户尽调申请表')).toBeVisible()
  await expect(page.getByText('受益所有人系统 PDF')).toBeVisible()
  await expect(page.getByRole('button', { name: '复制简体' })).toBeVisible()
  await expect(page.getByRole('button', { name: '复制繁體' })).toBeVisible()
  await expect(page.getByRole('button', { name: '标记为已读' })).toHaveCount(0)

  await page.getByRole('tab', { name: /法定代表人变更/ }).click()
  await expect(page.getByText('新法定代表人有效身份证件原件', { exact: true })).toBeVisible()
  await expect(page.getByText('受益所有人及实际控制信息更新材料', { exact: true })).toBeVisible()
})

for (const width of [375, 390, 430, 768, 1440]) {
  test(`has no horizontal overflow on core pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/#/module/account/materials']) {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${path} overflow at ${width}px`).toBeLessThanOrEqual(1)
    }
  })
}
