import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import { FormsModule } from '@angular/forms';
import { Book } from 'src/app/models/book';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFormComponent ],
      imports : [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should emit an event on click', () => {
    spyOn(component.createBook, 'emit');

    // trigger the click
    const nativeElement = fixture.debugElement.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    // check the output event was triggered
    expect(component.createBook.emit).toHaveBeenCalled();
});

it('should pass a book in the click event', () => {
  spyOn(component.createBook, 'emit');

  const expected = new Book('The Silmarillion', 'J R R Tolkein', '', -1);

  /*
   * Testing the input fields is extremely difficult, since changing their values programmatically
   * will not trigger the ngModel binding. Instead we can change the property on the component.
   * 
   * That property is private. You can choose to make it public, but that compromises the API of
   * your code (presumably the property *should* be private). Or you can access it using the array
   * form. This has been left open deliberately as an "escape hatch" to give access to private
   * members for testing. Do NOT use this mechanism to subvert private members in production code!
   * https://github.com/microsoft/TypeScript/issues/19335
   */
  component['book'] = expected;

  // trigger the click
  const nativeElement = fixture.debugElement.nativeElement;
  const button = nativeElement.querySelector('button');
  button.dispatchEvent(new Event('click'));

  fixture.detectChanges();

  expect(component.createBook.emit).toHaveBeenCalledWith(expected);
});

});
