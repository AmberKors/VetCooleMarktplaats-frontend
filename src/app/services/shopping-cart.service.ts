import {Injectable} from '@angular/core';
import {serverUrl} from "../../environments/environment";
import {Subject} from "rxjs";
import {Product} from "../models/Product";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = serverUrl + '/shopping-cart'
  public productList$ = new Subject<Product[]>();

  constructor(private http: HttpClient,
              private toasty: ToastrService) {
  }

  getProductsFromShoppingCart(id: number) {
    this.http.get<Product[]>(this.url + "/" + id).subscribe(products => {
        this.productList$.next(products);
      },
      error => {
        this.toasty.error(`Ophalen van producten uit winkelwagentje is mislukt.  Reden: ${error.statusText}.`);
      }
    );
  }
}
