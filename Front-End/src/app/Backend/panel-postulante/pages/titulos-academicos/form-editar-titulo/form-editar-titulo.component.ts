import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TituloService} from 'src/app/servicios/titulos.service';
import {TituloModel} from 'src/app/models/titulo.models';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-editar-titulo',
  templateUrl: './form-editar-titulo.component.html'
})
export class FormEditarTituloComponent implements OnInit {
  file;
  formEditarTitulo:FormGroup;
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];
  tipoTitulo:string[]=["Nacional","Extranjero"];

  constructor(private _activateRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private router:Router,
              private servicioTitulo:TituloService) {
    this.crearFormulario();
  }
  get tituloNoValido(){
    return this.formEditarTitulo.get('titulo_obtenido').invalid && this.formEditarTitulo.get('titulo_obtenido').touched ;
  }
  get numRegistroNoValido(){
    return this.formEditarTitulo.get('num_registro').invalid && this.formEditarTitulo.get('num_registro').touched ;
  }
  get nivelInstruccionNoValido(){
    return this.formEditarTitulo.get('nivel_instruccion').invalid && this.formEditarTitulo.get('nivel_instruccion').touched ;
  }
  get tipoTituloNoValido(){
    return this.formEditarTitulo.get('tipo_titulo').invalid && this.formEditarTitulo.get('tipo_titulo').touched ;
  }

  crearFormulario(){
    this.formEditarTitulo=this.formBuilder.group({
      titulo_obtenido:['',
                  [
                    Validators.required,
                    Validators.maxLength(40)

                  ]
              ],
        num_registro:['',
                   [
                      Validators.required,
                      Validators.maxLength(40)
                   ]
               ],
        nivel_instruccion:['',
                    [
                      Validators.required

                    ]
                  ],
        tipo_titulo:['',
                  [
                    Validators.required
                  ]
                ],
        detalles_adiciones:[''],

        evidencias:[''],
    });
  }


  ngOnInit() {
    this.cargarDatosFormulario();
  }
  cargarDatosFormulario(){
    this.instanciaTituloAcademico=new TituloModel;
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioTitulo.obtenerTituloExternal_es(params['external_ti']).subscribe(
        siHaceBien=>{
            //encontro estudiante estado==0
            if(siHaceBien["Siglas"]=="OE"){
              //cargo los datos al formulario
              this.instanciaTituloAcademico.estado=siHaceBien["mensaje"]['estado'];
              this.instanciaTituloAcademico.tipo_titulo=siHaceBien["mensaje"]['tipo_titulo'];
              this.instanciaTituloAcademico.numero_registro=siHaceBien["mensaje"]['numero_registro'];
              this.instanciaTituloAcademico.titulo_obtenido=siHaceBien["mensaje"]['titulo_obtenido'];
              this.instanciaTituloAcademico.detalles_adiciones=siHaceBien["mensaje"]['detalles_adiciones'];
              this.instanciaTituloAcademico.nivel_instruccion=siHaceBien["mensaje"]['nivel_instruccion'];
              this.instanciaTituloAcademico.external_ti=siHaceBien["mensaje"]['external_ti'];
              this.instanciaTituloAcademico.evidencias_url=siHaceBien["mensaje"]['evidencias_url'];
              //uso reset por que no es obligatio que algunos campos se cargen como por ejemple el file
              this.formEditarTitulo.reset({
                titulo_obtenido:this.instanciaTituloAcademico.titulo_obtenido,
                tipo_titulo:this.instanciaTituloAcademico.tipo_titulo,
                num_registro:this.instanciaTituloAcademico.numero_registro,
                nivel_instruccion:this.instanciaTituloAcademico.nivel_instruccion,
                detalles_adiciones:this.instanciaTituloAcademico.detalles_adiciones
              });
            }else{
              Swal('Ups', siHaceBien['mensaje'], 'info')
            }
        },peroSiTenemosErro=>{
          Swal('Error', peroSiTenemosErro['mensaje'], 'error')
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
  onSubMitActualizarTitulo( ){
    //1 Validar data //texto planos son boligatorios
    if(this.formEditarTitulo.invalid){
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
      return Object.values(this.formEditarTitulo.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }

    //prepara el archivo para enviar
    let archivo=new FormData();
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //si el usuario actualiza el pdf realizo el cambio
    if(this.file!=null){
      archivo.append('file',this.file);
      this.servicioTitulo.subirArchivoPDF(archivo).subscribe(
        siHacesBienFormData=>{
           if(siHacesBienFormData['Siglas']=="OE"){
            //actualizo el archivo nuevo con el anterior
            this.instanciaTituloAcademico.evidencias_url_antiguo=this.instanciaTituloAcademico.evidencias_url;
            this.instanciaTituloAcademico.evidencias_url=siHacesBienFormData['nombreArchivo'];
            this.guardatosPlano();
            }else{
              Swal('Ups',siHacesBienFormData['mensaje'], 'info')
            }
        },(erroSubirFormData)=>{
          Swal('Error',erroSubirFormData['mensaje'], 'error')
      });
    }
    //caso contrario solo actualizo  los datos de texto plano
    else{
        // lo pongo en nullo x que al inicio si lo cargo para poder borrar en el backend
        this.instanciaTituloAcademico.evidencias_url=null;
        this.guardatosPlano();
    }

  }

  guardatosPlano(){
    this.instanciaTituloAcademico.titulo_obtenido=this.formEditarTitulo.value.titulo_obtenido;
    this.instanciaTituloAcademico.numero_registro=this.formEditarTitulo.value.num_registro;
    this.instanciaTituloAcademico.nivel_instruccion=this.formEditarTitulo.value.nivel_instruccion;
    this.instanciaTituloAcademico.tipo_titulo=this.formEditarTitulo.value.tipo_titulo;
    this.instanciaTituloAcademico.detalles_adiciones=this.formEditarTitulo.value.detalles_adiciones;
    this.servicioTitulo.actulizarDatosTitulo(this.instanciaTituloAcademico).subscribe(
      siHacesBienJson=>{
        Swal.close();
        if(siHacesBienJson['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,

          });
          toast({
            type: 'success',
            title: 'Actualizado'
          })
          this.router.navigateByUrl('/panel-postulante/titulos-academicos');
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

