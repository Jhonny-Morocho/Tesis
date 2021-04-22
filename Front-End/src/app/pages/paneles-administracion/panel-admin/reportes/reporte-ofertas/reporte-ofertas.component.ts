import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
//pdf make
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//template pdf
import {logoUnl} from 'src/app/templatePdf/logoUnl';
import {logoCarrera} from 'src/app/templatePdf/logoCarrera';
import {estilosTablaPrincipalLayaut} from 'src/app/templatePdf/estilosTablaPrincipalLayaut';
import {estilosTablaResumenLayaut} from 'src/app/templatePdf/estilosTablaResumenLayaut';

import {ReporteOfertaModel} from 'src/app/models/reporteOfertas.models';
import {OfertasFiltroModel} from 'src/app/models/filtro-ofertas.models';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-reporte-ofertas',
  templateUrl: './reporte-ofertas.component.html'
})
export class ReporteOfertasComponent implements OnInit {
  rows=[];
  itemTabla:any=[];
  instanciaFiltro:OfertasFiltroModel;
  intanciaReporte:ReporteOfertaModel[]=[];
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.instanciaFiltro=new OfertasFiltroModel();
    this.configurarParametrosDataTable();
    this.cargarTablaReporte();
  }
  maquetarCabezeraTablaPdf(){
    this.rows.push(
                    [
                    '#',
                    'Fecha',
                    'Oferta Laboral',
                    'Estado',
                    '#Postulantes',
                    '#Desvinculados',
                    '#No contratados',
                    '#Contratados'
                    ]
                  );
  }
  generatePdf(){
    var documentDefinition = {
        //horientacion vertical
    pageOrientation: 'landscape',
      //end horientacion vertical
    content: [
          {
            columns: [
               {
                 image:logoUnl,
                 width: 180,
                 height:60
               },
              [
                {
                  image:logoCarrera,
                  width: 175,
                  height:60,
                  alignment: 'right',
                  margin: [0, 0, 0, 15],
                },
              ],
            ],
          },

          '\n\n',
          {
            width: '100%',
            alignment: 'center',
            text: 'FACULTAD DE LA ENERGÍA LAS INDUSTRIAS Y LOS RECURSOS NO RENOVABLES',
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15,
          },
          '\n\n',
          {
            width: '100%',
            alignment: 'center',
            text: 'REPORTE DE OFERTAS LABORALES',
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15,
          },
          '\n',
        {
          layout:estilosTablaPrincipalLayaut,
          table: 
          { 
            width: '100%',
            body: this.rows
          }
        },
          
    '\n',
    '\n\n',
    {
      layout: estilosTablaResumenLayaut,
      table: {
        headerRows: 1,
        widths: ['*', 'auto'],
        body: [
          [
            {
              text: 'Ofertas no validadas',
              border: [false, true, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
            {
              border: [false, true, false, true],
              text: '$999.99',
              alignment: 'right',
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5],
            },
          ],
          [
            {
              text: 'Ofertas Revisadas',
              border: [false, true, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
            {
              border: [false, true, false, true],
              text: '$999.99',
              alignment: 'right',
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5],
            },
          ],
          [
            {
              text: 'Ofertas Publicadas',
              border: [false, true, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
            {
              border: [false, true, false, true],
              text: '$999.99',
              alignment: 'right',
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5],
            },
          ],
          [
            {
              text: 'Ofertas Finalizadas',
              border: [false, false, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
            {
              text: '$999.99',
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              alignment: 'right',
              margin: [0, 5, 0, 5],
            },
          ]
        ],
      },
    },
    '\n\n',
      {
        text: 'Firma: .............................................................',
        style: 'notesTitle',
      },
      '\n\n',
      {
        text: 'Módulo de software para la Vinculación Laboral de Actores de la Carrera de \n  Ingeniería en Sistemas/Computación.',
        style: 'notesText',
      },
    ],
        
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };
      
    pdfMake.createPdf(documentDefinition).open();
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
  filtrarDatosFecha(fechade:String,fechaHasta:String,estado:Number){
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
  estadoOferta(estado:Number,observaciones:String){
    if(observaciones.length==0 && estado==1){
      return "No validado";
    }
    if(observaciones.length>0 && estado==2){
      return "Validado";
    }
    if(estado==3){
      return "Publicado";
    }
    if(estado==4){
      return "Finalizado";
    }
    if(observaciones.length>0 && estado==1){
      return "Revisado";
    }

  }
  cargarTablaReporte(){
    this.servicioOfertaEstudiante.reportOfertaEstudiante().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        this.intanciaReporte=siHacesBien;
        //reporte
        let contador=1;
        this.rows=[];
        this.maquetarCabezeraTablaPdf();
        this.intanciaReporte.forEach(element => {
          console.log(element);
            this.rows.push([
                           contador,
                           this.datePipe.transform(element['updatedAtOferta'],"yyyy-MM-dd"), 
                           element['puesto'], 
                           this.estadoOferta(element['estadoValidacionOferta'],element['obervaciones']), 
                           element['numeroPostulantes'], 
                           element['desvinculados'], 
                           element['noContratados'], 
                           element['contratados']
                          ]);
            contador++;
       });
        this.dtTrigger.next();
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );

  }

  reiniciarValoresTablaOfertas(){
    this.dtTrigger.unsubscribe();
    this.configurarParametrosDataTable();
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
