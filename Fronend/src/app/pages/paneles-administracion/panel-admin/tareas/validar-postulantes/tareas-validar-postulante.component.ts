import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';


@Component({
  selector: 'app-tareas-pendientes',
  templateUrl: './tareas-validar-postulante.component.html'
})
export class TareaValiarPostulanteComponent implements OnInit {
  //data table
  dtOptions: DataTables.Settings = {};
  estudiante:PostulanteModel[]=[];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioPostulante_:SerivicioPostulanteService ) { }

  ngOnInit():void {
    this.servicioPostulante_.listarPostulantes().subscribe(
      siHacesBien=>{
          console.warn("TODO BIEN");
          //data table
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
          };
   
            this.estudiante =siHacesBien;
            console.log(siHacesBien);
            // Calling the DT trigger to manually render the table
            this.dtTrigger.next();
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

    //conversion de estado
    estadoConversion(numeroEstado:Number):boolean{
      if(numeroEstado==0){
          return false;
      }
      if(numeroEstado==1){
        return true;
      }
    }
    //si esta revisado debe hacer algo o existr texto en el campo de obersiaciones
    estadoRevision(observacion:String):boolean{
      //si ha escrito algo la secretaria signifca que si reviso
      if(observacion.length>0){
        return true;
      }else{
        return false;
      }
    }

}


