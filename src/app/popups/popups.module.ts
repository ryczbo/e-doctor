import { NgModule } from '@angular/core';
import { popups } from './index';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../_material/material.module";
import {TextFieldModule} from "@angular/cdk/text-field";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TextFieldModule,
    SharedModule,
  ],
  exports: [
    ...popups,
  ],
  declarations: [
    ...popups
  ]
})
export class PopupsModule { }
