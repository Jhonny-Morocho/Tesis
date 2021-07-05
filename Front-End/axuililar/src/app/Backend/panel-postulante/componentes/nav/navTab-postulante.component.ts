import { Component, OnInit } from '@angular/core';
// importa utomaticamente el ingForm
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment';
import { UsuarioModel } from 'src/app/models/usuario.model';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';
declare var $:any;
@Component({
  selector: 'navTab-postulante',
  templateUrl: './navTab-postulante.component.html'
})
export class PanelPostulanteComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  domininio=environment;
  estadoValidacionForm:boolean;
  constructor(private _router:Router,
              private servicioEstudiante:SerivicioPostulanteService,
    private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {
    this.comprobarSession();
    this.comprobarPostulanteFormValidado();
  }

  // si el postulante esta su formulario validado tiene accesso a las ofertas laborales y a llenar su hoja de vida
  comprobarPostulanteFormValidado(){
    //obtener el external_usuario
    this.servicioEstudiante.listarFormPostulante().subscribe(
      sihacesBien=>{
        if(sihacesBien['Siglas']=="OE" && parseInt(sihacesBien['mensaje']['estado'])==1){
          this.estadoValidacionForm=true;
        }else{
          this.estadoValidacionForm=false;
        }
      },siHacesMal=>{
        Swal('Error',siHacesMal['mensaje'], 'error');
      }

    );
  }
  comprobarSession(){
    if(this.servicioUsuario.estaAutenticado()==true){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
    }else{
     // no existe session por lo cual debo direccionar al inicio
    }
  }

}
