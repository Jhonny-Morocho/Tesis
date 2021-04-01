import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import{environment} from 'src/environments/environment.prod';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-oferta-laboral',
  templateUrl: './oferta-laboral.component.html'
})
export class OfertaLaboralComponent implements OnInit {
  //visualizar informacion de empleador
  instanciaEmpleadorModelVer:EmpleadorModel;
  instanciaOfertaLaboralActualizar:OfertaLaboralModel;
  intanciaOfertaLaboral:OfertaLaboralModel;
  dominio=environment;
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

  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioOferta.listarOfertasLaboralesExternal_us().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
        this.ofertasLaborales =siHacesBien;
        console.log(this.ofertasLaborales);
        //data table
        //cargamos los items o los requisitos

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn("TODO MAL");
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
    console.log("click");
    //necesito converitr o typescrip me da error
    var index=parseInt((id).toString(), 10);  
    this.instanciaOfertaVer.puesto=this.ofertasLaborales[index]['puesto'];
    this.instanciaOfertaVer.requisitos=this.ofertasLaborales[index]['requisitos'];
    this.instanciaOfertaVer.descripcion=this.ofertasLaborales[index]['descripcion'];
    //consultamos los datos del empleador para presentarlos o imprimirlos
    this.servicioEmpleador.listarFormEmpleador().subscribe(
      siHaceBien=>{
          console.log(siHaceBien);
          this.instanciaEmpleadorModelVer.fk_ciudad=siHaceBien['mensaje']['fk_ciudad'];
          this.instanciaEmpleadorModelVer.direccion=siHaceBien['mensaje']['direccion'];
          this.instanciaEmpleadorModelVer.fk_provincia=siHaceBien['mensaje']['fk_provincia'];
          this.instanciaEmpleadorModelVer.actividad_ruc=siHaceBien['mensaje']['actividad_ruc'];
          this.instanciaEmpleadorModelVer.tipo_empresa=siHaceBien['mensaje']['tiposEmpresa'];
          this.instanciaEmpleadorModelVer.razon_empresa=siHaceBien['mensaje']['razon_empresa'];
          this.instanciaEmpleadorModelVer.nom_representante_legal=siHaceBien['mensaje']['nom_representante_legal'];
          
      },error=>{

        console.log(error);
      });
    
    $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
    console.log(this.instanciaOfertaVer.requisitos);
    $('#exampleModal').modal('show');
 
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
  eliminarOfertaLaboral(external_of:string,nombreTitulo:string,index:number){

    console.log(external_of);
    // ocupo el servicio

     Swal({
       title: '¿Esta seguro?',
       text: "Se eliminara  "+nombreTitulo,
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si'
     }).then((result) => {
       if (result.value) {
         this.instanciaOfertaLaboralActualizar.estado=0;
         this.instanciaOfertaLaboralActualizar.external_of=external_of;
         this.servicioOferta.eliminarOfertaLaboral(this.instanciaOfertaLaboralActualizar).subscribe(
           siHaceBien=>{
             console.log("tpdp bnien");
             console.log(index);
             //elimino visualmente 
             this.ofertasLaborales.splice(index,1); //desde la posición 2, eliminamos 1 elemento
             Swal('Eliminado', 'El registro ha sido eliminada con Exito', 'success');
             console.log(siHaceBien);
           },(peroSiTenemosErro)=>{
             console.warn("TODO MAL");
             console.log(peroSiTenemosErro);
             Swal('Ups, No se puede realizar el registro'+peroSiTenemosErro['mensaje'], 'info')
           }
         );
       }
     })
    //alert("estoy eliminado");

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
}
