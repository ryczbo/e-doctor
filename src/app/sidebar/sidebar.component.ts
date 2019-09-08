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
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {UserService} from "../_services/user.service";
import {DetailsComponent} from "../details/details.component";
import {first} from "rxjs/operators";


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
        marginLeft: '250px'
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
  visitsHistory;
  visit;
  rating;
  doctorsList;
  ratedDoctorsList = [];
  pickedVisit = false;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.visitsArray = this.currentUser.visits.filter(e => e.status !== 'completed');
      this.visitsHistory = this.currentUser.visits.filter(e => e.status === 'completed');
    });
  }

  showSdbr() {
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

  fetchDoctors() {
    this.userService.getAll().pipe(first()).subscribe(doctors => {
      this.doctorsList = doctors.filter(e => e.userType === 'Doctor');
      if (this.currentUser.rates.length > 0) {
        this.ratedDoctorsList = Object.keys(this.currentUser.rates.reduce((o, c) => Object.assign(o, c)))
      }});
    console.log(this.ratedDoctorsList);
  }

  visitDetails(visit) {
    this.pickedVisit = true;
    this.visit = visit;
  }

  openDialog(visit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      doctor: visit.doctorName,
      date: visit.date,
      hour: visit.hour,
      exam: visit.exam,
      id: visit.doctorId,
      foundRated: this.ratedDoctorsList.findIndex(e => e == visit.doctorId),
      rate: this.doctorsList.find(e => e.id === visit.doctorId).rating
    };
    dialogConfig.panelClass = ['custom-modal'];

    const dialogRef = this.dialog.open(DetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      const obj = {};
      obj[visit.doctorId] = result;
      this.rating = obj;
      if (result) {
        this.currentUser.rates.push(this.rating);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.userService.update(this.currentUser).subscribe();
        const foundIndex = this.doctorsList.findIndex(x => x.id === visit.doctorId);
        this.doctorsList[foundIndex].rates.push(result);
        //calculating the average rating
        let sum = this.doctorsList[foundIndex].rates.reduce((a, b) => a + b);
        this.doctorsList[foundIndex].rating = Math.floor(sum / this.doctorsList[foundIndex].rates.length);
        console.log(this.doctorsList[foundIndex].rating);
        this.userService.update(this.doctorsList[foundIndex]).subscribe();
      }
      else {
        console.log('cant rate')
      }
      if (this.currentUser.rates.length > 0) {
        this.ratedDoctorsList = Object.keys(this.currentUser.rates.reduce((o, c) => Object.assign(o, c)));
        console.log(this.ratedDoctorsList);
      };
    });
  }


  ngOnInit() {
    this.fetchDoctors();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
