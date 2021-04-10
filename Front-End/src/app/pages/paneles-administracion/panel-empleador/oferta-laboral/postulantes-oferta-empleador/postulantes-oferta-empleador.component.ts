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
  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
    private servicioOfertaLabotal:OfertasLaboralesService,
    private servicioCursosCapacitaciones:CursosCapacitacionesService,
    private servicioTitulosAcademicos:TituloService, 
    private _activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.instanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaVerPostulante=new PostulanteModel();
    this.estudiantesOfertaLaboral();
  
  }
  ofertaLaboralFinalizar(external_of:string){
    console.log(this.externalOferta);
    this.servicioOfertaLabotal.obtenerOfertaLaboralExternal_of(external_of).subscribe(
      siHaceBien=>{
          console.log(siHaceBien);
          if(parseInt(siHaceBien['mensaje']['estado'])==4){
            this.estadoOfertaLaboralFinalizada=true;
            console.log(siHaceBien['mensaje']['estado']);
          }
      },siHaceMal=>{
        console.warn(siHaceMal);
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
            console.log(this.externalOferta);
            this.arrayPostulante=siHaceBien;
            if(this.arrayPostulante.length>0){
              this.existeRegistros=true;
            }
          },error=>{
            console.log(error);
          }
        );
    });

  }
  verHojaVidaModal(id:Number){
    console.log("click");
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
    console.log(this.instanciaVerPostulante);
    //============= mostras los curso y capacitaciones ===============
    console.log(this.arrayPostulante[index]['external_us']);
    this.cursosCapacitaciones(this.arrayPostulante[index]['external_us']);
     //============= mostras los titulos   ===============
     this.titulosAcademicos(this.arrayPostulante[index]['external_us']);
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
  carrarModalX(){
    $('#motrarHojaVidaGeneral').modal('hide');
    console.log('cerrarModalX');
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
  contrarFinalizarOfertaLaboral(){
    this.instanciaOfertaLaboral.estado=4;
    //finaliza la oferta laboral pero no ha contratado ninugn postulante

    if(this.arrayAux.length==0){
      Swal({
        title: '¿Está seguro en Finalizar la oferta laboral ?',
        text: "Finalizara la publicación de la oferta laboral en la plataforma, pero usted no ha contratado ningún postulante si desea continuar  haga clic en Si",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          Swal({allowOutsideClick: false,type: 'info',text: 'Espere por favor...'});
          Swal.showLoading();
          console.log(this.instanciaOfertaLaboral);
          this.servicioOfertaLabotal.actulizarEstadoOfertaLaboralFinalizado(this.instanciaOfertaLaboral,this.externalOferta).subscribe(
            siHaceBien=>{
                console.log(siHaceBien);
                Swal.close();
                Swal('Registrado', 'Información Registrada con éxito', 'success');
                //desactivo el boton de guardar y finalizar
                this.estadoOfertaLaboralFinalizada=true;
            },siHaceMal=>{
              console.warn(siHaceMal);
            }
          );
          // this.servicioOfertaEstudiante.eliminarPostulanteOfertaLaboral(this.arrayAux).subscribe(
          //   siHaceBien =>{
          //       console.log(siHaceBien);
          //       if(siHaceBien['Siglas']=='OE'){
          //         Swal('Registrado', 'Información Registrada con éxito', 'success');
          //       }else{
          //         Swal('Error', siHaceBien['error'], 'error');
          //       }
          //   },siHceMal=>{
          //     Swal('Registrado', siHceMal['error'], 'error');
          //   }
          // );
        }
      })
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
    console.log(fk_ofertaLaboral);
    let estadoActual=(i.target as HTMLInputElement).value;
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
        console.log("cerop");
      }else{
        this.arrayAux.forEach(element => {
          if(element['fk_estudiante']===fk_postulante){
            console.log(element['fk_estudiante']);
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
    console.log(this.arrayAux);
    }else{
      alert("el estado es nullo");
    }
  }

}
