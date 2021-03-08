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
import { LoginAdminComponent } from './pages/form-registro-login/form-logins/login-admin/login-admin.component';
import { RegistroPostulanteComponent } from './pages/form-registro-login/form-registro/registro-postulante/registro-postulante.component';
import { RegistroEmpleadorComponent } from './pages/form-registro-login/form-registro/registro-empleador/registro-empleador.component';
import { LoginEmpleadorComponent } from './pages/form-registro-login/form-logins/login-empleador/login-empleador.component';
import { NavComponent } from './pages/nav/nav.component';

import { EmpleadorComponent } from './pages/empleador/empleador.component';
import { PanelAdminComponent } from './pages/paneles-administracion/panel-admin/nav/navTab-admin.component';
import { LoginPostulanteComponent } from './pages/form-registro-login/form-logins/login-postulante/login-postulante.component';
import { MiPerfilComponent } from './pages/paneles-administracion/panel-admin/mi-perfil/mi-perfil.component';
import {TareaValiarPostulanteComponent} from 'src/app/pages/paneles-administracion/panel-admin/tareas/validar-postulantes/tareas-validar-postulante.component';
//import { TareasPendientesComponent } from './pages/paneles-administracion/panel-admin/tabs/tareas/tareas-admin.component';
import {PanelPostulanteComponent} from './pages/paneles-administracion/panel-postulante/nav/navTab-postulante.component';
import {MiPerfilPostulanteComponent} from './pages/paneles-administracion/panel-postulante/mi-perfil/mi-perfil.component';
import { from } from 'rxjs';
import { FormularioInfoPostulanteComponent } from './pages/paneles-administracion/panel-postulante/formulario-info-postulante/formulario-info-postulante.component';
//===================== DATA TABLE ============================//
import { DataTablesModule } from "angular-datatables";
import { FormInfoPostulanteComponent } from './pages/paneles-administracion/panel-admin/form-validacion-postulante/form-validacion-postulante.component';
//empleador
import {MiPerfilComponentEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/mi-perfil/mi-perfil.component';
import {NabPanelEmpleador} from 'src/app/pages/paneles-administracion/panel-empleador/nav/navTab-empleador.component';
import { FormularioInfoEmpleadorComponent } from './pages/paneles-administracion/panel-empleador/formulario-info-empleador/formulario-info-empleador.component';
import {TareaValiarEmpleadorComponent} from 'src/app/pages/paneles-administracion/panel-admin/tareas/validar-empleadores/tareas-validar-empleador.component';
import { ValidarEmpleadorComponent } from './pages/paneles-administracion/panel-admin/tareas/validar-empleador/validar-empleador.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginAdminComponent,
    NavComponent,
    EmpleadorComponent,
    PanelAdminComponent,
    MiPerfilComponent,
    LoginPostulanteComponent,
    RegistroPostulanteComponent,
    RegistroEmpleadorComponent,
    LoginEmpleadorComponent,
    PanelPostulanteComponent,
    MiPerfilPostulanteComponent,
    FormularioInfoPostulanteComponent,
    FormInfoPostulanteComponent,
    TareaValiarPostulanteComponent,
    MiPerfilComponentEmpleador,
    NabPanelEmpleador,
    FormularioInfoEmpleadorComponent,
    TareaValiarEmpleadorComponent,
    ValidarEmpleadorComponent
  ],
  imports: [
    BrowserModule,
    //importo mi moduilo de rutas de app-routing.module
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DATA TABLE
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
