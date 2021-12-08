import {Injectable} from '@angular/core';
import {serverUrl} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Product} from "../models/Product";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = serverUrl + '/products'
  private productSubject = new Subject<Product[]>();

  constructor(private http: HttpClient) {
  }

  get productsUpdated$(): Subject<Product[]> {
    return this.productSubject;
  }

  getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(this.url).subscribe(products => {
      this.productSubject.next(products);
    });
    return this.productSubject;
  }

  addProduct(product: Product) {
    this.http.post(this.url, product).subscribe(() => this.getProducts())
  }

  editContact(product: Product) {
    this.http.put(this.url + "/" + product.id, product).subscribe(() => this.getProducts());
  }

  deleteProduct(product: Product) {
    this.http.delete(this.url + "/" + product.id).subscribe(() => this.getProducts())
  }
}
