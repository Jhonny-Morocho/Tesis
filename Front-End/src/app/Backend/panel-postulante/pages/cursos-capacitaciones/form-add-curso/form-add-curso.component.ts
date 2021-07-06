import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {PaisesService} from 'src/app/servicios/paises.service';
import {PaisesModel} from 'src/app/models/paises.models';
import { Router } from '@angular/router';
import {ValidadoresService} from 'src/app/servicios/validadores.service';
import * as moment from 'moment';
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
  formRegistroCurso:FormGroup;

  constructor(private servicioCursoCapacitacion:CursosCapacitacionesService,
              private formBuilder:FormBuilder,
              private validadorPersonalizado:ValidadoresService,
              private router:Router,
              private servicioPaises:PaisesService) { }

  ngOnInit() {
    this.instanciaCursosCapacitaciones=new CursosCapacitacionesModel();
    this.instanciaCursosCapacitaciones.estado=1;
    this.cargarPaises();
    this.crearFormulario();
  }
  get nomEventoNoValido(){
    return this.formRegistroCurso.get('nom_evento').invalid && this.formRegistroCurso.get('nom_evento').touched ;
  }
  get auspicianteNoValido(){
    return this.formRegistroCurso.get('auspiciante').invalid && this.formRegistroCurso.get('auspiciante').touched ;
  }
  get numHorasNoValido(){
    return this.formRegistroCurso.get('horas').invalid && this.formRegistroCurso.get('horas').touched ;
  }
  get fechaInicioNoValido(){
    return this.formRegistroCurso.get('fecha_inicio').invalid && this.formRegistroCurso.get('fecha_inicio').touched ;
  }
  get fechaFinalizacionNoValido(){
    return this.formRegistroCurso.get('fecha_culminacion').invalid && this.formRegistroCurso.get('fecha_culminacion').touched  ;
  }

  // la fecha de finalizacion debe ser mayo a la fecha de inicio
  get fechaFinalMayorInicialNoValido(){
    const dateInicio=this.formRegistroCurso.get('fecha_inicio');
    const dateFinalalizacion=this.formRegistroCurso.get('fecha_culminacion');
    return (dateFinalalizacion>dateInicio)?true:false;
  }
  get fechaFinalizacionVacia(){
    return this.formRegistroCurso.get('fecha_culminacion').value==''?true:false;
  }


  get tipoEventoNoValido(){
    return this.formRegistroCurso.get('tipo_evento').invalid && this.formRegistroCurso.get('tipo_evento').touched ;
  }
  get paisNoValido(){
    return this.formRegistroCurso.get('pais').invalid && this.formRegistroCurso.get('pais').touched ;
  }
  get evidenciasNoValido(){
    return this.formRegistroCurso.get('evidencias').invalid && this.formRegistroCurso.get('evidencias').touched ;
  }

  crearFormulario(){
    this.formRegistroCurso=this.formBuilder.group({
      nom_evento:['',
                  [
                    Validators.required,
                    Validators.maxLength(40)

                  ]
              ],
      auspiciante:['',
                   [
                      Validators.required,
                      Validators.maxLength(40)
                   ]
               ],
      horas:['',
                    [
                      Validators.required

                    ]
                  ],
      fecha_inicio:['',
                  [
                    Validators.required,

                  ]
                ],
      fecha_culminacion:['',
                          [
                          Validators.required,

                          ]
                        ],

      tipo_evento:['',
                  [
                    Validators.required
                  ]
                ],
      pais:['',
                [
                  Validators.required
                ]
              ],

      evidencias:['',
              [
                Validators.required
              ]
            ],
    },{
      validators: this.validadorPersonalizado.validarFechasInicioFinalizacion('fecha_inicio','fecha_culminacion')
    });
  }
  // =================== subir archivo ======================
  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  registrarCursoCapacitacion( ){


    if(this.formRegistroCurso.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      });
      toast({
        type: 'error',
        title: 'Debe llenar los campos requeridos correctamente'
      })
      return Object.values(this.formRegistroCurso.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });

    Swal.showLoading();
    //preparo el archivo para enviar
    let form=new FormData();
    form.append('file',this.file);
    //tengo que guardar dos datos 1=== texto plano; 2== archivo
    //envio los datos del formulario
    this.instanciaCursosCapacitaciones.estado=1;
    this.instanciaCursosCapacitaciones.nom_evento=this.formRegistroCurso.value.nom_evento;
    this.instanciaCursosCapacitaciones.auspiciante=this.formRegistroCurso.value.auspiciante;
    this.instanciaCursosCapacitaciones.horas=this.formRegistroCurso.value.horas;
    this.instanciaCursosCapacitaciones.tipo_evento=this.formRegistroCurso.value.tipo_evento;
    this.instanciaCursosCapacitaciones.fecha_inicio=this.formRegistroCurso.value.fecha_inicio;
    this.instanciaCursosCapacitaciones.fecha_culminacion=this.formRegistroCurso.value.fecha_culminacion;
    this.instanciaCursosCapacitaciones.fk_pais=this.formRegistroCurso.value.pais;
    this.instanciaCursosCapacitaciones.evidencia_url=this.formRegistroCurso.value.evidencias;

    this.servicioCursoCapacitacion.subirArchivoPDF(form).subscribe(
      siHacesBienFormData=>{
         if(siHacesBienFormData['Siglas']=="OE"){
          //recupero el nombre del documento subido al host
          this.instanciaCursosCapacitaciones.evidencia_url=siHacesBienFormData['nombreArchivo'];
          //estado del registro es 1
                  this.servicioCursoCapacitacion.crearCursoCapacitaciones(this.instanciaCursosCapacitaciones).subscribe(
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
                          title: 'Registrado'
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
           }else{
             Swal('Ups', siHacesBienFormData['mensaje'], 'info')
          }
      },(erroSubirFormData)=>{
        Swal('Error',erroSubirFormData['mensaje'], 'error')
    });
    //2.guardamos la data
  }
  cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        this.paises =siHacesBien;
      },
      (peroSiTenemosErro)=>{
        Swal('Error',peroSiTenemosErro['mensaje'], 'error')
      }
    );
  }

}
