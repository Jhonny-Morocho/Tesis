import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren  } from '@angular/core';

import { Router } from '@angular/router';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import {OfertasFiltroModel} from 'src/app/models/filtro-ofertas.models';

declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-tabla-validar-ofertas-laborales',
  templateUrl: './tabla-validar-ofertas-laborales.component.html'
})
export class TablaValidarOfertasLaboralesComponent implements OnDestroy,OnInit  {
   //@ViewChild(DataTableDirective, {static: false})
   @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    //visualizar informacion de empleador
    instanciaEmpleadorModelVer:EmpleadorModel;
    booleanGestor:boolean=false;
    instanciaOfertaLaboralActualizar:OfertaLaboralModel;
    intanciaOfertaLaboral:OfertaLaboralModel;
    //array de data ofertas labarales
    ofertasLaborales:OfertaLaboralModel[]=[];
    cabezeratableTH:any=[];
    itemTabla:any=[];
    column:any;
    value:any;
 
    instanciaOfertaVer:OfertaLaboralModel;
    instanciaFiltro:OfertasFiltroModel;
    //data table
    //filtros personalizados con codigo
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    //Probando nuevos codigo para renicnair dat table

    constructor(private servicioOferta:OfertasLaboralesService,
    private datePipe: DatePipe,
    private servicioEmpleador:SerivicioEmpleadorService,

    private ruta_:Router) { }

  
  ngOnInit() {
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.instanciaOfertaLaboralActualizar=new OfertaLaboralModel();
    this.instanciaFiltro=new OfertasFiltroModel();
    this.configurarParametrosDataTable();
    this.cargarTodasOfertas();
  }


  filtrarOfertas(formFiltro:NgForm){
    console.log(formFiltro);
    if(formFiltro.invalid){

      return;
    }
    if(this.instanciaFiltro.estado==0){
      this.reiniciarValoresTablaOfertas();
    }else{
      this.filtrarDatosFecha(this.instanciaFiltro.de,
        this.instanciaFiltro.hasta,this.instanciaFiltro.estado);
    }
  }
  cargarTodasOfertas(){
  //listamos todas las ofertas
  this.servicioOferta.listarTodasLasOfertas().subscribe(
    siHacesBien=>{
      console.log("TODO BIEN");
      this.ofertasLaborales =siHacesBien;
      console.log(this.ofertasLaborales);
        //reportes
      this.dtTrigger.next();
    },
    (peroSiTenemosErro)=>{
      console.warn(peroSiTenemosErro);
    }
  );
  console.log(this.itemTabla);
  }

  verOfertaModal(id:Number){
    //necesito converitr o typescrip me da error
    var index=parseInt((id).toString(), 10); 
    this.instanciaOfertaVer.puesto=this.ofertasLaborales[index]['puesto'];
    this.instanciaOfertaVer.requisitos=this.ofertasLaborales[index]['requisitos'];
    this.instanciaOfertaVer.descripcion=this.ofertasLaborales[index]['descripcion'];
    this.instanciaOfertaVer.fk_empleador=this.ofertasLaborales[index]['fk_empleador'];
    this.instanciaOfertaVer.razon_empresa=this.ofertasLaborales[index]['razon_empresa'];
    this.instanciaOfertaVer.obervaciones=this.ofertasLaborales[index]['obervaciones'];
    this.instanciaOfertaVer.correo=this.ofertasLaborales[index]['correo'];
    
    //obtengo todos los usuarios 
    this.servicioEmpleador.listarEmpleadores().subscribe(
      siHaceBien=>{
          console.log(siHaceBien);
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
        console.log(error);
      });
    
    $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
    $('#exampleModal').modal('show');
  }

  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
  reiniciarValoresTablaOfertas(){
    this.dtTrigger.unsubscribe();
    this.configurarParametrosDataTable();
    this.cargarTodasOfertas();
  }

  filtrarDatosFecha(fechade:String,fechaHasta:String,estado:Number){
    console.log(fechade);
    console.log(fechaHasta);
    console.log(estado);
    this.servicioOferta.listarTodasLasOfertas().subscribe(
      siHacesBien=>{
        //creamos una arreglo auxiliar
        let aux=[];
        //recorreo todo el array y compara los datos
        siHacesBien.forEach(element => {
            if(fechade<=this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") && 
              fechaHasta>= this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
              estado==element['estado'] && estado!=9 && (element['obervaciones']).length>0){
              aux.push(element);
              console.log("xx");
            }
            //no validado
            if(fechade<=this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") && 
            fechaHasta>= this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
             estado==9 && (element['obervaciones']).length==0){
            aux.push(element);
            console.log("xx");
            }
        });
        this.ofertasLaborales=aux;
        this.dtTrigger.unsubscribe();
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn(peroSiTenemosErro);
      }
    );
  }
 
   
    //conversion de estado
  estadoConversion(numeroEstado:Number):boolean{
    if(numeroEstado==1){
        return false;
    }
    if(numeroEstado==2){
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
    //si el tipo de usuario es un gestor entonces el puede solo ver los validados
  
  configurarParametrosDataTable(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
        /* below is the relevant part, e.g. translated to spanish */ 
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
