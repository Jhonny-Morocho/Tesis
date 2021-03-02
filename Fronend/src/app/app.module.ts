import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importo mi archivo de rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
// vamos a importar la clase de modulos para poder opcuar el ngmodel en los formulkario
// modulos siempre van en los import
import {FormsModule} from '@angular/forms';
// para hacer soliuctudes http necestio el siguiente moduo
import {HttpClientModule} from '@angular/common/http';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { NavComponent } from './pages/nav/nav.component';
import { PostulanteComponent } from './pages/panel-postulante/postulante.component';
import { EmpleadorComponent } from './pages/empleador/empleador.component';
import { PanelAdminComponent } from './pages/panel-admin/nav/navTab-admin.component';
import { LoginPostulanteComponent } from './pages/login-postulante/login-postulante.component';
import { MiPerfilComponent } from './pages/panel-admin/tabs/mi-perfil/mi-perfil.component';
import { TareasPendientesComponent } from './pages/panel-admin/tabs/tareas-pendientes/tareas-pendientes.component';
import { TareasRealizadasComponent } from './pages/panel-admin/tabs/tareas-realizadas/tareas-realizadas.component';
import { RegistroPostulanteComponent } from './pages/registro-postulante/registro-postulante.component';
import { RegistroEmpleadorComponent } from './pages/registro-empleador/registro-empleador.component';
import { LoginEmpleadorComponent } from './pages/login-empleador/login-empleador.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    LoginAdminComponent,
    NavComponent,
    PostulanteComponent,
    EmpleadorComponent,
    PanelAdminComponent,
    MiPerfilComponent,
    TareasPendientesComponent,
    TareasRealizadasComponent,
    LoginPostulanteComponent,
    RegistroPostulanteComponent,
    RegistroEmpleadorComponent,
    LoginEmpleadorComponent
  ],
  imports: [
    BrowserModule,
    //importo mi moduilo de rutas de app-routing.module
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }