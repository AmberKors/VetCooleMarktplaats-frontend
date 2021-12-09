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

  constructor(private service: UserService) { }

  addContact(): void {
    this.service.add(this.newUser);
    this.newUser = {} as User;
  }

}
