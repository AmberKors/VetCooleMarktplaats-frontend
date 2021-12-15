import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ProductService} from "../services/product.service";
import {ToastrService} from 'ngx-toastr';
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input()
  mijnMarktplaats: boolean;
  products: Product[] = [];
  searchText: string;
  loggedInUser: User = this.userService.getLoggedInUser();

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.mijnMarktplaats) {
      this.productService.getProductsByUser(this.loggedInUser.id).subscribe(products => {
        this.products = products;
      })
    } else {
      this.productService.getProducts().subscribe(products => {
        this.products = products.filter(product =>
          product.user.id != this.loggedInUser.id
        ).filter(product => !product.shoppingCart || product.shoppingCart.id == this.loggedInUser.shoppingCart.id);
      })
    }
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
