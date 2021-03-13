import { Component, OnInit } from '@angular/core';
import {TituloService} from 'src/app/servicios/titulos.service';
//import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {TituloModel} from 'src/app/models/titulo.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-add-titulo',
  templateUrl: './form-add-titulo.component.html'
})
export class FormAddTituloComponent implements OnInit {
  file;
  validarInputFile:boolean=true;
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];
  tipoTitulo:string[]=["Nacional","Extranjero"];
  tituloAcademico:TituloModel[]=[];
  //data table

  constructor(private servicioTitulo:TituloService) { }

  ngOnInit() {
    this.instanciaTituloAcademico=new TituloModel();
    this.instanciaTituloAcademico.estado=1;
    this.instanciaTituloAcademico.detalles_adiciones="";
  }
    // =================== subir archivo ======================
    fileEvent(fileInput:Event){
      this.file=(<HTMLInputElement>fileInput.target).files[0] ;
    }
    // =================== archivo ======================
    //=======================================
    onSubMitRegistroTitulo(formRegistroTitulo:NgForm ){
      //prepara el archivo para enviar
      let form=new FormData();
      //falta llenar el input file//valdiar si tenemos archivo 
      if(this.file==null){
        this.validarInputFile=false;
        return;
      }
      this.validarInputFile=true;
      form.append('file',this.file);
      //reviso si los datos del formulario han sido llenados
      console.log(formRegistroTitulo);
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
      this.servicioTitulo.subirArchivoPDF(form).subscribe(
        siHacesBienFormData=>{
           if(siHacesBienFormData['Siglas']=="OE"){
            console.log(siHacesBienFormData);
            //recupero el nombre del documento subido al host
            this.instanciaTituloAcademico.evidencias_url=siHacesBienFormData['nombreArchivo'];
            //estado del registro es 1
       
                    this.servicioTitulo.crearTitulo(this.instanciaTituloAcademico).subscribe(
                      siHacesBienJson=>{
                        Swal.close();
                        console.log(siHacesBienJson);
                        if(siHacesBienJson['Siglas']=="OE"){
                          console.log(siHacesBienJson);
                          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
                         
                        }else{
                          console.warn(siHacesBienJson);
                          Swal('Ups, No se puede realizar el registro'+siHacesBienJson['mensaje'], 'info')
                        }
                      },(erroSubirJson)=>{
                        console.error(erroSubirJson);
            
                         Swal({
                           title:'Error al registrar informacion',
                           type:'error',
                           text:erroSubirJson['archivoSubido']
                         }); 
                    });
             }else{
               console.warn(siHacesBienFormData);
               console.warn(siHacesBienFormData['archivoSubido']);
               Swal('Ups, No se puede subir el  el registro','Debe subir en formato PDF', 'info')
            }
        },(erroSubirFormData)=>{
          console.error(erroSubirFormData);
      });
      //2.guardamos la data
      
  
    }

}
