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

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', component: HomeComponent},
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
