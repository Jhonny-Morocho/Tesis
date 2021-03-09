import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { EmpleadorModel } from '../../../../models/empleador.models';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form-validacion-empleador',
  templateUrl: './form-validacion-empleador.component.html'
})
export class FormValidacionEmpleadorComponent implements OnInit {
  instanciaEmpleador:EmpleadorModel;
  externalEmpleador:string;
  //si existe el usuario o no
  encontrado:boolean=false;
  

  constructor(private servicioEmpleador:SerivicioEmpleadorService,private _activateRoute:ActivatedRoute) { 
    this.instanciaEmpleador=new EmpleadorModel;
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.externalEmpleador=params['external_em'];
      this.servicioEmpleador.obtenerEmpleadorExternal_em(params['external_em']).subscribe(
        suHacesBien=>{
          console.log(suHacesBien);
          //encontro estudiante estado==0
          if(suHacesBien["Siglas"]=="OE"){
            console.log( suHacesBien['Siglas']);
            this.instanciaEmpleador.razon_empresa=suHacesBien['mensaje']['razon_empresa'];
            this.instanciaEmpleador.actividad_ruc=suHacesBien['mensaje']['actividad_ruc'];
            this.instanciaEmpleador.cedula=suHacesBien['mensaje']['cedula'];
            this.instanciaEmpleador.tiposEmpresa=suHacesBien['mensaje']['tipo_empresa'];
            this.instanciaEmpleador.provincia=suHacesBien['mensaje']['provincia'];
            this.instanciaEmpleador.telefono=suHacesBien['mensaje']['telefono'];
            this.instanciaEmpleador.ciudad=suHacesBien['mensaje']['ciudad'];
            this.instanciaEmpleador.direccion=suHacesBien['mensaje']['direccion'];
            this.instanciaEmpleador.estado=suHacesBien['mensaje']['estado'];
            this.instanciaEmpleador.nom_representante_legal=suHacesBien['mensaje']['nom_representante_legal'];
            this.instanciaEmpleador.num_ruc=suHacesBien['mensaje']['num_ruc'];
            console.log(this.instanciaEmpleador.estado);
            this.encontrado=true;
          }
          //no encontro estudiantes que tengan estado ==1
          else{
            this.encontrado=false;
          }
        },peroSiTenemosErro=>{
     
          console.log(peroSiTenemosErro);
        }
      );
    });
  }

  ngOnInit() {
  }

 //aprobar postulante //y tambien no aprobar estudiante
 onSubmitForEmpleadorAprobacion(formularioAprobacion:NgForm){
  if(formularioAprobacion.invalid){
    return;
  }
  console.log(formularioAprobacion.invalid);
  Swal({
    allowOutsideClick:false,
    type:'info',
    text:'Espere por favor'
  });
  Swal.showLoading();
  this.servicioEmpleador.actulizarAprobacionEmpleador(
                Number(this.instanciaEmpleador.estado),
                this.externalEmpleador,
                this.instanciaEmpleador.observaciones
  ).subscribe(
    siHacesBien=>{
      Swal.close();
      if(siHacesBien['Siglas']=="OE"){
        Swal('Registrado', 'Informacion Registrada con Exito', 'success');
        }else{
          console.log(siHacesBien);
          Swal('Ups, No se puede realizar el registro', siHacesBien['mensaje'], 'info')
        }
    
    },(peroSiTenemosErro)=>{
     Swal({
         title:'Error al registrar informacion',
         type:'error',
         text:peroSiTenemosErro['mensaje']
       }); 
    }
  );
}
  //internacion con el boton del formulario apra que cambie de color aprobado/no aprobado
  estadoAprobado(estado:Number){
    if(estado==0){
      this.instanciaEmpleador.estado=0;
      return false;
    }
    if(estado==1){
      this.instanciaEmpleador.estado=1;
      return true;
    }

  }

}
