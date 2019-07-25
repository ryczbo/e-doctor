import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import {MatDatepicker} from "@angular/material";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  date: string;

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value.toLocaleDateString();
    console.log(this.date);
  }

  constructor() { }

  ngOnInit() {
  }

}
