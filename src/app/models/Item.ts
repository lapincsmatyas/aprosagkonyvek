import {Image} from './image';

export class Item {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  coverType: string;
  isbn: string;
  inStock: number;
  pageNumber: number;
  publicationYear: number;
  weight: number;
  images: Image[] = [];
}
