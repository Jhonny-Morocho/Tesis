import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
@Component({
  selector: 'app-login-empleador',
  templateUrl: './login-empleador.component.html'
})
export class LoginEmpleadorComponent implements OnInit {
// Instancio mi modelo
instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor(private servicioUsuario_:AutenticacionUserService,private router_:Router) { }

  ngOnInit() {
  }

  loginEmpleador(formularioEmpleador:NgForm){
    //validar formulario
    if(formularioEmpleador.invalid){
      return;
    }
    Swal({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    //========== ocupo el servicio =============
    this.servicioUsuario_.login(this.instanciaModeloUsuarioLogin).subscribe(
      (siHacesBien)=>{
        console.log(siHacesBien);
        console.log(siHacesBien['Siglas']);
        Swal.close();
        //verifico si encontro el usurio
        if((siHacesBien['Siglas']=="OE")){
          console.log("usuario encontrado");
          //vrificar si es un usuario postulante 6== empleador
          if(siHacesBien['mensaje']['tipoUsuario']===6){
            Swal({
              position: 'center',
              type: 'success',
              title: 'Bienvenido',
              showConfirmButton: false,
              timer: 1500
            })
            this.router_.navigateByUrl('/panel-empleador/mi-perfil');
          }else{
            Swal({
              title:'Error al autenticar',
              type:'error',
              text:"Este usuario no se encuentra registrado como postulante"
            }); 
          }
        }else{
         //usuario no activo o no encontrado
          Swal({
            title:'Error al autenticar',
            type:'error',
            text:"Usuario no encontrado o no activo"
          }); 
        }
        console.log(siHacesBien);
      },peroSiTenemosErro=>{
        console.log(peroSiTenemosErro);
        Swal({
          title:'Error al autenticar',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        }); 
      }
    );
  }

}
