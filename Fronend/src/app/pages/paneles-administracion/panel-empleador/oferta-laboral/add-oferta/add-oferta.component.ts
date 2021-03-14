import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private servicioOfertaLaboral:OfertasLaboralesService) { }

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
    this.instanciaOfertaLaboral.estado=0;
    this.instanciaOfertaLaboral.obervaciones="";
    //console.log(textAreaRequisitos);
    if(formRegistroTitulo.invalid){
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
            Swal('Registrado', 'Informacion Registrada con Exito', 'success');
            this.instanciaOfertaLaboral.puesto="";
            this.instanciaOfertaLaboral.descripcion="";
            this.instanciaOfertaLaboral.lugar="";
            // this.instanciaOfertaLaboral.requisitos='<ul><li>List item onesfs</li>'+
            //                                         '<li>List item twods</li>'+
            //                                         '<li>List item threedsds</li>'+
            //                                         '<li>List item fourds</li>'+'</ul>';
           
          }else{
            console.warn(siHaceBien);
            Swal('Ups, No se puede realizar el registro'+siHaceBien['mensaje'], 'info')
          }
       },error=>{
         console.log(error);
       }
     );
  }

}
