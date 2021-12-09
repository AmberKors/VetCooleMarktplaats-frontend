import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {serverUrl} from '../../environments/environment';
import {User} from '../models/User';

@Injectable({providedIn: 'root'})
export class UserService {

  private uri = serverUrl + '/users';

  constructor(private http: HttpClient) {}

  add(u: User): void {
    console.log(u);
    this.http.post(this.uri, u);
  }
}

