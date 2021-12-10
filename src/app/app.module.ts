import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {ProductRegistrationComponent} from './product-registration/product-registration.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {HomePage} from "./pages/home.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {LoginComponent} from './login/login.component';
import {CategoryPipe} from './pipes/category.pipe';
import {LogoutComponent} from "./login/logout.component";


@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginComponent,
    LogoutComponent,
    UserRegistrationComponent,
    ProductRegistrationComponent,
    ProductListComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    CategoryPipe,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
