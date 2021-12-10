import {Route} from '@angular/router';
import {HomePage} from './pages/home.page';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {LogoutComponent} from "./login/logout.component";

export const routes: Route[] = [
  {path: '', component: HomePage},
  {path: 'logout', component: LogoutComponent},
  {path: 'shopping-cart/:id', component: ShoppingCartComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'logout', component: LogoutComponent},
];
