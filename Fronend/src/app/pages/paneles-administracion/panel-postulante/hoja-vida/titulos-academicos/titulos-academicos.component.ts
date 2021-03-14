import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';
//import { NgForm } from '@angular/forms';
import {TituloService} from 'src/app/servicios/titulos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { isEmpty } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

//import {} from '';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {


  instanciaTituloAcademico:TituloModel;
  //para imprimir la tabla
  tituloAcademico:TituloModel[]=[];
  urlEvidencias:string;
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioTitulo:TituloService,private ruta_:Router) { }

  ngOnInit() {

    this.cargarTabla();

   //instancia de titulomodel //debo inicializarlos//si no coloco esto no me inserta en la bd
  }

  cargarTabla(){
    //listamos los titulos academicos
    this.servicioTitulo.listarTitulos().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
        this.tituloAcademico =siHacesBien;
        console.log(this.tituloAcademico);
        //data table
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn("TODO MAL");
      }
    );
   }
   eliminarTitulo(external_ti:string,nombreTitulo:string,nombreArchivoPDF:string,index:number){
     console.log(nombreArchivoPDF);
     console.log(external_ti);
     // ocupo el servicio
    
      Swal({
        title: 'Are you sure?',
        text: "Esta seguro que desea borrar el Titulo "+nombreTitulo,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.instanciaTituloAcademico=new TituloModel();
          this.instanciaTituloAcademico.estado=0;
          this.instanciaTituloAcademico.evidencias_url=nombreArchivoPDF;
          this.instanciaTituloAcademico.external_ti=external_ti;
          this.servicioTitulo.eliminarTitulo(this.instanciaTituloAcademico).subscribe(
            siHaceBien=>{
              console.log("tpdp bnien");
              console.log(index);
              //elimino visualmente 
              this.tituloAcademico.splice(index,1); //desde la posición 2, eliminamos 1 elemento
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


