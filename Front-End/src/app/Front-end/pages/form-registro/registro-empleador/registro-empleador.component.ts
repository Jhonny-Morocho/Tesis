import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment.prod';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
@Component({
  selector: 'app-registro-empleador',
  templateUrl: './registro-empleador.component.html'
})
export class RegistroEmpleadorComponent implements OnInit {
  usuarioModel:UsuarioModel;
  formEmpleador:FormGroup;
  dominio=environment.dominio
  constructor(private router_:Router,
              private formBuilder:FormBuilder,
              private servicioUsuario_:AutenticacionUserService) {
    this.crearFormulario();
  }

  ngOnInit() {

  }

  // para hacer validacion y activar la clase en css
  get correoNoValido(){
    return this.formEmpleador.get('correo').invalid && this.formEmpleador.get('correo').touched;
  }
  get passwordNoValido(){
    return this.formEmpleador.get('password').invalid && this.formEmpleador.get('password').touched;
  }
  crearFormulario(){
    this.formEmpleador=this.formBuilder.group({
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required,Validators.maxLength(10)]]
    });
  }
  registarEmpleador(){
  // comprobamos si el formulario pao la validacion
  if(this.formEmpleador.invalid){
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: 'error',
      title: 'Debe llenar todos los campos correctamente'
    })
    return Object.values(this.formEmpleador.controls).forEach(contol=>{
      contol.markAsTouched();
    });
    }
  //mensaje de alerta usuario
  Swal({
    allowOutsideClick:false,
    type:'info',
    text:'Espere por favor'
  });
  Swal.showLoading();
  //envio la informacion a mi servicio - consumo el servicio
  this.usuarioModel=new UsuarioModel();
  this.usuarioModel.tipoUsuario=6;
  this.usuarioModel.estado=1;
  this.usuarioModel.correo=this.formEmpleador.value.correo;
  this.usuarioModel.password=this.formEmpleador.value.password;
  this.servicioUsuario_.crearNuevoUsuario(this.usuarioModel).subscribe(
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
          title: 'Su cuenta ha sido creado exitosamente'
        })
        this.servicioUsuario_.guarUsuarioTempLocalSotarage(siHacesBien['mensaje']);
        this.router_.navigateByUrl('/panel-empleador/form-info-empleador');
       }else{
         Swal({
           title:'Información',
           type:'info',
           text:siHacesBien['mensaje']
         });
       }

    },peroSiTenemosErro=>{
      Swal({
        title:'Error',
        type:'error',
        text:peroSiTenemosErro['mensaje']
      });
    });
  }
}
