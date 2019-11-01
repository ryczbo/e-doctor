import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ViewsModule } from './views/views.module';
import { PopupsModule } from './popups/popups.module';
import { popups } from './popups';
import { MaterialModule } from './_material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faCheckCircle, faCommentMedical,
  faEllipsisV, faBell, faAngleDown,
  faEnvelope, faEye, faUserEdit,
  faHome, faAngleDoubleDown, faAngleRight, faAngleLeft,
  faHourglassHalf, faTimes, faTimesCircle, faCalendarAlt, faSignOutAlt, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    ViewsModule,
    PopupsModule,
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [popups]
})
export class AppModule {
  constructor() {
    library.add(faEllipsisV, faCalendarAlt, faAngleDoubleDown, faAngleLeft, faAngleRight,
      faUserEdit, faBell, faEnvelope, faCheck, faCheckCircle, faHourglassHalf, faHome,
      faTimes, faTimesCircle, faCommentMedical, faEye, faAngleDown, faSignOutAlt, faChevronLeft, faChevronRight);
  }
}
