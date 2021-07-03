import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import { OfertasLaboralesService } from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
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
    $(function() {
      //Add text editor
      $('#compose-textarea').summernote({
          placeholder: '<ul>'+
          '<li>Primer requisito</li>'+
          '<li>Segundo requisito</li>'+
          '<li>Tercer requisito</li>'+
          '<li>Cuarto Requisito</li>'+
        '</ul>',
          tabsize: 2,
          height: 200,
          toolbar: [
              ['style', [false]],
              ['font', ['bold', 'underline', false]],
              ['fontsize', [false]],
              ['para', ['ul', false, false]],
              ['table', [false]],
              ['height', [false]],
              ['insert', [false, false, false]]
          ]
      })
    })
    //reiniciio siempre el script
  }
  crearFormulario(){
    this.formOfertaLaboral=this.formBuilder.group({
      puesto:['',[Validators.required,Validators.maxLength(50)]],
      descripcion:['',[Validators.required,Validators.maxLength(200)]],
      lugar:['',[Validators.required,Validators.maxLength(100)]],
      requisitos:['',[Validators.required,Validators.maxLength(100)]]
    });
  }
  onSubMitRegistroOfertaLaboral(){
    //var textAreaRequisitos = $('#compose-textarea').val();
    this.instanciaOfertaLaboral.requisitos=$('#compose-textarea').val();
    this.instanciaOfertaLaboral.estado=1;
    this.instanciaOfertaLaboral.obervaciones="";
    //console.log(textAreaRequisitos);
    console.log(this.formOfertaLaboral);
    console.log(this.instanciaOfertaLaboral);
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
     this.servicioOfertaLaboral.crearOfertasLaborales(this.instanciaOfertaLaboral).subscribe(
       siHaceBien=>{
          console.log(siHaceBien);
          if(siHaceBien['Siglas']=="OE"){
            console.log(siHaceBien);
            Swal('Registrado', 'Información registrada con éxito', 'success');
            this.router.navigateByUrl('/panel-empleador/oferta-laboral');
          }else{
            console.warn(siHaceBien);
            Swal('Ups', siHaceBien['mensaje'], 'info')
          }
       },error=>{
         console.log(error);
       }
     );
  }
  get puestoNoValido(){
    return this.formOfertaLaboral.get('puesto').invalid &&  this.formOfertaLaboral.get('puesto').touched;
  }
  get puestoVacio(){
    return this.formOfertaLaboral.get('puesto').value;
  }



  get descripcionNoValido(){
    return this.formOfertaLaboral.get('descripcion').invalid &&  this.formOfertaLaboral.get('descripcion').touched;
  }
  get descripcionVacio(){
    return this.formOfertaLaboral.get('descripcion').value;
  }


  get lugarNoValido(){
    return this.formOfertaLaboral.get('lugar').invalid &&  this.formOfertaLaboral.get('lugar').touched;
  }
  get lugarVacio(){
    return this.formOfertaLaboral.get('lugar').value;
  }


  get requisitosNoValido(){
    return this.formOfertaLaboral.get('requisitos').invalid &&  this.formOfertaLaboral.get('requisitos').touched;
  }
  get requisitosVacio(){
    return this.formOfertaLaboral.get('requisitos').value;
  }

}
