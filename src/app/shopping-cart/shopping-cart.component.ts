import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Location} from "@angular/common";
import {User} from "../models/User";
import {ProductService} from "../services/product.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  id: string = "";
  products: Product[] = [];
  totalPrice: number = 0;
  loggedInUser: User = this.userService.getLoggedInUser();

  constructor(private activatedRoute: ActivatedRoute,
              private shoppingCartService: ShoppingCartService,
              private location: Location,
              private productService: ProductService,
              private toastr: ToastrService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.shoppingCartService.productList$.subscribe(products => {
      this.products = products;
      this.calculateTotalPrice();
    });

    this.productService.productList$.subscribe(() => {
      this.shoppingCartService.getProductsFromShoppingCart(+this.loggedInUser.shoppingCart.id);
      this.calculateTotalPrice();
    })

    this.shoppingCartService.getProductsFromShoppingCart(+this.loggedInUser.shoppingCart.id);
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.products.forEach(p => {
        this.totalPrice += p.price;
      }
    )
  }

  deleteFromShoppingCart(product: Product) {
    // @ts-ignore
    product.shoppingCart = null;
    this.productService.editProduct(product);
    this.showSuccess("Product is verwijderd uit de winkelwagen");
  }

  showSuccess(message: string) {
    this.toastr.error(message);
  }

  back(): void {
    this.location.back();
  }
}
