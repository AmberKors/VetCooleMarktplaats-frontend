import {ShoppingCart} from "./ShoppingCart";
import {Delivery} from "./Delivery";

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  street: string;
  housenumber: string;
  postalcode: string;
  email: string;
  delivery: Delivery;
  shoppingCart: ShoppingCart;
  legalRequired: boolean;
}
