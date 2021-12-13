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
  product: Product;

  constructor(private productService: ProductService) {
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
    }

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      products.forEach(product => {
        console.log(product);
        if (product.user !== this.loggedInUser) {
          this.productList.push(product)
        }

      })
      this.product = this.productList[Math.floor(Math.random() * this.productList.length)];
    })

  }
}
