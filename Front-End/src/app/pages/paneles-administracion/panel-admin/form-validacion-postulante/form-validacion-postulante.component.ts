import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import Swal from 'sweetalert2';
// obtener el parametro q viene x la url


import  {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form-info-postulante',
  templateUrl: './form-validacion-postulante.component.html'
})
export class FormInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
  externalEst:string;
  //mensaje de alerta si el usuario no se encunetrta
  encontrado:boolean=false;
  constructor(private servicioPostulante_:SerivicioPostulanteService,private _activateRoute:ActivatedRoute) {
    this.instanciaPostulante=new PostulanteModel();
    //ontengo el paremtro de la url pára tarer los datos des estudiante
    this.formEstudiante();
   }
  ngOnInit() {

  }

  formEstudiante(){
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.externalEst=params['external_es'];
      this.servicioPostulante_.obtenerPostulanteExternal_es(params['external_es']).subscribe(
        suHacesBien=>{
          console.log(suHacesBien);
          //encontro estudiante estado==0
          if(suHacesBien["Siglas"]=="OE"){
            console.log( suHacesBien['Siglas']);
            this.instanciaPostulante.nombre=suHacesBien['mensaje']['nombre'];
            this.instanciaPostulante.apellido=suHacesBien['mensaje']['apellido'];
            this.instanciaPostulante.cedula=suHacesBien['mensaje']['cedula'];
            this.instanciaPostulante.direccion_domicilio=suHacesBien['mensaje']['direccion_domicilio'];
            this.instanciaPostulante.fecha_nacimiento=suHacesBien['mensaje']['fecha_nacimiento'];
            this.instanciaPostulante.genero=suHacesBien['mensaje']['genero'];
            this.instanciaPostulante.telefono=suHacesBien['mensaje']['telefono'];
            this.instanciaPostulante.estado=suHacesBien['mensaje']['estado'];
            this.instanciaPostulante.observaciones=suHacesBien['mensaje']['observaciones'];
            console.log(this.instanciaPostulante.estado);
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
  //aprobar postulante //y tambien no aprobar estudiante
  onSubmitForPostulanteAprobacion(formularioAprobacion:NgForm){
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
    this.servicioPostulante_.actulizarAprobacionPostulante(
                  Number(this.instanciaPostulante.estado),
                  this.externalEst,
                  this.instanciaPostulante.observaciones
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
  estadoAprobado(estado:Number):boolean{
    if(estado==0){
      this.instanciaPostulante.estado=0;
      return false;
    }
    if(estado==1){
      this.instanciaPostulante.estado=1;
      return true;
    }

  }
}
