import { Component, Input, OnInit } from '@angular/core';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
import {environment} from 'src/environments/environment.prod';
@Component({
  selector: 'app-ver-oferta-laboral',
  templateUrl: './ver-oferta-laboral.component.html'
})
export class VerOfertaLaboralComponent implements OnInit {
  @Input() instanciaOfertaVer:any={};
  dominio=environment;


  constructor() { }

  ngOnInit() {
  }


}
