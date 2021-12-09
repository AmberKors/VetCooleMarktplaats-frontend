import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  id: string = "";
  products: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.shoppingCartService.productList$.subscribe(products => {
      this.products = products;
    });
    this.shoppingCartService.getProductsFromShoppingCart(+this.id);
  }
}
