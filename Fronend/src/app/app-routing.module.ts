import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import {LoginAdminComponent} from './pages/form-registro-login/form-logins/login-admin/login-admin.component';

import {EmpleadorComponent} from './pages/empleador/empleador.component';
import {PanelAdminComponent} from './pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/tabs/mi-perfil/mi-perfil.component';
import { TareasPendientesComponent } from './pages/paneles-administracion/panel-admin/tabs/tareas-pendientes/tareas-pendientes.component';
import { TareasRealizadasComponent } from './pages/paneles-administracion/panel-admin/tabs/tareas-realizadas/tareas-realizadas.component';
import {LoginPostulanteComponent} from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import {RegistroEmpleadorComponent} from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//panel de admistracion del postulante
import {PanelPostulanteComponent}from './pages/paneles-administracion/panel-postulante/nav/navTab-postulante.component'; 
import {MiPerfilPostulanteComponent} from './pages/paneles-administracion/panel-postulante/tabs/mi-perfil/mi-perfil.component';
import {FormularioInfoPostulanteComponent} from './pages/paneles-administracion/panel-postulante/tabs/formulario-info-postulante/formulario-info-postulante.component';

const routes: Routes = [
  //{ path: 'home'    , component: HomeComponent,canActivate:[AutentificacionGuard] },
  { path: 'home'    , component: HomeComponent },
  { path: 'registro-postulante', component: RegistroPostulanteComponent },
  { path: 'registro-empleador', component: RegistroEmpleadorComponent },
   { path: 'login-postulante'   , component: LoginPostulanteComponent },
  { path: 'login-admin' , component: LoginAdminComponent },
  { path: 'login-empleador' , component: LoginEmpleadorComponent },
  //{ path: 'postulante' , component: PostulanteComponent },
  { path: 'empleador' , component: EmpleadorComponent },
  //rutas del admistrador
  { path: 'panel-admin/mi-perfil' , component: MiPerfilComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/tareas-pendientes' , component: TareasPendientesComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/tareas-pendientes/postulante/:external_es' , component: TareasPendientesComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/tareas-realizadas' , component: TareasRealizadasComponent ,canActivate:[AutentificacionGuard]},
  //rutas del postulante
 // { path: 'panel-postulante/mi-perfil' , component: MiPerfilComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-postulante/mi-perfil' , component: MiPerfilPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/form-info-postulante' , component: FormularioInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  //{ path: 'panel-postulante/mi-perfil' , component: PanelPostulanteComponent},
  // { path: 'panel-postulante/tareas-pendientes' , component: TareasPendientesComponent,canActivate:[AutentificacionGuard] },
  // { path: 'panel-postulante/tareas-realizadas' , component: TareasRealizadasComponent ,canActivate:[AutentificacionGuard]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // si quiero exportar estas rutas para usarlas en otro modulo entonces coloco esto 
  exports: [ RouterModule ]
}) 
export class AppRoutingModule { }
