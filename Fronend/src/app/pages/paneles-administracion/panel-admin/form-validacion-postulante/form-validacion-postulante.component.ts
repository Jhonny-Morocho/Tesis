import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import Swal from 'sweetalert2';
// obtener el parametro q viene x la url
const estadoPostulante=0;

import  {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
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
    this.servicioPostulante_.crearPostulante(this.instanciaPostulante).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        console.log(siHacesBien['Siglas']);
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          console.log(siHacesBien['Siglas']=="OE");
          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
          localStorage.setItem("nombre", this.instanciaPostulante.nombre);
          localStorage.setItem("apellido", this.instanciaPostulante.apellido);
          localStorage.setItem("cedula",this.instanciaPostulante.cedula);
          localStorage.setItem("telefono",this.instanciaPostulante.telefono);
          localStorage.setItem("genero",(this.instanciaPostulante.genero).toString());
          localStorage.setItem("direccion_domicilio",this.instanciaPostulante.direccion_domicilio);
          localStorage.setItem("fecha_nacimiento",this.instanciaPostulante.fecha_nacimiento);
          localStorage.setItem("external_es",siHacesBien['mensaje']['external_es']);
          this.ruta_.navigateByUrl('/panel-postulante/form-info-postulante');
          }else{
            console.log(siHacesBien);
            Swal('Ups, No se puede realizar el registro', siHacesBien['mensaje'], 'info')
          }
      
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.log(this.instanciaPostulante);
        Swal({
          title:'Error al registrar informacion',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        }); 
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
