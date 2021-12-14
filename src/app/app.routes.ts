import {Route} from '@angular/router';
import {HomePage} from './pages/home.page';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductRegistrationComponent} from "./product-registration/product-registration.component";
import {DetailPage} from "./pages/detail.page";
import {MijnMarktplaatsComponent} from "./mijn-marktplaats/mijn-marktplaats.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {PaymentPage} from "./pages/payment.page";

export const routes: Route[] = [
  {path: '', component: HomePage},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: DetailPage},
  {path: 'nieuw-product', component: ProductRegistrationComponent},
  {path: 'mijn-marktplaats', component: MijnMarktplaatsComponent},
  {path: 'betalen', component: PaymentPage},
];
