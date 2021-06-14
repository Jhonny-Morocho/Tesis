import { Component, OnInit } from '@angular/core';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import { Subject } from 'rxjs';
import { dataTable } from 'src/app/templateDataTable/configDataTable';

@Component({
  selector: 'app-ofertas-postuladas',
  templateUrl: './ofertas-postuladas.component.html'
})
export class OfertasPostuladasComponent implements OnInit {
  ofertaLaboralPostulante:Object;
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOfertaLaboralPostulante:OfertaLaboralEstudianteService,
              private servicioOferaLaboral:OfertasLaboralesService) { }

  ngOnInit() {
    this.obtenrOfertasLaboralesEstudiante();
    this.configurarParametrosDataTable();
  }

  obtenrOfertasLaboralesEstudiante(){
    console.log(this.servicioOfertaLaboralPostulante.listarTodasOfertaEstudianteExternal_us());
    this.servicioOfertaLaboralPostulante.listarTodasOfertaEstudianteExternal_us().subscribe(
      siHaceBien=>{
        console.log((siHaceBien));
        this.ofertaLaboralPostulante=siHaceBien;
        this.dtTrigger.next();
        siHaceBien.forEach(element => {
          element.estado;
        });
      },siHaceMal=>{
        console.log(siHaceMal);
      }
    );
  }
  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }

}
