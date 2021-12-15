import {Component} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/Product";
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: './detail.page.html',
})
export class DetailPage {
  id: string = "";
  product: Product;
  loggedInUser: User = this.userService.getLoggedInUser();
  mijnMarktplaats: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.productService.product$.subscribe(product => {
        this.product = product

        this.mijnMarktplaats = this.product.user.id == this.loggedInUser.id;
      }
    );
    this.productService.getProduct(+this.id);
  }

}
