import {Route} from '@angular/router';
import {HomePage} from './pages/home.page';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

export const routes: Route[] = [
  {path: '', component: HomePage},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'products/:id', component: ProductDetailComponent},
];
