import {Component, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import {UserService} from "../_services/user.service";
import {first} from "rxjs/operators";
import {XunkCalendarModule} from "xunk-calendar";
import { ToolbarComponent } from "../toolbar/toolbar.component";
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

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private renderer: Renderer2,
    // public selDate = { date:1, month:1, year:1 }
  ) {
    this.renderer.removeClass(document.body, 'body');
    this.renderer.addClass(document.body, 'altBody');
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
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
    this.heatmap = this.currentUser.visits
      .map(visit => ({[moment(visit.date, 'DD.MM.YYYY').format('YYYYMMDD')]: 0.7}))
      .reduce((a, b) => Object.assign(a, b));
    console.log(this.heatmap);
  }

  setVisitsToDisplay() {
   this.formattedDate = moment(this.selDate).format('DD.MM.YYYY');
    this.visitsToDisplay = this.currentUser.visits.filter(v => v.date == this.formattedDate);
    this.visitsToDisplay.sort((a, b) => +a.hour.replace(':','') - +b.hour.replace(':',''));
    console.log(this.visitsToDisplay);
  }

}
