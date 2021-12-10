import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Location} from "@angular/common";
import {User} from "../models/User";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  id: string = "";
  products: Product[] = [];
  totalPrice: number = 0;
  loggedInUser: User;

  constructor(private activatedRoute: ActivatedRoute, private shoppingCartService: ShoppingCartService, private location: Location) {
  }

  ngOnInit() {
    // this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    this.id = this.activatedRoute.snapshot.url[1].path;
    this.shoppingCartService.productList$.subscribe(products => {
      this.products = products;
      this.calculateTotalPrice();
    });
    this.shoppingCartService.getProductsFromShoppingCart(+this.id);
  }

  calculateTotalPrice() {
    this.products.forEach(p => {
        this.totalPrice += p.price;
      }
    )
  }

  back(): void {
    this.location.back();
  }
}
