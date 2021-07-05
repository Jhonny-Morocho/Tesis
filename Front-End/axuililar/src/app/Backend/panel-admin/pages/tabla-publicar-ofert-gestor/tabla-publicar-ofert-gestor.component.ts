import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-tabla-publicar-ofert-gestor',
  templateUrl: './tabla-publicar-ofert-gestor.component.html'
})
export class TablaPublicarOfertGestorComponent implements OnInit {
  instanciaEmpleadorModelVer:EmpleadorModel;
    booleanGestor:boolean=false;
    instanciaOfertaLaboralActualizar:OfertaLaboralModel;
    intanciaOfertaLaboral:OfertaLaboralModel;
    //array de data ofertas labarales
    ofertasLaborales:OfertaLaboralModel[]=[];

    instanciaOfertaVer:OfertaLaboralModel;
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioOferta:OfertasLaboralesService,
    private servicioEmpleador:SerivicioEmpleadorService,
    private ruta_:Router) { }

  ngOnInit() {
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.instanciaOfertaLaboralActualizar=new OfertaLaboralModel();
    this.configurarParametrosDataTable();
    this.cargarTabla();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioOferta.listarOfertasValidadasEncargado().subscribe(
      siHacesBien=>{
        this.ofertasLaborales =siHacesBien;
        //cargamos los items o los requisitos
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        Swal('Info',peroSiTenemosErro['mensaje'], 'info');
      }
    );
   }
   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
      try {
        this.dtTrigger.unsubscribe();
      } catch (error) {
        //le puse x q no uso suscripcion/mas info:/https://l-lin.github.io/angular-datatables/#/basic/angular-way
        console.warn(error);
      }
    }
    verOfertaModal(id:Number){
      //necesito converitr o typescrip me da error
      var index=parseInt((id).toString(), 10);

      this.instanciaOfertaVer.puesto=this.ofertasLaborales[index]['puesto'];
      this.instanciaOfertaVer.requisitos=this.ofertasLaborales[index]['requisitos'];
      this.instanciaOfertaVer.descripcion=this.ofertasLaborales[index]['descripcion'];
      this.instanciaOfertaVer.fk_empleador=this.ofertasLaborales[index]['fk_empleador'];
      this.instanciaOfertaVer.obervaciones=this.ofertasLaborales[index]['obervaciones'];
      this.instanciaOfertaVer.correo=this.ofertasLaborales[index]['correo'];
      //obtengo todos los usuarios
      this.servicioEmpleador.listarEmpleadores().subscribe(
        siHaceBien=>{

            siHaceBien.forEach(element => {
              //comparo el fk_empleador con el id de usuario
              if(element['id']== this.instanciaOfertaVer.fk_empleador){
                this.instanciaEmpleadorModelVer.nom_representante_legal=element['nom_representante_legal'];
                this.instanciaEmpleadorModelVer.direccion=element['direccion'];
                this.instanciaEmpleadorModelVer.fk_provincia=element['fk_provincia'];
                this.instanciaEmpleadorModelVer.fk_ciudad=element['fk_ciudad'];
                this.instanciaEmpleadorModelVer.actividad_ruc=element['actividad_ruc'];
                this.instanciaEmpleadorModelVer.tipo_empresa=element['tiposEmpresa'];
                this.instanciaEmpleadorModelVer.razon_empresa=element['razon_empresa'];
              }

            });

        },error=>{
          Swal('Info',error['mensaje'], 'info');
        });

      $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
      $('#exampleModal').modal('show');

    }
    cerrarModal(){
      $('#exampleModal').modal('hide');
    }
    //conversion de estado//3 es publicado
    estadoConversion(numeroEstado:Number):boolean{
      if(numeroEstado==2){
          return false;
      }
      if(numeroEstado==3){
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
    configurarParametrosDataTable(){
      this.dtOptions = dataTable;
    }
}
