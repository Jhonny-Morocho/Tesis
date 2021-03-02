import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import {LoginAdminComponent} from './pages/login-admin/login-admin.component';
import {PostulanteComponent} from './pages/panel-postulante/postulante.component';
import {EmpleadorComponent} from './pages/empleador/empleador.component';
import {PanelAdminComponent} from './pages/panel-admin/nav/navTab-admin.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import { MiPerfilComponent } from './pages/panel-admin/tabs/mi-perfil/mi-perfil.component';
import { TareasPendientesComponent } from './pages/panel-admin/tabs/tareas-pendientes/tareas-pendientes.component';
import { TareasRealizadasComponent } from './pages/panel-admin/tabs/tareas-realizadas/tareas-realizadas.component';
import {LoginPostulanteComponent} from './pages/login-postulante/login-postulante.component';

const routes: Routes = [
  //{ path: 'home'    , component: HomeComponent,canActivate:[AutentificacionGuard] },
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
   { path: 'login-postulante'   , component: LoginPostulanteComponent },
  { path: 'login-admin' , component: LoginAdminComponent },
  { path: 'postulante' , component: PostulanteComponent },
  { path: 'empleador' , component: EmpleadorComponent },
  // { path: 'panel-admin' , component: PanelAdminComponent },
  { path: 'panel-admin/mi-perfil' , component: MiPerfilComponent },
  { path: 'panel-admin/tareas-pendientes' , component: TareasPendientesComponent },
  { path: 'panel-admin/tareas-realizadas' , component: TareasRealizadasComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // si quiero exportar estas rutas para usarlas en otro modulo entonces coloco esto 
  exports: [ RouterModule ]
}) 
export class AppRoutingModule { }
