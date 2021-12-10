import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {

  newUser = {} as User;
  message$ = this.service.message$;

  constructor(private service: UserService) { }

  addContact(): void {
    console.log(this.newUser);
    this.service.add(this.newUser);
    this.newUser = {} as User;

  }

}
