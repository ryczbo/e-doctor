import { Component, HostBinding, Renderer2 } from '@angular/core';
import 'hammerjs';
import { AuthenticationService } from "./shared/services/authentication.service";
import { Subscription } from "rxjs";
import {User} from "./_models/user";
import { Router, ActivatedRoute } from "@angular/router";

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
    private authenticationService: AuthenticationService,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute
  ) {
    this.renderer.addClass(document.body, 'landing2');
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
