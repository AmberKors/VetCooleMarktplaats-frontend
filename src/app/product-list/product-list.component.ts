import {Component, Input, OnInit} from '@angular/core';
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
  @Input()
  privateItems: boolean;

  products: Product[] = [];
  productsToShow: Product[] = [];
  searchText: string;
  loggedInUser: User;

  constructor(private productService: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
      this.productService.getProducts().subscribe(products => {
        this.products = [];
        this.checkForPrivateItems(products);
        this.checkIfAlreadyInShoppingCart();
      })
    }

  }

  checkIfAlreadyInShoppingCart() {
    this.productsToShow = [];
    this.products.forEach(product => {
      if (!product.shoppingCart || product.shoppingCart.id == this.loggedInUser.shoppingCart.id) {
        this.productsToShow.push(product);
      }
    })
  }

  checkForPrivateItems(products: Product[]) {
    products.forEach(product => {
      if (this.privateItems == true) {
        if (product.user.id == this.loggedInUser.id) {
          this.products.push(product);
        }
      } else {
        if (product.user.id != this.loggedInUser.id) {
          this.products.push(product);
        }
      }
    })
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
    this.showError("Product is verwijderd uit de winkelwagen");
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }
}
