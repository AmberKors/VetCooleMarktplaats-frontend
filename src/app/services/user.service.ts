import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {serverUrl} from '../../environments/environment';
import {User} from '../models/User';
import {Observable, of, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  private uri = serverUrl + '/users';
  private user: User;

  createdUser = new Subject<string>();

  message$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  add(u: User): void {
    console.log(u);
    this.http.post<User>(`${this.uri}`, u, {observe: 'response'})
      .subscribe(

    data => {
      this.createdUser.next(this.user.username);
      this.message$.next(`Gebruiker ${this.user.username} is aangemaakt.`);
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
}

