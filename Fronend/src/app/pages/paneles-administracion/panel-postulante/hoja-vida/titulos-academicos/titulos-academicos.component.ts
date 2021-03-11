import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';
import { NgForm } from '@angular/forms';
import {TituloService} from 'src/app/servicios/titulos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {
  file;
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];
  constructor(private servicioTitulo:TituloService,private ruta_:Router) { }
  ngOnInit() {
    this.instanciaTituloAcademico=new TituloModel();

   this.instanciaTituloAcademico.detalles_adiciones="El titulo lo tub een ";
   this.instanciaTituloAcademico.estado=1;


   this.instanciaTituloAcademico.evidencias_url="/c/"
   this.instanciaTituloAcademico.nivel_instruccion=1;
   this.instanciaTituloAcademico.external_ti="External/dsgdfgf";
   this.instanciaTituloAcademico.numero_registro="1b-12fc";
   this.instanciaTituloAcademico.tipo_titulo=2;
   this.instanciaTituloAcademico.evidencias_url="/cc/";
   this.instanciaTituloAcademico.titulo_obtenido="Ing Comercial";
  }
  // =================== archivo ======================

  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  // =================== archivo ======================
  //=======================================
  onSubMitRegistroTitulo(formRegistroTitulo:NgForm ){
    //prepara el archivo para enviar
    let form=new FormData();
    form.append('file',this.file);
    //reviso si los datos del formulario han sido llenados
    if(formRegistroTitulo.invalid){
      return;
     }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //tengo que guardar dos datos 1=== texto plano; 2== archivo
    //1.guardamos la data
    // this.servicioTitulo.crearTitulo(this.instanciaTituloAcademico).subscribe(
    //   siHacesBienJson=>{
    //     console.log(siHacesBienJson);
        //como ultimo paso subir el archivo
        this.servicioTitulo.subirArchivoPDF(form).subscribe(
          siHacesBienFormData=>{
             Swal.close();
             if(siHacesBienFormData['Siglas']=="OE"){
              console.assert(siHacesBienFormData);
               }else{
                 console.warn(siHacesBienFormData);
                 Swal('Ups, No se puede realizar el registro', siHacesBienFormData['error'], 'info')
              }
          },(erroSubirFormData)=>{
            console.log(erroSubirFormData);
             Swal({
               title:'Error al registrar informacion',
               type:'error',
               text:erroSubirFormData['mensaje']
             }); 
        });
    //   },(erroSubirJson)=>{
    //     console.log(erroSubirJson);
    //      Swal({
    //        title:'Error al registrar informacion',
    //        type:'error',
    //        text:erroSubirJson['mensaje']
    //      }); 
    // });

  }
}


