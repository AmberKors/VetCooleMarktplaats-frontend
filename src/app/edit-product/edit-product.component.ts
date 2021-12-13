import {Component, OnInit} from '@angular/core';
import {Product} from "../models/Product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Category} from "../models/Category";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: string = "";
  product: Product;
  editing: boolean = false;
  category = Category;
  categoryOptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private toastr: ToastrService
  ) {
    // @ts-ignore
    this.categoryOptions = Object.keys(this.category);
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.productService.product$.subscribe(product => this.product = product);
    this.productService.getProduct(+this.id);
  }

  editProduct() {
    if (this.editing) {
      this.editing = false;
    } else {
      this.editing = true;
    }
  }

  saveProduct() {
    this.productService.editProduct(this.product);
    this.showSuccess("Product is gewijzigd.")
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product);
    this.showSuccess("Product is verwijderd!");
    this.location.back();
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  back(): void {
    this.location.back();
  }
}
