import { Component, OnInit } from '@angular/core';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-formulario-info-empleador',
  templateUrl: './formulario-info-empleador.component.html'
})
export class FormularioInfoEmpleadorComponent implements OnInit {
  instanciaEmpleador:EmpleadorModel;
  booleanFormularioCompletado=false;
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones=false;
  //validacion de formulario true/false
  formValidado=false;
  constructor(private servicioEmpleador_:SerivicioEmpleadorService) { }

  ngOnInit() {
    this.instanciaEmpleador=new EmpleadorModel();
    //datos solo para pruebas
    // this.instanciaEmpleador.razonEmpresa="Sociedad iberca de construcciones electricas S.A (SICE)";
    // this.instanciaEmpleador.tiposEmpresa="Economica";
    // this.instanciaEmpleador.actividadRuc="4100 Construccion de software";
    // this.instanciaEmpleador.numeroRuc="20504006861";
    // this.instanciaEmpleador.cedula="1105116899";
    // this.instanciaEmpleador.provincia="Loja";
    // this.instanciaEmpleador.ciudad="Catamayo";
    // this.instanciaEmpleador.nomRepresentaLegal="Ing. Luis López";
    // this.instanciaEmpleador.telefono="058151581";
    // this.instanciaEmpleador.direccion="Universitari juan de arena Nro 151 a la esquina";
    // this.instanciaEmpleador.observaciones="";
    //================= cuando incie el formulario se cargue los datos por defecto ===============//
    //consultar si el postulante ha llenado el formulario
    this.servicioEmpleador_.listarFormEmpleador().subscribe(
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
            }else{
            //llena el formulario por primera ves
              this.instanciaPostulante.nombre="";
              this.instanciaPostulante.apellido="";
              this.instanciaPostulante.cedula="";
              this.instanciaPostulante.telefono="";
              this.instanciaPostulante.genero=0;
              this.instanciaPostulante.fecha_nacimiento=this.today;
              this.instanciaPostulante.direccion_domicilio="";
            }
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });

  }
  onSubmitFormularioEmpledor(formRegistroEmpleador:NgForm){
    console.log(formRegistroEmpleador);
    console.log("on submit Formulario Registro datos postulante postular");
    if(formRegistroEmpleador.invalid){
      return;
     }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //envio la informacion a mi servicio - consumo el servici
    this.servicioEmpleador_.crearEmpleador(this.instanciaEmpleador).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
          
          // localStorage.setItem("nombre", this.instanciaEmpleador.nombre);
          // localStorage.setItem("apellido", this.instanciaEmpleador.apellido);
          // localStorage.setItem("cedula",this.instanciaEmpleador.cedula);
          // localStorage.setItem("telefono",this.instanciaEmpleador.telefono);
          // localStorage.setItem("genero",(this.instanciaEmpleador.genero).toString());
          // localStorage.setItem("direccion_domicilio",this.instanciaEmpleador.direccion_domicilio);
          // localStorage.setItem("fecha_nacimiento",this.instanciaEmpleador.fecha_nacimiento);
          // localStorage.setItem("external_es",siHacesBien['mensaje']['external_es']);
          console.log(siHacesBien);
           //this.ruta_.navigateByUrl('/panel-postulante/form-info-postulante');
          }else{
            console.warn(siHacesBien);
            Swal('Ups, No se puede realizar el registro', siHacesBien['error'], 'info')
          }
      
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro['error']);
        console.log(this.instanciaEmpleador);
        Swal({
          title:'Error al registrar informacion',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        }); 
    });

  }

}
