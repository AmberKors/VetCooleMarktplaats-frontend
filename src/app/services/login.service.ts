import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {serverUrl} from '../../environments/environment';
import {User} from '../models/User';
import {UserService} from "./user.service";

@Injectable({providedIn: 'root'})
export class LoginService {

  private uri = serverUrl + '/login';
  loggedInUser: User | null;

  loggedIn$ = new Subject<string>();
  loggedOut$ = new Subject<string>();
  shoppingCartId$ = new Subject<string>();

  message$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  login(u: User): void {

    this.http.post<User>(`${this.uri}`, u, {observe: 'response'})
      .subscribe(
        data => {

          this.loggedInUser = data.body;

          // @ts-ignore
          this.loggedIn$.next(this.loggedInUser.username);

          // @ts-ignore
          this.shoppingCartId$.next(this.loggedInUser.shoppingCart.id);

          // @ts-ignore
          this.message$.next(`Gebruiker ${this.loggedInUser.username} is ingelogd.`);
          localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

          // or get a header from the response:
          const token = data.headers.get('Authorization')?.substr(7);
          localStorage.setItem('token', JSON.stringify(token));
        },
        error => {
          console.log(error);
          this.message$.next(`Inloggen is mislukt.  Reden: ${error.statusText}.`);
        }
      );
  }

  logout(): void {
    this.loggedInUser = null;

    // @ts-ignore
    this.loggedOut$.next();
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`); // log to console instead
      return of(result as T);
    };

  }

}

