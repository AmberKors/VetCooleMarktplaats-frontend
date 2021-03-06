import {Component} from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Delivery} from "../models/Delivery";

@Component({
  selector: 'app-user-registration',
  templateUrl:
    './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  newUser = {} as User;
  delivery = Delivery;
  deliveryOptions = [];

  constructor(private userService: UserService) {
    // @ts-ignore
    this.deliveryOptions = Object.keys(this.delivery);
  }

  addContact(): void {
    this.userService.add(this.newUser);
    this.newUser = {} as User;
  }

  afhalenSelected() {
    if (this.newUser.delivery !== undefined) {
      return (this.newUser.delivery.valueOf() == "AFHALEN");
    } else {
      return false;
    }
  }
}
