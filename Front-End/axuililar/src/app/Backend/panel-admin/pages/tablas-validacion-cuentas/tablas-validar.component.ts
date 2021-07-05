import { element } from 'protractor';
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
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';
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
              private router:Router,
              private servicioEmpleador_:SerivicioEmpleadorService ) { }

  ngOnInit():void {
    this.obtenerCalificacionesTodosEmpleadores();
    this.configurarParametrosDataTable();
    this.cargarTablaperfilUsuario();
    this.intanciaCalifarEmpleador=new CalificarEmpleadorModel();
    this.intanciaCalifarEmpleador=new CalificarEmpleadorModel();
    this.intanciaEmpleadorCalificar=new EmpleadorModel();
    //responsibo
    $("body").removeClass("sidebar-open");
     //filtro en la data table
    //  $(document).ready(function() {
    //      $('#dateadded1 thead tr').clone(true).appendTo('#dateadded1 thead' );
    //      $('#dateadded1 thead tr:eq(1) th').each( function (i) {
    //          var title = $(this).text();
    //          $(this).html( '<input type="text" placeholder="'+title+'"/>');
    //          $( 'input', this ).on( 'keyup change', function () {
    //               if ( $('#dateadded1').DataTable().columns(i).search() !== this.value ) {
    //                  $('#dateadded1').DataTable()
    //                   .column(i)
    //                   .search( this.value )
    //                   .draw();
    //               }
    //          });
    //      } );
    //   } );
  }
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent},indice) {
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

      //$('#CalificarEmpleador').modal('show');
      Swal({
        title: '¿Está seguro en realizar esta acción?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.intanciaCalifarEmpleador.estrellas=$event.newValue;
          this.calificarEmpleador();
          //borro la tabla anetrior y vuelvo a cargar
          this.dtTrigger.unsubscribe();
          this.cargarTablaperfilUsuario();
        }
      })
  }
  obtenerCalificacionesTodosEmpleadores(){
    this.servicioCalificarEmpleador.obtenerCalificacionTodosEmpleadores().subscribe(
      siHacesBien=>{
        this.arrayCalificacionesEmpleadores=siHacesBien;
      },siHacesMal=>{
        Swal('Info',siHacesMal['mensaje'], 'info');
      }
    );
  }
  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }
  dibujarEstrellas(external_em){
    let calificacion=0;
    this.arrayCalificacionesEmpleadores.forEach(element => {
      if(element['empleadorExternal_em']===external_em){
        calificacion= element['empleadorPromedio'];
      }
    });
    return calificacion;
  }
  //revisar que tipo de usuario admistrador esta usando la pagina
  cargarTablaperfilUsuario(){
    //esat usando la pagina la secretaria
    if(Number(localStorage.getItem('tipoUsuario'))==3){
      this.tipoUsuarioSecretaria=true;
      this.servicioPostulante_.listarPostulantes().subscribe(
        siHacesBien=>{
          this.estudiante =siHacesBien;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        },
        (peroSiTenemosErro)=>{
           Swal('Info',peroSiTenemosErro['mensaje'], 'info');
         }
      );
    }
    //esat usando la pagina el encargado
    if(Number(localStorage.getItem('tipoUsuario'))==5){
      this.tipoUsuarioEncargado=true;
      //listo todos los empleadores
      this.servicioEmpleador_.listarEmpleadores().subscribe(
        siHacesBien=>{
          //asginamos el array que viene del servicio
          this.empleador =siHacesBien;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        },
        (peroSiTenemosErro)=>{
          Swal('Info',peroSiTenemosErro['mensaje'], 'info');
        }
      );
    }

  }


  calificarEmpleador(){
    //aqui tengo el fk del empleador
    this.intanciaCalifarEmpleador.fk_empleador= this.intanciaEmpleadorCalificar.id;
    this.servicioCalificarEmpleador.registrarCalificacion(this.intanciaCalifarEmpleador).subscribe(
      siHaceBien=>{
          //consulto de nuevo las nuevas calificaiones de los emepleadores
        if(siHaceBien['Siglas']=='OE'){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
          toast({
            type: 'success',
            title: 'Registrado'
          })
            //codigo para recargar en la misma pagina
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/panel-admin/tareas']);
        }else{
          Swal('Infor', siHaceBien['mensaje'], 'info');
        }
      },error=>{
        Swal('Error', error['mensaje'], 'error');
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


