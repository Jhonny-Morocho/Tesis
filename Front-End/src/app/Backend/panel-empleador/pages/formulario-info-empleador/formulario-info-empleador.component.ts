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
import {ValidadoresService} from 'src/app/servicios/validadores.service';


@Component({
  selector: 'app-formulario-info-empleador',
  templateUrl: './formulario-info-empleador.component.html'
})
export class FormularioInfoEmpleadorComponent implements OnInit {
  instanciaEmpleador:EmpleadorModel;
  booleanFormularioCompletado:boolean;
  arrayProvincias:ProvinciasModels []=[];
  arrayCiudad:CiudadesModel []=[];
  formEmpleador:FormGroup;
  //reviso si existe una obervacion si existe entonces en formulario si ha sido revisadop
  obervaciones:boolean;
  //validacion de formulario true/false
  formValidado:boolean;
  constructor(private servicioEmpleador_:SerivicioEmpleadorService,
              private servicioCiudades:ServicioCiudades,
              private formBuilder:FormBuilder,
              private validacionPersonalizada:ValidadoresService,
              private servicioProvincias:ServicioProvincias,
              private ruta_:Router) {
  this.instanciaEmpleador=new EmpleadorModel();
  this.crearFormulario();
  this.provincias();
  }

  ngOnInit() {
    this.cargarDatosForm();
    //responsibo
    $("body").removeClass("sidebar-open");
  }

  crearFormulario(){
    this.formEmpleador=this.formBuilder.group({
      razonSocial:['',[Validators.required,Validators.maxLength(30)]],
      tipoEmpresa:['',[Validators.required,Validators.maxLength(30)]],
      actividadEconomica:['',[Validators.required,Validators.maxLength(100)]],
      numeroRuc:['',[Validators.required,Validators.maxLength(13),this.validacionPersonalizada.rucNoValido]],
      cedula:['',[Validators.required,Validators.maxLength(20)]],
      nomRepresentanteLegal:['',[Validators.required,Validators.maxLength(30)]],
      telefono:['',[Validators.required,Validators.maxLength(15),this.validacionPersonalizada.soloNumeros]],
      provincia:['',[Validators.required,]],
      ciudad:['',[Validators.required,]],
      direcionDomicilio:['',[Validators.required,Validators.maxLength(50)]]
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
            // por lo tanto formulario completo ==true
            this.booleanFormularioCompletado=true;
            //registro de empleador encontrado, ya esta creado el empleador en el BD
            this.instanciaEmpleador.actividad_ruc=siHacesBien['mensaje']['actividad_ruc'];
            this.instanciaEmpleador.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaEmpleador.fk_provincia=siHacesBien['mensaje']['fk_provincia'];
            this.escucharSelectProvincia(this.instanciaEmpleador.fk_provincia);
            this.instanciaEmpleador.fk_ciudad=siHacesBien['mensaje']['fk_ciudad'];
            this.instanciaEmpleador.direccion=siHacesBien['mensaje']['direccion'];
            this.instanciaEmpleador.nom_representante_legal=siHacesBien['mensaje']['nom_representante_legal'];
            this.instanciaEmpleador.num_ruc=siHacesBien['mensaje']['num_ruc'];
            this.instanciaEmpleador.razon_empresa=siHacesBien['mensaje']['razon_empresa'];
            this.instanciaEmpleador.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaEmpleador.tipo_empresa=siHacesBien['mensaje']['tipo_empresa'];
            this.instanciaEmpleador.observaciones=siHacesBien['mensaje']['observaciones'];
            this.instanciaEmpleador.estado=siHacesBien['mensaje']['estado'];
            //cargo los datos al formulario
            this.formEmpleador.setValue({
              razonSocial:this.instanciaEmpleador.razon_empresa,
              tipoEmpresa:this.instanciaEmpleador.tipo_empresa,
              actividadEconomica:this.instanciaEmpleador.actividad_ruc,
              numeroRuc:this.instanciaEmpleador.num_ruc,
              cedula:this.instanciaEmpleador.cedula,
              nomRepresentanteLegal:this.instanciaEmpleador.nom_representante_legal,
              telefono:this.instanciaEmpleador.telefono,
              provincia:this.instanciaEmpleador.fk_provincia,
              ciudad:this.instanciaEmpleador.fk_ciudad,
              direcionDomicilio:this.instanciaEmpleador.direccion,
            });
              //ahun no lo revisan al formulario
              if(this.instanciaEmpleador.estado==0 && this.instanciaEmpleador.observaciones==''){
                this.formValidado=false;
                this.obervaciones=false;

                this.formEmpleador.disable();
              }
              //ya lo revisaron al formulaorio,pero no fue validado
              if(this.instanciaEmpleador.estado==0 && this.instanciaEmpleador.observaciones!=''){
                this.formValidado=false;
                this.obervaciones=true;
              }
              //lo revisaron y lo validaron
              if(this.instanciaEmpleador.estado==1 && this.instanciaEmpleador.observaciones!=''){
                this.formValidado=true;
                this.obervaciones=true;
                this.formEmpleador.disable();
              }
          }else{
            this.booleanFormularioCompletado=false;
          }
      },(peroSiTenemosErro)=>{
        Swal('Ups', peroSiTenemosErro['mensaje'], 'info')
    });

  }
  //creacion del empleador
  registrarEmpledor(){
    if(this.formEmpleador.invalid){
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
      return Object.values(this.formEmpleador.controls).forEach(contol=>{
        contol.markAsTouched();
      });
     }

     Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaEmpleador.razon_empresa=this.formEmpleador.value.razonSocial;
    this.instanciaEmpleador.tipo_empresa=this.formEmpleador.value.tipoEmpresa;
    this.instanciaEmpleador.actividad_ruc=this.formEmpleador.value.actividadEconomica;
    this.instanciaEmpleador.num_ruc=this.formEmpleador.value.numeroRuc;
    this.instanciaEmpleador.cedula=this.formEmpleador.value.cedula;
    this.instanciaEmpleador.nom_representante_legal=this.formEmpleador.value.nomRepresentanteLegal;
    this.instanciaEmpleador.fk_provincia=this.formEmpleador.value.provincia;
    this.instanciaEmpleador.fk_ciudad=this.formEmpleador.value.ciudad;
    this.instanciaEmpleador.telefono=this.formEmpleador.value.telefono;
    this.instanciaEmpleador.direccion=this.formEmpleador.value.direcionDomicilio;
    this.instanciaEmpleador.estado=0;
    this.instanciaEmpleador.observaciones="";

    this.servicioEmpleador_.crearEmpleador(this.instanciaEmpleador).subscribe(
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
          //bloqueo el formulario
          this.booleanFormularioCompletado=true;
          this.formEmpleador.disable();
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

  //editar form de empleador
  editarEmpleador(){
    if(this.formEmpleador.invalid){
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
      return Object.values(this.formEmpleador.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    //LAS OBERSIACIONE LE BORRO O LE PONGO EN VACIO POR QUE SE SUPONE QUE VUELVE A INTENTAR
    this.instanciaEmpleador.observaciones="";
    this.servicioEmpleador_.actulizarDatosEmpleador(this.instanciaEmpleador).subscribe(
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
          //desactivar los campos
          this.formEmpleador.disable();
          //descativamos el formulario//si no existe observaciones el formualrio no ha sido revisado
          this.obervaciones=false;
          //si el usuario esta el estado en 1// estado cero
          this.formValidado=false;
          }else{
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




  get razonSocialNoValido(){
    return this.formEmpleador.get('razonSocial').invalid &&  this.formEmpleador.get('razonSocial').touched;
  }
  get razonSocialVacio(){
    return this.formEmpleador.get('razonSocial').value;
  }





  get tipoEmpresaNoValido(){
    return this.formEmpleador.get('tipoEmpresa').invalid &&  this.formEmpleador.get('tipoEmpresa').touched;
  }
  get tipoEmpresaVacio(){
    return this.formEmpleador.get('tipoEmpresa').value;
  }



  get actividadEconomicaNoValido(){
    return this.formEmpleador.get('actividadEconomica').invalid &&  this.formEmpleador.get('actividadEconomica').touched;
  }
  get actividadEconomicaVacio(){
    return this.formEmpleador.get('actividadEconomica').value;
  }


  get numRucNoValido(){
    return this.formEmpleador.get('numeroRuc').invalid &&  this.formEmpleador.get('numeroRuc').touched;
  }
  get numRucVacia(){
    return this.formEmpleador.get('numeroRuc').value;
  }
  get rucNoPasoValidacion(){
    return this.formEmpleador.controls['numeroRuc'].errors['rucNoValido'] ;
  }




  get cedulaNoValida(){
    return this.formEmpleador.get('cedula').invalid &&  this.formEmpleador.get('cedula').touched;
  }
  get cedulaVacia(){
    return this.formEmpleador.get('cedula').value;
  }


  get nombreRepresentanteNoValido(){
    return this.formEmpleador.get('nomRepresentanteLegal').invalid &&  this.formEmpleador.get('nomRepresentanteLegal').touched;
  }
  get nombreRepresentanteVacio(){
    return this.formEmpleador.get('cedula').value;
  }


  get telefonoNoValido(){
    return this.formEmpleador.get('telefono').invalid &&  this.formEmpleador.get('telefono').touched;
  }
  get telefonoVacio(){
    return this.formEmpleador.get('telefono').value;
  }
  get soloNumerosTelefono(){
    return this.formEmpleador.controls['telefono'].errors['soloNumeros'] ;
  }




  get provinciaNoValido(){
    return this.formEmpleador.get('provincia').invalid &&  this.formEmpleador.get('provincia').touched;
  }
  get provinciaVacia(){
    return this.formEmpleador.get('provincia').value;
  }


  get ciudadNoValido(){
    return this.formEmpleador.get('ciudad').invalid &&  this.formEmpleador.get('ciudad').touched;
  }
  get ciudadVacia(){
    return this.formEmpleador.get('ciudad').value;
  }


  get direccionNoValido(){
    return this.formEmpleador.get('direcionDomicilio').invalid &&  this.formEmpleador.get('direcionDomicilio').touched;
  }
  get direccionVacia(){
    return this.formEmpleador.get('direcionDomicilio').value;
  }

}
