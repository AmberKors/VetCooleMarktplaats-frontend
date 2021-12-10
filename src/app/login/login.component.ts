import {Component} from '@angular/core';
import {User} from '../models/User';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css'],
})
export class LoginComponent {

  user = {} as User;
  message$ = this.service.message$;

  constructor(private service: LoginService) {}

  login(): void {
    console.log(this.user)
    this.service.login(this.user);
    this.user = {} as User;

  }

}
