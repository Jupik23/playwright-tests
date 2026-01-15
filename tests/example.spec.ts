import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').dblclick();
  await page.getByTestId('password-input').fill('test1234');
  await page.getByTestId('login-button').click();
  await page.locator('div').nth(3).click();
});