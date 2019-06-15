import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-main-picker',
  templateUrl: './main-picker.component.html',
  styleUrls: ['./main-picker.component.css']
})
export class MainPickerComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group( {
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group( {
      fourthCtrl: ['', Validators.required]
    });
  }
}
