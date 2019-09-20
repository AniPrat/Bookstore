import { AppPage } from "./app.po";
import { AboutPage } from './about.po';
import { browser, logging } from 'protractor';


describe('About page in workspace',() =>{
    let apppage:AppPage;
    let aboutpage:AboutPage;

    beforeEach(() =>{
        apppage=new AppPage();
        aboutpage=new AboutPage();
    });

    it('should navigate to about page',() =>{
        apppage.navigateTo();
        apppage.getAboutLink().click();
        expect(aboutpage.getAboutText()).toContain('about-page works! from about page');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
})