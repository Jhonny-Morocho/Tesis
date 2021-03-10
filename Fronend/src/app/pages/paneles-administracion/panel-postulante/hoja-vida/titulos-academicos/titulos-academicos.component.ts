import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {
  instanciaTituloAcademico:TituloModel;
  constructor() { }

  ngOnInit() {
  this.instanciaTituloAcademico=new TituloModel();
  }
  onSubMitRegistroTitulo(){


  }
}
