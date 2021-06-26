import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  formRegistroCurso:FormGroup;

  constructor(private servicioCursoCapacitacion:CursosCapacitacionesService,
              private formBuilder:FormBuilder,
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
    return this.formRegistroCurso.get('fecha_culminacion').invalid && this.formRegistroCurso.get('fecha_culminacion').touched ;
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
                    Validators.required
                  ]
                ],
      fecha_culminacion:[''],

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
    });
  }
  // =================== subir archivo ======================
  fileEvent(fileInput:Event){
    this.file=(<HTMLInputElement>fileInput.target).files[0] ;
  }
  registrarCursoCapacitacion( ){
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
    if(formRegistroCurso.invalid){

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
          //recupero el nombre del documento subido al host
          this.instanciaCursosCapacitaciones.evidencia_url=siHacesBienFormData['nombreArchivo'];
          //estado del registro es 1
                  this.servicioCursoCapacitacion.crearCursoCapacitaciones(this.instanciaCursosCapacitaciones).subscribe(
                    siHacesBienJson=>{
                      Swal.close();
                      if(siHacesBienJson['Siglas']=="OE"){
                        Swal('Registrado', 'Información registrada con exito', 'success');

                      }else{
                        Swal('Ups',siHacesBienJson['mensaje'], 'info')
                      }
                    },(erroSubirJson)=>{
                       Swal({
                         title:'Error',
                         type:'error',
                         text:erroSubirJson['archivoSubido']
                       });
                  });
           }else{

             Swal('Ups, No se puede subir el  el registro','Debe subir en formato PDF', 'info')
          }
      },(erroSubirFormData)=>{

    });
    //2.guardamos la data
  }
  cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        //cargo array con la data para imprimir en la tabañ
        this.paises =siHacesBien;
      },
      (peroSiTenemosErro)=>{
      }
    );
  }

}
