import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { EmpleadorModel } from 'src/app/models/empleador.models';
import {CalificarEmpleadorModel} from 'src/app/models/calificar-empleador';
import {CalificarEmpleadorService} from 'src/app/servicios/calificar-empleador.service';
import { dataTable } from 'src/app/templateDataTable/configDataTable';

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
  intanciaEmpleadorCalificar:EmpleadorModel;
  estudiante:PostulanteModel[]=[];
  empleador:EmpleadorModel[]=[];
  arrayCalificacionesEmpleadores=[];
  activarBotonCalificarModal=false;
  intanciaCalifarEmpleador:CalificarEmpleadorModel;
  tipoUsuarioSecretaria:boolean=false;
  tipoUsuarioEncargado:boolean=false;

  constructor(private servicioPostulante_:SerivicioPostulanteService,
              private servicioCalificarEmpleador:CalificarEmpleadorService,
              private servicioEmpleador_:SerivicioEmpleadorService ) { }

  ngOnInit():void {
    this.obtenerCalificacionesTodosEmpleadores();
    this.configurarParametrosDataTable();
    this.perfilUsuario();
    this.intanciaCalifarEmpleador=new CalificarEmpleadorModel();
    this.intanciaCalifarEmpleador=new CalificarEmpleadorModel();
    this.intanciaEmpleadorCalificar=new EmpleadorModel();
    //this.calificarEstrellas();
  }

  obtenerCalificacionesTodosEmpleadores(){
    this.servicioCalificarEmpleador.obtenerCalificacionTodosEmpleadores().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        this.arrayCalificacionesEmpleadores=siHacesBien;
        console.log(this.arrayCalificacionesEmpleadores);
      },siHacesMal=>{
        console.warn(siHacesMal);
      }
    );
  }
  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }
  //revisar que tipo de usuario admistrador esta usando la pagina
  perfilUsuario(){
    //esat usando la pagina la secretaria

    if(Number(localStorage.getItem('tipoUsuario'))==3){
      this.tipoUsuarioSecretaria=true;
      this.servicioPostulante_.listarPostulantes().subscribe(
        siHacesBien=>{
          console.warn("TODO BIEN");
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
      //esat usando la pagina el encargado
    if(Number(localStorage.getItem('tipoUsuario'))==5){
      this.tipoUsuarioEncargado=true;
      this.servicioEmpleador_.listarEmpleadores().subscribe(
        siHacesBien=>{
          console.log(siHacesBien);
          //asginamos el array que viene del servicio
          this.empleador =siHacesBien;
          //imprimimos las estrellas
          function recorrerEmpleadores(element, index, array) {
            console.log("[" + index + "] = " + element['empleadorPromedio']);
            $(function() {
              $('#'+index).starrr({
                max: 5,
                rating: element['empleadorPromedio']
                // change: function(e, value){
                //   //calificacion=value;
                //   this.valor= value;
                //   console.log(value);
                //   //console.log(e);
                // }
              });
            });
          }
          this.arrayCalificacionesEmpleadores.forEach(recorrerEmpleadores);
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

  valorEstrella(valorEstrella){
    console.log(valorEstrella);
    this.activarBotonCalificarModal=true;
    this.intanciaCalifarEmpleador.estrellas=valorEstrella;
  }

  calificarEmpleador(indice){
    $('#CalificarEmpleador').modal('show');
    this.intanciaEmpleadorCalificar.actividad_ruc=this.empleador[0]['actividad_ruc'];
    this.intanciaEmpleadorCalificar.cedula=this.empleador[indice]['cedula'];
    this.intanciaEmpleadorCalificar.fk_ciudad=this.empleador[indice]['fk_ciudad'];
    this.intanciaEmpleadorCalificar.fk_provincia=this.empleador[indice]['fk_provincia'];
    this.intanciaEmpleadorCalificar.direccion=this.empleador[indice]['direccion'];
    this.intanciaEmpleadorCalificar.external_em=this.empleador[indice]['external_em'];
    this.intanciaEmpleadorCalificar.id=this.empleador[indice]['id'];
    this.intanciaEmpleadorCalificar.nom_representante_legal=this.empleador[indice]['nom_representante_legal'];
    this.intanciaEmpleadorCalificar.num_ruc=this.empleador[indice]['num_ruc'];
    this.intanciaEmpleadorCalificar.razon_empresa=this.empleador[indice]['razon_empresa'];
    this.intanciaEmpleadorCalificar.telefono=this.empleador[indice]['telefono'];
  }
  guardarCalificacion(){
    this.intanciaCalifarEmpleador.fk_empleador= this.intanciaEmpleadorCalificar.id;
    this.servicioCalificarEmpleador.registrarCalificacion(this.intanciaCalifarEmpleador).subscribe(
      siHaceBien=>{
        console.log(siHaceBien);
        if(siHaceBien['Siglas']=='OE'){
          Swal('Registrado', siHaceBien['mensaje'], 'success');
        }else{
          Swal('Infor', siHaceBien['mensaje'], 'info');
        }
      },error=>{
        console.log(error);
        Swal('Error', error['mensaje'], 'error');
      });
    this.cerrarModal();
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
    cerrarModal(){
      $('#CalificarEmpleador').modal('hide')
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


