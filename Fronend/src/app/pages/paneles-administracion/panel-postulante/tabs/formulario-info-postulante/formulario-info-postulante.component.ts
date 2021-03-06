import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import { Router } from '@angular/router';
import { single } from 'rxjs/operators';
import { empty } from 'rxjs';
@Component({
  selector: 'app-formulario-info-postulante',
  templateUrl: './formulario-info-postulante.component.html'
})
export class FormularioInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
   booleanFormularioCompletado=false;
  constructor( private servicioPostulante_:SerivicioPostulanteService,private ruta_:Router) { }

  ngOnInit() {
    this.instanciaPostulante=new PostulanteModel();
    //consultar si el postulante ha llenado el formulario
    this.servicioPostulante_.listarFormPostulante().subscribe(
      siHacesBien=>{
          console.warn("TODO BIEN");
          console.log(siHacesBien['mensaje']['nombre']);
           // si esta registradoo en la BD el formulario completo entonces presento los datos
          if(siHacesBien['Siglas']=="OE"){
            // por lo tanto formulario completo ==true
            this.booleanFormularioCompletado=true;
            //llena el formulario por primera ves
            this.instanciaPostulante.nombre=siHacesBien['mensaje']['nombre'];
            this.instanciaPostulante.apellido=siHacesBien['mensaje']['apellido'];
            this.instanciaPostulante.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaPostulante.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaPostulante.genero=siHacesBien['mensaje']['genero'];
            this.instanciaPostulante.fecha_nacimiento=siHacesBien['mensaje']['fecha_nacimiento'];
            this.instanciaPostulante.direccion_domicilio=siHacesBien['mensaje']['direccion_domicilio'];
           }else{
            this.booleanFormularioCompletado=false;
            //llena el formulario por primera ves
             this.instanciaPostulante.nombre="";
             this.instanciaPostulante.apellido="";
             this.instanciaPostulante.cedula="";
             this.instanciaPostulante.telefono="";
             this.instanciaPostulante.genero=0;
             const fecha = new Date();
             console.log(fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay());
             this.instanciaPostulante.fecha_nacimiento=fecha.getFullYear()+"-"+fecha.getMonth()+"-"+fecha.getDay();
             this.instanciaPostulante.direccion_domicilio="";
           }
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });
  }

  onSubmitFormularioPostulante(formRegistroPostulanteDatosCompletos:NgForm){
    console.log(formRegistroPostulanteDatosCompletos);
    console.log("on submit Formulario Registro datos postulante postular");
    if(formRegistroPostulanteDatosCompletos.invalid){
      return;
     }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //envio la informacion a mi servicio - consumo el servici
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
}
