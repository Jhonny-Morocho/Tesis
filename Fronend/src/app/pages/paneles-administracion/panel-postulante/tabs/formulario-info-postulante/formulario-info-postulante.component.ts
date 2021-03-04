import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formulario-info-postulante',
  templateUrl: './formulario-info-postulante.component.html'
})
export class FormularioInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
   booleanFormularioCompletado=false;
  constructor( private servicioPostulante_:SerivicioPostulanteService,private ruta_:Router) { }

  ngOnInit() {

    //pregunto si existe el extern:us, esto siginifca que ya completo el formulario
    //y esta en el procesod de validacion de datos de postulante
    this.instanciaPostulante=new PostulanteModel();
    if(localStorage.getItem("external_es")){
      //significa que el formulario no se ha completado
      this.booleanFormularioCompletado=true;
      //llena el formulario por primera ves
      this.instanciaPostulante.nombre=localStorage.getItem("nombre");
      this.instanciaPostulante.apellido=localStorage.getItem("apellido");
      this.instanciaPostulante.cedula=localStorage.getItem("cedula");
      this.instanciaPostulante.telefono=localStorage.getItem("telefono");
      this.instanciaPostulante.genero=Number(localStorage.getItem("genero"));
      this.instanciaPostulante.fecha_nacimiento=localStorage.getItem("fecha_nacimiento");
      this.instanciaPostulante.direccion_domicilio=localStorage.getItem("direccion_domicilio");

    }else{
      //significa que el formulario no se ha completado
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
