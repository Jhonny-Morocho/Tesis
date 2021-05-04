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
    this.cargarTablaperfilUsuario();
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
  cargarTablaperfilUsuario(){
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
      //listo todos los empleadores
      this.servicioEmpleador_.listarEmpleadores().subscribe(
        siHacesBien=>{
          console.log(siHacesBien);
          //asginamos el array que viene del servicio
          this.empleador =siHacesBien;
          //imprimimos las estrellas
          function recorrerEmpleadores(element, index, array) {
            console.log(element);
            console.log("[" + index + "] = " + element['empleadorPromedio']);
            $(function() {
              $('#'+element['empleadorExternal_em']).starrr({
                max: 5,
                rating: element['empleadorPromedio']
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

  mostrarEmpleadorCalifiacar(indice){
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

  calificarEmpleador(){
    //aqui tengo el fk del empleador
    this.intanciaCalifarEmpleador.fk_empleador= this.intanciaEmpleadorCalificar.id;
    this.servicioCalificarEmpleador.registrarCalificacion(this.intanciaCalifarEmpleador).subscribe(
      siHaceBien=>{
        console.log(siHaceBien);
          //consulto de nuevo las nuevas calificaiones de los emepleadores
          if(siHaceBien['Siglas']=='OE'){
            Swal('Registrado', siHaceBien['mensaje'], 'success');
              this.obtenerCalificacionesTodosEmpleadores();
              let external_em= this.intanciaEmpleadorCalificar.external_em;
              console.log(external_em);
              for (let elemento of this.arrayCalificacionesEmpleadores){
                console.log(elemento['empleadorExternal_em']);
                  if(elemento['empleadorExternal_em']== external_em){
                    console.log(Number(elemento['empleadorPromedio']));
                    if(Number(elemento['empleadorPromedio'])<=1 || Number(elemento['empleadorPromedio'])>0 ){
                      $('#'+external_em).html('<div class="starrr" style="pointer-events: none;" id="'+external_em+'">'+
                                                '<a href="#" class="fa fa-star"></a>'+
                                                '<a href="#" class="fa fa-star-o"></a>'+
                                                '<a href="#" class="fa fa-star-o"></a>'+
                                                '<a href="#" class="fa fa-star-o"></a>'+
                                                '<a href="#" class="fa fa-star-o"></a>'+
                                              '</div>');

                    }
                    if(Number(elemento['empleadorPromedio'])<=2 || Number(elemento['empleadorPromedio'])>1 ){
                      $('#'+external_em).html('<div class="starrr" style="pointer-events: none;" id="'+external_em+'">'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star-o"></a>'+
                                                      '<a href="#" class="fa fa-star-o"></a>'+
                                                      '<a href="#" class="fa fa-star-o"></a>'+
                                                    '</div>');

                    }
                    if(Number(elemento['empleadorPromedio'])<=3 || Number(elemento['empleadorPromedio'])>2 ){
                      $('#'+external_em).html('<div class="starrr" style="pointer-events: none;" id="'+external_em+'">'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star-o"></a>'+
                                                      '<a href="#" class="fa fa-star-o"></a>'+
                                                    '</div>');

                    }
                    if(Number(elemento['empleadorPromedio'])<=4 || Number(elemento['empleadorPromedio'])>3 ){
                      $('#'+external_em).html('<div class="starrr" style="pointer-events: none;" id="'+external_em+'">'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star-o"></a>'+
                                                    '</div>');

                    }
                    if(Number(elemento['empleadorPromedio'])<=5 || Number(elemento['empleadorPromedio'])>4 ){
                      $('#'+external_em).html('<div class="starrr" style="pointer-events: none;" id="'+external_em+'">'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                      '<a href="#" class="fa fa-star"></a>'+
                                                    '</div>');

                    }
                }
              }
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


