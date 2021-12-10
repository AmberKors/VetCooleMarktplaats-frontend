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
  loginOrRegister = "login";

  loggedIn$ = this.loginService.loggedIn$;
  loggedOut$ = this.loginService.loggedOut$;

  loggedIn = false;
  logLabel = 'Login';
  logLink = 'login';
  loggedInMessage = 'Not logged in.';


  constructor(private router: Router,
              private loginService: LoginService) {
    this.loggedIn$.subscribe((userName) => {
      this.loggedIn = true;
      this.logLabel = 'Logout';
      this.logLink = 'logout';
      this.loggedInMessage = `Logged in as ${userName}.`;
    });

    this.loggedOut$.subscribe((userName) => {
      this.loggedIn = false;
      this.logLabel = 'Login';
      this.logLink = 'login';
      this.loggedInMessage = 'Not logged in.';
    });
  }

  toggleRegistrationInlog() {
    if (this.loginOrRegister == "login") {
      this.loginOrRegister = "register";
    } else {
      this.loginOrRegister = "login";
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
