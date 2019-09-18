import {Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Doctor } from "../doctor";
import { Renderer2 } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {AuthenticationService} from "../shared/services/authentication.service";
import { AlertService } from "../shared/services/alert.service";
import { ViewChild } from "@angular/core";
import {User} from "../_models/user";
import { Request } from "../_models/request";
import {Subscription} from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from "../shared/services/user.service";
import {NotLoggedComponent} from "../not-logged/not-logged.component";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";

@Component({
  selector: 'app-main-picker',
  templateUrl: './main-picker.component.html',
  styleUrls: ['./main-picker.component.css']
})
export class MainPickerComponent implements OnInit, OnDestroy {
  specialty;
  city;
  cities;
  doctors;
  specialtyPicked = 0;
  stepCounter = 1;
  calendarClicked = false;
  currentState = 'initial';
  currentUser: User;
  currentUserSubscription: Subscription;
  selectedDoctor;
  selectedDoctorDetails;
  users: User[] = [];
  date: string;
  hour: string;
  datePicked = false;
  hourPicked = false;
  requestSent = false;
  visitsCount;
  imgPath;
  doctorsList;
  avHours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  request = {doctorId: 1, date: 'a', hour: 'b', status: 'c'};


  @ViewChild('datePicker', {static: true}) datePicker: MatDatepicker<Date>;

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = moment((event.value.toLocaleDateString()),'DD.MM.YYYY').format('DD.MM.YYYY');
    console.log(this.date);
    this.datePicked = true;
    this.calendarClicked = false;
  }

  uniqueCities() {
    const unique = this.doctorsList.map(s => s.specialty).filter((e, i, a) => a.indexOf(e) === i);
    return unique;
  }

  pickSpecialty(specialty) {
    this.cities = this.doctorsList.filter(e => e.specialty == specialty).map(d => d.city).filter((e, i, a) => a.indexOf(e) === i);
    this.specialty = specialty;
    this.specialtyPicked = 1;
  }

  pickCity(specialty, city) {
    this.doctors = this.doctorsList.filter(e => e.specialty == specialty && e.city == city);
    // console.log(this.doctors);
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private alertService: AlertService,
    private renderer: Renderer2
  ) {
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing1');
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + this.currentUser.profilePic);
      }
    });
  }

  ngOnInit() {

    this.fetchDoctors();
    // this.uniqueSpecialties();
    this.uniqueCities();
    this.visitsCounter();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  visitsCounter() {
  this.userService.getAll().pipe(first()).subscribe(users => {
    this.visitsCount = users.map(e => e.visits).reduce((a, b) => [...a, ...b]).length;
    console.log(this.visitsCount);
    }
  )
}

  calendarClick(i: number) {
    this.calendarClicked = false;
    this.selectedDoctor = i;
    setTimeout(() => this.calendarClicked = true, 100);
    this.datePicked = false;
    console.log(this.selectedDoctorDetails);
  }

  fetchDoctors() {
    this.userService.getAll().pipe(first()).subscribe(doctors => {
      this.doctorsList = doctors.filter(e => e.userType === 'Doctor');
    });
    // console.log(this.doctorsList);
  }

  pickHour(hour) {
    this.hour = hour;
    this.request.date = this.date;
    this.request.doctorId = this.selectedDoctorDetails.id;
    this.request.hour = this.hour;
    this.request.status = 'pending';
    // console.log(this.request);
    this.hourPicked = true;
  }

  sendRequest() {
    this.visitsCount++;
    console.log(this.visitsCount);
    const foundIndex = this.doctorsList.findIndex(x => x.id === this.selectedDoctorDetails.id);
    const doctorName = this.doctorsList[foundIndex].firstName + ' ' + this.doctorsList[foundIndex].lastName;
    const patientName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    // console.log(doctor);
    this.currentUser.visits.push({date: this.request.date, id: this.visitsCount , doctorName: doctorName, patientName: patientName, patientId: this.currentUser.id,
      hour: this.request.hour, status: this.request.status, doctorId: this.selectedDoctorDetails.id});
    this.selectedDoctorDetails.visits.push({date: this.request.date, id: this.visitsCount, patientName: patientName, patientId: this.currentUser.id, doctorName: doctorName,
      hour: this.request.hour, status: this.request.status, doctorId: this.selectedDoctorDetails.id, read: false});
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.userService.update(this.currentUser).subscribe();
    this.userService.update(this.selectedDoctorDetails).subscribe();
    this.alertService.success('Request has been sent!', true);
    this.requestSent = true;
  }

  getRating(doctor) {
    if(doctor.rating == undefined) {
      return 0;
    }
    else {
    return doctor.rating * 20;
    }
  }


}
