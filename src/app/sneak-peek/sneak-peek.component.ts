import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {User} from "../models/User";
import {Product} from "../models/Product";

@Component({
  selector: 'app-sneak-peek',
  templateUrl: './sneak-peek.component.html',
  styleUrls: ['./sneak-peek.component.css']
})
export class SneakPeekComponent implements OnInit {

  loggedInUser: User;
  productList: Product[] = [];
  productsToShow: Product[] = [];

  constructor(private productService: ProductService) {
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
    }

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      products.forEach(product => {
        if (product.user.id != this.loggedInUser.id) {
          this.productList.push(product)
        }
      })

      while (this.productsToShow.length < 4) {

        let product: Product = this.productList[Math.floor(Math.random() * this.productList.length)];
        if (!this.productsToShow.includes(product)) {
          this.productsToShow.push(product);
          console.log(product.id);
        }
      }

    })

  }
}
