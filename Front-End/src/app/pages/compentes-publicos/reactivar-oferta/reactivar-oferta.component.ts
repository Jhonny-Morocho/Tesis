import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaLaboralModel } from 'src/app/models/oferta-laboral.models';
import { OfertasLaboralesService } from 'src/app/servicios/oferta-laboral.service';
import {environment} from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-reactivar-oferta',
  templateUrl: './reactivar-oferta.component.html'
})
export class ReactivarOfertaComponent implements OnInit {
  dominio=environment.dominio;
  ofertaEncontrada:boolean;
  instanciaOfertaLaboral:OfertaLaboralModel;
  constructor(private router:Router,
              private servicioOfertaLaboral:OfertasLaboralesService,
              private _activateRoute:ActivatedRoute,) {

              }

  ngOnInit() {
    this.cargarDatosOfertaLaboral();

  }
  fActualizarEstadoOferta(formuarlio:NgForm){
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.servicioOfertaLaboral.reactivarOfertaLaboral(this.instanciaOfertaLaboral).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
          Swal.close();
          if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Información Registrada con Exito', 'success');
          }else{
            console.log(siHacesBien);
            Swal('Ups', siHacesBien['mensaje'], 'info')
          }
      },siHaceMal=>{
        console.warn(siHaceMal);
      }
    );
  }
  estadoOferta(estado:Number):boolean{
    if(estado==3){
      this.instanciaOfertaLaboral.estado=estado;
      return true;
    }else{
      this.instanciaOfertaLaboral.estado=estado;
      return false;
    }
  }

  cargarDatosOfertaLaboral(){
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioOfertaLaboral.obtenerOfertaLaboralExternal_of(params['external_of']).subscribe(
        suHacesBien=>{
            console.log(suHacesBien);
            //encontro estudiante estado==0
            if(suHacesBien["Siglas"]=="OE"){
              this.ofertaEncontrada=true;
              this.instanciaOfertaLaboral.puesto=suHacesBien["mensaje"]['puesto'];
              this.instanciaOfertaLaboral.descripcion=suHacesBien["mensaje"]['descripcion'];
              this.instanciaOfertaLaboral.lugar=suHacesBien["mensaje"]['lugar'];
              this.instanciaOfertaLaboral.correo=suHacesBien["mensaje"]['correo'];
              this.instanciaOfertaLaboral.requisitos=suHacesBien["mensaje"]['requisitos'];
              this.instanciaOfertaLaboral.external_of=suHacesBien["mensaje"]['external_of'];
              this.instanciaOfertaLaboral.obervaciones=suHacesBien["mensaje"]['obervaciones'];
              this.instanciaOfertaLaboral.estado=suHacesBien["mensaje"]['estado'];
              $("#itemRequisitos").html(this.instanciaOfertaLaboral.requisitos);
            }else{
              console.log("no encontrado");
              this.ofertaEncontrada=false;
            }
        },peroSiTenemosErro=>{
          console.log(peroSiTenemosErro);
        }
      )
    });
  }

}
