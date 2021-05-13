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

  dtOptions: DataTables.Settings = {};
  persons: any=[];
  datatableElement: DataTableDirective;
  min: number;
  max: number;
  // probnado con la data table el induo
  //dtOptions: DataTables.Settings = {};
  //datatable custom json data
public data = [
  {name: 'Ajay', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-20'},
  {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-17'},
  {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-17'},
  {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-17'},
  {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-14'},
  {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-13'},
  {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-13'},
  {name: 'Jas', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-11'},
  {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-09'},
  {name: 'therichpost', email: 'therichpost@gmail.com', website:'therichpost.com', date:'2020-07-01'},
];

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
    this.cargarTabla();
  }

  filterById(form:NgForm): void {
    console.log(form.value);


    $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
          var min = parseInt( $('#min').val(), 10 );
          console.log(min);
          var max = parseInt( $('#max').val(), 10 );
          console.log(max);
          var age = parseFloat( data[0] ) || 0; // use data for the age column
          console.log(age);

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

  $(document).ready(function() {
    //$('#dataTables-example').DataTable().columns(0).search(11).draw();
    var table = $('#dataTables-example').DataTable();

  // Event listener to the two range filtering inputs to redraw on input
  $('#min, #max').keyup( function() {
      table.draw();
  } );

  })
    //return;
    //console.log(this.datatableElement.dtInstance);
    //return;
    // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.draw()
    // });
  }
  cargarTabla2(){
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    // lengthMenu : [5, 10, 25],
    //   processing: true
    // };
  //Custom Filters by Datepicker

    $('.dateadded').on( 'change', function () {

      var v = $(this).val();  // getting search input value
      console.log(v);

      $('#dataTables-example').DataTable().columns(3).search(v).draw();
    } );

  }
    cargarTabla(){
  // We need to call the $.fn.dataTable like this because DataTables typings do not have the "ext" property
      // $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      //   console.log(data);
      //   const id = parseFloat(data[0]) || 0; // use data for the id column
      //   if ((isNaN(this.min) && isNaN(this.max)) ||
      //     (isNaN(this.min) && id <= this.max) ||
      //     (this.min <= id && isNaN(this.max)) ||
      //     (this.min <= id && id <= this.max)) {
      //     return true;
      //   }
      //   return false;
      // });
      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax:
        (dataTablesParameters: any, callback) => {
          that.http.post<DataTablesResponse>('https://angular-datatables-demo-server.herokuapp.com/',
              dataTablesParameters,{}
            ).subscribe(resp => {
                console.log(resp);

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

    //   $.fn.dataTable.ext.search.push(
    //     function( settings, data, dataIndex ) {
    //       console.log(data);
    //         var min = parseInt( $('#min').val(), 10 );
    //         var max = parseInt( $('#max').val(), 10 );
    //         var age = parseFloat( data[0] ) || 0; // use data for the age column

    //         if ( ( isNaN( min ) && isNaN( max ) ) ||
    //              ( isNaN( min ) && age <= max ) ||
    //              ( min <= age   && isNaN( max ) ) ||
    //              ( min <= age   && age <= max ) )
    //         {
    //             return true;
    //         }
    //         return false;
    //     }
    // );

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

        // Setup - add a text input to each footer cell
        $('#dataTables-example thead tr').clone(true).appendTo('#dataTables-example thead' );
        $('#dataTables-example thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            console.log(title);
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );

            $( 'input', this ).on( 'keyup change', function () {
              console.log(this);
                if ( $('#dataTables-example').DataTable().columns(i).search() !== this.value ) {
                  $('#dataTables-example').DataTable()
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            } );
       // } );
      //   var table = $('#dataTables-example').DataTable( {

      //     orderCellsTop: true,
      //     fixedHeader: true
      // } );

    } );



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
