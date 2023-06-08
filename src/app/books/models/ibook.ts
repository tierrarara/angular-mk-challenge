export interface PublishDate {
    $date: string
}


export interface IBook {
    _id: any;
    title?: string;
    isbn?:string;
    pageCount?:number;
    publishedDate?: any;
    thumbnailUrl?: string;
    shortDescription?: string;
    longDescription?: string;
    status?: string;
    authors?: string[];
    categories?: string[];
    

}

export class UIBook implements  IBook {
    _id: any;
    title?: string ;
    isbn?: string ;
    pageCount?: number ;
    publishedDate?: any;
    thumbnailUrl?: string ;
    shortDescription?: string ;
    longDescription?: string ;
    status?: string ;
    authors?: string[] ;
    categories?: string[] ;

    getID () : string {
        return '';
    }

    getPublishedDate() : Date {
        return new Date();
    }

}
