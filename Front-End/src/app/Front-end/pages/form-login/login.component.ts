import { Component, OnInit } from '@angular/core';
// importo mi modelo
import {UsuarioModel} from '../../../models/usuario.model';
// importa utomaticamente el ingForm
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// llamo la libreria de switch alert
import Swal from 'sweetalert2';
//importamos el servicio
import {AutenticacionUserService} from '../../../servicios/autenticacion-usuario.service';
import { Router } from '@angular/router';
declare var $:any;
import{environment} from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginAdminComponent implements OnInit {
  //trabajos con formularios reactivos
  //creo una referencia
  formLogin:FormGroup;

  // Instancio mi modelo
  dominio=environment.dominio;
  instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;

  constructor(private _servicioAdmin:AutenticacionUserService,
    private router:Router,private formulario:FormBuilder) {
    this.crearFormulario();

    }

  ngOnInit() {
  }
  // para hacer validacion y activar la clase en css
  get correoNoValido(){
    return this.formLogin.get('correo').invalid && this.formLogin.get('correo').touched;
  }
  get correoVacio(){
    return this.formLogin.get('correo').value;
  }
  get passwordNoValido(){
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }
  get passwordVacio(){
    return this.formLogin.get('password').value;
  }

  crearFormulario(){
    this.formLogin=this.formulario.group({
      correo:['',
                  [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')

                  ]
              ],
      password:['',
                   [
                      Validators.required,
                      Validators.maxLength(10)
                   ]
               ]
    });
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
  loginAdmin(){
    if(this.formLogin.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe completar todos los campos correctamente'
      })
      return Object.values(this.formLogin.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
    //envios los datos ya validados
    this.instanciaModeloUsuarioLogin.correo=this.formLogin.value.correo;
    this.instanciaModeloUsuarioLogin.password=this.formLogin.value.password;

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
        Swal.close();
        //verifico si encontro el usurio
        if(siHacesBien['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          toast({
            type: 'success',
            title: 'Bienvenido'
          })

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

      },(peroSiTenemosErro)=>{
        Swal({
          title:'Error',
          type:'error',
          text:peroSiTenemosErro['error']
        });
      }
    );
  }

}

