import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login';
import {User} from './test-data/user'
import { Pulpit } from './pages/pulpit';

test.describe('Main dashboard tests', () => {

    test.beforeEach(async ({page}) => {
        const login_page = new LoginPage(page);
        await login_page.open();
        await login_page.login(User.validUser.username, User.validUser.password);
        await login_page.asserUserIsLogged(User.validUser.fullname);
    });

    test.only("Sending new transfer", async({page}) => {
        const pulpit = new Pulpit(page);
        await pulpit.sendTransfer(160);
    });
})