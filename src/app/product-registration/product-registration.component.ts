import { Component, OnInit } from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {Category} from "../models/Category";

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent {


  newProduct = {} as Product;
  message$ = this.service.message$;
  category = Category;
  categoryOptions =[];

  constructor(private service: ProductService) {
    // @ts-ignore
    this.categoryOptions=Object.keys(this.category);}

  addProduct(): void {
    console.log(this.newProduct);

    //add the user id to the post
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.newProduct.user = JSON.parse(recievedFromStorage);}


    this.service.addProduct(this.newProduct)
    this.newProduct = {} as Product;

  }


}
