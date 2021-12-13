import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {Location} from '@angular/common'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string = "";
  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private location: Location) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.productService.product$.subscribe(product => this.product = product);
    this.productService.getProduct(+this.id);
  }

  addToShoppingCart(product: Product) {
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      let loggedInUser = JSON.parse(recievedFromStorage);

      if (!product.shoppingCart) {
        product.shoppingCart = loggedInUser.shoppingCart;
        this.productService.editProduct(product);
        console.log("Product is toegevoegd!");
      } else {
        console.log("Product zit al in winkelmandje");
      }
    }
  }

  deleteFromShoppingCart(product: Product) {
    // @ts-ignore
    product.shoppingCart = null;
    this.productService.editProduct(product);
  }

  back(): void {
    this.location.back();
  }

}
