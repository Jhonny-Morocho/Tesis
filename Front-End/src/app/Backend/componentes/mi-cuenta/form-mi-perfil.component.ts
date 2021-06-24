import { Component, Input, OnInit } from '@angular/core';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-mi-perfil',
  templateUrl: './form-mi-perfil.component.html'
})
export class FormMiPerfilComponent implements OnInit {
  instanciaUsuario:UsuarioModel;
  formUsuario:FormGroup;
  @Input() instanciPerfilUsuario:any={};
  constructor(private servicioUsuario:AutenticacionUserService, private formulario:FormBuilder,) {
    this.crearFormulario();
   }

  ngOnInit() {
    this.servicioUsuario.estaAutenticado();
    this.instanciaUsuario=new UsuarioModel();
    this.cargarDatosFormulario();
  }
   // ==== para hacer validacion y activar la clase en css ====//
  get passwordNoValido(){
    return this.formUsuario.get('password').invalid && this.formUsuario.get('password').touched;
  }
  crearFormulario(){
    this.formUsuario=this.formulario.group({
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
  actualizarCuenta(){
    if(this.formUsuario.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe ingresar una contraseña'
      })
      return Object.values(this.formUsuario.controls).forEach(contol=>{
        contol.markAsTouched();
      });;
    }
    //mensaje de alerta usuario
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //enviamos los daots
    this.instanciaUsuario.correo=this.instanciPerfilUsuario.correo;
    this.instanciaUsuario.password=this.formUsuario.value.password;
    this.servicioUsuario.actualizarPassword(this.instanciaUsuario).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          toast({
            type: 'success',
            title: 'Contraseña actualizada'
          })
        }else{
          Swal({
            title:'info',
            type:'info',
            text:siHacesBien['mensaje']
          });
        }
      },siHacesMal=>{
        Swal({
          title:'Error',
          type:'error',
          text:siHacesMal['mensaje']
        });
      }
    );
  }
  cargarDatosFormulario(){
    //cargo los datos al formulario
    this.formUsuario.reset({
      correo:this.instanciPerfilUsuario.correo
    });
    this.formUsuario.get('correo').disable();
  }
}
