import { Component, OnInit } from '@angular/core';
import {DocenteModel} from 'src/app/models/docente.models';
import {SerivicioDocente} from 'src/app/servicios/docente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form-editar-admin',
  templateUrl: './form-editar-admin.component.html'
})
export class FormEditarAdminComponent implements OnInit {
  instanciaDocente:DocenteModel;
  external_usuario:string;
  estadoAcestadoUsuariotivo:boolean=true;
  constructor(private servicioDocente:SerivicioDocente,
              private activateRotue:ActivatedRoute) { }

  ngOnInit() {
    this.instanciaDocente=new DocenteModel();
    this.cargarFormularioDocente();
  }
  estadoUsuarioAdmin(estado:Number){
    if(estado==1){
      this.instanciaDocente.estado=1;
     return this.estadoAcestadoUsuariotivo=true;
    }
    if(estado==0){
      this.instanciaDocente.estado=0;
      return this.estadoAcestadoUsuariotivo=false;
     }
  }
  cargarFormularioDocente(){
    this.activateRotue.params.subscribe(params=> this.external_usuario=params['external_us']);
    this.servicioDocente.obtenerDocenteExternal_us(this.external_usuario).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        if(siHacesBien['Siglas']=='OE'){
          console.log(siHacesBien);
          this.instanciaDocente.nombre=siHacesBien['mensaje']['nombre'];
          this.instanciaDocente.apellido=siHacesBien['mensaje']['apellido'];
          this.instanciaDocente.correo=siHacesBien['mensaje']['correo'];
          this.instanciaDocente.tipoUsuario=siHacesBien['mensaje']['tipoUsuario'];
          this.instanciaDocente.estado=siHacesBien['mensaje']['estado'];
          this.estadoUsuarioAdmin(this.instanciaDocente.estado);
          this.instanciaDocente.password="";
          console.log(this.instanciaDocente);
        }else{
          console.log("no se encontro");
        }
      },siHaceMal=>{
        console.log(siHaceMal);
      }
    );
  }
  onSubmitEditarAdmin(form:NgForm){
    if(form.invalid){
      return;
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });

    //this.instanciaDocente.estado=1;
    this.servicioDocente.actulizarDatosDocente(this.instanciaDocente,this.external_usuario).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        if(siHacesBien['Siglas']=="OE"){
          Swal({position: 'center',type: 'success',title: 'Registro éxitoso',showConfirmButton: false,timer: 1500})
          //this.servicioRouter.navigateByUrl('/panel-admin/gestionar-usuarios-admin');
        }else{
          Swal({title:'Error',type:'error',text:siHacesBien['mensaje']});
        }
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );


  }

}
