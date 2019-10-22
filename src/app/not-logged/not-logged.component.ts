import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthenticationService} from "../shared/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {AlertService, RegisterService} from "../shared/services";

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.component.html',
  styleUrls: ['./not-logged.component.css']
})
export class NotLoggedComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<NotLoggedComponent>,
    private registerService: RegisterService
  ) {
    this.currentUserSubscription = this.registerService.currentUser.subscribe(user => {
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
  returnUrl: string;
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
    this.registerService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.authenticationService.currentUser);
          this.logged.emit(true);
          this.dialogRef.close();
          this.alertService.clearAlert();
        },
        error => {
          this.loading = false;
          this.alertService.error(error);
        });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


}
