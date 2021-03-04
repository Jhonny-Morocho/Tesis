import { Component, OnInit } from '@angular/core';
// importo mi modelo 
import {UsuarioModel} from '../../../../models/usuario.model';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';
// llamo la libreria de switch alert
import Swal from 'sweetalert2';
//importamos el servicio
import {AutenticacionUserService} from '../../../../servicios/autenticacion-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})
export class LoginAdminComponent implements OnInit {
  
  // Instancio mi modelo
  instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor(private _servicioAdmin:AutenticacionUserService,private router_:Router) { }

  ngOnInit() {

  }
  // Login del formulario del admistrador
  loginAdmin(formularioAdministrador:NgForm){
    console.log(this.instanciaModeloUsuarioLogin);
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
        Swal.close();
        //verifico si encontro el usurio
        if(siHacesBien['Siglas']=="OE"){
          //vrificar si es un usuario postulante 2== postulante
          if(siHacesBien['mensaje']['tipoUsuario']===3){
            Swal({
              position: 'center',
              type: 'success',
              title: 'Bienvenido',
              showConfirmButton: false,
              timer: 1500
            })
            this.router_.navigateByUrl('/panel-admin/mi-perfil');
          }else{
            Swal({
              title:'Error al autenticar',
              type:'error',
              text:"Este usuario no se encuentra registrado como Administrador"
            }); 
          }
          console.log("pase al url");
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

}

