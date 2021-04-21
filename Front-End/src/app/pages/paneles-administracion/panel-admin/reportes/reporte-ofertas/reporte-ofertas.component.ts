import { Component, OnInit } from '@angular/core';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import{OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import {ReporteOfertaModel} from 'src/app/models/reporteOfertas.models';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
@Component({
  selector: 'app-reporte-ofertas',
  templateUrl: './reporte-ofertas.component.html'
})
export class ReporteOfertasComponent implements OnInit {
  ofertasLaborales:OfertaLaboralModel[]=[];
  rows=[];
  itemTabla:any=[];
  intanciaReporte:ReporteOfertaModel[]=[];
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOferta:OfertasLaboralesService,
              private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private datePipe: DatePipe) { }

  ngOnInit() {
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
