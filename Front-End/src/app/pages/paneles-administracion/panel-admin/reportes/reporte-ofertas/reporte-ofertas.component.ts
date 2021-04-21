import { Component, OnInit } from '@angular/core';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import{OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import {ReporteOfertaModel} from 'src/app/models/reporteOfertas.models';
import {OfertasFiltroModel} from 'src/app/models/filtro-ofertas.models';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reporte-ofertas',
  templateUrl: './reporte-ofertas.component.html'
})
export class ReporteOfertasComponent implements OnInit {
  ofertasLaborales:OfertaLaboralModel[]=[];
  rows=[];
  itemTabla:any=[];
  instanciaFiltro:OfertasFiltroModel;
  intanciaReporte:ReporteOfertaModel[]=[];
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOferta:OfertasLaboralesService,
              private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.instanciaFiltro=new OfertasFiltroModel();
    this.configurarParametrosDataTable();
    this.cargarTablareporte();
  }
  maquetarCabezeraTablaPdf(){
    this.rows.push(['#','Fecha','Oferta Laboral','Estado']);
  }
  cargarTodasOfertas(){
    //listamos todas las ofertas
    this.servicioOferta.listarTodasLasOfertas().subscribe(
      siHacesBien=>{
        console.log("TODO BIEN");
        this.ofertasLaborales =siHacesBien;
        console.log(this.ofertasLaborales);
          //reportes
          let contador=1;
          this.rows=[];
          this.maquetarCabezeraTablaPdf();
          this.ofertasLaborales.forEach(element => {
             console.log(element);
               this.rows.push([contador,
                              this.datePipe.transform(element['updated_at'],"yyyy-MM-dd"), 
                              element['puesto'], 
                              element['estado']]);
               contador++;
          });
  
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn(peroSiTenemosErro);
      }
    );
    console.log(this.itemTabla);
  }
  generatePdf(){

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
  private filtrarDatosFecha(fechade:String,fechaHasta:String,estado:Number){
    console.log(fechade);
    console.log(fechaHasta);
    console.log(estado);
    this.servicioOfertaEstudiante.reportOfertaEstudiante().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        //creamos una arreglo auxiliar
        let aux=[];
        //recorreo todo el array y compara los datos
        siHacesBien.forEach(element => {
            if(fechade<=this.datePipe.transform(element['updatedAtOferta'],"yyyy-MM-dd") && 
              fechaHasta>= this.datePipe.transform(element['updatedAtOferta'],"yyyy-MM-dd") &&
              estado==element['estadoValidacionOferta'] && estado!=9 && (element['obervaciones']).length>0){
              aux.push(element);
              console.log("xx");
            }
            //no validado
            if(fechade<=this.datePipe.transform(element['updatedAtOferta'],"yyyy-MM-dd") && 
            fechaHasta>= this.datePipe.transform(element['updatedAtOferta'],"yyyy-MM-dd") &&
             estado==9 && (element['obervaciones']).length==0){
            aux.push(element);
            console.log("xx");
            }
        });
        this.intanciaReporte=aux;
        this.dtTrigger.unsubscribe();
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn(peroSiTenemosErro);
      }
    );
  }
  cargarTablareporte(){
    this.servicioOfertaEstudiante.reportOfertaEstudiante().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        this.intanciaReporte=siHacesBien;
        this.dtTrigger.next();
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );

  }

  reiniciarValoresTablaOfertas(){
    this.dtTrigger.unsubscribe();
    this.configurarParametrosDataTable();
    this.cargarTodasOfertas();
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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
