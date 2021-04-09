import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var $:any;
@Component({
  selector: 'app-tabla-titulos-academicos',
  templateUrl: './tabla-titulos-academicos.component.html'
})
export class TablaTitulosAcademicosComponent implements OnInit {
  @Input() tituloAcademico:any={};
    //frame 
    frameLimpio:any;
    ubicacionArchivo:String="";
    dominio=environment;
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor() { 
    //this.configurarParametrosDataTable();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.dtTrigger.next();

  }
  ngOnInit() {

  
  }

  configurarParametrosDataTable(){
    this.dtOptions = {
      pagingType: 'full_numbers',

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
    this.ubicacionArchivo =environment.dominio+"/Archivos/Titulos/"+urlEvidencias;
    console.log(this.ubicacionArchivo);
    $('#mostrarPDFTitulos').modal('show');
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
}
