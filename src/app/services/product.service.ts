import {Injectable} from '@angular/core';
import {serverUrl} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Product} from "../models/Product";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = serverUrl + '/products'
  public productList$ = new Subject<Product[]>();
  public product$ = new Subject<Product>();
  private loggedInUser: User = this.userService.getLoggedInUser();

  message$ = new Subject<string>();

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(this.url).subscribe(products => {
      this.productList$.next(products);
    });
    return this.productList$;
  }

  getProductsByUser(): Observable<Product[]> {
    this.http.get<Product[]>(this.url + "?user_id=" + this.loggedInUser.id).subscribe(products => {
      this.productList$.next(products);
    });
    return this.productList$;
  }

  getProduct(id: number) {
    this.http.get<Product>(this.url + "/" + id).subscribe(product => {
      this.product$.next(product);
    });
  }

  addProduct(product: Product) {
    this.http.post(this.url, product).subscribe(() => this.getProductsByUser())
  }

  editProduct(product: Product, mijnMarktplaats: boolean) {
    this.http.put(this.url + "/" + product.id, product).subscribe(() => {
      if (mijnMarktplaats) {
        this.getProductsByUser();
      } else {
        this.getProducts();
      }
    })
  }

  deleteProduct(product: Product) {
    this.http.delete(this.url + "/" + product.id);
  }
}
