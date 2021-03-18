import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { EmpleadorModel } from 'src/app/models/empleador.models';
import {CalificarEmpleadorModel} from 'src/app/models/calificar-empleador';
import {CalificarEmpleadorService} from 'src/app/servicios/calificar-empleador.service';
declare var JQuery:any;
// ========= valoracion =========

declare var $:any;

@Component({
  selector: 'app-validar-cuentas',
  templateUrl: './tablas-validar-cuentas.component.html'
})
export class TareaValiar implements OnInit {
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  estudiante:PostulanteModel[]=[];
  empleador:EmpleadorModel[]=[];
  intanciaCalifarEmpleador:CalificarEmpleadorModel;
  tipoUsuarioSecretaria:boolean=false;
  tipoUsuarioEncargado:boolean=false;

  constructor(private servicioPostulante_:SerivicioPostulanteService,
              private servicioCalificarEmpleador:CalificarEmpleadorService,
              private servicioEmpleador_:SerivicioEmpleadorService ) { }
  
  ngOnInit():void {
  this.perfilUsuario();
  this.intanciaCalifarEmpleador=new CalificarEmpleadorModel();
  //this.calificarEstrellas();
  }
  perfilUsuario(){
    if(Number(localStorage.getItem('tipoUsuario'))==3){
      this.tipoUsuarioSecretaria=true;
      this.servicioPostulante_.listarPostulantes().subscribe(
        siHacesBien=>{
          console.warn("TODO BIEN");
            //data table
            this.dtOptions = {
              pagingType: 'full_numbers',
              pageLength: 2
            };

          this.estudiante =siHacesBien;
          console.log(this.estudiante);
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        },
        (peroSiTenemosErro)=>{
           console.warn("TODO MAL");
         }
      );
    }
    if(Number(localStorage.getItem('tipoUsuario'))==5){
      this.tipoUsuarioEncargado=true;
      this.servicioEmpleador_.listarEmpleadores().subscribe(
        siHacesBien=>{
          console.warn("TODO BIEN");
          //data table
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
          };
          this.empleador =siHacesBien;
          console.log(this.empleador);
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        },
        (peroSiTenemosErro)=>{
          console.warn("TODO MAL");
        }
      );
    }
  }
  cargarEstrellas(){
    let calificacion=5;
    $(function() {
      $('#star2').starrr({
        max: 5,
        rating: 5,
        change: function(e, value){
          console.log(value);
          console.log(e);
          calificacion=value;
        }
      });
    });
    //validar que no venga vacio o nullo
    if(calificacion==null){
      this.intanciaCalifarEmpleador.estrellas=calificacion;
       calificacion=1;
    }else{
      this.intanciaCalifarEmpleador.estrellas=calificacion;
       calificacion;
    }
  }
  guardarCalificacion(){
    console.log(this.intanciaCalifarEmpleador);
    this.servicioCalificarEmpleador.registrarCalificacion(this.intanciaCalifarEmpleador).subscribe(
      siHaceBien=>{
        console.log(siHaceBien);
        Swal('Registrado', siHaceBien['mensaje'], 'success');
        this. cerrarModal();
      },error=>{
        Swal('Error', error['mensaje'], 'success');
        console.log(error);
      }
    );
  }
  mostrarModal(fk_empleador){
    $('#CalificarModal').modal('show');
    this.intanciaCalifarEmpleador.fk_empleador=fk_empleador;
    this.cargarEstrellas();
  
  }
    // si el usuario apalsta do veces entonces es null, por que borro su eleccion y se inicia la calificaicon desde cero
  
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
    cerrarModal(){
      $('#CalificarModal').modal('hide')
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


