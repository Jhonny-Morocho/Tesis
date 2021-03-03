import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-formulario-info-postulante',
  templateUrl: './formulario-info-postulante.component.html'
})
export class FormularioInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
  constructor() { }

  ngOnInit() {
    this.instanciaPostulante=new PostulanteModel();
    this.instanciaPostulante.nombre="Jhonny";
    this.instanciaPostulante.apellido="Morocho";
    this.instanciaPostulante.cedula="1105116899";
    this.instanciaPostulante.genero=1;
    this.instanciaPostulante.telefono="0998202201";
    this.instanciaPostulante.fecha_nacimiento="1993-03-09";
    this.instanciaPostulante.direccion_domicilio="Los rosales";
  }

  onSubmitFormularioPostulante(formularioRegistroPostulante:NgForm){
    console.log(formularioRegistroPostulante);
  }
}
