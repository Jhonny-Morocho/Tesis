import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import {ValidadoresService} from 'src/app/servicios/validadores.service';
import { Router } from '@angular/router';

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
  //formulario aplastado submit
  submitFormRegistro:boolean=false;

  booleanFormularioCompletado=false;
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones=false;
  //validacion de formulario true/false
  formValidado=false;
  //tipo de genero




  constructor(private servicioPostulante_:SerivicioPostulanteService,
              private formulario:FormBuilder,
              private validadorPersonalizado:ValidadoresService,
              private ruta_:Router) {
  this.instanciaPostulante=new PostulanteModel();

  this.funcionFechaActual();
  this.crearFormulario();

  }
  funcionFechaActual(){
    var fecha:any = new Date(); //Fecha actual
    var mes:string = fecha.getMonth()+1; //obteniendo mes
    var dia:string = fecha.getDate(); //obteniendo dia
    var ano:string = fecha.getFullYear(); //obteniendo año
    if(parseInt(dia)<10){
      dia='0'+dia;
    }
    if(parseInt(mes)<10){
      mes='0'+mes;
    }
    this.fechaActual=ano+'-'+mes+'-'+dia;
  }
  ngOnInit() {
    //consultar si el postulante ha llenado el formulario
    //this.formMotrarFormularioCompletado();
  }

  // para hacer validacion y activar la clase en css
  get generoNoValido(){
    return this.formRegistroPostulante.get('genero').invalid  ;
  }
  get fechaNacimientoNoValido(){
    return this.formRegistroPostulante.get('fechaNacimiento').invalid && this.formRegistroPostulante.get('fechaNacimiento').touched ;
  }
  get documentoIdentidadNoValido(){
    return this.formRegistroPostulante.get('documentoIndentidad').invalid && this.formRegistroPostulante.get('documentoIndentidad').touched;
  }
  get nombreNoValido(){
    return this.formRegistroPostulante.get('nombresCompleto').invalid && this.formRegistroPostulante.get('nombresCompleto').touched;
  }

  get apellidoNoValido(){
    return this.formRegistroPostulante.get('apellidosCompleto').invalid && this.formRegistroPostulante.get('apellidosCompleto').touched;
  }
  get telefonoNoValido(){
    return this.formRegistroPostulante.get('telefono').invalid && this.formRegistroPostulante.get('telefono').touched;
  }
  get direccionNoValida(){
    return this.formRegistroPostulante.get('direccionDomicilio').invalid && this.formRegistroPostulante.get('direccionDomicilio').touched;
  }
  crearFormulario(){
    this.formRegistroPostulante=this.formulario.group({
      nombresCompleto:['',
                  [
                    Validators.required,
                    Validators.maxLength(20)

                  ]
              ],
      apellidosCompleto:['',
                   [
                      Validators.required,
                      this.validadorPersonalizado.noHerrera,
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
                    Validators.maxLength(10)
                  ]
                ],
      fechaNacimiento:[this.fechaActual,
                    [
                      Validators.required
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

  formMotrarFormularioCompletado(){
    this.servicioPostulante_.listarFormPostulante().subscribe(
      siHacesBien=>{
           // si esta registradoo en la BD el formulario completo entonces presento los datos
          if(siHacesBien['Siglas']=="OE"){
            // por lo tanto formulario completo ==true
            this.booleanFormularioCompletado=true;
            //llena el formulario por primera ves
            this.instanciaPostulante.nombre=siHacesBien['mensaje']['nombre'];
            this.instanciaPostulante.apellido=siHacesBien['mensaje']['apellido'];
            this.instanciaPostulante.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaPostulante.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaPostulante.genero=siHacesBien['mensaje']['genero'];
            this.instanciaPostulante.fecha_nacimiento=siHacesBien['mensaje']['fecha_nacimiento'];
            this.instanciaPostulante.direccion_domicilio=siHacesBien['mensaje']['direccion_domicilio'];
            this.instanciaPostulante.observaciones=siHacesBien['mensaje']['observaciones'];
            this.instanciaPostulante.estado=siHacesBien['mensaje']['estado'];
            //si es mayor a cero es q si ha revisado y si ha visto el formulario
            this.obervaciones = ( this.instanciaPostulante.observaciones.length>0)?true:false;
            this.formValidado = ( this.instanciaPostulante.estado==1)?true:false;

          }
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });

  }

  //creacion usuario estudiante
  registrarPostulante(){
    this.submitFormRegistro=true;
    console.log(this.formRegistroPostulante);

    console.log(this.formRegistroPostulante.value);
    return;
    console.log(this.formRegistroPostulante);
    console.log("on submit Formulario Registro datos postulante postular");
    if(this.formRegistroPostulante.invalid){
      return;
     }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaPostulante.estado=0;
    this.instanciaPostulante.observaciones="";
    console.log(this.instanciaPostulante);
    this.servicioPostulante_.crearPostulante(this.instanciaPostulante).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Información registrada con éxito', 'success');
          localStorage.setItem("nombre", this.instanciaPostulante.nombre);
          localStorage.setItem("apellido", this.instanciaPostulante.apellido);
          localStorage.setItem("cedula",this.instanciaPostulante.cedula);
          localStorage.setItem("telefono",this.instanciaPostulante.telefono);
          localStorage.setItem("genero",(this.instanciaPostulante.genero).toString());
          localStorage.setItem("direccion_domicilio",this.instanciaPostulante.direccion_domicilio);
          localStorage.setItem("fecha_nacimiento",this.instanciaPostulante.fecha_nacimiento);
          localStorage.setItem("external_es",siHacesBien['mensaje']['external_es']);
          this.booleanFormularioCompletado=true;
        }else{
            console.warn(siHacesBien);
            Swal('Ups, No se puede realizar el registro', siHacesBien['error'], 'info')
          }

      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro['error']);
        console.log(this.instanciaPostulante);
        Swal({
          title:'Error al registrar informacion',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        });
    });
  }

  //editar
  onSubmitFormularioPostulanteEditar(formRegistroPostulanteDatosCompletos:NgForm){
    if(formRegistroPostulanteDatosCompletos.invalid){
      return;
     }

     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //LAS OBERSIACIONE LE BORRO O LE PONGO EN VACIO POR QUE SE SUPONE QUE VUELVE A INTENTAR
    this.instanciaPostulante.observaciones="";
    this.servicioPostulante_.actulizarDatosPostulante(this.instanciaPostulante).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Actualizado', 'Información registrada con éxito', 'success');
          //descativamos el formulario//si no existe observaciones el formualrio no ha sido revisado
          this.obervaciones=false;
          //si el usuario esta el estado en 1// estado cero
          this.formValidado=false;
          }else{
            console.log(siHacesBien);
             Swal('Info', siHacesBien['mensaje'], 'info')
          }
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
         Swal({
          title:'Error',
          type:'error',
          text:peroSiTenemosErro['mensaje']
         });
    });

  }
}
