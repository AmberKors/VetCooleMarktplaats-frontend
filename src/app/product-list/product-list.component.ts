import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string;

  constructor(private productService: ProductService,
              private toastr: ToastrService) {
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
        this.showSuccess();
      }
    }
  }

  showSuccess() {
    this.toastr.success("Product is toegevoegd aan de winkelwagen!");
  }
}
