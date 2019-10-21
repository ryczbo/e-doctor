import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
// import { UserService } from "../shared/services/user.service";
import { AuthenticationService } from "../shared/services/authentication.service";
import { RegisterService } from "../shared/services";


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    // private userService: UserService,
    private registerService: RegisterService
  ) {
    this.currentUserSubscription = this.registerService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  // deleteUser(id: number) {
  //   this.userService.delete(id).pipe(first()).subscribe(() => {
  //     this.loadAllUsers()
  //   });
  // }

  // private loadAllUsers() {
  //   this.registerService.getAll().pipe(first()).subscribe(users => {
  //     this.users = users;
  //   });
  // }
}
