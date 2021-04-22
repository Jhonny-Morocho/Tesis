import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {PostulanteModel} from 'src/app/models/postulante.models';
import { SerivicioPostulanteService } from 'src/app/servicios/serivicio-postulante.service';

@Component({
  selector: 'app-tabla-filtro-postulantes',
  templateUrl: './form-preseleccionar-postulantes.component.html'
})
export class FormPreseleccionarPostulantesComponent implements OnInit {
  estudiante:PostulanteModel[]=[];
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioPostulante_:SerivicioPostulanteService) { }

  ngOnInit() {
    this.cargarTabla();

  }
  cargarTabla(){
    this.servicioPostulante_.listarPostulantes().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
          //data table
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
          };
        this.estudiante =siHacesBien;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
         console.warn("TODO MAL");
       }
    );
  }

}
