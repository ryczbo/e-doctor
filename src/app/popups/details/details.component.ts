import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from '../../shared/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  visit;
  rating;
  rated = false;
  doctorsList;
  ratedDoctorsList = [];
  foundIndex;
  foundRated;
  doctorsId;
  show = false;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.visit = data;
    this.doctorsList = data.doctorsList;
    this.doctorsId = data.id;
    this.foundIndex = this.doctorsList.findIndex(x => x._id === data.id);
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.rated = false;
    if (this.currentUser.rates.length > 0) {
      this.ratedDoctorsList = this.currentUser.rates.map(e => e.doctor);
    }
    this.foundRated = this.ratedDoctorsList.findIndex(e => e === this.doctorsId);
  }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getRating() {
    // multiplication due to css star rating format
    const field = this.currentUser.rates.filter(e => e.doctor === this.doctorsId).map(e => e.rate);
    return +field * 20;
  }

  rate(rating) {
    const obj = {
      doctor: String,
      rate: Number
    };
    obj.doctor = this.doctorsId;
    obj.rate = rating;
    if (rating) {
      // rate a doctor
      this.currentUser.rates.push(obj);
      this.userService.update(this.currentUser).subscribe(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
      });
      this.doctorsList[this.foundIndex].rates.push(rating);
      // calculating the average rating
      const sum = this.doctorsList[this.foundIndex].rates.reduce((a, b) => a + b);
      this.doctorsList[this.foundIndex].rating = Math.floor(sum / this.doctorsList[this.foundIndex].rates.length);
      this.userService.update(this.doctorsList[this.foundIndex]).subscribe();
      this.rated = true;
    } else {
      console.log('cant rate');
    }
  }

}
