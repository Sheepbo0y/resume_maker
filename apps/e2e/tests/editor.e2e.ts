import { test, expect } from '@playwright/test'

test('Editor page loads and template can be switched', async ({ page }) => {
  await page.goto('/editor')
  await expect(page.locator('h2')).toHaveText('Editor')
  // Change template
  const select = page.locator('#template-select')
  await select.selectOption({ value: 'ModernMinimal' })
  // Ensure the select value changed
  await expect(select).toHaveValue('ModernMinimal')
  // Toggle fullscreen option to exercise the feature
  const fullscreenBtn = page.locator('text=Fullscreen')
  if (await fullscreenBtn.count() > 0) {
    await fullscreenBtn.click()
  }
})
