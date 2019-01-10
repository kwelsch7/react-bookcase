export interface BookSearchResult {
  kind: string;
  totalItems: number;
  items: SearchResultItem[];
}

export interface SearchResultItem {
  kind: string;
  volumeInfo: Book;
  // There's more, but doesn't seem pertinent
}

interface ISBNTypes {
  type: 'ISBN_10'|'ISBN_13';
  identifier: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  // is there larger?
}

export interface Book {
  title: string;
  subtitle: string;
  authors?: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: ISBNTypes[];
  pageCount: number;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string; // might be 'MATURE'|'NOT_MATURE'
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string; // seems to be the same as info but without search criteria
  // There was a couple other things that didn't seem pertinent
}
