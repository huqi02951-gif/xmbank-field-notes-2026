import { expect, test } from '@playwright/test'

test('supports keyboard navigation and valid internal anchors', async ({ page }) => {
  await page.goto('/')
  const hrefs = await page.locator('a[href^="#"]:not([href^="#/"])').evaluateAll((links) => links.map((link) => link.getAttribute('href')))
  for (const href of hrefs) if (href && href !== '#') await expect(page.locator(href)).toHaveCount(1)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到主要内容' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeVisible()
})
