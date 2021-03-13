import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import {LoginAdminComponent} from './pages/form-registro-login/form-logins/login-admin/login-admin.component';
import {EmpleadorComponent} from './pages/empleador/empleador.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/mi-perfil/mi-perfil.component';
import { TareaValiar } from 'src/app/pages/paneles-administracion/panel-admin/tablas-validacion/tablas-validar.component';
import {LoginPostulanteComponent} from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import {RegistroEmpleadorComponent} from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//panel administrador
import {FormInfoPostulanteComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validacion-postulante/form-validacion-postulante.component';
import {MiPerfilPostulanteComponent} from './pages/paneles-administracion/panel-postulante/mi-perfil/mi-perfil.component';
import {FormularioInfoPostulanteComponent} from './pages/paneles-administracion/panel-postulante/formulario-info-postulante/formulario-info-postulante.component';
//empleador
import {FormValidacionEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validacion-empleador/form-validacion-empleador.component';
import {MiPerfilComponentEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/mi-perfil/mi-perfil.component';
import {FormularioInfoEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-empleador/formulario-info-empleador/formulario-info-empleador.component';
//postulante
import {FormEditarTituloComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/form-editar-titulo/form-editar-titulo.component';
import {FormAddTituloComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/form-add-titulo/form-add-titulo.component';
import {TitulosAcademicosComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/titulos-academicos.component';
import {CursosCapacitacionesComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/cursos-capacitaciones.component';

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
  { path: 'panel-admin/tareas/empleador/:external_em' , component: FormValidacionEmpleadorComponent,canActivate:[AutentificacionGuard] },
  //rutas del postulante
  { path: 'panel-postulante/mi-perfil' , component: MiPerfilPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/form-info-postulante' , component: FormularioInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/titulos-academicos' , component: TitulosAcademicosComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/add-titulo' , component: FormAddTituloComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/edit-titulo/:external_ti' , component: FormEditarTituloComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/cursos-capacitaciones' , component: CursosCapacitacionesComponent,canActivate:[AutentificacionGuard] },
  { path: '**', redirectTo: 'home' }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // si quiero exportar estas rutas para usarlas en otro modulo entonces coloco esto 
  exports: [ RouterModule ]
}) 
export class AppRoutingModule { }
