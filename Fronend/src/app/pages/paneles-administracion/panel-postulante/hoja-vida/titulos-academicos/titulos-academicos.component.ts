import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';
import { NgForm } from '@angular/forms';
import {TituloService} from 'src/app/servicios/titulos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs/operators';
import { Subject } from 'rxjs';

//import {} from '';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {


  instanciaTituloAcademico:TituloModel;
  tituloAcademico:TituloModel[]=[];
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


