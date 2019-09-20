import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 /* books: Book[] = [{
    title: 'As You Like It',
    author: 'William Shakeshpear',
    cover:'',
    bookId: 1
},{
  title: 'The Roar Of The Lion',
  author: 'Mahendra Singh Dhoni',
  cover:'',
  bookId: 2
}];
*/

private url = 'http://localhost:8080/BookService/jaxrs/books';

  constructor(private http: HttpClient) {

   }

  getBooks(): Observable<Book[]>{
    //return of(this.books);
    return this.http.get<Book[]>(this.url);  //GET rest api
  }

  addBook(book:Book): Observable<Book>{
    /*this.books.push(book);
    return of(book);
    */
   const headers = new HttpHeaders({
    'Content-type': 'application/json'
    });
    return this.http.post<Book>(this.url, book, { headers: headers });
  }

}
