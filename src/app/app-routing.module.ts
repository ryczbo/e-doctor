import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./shared/components/_login/login.component";
import {RegisterComponent} from "./shared/components/_register/register.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./_home/home.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {VisitConductComponent} from "./visit-conduct/visit-conduct.component";
import {DetailsComponent} from "./details/details.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {RegisterService} from "./shared/services";
import {MainPickerComponent} from "./main-picker/main-picker.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NewsComponent} from "./news/news.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'request', component: MainPickerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'edit', component: EditProfileComponent},
  {path: 'visit', component: VisitConductComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
