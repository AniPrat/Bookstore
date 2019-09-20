import { element, by } from 'protractor';

/*
 * If you want to try additional type-safety, the return types are:
 * bookExists(): Promise<boolean>
 * getTitleControl(): ElementFinder
 * getAuthorControl(): ElementFinder
 * clickAddBook(): Promise<void>
 * 
 * However, for the two Promise items, you will need a cast because the actual
 * type returned by the ElementFinder methods is a little more complex than a
 * simple Promise.
 */
export class BookPage {
    bookExists(title: string) {
        return element(by.linkText(title)).isPresent();
    }

    getTitleControl() {
        return element(by.css('app-book-form input#title'));
    }

    getAuthorControl() {
        return element(by.css('app-book-form input#author'));
    }

    clickAddBook() {
        return element(by.buttonText('Add Book')).click();
    }
}