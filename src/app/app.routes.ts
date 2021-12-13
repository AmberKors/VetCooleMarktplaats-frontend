import {Route} from '@angular/router';
import {HomePage} from './pages/home.page';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductRegistrationComponent} from "./product-registration/product-registration.component";
import {DetailPage} from "./pages/detail.page";

export const routes: Route[] = [
  {path: '', component: HomePage},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'products/:id', component: DetailPage},
  {path: 'nieuwproduct', component: ProductRegistrationComponent},
];
