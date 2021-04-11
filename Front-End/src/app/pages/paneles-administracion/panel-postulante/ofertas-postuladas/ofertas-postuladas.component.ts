import { Component, OnInit } from '@angular/core';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';

@Component({
  selector: 'app-ofertas-postuladas',
  templateUrl: './ofertas-postuladas.component.html'
})
export class OfertasPostuladasComponent implements OnInit {
  ofertaLaboralPostulante:Object;
  constructor(private servicioOfertaLaboralPostulante:OfertaLaboralEstudianteService,
              private servicioOferaLaboral:OfertasLaboralesService) { }

  ngOnInit() {
   this.obtenrOfertasLaboralesEstudiante();
  }

  obtenrOfertasLaboralesEstudiante(){
    console.log(this.servicioOfertaLaboralPostulante.listarTodasOfertaEstudianteExternal_us());
    this.servicioOfertaLaboralPostulante.listarTodasOfertaEstudianteExternal_us().subscribe(
      siHaceBien=>{
        console.log((siHaceBien));
        this.ofertaLaboralPostulante=siHaceBien;
        siHaceBien.forEach(element => {
          element.estado;
        });
      },siHaceMal=>{
        console.log(siHaceMal);
      }
    );
  }


}
