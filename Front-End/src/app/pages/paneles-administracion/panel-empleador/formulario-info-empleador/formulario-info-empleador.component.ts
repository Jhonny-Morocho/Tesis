import { Component, OnInit } from '@angular/core';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import {ServicioProvincias} from 'src/app/servicios/provincias.service';
import {ProvinciasModels} from 'src/app/models/provincias.models'; 
import {CiudadesModel} from 'src/app/models/ciudades.models';
import {ServicioCiudades} from 'src/app/servicios/ciudades.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-info-empleador',
  templateUrl: './formulario-info-empleador.component.html'
})
export class FormularioInfoEmpleadorComponent implements OnInit {
  instanciaEmpleadorLlenarForm:EmpleadorModel;
  instanciaEmpleadorRegistrar:EmpleadorModel;
  booleanFormularioCompletado=false;
  arrayProvincias:ProvinciasModels []=[];
  arrayCiudad:CiudadesModel []=[];
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones=false;
  //validacion de formulario true/false
  formValidado=false;
  constructor(private servicioEmpleador_:SerivicioEmpleadorService,
              private servicioCiudades:ServicioCiudades,
              private servicioProvincias:ServicioProvincias,
              private ruta_:Router) { }

  ngOnInit() {
    this.instanciaEmpleadorRegistrar=new EmpleadorModel();
    this.instanciaEmpleadorLlenarForm=new EmpleadorModel();
    this.provincias();
    this.formEmpleador();
 
  }
  escucharSelectProvincia(idProvincia){
    console.log(idProvincia);
    this.servicioCiudades.listarCiudades(idProvincia).subscribe(
      siHaceBien=>{
          console.log(siHaceBien);
          this.arrayCiudad=siHaceBien;
      },siHaceMal=>{
        console.warn(siHaceMal);
      }
    );
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
            console.log(siHacesBien);
            // por lo tanto formulario completo ==true
            this.booleanFormularioCompletado=true;
            //registro de empleador encontrado, ya esta creado el empleador en el BD
            this.instanciaEmpleadorLlenarForm.actividad_ruc=siHacesBien['mensaje']['actividad_ruc'];
            this.instanciaEmpleadorLlenarForm.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaEmpleadorLlenarForm.fk_provincia=siHacesBien['mensaje']['fk_provincia'];
            this.escucharSelectProvincia(this.instanciaEmpleadorLlenarForm.fk_provincia);
            this.instanciaEmpleadorLlenarForm.fk_ciudad=siHacesBien['mensaje']['fk_ciudad'];
            this.instanciaEmpleadorLlenarForm.direccion=siHacesBien['mensaje']['direccion'];
            this.instanciaEmpleadorLlenarForm.nom_representante_legal=siHacesBien['mensaje']['nom_representante_legal'];
            this.instanciaEmpleadorLlenarForm.num_ruc=siHacesBien['mensaje']['num_ruc'];
            this.instanciaEmpleadorLlenarForm.razon_empresa=siHacesBien['mensaje']['razon_empresa'];
            this.instanciaEmpleadorLlenarForm.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaEmpleadorLlenarForm.tipo_empresa=siHacesBien['mensaje']['tipo_empresa'];
            this.instanciaEmpleadorLlenarForm.observaciones=siHacesBien['mensaje']['observaciones'];
            this.instanciaEmpleadorLlenarForm.estado=siHacesBien['mensaje']['estado'];
            //si es mayor a cero es q si ha revisado y si ha visto el formulario
            this.obervaciones = ( this.instanciaEmpleadorLlenarForm.observaciones.length>0)?true:false;
            this.formValidado = ( this.instanciaEmpleadorLlenarForm.estado==1)?true:false;
            }
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
    });

  }
  //creacion del empleador
  onSubmitFormularioEmpledor(formRegistroEmpleador:NgForm){
    console.log(formRegistroEmpleador);
    if(formRegistroEmpleador.invalid){
      return;
     }
     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaEmpleadorRegistrar.estado=0;
    this.instanciaEmpleadorRegistrar.observaciones="";
    console.log(this.instanciaEmpleadorRegistrar);
    this.servicioEmpleador_.crearEmpleador(this.instanciaEmpleadorRegistrar).subscribe(
      siHacesBien=>{
        Swal.close();
        if(siHacesBien['Siglas']=="OE"){
          Swal('Registrado', 'Informacion Registrada con Exito', 'success');
          console.log(siHacesBien);
          
          //bloqueo el formulario
          this.booleanFormularioCompletado=true;
          this.obervaciones=false;
           //this.ruta_.navigateByUrl('/panel-postulante/form-info-postulante');
          }else{
            console.warn(siHacesBien);
            Swal('Ups, No se puede realizar el registro', siHacesBien['error'], 'info')
          }
      
      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro['error']);
        console.log(this.instanciaEmpleadorRegistrar);
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
    this.instanciaEmpleadorLlenarForm.observaciones="";
    console.log(this.instanciaEmpleadorLlenarForm);
    this.servicioEmpleador_.actulizarDatosEmpleador(this.instanciaEmpleadorLlenarForm).subscribe(
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
