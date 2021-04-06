import { Component, OnInit } from '@angular/core';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-ofertas-postuladas',
  templateUrl: './ofertas-postuladas.component.html'
})
export class OfertasPostuladasComponent implements OnInit {
  ofertaLaboralPostulante:Object;
  constructor(private servicioOfertaLaboralPostulante:OfertaLaboralEstudianteService) { }

  ngOnInit() {
    console.log(this.servicioOfertaLaboralPostulante.listarTodasOfertaEstudianteExternal_us());
    this.servicioOfertaLaboralPostulante.listarTodasOfertaEstudianteExternal_us().subscribe(
      siHaceBien=>{
        console.log((siHaceBien));
        this.ofertaLaboralPostulante=siHaceBien;
        siHaceBien.forEach(element => {
          element.estado
        });
      },siHaceMal=>{
        console.log(siHaceMal);
      }
    );
  
  }

}
