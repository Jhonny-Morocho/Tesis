import { Component, OnInit } from '@angular/core';
import {TituloService} from 'src/app/servicios/titulos.service';
//import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {TituloModel} from 'src/app/models/titulo.models';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  formRegistroTitulo:FormGroup;

  constructor(private servicioTitulo:TituloService,
              private formBuilder:FormBuilder,
              private router:Router) {
    this.crearFormulario();
   }

  ngOnInit() {
    this.instanciaTituloAcademico=new TituloModel();
  }

  get tituloNoValido(){
    return this.formRegistroTitulo.get('titulo_obtenido').invalid && this.formRegistroTitulo.get('titulo_obtenido').touched ;
  }
  get numRegistroNoValido(){
    return this.formRegistroTitulo.get('num_registro').invalid && this.formRegistroTitulo.get('num_registro').touched ;
  }
  get nivelInstruccionNoValido(){
    return this.formRegistroTitulo.get('nivel_instruccion').invalid && this.formRegistroTitulo.get('nivel_instruccion').touched ;
  }
  get tipoTituloNoValido(){
    return this.formRegistroTitulo.get('tipo_titulo').invalid && this.formRegistroTitulo.get('tipo_titulo').touched ;
  }
  get evidenciasNoValido(){
    return this.formRegistroTitulo.get('evidencias').invalid && this.formRegistroTitulo.get('evidencias').touched ;
  }
  crearFormulario(){
    this.formRegistroTitulo=this.formBuilder.group({
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
    // =================== archivo ======================
    //=======================================
    onSubMitRegistroTitulo( ){
      //prepara el archivo para enviar
      if(this.formRegistroTitulo.invalid){
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
        return Object.values(this.formRegistroTitulo.controls).forEach(contol=>{
          contol.markAsTouched();
        });
      }
      let form=new FormData();
      form.append('file',this.file);
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
            //recupero el nombre del documento subido al host
            this.instanciaTituloAcademico.evidencias_url=siHacesBienFormData['nombreArchivo'];
            //estado del registro es 1
                    //envio los datos del formulario
                    this.instanciaTituloAcademico.estado=1;
                    this.instanciaTituloAcademico.titulo_obtenido=this.formRegistroTitulo.value.titulo_obtenido;
                    this.instanciaTituloAcademico.numero_registro=this.formRegistroTitulo.value.num_registro;
                    this.instanciaTituloAcademico.nivel_instruccion=this.formRegistroTitulo.value.nivel_instruccion;
                    this.instanciaTituloAcademico.tipo_titulo=this.formRegistroTitulo.value.tipo_titulo;
                    this.instanciaTituloAcademico.detalles_adiciones=this.formRegistroTitulo.value.detalles_adiciones;
                    this.servicioTitulo.crearTitulo(this.instanciaTituloAcademico).subscribe(
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
             }else{
               Swal('Ups', siHacesBienFormData['mensaje'], 'info')
            }
        },(erroSubirFormData)=>{
          Swal('Error', erroSubirFormData['mensaje'], 'error')
      });
      //2.guardamos la data
    }
}
