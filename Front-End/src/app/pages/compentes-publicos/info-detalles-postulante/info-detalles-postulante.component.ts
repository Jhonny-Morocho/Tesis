import { Component, OnInit,Input } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-info-detalles-postulante',
  templateUrl: './info-detalles-postulante.component.html'
})
export class VerHojaVidaComponent implements OnInit {
  @Input() instanciaVerPostulante:any={};

  constructor() { }

  ngOnInit() {

  }


}
