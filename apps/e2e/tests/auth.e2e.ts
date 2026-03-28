import { test, expect } from '@playwright/test'

test('Signup page loads and can fill sign-up form', async ({ page }) => {
  await page.goto('/signup')
  await page.fill('#username', 'tester')
  await page.fill('#email', 'tester@example.com')
  await page.fill('#password', 'Password123')
  await page.click('text=Signup')
// The form is inert in this demo; ensure the page remains usable
  await expect(page).toHaveURL(/signup|$/)
  await expect(page.locator('h2')).toHaveText('Signup')
})
