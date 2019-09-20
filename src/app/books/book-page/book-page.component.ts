import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/book.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  /*books: Book[] = [{
      title: 'As You Like It',
      author: 'William Shakeshpear',
      cover:'',
      bookId: 1
  },{
    title: 'The Roar Of The Lion',
    author: 'Mahendra Singh Dhoni',
    cover:'',
    bookId: 2
  }];*/
  books:Book[]=[];

  addBook(book: Book) {
    this.bookservice.addBook(book)
        .subscribe(() => this.getBooks());
}
  getBooks() {
    this.bookservice.getBooks()
        .subscribe(data => this.books = data);
}
  constructor(private bookservice : BookService) { }

  ngOnInit() {
    this.getBooks();
  }

}
