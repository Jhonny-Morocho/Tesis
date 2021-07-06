import { Component, OnInit } from '@angular/core';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UsuarioModel} from '../../../../models/usuario.model';
import Swal from 'sweetalert2';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';
import {environment} from 'src/environments/environment';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
declare var $:any;
@Component({
  selector: 'navTab-empleador',
  templateUrl: './navTab-empleador.component.html'
})
export class NabPanelEmpleador implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  dominio=environment;
  estadoValidacion:boolean;
  //puede visualizar la opcion de ofertas laborale cuandoe ste validado
  constructor(private _router:Router,
            private servicioEmpleador:SerivicioEmpleadorService,
            private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {

  this.comprobarLogin();
  this.empleadorValidadoForm();

  }


   comprobarLogin(){
    if(localStorage.getItem('correo')){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
      }else{
       // no existe session por lo cual debo direccionar al inicio
     }
   }
   empleadorValidadoForm(){
    this.servicioEmpleador.listarFormEmpleador().subscribe(
      siHacesBien=>{
        if(siHacesBien['mensaje']['estado']==1){
          this.estadoValidacion=true;
        }else{
          this.estadoValidacion=false;
        }
      },siHaceMal=>{
        Swal('Error', siHaceMal['mensaje'], 'error');

      }
    );
   }
  salirSession(){
    // ocupo el servicio
    Swal({
      title: '¿Está seguro?',
      text: "Desea cerrar su sesión",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.servicioUsuario.cerrarSession();
        this._router.navigateByUrl('/home');
      }
    })
  }

}
