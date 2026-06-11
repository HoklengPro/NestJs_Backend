import { test, expect } from '@playwright/test';

test('locked out user shows error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Sorry, this user has been locked out',
  );
});

test('sort products price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map((text) => parseFloat(text.replace('$', '')));
  const lowestPrice = Math.min(...prices);

  expect(prices[0]).toBe(lowestPrice);
});

test('logout returns to login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /open menu/i }).click();
  await page.getByRole('link', { name: /logout/i }).click();

  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
