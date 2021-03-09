import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import {LoginAdminComponent} from './pages/form-registro-login/form-logins/login-admin/login-admin.component';

import {EmpleadorComponent} from './pages/empleador/empleador.component';
//import {PanelAdminComponent} from './pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/mi-perfil/mi-perfil.component';
import { TareaValiar } from 'src/app/pages/paneles-administracion/panel-admin/tablas-validacion/tablas-validar.component';
//import { TareasRealizadasComponent } from './pages/paneles-administracion/panel-admin/tabs/tareas-realizadas/tareas-realizadas.component';
import {LoginPostulanteComponent} from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import {RegistroEmpleadorComponent} from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//panel administrador
import {FormInfoPostulanteComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validacion-postulante/form-validacion-postulante.component';
//import {PanelAdminComponent} from 'src/app/pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
//panel de admistracion del postulante
//import {PanelPostulanteComponent}from './pages/paneles-administracion/panel-postulante/nav/navTab-postulante.component'; 
import {MiPerfilPostulanteComponent} from './pages/paneles-administracion/panel-postulante/mi-perfil/mi-perfil.component';
import {FormularioInfoPostulanteComponent} from './pages/paneles-administracion/panel-postulante/formulario-info-postulante/formulario-info-postulante.component';
//empleador
//import {TareaValiarEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-admin/tareas/validar-empleadores/tareas-validar-empleador.component';
import {MiPerfilComponentEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/mi-perfil/mi-perfil.component';
import {FormularioInfoEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-empleador/formulario-info-empleador/formulario-info-empleador.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro-postulante', component: RegistroPostulanteComponent },
  { path: 'registro-empleador', component: RegistroEmpleadorComponent },
  { path: 'login-postulante'   , component: LoginPostulanteComponent },
  { path: 'login-admin' , component: LoginAdminComponent },
  { path: 'login-empleador' , component: LoginEmpleadorComponent },
  //rutas del empleador
  { path: 'empleador' , component: EmpleadorComponent },
  { path: 'panel-empleador/mi-perfil' , component: MiPerfilComponentEmpleador },
  { path: 'panel-empleador/form-info-empleador' , component: FormularioInfoEmpleadorComponent },
  //rutas del admistrador
  { path: 'panel-admin/mi-perfil' , component: MiPerfilComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/tareas' , component: TareaValiar,canActivate:[AutentificacionGuard] },
  //{ path: 'panel-admin/tareas' , component: TareaValiarEmpleadorComponent,canActivate:[AutentificacionGuard] },
  
  { path: 'panel-admin/tareas/postulante/:external_es' , component: FormInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/tareas/empleador/:external_em' , component: FormInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  //rutas del postulante
  { path: 'panel-postulante/mi-perfil' , component: MiPerfilPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/form-info-postulante' , component: FormularioInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // si quiero exportar estas rutas para usarlas en otro modulo entonces coloco esto 
  exports: [ RouterModule ]
}) 
export class AppRoutingModule { }
