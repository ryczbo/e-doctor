import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./_login/login.component";
import {RegisterComponent} from "./_register/register.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./_home/home.component";

const routes: Routes = [
      {path: 'home', component: HomeComponent},
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
