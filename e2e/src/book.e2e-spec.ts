import { browser, logging } from 'protractor';
import { v4 as uuid } from 'uuid';

import { AppPage } from './app.po';
import { BookPage } from './book.po';

describe('Book Page', () => {
    let appPage: AppPage;
    let bookPage: BookPage;

    beforeEach(() => {
        appPage = new AppPage();
        bookPage = new BookPage();
    });

    it('should add a book', () => {
        const title = uuid();
        appPage.navigateTo();
        expect(bookPage.bookExists(title)).toBe(false);
        bookPage.getTitleControl().sendKeys(title);
        bookPage.getAuthorControl().sendKeys('William Gibson');
        bookPage.clickAddBook();
        expect(bookPage.bookExists(title)).toBe(true);
    });

    // We will add in the new Angular 8 catch-all
    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});