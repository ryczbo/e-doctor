import { Component, Renderer2 } from '@angular/core';
import 'hammerjs';
import { Subscription } from 'rxjs';
import { User } from './_models/user';
import { UserService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-doctor';
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'landing2');
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


}
