import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-edit-oferta',
  templateUrl: './edit-oferta.component.html'
})
export class EditOfertaComponent implements OnInit {
  estadoRevisionform:boolean=false;
  instanciaOfertaLaboral:OfertaLaboralModel;
  constructor(private _activateRoute:ActivatedRoute,private router:Router,
    private servicioOfertaLaboral:OfertasLaboralesService) { }

  ngOnInit() {
    //inicializo el formulario con los datos de la oferta laboral
    this.cargarDatosOfertaLaboral();


  }

  textAreaEditor(estado:boolean){
    if(estado==true){
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
              this.instanciaOfertaLaboral.estado=1;
              this.instanciaOfertaLaboral.obervaciones="";
              this.instanciaOfertaLaboral.puesto=suHacesBien["mensaje"]['puesto'];
              this.instanciaOfertaLaboral.descripcion=suHacesBien["mensaje"]['descripcion'];
              this.instanciaOfertaLaboral.lugar=suHacesBien["mensaje"]['lugar'];
              this.instanciaOfertaLaboral.requisitos=suHacesBien["mensaje"]['requisitos'];
              this.instanciaOfertaLaboral.external_of=suHacesBien["mensaje"]['external_of'];
              this.instanciaOfertaLaboral.obervaciones=suHacesBien["mensaje"]['obervaciones'];
              this.instanciaOfertaLaboral.estado=suHacesBien["mensaje"]['estado'];
               // si ahun no esta validada la oferta laboral entonces se pone en disable
               if(this.instanciaOfertaLaboral.obervaciones.length>0 &&  this.instanciaOfertaLaboral.estado==1){
                this.estadoRevisionform=true;
                this.textAreaEditor(this.estadoRevisionform);
                }else{
                  this.textAreaEditor(this.estadoRevisionform);
                }
              
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
    if(formEditarOfertaLaboral.invalid){
      return;
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();

    this.instanciaOfertaLaboral.obervaciones="";
    this.instanciaOfertaLaboral.requisitos=$('#compose-textarea').val();
    this.servicioOfertaLaboral.actulizarDatosOfertaLaboral(this.instanciaOfertaLaboral).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Información Registrada con Éxito', 'success');
          this.router.navigateByUrl("/panel-empleador/oferta-laboral");
        }else{
          Swal('Ups, No se puede realizar el registro'+siHacesBien['mensaje'], 'info')
        }

      },error=>{
        console.log(error);
      }

    );
    

  }
}
