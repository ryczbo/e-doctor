import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponents } from './components';
import { SharedServices } from "./services";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";
import {MaterialModule} from "../_material/material.module";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ClickOutsideModule
  ],
  exports: [
    ...SharedComponents,
  ],
  declarations: [
    ...SharedComponents
  ],
  providers: [
    ...SharedServices
  ]
})
export class SharedModule { }
