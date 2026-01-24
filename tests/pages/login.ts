import {Locator, Page, expect} from '@playwright/test'

export class LoginPage{
    private readonly loginInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly userNameLabel: Locator;
    private readonly usernameError: Locator;
    private readonly passwordError: Locator; 
    constructor(private readonly page: Page){
        this.loginInput= page.getByTestId('login-input');
        this.passwordInput= page.getByTestId('password-input');
        this.loginButton= page.getByTestId('login-button');
        this.userNameLabel = page.getByTestId('user-name');
        this.usernameError = page.getByTestId('error-login-id');
        this.passwordError= page.getByTestId('error-login-password');
    }


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