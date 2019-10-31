import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.visit = data;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getRating(visit) {
    // multiplication due to css star rating format
    return visit.rate * 20;
  }

  ngOnInit() {
  }

}
