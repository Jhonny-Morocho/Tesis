import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-oferta-laboral',
  templateUrl: './oferta-laboral.component.html'
})
export class OfertaLaboralComponent implements OnInit {
  intanciaOfertaLaboral:OfertaLaboralModel;
  //array de data ofertas labarales
  ofertasLaborales:OfertaLaboralModel[]=[];
  instanciaOfertaVer:OfertaLaboralModel;
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOferta:OfertasLaboralesService,private ruta_:Router) { }

  ngOnInit() {
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.cargarTabla();

  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioOferta.listarOfertasLaboralesExternal_us().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
        this.ofertasLaborales =siHacesBien;
        console.log(this.ofertasLaborales);
        //data table
        //cargamos los items o los requisitos

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

  verOfertaModal(id:Number){
    console.log("click");
    console.log(this.ofertasLaborales[id]['puesto']);

    this.instanciaOfertaVer.puesto=this.ofertasLaborales[id]['puesto'];
    this.instanciaOfertaVer.requisitos=this.ofertasLaborales[id]['requisitos'];
    $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
    console.log(this.instanciaOfertaVer.requisitos);
    $('#exampleModal').modal('show');
 
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
}
