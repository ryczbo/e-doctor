import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from "../_services/authentication.service";
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userType = [{val: 'Doctor'}, {val: 'Patient'}];
  pickedUserType: string;
  specialties = [
    'Orthopedist',
    'Gastrologist',
    'Cardiologist',
    'Psychiatrist',
    'Neurologist',
    'Dermatologist'
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['', Validators.required],
      npi: '',
      specialty: '',
      city: ''
  });
    this.setConditionalValidator();
  }

  setConditionalValidator() {
    this.registerForm.get('userType').valueChanges
      .subscribe(userType => {
        if (userType === 'Doctor') {
          this.registerForm.get('npi').setValidators([Validators.required]);
        }
      });
  }

  pickUserType(val) {
    this.pickedUserType = val;
    console.log('jest');
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
