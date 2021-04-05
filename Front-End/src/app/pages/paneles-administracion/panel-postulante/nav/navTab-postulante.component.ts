import { Component, OnInit } from '@angular/core';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment';
import { UsuarioModel } from 'src/app/models/usuario.model';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'navTab-postulante',
  templateUrl: './navTab-postulante.component.html'
})
export class PanelPostulanteComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  domininio=environment;
  estadoValidacionForm=false;
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
        console.log(sihacesBien);
        if(sihacesBien['Siglas']=="OE" && parseInt(sihacesBien['mensaje']['estado'])==1){
          this.estadoValidacionForm=true;
        }
      },siHacesMal=>{
        
      }

    );
  }
  comprobarSession(){
    if(localStorage.getItem('correo')){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
      
    }else{
     // no existe session por lo cual debo direccionar al inicio
    }
  }
  salirSession(){
    // ocupo el servicio
    Swal({
      title: '¿ Está seguro?',
      text: "La sesión se cerrará",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.servicioUsuario.cerrarSession();
        this._router.navigateByUrl('/home');
      }
    })
  }

}
