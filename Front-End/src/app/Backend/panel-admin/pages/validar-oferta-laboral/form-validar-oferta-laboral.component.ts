import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { summernoteConfig } from 'src/app/templateSumerNote/configSumerNote';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-form-validar-oferta-laboral',
  templateUrl: './form-validar-oferta-laboral.component.html'
})
export class FormValidarOfertaLaboralComponent implements OnInit {
  instanciaOfertaLaboral:OfertaLaboralModel;
  desactivarBotonGuardar=false;
  encontrado:boolean;
  constructor(private _activateRoute:ActivatedRoute,
              private router:Router,
              private servicioOfertaLaboral:OfertasLaboralesService) { }

  ngOnInit() {
    this.cargarDatosOfertaLaboral();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  cargarDatosOfertaLaboral(){
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioOfertaLaboral.obtenerOfertaLaboralExternal_of(params['external_of']).subscribe(
        suHacesBien=>{
            //encontro estudiante estado==0
            if(suHacesBien["Siglas"]=="OE"){
              this.encontrado=true;
              this.instanciaOfertaLaboral.puesto=suHacesBien["mensaje"]['puesto'];
              this.instanciaOfertaLaboral.descripcion=suHacesBien["mensaje"]['descripcion'];
              this.instanciaOfertaLaboral.lugar=suHacesBien["mensaje"]['lugar'];
              this.instanciaOfertaLaboral.requisitos=suHacesBien["mensaje"]['requisitos'];
              this.instanciaOfertaLaboral.external_of=suHacesBien["mensaje"]['external_of'];
              this.instanciaOfertaLaboral.estado=suHacesBien["mensaje"]['estado'];
              this.instanciaOfertaLaboral.obervaciones=suHacesBien["mensaje"]['obervaciones'];
              $(function() {
                $('#compose-textarea').summernote(summernoteConfig);
                $('#compose-textarea').summernote('disable');
              })
            }else{
              this.encontrado=false;
            }
        },peroSiTenemosErro=>{
          Swal('Error', peroSiTenemosErro['mensaje'], 'error');
        }
      )
    });
  }
  onSubMitEditarOfertaLaboral(formValidarOfertaLaboral:NgForm){
    if(formValidarOfertaLaboral.invalid){
      return;
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaOfertaLaboral.requisitos=$('#compose-textarea').val();
    this.servicioOfertaLaboral.actulizarDatosOfertaLaboral(this.instanciaOfertaLaboral).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
          toast({
            type: 'success',
            title: 'Validado'
          })
          this.router.navigateByUrl('/panel-admin/validar-oferta-laboral');
        }else{
          Swal('Ups', siHacesBien['mensaje'], 'info')
        }

      },error=>{
        Swal('Error', error['mensaje'], 'error')
      }

    );


  }
  estadoOferta(){
    if(this.instanciaOfertaLaboral.estado==1){
      return false;
    }
    if(this.instanciaOfertaLaboral.estado==2){
      return true;
    }
  }
  onChangeOferta(event){
    if(event==true){
      this.instanciaOfertaLaboral.estado=2;
    }
    if(event==false){
      this.instanciaOfertaLaboral.estado=1;
    }
  }
}
