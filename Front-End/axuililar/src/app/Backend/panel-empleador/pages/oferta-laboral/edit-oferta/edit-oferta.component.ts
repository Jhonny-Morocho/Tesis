import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { summernoteConfig } from 'src/app/templateSumerNote/configSumerNote';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-edit-oferta',
  templateUrl: './edit-oferta.component.html'
})
export class EditOfertaComponent implements OnInit {
  formOfertaLaboral:FormGroup;
  ofertaRevisad:boolean;
  instanciaOfertaLaboral:OfertaLaboralModel;
  constructor(private _activateRoute:ActivatedRoute,
              private router:Router,
              private formBuilder:FormBuilder,
              private servicioOfertaLaboral:OfertasLaboralesService) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    //inicializo el formulario con los datos de la oferta laboral
    this.cargarDatosOfertaLaboral();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  crearFormulario(){
    this.formOfertaLaboral=this.formBuilder.group({
      puesto:['',[Validators.required,Validators.maxLength(50)]],
      descripcion:['',[Validators.required,Validators.maxLength(200)]],
      lugar:['',[Validators.required,Validators.maxLength(100)]],
      requisitos:['',[Validators.required,Validators.maxLength(100)]],
    });
  }
  textAreaEditor(estado:boolean){
    if(estado){
      $(function() {
        $('#compose-textarea').summernote(summernoteConfig);
      })
    }else{
      $(function() {
        $('#compose-textarea').summernote(summernoteConfig);
      })
      $('#compose-textarea').summernote('disable');
    }
  }
  cargarDatosOfertaLaboral(){
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioOfertaLaboral.obtenerOfertaLaboralExternal_of(params['external_of']).subscribe(
        siHacesBien=>{
            if(siHacesBien["Siglas"]=="OE"){
              this.instanciaOfertaLaboral.estado=1;
              this.instanciaOfertaLaboral.obervaciones="";
              this.instanciaOfertaLaboral.puesto=siHacesBien["mensaje"]['puesto'];
              this.instanciaOfertaLaboral.descripcion=siHacesBien["mensaje"]['descripcion'];
              this.instanciaOfertaLaboral.lugar=siHacesBien["mensaje"]['lugar'];
              this.instanciaOfertaLaboral.requisitos=siHacesBien["mensaje"]['requisitos'];
              this.instanciaOfertaLaboral.external_of=siHacesBien["mensaje"]['external_of'];
              this.instanciaOfertaLaboral.obervaciones=siHacesBien["mensaje"]['obervaciones'];
              this.instanciaOfertaLaboral.estado=siHacesBien["mensaje"]['estado'];
              //cargamos los datos en el formulario
              this.formOfertaLaboral.setValue(
                {
                puesto:this.instanciaOfertaLaboral.puesto,
                descripcion:this.instanciaOfertaLaboral.descripcion,
                lugar:this.instanciaOfertaLaboral.lugar,
                requisitos:this.instanciaOfertaLaboral.requisitos
                }
              );
              // si ahun no esta validada la oferta laboral entonces se pone en disable
              if(this.instanciaOfertaLaboral.obervaciones.length>0 &&  this.instanciaOfertaLaboral.estado==1){
                this.ofertaRevisad=true;
                this.textAreaEditor(this.ofertaRevisad);
                //this.formOfertaLaboral.disable();
              }else{
                this.ofertaRevisad=false;
                this.textAreaEditor(this.ofertaRevisad);
                this.formOfertaLaboral.disable();
              }
            }else{
              Swal('Ups', siHacesBien['mensaje'], 'info')
            }
        },peroSiTenemosErro=>{
          Swal('Error', peroSiTenemosErro['mensaje'], 'error')
        }
      )
    });
  }
  onSubMitEditarOfertaLaboral(){
    this.formOfertaLaboral.get('requisitos').setValue($('#compose-textarea').val());
    if(this.formOfertaLaboral.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe llenar todos los campos correctamente'
      })
      return Object.values(this.formOfertaLaboral.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaOfertaLaboral.estado=1;
    this.instanciaOfertaLaboral.obervaciones="";
    this.instanciaOfertaLaboral.puesto=this.formOfertaLaboral.value.puesto;
    this.instanciaOfertaLaboral.descripcion=this.formOfertaLaboral.value.descripcion;
    this.instanciaOfertaLaboral.lugar=this.formOfertaLaboral.value.lugar;
    this.instanciaOfertaLaboral.requisitos=this.formOfertaLaboral.value.requisitos;

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
            title: 'Actualizado'
          })
          this.router.navigateByUrl("/panel-empleador/oferta-laboral");
        }else{
          Swal('Ups', siHacesBien['mensaje'], 'info')
        }

      },error=>{
        Swal('Error', error['mensaje'], 'error')
      }

    );
  }

  get puestoNoValido(){
    return this.formOfertaLaboral.get('puesto').invalid &&  this.formOfertaLaboral.get('puesto').touched;
  }



  get descripcionNoValido(){
    return this.formOfertaLaboral.get('descripcion').invalid &&  this.formOfertaLaboral.get('descripcion').touched;
  }



  get lugarNoValido(){
    return this.formOfertaLaboral.get('lugar').invalid &&  this.formOfertaLaboral.get('lugar').touched;
  }

  get requisitosNoValido(){
    return this.formOfertaLaboral.get('requisitos').invalid &&  this.formOfertaLaboral.get('requisitos').touched;
  }
}
