import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
  doctorsPatientsList;
  inbox = 0;
  visits = [];

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

  // filterVisits() {
  //   let name = this.currentUser.firstName + ' ' + this.currentUser.lastName;
  //     for (let i = 0; i < this.allPatientsList.length; i++){
  //       for (let j = 0; j < this.allPatientsList[i].visits.length; j++) {
  //         if (this.allPatientsList[i].visits[j].userName === name) {
  //           this.visits.push(this.allPatientsList[i].visits[j]);
  //         }
  //       }
  //     }
  //   }

    // console.log(this.visits);

  readNotifications() {
    this.currentUser.visits.forEach(e => e.read = true);
    this.userService.update(this.currentUser).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }


  //function to prevent display of "pending" visits in notifications div
  patientNotifications () {
    return this.currentUser.visits.filter(a => a.status !== 'pending');
  }

  confirm(visit) {
    this.currentUser.visits.find(x => x.id === visit.id).status = 'confirmed';
    this.userService.update(this.currentUser).subscribe();
    const patient = this.patientsList.find(x => x.firstName + ' ' + x.lastName == visit.patientName);
    patient.visits.find(x => x.id === visit.id).status = 'confirmed';
    patient.visits.find(x => x.id === visit.id).read = false;
    this.userService.update(patient).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  decline(visit) {
    this.currentUser.visits.find(x => x.id === visit.id).status = 'declined';
    this.userService.update(this.currentUser).subscribe();
    const patient = this.patientsList.find(x => x.firstName + ' ' + x.lastName == visit.patientName);
    patient.visits.find(x => x.id === visit.id).status = 'declined';
    patient.visits.find(x => x.id === visit.id).read = false;
    this.userService.update(patient).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

}

