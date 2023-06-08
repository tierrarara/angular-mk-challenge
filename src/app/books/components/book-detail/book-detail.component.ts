import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IBook } from '../../models/ibook';
import { BookService } from '../../book.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  book$!: Observable<IBook | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {

        const isbn: string = (params.has('isbn') ? params.get('isbn') : '') as string;
        return this.bookService.getBook(isbn)
      }
      ));
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
}
