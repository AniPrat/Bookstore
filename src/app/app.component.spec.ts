import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookPageComponent } from './books/book-page/book-page.component';
import { Component } from '@angular/core';


@Component({
  selector:'app-book-page',
  template: 'Mock Book Page'
})
class BookPageMockComponent{}

@Component({
  selector:'app-about-page',
  template: 'Mock About Page'
})
class AboutPageMockComponent{}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AboutPageMockComponent
      ],
    }).compileComponents();
  }));

 /* it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angles on Books'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angles on Books');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(' Welcome to Angles on Books! ');
  });
  */
});
