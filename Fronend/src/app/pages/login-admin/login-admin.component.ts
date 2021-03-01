import { Component, OnInit } from '@angular/core';
// importo mi modelo 
import {UsuarioModel} from '../../models/usuario.model';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';
// llamo la libreria de switch alert
import Swal from 'sweetalert2';
//importamos el servicio
import {AutenticacionAdminService} from '../../servicios/autenticacion-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})
export class LoginAdminComponent implements OnInit {
  
  // Instancio mi modelo
  instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor(private _servicioAdmin:AutenticacionAdminService,private router_:Router) { }

  ngOnInit() {
    // los inicializo solo para hacer pruebas despues los descomento
    // this.instanciaModeloUsuarioLogin.correo="jhonnymichaeldj2011@hotmail.com";
    // this.instanciaModeloUsuarioLogin.password="123456";

  }
  // Login del formulario del admistrador
  loginAdmin(formularioAdministrador:NgForm){
    console.log(this.instanciaModeloUsuarioLogin);
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
    
    //========== ocupo el servicio =============
    this._servicioAdmin.login(this.instanciaModeloUsuarioLogin).subscribe(
      (siHacesBien)=>{
        console.log("siHacesBien");
        console.log(siHacesBien);
        console.log(siHacesBien['Siglas']);
        if(siHacesBien['Siglas']=="OE"){
          Swal.close();
          Swal(
            '',
            'Bienvenido',
            'success'
          )
          //guardamos los datos temportalmente
         this.guarUsuarioTempLocalSotarage(siHacesBien['mensaje']);
         //direcciono al panel de admistracion
         this.router_.navigateByUrl('/panel-admin');
        }else{
          Swal({
            title:'Error al autenticar',
            type:'error',
            text:siHacesBien['mensaje']
          }); 
        }
        console.log(siHacesBien);
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        Swal({
          title:'Error al autenticar',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        }); 
      }
    );
  
  }

   guarUsuarioTempLocalSotarage(respuestaBackend:UsuarioModel){
      console.log(respuestaBackend);
      localStorage.setItem('nombe', respuestaBackend.nombre);
      localStorage.setItem('apellido', respuestaBackend.apellido);
      localStorage.setItem('correo', respuestaBackend.correo);
      localStorage.setItem('tipoUsuario', (respuestaBackend.tipoUsuario).toString());
      // la sesion de cierra en 1 hora
       let hoy = new Date();
       hoy.setSeconds( 3600 );
      localStorage.setItem('expira',hoy.getTime().toString());
  }


}
