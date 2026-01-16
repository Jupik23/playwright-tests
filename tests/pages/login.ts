import {Page, expect} from '@playwright/test'

export class LoginPage{
    constructor(private readonly page: Page){}

    private readonly loginInput = this.page.getByTestId('login-input')
    private readonly passwordInput = this.page.getByTestId('password-input');
    private readonly loginButton = this.page.getByTestId('login-button');
    private readonly userNameLabel = this.page.getByTestId('user-name');

    private readonly usernameError = this.page.getByTestId('error-login-id');
    private readonly passwordError = this.page.getByTestId('error-login-password');

    async open(): Promise<void> {
        await this.page.goto('https://demo-bank.vercel.app/');
    }

    async login(username: string, password: string): Promise<void>{
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async triggerUsernameValidation(username: string): Promise<void> {
        await this.loginInput.fill(username);
        await this.passwordInput.click(); 
    }

     async triggerPasswordValidation(password: string): Promise<void> {
        await this.passwordInput.fill(password);
        await this.loginInput.click(); 
    }
    
    async asserUserIsLogged(name: string){
        await expect(this.userNameLabel).toHaveText('Jan Demobankowy');
    }
    
    async assertLoginError(message: string): Promise<void> {
        await expect(this.usernameError).toHaveText(message);
    }

    async assertPasswordError(message: string): Promise<void> {
        await expect(this.passwordError).toHaveText(message);
    }
}