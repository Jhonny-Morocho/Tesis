import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tabla-titulos-academicos',
  templateUrl: './tabla-titulos-academicos.component.html'
})
export class TablaTitulosAcademicosComponent implements OnInit {
  @Input() instanciaTitutosAcademicos:any={};
  constructor() { }

  ngOnInit() {
  }

}
