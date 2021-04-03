import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {PaisesService} from 'src/app/servicios/paises.service';
import {PaisesModel} from 'src/app/models/paises.models';
@Component({
  selector: 'app-form-add-curso',
  templateUrl: './form-add-curso.component.html'
})
export class FormAddCursoComponent implements OnInit {
  file;
  validarInputFile:boolean=true;
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  paises:PaisesModel[]=[];
  tipoCursoCapcitacion:string[]=["Curso","Capacitacion"];

  constructor(private servicioCursoCapacitacion:CursosCapacitacionesService,
              private servicioPaises:PaisesService) { }

  ngOnInit() {
    this.instanciaCursosCapacitaciones=new CursosCapacitacionesModel();
    this.instanciaCursosCapacitaciones.estado=1;
    this.cargarPaises();
  }
  // =================== subir archivo ======================
  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  onSubMitRegistrarCursoCapacitacion(formRegistroTitulo:NgForm ){
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
    this.servicioCursoCapacitacion.subirArchivoPDF(form).subscribe(
      siHacesBienFormData=>{
         if(siHacesBienFormData['Siglas']=="OE"){
          console.log(siHacesBienFormData);
          //recupero el nombre del documento subido al host
          this.instanciaCursosCapacitaciones.evidencia_url=siHacesBienFormData['nombreArchivo'];
          //estado del registro es 1
                  this.servicioCursoCapacitacion.crearCursoCapacitaciones(this.instanciaCursosCapacitaciones).subscribe(
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
  cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        console.warn("TODO BIEN");
        //cargo array con la data para imprimir en la tabañ
        this.paises =siHacesBien;
        //console.log( this.paises);
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
   }

}
