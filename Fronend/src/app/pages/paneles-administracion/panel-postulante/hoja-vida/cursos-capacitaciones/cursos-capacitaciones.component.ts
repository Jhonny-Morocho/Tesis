import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';

@Component({
  selector: 'app-cursos-capacitaciones',
  templateUrl: './cursos-capacitaciones.component.html'
})
export class CursosCapacitacionesComponent implements OnInit {
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  //tabla data que consumo del servicio
  cursosCapacitaciones:CursosCapacitacionesModel[]=[];
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioCursosCapacitacione:CursosCapacitacionesService) { }

  ngOnInit() {
    this.cargarTabla();
  }

  cargarTabla(){
    //listamos los titulos academicos
    this.servicioCursosCapacitacione.listarCursosCapacitaciones().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        console.warn("TODO BIEN");
        //cargo array con la data para imprimir en la tabañ
        this.cursosCapacitaciones =siHacesBien;
        console.log(this.cursosCapacitaciones);
        //data table
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
   }

}
