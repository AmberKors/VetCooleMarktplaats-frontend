import {Component} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/Product";
import {User} from "../models/User";

@Component({
  templateUrl: './detail.page.html',
})
export class DetailPage {
  id: string = "";
  product: Product;
  loggedInUser: User;
  productFromUser: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.productService.product$.subscribe(product => {
        this.product = product
        let recievedFromStorage = localStorage.getItem('loggedInUser');
        if (recievedFromStorage != null) {
          this.loggedInUser = JSON.parse(recievedFromStorage);
        }


        if (this.product.user.id == this.loggedInUser.id) {
          this.productFromUser = true;
        } else {
          this.productFromUser = false;
        }

      }
    );
    this.productService.getProduct(+this.id);


  }

}
