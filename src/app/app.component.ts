import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vet Coole Marktplaats';

  loggedIn$ = this.service.loggedIn$;
  loggedOut$ = this.service.loggedOut$;

  loggedIn = false;
  logLabel = 'Login';
  logLink = 'login';
  loggedInMessage = 'Not logged in.';


  constructor(private router: Router,
              private service: LoginService) {
    this.loggedIn$.subscribe((u) => {
      this.loggedIn = true;
      this.logLabel = 'Logout';
      this.logLink = 'logout';
      this.loggedInMessage = `Logged in as ${u}.`;
    });

    this.loggedOut$.subscribe((u) => {
      this.loggedIn = false;
      this.logLabel = 'Login';
      this.logLink = 'login';
      this.loggedInMessage = 'Not logged in.';
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
