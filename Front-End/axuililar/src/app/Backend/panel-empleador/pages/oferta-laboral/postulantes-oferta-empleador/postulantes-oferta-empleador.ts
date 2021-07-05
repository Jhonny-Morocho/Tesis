import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosCapacitacionesModel } from 'src/app/models/cursos-capacitaciones.models';
import { PostulanteModel } from 'src/app/models/postulante.models';
import { TituloModel } from 'src/app/models/titulo.models';
import { CursosCapacitacionesService } from 'src/app/servicios/cursos-capacitaciones.service';
import { OfertaLaboralEstudianteService } from 'src/app/servicios/ofertLaboral-Estudiante.service';
import { TituloService } from 'src/app/servicios/titulos.service';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import Swal from 'sweetalert2';
import { OfertaLaboralModel } from '../../../../../models/oferta-laboral.models';
declare var $:any;
@Component({
  selector: 'app-postulantes-oferta',
  templateUrl: './postulantes-oferta-empleador.component.html'
})
export class PostulantesOfertaComponent implements OnInit {
  instanciaVerPostulante:PostulanteModel;
  arrayPostulante:PostulanteModel[]=[];
  arrayAux=[];
  estadoOfertaLaboralFinalizada:Boolean=false;
  externalOferta:string="";
  nombreOfertaLabroal:string="";
  arrayTitulosAcademicos:TituloModel[]=[];
  instanciaOfertaLaboral:OfertaLaboralModel;
  arrayCursosCapacitaciones:CursosCapacitacionesModel[]=[];
  existeRegistros:boolean=false;
  existeAlgunPostulanteChechado:boolean=false
  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
    private servicioOfertaLabotal:OfertasLaboralesService,
    private servicioCursosCapacitaciones:CursosCapacitacionesService,
    private servicioTitulosAcademicos:TituloService,
    private _activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaVerPostulante=new PostulanteModel();
    this.estudiantesOfertaLaboral();
    //responsibo
    $("body").removeClass("sidebar-open");

  }
  ofertaLaboralFinalizar(external_of:string){
    this.servicioOfertaLabotal.obtenerOfertaLaboralExternal_of(external_of).subscribe(
      siHaceBien=>{
          if(parseInt(siHaceBien['mensaje']['estado'])==4){
            this.estadoOfertaLaboralFinalizada=true;
          }
      },siHaceMal=>{
        Swal('Ups', siHaceMal['mensaje'], 'info');
      }
    );
  }
  //listamos todos los estudiantes que este postulando a esta oferta laboral
  estudiantesOfertaLaboral(){
    //obtener el external ofert desde la url
    this._activateRoute.params.subscribe(
      params=>{
        this.servicioOfertaEstudiante.listTodasEstudiantePostulanOfertaExternal_of_empleador(params['external_of']).subscribe(
          siHaceBien=>{
            //guardo el external oferta para poder enviarlo para cambiar de estado a la oferta
            this.externalOferta=params['external_of'];
            this.ofertaLaboralFinalizar(this.externalOferta);
            this.arrayPostulante=siHaceBien;
            if(this.arrayPostulante.length>0){
              this.existeRegistros=true;
            }
          },error=>{
            Swal('Info',error['mensaje'], 'info');
          }
        );
    });

  }
  verHojaVidaModal(id:Number){
    var index=parseInt((id).toString(), 10);
    $('#motrarHojaVidaGeneral').modal('show');
    //============= mostamos la informacion personal ========================
    this.instanciaVerPostulante.nombre=this.arrayPostulante[index]['nombre'];
    this.instanciaVerPostulante.apellido=this.arrayPostulante[index]['apellido'];
    this.instanciaVerPostulante.genero=this.arrayPostulante[index]['genero'];
    this.instanciaVerPostulante.telefono=this.arrayPostulante[index]['telefono'];
    this.instanciaVerPostulante.cedula=this.arrayPostulante[index]['cedula'];
    this.instanciaVerPostulante.fecha_nacimiento=this.arrayPostulante[index]['fecha_nacimiento'];
    this.instanciaVerPostulante.direccion_domicilio=this.arrayPostulante[index]['direccion_domicilio'];
    this.instanciaVerPostulante.correo=this.arrayPostulante[index]['correo'];
    //============= mostras los curso y capacitaciones ===============
    this.cursosCapacitaciones(this.arrayPostulante[index]['external_us']);
     //============= mostras los titulos   ===============
     this.titulosAcademicos(this.arrayPostulante[index]['external_us']);
  }
  titulosAcademicos(exteneral_us:string){
    this.servicioTitulosAcademicos.listarTitulosExternal_usConParametro(exteneral_us).subscribe(
      siHaceBien=>{
        this.arrayTitulosAcademicos=siHaceBien;
      },error=>{
        Swal('Info',error['mensaje'], 'info');
      }
    );
  }
  carrarModalX(){
    $('#motrarHojaVidaGeneral').modal('hide');
  }
  cursosCapacitaciones(exteneral_us:string){
    this.servicioCursosCapacitaciones.listarCursosCapacitacionesExternal_usConParametro(exteneral_us).subscribe(
      siHaceBien=>{
        this.arrayCursosCapacitaciones=siHaceBien;
      },error=>{
        Swal('Info',error['mensaje'], 'info');
      }
    );
  }
  //envia los datos del array del ckeck a guardar
  contrarFinalizarOfertaLaboral(){
    this.instanciaOfertaLaboral.estado=4;
    if(this.existeAlgunPostulanteChechado==true){
          Swal({
            title: '¿Está seguro en realizar la acción? No se podra revertir',
            text: "Ha seleccionado con éxito los postulantes de su interes, si desea continuar haga clic en Aceptar ",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.value) {
              let estadoActualizarDato=true;
              Swal({allowOutsideClick: false,type: 'info',text: 'Espere por favor...'});
              //primero la finalizado a la oferta laboral
              this.servicioOfertaLabotal.actulizarEstadoOfertaLaboralFinalizado(this.instanciaOfertaLaboral,this.externalOferta).subscribe(
                siHaceBien=>{
                    Swal.close();
                    if(siHaceBien['Siglas']=='OE'){
                      //si se subio
                      estadoActualizarDato=true;
                      //desactivo el boton de guardar y finalizar
                      this.estadoOfertaLaboralFinalizada=true;
                    }else{
                      Swal('Info', siHaceBien['error'], 'info');
                    }
                },siHaceMal=>{
                  Swal('Error',siHaceMal['mensaje'], 'error');
                }
              );
              //actualizo el estado de los postulantes
              this.servicioOfertaEstudiante.finalizarOfertaLaboralEstudiante(this.arrayAux).subscribe(
                siHaceBien =>{
                    if(siHaceBien['Siglas']=='OE'){
                     //si se subio
                     estadoActualizarDato=true;
                    }else{
                      Swal('Info', siHaceBien['error'], 'info');
                    }
                },siHceMal=>{
                  Swal('Error', siHceMal['error'], 'error');
                }
              );
              //finalizado la animacion
              Swal.showLoading();
              if(estadoActualizarDato==true){
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
              }
            }
          })
    }
      //dio check pero despues desmarco
    if(this.existeAlgunPostulanteChechado==false){
        Swal({
          title: '¿Está seguro en realizar la acción? No se podra revertir ',
          text: "Desmarco algunos postulantes por lo cual no ha contratado ningún postulante, si desea continuar  haga clic en Aceptar",
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            Swal({allowOutsideClick: false,type: 'info',text: 'Espere por favor...'});
            Swal.showLoading();
            this.servicioOfertaLabotal.actulizarEstadoOfertaLaboralFinalizado(this.instanciaOfertaLaboral,this.externalOferta).subscribe(
              siHaceBien=>{
                  Swal.close();
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
                  //desactivo el boton de guardar y finalizar
                  this.estadoOfertaLaboralFinalizada=true;
              },siHaceMal=>{
                Swal('Ups', siHaceMal['mensaje'], 'info')
              }
            );
          }
        })
    }
      //finaliza la oferta laboral pero no ha contratado ninugn postulante
      //si solo aplasto direccito el boton sin hacer nunguna accion en el check//aplasto directo el boton
    if(this.arrayAux.length==0){
      Swal({
        title: '¿Está seguro en realizar la acción? No se podra revertir ',
        text: "No ha seleccionado ahun ningún postulante, si desea continuar haga clic en Aceptar",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          Swal({allowOutsideClick: false,type: 'info',text: 'Espere por favor...'});
          Swal.showLoading();
          this.servicioOfertaLabotal.actulizarEstadoOfertaLaboralFinalizado(this.instanciaOfertaLaboral,this.externalOferta).subscribe(
            siHaceBien=>{
                Swal.close();
                Swal('Registrado', 'Información Registrada con éxito', 'success');
                this.estadoOfertaLaboralFinalizada=true;
            },siHaceMal=>{
              Swal('Ups', siHaceMal['mensaje'], 'info')
            }
          );
        }
      })
    }
  }

  check(i:Event,fk_postulante,fk_ofertaLaboral,exteral_of,external_es) {
    let estadoActual=(i.target as HTMLInputElement).value;
    this.existeAlgunPostulanteChechado=(i.target as HTMLInputElement).checked;
    let estadoActualAux=null;
    var banderaRepetido=false;
    //verificar que valor me trae el value del input
    switch (parseInt(estadoActual)) {
      case 1:
        estadoActualAux=2;
        break;
      case 2:
        estadoActualAux=1;
        break;
      case 0:
          alert("estado 0 no permitido");
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
        //cero
      }else{
        this.arrayAux.forEach(element => {
          if(element['fk_estudiante']===fk_postulante){
            //entonce debeo actualizar el estado del arreglo en donde estaba guarado
            if(element['estado']==2){
              element['estado']=1;
            }else{
              element['estado']=2;
            }
            banderaRepetido=true;
          }
        });
        //termine de recorrer todos los datos, si no existe repetidos que se agrege uno nuevo
        if( banderaRepetido==false){
          this.arrayAux.push(aux);
        }
      }
    }else{
      alert("el estado es nullo");
    }
  }

}
