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
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {ReporteOfertaModel} from 'src/app/models/reporteOfertas.models';
import {OfertasFiltroModel} from 'src/app/models/filtro-ofertas.models';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import { NgForm } from '@angular/forms';
import { OfertaLaboralModel } from '../../../../../models/oferta-laboral.models';
import { SerivicioEmpleadorService } from '../../../../../servicios/servicio-empleador.service';
import { OfertaLaboralEstudianteModel } from 'src/app/models/oferLaboral-Estudiante.models';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
declare var $:any;
@Component({
  selector: 'app-reporte-ofertas',
  templateUrl: './reporte-ofertas.component.html'
})
export class ReporteOfertasComponent implements OnInit {
  instanciaOfertaVer:OfertaLaboralModel;
  instanciaEmpleadorModelVer:EmpleadorModel;
  existeRegistros:boolean=false;
  arrayOfertaPostulante:OfertaLaboralEstudianteModel[]=[];
  //reporte
  rowsItemsReporteOfertas=[];
  rowsItemsReporteOfertasEstudiante=[];
  rowsResumenTabla=[];
  //filtrar
  instanciaFiltro:OfertasFiltroModel;
  intanciaReporte:ReporteOfertaModel[]=[];
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private servicioEmpelador:SerivicioEmpleadorService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.instanciaFiltro=new OfertasFiltroModel();
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.configurarParametrosDataTable();
    this.cargarTablaReporteOfertas();
  }
  maquetarCabezeraTablaOfertaLaboralesPdf(){
    let arrayCabezera=[
                      '#',
                      'Fecha',
                      'Empleador',
                      'Oferta Laboral',
                      'Estado',
                      'Inscritos',
                      'Rechazados',
                      'No Aprobados',
                      'Aprobados'
                      ];
    return arrayCabezera;
  }
  maquetarCabezeraTablaOfertaLaboraleEstudiantePdf(){
    let arrayCabezera=[
                      '#',
                      'Fecha',
                      'Postulante',
                      'Correo',
                      'Estado'
                      ];
    return arrayCabezera;
  }
  resumenTabla(noVal:number,rev:number,publ:number,final:number){
    let array=
  [
    //no validadas
    [
      {
        text: 'Ofertas no validadas',
        border: [false, true, false, true],
        alignment: 'right',
        margin: [0, 5, 0, 5],
      },
      {
        border: [false, true, false, true],
        text: noVal,
        alignment: 'right',
        fillColor: '#f5f5f5',
        margin: [0, 5, 0, 5],
      },
    ],
    //revisadas
    [
      {
        text: 'Ofertas Revisadas',
        border: [false, true, false, true],
        alignment: 'right',
        margin: [0, 5, 0, 5],
      },
      {
        border: [false, true, false, true],
        text: rev,
        alignment: 'right',
        fillColor: '#f5f5f5',
        margin: [0, 5, 0, 5],
      }
    ],
    //publicadas
    [
      {
        text: 'Ofertas Publicadas',
        border: [false, true, false, true],
        alignment: 'right',
        margin: [0, 5, 0, 5],
      },
      {
        border: [false, true, false, true],
        text: publ,
        alignment: 'right',
        fillColor: '#f5f5f5',
        margin: [0, 5, 0, 5],
      }
    ],
    //finalizadas
    [
      {
        text: 'Ofertas Finalizadas',
        border: [false, false, false, true],
        alignment: 'right',
        margin: [0, 5, 0, 5],
      },
      {
        text: final,
        border: [false, false, false, true],
        fillColor: '#f5f5f5',
        alignment: 'right',
        margin: [0, 5, 0, 5],
      }
    ]
  ];

  return array;

  }
  generatePdfOfertas(){
    var documentDefinition =
    {
      //horientacion vertical
      pageOrientation: 'landscape',
        //end horientacion vertical
      content:
      [
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
            body: this.rowsItemsReporteOfertas
          }
        },

      '\n',
      '\n\n',
      //contador resuemen de la ofertas
      {
        layout: estilosTablaResumenLayaut,
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body:this.rowsResumenTabla,
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
      //end content
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

  verOfertaLaboral(id:Number){
    var index=parseInt((id).toString(), 10);
    this.instanciaOfertaVer.puesto=(this.intanciaReporte[index]['puesto']).toString();
    this.instanciaOfertaVer.requisitos=this.intanciaReporte[index]['requisitos'];
    this.instanciaOfertaVer.descripcion=this.intanciaReporte[index]['descripcion'];
    $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
    this.instanciaOfertaVer.fk_empleador=this.intanciaReporte[index]['fk_empleador'];
    this.instanciaOfertaVer.razon_empresa=(this.intanciaReporte[index]['empleador']).toString();
    this.instanciaOfertaVer.obervaciones=(this.intanciaReporte[index]['obervaciones']).toString();
    this.instanciaOfertaVer.correo=this.intanciaReporte[index]['correo'];
    //obtengo el external_of
    this.instanciaOfertaVer.external_of=this.intanciaReporte[index]['external_of'];
    this.estudiantesOfertaLaboral(this.instanciaOfertaVer.external_of);
    //obtengo todos los usuarios
    this.servicioEmpelador.listarEmpleadores().subscribe(
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
    $('#verOfertaReporte').modal('show');

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
            //ver todos
            if(fechade<=this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
                fechaHasta>= this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
                  estado==0 ){
            aux.push(element);
            console.log("xx");
            }
        });
        this.intanciaReporte=aux;
        //genero el reporte con el nuevo array de la busqueda
        this.contruirDatosPdfReporteOfertas(this.intanciaReporte);
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

  contruirDatosPdfReporteOfertas(reporteModelArray:ReporteOfertaModel[]){
      //reporte
      let contador=1;
      let numOfertasNoValidas=0;
      let numOfertValidadas=0;
      let numOfertasPublicadas=0;
      let numOfertasFinalizadas=0;
      let numOfertRevisadas=0;
      //establesco la cabezerqa siempre al inicio de la tabla el primer elemento
      this.rowsItemsReporteOfertas=[];
      this.rowsItemsReporteOfertas.unshift(this.maquetarCabezeraTablaOfertaLaboralesPdf());
      console.log(this.rowsItemsReporteOfertas);
      //return;
      console.log(this.maquetarCabezeraTablaOfertaLaboralesPdf());
      reporteModelArray.forEach(element => {
        //cargo la tabla para generar reporte
        this.rowsItemsReporteOfertas.push([
                        contador,
                        this.datePipe.transform(element['updatedAtOferta'],"yyyy-MM-dd"),
                        element['empleador'],
                        element['puesto'],
                        this.estadoOferta(element['estadoValidacionOferta'],element['obervaciones']),
                        element['numeroPostulantes'],
                        element['desvinculados'],
                        element['noContratados'],
                        element['contratados']
                      ]);
        contador++;
        //catadores de ofertas
        if((element['obervaciones']).length==0 && element['estadoValidacionOferta']==1){
          numOfertasNoValidas ++;
        }
        if((element['obervaciones']).length>0 && element['estadoValidacionOferta']==2){
          numOfertValidadas ++;
        }
        if(element['estadoValidacionOferta']==3){
          numOfertasPublicadas++;
        }
        if(element['estadoValidacionOferta']==4){
          numOfertasFinalizadas++;
        }
        if((element['obervaciones']).length>0 && element['estadoValidacionOferta']==1){
          numOfertRevisadas++;
        }
     });
      //asigno los contadores de resumen al documento
      this.rowsResumenTabla=this.resumenTabla(
                        numOfertasNoValidas,
                        numOfertRevisadas,
                        numOfertasPublicadas,
                        numOfertasFinalizadas
                        );
  }
  contruirDatosPdfReporteOfertaEstudiante(reporteModelArray:OfertaLaboralEstudianteModel[]){
      //reporte
      let contador=1;
      let estadoOferta="";
      //establesco la cabezerqa siempre al inicio de la tabla el primer elemento
      this.rowsItemsReporteOfertasEstudiante=[];
      this.rowsItemsReporteOfertasEstudiante.unshift(this.maquetarCabezeraTablaOfertaLaboraleEstudiantePdf());
      console.log(this.maquetarCabezeraTablaOfertaLaboraleEstudiantePdf());
      reporteModelArray.forEach(element => {
        console.log(element);
        //cargo la tabla para generar reporte
        if(element['estado']==0){
          estadoOferta="Rechazado";
        }
        if(element['estado']==1){
          estadoOferta="Postulando";
        }
        if(element['estado']==2){
          estadoOferta="Contratado";
        }
        this.rowsItemsReporteOfertasEstudiante.push([
                        contador,
                        this.datePipe.transform(element['created_at'],"yyyy-MM-dd"),
                        element['nombre']+" "+element['apellido'],
                        element['correo'],
                        estadoOferta
                      ]);
        contador++;
        //catadores de ofertas
     });
  }
  cargarTablaReporteOfertas(){
    this.servicioOfertaEstudiante.reportOfertaEstudiante().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        this.intanciaReporte=siHacesBien;
        this.contruirDatosPdfReporteOfertas(this.intanciaReporte);
        this.dtTrigger.next();
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );

  }
  //listamos todos los estudiantes que este postulando a esta oferta laboral
  estudiantesOfertaLaboral(external_of:string){
    this.servicioOfertaEstudiante.resumenOfertaEstudiantesFinalizada_external_of(external_of).subscribe(
      siHaceBien=>{
        console.log(siHaceBien);
        this.arrayOfertaPostulante=siHaceBien;
        console.log(this.arrayOfertaPostulante.length);
        //construyo la tabla con los postulantes inscritos en la oferta
        this.contruirDatosPdfReporteOfertaEstudiante(this.arrayOfertaPostulante);

        if(this.arrayOfertaPostulante.length>0){
          this.existeRegistros=true;
        }
      },error=>{
        console.log(error);
      }
    );
  }
  generatePdfOfertasPostulante(puestoOferta:string){
    var documentDefinition =
    {
      //horientacion vertical
      pageOrientation: 'landscape',
        //end horientacion vertical
      content:
      [
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
          text: 'REPORTE DE POSTULANTES INSCRITOS EN LA OFERTA LABORAL ',
          bold: true,
          uppercase: true,
          margin: [0, 10, 0, 10],
          fontSize: 15,
        },
        '\n',
        {
          width: '100%',
          alignment: 'center',
          text: puestoOferta,
          bold: true,
          uppercase: true,
          margin: [0, 10, 0, 10],
          fontSize: 15,
        },
        '\n',
        {
          layout:estilosTablaPrincipalLayaut,
          table:
          {
            width: '100%',
            body: this.rowsItemsReporteOfertasEstudiante
          }
        },
      '\n',
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
      //end content
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
  reiniciarValoresTablaOfertas(){
    this.dtTrigger.unsubscribe();
    this.configurarParametrosDataTable();
    this.cargarTablaReporteOfertas();
  }
  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
