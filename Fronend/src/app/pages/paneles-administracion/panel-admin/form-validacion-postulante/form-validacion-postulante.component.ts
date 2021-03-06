import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
// obtener el parametro q viene x la url
const estadoPostulante=0;

import  {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-form-info-postulante',
  templateUrl: './form-validacion-postulante.component.html'
})
export class FormInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
  //mensaje de alerta si el usuario no se encunetrta
  encontrado:boolean=false;
  constructor(private servicioPostulante_:SerivicioPostulanteService,private _activateRoute:ActivatedRoute) {
    this.instanciaPostulante=new PostulanteModel();
    //ontengo el paremtro de la url pára tarer los datos des estudiante
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioPostulante_.obtenerPostulanteExternal_es(estadoPostulante,params['external_es']).subscribe(
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

  ngOnInit() {

  }
  onSubmitFormularioPostulante(){
    this.instanciaPostulante=new PostulanteModel();
    //consultar si el postulante ha llenado el formulario
    this.servicioPostulante_.listarFormPostulante().subscribe(
      siHacesBien=>{
           // si esta registradoo en la BD el formulario completo entonces presento los datos
          if(siHacesBien['Siglas']=="OE"){
            //llena el formulario por primera ves
            this.instanciaPostulante.nombre=siHacesBien['mensaje']['nombre'];
            this.instanciaPostulante.apellido=siHacesBien['mensaje']['apellido'];
            this.instanciaPostulante.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaPostulante.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaPostulante.genero=siHacesBien['mensaje']['genero'];
            this.instanciaPostulante.fecha_nacimiento=siHacesBien['mensaje']['fecha_nacimiento'];
            this.instanciaPostulante.direccion_domicilio=siHacesBien['mensaje']['direccion_domicilio'];
           }else{
            //llena el formulario por primera ves
             this.instanciaPostulante.nombre="";
             this.instanciaPostulante.apellido="";
             this.instanciaPostulante.cedula="";
             this.instanciaPostulante.telefono="";
             this.instanciaPostulante.genero=0;
             const fecha = new Date();
             this.instanciaPostulante.fecha_nacimiento=fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay();
             this.instanciaPostulante.direccion_domicilio="";
           }
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });
  }
  estadoAprobado(estado:Number){
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
