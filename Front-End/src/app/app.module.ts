import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importo mi archivo de rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import {TemplatePdf} from 'src/app/templatePdf/probando';

import { HomeComponent } from './pages/compentes-publicos/home/home.component';

// vamos a importar la clase de modulos para poder opcuar el ngmodel en los formulkario
// modulos siempre van en los import
import {FormsModule} from '@angular/forms';
// para hacer soliuctudes http necestio el siguiente moduo
import {HttpClientModule} from '@angular/common/http';
import { LoginAdminComponent } from './pages/compentes-publicos/form-registro-login/form-login/login.component';
import { RegistroPostulanteComponent } from './pages/compentes-publicos/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import { RegistroEmpleadorComponent } from './pages/compentes-publicos/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import { HeaderComponent } from './pages/compentes-publicos/header-home/header.component';


import { PanelAdminComponent } from './pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
//import { LoginPostulanteComponent } from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/mi-perfil/mi-perfil.component';
import {TareaValiar} from 'src/app/pages/paneles-administracion/panel-admin/tablas-validacion-cuentas/tablas-validar.component';
//import { TareasPendientesComponent } from './pages/paneles-administracion/panel-admin/tabs/tareas/tareas-admin.component';
import {PanelPostulanteComponent} from './pages/paneles-administracion/panel-postulante/nav/navTab-postulante.component';

import { from } from 'rxjs';
import { FormularioInfoPostulanteComponent } from './pages/paneles-administracion/panel-postulante/formulario-info-postulante/formulario-info-postulante.component';
//===================== DATA TABLE ============================//
import { DataTablesModule } from "angular-datatables";
import { FormInfoPostulanteComponent } from './pages/paneles-administracion/panel-admin/form-validacion-postulante/form-validacion-postulante.component';
//empleador
import {NabPanelEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/nav/navTab-empleador.component';
import { FormularioInfoEmpleadorComponent } from './pages/paneles-administracion/panel-empleador/formulario-info-empleador/formulario-info-empleador.component';
import { FormValidacionEmpleadorComponent } from './pages/paneles-administracion/panel-admin/form-validacion-empleador/form-validacion-empleador.component';
//postulante
import {TitulosAcademicosComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/titulos-academicos.component';
import {CursosCapacitacionesComponent} from 'src/app/pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/cursos-capacitaciones.component';
import { FormAddTituloComponent } from './pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/form-add-titulo/form-add-titulo.component';
import { FormEditarTituloComponent } from './pages/paneles-administracion/panel-postulante/hoja-vida/titulos-academicos/form-editar-titulo/form-editar-titulo.component';
import { FormAddCursoComponent } from './pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/form-add-curso/form-add-curso.component';
import { FormEditarCursoComponent } from './pages/paneles-administracion/panel-postulante/hoja-vida/cursos-capacitaciones/form-editar-curso/form-editar-curso.component';
import { OfertaLaboralComponent } from './pages/paneles-administracion/panel-empleador/oferta-laboral/tabla-oferta-laboral/oferta-laboral.component';
import { AddOfertaComponent } from './pages/paneles-administracion/panel-empleador/oferta-laboral/add-oferta/add-oferta.component';
import { EditOfertaComponent } from './pages/paneles-administracion/panel-empleador/oferta-laboral/edit-oferta/edit-oferta.component';
import { TablaValidarOfertasLaboralesComponent } from './pages/paneles-administracion/panel-admin/tabla-validar-ofertas-laborales/tabla-validar-ofertas-laborales.component';
import { FormValidarOfertaLaboralComponent } from './pages/paneles-administracion/panel-admin/form-validar-oferta-laboral/form-validar-oferta-laboral.component';
import { TablaPublicarOfertGestorComponent } from './pages/paneles-administracion/panel-admin/tabla-publicar-ofert-gestor/tabla-publicar-ofert-gestor.component';
import { FormPublicarOfertaGestorComponent } from './pages/paneles-administracion/panel-admin/form-publicar-oferta-gestor/form-publicar-oferta-gestor.component';
import { PostularOfertaLaboralComponent } from './pages/compentes-publicos/ofertas-home/ofertas-laborales.component';
import { PostulanteOfertas } from './pages/paneles-administracion/panel-admin/postulante-ofertas/postulantes-ofertas-encargado.component';
import { PostulantesOfertaComponent } from './pages/paneles-administracion/panel-empleador/oferta-laboral/postulantes-oferta-empleador/postulantes-oferta-empleador.component';
import { VerOfertaLaboralComponent } from './pages/compentes-publicos/ver-oferta-laboral/ver-oferta-laboral.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NavbarComponent } from './pages/compentes-publicos/navbar/navbar.component';
import { OfertasPostuladasComponent } from './pages/paneles-administracion/panel-postulante/ofertas-postuladas/ofertas-postuladas.component';
import { TablaTitulosAcademicosComponent } from './pages/compentes-publicos/tabla-titulos-academicos/tabla-titulos-academicos.component';
import { TablaCursosCapacitacionesComponent } from './pages/compentes-publicos/tabla-cursos-capacitaciones/tabla-cursos-capacitaciones.component';
import { VerHojaVidaComponent } from './pages/compentes-publicos/info-detalles-postulante/info-detalles-postulante.component';
import { TablaEncuestaComponent } from './pages/paneles-administracion/panel-admin/encuesta/tabla-encuesta/tabla-encuesta.component';
import { FormEncuestaComponent } from './pages/paneles-administracion/panel-admin/encuesta/form-encuesta/form-encuesta.component';
import { DemoComponent } from './demo/demo.component';
import { DatePipe } from '@angular/common';
import { TablaUsuariosAdminComponent } from './pages/paneles-administracion/panel-admin/tabla-usuarios-admin/tabla-usuarios-admin.component';
import { RegistarAdminComponent } from './pages/paneles-administracion/panel-admin/form-registar-admin/form-registar-admin.component';
import { FormEditarAdminComponent } from './pages/paneles-administracion/panel-admin/form-editar-admin/form-editar-admin.component';
import { ReporteOfertasComponent } from './pages/paneles-administracion/panel-admin/reportes/reporte-ofertas/reporte-ofertas.component';
// import { Model,Survey,SurveyModel,showModal } from 'survey-jquery'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginAdminComponent,
    HeaderComponent,
    PanelAdminComponent,
    MiPerfilComponent,
    //LoginPostulanteComponent,
    RegistroPostulanteComponent,
    RegistroEmpleadorComponent,
    //LoginEmpleadorComponent,
    PanelPostulanteComponent,
    FormularioInfoPostulanteComponent,
    FormInfoPostulanteComponent,
    TareaValiar,
    NabPanelEmpleador,
    FormularioInfoEmpleadorComponent,
    FormValidacionEmpleadorComponent,
    TitulosAcademicosComponent,
    CursosCapacitacionesComponent,
    FormAddTituloComponent,
    FormEditarTituloComponent,
    FormAddCursoComponent,
    FormEditarCursoComponent,
    OfertaLaboralComponent,
    AddOfertaComponent,
    EditOfertaComponent,
    TablaValidarOfertasLaboralesComponent,
    FormValidarOfertaLaboralComponent,
    TablaPublicarOfertGestorComponent,
    FormPublicarOfertaGestorComponent,
    PostularOfertaLaboralComponent,
    PostulanteOfertas,
    PostulantesOfertaComponent,
    VerOfertaLaboralComponent,
    DomseguroPipe,
    NavbarComponent,
    OfertasPostuladasComponent,
    TablaTitulosAcademicosComponent,
    TablaCursosCapacitacionesComponent,
    VerHojaVidaComponent,
    TablaEncuestaComponent,
    FormEncuestaComponent,
    DemoComponent,
    TablaUsuariosAdminComponent,
    RegistarAdminComponent,
    FormEditarAdminComponent,
    ReporteOfertasComponent,
  ],

  imports: [
    BrowserModule,
    //importo mi moduilo de rutas de app-routing.module
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DATA TABLE
    DataTablesModule


    // Tostadas
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
