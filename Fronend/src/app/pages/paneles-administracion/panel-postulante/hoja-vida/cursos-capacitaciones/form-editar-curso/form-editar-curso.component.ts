import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import { PaisesModel } from 'src/app/models/paises.models';
import {PaisesService} from 'src/app/servicios/paises.service';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-editar-curso',
  templateUrl: './form-editar-curso.component.html'
})
export class FormEditarCursoComponent implements OnInit {
  file;
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  paises:PaisesModel[]=[];
  tipoCursoCapcitacion:string[]=["Curso","Capacitacion"];

  constructor(private servicioPaises:PaisesService, private _activateRoute:ActivatedRoute,private servicioCursosCapacitaciones:CursosCapacitacionesService) { }

  ngOnInit() {
    this.cargarDatosCursosCapacitaciones();
    this.cargarPaises();
  }

  cargarDatosCursosCapacitaciones(){
    this.instanciaCursosCapacitaciones=new CursosCapacitacionesModel();
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioCursosCapacitaciones.obtenerCursoCapacitacionExternal_es(params['external_cu']).subscribe(
        suHacesBien=>{
            console.log(suHacesBien);
            //encontro estudiante estado==0
            if(suHacesBien["Siglas"]=="OE"){
              this.instanciaCursosCapacitaciones.estado=1;
              this.instanciaCursosCapacitaciones.nom_evento=suHacesBien["mensaje"]['nom_evento'];
              this.instanciaCursosCapacitaciones.auspiciante=suHacesBien["mensaje"]['auspiciante'];
              this.instanciaCursosCapacitaciones.horas=suHacesBien["mensaje"]['horas'];
              this.instanciaCursosCapacitaciones.fecha_inicio=suHacesBien["mensaje"]['fecha_inicio'];
              this.instanciaCursosCapacitaciones.fecha_culminacion=suHacesBien["mensaje"]['fecha_culminacion'];
              this.instanciaCursosCapacitaciones.tipo_evento=suHacesBien["mensaje"]['tipo_evento'];
              this.instanciaCursosCapacitaciones.fk_pais=suHacesBien["mensaje"]['fk_pais'];
              this.instanciaCursosCapacitaciones.external_cu=suHacesBien["mensaje"]['external_cu'];
              //console.warn(this.CursosCapacitacionesModel.external_ti);
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
  cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        //console.log(siHacesBien);
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

  // =================== subir archivo ======================
  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  // =================== archivo ======================
  //=======================================
  onSubMitActualizarCursoCapacitacion(formEditarTitulo:NgForm ){
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
      this.servicioCursosCapacitaciones.subirArchivoPDF(form).subscribe(
        siHacesBienFormData=>{
           if(siHacesBienFormData['Siglas']=="OE"){
            console.log(siHacesBienFormData);
            //actualizo el
            this.instanciaCursosCapacitaciones.evidencia_url=siHacesBienFormData['nombreArchivo'];
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
    this.servicioCursosCapacitaciones.actulizarDatosCursosCapacitaciones(this.instanciaCursosCapacitaciones).subscribe(
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
