import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';
import {environment} from 'src/environments/environment.prod';
declare var $:any;
@Component({
  selector: 'app-tabla-cursos-capacitaciones',
  templateUrl: './tabla-cursos-capacitaciones.component.html'
})
export class TablaCursosCapacitacionesComponent implements OnInit {
  ubicacionArchivo:string="";
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  @Input() instanciaCursosCapacitaciones:any=[];
  constructor() {
    this.configurarParametrosDataTable();
   }

  ngOnInit() {
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
    this.dtTrigger.next();
  }
  mostrarPdf(urlEvidencias){
    console.log(urlEvidencias);
    this.ubicacionArchivo =environment.dominio+"/Archivos/Cursos/"+urlEvidencias;
    console.log(this.ubicacionArchivo);
    $('#mostrarPDF').modal('show');
  }
}
