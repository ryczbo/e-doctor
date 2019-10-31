import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  date: string;

  constructor() { }

  ngOnInit() {
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value.toLocaleDateString();
    console.log(this.date);
  }

}
