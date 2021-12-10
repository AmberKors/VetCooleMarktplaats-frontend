import {Route} from '@angular/router';
import {HomePage} from './pages/home.page';

import {UserRegistrationComponent} from "./user-registration/user-registration.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

export const routes: Route[] = [
  {path: '', component: HomePage},
  {path: 'login', component: LoginComponent},
  {path: 'user-registration', component: UserRegistrationComponent},
  {path: 'shopping-cart/:id', component: ShoppingCartComponent},
  {path: 'products/:id', component: ProductDetailComponent}
];
