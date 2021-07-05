import { Component, OnInit } from '@angular/core';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {SerivicioPostulanteService} from 'src/app/servicios/serivicio-postulante.service';
import Swal from 'sweetalert2';
// obtener el parametro q viene x la url
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-info-postulante',
  templateUrl: './form-validacion-postulante.component.html'
})
export class FormInfoPostulanteComponent implements OnInit {
  instanciaPostulante:PostulanteModel;
  externalEst:string;
  formPosutalnte:FormGroup;
  //mensaje de alerta si el usuario no se encunetrta
  encontrado:boolean;
  constructor(private servicioPostulante_:SerivicioPostulanteService,
              private formBulder:FormBuilder,
              private router:Router,
              private _activateRoute:ActivatedRoute) {
    this.instanciaPostulante=new PostulanteModel();
    //ontengo el paremtro de la url pára tarer los datos des estudiante
    this.crearFormularioPostulante();
   }
  ngOnInit() {
    this.cargarDatosFormPostulante();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  get observacionesNoValida(){
    return this.formPosutalnte.get('observaciones').invalid &&  this.formPosutalnte.get('observaciones').touched;
  }
  crearFormularioPostulante(){
    this.formPosutalnte=this.formBulder.group({
      nombresCompleto:['',],
      apellidosCompleto:[''],
      documentoIndentidad:[''],
      telefono:[''],
      fechaNacimiento:[''],
      genero:[''],
      observaciones:['',[Validators.required,Validators.maxLength(100)]],
      direccionDomicilio:[''],
    });
  }

  cargarDatosFormPostulante(){
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.externalEst=params['external_es'];
      this.servicioPostulante_.obtenerPostulanteExternal_es(params['external_es']).subscribe(
        suHacesBien=>{
          //encontro estudiante estado==0
          if(suHacesBien["Siglas"]=="OE"){
            this.instanciaPostulante.nombre=suHacesBien['mensaje']['nombre'];
            this.instanciaPostulante.apellido=suHacesBien['mensaje']['apellido'];
            this.instanciaPostulante.cedula=suHacesBien['mensaje']['cedula'];
            this.instanciaPostulante.direccion_domicilio=suHacesBien['mensaje']['direccion_domicilio'];
            this.instanciaPostulante.fecha_nacimiento=suHacesBien['mensaje']['fecha_nacimiento'];
            this.instanciaPostulante.genero=suHacesBien['mensaje']['genero'];
            this.instanciaPostulante.telefono=suHacesBien['mensaje']['telefono'];
            this.instanciaPostulante.estado=suHacesBien['mensaje']['estado'];
            this.instanciaPostulante.observaciones=suHacesBien['mensaje']['observaciones'];
            this.encontrado=true;
            //cargo los datos al formulario
            this.formPosutalnte.reset({
              nombresCompleto:this.instanciaPostulante.nombre,
              apellidosCompleto:this.instanciaPostulante.apellido,
              documentoIndentidad:this.instanciaPostulante.cedula,
              telefono:this.instanciaPostulante.telefono,
              fechaNacimiento:this.instanciaPostulante.fecha_nacimiento,
              genero:this.instanciaPostulante.genero,
              direccionDomicilio:this.instanciaPostulante.direccion_domicilio,
              observaciones:this.instanciaPostulante.observaciones
            });
            this.formPosutalnte.disable();
            this.formPosutalnte.controls['observaciones'].enable();
          }
          //no encontro estudiantes que tengan estado ==1
          else{
            this.encontrado=false;
          }
        },peroSiTenemosErro=>{
          Swal('Ups', peroSiTenemosErro['mensaje'], 'info')
        }
      );
    });
  }
  //aprobar postulante //y tambien no aprobar estudiante
  validarInfoPostulante(){
    if(this.formPosutalnte.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe completar los campos requeridos'
      })
      return Object.values(this.formPosutalnte.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaPostulante.observaciones=this.formPosutalnte.value.observaciones;
    this.servicioPostulante_.actulizarAprobacionPostulante(Number(this.instanciaPostulante.estado),this.externalEst,this.instanciaPostulante.observaciones
    ).subscribe(
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
            this.router.navigateByUrl('/panel-admin/tareas');
          }else{
            Swal('Ups', siHacesBien['mensaje'], 'info')
          }

      },(peroSiTenemosErro)=>{
       Swal({
           title:'Error al registrar informacion',
           type:'error',
           text:peroSiTenemosErro['mensaje']
         });
      }
    );
  }
  //internacion con el boton del formulario apra que cambie de color aprobado/no aprobado
  estadoOferta(){
    if(this.instanciaPostulante.estado==0){
      return false;
    }
    if(this.instanciaPostulante.estado==1){
      return true;
    }
  }
  onChangeOferta(event){
    if(event==true){
      this.instanciaPostulante.estado=1;
    }
    if(event==false){
      this.instanciaPostulante.estado=0;
    }
  }
}
