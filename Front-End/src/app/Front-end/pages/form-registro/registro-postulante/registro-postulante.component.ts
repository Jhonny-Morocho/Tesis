import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UsuarioModel} from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment.prod';

@Component({
  selector: 'app-registro-postulante',
  templateUrl: './registro-postulante.component.html'
})
export class RegistroPostulanteComponent implements OnInit {
  dominio=environment.dominio;
  //creo una referencia la formulario
  formRegistroPostulante:FormGroup;

  constructor(private servicioUsuario_:AutenticacionUserService,
              private router_:Router,private formulario:FormBuilder) { }
  usuarioModel:UsuarioModel;

  ngOnInit() {
    this.usuarioModel=new UsuarioModel();
    this.crearFormulario();
  }
  // para hacer validacion y activar la clase en css
  get correoNoValido(){
    return this.formRegistroPostulante.get('correo').invalid && this.formRegistroPostulante.get('correo').touched;
  }
  get passwordNoValido(){
    return this.formRegistroPostulante.get('password').invalid && this.formRegistroPostulante.get('password').touched;
  }
  crearFormulario(){
    this.formRegistroPostulante=this.formulario.group({
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required,Validators.maxLength(10)]]
    });
  }
  registroPostulante(){
    // comprobamos si el formulario pao la validacion
    if(this.formRegistroPostulante.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe completar todos los campos'
      })
      toast({
        type: 'error',
        title: 'Debe llenar todos los campos correctamente'
      })
      return Object.values(this.formRegistroPostulante.controls).forEach(contol=>{
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
  this.usuarioModel.correo=this.formRegistroPostulante.value.correo;
  this.usuarioModel.password=this.formRegistroPostulante.value.password;
  this.usuarioModel.tipoUsuario=2;
  this.usuarioModel.estado=1;
  this.servicioUsuario_.crearNuevoUsuario(this.usuarioModel).subscribe(
    siHacesBien=>{
      Swal.close();
      if(siHacesBien['Siglas']=="OE"){
        const toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000
        });
        toast({
          type: 'success',
          title: 'Su cuenta ha sido creado exitosamente'
        })
        this.servicioUsuario_.guarUsuarioTempLocalSotarage(siHacesBien['mensaje']);
        this.router_.navigateByUrl('/panel-postulante/form-info-postulante');
      }else{
        Swal({
          title:'Información',
          type:'info',
          text:siHacesBien['mensaje']
        });
      }

    },peroSiTenemosErro=>{
      console.log(peroSiTenemosErro);
      Swal({
        title:'Error',
        type:'error',
        text:peroSiTenemosErro['mensaje']
      });
  });
  }
}
