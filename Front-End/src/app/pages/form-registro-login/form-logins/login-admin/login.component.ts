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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginAdminComponent implements OnInit {
  
  // Instancio mi modelo
  instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor(private _servicioAdmin:AutenticacionUserService,private router:Router) { }

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

          this._servicioAdmin.guarUsuarioTempLocalSotarage(siHacesBien['mensaje']);
          switch (parseInt(siHacesBien['mensaje']['tipoUsuario'])) {
            case 3:
              this.router.navigateByUrl('/panel-admin/mi-perfil');
              break;
            case 6:
              this.router.navigateByUrl('/panel-empleador/form-info-empleador');
              break;
            case 2:
              this.router.navigateByUrl('/panel-postulante/form-info-postulante');
              console.log("llegue xxx");
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
          title:'Error al autenticar',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        }); 
      }
    );
  }
  
}

