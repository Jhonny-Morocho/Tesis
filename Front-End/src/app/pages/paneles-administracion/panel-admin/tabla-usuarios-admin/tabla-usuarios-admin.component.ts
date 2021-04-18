import { Component, OnInit } from '@angular/core';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
//import {} from 'src/app/servicios/';
@Component({
  selector: 'app-tabla-usuarios-admin',
  templateUrl: './tabla-usuarios-admin.component.html'
})
export class TablaUsuariosAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(private servicioUsuario:AutenticacionUserService) { }

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
  }
  cargarTabla(){
    //listamos los titulos academicos
    
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
