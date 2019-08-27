import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { fakeBackendProvider } from "./_helpers/fake-backend";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainPickerComponent } from "./main-picker/main-picker.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClickOutsideModule } from "ng-click-outside";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCheckCircle,
  faEllipsisV,
  faEnvelope,
  faHome,
  faHourglassHalf, faTimes, faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { MatSelectModule } from '@angular/material/select';
import { AlertComponent } from "./_alert/alert.component";
import { HomeComponent } from "./_home/home.component";
import { LoginComponent } from "./_login/login.component";
import { RegisterComponent } from "./_register/register.component";
import {MatInputModule} from "@angular/material";
import { MatDatepickerModule } from "@angular/material";
import { MatNativeDateModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { CalendarComponent } from "./calendar/calendar.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { XunkCalendarModule } from "xunk-calendar";


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainPickerComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    FooterComponent,
    NotLoggedComponent,
    CalendarComponent,
    DashboardComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    XunkCalendarModule,
    MatInputModule,
    NgbModalModule,
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faEllipsisV);
    library.add(faCalendarAlt);
    library.add(faAngleDoubleDown);
    library.add(faAngleLeft);
    library.add(faAngleRight);
    library.add(faUserEdit);
    library.add(faBell);
    library.add(faEnvelope);
    library.add(faCheck);
    library.add(faCheckCircle);
    library.add(faHourglassHalf);
    library.add(faHome);
    library.add(faTimes);
    library.add(faTimesCircle);
  }
}
