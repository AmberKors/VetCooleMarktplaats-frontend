import {Category} from "./Category";
import {ShoppingCart} from "./ShoppingCart";
import {User} from "./User";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  datePublished: Date;
  user: User;
  shoppingCart: ShoppingCart;
}
