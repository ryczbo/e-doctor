import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../../services';
import { AppRouterLinks } from '../../../app-routing.config';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  lastLogged;
  hide = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private renderer: Renderer2,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
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
          {
            if (data.userType === 'Patient') {
              this.router.navigate([`${AppRouterLinks.NEWS}`]);
            } else {
              this.router.navigate([`${AppRouterLinks.HOME}`]);
            }
          }
        },
        error => {
          this.alertService.error(error.error);
          this.hide = true;
          this.loading = false;
        });
  }
}


