import {ShoppingCart} from "./ShoppingCart";

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  shoppingCart: ShoppingCart;
}
