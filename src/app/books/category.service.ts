import { Injectable, OnDestroy } from '@angular/core';

import { BOOKS, MY_READING_LIST } from './mocks/books-records';
import { BookCategory, Category } from './models/book-category';

import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnDestroy {

  categoryEvents$ = new BehaviorSubject<string>('start');


  constructor() {

  }

  ngOnDestroy(): void {
    this.categoryEvents$.complete();
  }


  getCategoryEvents() : Observable<BookCategory[]> {

    return this.categoryEvents$.pipe(
      //tap((eventName) => console.log(eventName)),
      switchMap((eventName) => this.getCategories())

    );
  }

  getCategories(): Observable<BookCategory[]> {

    //let allCats:string[] = ['Reading List', 'Favorites'];
    let frequency = new Map<string, number>();

    //calculate frequency
    BOOKS.forEach(book => {

      const validCategories: string[] = book.categories && book.categories.length ? book.categories : []
      for (const categoryName of validCategories) {
        let counter = frequency.get(categoryName) === undefined ? 1 : frequency.get(categoryName)! + 1;
        frequency.set(categoryName, counter);
      }

    });

    frequency = new Map([...frequency.entries()].sort((a, b) => b[1] - a[1]));

    let calculatedCategories = Array.from(frequency.keys()).map(m => {
      return { name: m, frequency: frequency.get(m), icon: '' } as BookCategory;
    });

    //let calculatedCategories: BookCategory[] = [];
    // defaults categories
    calculatedCategories.unshift({ name: Category.All, frequency: BOOKS.length, icon: 'library_books' })
    calculatedCategories.unshift({ name: Category.Reading, frequency: MY_READING_LIST.length, icon: 'bookmark_border' })

    const categories = of(calculatedCategories);

    return categories;
  }










}
