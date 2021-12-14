import {Component, OnInit} from '@angular/core';
import {User} from "../models/User";

@Component({
  selector: 'app-mijn-marktplaats',
  templateUrl: './mijn-marktplaats.component.html',
  styleUrls: ['./mijn-marktplaats.component.css']
})
export class MijnMarktplaatsComponent implements OnInit {
  loggedInUser: User;
  addProduct: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
    }
  }

  registerProduct() {
    if (this.addProduct == false) {
      this.addProduct = true;
    } else {
      this.addProduct = false;
    }
  }

}
