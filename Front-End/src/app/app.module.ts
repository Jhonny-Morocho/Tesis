import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importo mi archivo de rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from 'src/app/Front-end/pages/home/home.component';

// vamos a importar la clase de modulos para poder opcuar el ngmodel en los formulkario
// modulos siempre van en los import
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginAdminComponent } from 'src/app/Front-end/pages/form-login/login.component';
import { RegistroPostulanteComponent } from 'src/app/Front-end/pages/form-registro/registro-postulante/registro-postulante.component';
import { RegistroEmpleadorComponent } from 'src/app/Front-end/pages/form-registro/registro-empleador/registro-empleador.component';
import { HeaderComponent } from 'src/app/Front-end/componentes/header-home/header.component';

import {PanelAdminComponent} from 'src/app/Backend/panel-admin/componentes/nav/navTab-admin.component';
import { MiPerfilComponent } from 'src/app/Backend/panel-admin/pages/mi-perfil-admin/mi-perfil-admin.component';
import {TareaValiar} from 'src/app/Backend/panel-admin/pages/tablas-validacion-cuentas/tablas-validar.component';
import {PanelPostulanteComponent} from 'src/app/Backend/panel-postulante/componentes/nav/navTab-postulante.component';

import { from } from 'rxjs';
import {FormularioInfoPostulanteComponent} from 'src/app/Backend/panel-postulante/pages/registro-postulante/formulario-info-postulante.component';
//===================== DATA TABLE ============================//
import { DataTablesModule } from "angular-datatables";
import {FormInfoPostulanteComponent} from 'src/app/Backend/panel-admin/pages/validacion-postulante/form-validacion-postulante.component';
//empleador
import {NabPanelEmpleador} from 'src/app/Backend/panel-empleador/componentes/nav/navTab-empleador.component';
import { FormularioInfoEmpleadorComponent } from 'src/app/Backend/panel-empleador/pages/formulario-info-empleador/formulario-info-empleador.component';
import {FormValidacionEmpleadorComponent} from 'src/app/Backend/panel-admin/pages/validacion-empleador/form-validacion-empleador.component';
//postulante
import {TitulosAcademicosComponent} from 'src/app/Backend/panel-postulante/pages/titulos-academicos/titulos-academicos.component';
import {CursosCapacitacionesComponent} from 'src/app/Backend/panel-postulante/pages/cursos-capacitaciones/cursos-capacitaciones.component';
import { FormAddTituloComponent } from 'src/app/Backend/panel-postulante/pages/titulos-academicos/form-add-titulo/form-add-titulo.component';
import { FormEditarTituloComponent } from 'src/app/Backend/panel-postulante/pages/titulos-academicos/form-editar-titulo/form-editar-titulo.component';
import { FormAddCursoComponent } from 'src/app/Backend/panel-postulante/pages/cursos-capacitaciones/form-add-curso/form-add-curso.component';
import { FormEditarCursoComponent } from 'src/app/Backend/panel-postulante/pages/cursos-capacitaciones/form-editar-curso/form-editar-curso.component';
import { OfertaLaboralComponent } from 'src/app/Backend/panel-empleador/pages/oferta-laboral/tabla-oferta-laboral/oferta-laboral.component';
import { AddOfertaComponent } from 'src/app/Backend/panel-empleador/pages/oferta-laboral/add-oferta/add-oferta.component';
import { EditOfertaComponent } from 'src/app/Backend/panel-empleador/pages/oferta-laboral/edit-oferta/edit-oferta.component';
import {TablaValidarOfertasLaboralesComponent} from 'src/app/Backend/panel-admin/pages/tabla-validar-ofertas-laborales/tabla-validar-ofertas-laborales.component';
import { FormValidarOfertaLaboralComponent } from 'src/app/Backend/panel-admin/pages/validar-oferta-laboral/form-validar-oferta-laboral.component';
import { TablaPublicarOfertGestorComponent } from 'src/app/Backend/panel-admin/pages/tabla-publicar-ofert-gestor/tabla-publicar-ofert-gestor.component';
import { FormPublicarOfertaGestorComponent } from 'src/app/Backend/panel-admin/pages/publicar-oferta-gestor/form-publicar-oferta-gestor.component';
import {PostulanteOfertas} from 'src/app/Backend/panel-admin/pages/postulante-ofertas/postulantes-ofertas-encargado.component';
//FRONT END
import {PostularOfertaLaboralComponent} from 'src/app/Front-end/componentes/ofertas-home/ofertas-laborales.component';
import { PostulantesOfertaComponent } from 'src/app/Backend/panel-empleador/pages/oferta-laboral/postulantes-oferta-empleador/postulantes-oferta-empleador';
import {VerOfertaLaboralComponent} from 'src/app/Front-end/componentes/ver-oferta-laboral/ver-oferta-laboral.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import {NavbarComponent} from 'src/app/Backend/componentes/navbar/navbar.component';
import { OfertasPostuladasComponent } from 'src/app/Backend/panel-postulante/pages/ofertas-postuladas/ofertas-postuladas.component';
import {TablaTitulosAcademicosComponent} from 'src/app/Front-end/tabla-titulos-academicos/tabla-titulos-academicos.component';
import { TablaCursosCapacitacionesComponent } from 'src/app/Front-end/tabla-cursos-capacitaciones/tabla-cursos-capacitaciones.component';
import { VerHojaVidaComponent } from 'src/app/Front-end/info-detalles-postulante/info-detalles-postulante.component';
import { DatePipe } from '@angular/common';
import { TablaUsuariosAdminComponent } from 'src/app/Backend/panel-admin/pages/tabla-usuarios-admin/tabla-usuarios-admin.component';
import { RegistarAdminComponent } from 'src/app/Backend/panel-admin/pages/registar-admin/form-registar-admin.component';
import { FormEditarAdminComponent } from 'src/app/Backend/panel-admin/pages/editar-admin/form-editar-admin.component';
import {ReporteOfertasComponent} from 'src/app/Backend/panel-admin/pages/reporte-ofertas/reporte-ofertas.component';
import {BrandLogoPanelComponent} from 'src/app/Backend/componentes/brand-logo-panel/brand-logo-panel.component';
import {ReactivarOfertaComponent} from 'src/app/Front-end/pages/reactivar-oferta/reactivar-oferta.component';
import { FormMiPerfilComponent } from 'src/app/Backend/componentes/mi-cuenta/form-mi-perfil.component';
import { MiPerfilPostulanteComponent } from 'src/app/Backend/panel-postulante/pages/mi-perfil-postulante/mi-perfil-postulante.component';
import { MiPerfilEmpleadorComponent } from 'src/app/Backend/panel-empleador/pages/mi-perfil-empleador/mi-perfil-empleador.component';
import { RatingModule } from 'ng-starrating';
import { FooterComponent } from './Backend/componentes/footer/footer.component';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginAdminComponent,
    HeaderComponent,
    PanelAdminComponent,
    MiPerfilComponent,
    RegistroPostulanteComponent,
    RegistroEmpleadorComponent,
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
    TablaUsuariosAdminComponent,
    RegistarAdminComponent,
    FormEditarAdminComponent,
    ReporteOfertasComponent,
    BrandLogoPanelComponent,
    ReactivarOfertaComponent,
    FormMiPerfilComponent,
    MiPerfilPostulanteComponent,
    MiPerfilEmpleadorComponent,
    FooterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DATA TABLE
    DataTablesModule,
    RatingModule,
    //FORM REACTIVOS
    ReactiveFormsModule,
    UiSwitchModule.forRoot({
      size: 'large',
      color: 'rgb(0, 189, 99)',
      switchColor: '#fff',
      defaultBgColor: '#f20707',
      defaultBoColor : '#000',
      checkedLabel: 'Aprobado',
      uncheckedLabel: 'No aprobado'
    })
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
