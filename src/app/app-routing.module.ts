import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./_login/login.component";
import {RegisterComponent} from "./_register/register.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./_home/home.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'edit', component: EditProfileComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
