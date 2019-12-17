import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../../shared/services';
import { User } from '../../../_models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppRouterLinks } from '../../../app-routing.config';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  landingType = 'landing2';
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    if (this.currentUser) {
      this.router.navigate(AppRouterLinks.HOME);
    }
  }

  ngOnInit() {
  }

  landing() {
    if (this.landingType === 'landing1') {
      this.renderer.removeClass(document.body, 'landing1');
      this.renderer.addClass(document.body, 'landing2');
    } else if (this.landingType === 'landing3') {
      this.renderer.removeClass(document.body, 'landing3');
      this.renderer.addClass(document.body, 'landing2');
    }
    this.landingType = 'landing2';
  }

  landing1() {
    this.landingType = 'landing1';
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing1');
  }

  landing3() {
    this.landingType = 'landing3';
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing3');
    this.renderer.setStyle(document.body, 'background', '#3668ff');
  }
}
