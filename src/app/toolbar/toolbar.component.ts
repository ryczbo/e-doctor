import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  drop = false;
  imgPath;



  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + this.currentUser.profilePic);
      }});
  }

  logout() {
    this.authenticationService.logout();
    this.reload();
  }

  reload() {
    window.location.replace('/home');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}

