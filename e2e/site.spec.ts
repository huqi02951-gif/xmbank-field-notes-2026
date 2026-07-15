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

for (const width of [375, 390, 430, 768, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })
}
