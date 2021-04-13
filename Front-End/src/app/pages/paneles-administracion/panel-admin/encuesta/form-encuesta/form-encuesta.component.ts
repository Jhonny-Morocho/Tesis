import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {EncuestaModel} from 'src/app/models/encuesta.models';
import {Encuesta} from 'src/app/servicios/encuesta.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-encuesta',
  templateUrl: './form-encuesta.component.html'
})
export class FormEncuestaComponent implements OnInit {
  arrayTipoEncuesta:string[]=["Postulante","Empleador"];
  estadoFormularioregistroNuevo:boolean=true;
  instanciaEncuesta:EncuestaModel;
  constructor(private servicioEncuesta:Encuesta) { }

  ngOnInit() {
    this.instanciaEncuesta= new EncuestaModel();
  }

  onSubmitRegistrar(formEncuesta:NgForm ){
    console.log(formEncuesta);
    if(formEncuesta.invalid){
      return;
    }
    this.instanciaEncuesta.estado=1;
    console.log(this.instanciaEncuesta);
    this.servicioEncuesta.crearEncuesta(this.instanciaEncuesta).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
        }else{
          Swal('Error', siHacesBien['error'], 'error');
        }

      },siHaceMal=>{
        console.warn(siHaceMal);
        Swal('Error', siHaceMal['error'], 'error');
      }
    );
  }

}
