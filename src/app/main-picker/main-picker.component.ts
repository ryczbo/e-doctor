import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Doctor } from "../doctor";

@Component({
  selector: 'app-main-picker',
  templateUrl: './main-picker.component.html',
  styleUrls: ['./main-picker.component.css']
})
export class MainPickerComponent implements OnInit {

  specialty;
  city;

  cities;
  doctors;

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
  }

  pickCity(specialty,city) {
    this.doctors = this.doctorsList.filter(e => e.specialty == specialty && e.city == city);
  }

  stepCounter: number = 1;

  constructor() {
  }

  ngOnInit() {
    this.uniqueCities()
  }



}
