import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {


  constructor(private router: Router,
              private service: LoginService) {
  }

  ngOnInit(): void {
    this.service.logout();
    this.router.navigate(['/login']);
  }

}
