import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {User} from "../models/User";
import {Product} from "../models/Product";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-sneak-peek',
  templateUrl: './sneak-peek.component.html',
  styleUrls: ['./sneak-peek.component.css']
})
export class SneakPeekComponent implements OnInit {
  loggedInUser: User = this.userService.getLoggedInUser();
  products: Product[] = [];
  productsToShow: Product[] = [];

  constructor(private productService: ProductService,
              private userService: UserService) {
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.filter(product => product.user.id != this.loggedInUser.id)
        .filter(product => !product.shoppingCart || product.shoppingCart.id == this.loggedInUser.shoppingCart.id);


      if (this.products.length >= 4) {
        while (this.productsToShow.length < 4) {
          let product: Product = this.products[Math.floor(Math.random() * this.products.length)];
          if (!this.productsToShow.includes(product)) {
            this.productsToShow.push(product);
          }
        }
      } else {
        this.productsToShow = this.products;
      }
    })
  }
}
