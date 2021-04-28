import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UsuarioModel} from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment.prod';

@Component({
  selector: 'app-registro-postulante',
  templateUrl: './registro-postulante.component.html'
})
export class RegistroPostulanteComponent implements OnInit {
  dominio=environment.dominio;
  constructor(private servicioUsuario_:AutenticacionUserService,
              private router_:Router) { }
  usuarioModel:UsuarioModel;

  ngOnInit() {
    this.usuarioModel=new UsuarioModel();
    //  this.usuarioModel.correo="jhonny@hotmail.com";
    //  this.usuarioModel.password="123456";
     this.usuarioModel.tipoUsuario=2;
     this.usuarioModel.estado=1;
  }

  onSubMitRegistroPostulante(formularioRegistroPostulante:NgForm){
    console.log("POSTULANTE REGISTRO ON");
    console.log(formularioRegistroPostulante);
    // comprobamos si el formulario pao la validacion
    if(formularioRegistroPostulante.invalid){
      return;
      }
    //mensaje de alerta usuario
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
  //envio la informacion a mi servicio - consumo el servicio

  this.servicioUsuario_.crearNuevoUsuario(this.usuarioModel).subscribe(
    siHacesBien=>{
      console.log(siHacesBien);
      console.log(siHacesBien['Siglas']);
      Swal.close();
      if(siHacesBien['Siglas']=="OE"){
        Swal({
          position: 'center',
          type: 'success',
          title: 'Su cuenta ha sido creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })

        this.router_.navigateByUrl('/panel-postulante/form-info-postulante');
      }else{
        Swal({
          title:'Error, no se puede ejecutar su peticion',
          type:'error',
          text:siHacesBien['mensaje']
        });
      }

    },peroSiTenemosErro=>{
      console.log(peroSiTenemosErro);
      Swal({
        title:'Error, el usuario ya existe',
        type:'error',
        text:peroSiTenemosErro['mensaje']
      });
  });
  }
}
