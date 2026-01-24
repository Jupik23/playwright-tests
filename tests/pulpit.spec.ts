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

    test("Sending new transfer", async({page}) => {
        const pulpit = new Pulpit(page);    
        await pulpit.sendTransfer(160);
    });
    test.only("Success phone top up", async({page})=>{
        const pulpit = new Pulpit(page);
        const amount = 50;
        await pulpit.phoneTopUp('502 xxx xxx', amount);
        await pulpit.assertTopUpMessage('502 xxx xxx', amount)
    })
})