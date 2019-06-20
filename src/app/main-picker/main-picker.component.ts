import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

export interface specialty {
  value: string;
  viewValue: string
}

export interface city {
  value: string;
  viewValue: string
}

export interface doctor {
  city: string;
  specialty: string;
  value: string;
  viewValue: string
}

@Component({
  selector: 'app-main-picker',
  templateUrl: './main-picker.component.html',
  styleUrls: ['./main-picker.component.css']
})
export class MainPickerComponent implements OnInit {

  specialty;
  city;
  doctorsList: Array<string> = [];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  specialties: specialty[] = [
    {value: 'orthopedist-0', viewValue: 'Orthopedist'},
    {value: 'cardiologist-1', viewValue: 'Cardiologist'},
    {value: 'gastrologist-2', viewValue: 'Gastrologist'}
  ]

  cities: city[] = [
    {value: 'warsaw-0', viewValue: 'Warsaw'},
    {value: 'cracow-1', viewValue: 'Cracow'},
    {value: 'gdansk-2', viewValue: 'Gdansk'}
  ];

  doctors: doctor[] = [
    {city: 'gdansk-2', specialty: 'orthopedist-0', value: 'carmela-0', viewValue: 'Carmela Soprano'},
    {city: 'gdansk-2', specialty: 'cardiologist-1', value: 'roland-1', viewValue: 'Roland West'},
    {city: 'cracow-1', specialty: 'gastrologist-2', value: 'jack-2', viewValue: 'Jack Shepard'},
    {city: 'cracow-1', specialty: 'orthopedist-0', value: 'skylar-3', viewValue: 'Skylar White'},
    {city: 'warsaw-0', specialty: 'cardiologist-1', value: 'purple-4', viewValue: 'Purple Hays'},
    {city: 'warsaw-0', specialty: 'gastrologist-2', value: 'marty-5', viewValue: 'Marty Byrde'}
  ];



  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group( {
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group( {
      fourthCtrl: ['', Validators.required]
    });
    console.log(this.doctorsList)
  }

  specialtyChange() {
    this.doctorsList = [];
  }

  cityChange(city, specialty) {
    this.doctorsList = [];
    for (let i=0;i<this.doctors.length; i++) {
      if (city === this.doctors[i].city && specialty === this.doctors[i].specialty) {
        this.doctorsList.push(this.doctors[i].viewValue)
      }
      }
    }



}
