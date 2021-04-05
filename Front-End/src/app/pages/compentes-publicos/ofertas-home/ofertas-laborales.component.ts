import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { Subject } from 'rxjs';
import {environment} from 'src/environments/environment';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import {OfertaLaboralEstudianteModel} from 'src/app/models/oferLaboral-Estudiante.models';
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-postular-oferta-laboral',
  templateUrl: './ofertas-laborales.component.html'
})
export class PostularOfertaLaboralComponent implements OnInit {
  instanciaEmpleadorModelVer:EmpleadorModel;
  dominio=environment;
  instanciaOfertaEstudianteEstado:OfertaLaboralEstudianteModel;
  instanciaOfertLaboralEstudiante:OfertaLaboralEstudianteModel;
  booleanGestor:boolean=false;
  instanciaOfertaLaboralActualizar:OfertaLaboralModel;
  intanciaOfertaLaboral:OfertaLaboralModel;
  //array de data ofertas labarales
  ofertasLaborales:OfertaLaboralModel[];
//arrayOfertasPostuladasEstudaite
  arrayofertasPostuladasEstudiante:OfertaLaboralEstudianteModel[]=[];
  instanciaOfertaVer:OfertaLaboralModel;
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private servicioOferta:OfertasLaboralesService,
    private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
    private servicioEmpleador:SerivicioEmpleadorService,
    private ruta_:Router) { }
  
  ngOnInit() {

    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.instanciaOfertaEstudianteEstado=new OfertaLaboralEstudianteModel();
    this.instanciaOfertLaboralEstudiante=new OfertaLaboralEstudianteModel();
    this.instanciaOfertaLaboralActualizar=new OfertaLaboralModel();
    this.configurarParametrosDataTable();
    this.cargarTabla();
  }


  cargarTabla(){

    this.servicioOferta.listarOfertasValidadasGestor().subscribe(
      siHacesBien=>{
        console.info("TODO BIEN");
        // data table
        // cargamos los items o los requisitos
    
        this.ofertasLaborales =siHacesBien;
        console.log(this.ofertasLaborales);
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn("TODO MAL");
      }
      );
   }

   pintarRequisitos(i){
    $("#"+i).html(this.ofertasLaborales[i]['requisitos']);
    //console.log(this.ofertasLaborales[i]['requisitos']);
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

   
    //si esta en la tabla siginica que esta incrito
    //si es tru,entonces ya estoy postulando
    estadoPostulacion(idOferta:Number){
      let encontrado=false;
       this.arrayofertasPostuladasEstudiante.forEach(element => {
         if(element['fk_oferta_laboral']==idOferta){
           encontrado= true;
         }

       });
      return encontrado;
    }
    comprobarSiEstaRegistrado
    postular(externalOferta:string,nomOferta:string){
      console.log(externalOferta);
      console.log(nomOferta);
      return;
      Swal({
        title: 'Are you sure?',
        text: "Postular a "+nomOferta,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
      Swal({
        allowOutsideClick:false,
        type:'info',
        text:'Espere por favor'
        });
        Swal.showLoading();
        this.instanciaOfertLaboralEstudiante.estado=1;
        this.servicioOfertaEstudiante.postularOfertEstudiante(this.instanciaOfertLaboralEstudiante,externalOferta
        ).subscribe(
          siHacesBien=>{
            console.log(siHacesBien);
            let mensaje=(siHacesBien['mensaje']);
            console.log(mensaje);
            if(siHacesBien['Siglas']=='OE'){
              Swal('Guardado',mensaje,'success');
              this.cargarTabla();
              this.ngOnDestroy()

            }else{
              Swal('Informacion',mensaje,'info');
            }
          },error=>{
            let mensaje=error['mensaje'];
            console.log(error);
            Swal('Error',mensaje,'error');
          }
        );

        }
      })
      console.log(externalOferta);
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
          lengthMenu: "Mostrar _MENU_ elementos",
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
