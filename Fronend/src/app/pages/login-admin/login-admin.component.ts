import { Component, OnInit } from '@angular/core';
// importo mi modelo 
import {UsuarioModel} from '../../models/usuario.model';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';
// llamo la libreria de switch alert
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})
export class LoginAdminComponent implements OnInit {
  
  // Instancio mi modelo
  instanciaModeloUsuario:UsuarioModel=new UsuarioModel;
  constructor() { }

  ngOnInit() {
    // los inicializo solo para hacer pruebas despues los descomento
    this.instanciaModeloUsuario.correo="jhonnymichaeldj2011@hotmail.com";
    this.instanciaModeloUsuario.password="123456";

  }
  // Login del formulario del admistrador
  loginAdmin(formularioAdministrador:NgForm){
    console.log(this.instanciaModeloUsuario);
    //console.log(formularioAdministrador);
    if(formularioAdministrador.invalid){
      return;
    }
    // si pasa la validacion se ejecuta el siguiente codigo
    // mensaje de espera 
    Swal({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    // ejeucutamos el servicio y la promesa
    
  }
}
