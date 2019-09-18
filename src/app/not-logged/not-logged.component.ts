import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthenticationService} from "../shared/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../_models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.component.html',
  styleUrls: ['./not-logged.component.css']
})
export class NotLoggedComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
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

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('nie');
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
          console.log(this.authenticationService.currentUser);
          this.logged.emit(true);
        },
        error => {
          this.loading = false;
        });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


}
