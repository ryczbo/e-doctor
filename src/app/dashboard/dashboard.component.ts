import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import { UserService } from "../_services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  patients;
  getPatientsCheck = false;

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

}

}
