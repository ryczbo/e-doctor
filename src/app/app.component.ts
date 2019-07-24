import { Component, HostBinding } from '@angular/core';
import 'hammerjs';
import { AuthenticationService } from "./_services/authentication.service";
import { Subscription } from "rxjs";
import {User} from "./_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-doctor';

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
