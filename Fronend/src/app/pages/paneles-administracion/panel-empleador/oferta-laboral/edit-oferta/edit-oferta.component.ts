import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import { NgForm } from '@angular/forms';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-edit-oferta',
  templateUrl: './edit-oferta.component.html'
})
export class EditOfertaComponent implements OnInit {
  instanciaOfertaLaboral:OfertaLaboralModel;
  constructor(private _activateRoute:ActivatedRoute,
    private servicioOfertaLaboral:OfertasLaboralesService) { }

  ngOnInit() {
    //inicializo el formulario con los datos de la oferta laboral
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
  onSubMitEditarOfertaLaboral(formEditarOfertaLaboral:NgForm){
    console.log(formEditarOfertaLaboral);
    if(formEditarOfertaLaboral.valid){
      return;
    }
    

  }
}
