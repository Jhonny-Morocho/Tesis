import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import {LoginAdminComponent} from './pages/login-admin/login-admin.component';
import {PostulanteComponent} from './pages/postulante/postulante.component';
import {EmpleadorComponent} from './pages/empleador/empleador.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';

const routes: Routes = [
  //{ path: 'home'    , component: HomeComponent,canActivate:[AutentificacionGuard] },
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'loginAdmin' , component: LoginAdminComponent },
  { path: 'postulante' , component: PostulanteComponent },
  { path: 'empleador' , component: EmpleadorComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // si quiero exportar estas rutas para usarlas en otro modulo entonces coloco esto 
  exports: [ RouterModule ]
}) 
export class AppRoutingModule { }
