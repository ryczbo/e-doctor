import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.config';
import { LoginComponent, RegisterComponent } from './shared/components';
import { HomeComponent } from './views/components';
import { EditProfileComponent } from './views/components';
import { LandingPageComponent } from './views/components';
import { MainPickerComponent } from './views/components';
import { NotFoundComponent } from './views/components';

const routes: Routes = [
  {path: AppRoutes.DEFAULT, component: LandingPageComponent},
  {path: AppRoutes.HOME, component: HomeComponent},
  {path: AppRoutes.REQUEST, component: MainPickerComponent},
  {path: AppRoutes.LOGIN, component: LoginComponent},
  {path: AppRoutes.REGISTER, component: RegisterComponent},
  {path: AppRoutes.EDIT, component: EditProfileComponent},
  {path: AppRoutes.FOUROHFOUR, component: NotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
