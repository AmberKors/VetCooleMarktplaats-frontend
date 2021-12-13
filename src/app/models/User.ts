import {ShoppingCart} from "./ShoppingCart";
import {Delivery} from "./Delivery";

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  street: string;
  housenumber: number;
  postalcode: string;
  email: string;
  delivery: Delivery;
  shoppingCart: ShoppingCart;
}
