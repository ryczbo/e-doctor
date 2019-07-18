import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Doctor } from "../doctor";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {AlertService} from "../_services/alert.service";
import {NotLoggedComponent} from "../not-logged/not-logged.component";

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
  trigger('slideLeft', [
    state('initial', style({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    })),
    state('final', style({
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      width: '100%',
    })),
    transition('initial=>final', animate('500ms')),
  ])],
  styleUrls: ['./main-picker.component.css']
})
export class MainPickerComponent implements OnInit, OnDestroy {

  specialty;
  city;
  cities;
  doctors;
  specialtyPicked = 0;
  stepCounter: number = 1;
  calendarClicked = false;
  currentState = 'initial';
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  canActivate = true;

  doctorsList: Array<Doctor> = [
    {name: 'John Locke', city: 'Warsaw', specialty: 'Orthopedist'},
    {name: 'Sayid Jarrah', city: 'Cracow', specialty: 'Cardiologist'},
    {name: 'Jack Shepard', city: 'Gdansk', specialty: 'Gastrologist'},
    {name: 'Charles Widmore', city: 'Warsaw', specialty: 'Orthopedist'},
    {name: 'Hugo Reyes', city: 'Poznan', specialty: 'Neurologist'},
    {name: 'Kate Austen', city: 'Cracow', specialty: 'Cardiologist'},
    {name: 'James Ford', city: 'Warsaw', specialty: 'Gastrologist'},
    {name: 'Benjamin Linus', city: 'Gdansk', specialty: 'Neurologist'},
    {name: 'Desmond Hume', city: 'Cracow', specialty: 'Dermatologist'},
    {name: 'Charlie Pace', city: 'Poznan', specialty: 'Psychiatrist'},
    {name: 'Boone Carlyle', city: 'Warsaw', specialty: 'Psychiatrist'},
    {name: 'Claire Littleton', city: 'Gdansk', specialty: 'Orthopedist'},
    {name: 'Jin Soo-Kwon', city: 'Cracow', specialty: 'Cardiologist'},
    {name: 'Juliet Burke', city: 'Kielce', specialty: 'Neurologist'},
    {name: 'Shannon Rutherford', city: 'Warsaw', specialty: 'Dermatologist'},
    {name: 'Richard Alpert', city: 'Cracow', specialty: 'Orthopedist'},
    {name: 'Danielle Rousseau', city: 'Gdansk', specialty: 'Cardiologist'},
    {name: 'Ana-Lucia Cortez', city: 'Poznan', specialty: 'Neurologist'},
    {name: 'Michael Dawson', city: 'Poznan', specialty: 'Gastrologist'},
    {name: 'Frank Lapidus', city: 'Warsaw', specialty: 'Psychiatrist'},
  ];

  uniqueCities() {
    const unique = this.doctorsList.map(s => s.specialty).filter((e, i, a) => a.indexOf(e) === i);
    return unique
  }

  pickSpecialty(specialty) {
    this.cities = this.doctorsList.filter(e => e.specialty == specialty).map(d => d.city).filter((e, i, a) => a.indexOf(e) === i);
    this.specialty = specialty;
    this.specialtyPicked = 1;

  }

  pickCity(specialty,city) {
    this.doctors = this.doctorsList.filter(e => e.specialty == specialty && e.city == city);
    console.log(this.doctors);
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.uniqueCities();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  calendarClick() {
    this.calendarClicked = true;
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
      if(!this.currentUser){
        this.canActivate = false;
      }
  }

}
