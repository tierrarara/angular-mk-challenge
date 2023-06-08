import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookImage'
})
export class BookImagePipe implements PipeTransform {

  transform(bookImageUrl: string|null|undefined, ...args: any[]): string {
    
    // TODO: check is valid url

    if(!bookImageUrl || bookImageUrl.trim().length === 0)
      return '/assets/default-book-img.png';

    return bookImageUrl;

  }

}
