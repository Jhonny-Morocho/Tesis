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
    //consultar si el postulante ha llenado el formulario
    this.servicioEmpleador_.listarFormEmpleador().subscribe(
      siHacesBien=>{
            // si esta registradoo en la BD el formulario completo entonces presento los datos
          if(siHacesBien['Siglas']=="OE"){
            // por lo tanto formulario completo ==true
            this.booleanFormularioCompletado=true;
            console.log(siHacesBien);
            //llena el formulario por primera ves
            this.instanciaEmpleador.actividadRuc=siHacesBien['mensaje']['actividad_ruc'];
            this.instanciaEmpleador.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaEmpleador.ciudad=siHacesBien['mensaje']['ciudad'];
            this.instanciaEmpleador.direccion=siHacesBien['mensaje']['direccion'];
            this.instanciaEmpleador.nomRepresentaLegal=siHacesBien['mensaje']['nom_representante_legal'];
            this.instanciaEmpleador.numeroRuc=siHacesBien['mensaje']['num_ruc'];
            this.instanciaEmpleador.provincia=siHacesBien['mensaje']['provincia'];
            this.instanciaEmpleador.razonEmpresa=siHacesBien['mensaje']['razon_empresa'];
            this.instanciaEmpleador.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaEmpleador.tiposEmpresa=siHacesBien['mensaje']['tipo_empresa'];
            this.instanciaEmpleador.observaciones=siHacesBien['mensaje']['observaciones'];
            //si es mayor a cero es q si ha revisado y si ha visto el formulario
             this.obervaciones = ( this.instanciaEmpleador.observaciones.length>0)?true:false;
             this.formValidado = ( this.instanciaEmpleador.estado==1)?true:false;
            }else{
            //llena el formulario por primera ves
              // this.instanciaPostulante.nombre="";
              // this.instanciaPostulante.apellido="";
              // this.instanciaPostulante.cedula="";
              // this.instanciaPostulante.telefono="";
              // this.instanciaPostulante.genero=0;
              // this.instanciaPostulante.fecha_nacimiento=this.today;
              // this.instanciaPostulante.direccion_domicilio="";
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

  onSubmitFormularioEmpleadorEditar(formRegistroEmpleadorEditar:NgForm){
    console.log("Editar formRegistroEmpleadorEditar");
    if(formRegistroEmpleadorEditar.invalid){
      return;
     }
  }

}
