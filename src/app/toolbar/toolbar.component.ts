import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  drop: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  reload() {
    window.location.reload();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}

