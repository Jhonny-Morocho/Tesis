import { Component, OnInit } from '@angular/core';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import {ServicioProvincias} from 'src/app/servicios/provincias.service';
import {ProvinciasModels} from 'src/app/models/provincias.models';
import {CiudadesModel} from 'src/app/models/ciudades.models';
import {ServicioCiudades} from 'src/app/servicios/ciudades.service';
import Swal from 'sweetalert2';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-info-empleador',
  templateUrl: './formulario-info-empleador.component.html'
})
export class FormularioInfoEmpleadorComponent implements OnInit {
  instanciaEmpleadorLlenarForm:EmpleadorModel;
  instanciaEmpleadorRegistrar:EmpleadorModel;
  booleanFormularioCompletado=false;
  booleanFormRegistro=false;
  arrayProvincias:ProvinciasModels []=[];
  arrayCiudad:CiudadesModel []=[];
  formEmpleador:FormGroup;
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones=false;
  //validacion de formulario true/false
  formValidado=false;
  constructor(private servicioEmpleador_:SerivicioEmpleadorService,
              private servicioCiudades:ServicioCiudades,
              private formBuilder:FormBuilder,
              private servicioProvincias:ServicioProvincias,
              private ruta_:Router) {
  this.crearFormulario();
  this.provincias();
  }

  ngOnInit() {
    this.instanciaEmpleadorRegistrar=new EmpleadorModel();
    this.instanciaEmpleadorLlenarForm=new EmpleadorModel();
  }
  get razonSocialNoValido(){
    return this.formEmpleador.get('razonSocial').invalid &&  this.formEmpleador.get('razonSocial').touched;
  }
  get tipoEmpresaNoValido(){
    return this.formEmpleador.get('tipoEmpresa').invalid &&  this.formEmpleador.get('tipoEmpresa').touched;
  }
  get actividadEconomica(){
    return this.formEmpleador.get('actividadEconomica').invalid &&  this.formEmpleador.get('actividadEconomica').touched;
  }
  get numRucNoValido(){
    return this.formEmpleador.get('numeroRuc').invalid &&  this.formEmpleador.get('numeroRuc').touched;
  }
  get cedulaNoValida(){
    return this.formEmpleador.get('cedula').invalid &&  this.formEmpleador.get('cedula').touched;
  }
  get nombreRepresentanteNoValido(){
    return this.formEmpleador.get('nomRepresentanteLegal').invalid &&  this.formEmpleador.get('nomRepresentanteLegal').touched;
  }
  get telefonoNoValido(){
    return this.formEmpleador.get('telefono').invalid &&  this.formEmpleador.get('telefono').touched;
  }
  get provinciaNoValido(){
    return this.formEmpleador.get('provincia').invalid &&  this.formEmpleador.get('provincia').touched;
  }
  get ciudadNoValido(){
    return this.formEmpleador.get('ciudad').invalid &&  this.formEmpleador.get('ciudad').touched;
  }
  get direccionNoValido(){
    return this.formEmpleador.get('direcionDomicilio').invalid &&  this.formEmpleador.get('direcionDomicilio').touched;
  }
  crearFormulario(){
    this.formEmpleador=this.formBuilder.group({
      razonSocial:['',[Validators.required,Validators.maxLength(20)]],
      tipoEmpresa:['',[Validators.required,Validators.maxLength(20)]],
      actividadEconomica:['',[Validators.required,Validators.maxLength(20)]],
      numeroRuc:['',[Validators.required,Validators.maxLength(15)]],
      cedula:['',[Validators.required,]],
      nomRepresentanteLegal:['',[Validators.required,]],
      telefono:['',[Validators.required,]],
      provincia:['',[Validators.required,]],
      ciudad:['',[Validators.required,]],
      direcionDomicilio:['',[Validators.required,]]
    });
  }

  escucharSelectProvincia(idProvincia){
    this.servicioCiudades.listarCiudades(idProvincia).subscribe(
      siHaceBien=>{
          this.arrayCiudad=siHaceBien;
      },siHaceMal=>{
        Swal('Error', siHaceMal['mensaje'], 'error');
      }
    );
  }
  provincias(){
    this.servicioProvincias.listarProvincias().subscribe(
      siHaceBien=>{
          this.arrayProvincias=siHaceBien;
      },siHaceMal=>{
        Swal('Error', siHaceMal['mensaje'], 'error');
      }
    );
  }
  cargarDatosForm(){
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
  registrarEmpledor(formRegistroEmpleador:NgForm){
    console.log(formRegistroEmpleador);
    if(formRegistroEmpleador.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'error',
        title: 'Debe completar todos los campos'
      })
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
          Swal('Registrado', 'Información Registrada con éxito', 'success');
          console.log(siHacesBien);
          localStorage.setItem("actividad_ruc", this.instanciaEmpleadorRegistrar.actividad_ruc);
          localStorage.setItem("cedula", this.instanciaEmpleadorRegistrar.cedula);
          localStorage.setItem("direccion",this.instanciaEmpleadorRegistrar.direccion);
          localStorage.setItem("estado",(this.instanciaEmpleadorRegistrar.estado).toString());
          localStorage.setItem("nom_representante_legal",this.instanciaEmpleadorRegistrar.nom_representante_legal);
          localStorage.setItem("num_ruc",this.instanciaEmpleadorRegistrar.num_ruc);
          localStorage.setItem("external_em",this.instanciaEmpleadorRegistrar.external_em);

          //bloqueo el formulario
          this.booleanFormRegistro=true;
           //this.ruta_.navigateByUrl('/panel-postulante/form-info-postulante');
          }else{
            console.warn(siHacesBien);
            Swal('Ups', siHacesBien['error'], 'info')
          }

      },(peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro['error']);
        console.log(this.instanciaEmpleadorRegistrar);
        Swal({
          title:'Error',
          type:'error',
          text:peroSiTenemosErro['mensaje']
        });
    });

  }

  //editar form de empleador
  onSubmitFormularioEmpleadorEditar(formRegistroEmpleadorEditar:NgForm){
    console.log("Editar formRegistroEmpleadorEditar");
    if(formRegistroEmpleadorEditar.invalid){
      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      toast({
        type: 'info',
        title: 'Debe completar todos los campos'
      })
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
          Swal('Actualizado', 'Información Registrada con éxito', 'success');
          //descativamos el formulario//si no existe observaciones el formualrio no ha sido revisado
          this.obervaciones=false;
          //si el usuario esta el estado en 1// estado cero
          this.formValidado=false;
          }else{
            console.log(siHacesBien);
             Swal('Ups', siHacesBien['mensaje'], 'info')
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
