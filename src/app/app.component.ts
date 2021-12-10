import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";
import {User} from "./models/User";

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
  loggedInMessage = 'Not logged in.';
  private loggedInUser: User;


  constructor(private router: Router,
              private loginService: LoginService) {

    let recievedFromStorage = localStorage.getItem('loggedInUser');
    if (recievedFromStorage != null) {
      this.loggedInUser = JSON.parse(recievedFromStorage);
      this.loggedIn = true;
      this.loggedInMessage = `Logged in as ${this.loggedInUser.username}.`;
    }

    this.loggedIn$.subscribe((userName) => {
      this.loggedIn = true;
      this.loggedInMessage = `Logged in as ${userName}.`;
    });

    this.loggedOut$.subscribe((userName) => {
      this.loggedIn = false;
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
