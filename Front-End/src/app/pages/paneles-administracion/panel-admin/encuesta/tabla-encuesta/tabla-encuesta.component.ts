import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import {Encuesta} from 'src/app/servicios/encuesta.service';
import { EncuestaModel } from '../../../../../models/encuesta.models';
//import * as Survey from "survey-jquery";

@Component({
  selector: 'app-tabla-encuesta',
  templateUrl: './tabla-encuesta.component.html'
})
export class TablaEncuestaComponent implements OnInit {
  //data table
  dtOptions: DataTables.Settings = {};
  arrayEncuestas:EncuestaModel[]=[];
  dtTrigger: Subject<any> = new Subject<any>();
  // ============ encuesta ============
  constructor(private servicioEncuesta:Encuesta) { }

  ngOnInit() {
    this.configurarParametrosDataTable();
    this.cargarTabla();


  }

 
// ================================
  crearEncuesta(){
    Swal({
      title: 'Nueva encuesta',
      text: "Ingrese el nombre de la nueva encuesta",
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.value) {
        Swal({
          allowOutsideClick: false,
          type: 'info',
          text: 'Espere por favor...'
        });
        Swal.showLoading();
      }
    })
  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioEncuesta.listarTodasEncuestas().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
        this.arrayEncuestas =siHacesBien;
        console.log(this.arrayEncuestas);
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn(peroSiTenemosErro);
      }
    );
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

}

