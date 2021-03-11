import { Component, OnInit } from '@angular/core';
import {TituloModel} from 'src/app/models/titulo.models';
import { NgForm } from '@angular/forms';
import {TituloService} from 'src/app/servicios/titulos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-titulos-academicos',
  templateUrl: './titulos-academicos.component.html'
})
export class TitulosAcademicosComponent implements OnInit {
  file;
  validarInputFile:boolean=true;
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];
  tituloAcademicos:TituloModel[]=[];
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioTitulo:TituloService,private ruta_:Router) { }
  ngOnInit() {
    this.servicioTitulo.listarTitulos().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
          //data table
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
          };
        this.estudiante =siHacesBien;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
         console.warn("TODO MAL");
       }
    );
    //data table
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
   this.dtTrigger.next();
   //instancia de titulomodel
   this.instanciaTituloAcademico=new TituloModel();
   this.instanciaTituloAcademico.detalles_adiciones="El titulo lo tub een ";
   this.instanciaTituloAcademico.estado=1;


   this.instanciaTituloAcademico.evidencias_url="/c/"
   this.instanciaTituloAcademico.nivel_instruccion=1;
   this.instanciaTituloAcademico.external_ti="External/dsgdfgf";
   this.instanciaTituloAcademico.numero_registro="1b-12fc";
   this.instanciaTituloAcademico.tipo_titulo=2;
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
          console.assert(siHacesBienFormData);
          //recupero el nombre del documento subido al host
          this.instanciaTituloAcademico.evidencias_url=siHacesBienFormData['nombreArchivo'];
                  this.servicioTitulo.crearTitulo(this.instanciaTituloAcademico).subscribe(
                    siHacesBienJson=>{
                      Swal.close();
                      console.log(siHacesBienJson);
                      if(siHacesBienJson['Siglas']=="OE"){
                        console.assert(siHacesBienJson);
                        Swal('Registrado', 'Informacion Registrada con Exito', 'success');
                      }else{
                        console.warn(siHacesBienJson);
                        Swal('Ups, No se puede realizar el registro'+siHacesBienJson['mensaje'], 'info')
                      }
                    },(erroSubirJson)=>{
                      console.error(erroSubirJson);
                      console.log(mensaje);
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


