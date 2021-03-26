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
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginAdminComponent implements OnInit {
  
  // Instancio mi modelo
  instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor(private _servicioAdmin:AutenticacionUserService,private router:Router) { }

  ngOnInit() {
   
   // this.toastr.success('Hello world!', 'Toastr fun!');
  }
  showSuccess() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
    // this.toastrService.error('everything is broken', 'Major Error', {
    //   timeOut: 3000,
    // });
  }
  tostadaBienvenido(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Bienvenido'
    })
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
          this.tostadaBienvenido();
          this._servicioAdmin.guarUsuarioTempLocalSotarage(siHacesBien['mensaje']);
          switch (siHacesBien['mensaje']['tipoUsuario']) {
            case 3:
              this.router.navigateByUrl('/panel-admin/mi-perfil');

              break;
            case 6:
              this.router.navigateByUrl('/panel-empleador/mi-perfil');
              //this.router.navigateByUrl('/panel-admin/mi-perfil');
              break;
            case 2:
              this.router.navigateByUrl('/panel-postulante/mi-perfil');
            case 5:
              this.router.navigateByUrl('/panel-admin/mi-perfil');
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
        // Swal({
        //   title:'Error al autenticar',
        //   type:'error',
        //   text:peroSiTenemosErro['mensaje']
        // }); 
      }
    );
  }

}

