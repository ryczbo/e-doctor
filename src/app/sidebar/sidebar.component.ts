import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [trigger('slideSdbr', [
      state('initial', style({
        marginLeft: '-250px',
      })),
      state('final', style({
        marginLeft: '0',
      })),
      transition('initial=>final', animate('250ms')),
      transition('final=>initial', animate('250ms'))
    ]),
  trigger('slideArrow', [
    state('initial', style({
      marginLeft: '0'
    })),
    state('final', style({
      marginLeft:'250px'
    })),
    transition('initial=>final', animate('250ms')),
    transition('final=>initial', animate('250ms'))
  ])],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  visitClicked = false;
  showSidebar = false;
  currentState = 'initial';

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  showSdbr(){
    // this.showSidebar = !this.showSidebar;
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  ngOnInit() {
    this.currentUser.visits = [
      {date: '21-07-2019', doctor: 'Jack Shepard', confirmed: true},
      {date: '05-09-2019', doctor: 'Juliet Burke', confirmed: false}
    ];
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
