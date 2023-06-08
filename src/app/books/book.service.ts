import { Injectable } from '@angular/core';
import { BOOKS, MY_READING_LIST } from './mocks/books-records';
import { IBook, UIBook } from './models/ibook';

import { EMPTY, Observable, catchError, filter, map, of } from 'rxjs';
import { Category } from './models/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  //readingList: IBook[] = [];

  constructor() { }


  getBook(isbn: string): Observable<IBook | undefined> {
    return of(BOOKS.find(b => b.isbn === isbn));
  }

  getBooksByFilter(pattern: string, category: string | null): Observable<IBook[]> {


    let filteredBooks$: Observable<IBook[]>;


    // select source
    if (category !== Category.Reading) {
      filteredBooks$ = of(BOOKS);
    } else {
      filteredBooks$ = of(MY_READING_LIST);
    }

    if (category && category.toString().length > 0 && category !== Category.All) {
      filteredBooks$ = filteredBooks$.pipe(
        map((books: IBook[]) => books.filter(b => Array.isArray(b.categories) && b.categories.indexOf(category) >= 0))
      )
    }

    return filteredBooks$
      .pipe(
        map((books: IBook[]) => {
          let r = books.filter(b => {

            let sanitizedPatterm = pattern.toLocaleLowerCase()

            return pattern === Category.All
              || (b.title != undefined && b.title.toLocaleLowerCase().indexOf(sanitizedPatterm) >= 0)
              || (b.isbn != undefined && b.isbn!.toLocaleLowerCase().indexOf(sanitizedPatterm) >= 0)

          });
          return r;
        }),
        catchError(() => EMPTY),

      );
  }

  setCategoryTo(book: IBook, category: string): void {

    let found = BOOKS.find(b => b.isbn == book.isbn);
    //found?.categories
    if (!found) {
      return;// TODO: exception ???
    }

    if (!Array.isArray(found.categories)) {
      found.categories = [];
    }

    found.categories.push(category);

    MY_READING_LIST.push(found);

  }

  removeCategoryTo(book: IBook, category: string) {

    let foundBook = BOOKS.find(b => b.isbn == book.isbn);

    if (!foundBook)
      return;

    foundBook.categories = foundBook.categories?.filter(f => f != category);

    if (category != Category.Reading)
      return;

    this.removeFromMyReadingList(book);

  }

  removeFromMyReadingList(book: IBook) {
    //let found = MY_READING_LIST.findIndex(b => b.isbn == book.isbn);
    const found = this.getIndexInto(MY_READING_LIST, book.isbn ? book.isbn : '');

    if (found < 0) return;

    MY_READING_LIST.splice(found, 1);
  }

  getIndexInto(bookList: IBook[], isbn: string): number {
    return bookList.findIndex(b => b.isbn === isbn)
  }


}
