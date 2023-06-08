export interface BookCategory {
    name: string;
    frequency: number;
    icon: string;
}

export enum Category {
    All = 'All',
    Empty = 'Empty',
    Reading = 'Reading',
    Favorites = 'Favorites'
  };
