import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import { OfertasLaboralesService } from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import {summernoteConfig} from 'src/app/templateSumerNote/configSumerNote';
declare var JQuery:any;
 declare var $:any;

@Component({
  selector: 'app-add-oferta',
  templateUrl: './add-oferta.component.html'
})
export class AddOfertaComponent implements OnInit {
  instanciaOfertaLaboral:OfertaLaboralModel;
  formOfertaLaboral:FormGroup;
  constructor(private servicioOfertaLaboral:OfertasLaboralesService,
              private formBuilder:FormBuilder,
              private router:Router) {
    this.crearFormulario();

  }

  ngOnInit() {
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    //inicializo por que el formulario por template no funcion con esta extencion
    $(function() {
      $('#compose-textarea').summernote(summernoteConfig);
    })
  }
  crearFormulario(){
    this.formOfertaLaboral=this.formBuilder.group({
      puesto:['',[Validators.required,Validators.maxLength(50)]],
      descripcion:['',[Validators.required,Validators.maxLength(200)]],
      lugar:['',[Validators.required,Validators.maxLength(100)]],
      requisitos:['',[Validators.required,Validators.maxLength(100)]],
    });
  }
  onSubMitRegistroOfertaLaboral(){
    this.formOfertaLaboral.get('requisitos').setValue($('#compose-textarea').val());
    if(this.formOfertaLaboral.invalid ){
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
      this.servicioOfertaLaboral.crearOfertasLaborales(this.instanciaOfertaLaboral).subscribe(
       siHaceBien=>{
          console.log(siHaceBien);
          if(siHaceBien['Siglas']=="OE"){
            const toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });
            toast({
              type: 'success',
              title: 'Registrado'
            })
            this.router.navigateByUrl('panel-admin/validar-oferta-laboral');
          }else{
            Swal('Ups', siHaceBien['mensaje'], 'info')
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
