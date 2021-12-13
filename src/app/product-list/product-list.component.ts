import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
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
}
