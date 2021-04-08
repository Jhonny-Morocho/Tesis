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
  templateUrl: './postulantes-ofertas.component.html'
})
export class PostulanteOfertas implements OnInit {
  dominio:any=environment.dominio;
  arrayPostulante:PostulanteModel[]=[];
  instanciaVerPostulante:PostulanteModel;
  arrayCursosCapacitaciones:CursosCapacitacionesModel[]=[];
  arrayTitulosAcademicos:TituloModel[]=[];
  arrayPostulanteOfertAux:OfertaLaboralEstudianteModel[]=[];
  instanciaOfertaPostulante:OfertaLaboralEstudianteModel;
  //data table
  arrayAux=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
 estadoPostulacion= [];
 existeRegistros:boolean=false;

  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private servicioTitulosAcademicos:TituloService, 
              private _activateRoute:ActivatedRoute,
              private servicioCursosCapacitaciones:CursosCapacitacionesService) { }

  ngOnInit() {
    this.instanciaVerPostulante=new PostulanteModel();
    this.estudiantesOfertaLaboral();
  }
  filtrarPostulante(){
    //verifico si el usuario ha hecho check,si no hace check entonces no puede actualizar
    if(this.arrayAux.length==0){
      Swal({title:'Atención',type:'info',text:'Ahun no ha realizado ninguna acción en el checklist'}); 
    }else{
      Swal({
        title: '¿Está seguro ?',
        text: "Se desvinculara al postulante de la oferta laboral ",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
      
          this.servicioOfertaEstudiante.eliminarPostulanteOfertaLaboral(this.arrayAux).subscribe(
            siHaceBien =>{
                console.log(siHaceBien);
                if(siHaceBien['Siglas']=='OE'){
                  Swal('Registrado', 'Información Registrada con éxito', 'success');
                }else{
                  Swal('Error', siHaceBien['error'], 'error');
                }
            },siHceMal=>{
              Swal('Registrado', siHceMal['error'], 'error');
            }
          );
        }
      })
    }

  }

  check(i:Event,fk_postulante,fk_ofertaLaboral,exteral_of,external_es) {
    let estadoActual=(i.target as HTMLInputElement).value;
    let estadoActualAux=null;
    var banderaRepetido=false;
    //verificar que valor me trae el value del input
    switch (parseInt(estadoActual)) {
      case 0:
        estadoActualAux=1;
        break;
      case 1:
        estadoActualAux=0;
        break;
      case 2:
          alert("estado 2 permitido");
          break;
      default:
        break;
    }
    //comprobar que el estado actual solo tenga dos valores 1 <-> 0
    if(estadoActualAux!=null){
        const aux={   
        fk_estudiante:fk_postulante,
        fk_oferta_laboral:fk_ofertaLaboral,
        estado:estadoActualAux,
        external_of_est:exteral_of,
        external_es:external_es
      }
      //antes de guardarlo en el array debemos comprobar si esta ya ingresado
      if(this.arrayAux.length==0 ){
        this.arrayAux.push(aux);
        console.log("cerop");
      }else{
        this.arrayAux.forEach(element => {
          if(element['fk_estudiante']===fk_postulante){
            console.log(element['fk_estudiante']);
            //entonce debeo actualizar el estado del arreglo en donde estaba guarado
            if(element['estado']==1){
              element['estado']=0;
            }else{
              element['estado']=1;
            }
            banderaRepetido=true;
          }
        });
        //termine de recorrer todos los datos, si no existe repetidos que se agrege uno nuevo
        if( banderaRepetido==false){
          this.arrayAux.push(aux);
        }
      }
    console.log(this.arrayAux);
    }else{
      alert("el estado es nullo");
    }
  }

  // }
  //listamos todos los estudiantes que este postulando a esta oferta laboral
  estudiantesOfertaLaboral(){
    //obtener el external ofert desde la url
    this._activateRoute.params.subscribe(
      params=>{
        this.servicioOfertaEstudiante.listTodasEstudiantePostulanOfertaExternal_of(params['external_of']).subscribe(
          siHaceBien=>{
            console.log(siHaceBien);
            this.arrayPostulante=siHaceBien;
            console.log(this.arrayPostulante.length);
            if(this.arrayPostulante.length>0){
              this.existeRegistros=true;
            }
          },error=>{
            console.log(error);
          }
        );
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
  generoHombre(tipoGenero){
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
  // cerrarModal(){
  //   $('#exampleModal').modal('hide');
  // }
  // eliminarPostulanteOferta(nombre:string,apellido:string,id:Number){
  //   console.log(nombre);
  //   console.log(apellido);
  //   console.log(id);
  //   var index=parseInt((id).toString(), 10); 
  //   console.log(this.arrayPostulante[index]);
  //   Swal({
  //     title: 'Are you sure?',
  //     text: "Desvincular a  "+nombre+" "+apellido,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes'
  //   }).then((result) => {
  //     if (result.value) {
  //     this.arrayPostulante[index];
  //     this.servicioOfertaEstudiante.eliminarPostulanteOfertaLaboral(
  //         this.external_of_es,this.arrayPostulante[index]['external_us'],0
  //       ).subscribe(
  //         siHaceBien=>{
  //           console.log(siHaceBien);
  //           if(siHaceBien["Siglas"]=="OE"){
  //             Swal('Registrado', siHaceBien['mensaje'], 'success');
  //             //this.estudiantesInscritosOferta(this.external_of_es);
  //             this.ngOnDestroy()
  //           }else{
  //             Swal('Ups, No se puede realizar el registro'+siHaceBien['mensaje'], 'info')
  //           }
  //         },error=>{
  //           console.log(error);
  //         }
  //     );
  //     }
  //   })
  // }
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
