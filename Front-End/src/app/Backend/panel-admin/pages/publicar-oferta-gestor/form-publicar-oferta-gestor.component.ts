import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { summernoteConfig } from 'src/app/templateSumerNote/configSumerNote';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-form-publicar-oferta-gestor',
  templateUrl: './form-publicar-oferta-gestor.component.html'
})
export class FormPublicarOfertaGestorComponent implements OnInit {
  instanciaOfertaLaboral:OfertaLaboralModel;
  constructor(private _activateRoute:ActivatedRoute,
              private router:Router,
              private servicioOfertaLaboral:OfertasLaboralesService) { }

  ngOnInit() {
    this.cargarDatosOfertaLaboral();
  }
  cargarDatosOfertaLaboral(){
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioOfertaLaboral.obtenerOfertaLaboralExternal_of(params['external_of']).subscribe(
        siHacesBien=>{
            //encontro estudiante estado==0
            if(siHacesBien["Siglas"]=="OE"){
              this.instanciaOfertaLaboral.puesto=siHacesBien["mensaje"]['puesto'];
              this.instanciaOfertaLaboral.descripcion=siHacesBien["mensaje"]['descripcion'];
              this.instanciaOfertaLaboral.lugar=siHacesBien["mensaje"]['lugar'];
              this.instanciaOfertaLaboral.requisitos=siHacesBien["mensaje"]['requisitos'];
              this.instanciaOfertaLaboral.external_of=siHacesBien["mensaje"]['external_of'];
              this.instanciaOfertaLaboral.estado=siHacesBien["mensaje"]['estado'];
              this.instanciaOfertaLaboral.obervaciones=siHacesBien["mensaje"]['obervaciones'];
              $(function() {
                //Add text editor
                $('#compose-textarea').summernote(summernoteConfig)
                $('#compose-textarea').summernote('disable');
              })

            }else{
              Swal('Info', siHacesBien['mensaje'], 'info');
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
            title: 'Publicada'
          })
          this.router.navigateByUrl('/panel-admin/publicar-oferta-gestor');
        }else{
          Swal('Ups'+siHacesBien['mensaje'], 'info')
        }

      },error=>{
        Swal('Error',error['mensaje'], 'error')
      }

    );


  }
    //internacion con el boton del formulario apra que cambie de color aprobado/no aprobado
    estadoOferta(){
      if(this.instanciaOfertaLaboral.estado==2){
        return false;
      }
      if(this.instanciaOfertaLaboral.estado==3){
        return true;
      }
    }
    onChangeOferta(event){
      if(event==true){
        this.instanciaOfertaLaboral.estado=3;
      }
      if(event==false){
        this.instanciaOfertaLaboral.estado=2;
      }
    }

}
