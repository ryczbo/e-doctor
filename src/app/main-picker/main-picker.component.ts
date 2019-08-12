import {Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Doctor } from "../doctor";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { DomSanitizer } from "@angular/platform-browser";
import {AuthenticationService} from "../_services/authentication.service";
import { ViewChild } from "@angular/core";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {AlertService} from "../_services/alert.service";
import { UserService } from "../_services/user.service";
import {NotLoggedComponent} from "../not-logged/not-logged.component";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatDatepicker } from "@angular/material/datepicker";

@Component({
  selector: 'app-main-picker',
  templateUrl: './main-picker.component.html',
  animations: [trigger('removeTrigger', [
    transition(':leave', [
      animate('500ms ease-in', style({transform: 'translateY(-100%)', opacity: 0}))
    ])
  ]),
    trigger('cover', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('0.9s', style({ opacity: 1 })),
        ])]),
],
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
  datePicked = false;
  imgPath;
  request;
  doctorsList;

  @ViewChild('datePicker', {static: true}) datePicker: MatDatepicker<Date>;

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value.toLocaleDateString();
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
    private userService: UserService
  ) {
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
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
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
    console.log(this.doctorsList);
  }


}
