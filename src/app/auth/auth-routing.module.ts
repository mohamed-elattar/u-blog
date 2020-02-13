import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: AuthComponent, canActivate: [NoAuthGuard] }
];
/*const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent }
];*/

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
