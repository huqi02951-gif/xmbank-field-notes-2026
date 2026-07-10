import { expect, test } from '@playwright/test'

test('complete learning journey and bilingual APEX lab work', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: '实务研习院' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '一个月，不只积累经历' })).toBeVisible()
  await page.getByRole('tab', { name: /SYNTHESIZE/ }).click()
  await expect(page.getByText('一页可复核分析')).toBeVisible()
  await page.getByRole('button', { name: '繁體' }).click()
  await expect(page.getByRole('heading', { level: 1, name: '實務研習院' })).toBeVisible()
  await page.getByRole('radio', { name: '专用户示例' }).click()
  await page.getByRole('checkbox', { name: /主体资格材料/ }).click()
  await expect(page.getByRole('region', { name: '清晰结果' })).toContainText('已準備材料')
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
