import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private servicioOfertaLaboral:OfertasLaboralesService,
    private router:Router) { }

  ngOnInit() {
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    $(function() {
      //Add text editor
      $('#compose-textarea').summernote({
          placeholder: 'Hello stand alone ui',
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
    //reiniciio siempre el script
  }

  onSubMitRegistroOfertaLaboral(formRegistroTitulo:NgForm){
    console.log(formRegistroTitulo.value);
    //var textAreaRequisitos = $('#compose-textarea').val();
    this.instanciaOfertaLaboral.requisitos=$('#compose-textarea').val();
    this.instanciaOfertaLaboral.estado=1;
    this.instanciaOfertaLaboral.obervaciones="";
    //console.log(textAreaRequisitos);
    if(formRegistroTitulo.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'info',
        title: 'Debe completar todos los campos'
      })
      return;
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

}
