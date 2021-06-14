import { Component, Input, OnInit } from '@angular/core';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-mi-perfil',
  templateUrl: './form-mi-perfil.component.html'
})
export class FormMiPerfilComponent implements OnInit {
  instanciaUsuario:UsuarioModel;
  @Input() instanciPerfilUsuario:any={};
  constructor(private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {
    this.instanciaUsuario=new UsuarioModel();
    this.instanciaUsuario.correo=this.instanciPerfilUsuario.correo;
    console.log(this.instanciPerfilUsuario);
  }
  actualizarCuenta(formulario:NgForm){
    console.log(formulario);
    if(formulario.invalid){
      return;
    }
    //mensaje de alerta usuario
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.servicioUsuario.actualizarPassword(this.instanciaUsuario).subscribe(
      siHacesBien=>{
        //console.log(siHacesBien);
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal({
            position: 'center',
            type: 'success',
            title: siHacesBien['mensaje'],
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal({
            title:'Error, no se puede ejecutar su peticion',
            type:'error',
            text:siHacesBien['mensaje']
          });
        }
      },siHacesMal=>{
        console.warn(siHacesMal);
      }
    );
  }
}
