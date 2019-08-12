import {Component, OnInit, Renderer2} from '@angular/core';
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
  patients;
  getPatientsCheck = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private renderer: Renderer2
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

}

}
