import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule, MatTooltipModule, MatDialogModule } from "@angular/material";
import { MatDatepickerModule } from "@angular/material";
import { MatNativeDateModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";


// in this module we import every angular material module
@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule
  ],
  exports: [
    CommonModule,
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
