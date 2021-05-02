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
declare var $:any;
import{environment} from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginAdminComponent implements OnInit {

  // Instancio mi modelo
  dominio=environment.dominio;
  instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor(private _servicioAdmin:AutenticacionUserService,
    private router:Router) { }

  ngOnInit() {
  }
  recuperarPassword(){

    Swal({
      title: 'Recuperar mi contraseña',
      text: "Se enviara una nueva contraseña temporal a su correo",
      input: 'email',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.value) {
        Swal({
          allowOutsideClick: false,
          type: 'info',
          text: 'Espere por favor...'
        });
        Swal.showLoading();
        this.instanciaModeloUsuarioLogin.correo=result.value;
        this._servicioAdmin.recuperarPassword(this.instanciaModeloUsuarioLogin).subscribe(
           siHaceBien=>{
             console.log(siHaceBien);
             if (siHaceBien['Siglas']=="OE") {
                Swal('Contraseña actualizada','Se ha enviado la nueva contraseña a su correo','success')
             }else{
                Swal('No se pudo actualizar su contraseña',siHaceBien['mensaje'],'info')
             }
           },siHaceMal=>{
            Swal('ERROR',siHaceMal['error'],'error')
           }
         );
      }
    })
  }
  // Login del formulario del admistrador
  loginAdmin(formularioAdministrador:NgForm){
    console.log(this.instanciaModeloUsuarioLogin);
    console.log(formularioAdministrador);
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

          this._servicioAdmin.guarUsuarioTempLocalSotarage(siHacesBien['mensaje']);
          switch (parseInt(siHacesBien['mensaje']['tipoUsuario'])) {
            //secretaria
            case 3:
              this.router.navigateByUrl('/panel-admin/mi-perfil');
              break;
            //empleador
            case 6:
              this.router.navigateByUrl('/panel-empleador/mi-perfil');
              break;
            //postulante
            case 2:
              this.router.navigateByUrl('/panel-postulante/mi-perfil');
              break;
            case 5:
              this.router.navigateByUrl('/panel-admin/mi-perfil');
              break;
            case 4:
              this.router.navigateByUrl('/panel-admin/mi-perfil');
              //this.router.navigateByUrl('/panel-admin/mi-perfil');
              break;
            default:
              break;
          }

        }else{
            Swal({
              title:'Atención',
              type:'info',
              text:siHacesBien['mensaje']
            });
        }
        console.log("pase al url");
        console.log(siHacesBien);
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        Swal({
          title:'Error',
          type:'error',
          text:peroSiTenemosErro['error']
        });
      }
    );
  }

}

