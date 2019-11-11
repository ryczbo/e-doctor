import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../../services';
import { AppRouterLinks } from '../../../app-routing.config';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  showAlert = false;
  userType = [{val: 'Doctor'}, {val: 'Patient'}];
  pickedUserType: string;
  specialties = [
    'Orthopedist',
    'Gastrologist',
    'Cardiologist',
    'Psychiatrist',
    'Neurologist',
    'Dermatologist'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {
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
          this.registerForm.get('specialty').setValidators([Validators.required]);
          this.registerForm.get('npi').setValidators([Validators.required]);
          this.registerForm.get('city').setValidators([Validators.required]);
        }
      });
  }

  pickUserType(val) {
    this.pickedUserType = val;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showAlert = true;
          this.alertService.success('Registration successful', true);
          setTimeout(() => this.router.navigate([`${AppRouterLinks.LOGIN}`]), 2000);
        },
        error => {
          this.showAlert = true;
          this.alertService.error(error.error);
          this.loading = false;
        });
  }
}
