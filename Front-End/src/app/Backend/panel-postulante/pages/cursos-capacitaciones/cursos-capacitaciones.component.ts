import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {PaisesService} from 'src/app/servicios/paises.service';
import Swal from 'sweetalert2';
import {environment} from 'src/environments/environment.prod';
import { PaisesModel } from 'src/app/models/paises.models';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
import { FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-cursos-capacitaciones',
  templateUrl: './cursos-capacitaciones.component.html'
})
export class CursosCapacitacionesComponent implements OnInit {
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  //frame
  frameLimpio:any;
  ubicacionArchivo:String="";
  dominio=environment;
  formRegistroTitulo:FormGroup;
  //tabla data que consumo del servicio
  paises:PaisesModel[]=[];
  rutaArchivoPdf:string="";
  cursosCapacitaciones:CursosCapacitacionesModel[]=[];
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioCursosCapacitacione:CursosCapacitacionesService,
              private formBuilder:FormBuilder,
              private servicioPaises:PaisesService) {


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
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        Swal('Error',peroSiTenemosErro['mensaje'], 'error');
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
    this.ubicacionArchivo =environment.dominio+"/Archivos/Cursos/"+urlEvidencias;
    $('#mostrarPDF').modal('show');
  }
   cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        //cargo array con la data para imprimir en la tabañ
        this.paises =siHacesBien;

      },
      (peroSiTenemosErro)=>{
        Swal('Error',peroSiTenemosErro['mensaje'], 'error');
      }
    );
   }
   eliminarCursosCapacitaciones(external_cu:string,nombreTitulo:string,nombreArchivoPDF:string,index:number){
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
             //elimino visualmente
             this.cursosCapacitaciones.splice(index,1); //desde la posición 2, eliminamos 1 elemento
             Swal('Eliminado', 'El registro ha sido eliminada con Exito', 'success');
           },(peroSiTenemosErro)=>{

             Swal('Ups',peroSiTenemosErro['mensaje'], 'info')
           }
         );
       }
     })
    //alert("estoy eliminado");
  }
  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }

}
