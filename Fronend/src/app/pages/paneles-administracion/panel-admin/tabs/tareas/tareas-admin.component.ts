import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
const estudianteNoAprobado:Number = 0;

@Component({
  selector: 'app-tareas-pendientes',
  templateUrl: './tareas-admin.component.html'
})
export class TareasAdminComponent implements OnInit {
  //data table
  dtOptions: DataTables.Settings = {};
  //persons: Person[] = [];
  estudiante:PostulanteModel[]=[];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioPostulante_:SerivicioPostulanteService ) { }

  ngOnInit():void {
    this.servicioPostulante_.listarPostulantes(estudianteNoAprobado).subscribe(
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
        

          //this.estudiantes=siHacesBien;
        console.log(siHacesBien);


      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  estado(estado:string){
    //si regresa true es que no esta validado
    if(Number(estado)==0){
      return true;
    }else{
      return false;
    }
  }

}


