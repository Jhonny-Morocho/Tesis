import { Component, OnInit } from '@angular/core';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import {ServicioProvincias} from 'src/app/servicios/provincias.service';
import {ProvinciasModels} from 'src/app/models/provincias.models'; 
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-info-empleador',
  templateUrl: './formulario-info-empleador.component.html'
})
export class FormularioInfoEmpleadorComponent implements OnInit {
  instanciaEmpleador:EmpleadorModel;
  booleanFormularioCompletado=false;
  arrayProvincias:ProvinciasModels []=[];
  arrayCiudad:ProvinciasModels []=[];
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones=false;
  //validacion de formulario true/false
  formValidado=false;
  constructor(private servicioEmpleador_:SerivicioEmpleadorService,
              private servicioProvincias:ServicioProvincias,
              private ruta_:Router) { }

  ngOnInit() {
    this.instanciaEmpleador=new EmpleadorModel();
    this.formEmpleador();
    this.provincias();
 
  }
  escucharSelectProvincia(idProvincia){
    console.log(idProvincia);
  }
  provincias(){
    this.servicioProvincias.listarProvincias().subscribe(
      siHaceBien=>{
          console.log(siHaceBien);
          this.arrayProvincias=siHaceBien;
      },siHaceMal=>{
        console.warn(siHaceMal);
      }
    );
  }
  formEmpleador(){
   //consultar si el postulante ha llenado el formulario
     this.servicioEmpleador_.listarFormEmpleador().subscribe(
      siHacesBien=>{
            // si esta registradoo en la BD el formulario completo entonces presento los datos
          if(siHacesBien['Siglas']=="OE"){
            // por lo tanto formulario completo ==true
            this.booleanFormularioCompletado=true;
            //registro de empleador encontrado, ya esta creado el empleador en el BD
            this.instanciaEmpleador.actividad_ruc=siHacesBien['mensaje']['actividad_ruc'];
            this.instanciaEmpleador.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaEmpleador.cedula=siHacesBien['mensaje']['fk_provincia'];
            this.instanciaEmpleador.ciudad=siHacesBien['mensaje']['ciudad'];
            this.instanciaEmpleador.direccion=siHacesBien['mensaje']['direccion'];
            this.instanciaEmpleador.nom_representante_legal=siHacesBien['mensaje']['nom_representante_legal'];
            this.instanciaEmpleador.num_ruc=siHacesBien['mensaje']['num_ruc'];
            this.instanciaEmpleador.provincia=siHacesBien['mensaje']['provincia'];
            this.instanciaEmpleador.razon_empresa=siHacesBien['mensaje']['razon_empresa'];
            this.instanciaEmpleador.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaEmpleador.tiposEmpresa=siHacesBien['mensaje']['tipo_empresa'];
            this.instanciaEmpleador.observaciones=siHacesBien['mensaje']['observaciones'];
            this.instanciaEmpleador.estado=siHacesBien['mensaje']['estado'];
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
  //creacion del empleador
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
    console.log(this.instanciaEmpleador);
    this.servicioEmpleador_.crearEmpleador(this.instanciaEmpleador).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
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
  
  //editar form de empleador
  onSubmitFormularioEmpleadorEditar(formRegistroEmpleadorEditar:NgForm){
    console.log("Editar formRegistroEmpleadorEditar");
    if(formRegistroEmpleadorEditar.invalid){
      return;
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    //LAS OBERSIACIONE LE BORRO O LE PONGO EN VACIO POR QUE SE SUPONE QUE VUELVE A INTENTAR
    this.instanciaEmpleador.observaciones="";
    this.servicioEmpleador_.actulizarDatosEmpleador(this.instanciaEmpleador).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        console.log(siHacesBien['Siglas']);
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Actualizado', 'Informacion Registrada con Exito', 'success');
          //descativamos el formulario//si no existe observaciones el formualrio no ha sido revisado
          this.obervaciones=false;
          //si el usuario esta el estado en 1// estado cero
          this.formValidado=false;
          }else{
            console.log(siHacesBien);
             Swal('Ups, No se puede realizar el registro', siHacesBien['mensaje'], 'info')
          }
      },(peroSiTenemosErro)=>{
         Swal({
          title:'Error al registrar informacion',
          type:'error',
          text:peroSiTenemosErro['mensaje']
         }); 
    });
  }

}
