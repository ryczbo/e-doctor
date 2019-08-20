import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  drop = false;
  imgPath;
  notifications;
  patientsList;
  inbox = 0;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + this.currentUser.profilePic);
        this.notifications = this.currentUser.visits.filter(s => s.read === false).length;
      }});
  }

  logout() {
    this.authenticationService.logout();
    this.reload();
  }

  reload() {
    window.location.replace('/home');
  }

  ngOnInit() {
    this.fetchPatients();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  fetchPatients() {
    this.userService.getAll().pipe(first()).subscribe(patients => {
      this.patientsList = patients.filter(e => e.userType === 'Patient');
    });
  }

  readNotifications() {
    this.currentUser.visits.forEach(e => e.read = true);
    this.userService.update(this.currentUser).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  confirm(visit) {
    const foundIndex = this.currentUser.visits.indexOf(visit);
    this.currentUser.visits[foundIndex].status = 'confirmed';
    this.userService.update(this.currentUser).subscribe();
    const patient = this.patientsList.find(x => x.id == this.currentUser.visits[foundIndex].userId);
    patient.visits[foundIndex].status = 'confirmed';
    patient.visits[foundIndex].read = false;
    this.userService.update(patient).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  decline(visit) {
    const foundIndex = this.currentUser.visits.indexOf(visit);
    this.currentUser.visits[foundIndex].status = 'declined';
    this.userService.update(this.currentUser).subscribe();
    const patient = this.patientsList.find(x => x.id == this.currentUser.visits[foundIndex].userId);
    patient.visits[foundIndex].status = 'declined';
    patient.visits[foundIndex].read = false;
    this.userService.update(patient).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

}

