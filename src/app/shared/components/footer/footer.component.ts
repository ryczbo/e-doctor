import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
