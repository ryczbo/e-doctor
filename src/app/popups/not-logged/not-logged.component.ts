import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService, UserService } from '../../shared/services';

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.component.html',
  styleUrls: ['./not-logged.component.scss']
})
export class NotLoggedComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<NotLoggedComponent>,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  @Output() logged = new EventEmitter<boolean>();

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  hideTitle = false;

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.hideTitle = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.logged.emit(true);
          this.dialogRef.close();
          this.alertService.clearAlert();
        },
        error => {
          this.loading = false;
          this.alertService.error(error.error);
        });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
