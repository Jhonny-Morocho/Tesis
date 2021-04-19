import { Component, OnInit } from '@angular/core';
import {DocenteModel} from 'src/app/models/docente.models';
@Component({
  selector: 'app-form-editar-admin',
  templateUrl: './form-editar-admin.component.html'
})
export class FormEditarAdminComponent implements OnInit {
  instanciaDocente:DocenteModel;
  constructor() { }

  ngOnInit() {
    this.instanciaDocente=new DocenteModel();
  }

}
