import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import { PaisesModel } from 'src/app/models/paises.models';
import {PaisesService} from 'src/app/servicios/paises.service';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {ValidadoresService} from 'src/app/servicios/validadores.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-editar-curso',
  templateUrl: './form-editar-curso.component.html'
})
export class FormEditarCursoComponent implements OnInit {
  file;
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  paises:PaisesModel[]=[];
  formEditarCurso:FormGroup;
  tipoCursoCapcitacion:string[]=["Curso","Capacitacion"];

  constructor(private servicioPaises:PaisesService,
              private _activateRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private router:Router,
              private validadorPersonalizado:ValidadoresService,
              private servicioCursosCapacitaciones:CursosCapacitacionesService) {
  this.crearFormulario();
  }

  ngOnInit() {
    this.cargarDatosFormulario();
    this.cargarPaises();
  }


  get nomEventoNoValido(){
    return this.formEditarCurso.get('nom_evento').invalid && this.formEditarCurso.get('nom_evento').touched ;
  }
  get auspicianteNoValido(){
    return this.formEditarCurso.get('auspiciante').invalid && this.formEditarCurso.get('auspiciante').touched ;
  }
  get numHorasNoValido(){
    return this.formEditarCurso.get('horas').invalid && this.formEditarCurso.get('horas').touched ;
  }
  get fechaInicioNoValido(){
    return this.formEditarCurso.get('fecha_inicio').invalid && this.formEditarCurso.get('fecha_inicio').touched ;
  }
  get fechaFinalizacionNoValido(){
    return this.formEditarCurso.get('fecha_culminacion').invalid && this.formEditarCurso.get('fecha_culminacion').touched  ;
  }

  // la fecha de finalizacion debe ser mayo a la fecha de inicio
  get fechaFinalMayorInicialNoValido(){
    const dateInicio=this.formEditarCurso.get('fecha_inicio');
    const dateFinalalizacion=this.formEditarCurso.get('fecha_culminacion');
    return (dateFinalalizacion>dateInicio)?true:false;
  }
  get fechaFinalizacionVacia(){
    return this.formEditarCurso.get('fecha_culminacion').value==''?true:false;
  }


  get tipoEventoNoValido(){
    return this.formEditarCurso.get('tipo_evento').invalid && this.formEditarCurso.get('tipo_evento').touched ;
  }
  get paisNoValido(){
    return this.formEditarCurso.get('pais').invalid && this.formEditarCurso.get('pais').touched ;
  }


  crearFormulario(){
    this.formEditarCurso=this.formBuilder.group({
      nom_evento:['',[Validators.required,Validators.maxLength(40)]],
      auspiciante:['',[Validators.required,Validators.maxLength(40)]],
      horas:['',[Validators.required]],
      fecha_inicio:['',[Validators.required,]],
      fecha_culminacion:['',[Validators.required,]],
      tipo_evento:['',[Validators.required]],
      pais:['',[Validators.required]],
      evidencias:[''],
    },{
      validators: this.validadorPersonalizado.validarFechasInicioFinalizacion('fecha_inicio','fecha_culminacion')
    });
  }
  cargarDatosFormulario(){
    this.instanciaCursosCapacitaciones=new CursosCapacitacionesModel();
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioCursosCapacitaciones.obtenerCursoCapacitacionExternal_es(params['external_cu']).subscribe(
        siHacesBien=>{
            //encontro estudiante estado==0
            if(siHacesBien["Siglas"]=="OE"){
              this.instanciaCursosCapacitaciones.estado=1;
              this.instanciaCursosCapacitaciones.nom_evento=siHacesBien["mensaje"]['nom_evento'];
              this.instanciaCursosCapacitaciones.auspiciante=siHacesBien["mensaje"]['auspiciante'];
              this.instanciaCursosCapacitaciones.horas=siHacesBien["mensaje"]['horas'];
              this.instanciaCursosCapacitaciones.fecha_inicio=siHacesBien["mensaje"]['fecha_inicio'];
              this.instanciaCursosCapacitaciones.fecha_culminacion=siHacesBien["mensaje"]['fecha_culminacion'];
              this.instanciaCursosCapacitaciones.tipo_evento=siHacesBien["mensaje"]['tipo_evento'];
              this.instanciaCursosCapacitaciones.fk_pais=siHacesBien["mensaje"]['fk_pais'];
              this.instanciaCursosCapacitaciones.external_cu=siHacesBien["mensaje"]['external_cu'];
              this.instanciaCursosCapacitaciones.evidencia_url=siHacesBien["mensaje"]['evidencia_url'];

              //console.warn(this.CursosCapacitacionesModel.external_ti);
              this.formEditarCurso.reset({
                nom_evento:this.instanciaCursosCapacitaciones.nom_evento,
                auspiciante:this.instanciaCursosCapacitaciones.auspiciante,
                horas:this.instanciaCursosCapacitaciones.horas,
                fecha_inicio:this.instanciaCursosCapacitaciones.fecha_inicio,
                fecha_culminacion:this.instanciaCursosCapacitaciones.fecha_culminacion,
                tipo_evento:this.instanciaCursosCapacitaciones.tipo_evento,
                pais:this.instanciaCursosCapacitaciones.fk_pais
              });
            }else{
              Swal('Info',siHacesBien['mensaje'], 'info');
            }
        },peroSiTenemosErro=>{
          Swal('Error',peroSiTenemosErro['mensaje'], 'error');
        }
      )
    });
  }
  cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        this.paises =siHacesBien;
      },
      (peroSiTenemosErro)=>{
        Swal('Error',peroSiTenemosErro['mensaje'], 'error');
      }
    );
  }

  // =================== subir archivo ======================
  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  // =================== archivo ======================
  //=======================================
  editarCursoCapacitacion( ){
    let form=new FormData();
    if(this.formEditarCurso.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe llenar los campos requeridos correctamente'
      })
      return Object.values(this.formEditarCurso.controls).forEach(contol=>{
        contol.markAsTouched();
      });
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
            //actualizo el
            this.instanciaCursosCapacitaciones.evidencias_url_antiguo=this.instanciaCursosCapacitaciones.evidencia_url;
            this.instanciaCursosCapacitaciones.evidencia_url=siHacesBienFormData['nombreArchivo'];
            this.guardatosPlano();
            //estado del registro es 1
            }else{
              Swal('Info', siHacesBienFormData['mensaje'], 'info');
            }
        },(erroSubirFormData)=>{
          Swal('Error', erroSubirFormData['mensaje'], 'error');
      });
    }else{
        this.instanciaCursosCapacitaciones.evidencia_url=null;
        this.guardatosPlano();
    }

  }

  guardatosPlano(){
    this.instanciaCursosCapacitaciones.estado=1;
    this.instanciaCursosCapacitaciones.nom_evento=this.formEditarCurso.value.nom_evento;
    this.instanciaCursosCapacitaciones.auspiciante=this.formEditarCurso.value.auspiciante;
    this.instanciaCursosCapacitaciones.horas=this.formEditarCurso.value.horas;
    this.instanciaCursosCapacitaciones.tipo_evento=this.formEditarCurso.value.tipo_evento;
    this.instanciaCursosCapacitaciones.fecha_inicio=this.formEditarCurso.value.fecha_inicio;
    this.instanciaCursosCapacitaciones.fecha_culminacion=this.formEditarCurso.value.fecha_culminacion;
    this.instanciaCursosCapacitaciones.fk_pais=this.formEditarCurso.value.pais;
    this.servicioCursosCapacitaciones.actulizarDatosCursosCapacitaciones(this.instanciaCursosCapacitaciones).subscribe(
      siHacesBienJson=>{
        Swal.close();
        if(siHacesBienJson['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000
          });
          toast({
            type: 'success',
            title: 'Actualizado'
          })
          this.router.navigateByUrl('/panel-postulante/cursos-capacitaciones');
        }else{
          Swal('Ups',siHacesBienJson['mensaje'], 'info')
        }
      },(erroSubirJson)=>{
          Swal({
            title:'Error',
            type:'error',
            text:erroSubirJson['mensaje']
          });
    });
  }
}
