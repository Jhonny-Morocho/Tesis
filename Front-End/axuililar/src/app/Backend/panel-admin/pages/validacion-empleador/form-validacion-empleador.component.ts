import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { EmpleadorModel } from '../../../../models/empleador.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {CiudadesModel} from 'src/app/models/ciudades.models';
import {ServicioCiudades} from 'src/app/servicios/ciudades.service';
import {ServicioProvincias} from 'src/app/servicios/provincias.service';
import {ProvinciasModels} from 'src/app/models/provincias.models';
@Component({
  selector: 'app-form-validacion-empleador',
  templateUrl: './form-validacion-empleador.component.html'
})
export class FormValidacionEmpleadorComponent implements OnInit {
  instanciaEmpleador:EmpleadorModel;
  externalEmpleador:string;
  //si existe el usuario o no
  encontrado:boolean;
  formEmpleador:FormGroup;
  arrayProvincias:ProvinciasModels []=[];
  arrayCiudad:CiudadesModel []=[];

  constructor(private servicioEmpleador:SerivicioEmpleadorService,
              private servicioCiudades:ServicioCiudades,
              private formBuilder:FormBuilder,
              private servicioProvincias:ServicioProvincias,
              private router:Router,
              private _activateRoute:ActivatedRoute) {
    //obtener los parametros de la ulr para tener los datos del empleador
    this.crearFormulario();
  }

  ngOnInit() {
    this.instanciaEmpleador=new EmpleadorModel;
    this.provincias();
    this.cargarDataFormulario();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  crearFormulario(){
    this.formEmpleador=this.formBuilder.group({
      razonSocial:[''],
      tipoEmpresa:[''],
      actividadEconomica:[''],
      numeroRuc:[''],
      cedula:[''],
      nomRepresentanteLegal:[''],
      telefono:[''],
      provincia:[''],
      ciudad:[''],
      direcionDomicilio:[''],
      observaciones:['',[Validators.required,Validators.maxLength(100)]],
    });
  }
  get observacionesNoValida(){
    return this.formEmpleador.get('observaciones').invalid &&  this.formEmpleador.get('observaciones').touched;
  }

  cargarDataFormulario(){
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.externalEmpleador=params['external_em'];
      this.servicioEmpleador.obtenerEmpleadorExternal_em(params['external_em']).subscribe(
        siHacesBien=>{
          //encontro estudiante estado==0
          if(siHacesBien["Siglas"]=="OE"){
            this.instanciaEmpleador.razon_empresa=siHacesBien['mensaje']['razon_empresa'];
            this.instanciaEmpleador.actividad_ruc=siHacesBien['mensaje']['actividad_ruc'];
            this.instanciaEmpleador.cedula=siHacesBien['mensaje']['cedula'];
            this.instanciaEmpleador.tipo_empresa=siHacesBien['mensaje']['tipo_empresa'];
            this.instanciaEmpleador.fk_provincia=siHacesBien['mensaje']['fk_provincia'];
            this.instanciaEmpleador.telefono=siHacesBien['mensaje']['telefono'];
            this.instanciaEmpleador.fk_ciudad=siHacesBien['mensaje']['fk_ciudad'];
            this.escucharSelectProvincia(this.instanciaEmpleador.fk_provincia);
            this.instanciaEmpleador.direccion=siHacesBien['mensaje']['direccion'];
            this.instanciaEmpleador.estado=siHacesBien['mensaje']['estado'];
            this.instanciaEmpleador.nom_representante_legal=siHacesBien['mensaje']['nom_representante_legal'];
            this.instanciaEmpleador.num_ruc=siHacesBien['mensaje']['num_ruc'];
            this.instanciaEmpleador.observaciones=siHacesBien['mensaje']['observaciones'];
            this.encontrado=true;
            //cargo los datos al formulario
            this.formEmpleador.reset({
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
              observaciones:this.instanciaEmpleador.observaciones
            });
            this.formEmpleador.disable();
            this.formEmpleador.controls['observaciones'].enable();
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
  escucharSelectProvincia(idProvincia){
    this.servicioCiudades.listarCiudades(idProvincia).subscribe(
      siHaceBien=>{
          this.arrayCiudad=siHaceBien;
      },siHaceMal=>{
        Swal('Ups', siHaceMal['mensaje'], 'info')
      }
    );
  }
  provincias(){
    this.servicioProvincias.listarProvincias().subscribe(
      siHaceBien=>{
          this.arrayProvincias=siHaceBien;
      },siHaceMal=>{
        Swal('Ups', siHaceMal['mensaje'], 'info')
      }
    );
  }
 //aprobar postulante //y tambien no aprobar estudiante
 onSubmitForEmpleadorAprobacion(){
  if(this.formEmpleador.invalid){
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
  this.instanciaEmpleador.observaciones=this.formEmpleador.value.observaciones;
  this.servicioEmpleador.actulizarAprobacionEmpleador(
                Number(this.instanciaEmpleador.estado),
                this.externalEmpleador,
                this.instanciaEmpleador.observaciones
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
         title:'Error',
         type:'error',
         text:peroSiTenemosErro['mensaje']
       });
    }
  );
}
  //internacion con el boton del formulario apra que cambie de color aprobado/no aprobado
  // estadoAprobado(estado:Number){
  //   if(estado==0){
  //     this.instanciaEmpleador.estado=0;
  //     return false;
  //   }
  //   if(estado==1){
  //     this.instanciaEmpleador.estado=1;
  //     return true;
  //   }

  // }

  estadoOferta(){
    if(this.instanciaEmpleador.estado==0){
      return false;
    }
    if(this.instanciaEmpleador.estado==1){
      return true;
    }
  }
  onChangeOferta(event){
    if(event==true){
      this.instanciaEmpleador.estado=1;
    }
    if(event==false){
      this.instanciaEmpleador.estado=0;
    }
  }

}
