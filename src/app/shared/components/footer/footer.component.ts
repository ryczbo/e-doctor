import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
// import {UserService} from "../../services/user.service";
import {User} from '../../../_models/user';
import {Subscription} from 'rxjs';
import {RegisterService} from "../../services";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private registerService: RegisterService
    // private userService: UserService
  ) {
    this.currentUserSubscription = this.registerService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
