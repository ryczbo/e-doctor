import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../_models/user';
import { UserService } from '../../../shared/services';
import { Router } from '@angular/router';
import { AppRouterLinks } from '../../../app-routing.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (!this.currentUser) {
      this.router.navigate(AppRouterLinks.DEFAULT);
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
