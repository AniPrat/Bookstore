import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BookService } from './book.service';
import { Book } from './models/book';


describe('BookService', () => {

  let httpTestingController: HttpTestingController;
  let testBooks: Book[]=[];
  beforeEach(() => {
    testBooks = [{
      title: 'The Lord of the Rings',
      author: 'J R R Tolkien',
      cover: '',
      bookId: 1
  }, {
      title: 'The Left Hand of Darkness',
      author: 'Ursula K Le Guin',
      cover: '',
      bookId: 2
  }];
    
  TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ]
  });
  httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: BookService = TestBed.get(BookService);
    expect(service).toBeTruthy();
  });

  /*it('should return books',inject([BookService],
    fakeAsync((service: BookService) => {
      let books: Book[];
      service.getBooks().subscribe(data => books=data);
      tick();
      expect(books).toBeTruthy();
      expect(books[0].title).toBe('As You Like It');
    })
    ));*/

    /*it('should add a book',inject([BookService],
      fakeAsync((service:BookService) =>{
        let books:Book[];
        let added:Book;
        const expected =new Book('A wizard of EarthSea','Ursala le','',3);
        service.getBooks().subscribe(data =>books=data);
        tick();
        const expectedLength=books.length+1;
        service.addBook(expected).subscribe(data => added=data);
        service.getBooks().subscribe(data =>{books=data});
        tick();
        expect(books.length).toBe(expectedLength);
        expect(books[books.length-1]).toBe(expected);
        expect(added).toBe(expected);
      })
    ));*/

    it('should return books', inject([BookService], fakeAsync((service: BookService) => {
      let books: Book[];
      service.getBooks()
          .subscribe(data => books = data);
      const req = httpTestingController.expectOne('http://localhost:8080/BookService/jaxrs/books');
      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');
      // Respond with mock data, causing Observable to resolve.
      req.flush(testBooks);
      // Assert that there are no outstanding requests.
      httpTestingController.verify();
      // Cause all Observables to complete and check the results
      tick();
      expect(books[0].title).toBe('The Lord of the Rings');
  })));

  it('should POST to add a book', inject([BookService], fakeAsync((service: BookService) => {
    const expected = new Book('A Wizard of EarthSea', 'Ursula K Le Guin', '', 3);
    service.addBook(expected)
        .subscribe();
    const req = httpTestingController.expectOne('http://localhost:8080/BookService/jaxrs/books');
    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');
    // Assert that it was called with the right data
    expect(req.request.body).toBe(expected);
    // Respond with empty data.
    req.flush(null);
    // Assert that there are no outstanding requests.
    httpTestingController.verify();
    tick();
})));

});
