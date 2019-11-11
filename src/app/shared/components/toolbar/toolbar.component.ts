import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services';
import { AppRouterUrls } from '../../../app-routing.config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  drop = false;
  editDrop = false;
  imgPath;
  notifications;
  patientsList;
  inbox = 0;
  visits = [];
  isMobile = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + this.currentUser.profilePic);
        this.notifications = this.currentUser.visits.filter(s => s.read === false).length;
      };
      if (this.currentUser && this.currentUser.userType === 'Patient') {
        this.patientNotifications();
      } else if (this.currentUser && this.currentUser.userType === 'Doctor') {
        this.doctorNotifications();
      }});
  }

  ngOnInit() {
    this.fetchPatients();
    // if mobile, set the variable to hide the logout button in the dropdown
    if (window.screen.width < 450) {
      this.isMobile = true;
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.reload();
  }

  reload() {
    window.location.replace(AppRouterUrls.HOME);
  }

  fetchPatients() {
    this.userService.getAll().pipe(first()).subscribe(patients => {
      this.patientsList = patients.filter(e => e.userType === 'Patient');
    });
  }

  readNotifications() {
    if (this.currentUser.userType === 'Patient') {
      this.currentUser.visits.forEach(e => e.read = true);
      this.userService.update(this.currentUser).subscribe();
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifications = this.currentUser.visits.filter(s => s.read === false).length;
    } else {
      return;
    }
  }

  // function to prevent display of "pending" visits in notifications div
  patientNotifications() {
    return this.currentUser.visits.filter(a => a.status !== 'pending' && a.status !== 'completed');
  }

  doctorNotifications() {
    return this.currentUser.visits.filter(a => a.status !== 'completed');
  }

  confirm(visit) {
    this.currentUser.visits.find(x => x.id === visit.id).status = 'confirmed';
    this.currentUser.visits.find(x => x.id === visit.id).read = true;
    this.userService.update(this.currentUser).subscribe(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
    });
    this.notifications = this.currentUser.visits.filter(s => s.read === false).length;
    const patient = this.patientsList.find(x => x.firstName + ' ' + x.lastName == visit.patientName);
    patient.visits.find(x => x.id === visit.id).status = 'confirmed';
    patient.visits.find(x => x.id === visit.id).read = false;
    this.userService.update(patient).subscribe();
  }

  decline(visit) {
    this.currentUser.visits.find(x => x.id === visit.id).status = 'declined';
    this.currentUser.visits.find(x => x.id === visit.id).read = true;
    this.userService.update(this.currentUser).subscribe(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
    });
    this.notifications = this.currentUser.visits.filter(s => s.read === false).length;
    const patient = this.patientsList.find(x => x.firstName + ' ' + x.lastName == visit.patientName);
    patient.visits.find(x => x.id === visit.id).status = 'declined';
    patient.visits.find(x => x.id === visit.id).read = false;
    this.userService.update(patient).subscribe();
  }
}

