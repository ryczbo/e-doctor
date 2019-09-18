import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {first} from "rxjs/operators";
import {XunkCalendarModule} from "xunk-calendar";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar.component";
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  patients;
  getPatientsCheck = false;
  visitsToDisplay;
  public selDate = { date:1, month:1, year:1};
  heatmap = {};
  formattedDate;
  visit;
  pickedVisit = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    // public selDate = { date:1, month:1, year:1 }
  ) {
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.removeClass(document.body, 'landing1');
    this.renderer.addClass(document.body, 'landing3');
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  conductVisit(visit) {
    this.visit = visit;
    this.pickedVisit = true;
    // this.router.navigate(['/visit'])
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

ngOnInit() {
    this.selDate = XunkCalendarModule.getToday();
    this.genHeatmap();
  // this.heatmap = this.genHeatmap();
  // this.getPatients();
}

  genHeatmap(): any {
    if(this.currentUser.visits.length > 0) {
    this.heatmap = this.currentUser.visits
      .map(visit => ({[moment(visit.date, 'DD.MM.YYYY').format('YYYYMMDD')]: 0.7}))
      .reduce((a, b) => Object.assign(a, b));}
    else {return}
  }

  setVisitsToDisplay() {
   this.formattedDate = moment(this.selDate).format('DD.MM.YYYY');
    this.visitsToDisplay = this.currentUser.visits.filter(v => v.date == this.formattedDate);
    this.visitsToDisplay.sort((a, b) => +a.hour.replace(':','') - +b.hour.replace(':',''));
    console.log(this.visitsToDisplay);
  }

}
