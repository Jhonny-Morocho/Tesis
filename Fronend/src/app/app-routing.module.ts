import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import {LoginAdminComponent} from './pages/form-registro-login/form-logins/login-admin/login-admin.component';

import {EmpleadorComponent} from './pages/empleador/empleador.component';
//import {PanelAdminComponent} from './pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/mi-perfil/mi-perfil.component';
import { TareasAdminComponent } from './pages/paneles-administracion/panel-admin/tareas/tareas-admin.component';
//import { TareasRealizadasComponent } from './pages/paneles-administracion/panel-admin/tabs/tareas-realizadas/tareas-realizadas.component';
import {LoginPostulanteComponent} from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import {RegistroEmpleadorComponent} from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//panel administrador
import {FormInfoPostulanteComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validacion-postulante/form-validacion-postulante.component';
import {PanelAdminComponent} from 'src/app/pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
//panel de admistracion del postulante
import {PanelPostulanteComponent}from './pages/paneles-administracion/panel-postulante/nav/navTab-postulante.component'; 
import {MiPerfilPostulanteComponent} from './pages/paneles-administracion/panel-postulante/mi-perfil/mi-perfil.component';
import {FormularioInfoPostulanteComponent} from './pages/paneles-administracion/panel-postulante/formulario-info-postulante/formulario-info-postulante.component';
//empleador
import {MiPerfilComponentEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/tabs/mi-perfil/mi-perfil.component';
const routes: Routes = [
  //{ path: 'home'    , component: HomeComponent,canActivate:[AutentificacionGuard] },
  { path: 'home'    , component: HomeComponent },
  { path: 'registro-postulante', component: RegistroPostulanteComponent },
  { path: 'registro-empleador', component: RegistroEmpleadorComponent },
   { path: 'login-postulante'   , component: LoginPostulanteComponent },
  { path: 'login-admin' , component: LoginAdminComponent },
  { path: 'login-empleador' , component: LoginEmpleadorComponent },
  //{ path: 'postulante' , component: PostulanteComponent },
  //rutas del empleador
  { path: 'empleador' , component: EmpleadorComponent },
  { path: 'panel-empleador/mi-perfil' , component: MiPerfilComponentEmpleador },
  { path: 'panel-postulante/form-info-empleador' , component: FormularioInfoPostulanteComponent },
  //rutas del admistrador
  { path: 'panel-admin/mi-perfil' , component: MiPerfilComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/tareas' , component: TareasAdminComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/tareas/postulante/:external_es' , component: FormInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  
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
