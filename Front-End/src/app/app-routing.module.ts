import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import {LoginAdminComponent} from './pages/form-registro-login/form-logins/login-admin/login-admin.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/mi-perfil/mi-perfil.component';
import { TareaValiar } from 'src/app/pages/paneles-administracion/panel-admin/tablas-validacion-cuentas/tablas-validar.component';
import {LoginPostulanteComponent} from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import {RegistroEmpleadorComponent} from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//panel administrador
import {TablaFiltroPostulantesComponent} from 'src/app/pages/paneles-administracion/panel-admin/tabla-filtro-postulantes/tabla-filtro-postulantes.component';
import {FormPublicarOfertaGestorComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-publicar-oferta-gestor/form-publicar-oferta-gestor.component';
import {TablaPublicarOfertGestorComponent} from 'src/app/pages/paneles-administracion/panel-admin/tabla-publicar-ofert-gestor/tabla-publicar-ofert-gestor.component';
import {FormValidarOfertaLaboralComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validar-oferta-laboral/form-validar-oferta-laboral.component';
import {TablaValidarOfertasLaboralesComponent} from 'src/app/pages/paneles-administracion/panel-admin/tabla-validar-ofertas-laborales/tabla-validar-ofertas-laborales.component';
import {FormInfoPostulanteComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validacion-postulante/form-validacion-postulante.component';
import {MiPerfilPostulanteComponent} from './pages/paneles-administracion/panel-postulante/mi-perfil/mi-perfil.component';
import {FormularioInfoPostulanteComponent} from './pages/paneles-administracion/panel-postulante/formulario-info-postulante/formulario-info-postulante.component';
//empleador
import {PostulantesOfertaComponent} from 'src/app/pages/paneles-administracion/panel-empleador/oferta-laboral/postulantes-oferta/postulantes-oferta.component';
import {EditOfertaComponent} from 'src/app/pages/paneles-administracion/panel-empleador/oferta-laboral/edit-oferta/edit-oferta.component';
import {AddOfertaComponent} from 'src/app/pages/paneles-administracion/panel-empleador/oferta-laboral/add-oferta/add-oferta.component';
import {FormValidacionEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-admin/form-validacion-empleador/form-validacion-empleador.component';
import {MiPerfilComponentEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/mi-perfil/mi-perfil.component';
import {FormularioInfoEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-empleador/formulario-info-empleador/formulario-info-empleador.component';
import {OfertaLaboralComponent} from 'src/app/pages/paneles-administracion/panel-empleador/oferta-laboral/tabla-oferta-laboral/oferta-laboral.component';
//postulante
import {PostularOfertaLaboralComponent} from 'src/app/pages/paneles-administracion/panel-postulante/postular-oferta-laboral/postular-oferta-laboral.component';
import {FormEditarTituloComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/form-editar-titulo/form-editar-titulo.component';
import {FormAddTituloComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/form-add-titulo/form-add-titulo.component';
import {TitulosAcademicosComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/titulos-academicos.component';
import {CursosCapacitacionesComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/cursos-capacitaciones.component';
//cursos-capacitaciones
import {FormEditarCursoComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/form-editar-curso/form-editar-curso.component';
import {FormAddCursoComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/form-add-curso/form-add-curso.component';
//publicar ofertas

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro-postulante', component: RegistroPostulanteComponent },
  { path: 'registro-empleador', component: RegistroEmpleadorComponent },
  { path: 'login-postulante'   , component: LoginPostulanteComponent },
  { path: 'login-admin' , component: LoginAdminComponent },
  { path: 'login-empleador' , component: LoginEmpleadorComponent },
  //rutas del empleador
  
  { path: 'panel-empleador/postulante-oferta/:external_of' , component: PostulantesOfertaComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/edit-oferta-laboral/:external_of' , component: EditOfertaComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/mi-perfil' , component: MiPerfilComponentEmpleador,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/form-info-empleador' , component: FormularioInfoEmpleadorComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/oferta-laboral' , component: OfertaLaboralComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/add-ferta-laboral' , component: AddOfertaComponent,canActivate:[AutentificacionGuard] },
  //rutas del admistrador
  
  { path: 'panel-admin/filtrar-postulantes/:external_of' , component: TablaFiltroPostulantesComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/publicar-oferta-gestor' , component: TablaPublicarOfertGestorComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/mi-perfil' , component: MiPerfilComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/form-validar-ofertaLaboral/:external_of' , component: FormValidarOfertaLaboralComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/form-publicar-ofertaLaboral/:external_of' , component: FormPublicarOfertaGestorComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/validar-oferta-laboral' , component: TablaValidarOfertasLaboralesComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/tareas' , component: TareaValiar,canActivate:[AutentificacionGuard] },
  //{ path: 'panel-admin/tareas' , component: TareaValiarEmpleadorComponent,canActivate:[AutentificacionGuard] },
 
  { path: 'panel-admin/tareas/postulante/:external_es' , component: FormInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/tareas/empleador/:external_em' , component: FormValidacionEmpleadorComponent,canActivate:[AutentificacionGuard] },
  //rutas del postulante

  { path: 'panel-postulante/postular-oferta-laboral' , component: PostularOfertaLaboralComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/mi-perfil' , component: MiPerfilPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/form-info-postulante' , component: FormularioInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/titulos-academicos' , component: TitulosAcademicosComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/add-titulo' , component: FormAddTituloComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/edit-titulo/:external_ti' , component: FormEditarTituloComponent,canActivate:[AutentificacionGuard] },
  //cursos-capacitaciones
  { path: 'panel-postulante/cursos-capacitaciones' , component: CursosCapacitacionesComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/add-curso-capacitacion' , component: FormAddCursoComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-postulante/edit-curso-capacitacion/:external_cu' , component: FormEditarCursoComponent,canActivate:[AutentificacionGuard] },
  //{ path: 'panel-postulante/cursos-capacitaciones' , component: CursosCapacitacionesComponent,canActivate:[AutentificacionGuard] },
  { path: '**', redirectTo: 'home' }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:true}) ],
  // si quiero exportar estas rutas para usarlas en otro modulo entonces coloco esto 
  exports: [ RouterModule ]
}) 
export class AppRoutingModule { }