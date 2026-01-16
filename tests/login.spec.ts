import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login';
import { User } from './test-data/user';

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    const new_page = new LoginPage(page);
    await new_page.open();
    await new_page.login(User.validUser.username, User.validUser.password);
    await new_page.asserUserIsLogged(User.validUser.fullname);
  });

  test('unsuccessfull login with too short username', async ({ page }) => {
    const new_page = new LoginPage(page);
    await new_page.open();
    await new_page.triggerUsernameValidation('test122');
    await new_page.assertLoginError('identyfikator ma min. 8 znaków');
  });

  test.only('unsuccessfull login with too short password', async ({ page }) => {
    const new_page = new LoginPage(page);
    await new_page.open();
    await new_page.triggerPasswordValidation("test12");
    await new_page.assertPasswordError("hasło ma min. 8 znaków");
  });
});