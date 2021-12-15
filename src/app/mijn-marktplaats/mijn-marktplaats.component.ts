import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mijn-marktplaats',
  templateUrl: './mijn-marktplaats.component.html',
  styleUrls: ['./mijn-marktplaats.component.css']
})
export class MijnMarktplaatsComponent implements OnInit {
  addProduct: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  registerProduct() {
    this.addProduct = !this.addProduct;
  }

}
