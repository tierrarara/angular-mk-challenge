import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './books/components/booklist/booklist.component';
import { BookDetailComponent } from './books/components/book-detail/book-detail.component';

const routes: Routes = [{
  path: '',
  component: BooklistComponent,
  title: 'All Books'
},
{
  path: 'books/:category',
  component: BooklistComponent,
  title: 'Book List'
},{
  path: 'book/:isbn',
  component: BookDetailComponent,
  title: 'Book Detail'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
