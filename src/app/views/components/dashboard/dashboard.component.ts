import { Component, OnInit, Renderer2 } from '@angular/core';
import { User } from '../../../_models/user';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { XunkCalendarModule } from 'xunk-calendar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from '../../../shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  patients;
  getPatientsCheck = false;
  visitsToDisplay;
  selDate = {date: 1, month: 1, year: 1};
  heatmap = {};
  formattedDate;
  visit;
  pickedVisit = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.genHeatmap();
    });
  }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'landing1');
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing3');
    this.renderer.setStyle(document.body, 'background', 'rgb(0,212,255)');
    this.selDate = XunkCalendarModule.getToday();
    this.genHeatmap();
    this.getPatients();
  }

  conductVisit(visit) {
    this.visit = visit;
    console.log(this.visit);
    this.pickedVisit = true;
  }

  getPatients() {
    this.userService.getAll().pipe(first()).subscribe(patients => {
      this.patients = patients.filter(e => e.userType === 'Patient');
    });
    this.getPatientsCheck = true;
  }

  updateUser(user) {
    this.userService.update(user).subscribe();
  }

  // generating the coloured circles on a calendar corresponding with the days with planned visits
  genHeatmap(): any {
    if (this.currentUser.visits.filter(e => e.status !== 'pending').length > 0) {
      this.heatmap = this.currentUser.visits
        .filter(v => v.status !== 'pending')
        .map(visit => ({[moment(visit.date, 'DD.MM.YYYY').format('YYYYMMDD')]: 0.7}))
        .reduce((a, b) => Object.assign(a, b));
    } else {
      return;
    }
  }

  setVisitsToDisplay() {
    this.formattedDate = moment(this.selDate).format('DD.MM.YYYY');
    const visits = this.currentUser.visits.filter(v => v.date == this.formattedDate);
    visits.sort((a, b) => +a.hour.replace(':', '') - +b.hour.replace(':', ''));
    this.visitsToDisplay = visits.filter(e => e.status !== 'pending');
  }

}
