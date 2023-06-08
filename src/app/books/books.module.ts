import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './components/booklist/booklist.component';
import { MaterialModule } from '../material.module';
import { NgOptimizedImage } from '@angular/common';
import { BookImagePipe } from './pipes/book-image.pipe'
import { BookCategoriesComponent } from './components/book-categories/book-categories.component';
import { RouterModule } from '@angular/router';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ResumePipe } from './pipes/resume.pipe';
import { AppRoutingModule} from '../app-routing.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';




@NgModule({
  declarations: [
    BooklistComponent,
    BookCategoriesComponent,
    BookImagePipe,
    ResumePipe,
    BookDetailComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    
    CdkDropList,
    CdkDrag,
    
    
  ],
  exports: [BooklistComponent, BookCategoriesComponent]
})
export class BooksModule { }
