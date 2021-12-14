import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {serverUrl} from '../../environments/environment';
import {User} from '../models/User';
import {Observable, of, Subject} from "rxjs";
import {LoginService} from "./login.service";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class UserService {

  private uri = serverUrl + '/users';
  private user: User;

  loggedInUser$ = new Subject<User>();

  createdUser$ = new Subject<string>();

  message$ = new Subject<string>();

  constructor(private http: HttpClient, private loginService: LoginService, private toasty : ToastrService) {
  }

  add(u: User): void {
    this.http.post<User>(`${this.uri}`, u, {observe: 'response'})
      .subscribe(
        response => {
          // @ts-ignore
          this.createdUser$.next(response.body.username);
          // @ts-ignore
          this.toasty.success(`Gebruiker ${response.body.username} is aangemaakt.`);
          this.loginService.login(u);
        },

        error => {
          console.log(error);
          this.message$.next(`Inloggen is mislukt.  Reden: ${error.statusText}.`);
        }
      );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`); // log to console instead
      return of(result as T);
    };
  }

  getUser(id: number) {
    this.http.get<User>(this.uri + "/" + id).subscribe(user => {
      this.loggedInUser$.next(user);
    })
  }
}
