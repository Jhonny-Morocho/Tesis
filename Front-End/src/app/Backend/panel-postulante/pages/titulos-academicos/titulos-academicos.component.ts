import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';
import {TituloService} from 'src/app/servicios/titulos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
declare var $:any;
import {environment} from 'src/environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
import {dataTable} from 'src/app/templateDataTable/configDataTable';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {
  rutaArchivoPdf:string="";
  instanciaTituloAcademico:TituloModel;
  //para imprimir la tabla
  dominio=environment;
  tituloAcademico:TituloModel[]=[];
  //frame
  ubicacionArchivo:string="";
  frameLimpio:any;
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioTitulo:TituloService,
            private sanitizer: DomSanitizer,
            private ruta_:Router) { }

  ngOnInit() {
    this.configurarParametrosDataTable();
    this.cargarTabla();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  mostrarPdf(urlEvidencias){
    this.ubicacionArchivo =environment.dominio+"/Archivos/Titulos/"+urlEvidencias;
    $('#mostrarPDF').modal('show');
  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioTitulo.listarTitulos().subscribe(
      siHacesBien=>{
        this.tituloAcademico =siHacesBien;
        //data table
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        Swal('Error',peroSiTenemosErro['mensaje'], 'info');
      }
    );
  }
   eliminarTitulo(external_ti:string,nombreTitulo:string,nombreArchivoPDF:string,index:number){
     // ocupo el servicio
      Swal({
        title: '¿ Esta seguro ?',
        text: "Se elimara el registro "+nombreTitulo,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this.instanciaTituloAcademico=new TituloModel();
          this.instanciaTituloAcademico.estado=0;
          this.instanciaTituloAcademico.evidencias_url=nombreArchivoPDF;
          this.instanciaTituloAcademico.external_ti=external_ti;
          this.servicioTitulo.eliminarTitulo(this.instanciaTituloAcademico).subscribe(
            siHaceBien=>{
              //elimino visualmente
              this.tituloAcademico.splice(index,1); //desde la posición 2, eliminamos 1 elemento
              const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 6000,

              });
              toast({
                type: 'success',
                title: 'El registro ha sido eliminado'
              })
            },(peroSiTenemosErro)=>{
              Swal('Ups',peroSiTenemosErro['mensaje'], 'info');
            }
          );
        }
      })
     //alert("estoy eliminado");
   }
   ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      try {
        this.dtTrigger.unsubscribe();
      } catch (error) {
        //le puse x q no uso suscripcion/mas info:/https://l-lin.github.io/angular-datatables/#/basic/angular-way

      }
    }

  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }

}


