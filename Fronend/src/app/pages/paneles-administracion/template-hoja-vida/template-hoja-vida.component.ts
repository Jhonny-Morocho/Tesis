import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
import {TituloModel} from 'src/app/models/titulo.models';
import {TituloService} from 'src/app/servicios/titulos.service';
import {OfertaLaboralEstudianteModel} from 'src/app/models/oferLaboral-Estudiante.models';
import Swal from 'sweetalert2';
//contantes del servidor
import {environment} from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
declare var JQuery:any;
declare var $:any;
declare var bootstrap:any;
@Component({
  selector: 'app-template-hoja-vida',
  templateUrl: './template-hoja-vida.component.html'
})
export class TemplateHojaVidaComponent implements OnInit {
  dominio:any=environment.dominio;
  external_of_es:string;
  arrayPostulante:PostulanteModel[]=[];
  instanciaVerPostulante:PostulanteModel;
  arrayCursosCapacitaciones:CursosCapacitacionesModel[]=[];
  arrayTitulosAcademicos:TituloModel[]=[];
  instanciaOfertaPostulante:OfertaLaboralEstudianteModel;
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private servicioTitulosAcademicos:TituloService, 
              private _activateRoute:ActivatedRoute,
              private servicioCursosCapacitaciones:CursosCapacitacionesService) { }

  ngOnInit() {
    this.instanciaVerPostulante=new PostulanteModel();
    this._activateRoute.params.subscribe(
      params=>{
        this.external_of_es=params['external_of'];
        console.log(this.external_of_es);
        this.cargarTabla(this.external_of_es);
    });
    //activar tabs
    $(function() {
      var triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab a'));
      console.log(triggerTabList);
      triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)
        triggerEl.addEventListener('click', function (event) {
          event.preventDefault()
          tabTrigger.show()
        })
      })
    });

  }
  cursosCapacitaciones(exteneral_us:string){
    this.servicioCursosCapacitaciones.listarCursosCapacitacionesExternal_usConParametro(exteneral_us).subscribe(
      siHaceBien=>{
        this.arrayCursosCapacitaciones=siHaceBien;
        console.log(this.arrayCursosCapacitaciones);
      },error=>{
        console.log(error);
      }
    );
  }
  titulosAcademicos(exteneral_us:string){
    this.servicioTitulosAcademicos.listarTitulosExternal_usConParametro(exteneral_us).subscribe(
      siHaceBien=>{
        this.arrayTitulosAcademicos=siHaceBien;
        console.log(this.arrayTitulosAcademicos);
      },error=>{
        console.log(error);
      }
    );
  }
  generoHombre(tipoGenero:number){
    if(tipoGenero==1){
      return false;
    }
    if(tipoGenero==0){
      return true;
    }
  }
  esCurso(tipoCursoCapacitacion:number){
    if(tipoCursoCapacitacion==1){
      return true;
    }
    if(tipoCursoCapacitacion==2){
      return false;
    }
  }
  esNancional(tipoTitulo:number){
    if(tipoTitulo==1){
      return true;
    }
    if(tipoTitulo==2){
      return false;
    }
  }
  esTercerNivel(nivelInstruccion:number){
    if(nivelInstruccion==1){
      return true;
    }
    if(nivelInstruccion==2){
      return false;
    }
  }
  cargarTabla(external_of:string){

    console.log("cargue tabla");
    //el extenrla oferta viene x la url
    this.servicioOfertaEstudiante.listTodasEstudiantePostulanOfertaExternal_of(external_of).subscribe(
      siHaceBien=>{
      console.log(siHaceBien);
      this.arrayPostulante=siHaceBien;
        //data table
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },error=>{
        console.log(error);
      }
    );
  }
  verHojaVidaModal(id:Number){
    console.log("click");
    var index=parseInt((id).toString(), 10); 
    $('#exampleModal').modal('show');
    //============= mostamos la informacion personal ========================
    this.instanciaVerPostulante.nombre=this.arrayPostulante[index]['nombre'];
    this.instanciaVerPostulante.apellido=this.arrayPostulante[index]['apellido'];
    this.instanciaVerPostulante.genero=this.arrayPostulante[index]['genero'];
    this.instanciaVerPostulante.telefono=this.arrayPostulante[index]['telefono'];
    this.instanciaVerPostulante.fecha_nacimiento=this.arrayPostulante[index]['fecha_nacimiento'];
    this.instanciaVerPostulante.direccion_domicilio=this.arrayPostulante[index]['direccion_domicilio'];
    this.instanciaVerPostulante.correo=this.arrayPostulante[index]['correo'];
    console.log(this.instanciaVerPostulante);
    //============= mostras los curso y capacitaciones ===============
    console.log(this.arrayPostulante[index]['external_us']);
    this.cursosCapacitaciones(this.arrayPostulante[index]['external_us']);
     //============= mostras los titulos   ===============
     this.titulosAcademicos(this.arrayPostulante[index]['external_us']);
 
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
  eliminarPostulanteOferta(nombre:string,apellido:string,id:Number){
    console.log(nombre);
    console.log(apellido);
    console.log(id);
    var index=parseInt((id).toString(), 10); 
    console.log(this.arrayPostulante[index]);
    Swal({
      title: 'Are you sure?',
      text: "Desvincular a  "+nombre+" "+apellido,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
      this.arrayPostulante[index];
      this.servicioOfertaEstudiante.eliminarPostulanteOfertaLaboral(
          this.external_of_es,this.arrayPostulante[index]['external_us'],0
        ).subscribe(
          siHaceBien=>{
            console.log(siHaceBien);
            if(siHaceBien["Siglas"]=="OE"){
              Swal('Registrado', siHaceBien['mensaje'], 'success');
            }else{
              Swal('Ups, No se puede realizar el registro'+siHaceBien['mensaje'], 'info')
            }
          },error=>{
            console.log(error);
          }
      );
      }
    })
  }
  ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
    try {
      this.dtTrigger.unsubscribe();
    } catch (error) {
      //le puse x q no uso suscripcion/mas info:/https://l-lin.github.io/angular-datatables/#/basic/angular-way
      console.warn(error);
    }
  }

}
