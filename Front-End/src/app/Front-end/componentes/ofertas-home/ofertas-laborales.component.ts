import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import { Subject } from 'rxjs';
import {environment} from 'src/environments/environment';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import {OfertaLaboralEstudianteModel} from 'src/app/models/oferLaboral-Estudiante.models';
import { forEach } from '@angular/router/src/utils/collection';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
declare var JQuery:any;
declare var $:any;
//declare var DateTime:any;
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { NgForm } from '@angular/forms';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-postular-oferta-laboral',
  templateUrl: './ofertas-laborales.component.html'
})
export class PostularOfertaLaboralComponent implements OnInit,OnDestroy {
 // @ViewChild(DataTableDirective)
 @ViewChild(DataTableDirective)
  instanciaEmpleadorModelVer:EmpleadorModel;
  dominio=environment;
  instanciaOfertaEstudianteEstado:OfertaLaboralEstudianteModel;
  instanciaOfertLaboralEstudiante:OfertaLaboralEstudianteModel;
  booleanGestor:boolean=false;

  instanciaOfertaLaboralActualizar:OfertaLaboralModel;
  intanciaOfertaLaboral:OfertaLaboralModel;
  //array de data ofertas labarales
  ofertasLaborales:OfertaLaboralModel[];
  instanciaOfertaVer:OfertaLaboralModel;
  //data table
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  persons: any=[];
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  min: number=1;
  max: number=10;
  instanciaDataTable:any;
  // probnado con la data table el induo
  //dtOptions: DataTables.Settings = {};
  //datatable custom json data
  miData:any=[];


  constructor(private servicioOferta:OfertasLaboralesService,
    private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
    private servicioUsuario:AutenticacionUserService,
    private http: HttpClient,
    private servicioPostulante:SerivicioPostulanteService,
    private ruta_:Router) { }

  ngOnInit() {
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.instanciaOfertaEstudianteEstado=new OfertaLaboralEstudianteModel();
    this.instanciaOfertLaboralEstudiante=new OfertaLaboralEstudianteModel();
    this.instanciaOfertaLaboralActualizar=new OfertaLaboralModel();
    //this.configurarParametrosDataTable();
    // We need to call the $.fn.dataTable like this because DataTables typings do not have the "ext" property
    this.cargarTabla();
    this.demo();
  }

  demo(){
    //console.log($('#dataTables-example').DataTable());
    $.fn.dataTable.ext.search.push(
      function( settings, searchData, index, rowData, counter ) {
        console.log(searchData);
          if (settings.nTable.id !== 'myTarget'){
              return true;
          }
          var min = parseInt( $('#min').val(), 10 );
          var max = parseInt( $('#max').val(), 10 );
          var age = parseFloat( searchData[3] ) || 0; // using the data from the 4th column

          if ( ( isNaN( min ) && isNaN( max ) ) ||
               ( isNaN( min ) && age <= max ) ||
               ( min <= age   && isNaN( max ) ) ||
               ( min <= age   && age <= max ) )
          {
              return true;
          }
          return false;
      }
  );

  }

  filterById2(form:NgForm): void {
    console.log(form.value);
    console.log(this.demo());
    //this.demo();
     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
       //console.log(dtInstance);
       //dtInstance.destroy();
       dtInstance.draw();
     });
     //this.dtTrigger.next();
  }


  filterById(form:NgForm): void {
    console.log(form.value);
    if(form.invalid){
     // return;
    }

    // var v1 = $(this).val();  // getting search input value
    // console.log(v1);

  //   var table = $('#dataTables-example').DataTable( {
  //     ajax: 'https://proeditsclub.com/Tesis/Backend/public/index.php/ofertas-laborales/listarOfertasLaboralesValidadasGestor'
  // } );

  //var total=

  //$('#dataTables-example').ajax.url( this.persons).load();


   // this.cargarTabla();


  }



  cargarTabla2(){
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    // lengthMenu : [5, 10, 25],
    //   processing: true
    // };
  //Custom Filters by Datepicker


  }
    cargarTabla(){
      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [[10,25, 100, -1], [10,25, 100, "All"]],
        serverSide: true,
        processing: true,
        ajax:
        (dataTablesParameters: any, callback) => {
          this.http.post<DataTablesResponse>('https://angular-datatables-demo-server.herokuapp.com/',
              dataTablesParameters,{}
            ).subscribe(resp => {
                console.log(resp);
                this.miData=resp.data;
              that.persons = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });
        },
        columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
      };

    //   $(document).ready(function() {

    //        var minDate, maxDate;
    // var data=this.person;
    // console.log(data);

    // // Custom filtering function which will search data in column four between two values
    // $.fn.dataTable.ext.search.push(
    //     function( settings, data, dataIndex ) {
    //         var min = minDate.val();
    //         var max = maxDate.val();
    //         var date = new Date( data[4] );

    //         if (
    //             ( min === null && max === null ) ||
    //             ( min === null && date <= max ) ||
    //             ( min <= date   && max === null ) ||
    //             ( min <= date   && date <= max )
    //         ) {
    //             return true;
    //         }
    //         return false;
    //     }

    //     );
        // Create date inputs
      //    minDate = new DateTime($('#min'), {
      //      format: 'MMMM Do YYYY'
      //  });
      //  maxDate = new DateTime($('#max'), {
      //      format: 'MMMM Do YYYY'
      //  });

      //  // DataTables initialisation
      //  var table = $('#example').DataTable();

      //  // Refilter the table
      //  $('#min, #max').on('change', function () {
      //      table.draw();
      //  });

     //$('#dateadded1').on( 'change', function () {

          //var v1 = $('#dateadded1').val();  // getting search input value
         //var v1 = $(this).val();  // getting search input value
          //console.log(v1);
          //console.log(v1);

         // $('#dataTables-example').DataTable().columns(0).search(10).draw();
          //console.log( $('#dataTables-example').DataTable().columns(0).search(1).draw());
          //$('#dataTables-example').DataTable().columns(0).search(v2).draw();
      //} );


   //})

    //$(document).ready(function() {
      //var table = $('#dataTables-example').DataTable();

      // Event listener to the two range filtering inputs to redraw on input
     // $('#min, #max').keyup( function() {
       //   table.draw();
      //} );
  //} );
     // $('#dateadded1').on( 'change', function () {

        //var v1 = $('#dateadded1').val();  // getting search input value
       //var v1 = $(this).val();  // getting search input value
        //console.log(v1);
        //console.log(v1);
        //$('#dataTables-example').DataTable().columns(0).search(1).draw();
        //$('#dataTables-example').DataTable().columns(0).search(v2).draw();
     // } );
     // $('#dateadded2').on( 'change', function () {

        //var v1 = $('#dateadded1').val();  // getting search input value
        //var v2 = $(this).val();  // getting search input value
        //console.log(v1);
        //console.log(v2);
        //$('#dataTables-example').DataTable().columns(0).search(v2).draw();
        //$('#dataTables-example').DataTable().columns(0).search(v2).draw();
      //} );





     // $(document).ready(function() {
        //este si funciona
        // Setup - add a text input to each footer cell
        // $('#dataTables-example thead tr').clone(true).appendTo('#dataTables-example thead' );
        // $('#dataTables-example thead tr:eq(1) th').each( function (i) {
        //   console.log(i);
        //     var title = $(this).text();
        //     console.log(title);
        //     $(this).html( '<input type="text" placeholder="Search '+title+'" />' );

        //     $( 'input', this ).on( 'keyup change', function () {
        //       console.log(this);
        //         if ( $('#dataTables-example').DataTable().columns(i).search() !== this.value ) {

        //           $('#dataTables-example').DataTable()
        //                 .column(i)
        //                 .search( this.value )
        //                 .draw();
        //         }
        //     } );


    //} );







   }

   pintarRequisitos(i){
    $("#"+i).html(this.ofertasLaborales[i]['requisitos']);
    //console.log(this.ofertasLaborales[i]['requisitos']);
   }
   ngOnDestroy(): void {
    $.fn['dataTable'].ext.search.pop();
    // Do not forget to unsubscribe the event

    }


    postular(externalOferta:string,nomOferta:string){
      let estadoAutentificado=this.servicioUsuario.estaAutenticado();
      //verificar si ha iniciado session
      if(estadoAutentificado==true){
         //consultar si el usuario ya ha llenado el formulario de registro
          this.servicioPostulante.listarFormPostulante().subscribe(
            siHaceBien=>{
              // veridicar si el usuario tiene formulario regitrado
              if(siHaceBien['Siglas']=="OE"){
                //debe comprobar si esta aprabado el postulantes o valdiado su informacion
                if(parseInt(siHaceBien['mensaje']['estado'])==1){
                  console.log("SI PUEDE POSTULAR");
                  Swal({
                    title: '¿Está seguro?',
                    text: "Usted ha seleccionado la oferta "+nomOferta,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si'
                  }).then((result) => {
                    if (result.value) {
                  Swal({
                    allowOutsideClick:false,
                    type:'info',
                    text:'Espere por favor'
                    });
                    Swal.showLoading();
                    this.instanciaOfertLaboralEstudiante.estado=1;
                    this.instanciaOfertLaboralEstudiante.observaciones="";
                    this.servicioOfertaEstudiante.postularOfertEstudiante(this.instanciaOfertLaboralEstudiante,externalOferta
                    ).subscribe(
                      siHacesBien=>{
                        console.log(siHacesBien);
                        let mensaje=(siHacesBien['mensaje']);
                        console.log(mensaje);
                        if(siHacesBien['Siglas']=='OE'){
                          Swal('Guardado','Registro guardado','success');
                        }else{
                          Swal('Información',mensaje,'info');
                        }
                      },error=>{
                        let mensaje=error['mensaje'];
                        console.log(error);
                        Swal('Error',mensaje,'error');
                      }
                    );
                    }
                  })

                }else{
                  Swal('Información',
                      'No puede postular a está oferta por el momento, debe estar aprobado su formulario de registro',
                      'info');
                }
              }else{
                 Swal('Información','Debe completar el formulario de registro para  postular a las  ofertas laborales','info');

              }
            },siHaceMal=>{
              console.warn(siHaceMal);
              Swal('ERROR','ERROR','error');
            }
          );
      }else{
        Swal('Información','Debe iniciar su sesión ','info');
      }
    }
    configurarParametrosDataTable(){
      this.dtOptions = dataTable;
    }

}
