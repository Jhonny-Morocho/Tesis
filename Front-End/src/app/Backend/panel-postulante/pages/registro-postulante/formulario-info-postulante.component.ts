import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import {ValidadoresService} from 'src/app/servicios/validadores.service';
import { Router } from '@angular/router';
//importo libreria para poder jugar con las fechas
import * as moment from 'moment';
@Component({
  selector: 'app-formulario-info-postulante',
  templateUrl: './formulario-info-postulante.component.html'
})
export class FormularioInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
  //creo una referencia
  formRegistroPostulante:FormGroup;
  fechaActual:string;
  fechaMinima:string='1905-12-31';
  booleanFormularioCompletado:boolean;
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones:boolean;
  //validacion de formulario true/false
  formValidado:boolean;
  //tipo de genero

  constructor(private servicioPostulante_:SerivicioPostulanteService,
              private formulario:FormBuilder,
              private validadorPersonalizado:ValidadoresService,
              private ruta_:Router) {
  this.instanciaPostulante=new PostulanteModel();
  this.fechaActual=moment().format("YYYY-MM-DD");
  this.crearFormulario();
  }
  ngOnInit() {
    //consultar si el postulante ha llenado el formulario
    this.cargarDatosFormulario();
  }

  // ==== para hacer validacion y activar la clase en css ====//
  get generoNoValido(){
    return this.formRegistroPostulante.get('genero').invalid   && this.formRegistroPostulante.get('genero').touched ;
  }
  get fechaNacimientoNoValido(){
    return this.formRegistroPostulante.get('fechaNacimiento').invalid && this.formRegistroPostulante.get('fechaNacimiento').touched ;
  }
  get documentoIdentidadNoValido(){
    return this.formRegistroPostulante.get('documentoIndentidad').invalid && this.formRegistroPostulante.get('documentoIndentidad').touched;
  }
  // input nombre
  get nombreNoValido(){
    return this.formRegistroPostulante.get('nombresCompleto').invalid && this.formRegistroPostulante.get('nombresCompleto').touched;
  }
  get nombreValido(){
    return this.formRegistroPostulante.get('nombresCompleto').invalid &&  this.formRegistroPostulante.get('nombresCompleto').touched;
  }
  get soloTextoNombre(){
    return this.formRegistroPostulante.controls['nombresCompleto'].errors['soloTexto'] ;
  }
  get nombreVacio(){
    return this.formRegistroPostulante.get('nombresCompleto').value;
  }
  // input apellido
  get apellidoNoValido(){
    return this.formRegistroPostulante.get('apellidosCompleto').invalid && this.formRegistroPostulante.get('apellidosCompleto').touched;
  }
  get apellidoValido(){
    return this.formRegistroPostulante.get('apellidosCompleto').invalid &&  this.formRegistroPostulante.get('apellidosCompleto').touched;
  }
  get soloTextoApellido(){
    return this.formRegistroPostulante.controls['apellidosCompleto'].errors['soloTexto'] ;
  }
  get apellidoVacio(){
    return this.formRegistroPostulante.get('apellidosCompleto').value;
  }
  //input telefono
  get telefonoNoValido(){
    return this.formRegistroPostulante.get('telefono').invalid && this.formRegistroPostulante.get('telefono').touched;
  }
  get soloNumerosTelefono(){
    return this.formRegistroPostulante.controls['telefono'].errors['soloNumeros'] ;
  }
  get telefonoVacio(){
    return this.formRegistroPostulante.get('telefono').value;
  }

  //input direccion de domicilio
  get direccionNoValida(){
    return this.formRegistroPostulante.get('direccionDomicilio').invalid && this.formRegistroPostulante.get('direccionDomicilio').touched;
  }
  crearFormulario(){
    this.formRegistroPostulante=this.formulario.group({
      nombresCompleto:['',
                  [
                    Validators.required,
                    this.validadorPersonalizado.soloTexto,
                    Validators.maxLength(20)

                  ]
              ],
      apellidosCompleto:['',
                   [
                      Validators.required,
                      this.validadorPersonalizado.soloTexto,
                      Validators.maxLength(20)
                   ]
               ],
      documentoIndentidad:['',
                    [
                      Validators.required,
                      Validators.maxLength(20)
                    ]
                  ],
      telefono:['',
                  [
                    Validators.required,
                    this.validadorPersonalizado.soloNumeros,
                    Validators.maxLength(15)
                  ]
                ],
      fechaNacimiento:[this.fechaActual,
                    [
                      Validators.required,
                      this.validadorPersonalizado.noFechaMayorActualPostulante
                    ]
                  ],
      genero:['',
                [
                  Validators.required,
                ]
              ],
      direccionDomicilio:['',
                [
                  Validators.required,
                  Validators.maxLength(30)
                ]
             ],
    });
  }

  cargarDatosFormulario(){
    this.servicioPostulante_.listarFormPostulante().subscribe(
      siHacesBien=>{
           // si esta registradoo en la BD el formulario completo entonces presento los datos
          if(siHacesBien['Siglas']=="OE"){
              this.booleanFormularioCompletado=true;
              this.instanciaPostulante.observaciones=siHacesBien['mensaje']['observaciones']
              this.instanciaPostulante.estado=siHacesBien['mensaje']['estado'];
              this.instanciaPostulante.nombre=siHacesBien['mensaje']['nombre'];
              this.instanciaPostulante.apellido=siHacesBien['mensaje']['apellido'];
              this.instanciaPostulante.cedula=siHacesBien['mensaje']['cedula'];
              this.instanciaPostulante.fecha_nacimiento=siHacesBien['mensaje']['fecha_nacimiento'];
              this.instanciaPostulante.telefono=siHacesBien['mensaje']['telefono'];
              this.instanciaPostulante.genero=siHacesBien['mensaje']['genero'];
              this.instanciaPostulante.direccion_domicilio=siHacesBien['mensaje']['direccion_domicilio'];

              //cargo los datos al formulario
              this.formRegistroPostulante.setValue({
              nombresCompleto:this.instanciaPostulante.nombre,
              apellidosCompleto:this.instanciaPostulante.apellido,
              documentoIndentidad:this.instanciaPostulante.cedula,
              telefono:this.instanciaPostulante.telefono,
              fechaNacimiento:this.instanciaPostulante.fecha_nacimiento,
              genero:this.instanciaPostulante.genero,
              direccionDomicilio:this.instanciaPostulante.direccion_domicilio
            });
            //ahun no lo revisan al formulario
            if(this.instanciaPostulante.estado==0 && this.instanciaPostulante.observaciones===''){
              this.formValidado=false;
              this.obervaciones=false;
              this.formRegistroPostulante.disable();
            }
            //ya lo revisaron al formulaorio,pero no fue validado
            if(this.instanciaPostulante.estado==0 && this.instanciaPostulante.observaciones!=''){
              this.formValidado=false;
              this.obervaciones=true;
            }
            //lo revisaron y lo validaron
            if(this.instanciaPostulante.estado==1 && this.instanciaPostulante.observaciones!=''){
              this.formValidado=true;
              this.obervaciones=true;
              this.booleanFormularioCompletado=true;
              this.formRegistroPostulante.disable();
            }

          }
      },(peroSiTenemosErro)=>{
        Swal('Error', peroSiTenemosErro['error'], 'error')
    });

  }

  //creacion usuario estudiante
  registrarPostulante(){
    if(this.formRegistroPostulante.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe llenar todos los campos correctamente'
      })
      return Object.values(this.formRegistroPostulante.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaPostulante.estado=0;
    this.instanciaPostulante.observaciones="";
    this.instanciaPostulante.nombre=this.formRegistroPostulante.value.nombresCompleto;
    this.instanciaPostulante.apellido=this.formRegistroPostulante.value.apellidosCompleto;
    this.instanciaPostulante.cedula=this.formRegistroPostulante.value.documentoIndentidad;
    this.instanciaPostulante.fecha_nacimiento=this.formRegistroPostulante.value.fechaNacimiento;
    this.instanciaPostulante.telefono=this.formRegistroPostulante.value.telefono;
    this.instanciaPostulante.genero=this.formRegistroPostulante.value.genero;
    this.instanciaPostulante.direccion_domicilio=this.formRegistroPostulante.value.direccionDomicilio;
    this.servicioPostulante_.crearPostulante(this.instanciaPostulante).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          toast({
            type: 'success',
            title: 'Registrado'
          })
          this.booleanFormularioCompletado=true;
          this.formValidado=false;
          this.obervaciones=false;
          this.formRegistroPostulante.disable();
        }else{
            Swal('Ups', siHacesBien['error'], 'info')
        }

      },(peroSiTenemosErro)=>{
        Swal({
          title:'Error',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        });
    });
  }

  //editar
  editarPostulante(){
    this.instanciaPostulante.estado=0;
    this.instanciaPostulante.observaciones="";
    this.instanciaPostulante.nombre=this.formRegistroPostulante.value.nombresCompleto;
    this.instanciaPostulante.apellido=this.formRegistroPostulante.value.apellidosCompleto;
    this.instanciaPostulante.cedula=this.formRegistroPostulante.value.documentoIndentidad;
    this.instanciaPostulante.fecha_nacimiento=this.formRegistroPostulante.value.fechaNacimiento;
    this.instanciaPostulante.telefono=this.formRegistroPostulante.value.telefono;
    this.instanciaPostulante.genero=this.formRegistroPostulante.value.genero;
    this.instanciaPostulante.direccion_domicilio=this.formRegistroPostulante.value.direccionDomicilio;
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //LAS OBERSIACIONE LE BORRO O LE PONGO EN VACIO POR QUE SE SUPONE QUE VUELVE A INTENTAR
    this.servicioPostulante_.actulizarDatosPostulante(this.instanciaPostulante).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          toast({
            type: 'success',
            title: 'Actualizado'
          })
          //descativamos el formulario//si no existe observaciones el formualrio no ha sido revisado
          this.obervaciones=false;
          //si el usuario esta el estado en 1// estado cero
          this.formValidado=false;
          this.formRegistroPostulante.disable();
          //redirecciono a la misma pagina
          this.ruta_.navigate(['/panel-postulante/form-info-postulante']);
          }else{
             Swal('Info', siHacesBien['mensaje'], 'info')
          }
      },(peroSiTenemosErro)=>{
         Swal({
          title:'Error',
          type:'error',
          text:peroSiTenemosErro['mensaje']
         });
    });

  }
}
