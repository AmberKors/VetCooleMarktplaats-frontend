import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {serverUrl} from '../../environments/environment';
import {User} from '../models/User';
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class LoginService {

  private uri = serverUrl + '/login';
  loggedInUser: User | null;

  loggedIn$ = new Subject<string>();
  loggedOut$ = new Subject<string>();

  constructor(private http: HttpClient, private toasty: ToastrService) {
  }

  login(u: User): void {

    this.http.post<User>(`${this.uri}`, u, {observe: 'response'})
      .subscribe(
        data => {

          this.loggedInUser = data.body;

          // @ts-ignore
          this.loggedIn$.next(this.loggedInUser.username);

          // @ts-ignore
          this.toasty.success(`Gebruiker ${this.loggedInUser.username} is ingelogd.`)
          localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

          // or get a header from the response:
          const token = data.headers.get('Authorization')?.substr(7);
          localStorage.setItem('token', JSON.stringify(token));
        },
        error => {
          this.toasty.error(`Inloggen is mislukt.  Reden: ${error.statusText}.`);
        }
      );
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.clear();
    window.location.href = "http://localhost:4200";

    // @ts-ignore
    this.loggedOut$.next();
  }

}

