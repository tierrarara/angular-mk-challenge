import { Component, Input } from '@angular/core';
import { BookCategory, Category } from '../../models/book-category';
import { CategoryService } from '../../category.service';
import { BehaviorSubject, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.css'],

})
export class BookCategoriesComponent {

  categories$!: Observable<BookCategory[]>;

  categoryEvents$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  destroyer$ = new Subject<string>();
  
  @Input()
  filter: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {

    this.categories$ = this.categoryEvents$
    .pipe(
      takeUntil(this.destroyer$),
      switchMap((change) => this.categoryService.getCategoryEvents() )
    )


    // let observable = this.categoryService.getCategories();
    // this.subscription = observable
    //   .subscribe(categories => {
    //     this.categories = categories;
    //   });
  }

  applyFilter(): void {

  }

  ngOnDestroy(): void {
    this.destroyer$.next('good bye');
    this.destroyer$.complete();
  }
}
