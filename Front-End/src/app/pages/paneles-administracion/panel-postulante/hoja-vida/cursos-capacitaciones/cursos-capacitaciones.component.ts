import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import { PaisesModel } from 'src/app/models/paises.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {PaisesService} from 'src/app/servicios/paises.service';
import Swal from 'sweetalert2';
import {environment} from 'src/environments/environment.prod';
declare var $:any;
@Component({
  selector: 'app-cursos-capacitaciones',
  templateUrl: './cursos-capacitaciones.component.html'
})
export class CursosCapacitacionesComponent implements OnInit {
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  //tabla data que consumo del servicio
  paises:PaisesModel[]=[];
  rutaArchivoPdf:string="";
  cursosCapacitaciones:CursosCapacitacionesModel[]=[];
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioCursosCapacitacione:CursosCapacitacionesService,private servicioPaises:PaisesService) { 
    
  }

  ngOnInit() {
    this.configurarParametrosDataTable();
    this.cargarTabla();
    this.cargarPaises();
  }

  cargarTabla(){
    //listamos los cursos academicos
    this.servicioCursosCapacitacione.listarCursosCapacitacionesExternal_us().subscribe(
      siHacesBien=>{
        this.cursosCapacitaciones =siHacesBien;
        console.log(this.cursosCapacitaciones);

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
   }

   buscarPais(idPais){
    let nombrePais="";
    this.paises.forEach(element => {
      if(element.id==parseInt(idPais)){
        console.log(element.nombre);
        nombrePais=element.nombre;
      }
    });
    return nombrePais;
   }
   mostrarPdf(urlEvidencias){
    console.log(urlEvidencias);

    this.rutaArchivoPdf=environment.dominio+"/Archivos/Cursos/"+urlEvidencias;
    // this.rutaArchivoPdf="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    $('#mostrarPDF').modal('show');
  }
   cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        //console.log(siHacesBien);
        //cargo array con la data para imprimir en la tabañ
        this.paises =siHacesBien;
   
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
   }
   eliminarCursosCapacitaciones(external_cu:string,nombreTitulo:string,nombreArchivoPDF:string,index:number){
    console.log(nombreArchivoPDF);
    console.log(external_cu);
    // ocupo el servicio

     Swal({
       title: 'Esta seguro?',
       text: "Se eliminara "+nombreTitulo,
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si'
     }).then((result) => {
       if (result.value) {
         this.instanciaCursosCapacitaciones=new CursosCapacitacionesModel();
         this.instanciaCursosCapacitaciones.estado=0;
         this.instanciaCursosCapacitaciones.evidencia_url=nombreArchivoPDF;
         this.instanciaCursosCapacitaciones.external_cu=external_cu;
         this.servicioCursosCapacitacione.eliminarCursoCapacitacion(this.instanciaCursosCapacitaciones).subscribe(
           siHaceBien=>{
             console.log("tpdp bnien");
             console.log(index);
             //elimino visualmente 
             this.cursosCapacitaciones.splice(index,1); //desde la posición 2, eliminamos 1 elemento
             Swal('Eliminado', 'El registro ha sido eliminada con Exito', 'success');
             console.log(siHaceBien);
           },(peroSiTenemosErro)=>{
             console.warn("TODO MAL");
             console.log(peroSiTenemosErro);
             Swal('Ups, No se puede realizar el registro'+peroSiTenemosErro['mensaje'], 'info')
           }
         );
       }
     })
    //alert("estoy eliminado");
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
