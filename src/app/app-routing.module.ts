import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
   path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  }, 
  { 
    path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }