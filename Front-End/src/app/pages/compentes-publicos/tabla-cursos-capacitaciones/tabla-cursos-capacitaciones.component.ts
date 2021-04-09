import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tabla-cursos-capacitaciones',
  templateUrl: './tabla-cursos-capacitaciones.component.html'
})
export class TablaCursosCapacitacionesComponent implements OnInit {
  @Input() instanciaCursosCapacitaciones:any={};
  constructor() { }

  ngOnInit() {
  }

}
