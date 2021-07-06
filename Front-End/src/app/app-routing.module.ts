import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {HomeComponent} from 'src/app/Front-end/pages/home/home.component';
import {RegistroPostulanteComponent} from 'src/app/Front-end/pages/form-registro/registro-postulante/registro-postulante.component';
import {LoginAdminComponent} from 'src/app/Front-end/pages/form-login/login.component';
import {AutentificacionGuard} from './guards/autentificacion.guard';
import {MiPerfilComponent} from 'src/app/Backend/panel-admin/pages/mi-perfil-admin/mi-perfil-admin.component';
import { MiPerfilEmpleadorComponent} from 'src/app/Backend/panel-empleador/pages/mi-perfil-empleador/mi-perfil-empleador.component';
import {TareaValiar} from 'src/app/Backend/panel-admin/pages/tablas-validacion-cuentas/tablas-validar.component';
import {RegistroEmpleadorComponent} from 'src/app/Front-end/pages/form-registro/registro-empleador/registro-empleador.component';
//panel administrador
import {MiPerfilPostulanteComponent} from 'src/app/Backend/panel-postulante/pages/mi-perfil-postulante/mi-perfil-postulante.component';
import {PostulanteOfertas} from 'src/app/Backend/panel-admin/pages/postulante-ofertas/postulantes-ofertas-encargado.component';
import {ReporteOfertasComponent} from 'src/app/Backend/panel-admin/pages/reporte-ofertas/reporte-ofertas.component';
import {FormEditarAdminComponent} from 'src/app/Backend/panel-admin/pages/editar-admin/form-editar-admin.component';
import {RegistarAdminComponent} from 'src/app/Backend/panel-admin/pages/registar-admin/form-registar-admin.component';
import {TablaUsuariosAdminComponent} from 'src/app/Backend/panel-admin/pages/tabla-usuarios-admin/tabla-usuarios-admin.component';
import {FormPublicarOfertaGestorComponent} from 'src/app/Backend/panel-admin/pages/publicar-oferta-gestor/form-publicar-oferta-gestor.component';
import {TablaPublicarOfertGestorComponent} from 'src/app/Backend/panel-admin/pages/tabla-publicar-ofert-gestor/tabla-publicar-ofert-gestor.component';
import {FormValidarOfertaLaboralComponent} from 'src/app/Backend/panel-admin/pages/validar-oferta-laboral/form-validar-oferta-laboral.component';
import {TablaValidarOfertasLaboralesComponent} from 'src/app/Backend/panel-admin/pages/tabla-validar-ofertas-laborales/tabla-validar-ofertas-laborales.component';
import {FormInfoPostulanteComponent} from 'src/app/Backend/panel-admin/pages/validacion-postulante/form-validacion-postulante.component';
import {FormularioInfoPostulanteComponent} from 'src/app/Backend/panel-postulante/pages/registro-postulante/formulario-info-postulante.component';
//empleador
import {ReactivarOfertaComponent} from 'src/app/Front-end/pages/reactivar-oferta/reactivar-oferta.component';
import {PostulantesOfertaComponent} from 'src/app/Backend/panel-empleador/pages/oferta-laboral/postulantes-oferta-empleador/postulantes-oferta-empleador';
import {EditOfertaComponent} from 'src/app/Backend/panel-empleador/pages/oferta-laboral/edit-oferta/edit-oferta.component';
import {AddOfertaComponent} from 'src/app/Backend/panel-empleador/pages/oferta-laboral/add-oferta/add-oferta.component';
import {FormValidacionEmpleadorComponent} from 'src/app/Backend/panel-admin/pages/validacion-empleador/form-validacion-empleador.component';
import {FormularioInfoEmpleadorComponent} from 'src/app/Backend/panel-empleador/pages/formulario-info-empleador/formulario-info-empleador.component';
import {OfertaLaboralComponent} from 'src/app/Backend/panel-empleador/pages/oferta-laboral/tabla-oferta-laboral/oferta-laboral.component';
//postulante
import {OfertasPostuladasComponent} from 'src/app/Backend/panel-postulante/pages/ofertas-postuladas/ofertas-postuladas.component';
//import {} from 'src/app/Backend/panel-postulante/ofertas-postuladas';
import {FormEditarTituloComponent} from 'src/app/Backend/panel-postulante/pages/titulos-academicos/form-editar-titulo/form-editar-titulo.component';
import {FormAddTituloComponent} from 'src/app/Backend/panel-postulante/pages/titulos-academicos/form-add-titulo/form-add-titulo.component';
import {TitulosAcademicosComponent} from 'src/app/Backend/panel-postulante/pages/titulos-academicos/titulos-academicos.component';
import {CursosCapacitacionesComponent} from 'src/app/Backend/panel-postulante/pages/cursos-capacitaciones/cursos-capacitaciones.component';
//cursos-capacitaciones
import {FormEditarCursoComponent} from 'src/app/Backend/panel-postulante/pages/cursos-capacitaciones/form-editar-curso/form-editar-curso.component';
import {FormAddCursoComponent} from 'src/app/Backend/panel-postulante/pages/cursos-capacitaciones/form-add-curso/form-add-curso.component';


const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro-postulante', component: RegistroPostulanteComponent },
  { path: 'registro-empleador', component: RegistroEmpleadorComponent },
  { path: 'login' , component: LoginAdminComponent },

  { path: 'panel-empleador/postulante-oferta/:external_of' , component: PostulantesOfertaComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/edit-oferta-laboral/:external_of' , component: EditOfertaComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/form-info-empleador' , component: FormularioInfoEmpleadorComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-empleador/oferta-laboral' , component: OfertaLaboralComponent,canActivate:[AutentificacionGuard], data: {activeTab: 'home'}},
  { path: 'panel-empleador/add-ferta-laboral' , component: AddOfertaComponent,canActivate:[AutentificacionGuard] },
  //rutas del admistrador
  { path: 'reactivar-oferta-laboral/:external_of' , component: ReactivarOfertaComponent},
  { path: 'panel-admin/filtrar-postulantes/:external_of' , component: PostulanteOfertas ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/reporte-ofertas' , component: ReporteOfertasComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/registar-admin' , component: RegistarAdminComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/editar-admin/:external_us' , component: FormEditarAdminComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/gestionar-usuarios-admin' , component:  TablaUsuariosAdminComponent,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/publicar-oferta-gestor' , component: TablaPublicarOfertGestorComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/mi-perfil' , component: MiPerfilComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-empleador/mi-perfil' , component: MiPerfilEmpleadorComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-postulante/mi-perfil' , component: MiPerfilPostulanteComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/form-validar-ofertaLaboral/:external_of' , component: FormValidarOfertaLaboralComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/form-publicar-ofertaLaboral/:external_of' , component: FormPublicarOfertaGestorComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/validar-oferta-laboral' , component: TablaValidarOfertasLaboralesComponent ,canActivate:[AutentificacionGuard]},
  { path: 'panel-admin/tareas' , component: TareaValiar,canActivate:[AutentificacionGuard] },

  { path: 'panel-admin/tareas/postulante/:external_es' , component: FormInfoPostulanteComponent,canActivate:[AutentificacionGuard] },
  { path: 'panel-admin/tareas/empleador/:external_em' , component: FormValidacionEmpleadorComponent,canActivate:[AutentificacionGuard] },
  //rutas del postulante

  { path: 'panel-postulante/ofertas-postuladas' , component: OfertasPostuladasComponent,canActivate:[AutentificacionGuard] },
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
