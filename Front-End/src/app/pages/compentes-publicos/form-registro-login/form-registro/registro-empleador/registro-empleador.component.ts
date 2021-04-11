import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
@Component({
  selector: 'app-registro-empleador',
  templateUrl: './registro-empleador.component.html'
})
export class RegistroEmpleadorComponent implements OnInit {
  constructor(private router_:Router,private servicioUsuario_:AutenticacionUserService) { }
  usuarioModel:UsuarioModel;

  ngOnInit() {
    this.usuarioModel=new UsuarioModel();
    this.usuarioModel.correo="";
    this.usuarioModel.password="";
    //empleador es tipo de usuario 6
    this.usuarioModel.tipoUsuario=6;
    //estado del usuario activo
    this.usuarioModel.estado=1;
  }
  onSubmitRegistroEmpleador(formularioRegistroEmpleador:NgForm){
    console.log(formularioRegistroEmpleador);
    // comprobamos si el formulario pao la validacion 
    if(formularioRegistroEmpleador.invalid){
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
        console.log("direccional al panel");
        this.router_.navigateByUrl('/panel-empleador/form-info-empleador');
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
