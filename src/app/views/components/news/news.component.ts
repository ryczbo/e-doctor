import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  imgCounter = 1;

  constructor() { }

  ngOnInit() {
  }

  next() {
    if (this.imgCounter < 3) {
      this.imgCounter++;
    }
  }

  previous() {
    if (this.imgCounter > 1) {
      this.imgCounter--;
    }
  }


}
