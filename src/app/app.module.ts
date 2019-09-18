import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "./_material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { fakeBackendProvider } from "./shared/services/fake-backend";
import { JwtInterceptor } from "./shared/services";
import { ErrorInterceptor } from "./shared/services";
import { MainPickerComponent } from "./main-picker/main-picker.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClickOutsideModule } from "ng-click-outside";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCheckCircle, faCommentMedical,
  faEllipsisV, faBell,
  faEnvelope, faEye, faUserEdit,
  faHome, faAngleDoubleDown, faAngleRight, faAngleLeft,
  faHourglassHalf, faTimes, faTimesCircle, faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { HomeComponent } from "./_home/home.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { CalendarComponent } from "./calendar/calendar.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { XunkCalendarModule } from "xunk-calendar";
import { VisitConductComponent } from './visit-conduct/visit-conduct.component';
import { TextFieldModule } from "@angular/cdk/text-field";
import { DetailsComponent } from './details/details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPickerComponent,
    HomeComponent,
    SidebarComponent,
    NotLoggedComponent,
    CalendarComponent,
    DashboardComponent,
    EditProfileComponent,
    VisitConductComponent,
    DetailsComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    XunkCalendarModule,
    TextFieldModule,
    SharedModule,
    NgbModalModule,
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [DetailsComponent]
})
export class AppModule {
  constructor() {
    library.add(faEllipsisV, faCalendarAlt, faAngleDoubleDown, faAngleLeft, faAngleRight,
      faUserEdit, faBell, faEnvelope, faCheck, faCheckCircle, faHourglassHalf, faHome,
      faTimes, faTimesCircle, faCommentMedical, faEye);

  }
}
