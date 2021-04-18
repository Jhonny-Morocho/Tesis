import { Component, OnInit } from '@angular/core';
import {SerivicioDocente} from 'src/app/servicios/docente.service';
import {DocenteModel} from 'src/app/models/docente.models';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tabla-usuarios-admin',
  templateUrl: './tabla-usuarios-admin.component.html'
})
export class TablaUsuariosAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  arrayDocentes:DocenteModel[]=[];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private SerivicioDocente:SerivicioDocente) { }

  ngOnInit() {
    this.configurarParametrosDataTable();
    this.cargarTabla();
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
  cargarTabla(){
    //listar todos los usuarioas admistradores
    this.SerivicioDocente.listarDocentes().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        this.arrayDocentes=siHacesBien;
        this.dtTrigger.next();
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );
    
  //   this.servicioOferta.listarOfertasValidadasEncargado().subscribe(
  //     siHacesBien=>{
  //       console.warn("TODO BIEN");
  //       this.ofertasLaborales =siHacesBien;
  //       console.log(this.ofertasLaborales);
  //       this.dtTrigger.next();
  //     },
  //     (peroSiTenemosErro)=>{
  //       console.warn("TODO MAL");
  //     }
  //   );
  //  }
  }
}
