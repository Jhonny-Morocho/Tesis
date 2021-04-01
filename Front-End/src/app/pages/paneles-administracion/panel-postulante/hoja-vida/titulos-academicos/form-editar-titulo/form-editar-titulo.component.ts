import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TituloService} from 'src/app/servicios/titulos.service';
import {TituloModel} from 'src/app/models/titulo.models';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-form-editar-titulo',
  templateUrl: './form-editar-titulo.component.html'
})
export class FormEditarTituloComponent implements OnInit {
  file;
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];
  tipoTitulo:string[]=["Nacional","Extranjero"];

  constructor(private _activateRoute:ActivatedRoute, private servicioTitulo:TituloService) {
  }
  
  
  ngOnInit() {
    this.instanciaTituloAcademico=new TituloModel;
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioTitulo.obtenerTituloExternal_es(params['external_ti']).subscribe(
        suHacesBien=>{
            console.log(suHacesBien);
            //encontro estudiante estado==0
            if(suHacesBien["Siglas"]=="OE"){
              this.instanciaTituloAcademico.estado=1;
              this.instanciaTituloAcademico.tipo_titulo=suHacesBien["mensaje"]['tipo_titulo'];
              this.instanciaTituloAcademico.numero_registro=suHacesBien["mensaje"]['numero_registro'];
              this.instanciaTituloAcademico.titulo_obtenido=suHacesBien["mensaje"]['titulo_obtenido'];
              this.instanciaTituloAcademico.detalles_adiciones=suHacesBien["mensaje"]['detalles_adiciones'];
              this.instanciaTituloAcademico.nivel_instruccion=suHacesBien["mensaje"]['nivel_instruccion'];
              this.instanciaTituloAcademico.external_ti=suHacesBien["mensaje"]['external_ti'];
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

  // =================== subir archivo ======================
  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  // =================== archivo ======================
  //=======================================
  onSubMitActualizarTitulo(formEditarTitulo:NgForm ){
    //prepara el archivo para enviar
    let form=new FormData();
    //1 Validar data //texto planos son boligatorios
    if(formEditarTitulo.invalid){
      return;
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //si el usuario actualiza el pdf realizo el cambio
    if(this.file!=null){
      form.append('file',this.file);
      this.servicioTitulo.subirArchivoPDF(form).subscribe(
        siHacesBienFormData=>{
           if(siHacesBienFormData['Siglas']=="OE"){
            console.log(siHacesBienFormData);
            //actualizo el
            this.instanciaTituloAcademico.evidencias_url=siHacesBienFormData['nombreArchivo'];
            console.log(siHacesBienFormData['nombreArchivo']);
            this.guardatosPlano();
            //estado del registro es 1
            }else{
              console.warn(siHacesBienFormData);
              console.warn(siHacesBienFormData['archivoSubido']);
                //Swal('Ups, No se puede subir el  el registro','Debe subir en formato PDF', 'info')
            }
        },(erroSubirFormData)=>{
        console.error(erroSubirFormData);
      });
    }
    //caso contrario solo actualizo  los datos de texto plano
    else{
        this.guardatosPlano();
    }

  }

  guardatosPlano(){
    this.servicioTitulo.actulizarDatosTitulo(this.instanciaTituloAcademico).subscribe(
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
  }
}

