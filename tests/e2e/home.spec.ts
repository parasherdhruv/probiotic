import { test, expect } from '@playwright/test'
import { BRAND_NAME } from '../../src/constants'

test.describe('Homepage', () => {
  test('should load the homepage and display the correct title', async ({ page }) => {
    await page.goto('/')
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(new RegExp(BRAND_NAME))
  })

  test('should navigate to the products page when clicking Shop Formulations', async ({ page }) => {
    await page.goto('/')
    
    // Click the "Shop Formulations" link (or similar primary CTA)
    const shopButton = page.getByRole('link', { name: /shop formulations/i }).first()
    await expect(shopButton).toBeVisible()
    await shopButton.click()
    
    // Expects the URL to contain products.
    await expect(page).toHaveURL(/.*\/products/)
    
    // Check that the products page has loaded correctly
    await expect(page.getByRole('heading', { name: /our formulations/i })).toBeVisible()
  })
})
