import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {ToastrService} from 'ngx-toastr';
import {User} from "../models/User";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string;
  loggedInUser: User;

  constructor(private productService: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })

    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
    }

  }

  addToShoppingCart(product: Product) {
    let recievedFromStorage = localStorage.getItem('loggedInUser');

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
}
