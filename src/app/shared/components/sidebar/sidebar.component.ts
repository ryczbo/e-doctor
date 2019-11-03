import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig, MatTooltip } from '@angular/material';
import { DetailsComponent } from '../../../popups';
import { first } from 'rxjs/operators';
import { UserService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [trigger('slideSdbr', [
    state('initial', style({
      marginLeft: '-251px',
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
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  currentState = 'initial';
  sortVal;
  sortTypes = ['Date: newest', 'Date: oldest', 'Filter: pending', 'Filter: declined', 'Filter: confirmed'];
  visitsArray;
  visitsHistory;
  visit;
  rating;
  doctorsList;
  ratedDoctorsList = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.visitsArray = this.currentUser.visits.filter(e => e.status !== 'completed');
      this.visitsHistory = this.currentUser.visits.filter(e => e.status === 'completed');
    });
  }

  ngOnInit() {
    this.fetchDoctors();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  showSdbr() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  // sorting and filtering visits
  sort(sortVal) {
    this.visitsArray = this.currentUser.visits.filter(v => v.status !== 'completed');
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
        this.ratedDoctorsList = Object.keys(this.currentUser.rates.reduce((o, c) => Object.assign(o, c)));
      }
    });
  }

  openDialog(visit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      doctor: visit.doctorName,
      date: visit.date,
      hour: visit.hour,
      exam: visit.exam,
      id: visit.doctorId,
      foundRated: this.ratedDoctorsList.findIndex(e => e === visit.doctorId),
      rate: this.doctorsList.find(e => e._id === visit.doctorId).rating
    };
    dialogConfig.panelClass = ['custom-modal'];

    const dialogRef = this.dialog.open(DetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      const obj = {};
      obj[visit.doctorId] = result;
      this.rating = obj;
      if (result) {
        // rate a doctor
        this.currentUser.rates.push(this.rating);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.userService.update(this.currentUser).subscribe();
        const foundIndex = this.doctorsList.findIndex(x => x._id === visit.doctorId);
        this.doctorsList[foundIndex].rates.push(result);
        // calculating the average rating
        const sum = this.doctorsList[foundIndex].rates.reduce((a, b) => a + b);
        this.doctorsList[foundIndex].rating = Math.floor(sum / this.doctorsList[foundIndex].rates.length);
        this.userService.update(this.doctorsList[foundIndex]).subscribe();
      } else {
        console.log('cant rate');
      }
      if (this.currentUser.rates.length > 0) {
        this.ratedDoctorsList = Object.keys(this.currentUser.rates.reduce((o, c) => Object.assign(o, c)));
        console.log(this.ratedDoctorsList);
      }
    });
  }
}
