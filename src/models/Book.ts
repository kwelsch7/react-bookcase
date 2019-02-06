export interface BookSearchResult {
  kind: string;
  totalItems: number;
  items: SearchResultItem[];
}

export interface SearchResultItem {
  id: string;
  kind: string;
  volumeInfo: Book;
  // There's more, but doesn't seem pertinent
  // saleInfo
  // accessInfo
}

interface ISBNTypes {
  type: 'ISBN_10'|'ISBN_13';
  identifier: string;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export interface Book {
  id: string; // Pulled off of SearchResultItem
  title: string;
  subtitle: string;
  authors?: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: ISBNTypes[];
  pageCount: number;
  mainCategory?: string; // Doesn't appear to be defined very often if at all
  categories?: string[]; // is usually defined
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

export interface BooksPageAndTotal {
  books: Book[];
  totalItems: number;
}
