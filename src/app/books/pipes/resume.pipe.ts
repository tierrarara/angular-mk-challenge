import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from '../models/ibook';

@Pipe({
  name: 'resume'
})
export class ResumePipe implements PipeTransform {

  transform(book: IBook, len: number): string {
    let res = '';

    if (book.shortDescription) {
      res = book.shortDescription.substring(0, book.shortDescription.length >= len ? len : book.shortDescription.length)
    } else if (book.longDescription) {
      res = book.longDescription.substring(0, book.longDescription.length >= len ? len : book.longDescription.length)
    }

    return res;

  }

}
