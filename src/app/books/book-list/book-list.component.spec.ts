import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

@Pipe({
  name: 'noImage'
})
class SharedMockPipe implements PipeTransform{
  transform(value: string): string {
    //return 'a.png'
    return value ? value : '/assets/images/NoImage.svg';
  }
}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListComponent, SharedMockPipe
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should contain a table', () => {
    component.books = [{
        title: 'As You Like It',
        author: 'William Shakeshpear',
        cover: '',
        bookId: 1
    }, {
        title: 'The Roar Of The Lion',
        author: 'Mahendra Singh Dhoni',
        cover: '',
        bookId: 2
    }];

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    // console.log(table);
    expect(table.rows.length).toBe(3);
    expect(table.rows[0].cells[0].textContent).toBe('Title ');
    expect(table.rows[1].cells[0].textContent).toBe('As You Like It');
    expect(table.rows[2].cells[0].textContent).toBe('The Roar Of The Lion');
});

it('should contain a div if there are no books', () => {
    component.books = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    const div = compiled.querySelector('#nobooks');
    expect(div).toBeTruthy();
    expect(table.rows.length).toBe(1);
});

});
