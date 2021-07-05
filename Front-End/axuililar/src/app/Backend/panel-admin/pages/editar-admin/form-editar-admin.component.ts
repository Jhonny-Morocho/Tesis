import { Component, OnInit } from '@angular/core';
import {DocenteModel} from 'src/app/models/docente.models';
import {SerivicioDocente} from 'src/app/servicios/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-editar-admin',
  templateUrl: './form-editar-admin.component.html'
})
export class FormEditarAdminComponent implements OnInit {
  instanciaDocente:DocenteModel;
  external_usuario:string;
  formAdmin:FormGroup;
  estadoAcestadoUsuariotivo:boolean=true;
  constructor(private servicioDocente:SerivicioDocente,
              private formBuilder:FormBuilder,
              private servicioRouter:Router,
              private activateRotue:ActivatedRoute) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.instanciaDocente=new DocenteModel();
    this.cargarFormularioDocente();
    //responsibo
    $("body").removeClass("sidebar-open");
  }

  crearFormulario(){
    this.formAdmin=this.formBuilder.group({
      nombre:['',[Validators.required,Validators.maxLength(20)]],
      apellido:['',[Validators.required,Validators.maxLength(20)]],
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.maxLength(10)]],
      tipoUsuario:['',[Validators.required]]
    });
  }
  cargarFormularioDocente(){
    this.activateRotue.params.subscribe(params=> this.external_usuario=params['external_us']);
    this.servicioDocente.obtenerDocenteExternal_us(this.external_usuario).subscribe(
      siHacesBien=>{
        if(siHacesBien['Siglas']=='OE'){
          this.instanciaDocente.nombre=siHacesBien['mensaje']['nombre'];
          this.instanciaDocente.apellido=siHacesBien['mensaje']['apellido'];
          this.instanciaDocente.correo=siHacesBien['mensaje']['correo'];
          this.instanciaDocente.tipoUsuario=siHacesBien['mensaje']['tipoUsuario'];
          this.instanciaDocente.estado=siHacesBien['mensaje']['estado'];
          this.instanciaDocente.password="";
          //cargar los datos en el formulario
          this.formAdmin.reset({
            nombre:this.instanciaDocente.nombre,
            apellido:this.instanciaDocente.apellido,
            correo:this.instanciaDocente.correo,
            password:this.instanciaDocente.password,
            tipoUsuario:this.instanciaDocente.tipoUsuario
          });

        }else{
          Swal('Info',siHacesBien['mensaje'], 'info');
        }
      },siHaceMal=>{
        Swal('Error',siHaceMal['mensaje'], 'error');
      }
    );
  }
  onSubmitEditarAdmin(){
    if(this.formAdmin.invalid){
      return Object.values(this.formAdmin.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    //envios los datos ya validados
    this.instanciaDocente.nombre=this.formAdmin.value.nombre;
    this.instanciaDocente.apellido=this.formAdmin.value.apellido;
    this.instanciaDocente.correo=this.formAdmin.value.correo;
    this.instanciaDocente.password=this.formAdmin.value.password;
    this.instanciaDocente.tipoUsuario=this.formAdmin.value.tipoUsuario;
    Swal.showLoading();
    //this.instanciaDocente.estado=1;
    this.servicioDocente.actulizarDatosDocente(this.instanciaDocente,this.external_usuario).subscribe(
      siHacesBien=>{
        if(siHacesBien['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
          toast({
            type: 'success',
            title: 'Actualizado'
          })
          this.servicioRouter.navigateByUrl('/panel-admin/gestionar-usuarios-admin');
        }else{
          Swal({title:'Error',type:'error',text:siHacesBien['mensaje']});
        }
      },siHacesMal=>{
        Swal('Error',siHacesMal['mensaje'], 'error');
      }
    );
  }
  estadoOferta(){
    if(this.instanciaDocente.estado==1){
      return true;
    }
    if(this.instanciaDocente.estado==0){
      return false;
    }
  }
  onChangeOferta(event){
    if(event==true){
      this.instanciaDocente.estado=1;
    }
    if(event==false){
      this.instanciaDocente.estado=0;
    }
  }
  get nomNoValido(){
    return this.formAdmin.get('nombre').invalid && this.formAdmin.get('nombre').touched ;
  }
  get apellidoNoValido(){
    return this.formAdmin.get('apellido').invalid && this.formAdmin.get('apellido').touched ;
  }

  get correoNoValido(){
    return this.formAdmin.get('correo').invalid && this.formAdmin.get('correo').touched ;
  }
  get correoVacio(){
    return this.formAdmin.get('correo').value ;
  }

  get passwordNoValido(){
    return this.formAdmin.get('password').invalid && this.formAdmin.get('password').touched ;
  }
  get passwordVacio(){
    return this.formAdmin.get('password').value ;
  }


  get tipoUsuarioNoValido(){
    return this.formAdmin.get('tipoUsuario').invalid && this.formAdmin.get('tipoUsuario').touched  ;
  }
}
