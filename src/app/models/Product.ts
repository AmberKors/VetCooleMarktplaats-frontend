import {Category} from "./Category";
import {ShoppingCart} from "./ShoppingCart";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  datePublished: Date;
  user: number;
  shoppingCart: ShoppingCart;
}
