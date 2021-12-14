import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {Location} from '@angular/common'
import {ToastrService} from "ngx-toastr";
import {User} from "../models/User";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string = "";
  product: Product;
  loggedInUser: User;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private location: Location,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
    }

    this.id = this.activatedRoute.snapshot.url[1].path;
    this.productService.product$.subscribe(product => {
      if (!product.shoppingCart || product.shoppingCart.id == this.loggedInUser.shoppingCart.id)
        this.product = product
    });
    this.productService.getProduct(+this.id);
  }

  addToShoppingCart(product: Product) {

    if (!product.shoppingCart) {
      product.shoppingCart = this.loggedInUser.shoppingCart;
      this.productService.editProduct(product);
      this.showSuccess("Product is toegevoegd aan de winkelwagen!");

    }
  }

  deleteFromShoppingCart(product: Product) {
    // @ts-ignore
    product.shoppingCart = null;
    this.productService.editProduct(product);
    this.showSuccess("Product is verwijderd uit de winkelwagen");
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  back(): void {
    this.location.back();
  }

}
