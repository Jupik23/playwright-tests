import {Page} from "@playwright/test";

export class Report{   
    private readonly downloadZipButton = this.page.getByRole('link', { name: 'Pobierz jako zip' });   

    constructor(private readonly page: Page){}

    async downaloadFile(){
         const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadZipButton.click(),
        ]);

    }
}