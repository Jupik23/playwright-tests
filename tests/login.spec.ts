import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('te');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('test1234');
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').dblclick();
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('unsuccessfull login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('test123');
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();
    await expect(page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków")
  });

  test.only('unsuccessfull login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').dblclick();
    await page.getByTestId('password-input').fill('test');
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText("hasło ma min. 8 znaków")
  });
});