import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren  } from '@angular/core';
import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
import {logoUnl} from 'src/app/templatePdf/logoUnl';
import {logoCarrera} from 'src/app/templatePdf/logoCarrera';
import {estilosTablaResumenLayaut} from 'src/app/templatePdf/estilosTablaResumenLayaut';


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
    rows=[];
 
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

  generatePdf(){
    
    console.log(this.rows);
    //return;
    var documentDefinition = {
      //horienzacion vertical
      //pageSize: 'A5',

      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
     // pageMargins: [ 40, 60, 40, 60 ],
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
          layout: {
            defaultBorder: true,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 2;
            },
            hLineColor: function(i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 2;
            },
            paddingBottom: function(i, node) {
              return 2;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
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

  maquetarCabezeraTablaPdf(){
    this.rows.push(['#','Fecha','Oferta Laboral','Estado']);
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
      //this.itemTabla.push(['1', '20201-sa', '2020','correo@aa','activo']);
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
