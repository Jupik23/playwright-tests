import {Page} from '@playwright/test'

export class Pulpit{

    private readonly receiver = this.page.locator('#widget_1_transfer_receiver');
    private readonly transfer_amount = this.page.locator('#widget_1_transfer_amount');
    private readonly transfer_title = this.page.locator('#widget_1_transfer_title');
    private readonly send_button = this.page.getByRole('button', { name: 'wykonaj' });
    private readonly ok_button = this.page.getByTestId('close-button');
    private readonly confirmation_button = this.page.getByRole('link', { name: 'Przelew wykonany! Chuck' });

    async sendTransfer(amount: number): Promise<void>{
        await this.receiver.selectOption('2');
        await this.transfer_amount.fill(amount.toString());
        await this.transfer_title.fill("Testowy tytuł przelewu");
        await this.send_button.click();
        await this.ok_button.click();
        await this.confirmation_button.click();
    } 

    constructor(private readonly page: Page){}
}