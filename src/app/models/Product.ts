import {Category} from "./Category";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  datePublished: Date;
  user: number;
}
