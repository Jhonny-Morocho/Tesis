import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];
  constructor() { }

  ngOnInit() {
  this.instanciaTituloAcademico=new TituloModel();
  this.instanciaTituloAcademico.detalles_adiciones="El titulo lo tub een ";
  this.instanciaTituloAcademico.estado=1;
  this.instanciaTituloAcademico.evidencias_url="/c/"
  //this.instanciaTituloAcademico.nivel_instruccion=1;
  this.instanciaTituloAcademico.numero_registro="1b-12fc";
  this.instanciaTituloAcademico.tipo_titulo=2;
  this.instanciaTituloAcademico.titulo_obtenido="Ing Comercial";
  }
  onSubMitRegistroTitulo(formRegistroTitulo:NgForm){
    console.log(formRegistroTitulo);

  }
}
