const { test, expect } = require('@playwright/test');
test('home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Assistant App/);
});
