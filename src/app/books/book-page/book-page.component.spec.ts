import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPageComponent } from './book-page.component';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BookService } from 'src/app/book.service';

@Component({
  selector:'app-book-list',
  template:'mock book list'
})
class BookLIstMockComponent{
  @Input()
  books:Book[];
}

@Component({
  selector:'app-book-form',
  template:'Mock Book Form'
})
class BookFormMockComponent{
    book: Book;

    @Output()
    createBook = new EventEmitter<Book>();

    add() {
        this.createBook.emit(this.book);
        //this.book=new Book('','','',-1);
    }
}

describe('BookPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;
  let addBookSpy;

  beforeEach(async(() => {

    // A test list of books
    const testBooks: Book[] = [{
      title: 'The Hobbit',
      author: 'J R R Tolkien',
      cover: '',
      bookId: 1
  }, {
      title: 'A Wizard of Earthsea',
      author: 'Ursula K Le Guin',
      cover: '',
      bookId: 2
  }];

  // Create a fake BookService object
    const bookService = jasmine.createSpyObj('BookService', ['getBooks', 'addBook']);
    bookService.getBooks.and.returnValue(of(testBooks));
    addBookSpy = bookService.addBook.and.callFake(function (param: Book) {
      return of(param);
    });

    TestBed.configureTestingModule({
      declarations: [ BookPageComponent, BookLIstMockComponent, BookFormMockComponent ],
      providers: [{provide: BookService, useValue: bookService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass books to the child component',()=>{
    const bookList=fixture.debugElement.query(By.css('app-book-list')).componentInstance;
    expect(bookList.books.length).toBe(2);
  });

 /* it('should contain a table',() => {
    const complied=fixture.debugElement.nativeElement;
    const table=complied.querySelector('table');
    console.log('table');
    //expect(table.rows.length).toBe(2);
    //expect(table.rows[0].cells[0].textContent).toBe('As You Like It');
  });

  it('should add a book to the array',()=>{
    const oldLength=component.books.length;
    component.addBook(new Book('The Lathe of Heaven','Ursala ke ge uain','',3));
    expect(component.books.length).toBe(oldLength+1);
    expect(component.books[oldLength].title).toBe('The Lathe of Heaven');
  });

  it('should respond to the output event from the book form', () => {
    const oldLength = component.books.length;
    // Get the mock book form component
    const bookForm = fixture.debugElement.query(By.css('app-book-form')).componentInstance;
    // Set the book
    bookForm.book = new Book('The Silmarillion', 'J R R Tolkein', '', 3);
    // Trigger the output event
    bookForm.add();
    // Now check the new book was added
    expect(component.books.length).toBe(oldLength + 1);
    expect(component.books[oldLength].title).toBe('The Silmarillion');
});*/

it('should call the service to add a book', () => {
  const expected = new Book('The Lathe of Heaven', 'Ursula K Le Guin', '', 3);
  component.addBook(expected);
  expect(addBookSpy).toHaveBeenCalledWith(expected);
});

it('should respond to the output event from the book form', () => {
  const expected = new Book('The Silmarillion', 'J R R Tolkien', '', 7);
  // Get the mock book form component
  const bookForm = fixture.debugElement.query(By.css('app-book-form')).componentInstance;
  // Set the book
  bookForm.book = expected;
  // Trigger the output event
  bookForm.add();
  // Now check the method was called
  expect(addBookSpy).toHaveBeenCalledWith(expected);
});

it('should retrieve books from the service', () => {
  expect(component.books.length).toBe(2);
  expect(component.books[0].title).toBe('The Hobbit');
  expect(component.books[1].title).toBe('A Wizard of Earthsea');
});

});
