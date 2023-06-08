import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BOOKS, MY_READING_LIST } from '../../mocks/books-records';
import { BookService } from '../../book.service';
import { IBook } from '../../models/ibook';
//import { CategoryService } from '../../category.service';
import { Observable, Subject, BehaviorSubject, takeUntil, switchMap, debounceTime, map, tap} from 'rxjs';
import { Category } from '../../models/book-category';
import { ActivatedRoute } from '@angular/router';
//import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoryService } from '../../category.service';



@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent {

  readonly CategoryEnum = Category;

  @ViewChild('term') term!: ElementRef;

  books$!: Observable<IBook[]>;

  lastFilteredBooks: IBook[] = [];

  currentCategory!: string | null;

  destroyer$ = new Subject<string>();

  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  enableDrag:boolean = false;



  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;// TODO: use a provider
  }

  ngOnInit() {

    const categoryParam = this.route.snapshot.paramMap.get('category');
    
    this.currentCategory = categoryParam;

    this.enableDrag = this.currentCategory === Category.Reading;


    this.books$ = this.searchTerm$.pipe(
      tap((term: string) => console.log(term)),
      takeUntil(this.destroyer$),
      debounceTime(400),
      map((term:string) => term === '' ? Category.All : term),
      //distinctUntilChanged(),
      switchMap((userText: string) => this.bookService.getBooksByFilter(userText, categoryParam)),
      tap((currentList) => this.lastFilteredBooks = currentList)
    );

    //this.bookService.getBooksByFilter('userText').subscribe()

  }


  ngOnDestroy(): void {
    this.destroyer$.next('good bye');
    this.destroyer$.complete();
  }

  onDrop(event: CdkDragDrop<any>) {

    if (this.currentCategory !== Category.Reading || event.previousIndex == event.currentIndex) {
      return;
    }

    let runningOrder = '';

    const prevBook = this.lastFilteredBooks[event.previousIndex];
      const currentBook = this.lastFilteredBooks[event.currentIndex];

      const prevIndex = this.bookService.getIndexInto(MY_READING_LIST, prevBook.isbn!);
      const currentIndex = this.bookService.getIndexInto(MY_READING_LIST, currentBook.isbn!);

      // console.log(prevIndex ,'=>',  prevBook)
      // console.log(currentIndex ,'=>',  currentBook)

      moveItemInArray(MY_READING_LIST, prevIndex, currentIndex);

      this.searchTerm$.next(this.term.nativeElement.value);


    // const verySlowProcess = () => {
    //   runningOrder = runningOrder + '1';
      
    //   const prevBook = this.lastFilteredBooks[event.previousIndex];
    //   const currentBook = this.lastFilteredBooks[event.currentIndex];

    //   const prevIndex = this.bookService.getIndexInto(MY_READING_LIST, prevBook.isbn!);
    //   const currentIndex = this.bookService.getIndexInto(MY_READING_LIST, currentBook.isbn!);

    //   // console.log(prevIndex ,'=>',  prevBook)
    //   // console.log(currentIndex ,'=>',  currentBook)

    //   moveItemInArray(MY_READING_LIST, prevIndex, currentIndex);

    //   this.searchTerm$.next(this.term.nativeElement.value);

    // };


    // defer(() => of(verySlowProcess()))
    //   .pipe(
    //     take(1)
    //   ).subscribe({ complete: () => { console.log('defer completed'); } });

    //   runningOrder = runningOrder + '2';

    //   if(runningOrder === '12') console.log('is not async')

  }

  addToReadingList(book: IBook): void {
    this.bookService.setCategoryTo(book, Category.Reading);
    this.categoryService.categoryEvents$.next('category_counter_change');
  }

  removeFromReadingList(book: IBook): void {
    this.bookService.removeCategoryTo(book, Category.Reading);
    this.categoryService.categoryEvents$.next('category_counter_change');

    if(this.currentCategory == Category.Reading)
      this.searchTerm$.next(Category.All);// reload
  }

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
  }

}
