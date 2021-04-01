import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importo mi archivo de rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './pages/home/home.component';

// vamos a importar la clase de modulos para poder opcuar el ngmodel en los formulkario
// modulos siempre van en los import
import {FormsModule} from '@angular/forms';
// para hacer soliuctudes http necestio el siguiente moduo
import {HttpClientModule} from '@angular/common/http';
import { LoginAdminComponent } from './pages/form-registro-login/form-logins/login-admin/login.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import { RegistroEmpleadorComponent } from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
//import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import { HeaderComponent } from './pages/header-home/header.component';


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
import { PostularOfertaLaboralComponent } from './pages/ofertas-postululadas/ofertas-laborales.component';
import { TablaFiltroPostulantesComponent } from './pages/paneles-administracion/panel-admin/tabla-filtro-postulantes/tabla-filtro-postulantes.component';
import { TemplateHojaVidaComponent } from './pages/paneles-administracion/template-hoja-vida/template-hoja-vida.component';
import { PostulantesOfertaComponent } from './pages/paneles-administracion/panel-empleador/oferta-laboral/postulantes-oferta/postulantes-oferta.component';
//============================== Visor PDF ===========

//cursos-capacitacines
//import { ModalModule } from 'ngx-bootstrap/modal';

// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    TablaFiltroPostulantesComponent,
    TemplateHojaVidaComponent,
    PostulantesOfertaComponent
  ],

  imports: [
    BrowserModule,
    //importo mi moduilo de rutas de app-routing.module
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DATA TABLE
    DataTablesModule,


    // Tostadas
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
