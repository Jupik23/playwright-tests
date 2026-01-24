import { test, Page } from "@playwright/test";
import { LoginPage } from "./pages/login";
import { User } from "./test-data/user";
import { Report } from "./pages/reports";

test.describe("Report test", () =>{
    test.beforeEach(async ({page}) => {
        const login_page = new LoginPage(page)
        await login_page.open();
        await login_page.login(User.validUser.username, User.validUser.password);
        await login_page.asserUserIsLogged(User.validUser.fullname);
    });
    // test("Dowload zip test", async ({page})=>{
    //     const new_report = new Report(page);
    //     await new_report.downaloadFile();
    // })
})

