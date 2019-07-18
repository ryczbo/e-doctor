import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import {MatDatepicker} from "@angular/material";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('keepOpen', {static: true}) _input: ElementRef;

  openCalendar(picker: MatDatepicker<Date>){
    picker.open()
  }

  constructor() { }

  ngOnInit() {
  }

}
