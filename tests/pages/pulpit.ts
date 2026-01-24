import {expect, Locator, Page} from '@playwright/test'

export class Pulpit{

    private readonly receiver: Locator;
    private readonly transfer_amount: Locator;
    private readonly transfer_title: Locator;
    private readonly send_button: Locator;
    private readonly ok_button: Locator;
    private readonly confirmation_button: Locator;
    private readonly phoneNumberToTopUp: Locator;
    private readonly topUpAmount: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly topUpPushareButton: Locator;
    private readonly isCorrectTopUpText: Locator;


    async sendTransfer(amount: number): Promise<void>{
        await this.receiver.selectOption('2');
        await this.transfer_amount.fill(amount.toString());
        await this.transfer_title.fill("Testowy tytuł przelewu");
        await this.send_button.click();
        await this.ok_button.click();
        await this.confirmation_button.click();
    }

    async phoneTopUp(phoneNumber: string, amount: number){
        await this.phoneNumberToTopUp.selectOption(phoneNumber);
        await this.topUpAmount.fill(amount.toString());
        await this.agreeCheckbox.click();
        await this.topUpPushareButton.click();
    }  

    async assertTopUpMessage(phoneNumber: string, amount: number){
        await expect(this.isCorrectTopUpText).toBeVisible();
        await expect(this.isCorrectTopUpText).toContainText(`Doładowanie wykonane!`);
        await expect(this.isCorrectTopUpText).toContainText(`${amount}`);
        await expect(this.isCorrectTopUpText).toContainText(phoneNumber);
     }

    constructor(private readonly page: Page){
       this.receiver = page.locator('#widget_1_transfer_receiver');
       this.transfer_amount = page.locator('#widget_1_transfer_amount');
       this.transfer_title = page.locator('#widget_1_transfer_title');
       this.send_button = page.getByRole('button', { name: 'wykonaj' });
       this.ok_button = page.getByTestId('close-button');
       this.confirmation_button = page.getByRole('link', { name: 'Przelew wykonany! Chuck' });
       this.phoneNumberToTopUp = page.locator('#widget_1_topup_receiver');
       this.topUpAmount = page.locator('#widget_1_topup_amount');
       this.agreeCheckbox = page.locator('#uniform-widget_1_topup_agreement > span')
       this.topUpPushareButton = page.getByRole('button', { name: 'doładuj telefon' })
       this.isCorrectTopUpText = page.getByTestId('message-text');
    }
}