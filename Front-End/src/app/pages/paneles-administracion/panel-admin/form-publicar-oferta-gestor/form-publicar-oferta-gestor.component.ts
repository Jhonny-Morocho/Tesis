import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-form-publicar-oferta-gestor',
  templateUrl: './form-publicar-oferta-gestor.component.html'
})
export class FormPublicarOfertaGestorComponent implements OnInit {
  instanciaOfertaLaboral:OfertaLaboralModel;
  constructor(private _activateRoute:ActivatedRoute,
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
        suHacesBien=>{
            console.log(suHacesBien);
            //encontro estudiante estado==0
            if(suHacesBien["Siglas"]=="OE"){
              this.instanciaOfertaLaboral.puesto=suHacesBien["mensaje"]['puesto'];
              this.instanciaOfertaLaboral.descripcion=suHacesBien["mensaje"]['descripcion'];
              this.instanciaOfertaLaboral.lugar=suHacesBien["mensaje"]['lugar'];
              this.instanciaOfertaLaboral.requisitos=suHacesBien["mensaje"]['requisitos'];
              this.instanciaOfertaLaboral.external_of=suHacesBien["mensaje"]['external_of'];
              this.instanciaOfertaLaboral.estado=suHacesBien["mensaje"]['estado'];
              this.instanciaOfertaLaboral.obervaciones=suHacesBien["mensaje"]['obervaciones'];
              
              $(function() {
                //Add text editor
                $('#compose-textarea').summernote({
                    placeholder: 'Ingresa los items de requisitos',
                    tabsize: 2,
                    toolbar: [
                        ['style', [false]],
                        ['font', [false, false, false]],
                        ['color', [false]],
                        ['para', ['ul', false, false]],
                        ['table', [false]],
                        ['insert', [false, false, false]],
                        ['view', [false, false, false]]
                    ]
                })
                $('#compose-textarea').summernote('disable');
              })

            }else{
              console.log("no encontrado");
              //this.encontrado=false;
            }
        },peroSiTenemosErro=>{
     
          console.log(peroSiTenemosErro);
        }
      )
    });
  }
  onSubMitEditarOfertaLaboral(formValidarOfertaLaboral:NgForm){
    console.log(formValidarOfertaLaboral);
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
        console.log(siHacesBien);
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
        }else{
          Swal('Ups, No se puede realizar el registro'+siHacesBien['mensaje'], 'info')
        }

      },error=>{
        console.log(error);
      }

    );
    

  }
    //internacion con el boton del formulario apra que cambie de color aprobado/no aprobado
    estadoAprobado(estado:Number){
      console.log(estado);
      //2==validad por el encargado pero no publicar
      if(estado==2){
        this.instanciaOfertaLaboral.estado=2;
        console.log(this.instanciaOfertaLaboral.estado);
        return false;
      }
      //3==esta publicado
      if(estado==3){
        this.instanciaOfertaLaboral.estado=3;
        console.log(this.instanciaOfertaLaboral.estado);
        return true;
      }
  
    }

}
