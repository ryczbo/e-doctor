import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import * as moment from "moment";
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
  sortVal;
  sortTypes = ['Date: newest', 'Date: oldest', 'Filter: pending', 'Filter: declined', 'Filter: confirmed'];
  visitsArray;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.visitsArray = this.currentUser.visits;
    });
  }

  showSdbr(){
    // this.showSidebar = !this.showSidebar;
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  sort(sortVal) {
    this.visitsArray = this.currentUser.visits;
    for (let i = 0; i < this.visitsArray.length; i++) {
      this.visitsArray[i].dateEdit = moment(this.visitsArray[i].date, 'DD.MM.YYYY');
    }
    if (sortVal === 'Date: newest') {
      this.visitsArray.sort((a, b) => b.dateEdit - a.dateEdit);
    } else if (sortVal === 'Date: oldest') {
      this.visitsArray.sort((a, b) => a.dateEdit - b.dateEdit);
    } else if (sortVal === 'Filter: pending') {
      this.visitsArray = this.visitsArray.filter(a => a.status === 'pending');
    } else if (sortVal === 'Filter: declined') {
      this.visitsArray = this.visitsArray.filter(a => a.status === 'declined');
    } else if (sortVal === 'Filter: confirmed') {
      this.visitsArray = this.visitsArray.filter(a => a.status === 'confirmed');
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
