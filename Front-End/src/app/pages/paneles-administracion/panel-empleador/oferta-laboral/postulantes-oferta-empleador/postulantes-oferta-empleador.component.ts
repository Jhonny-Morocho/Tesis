import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosCapacitacionesModel } from 'src/app/models/cursos-capacitaciones.models';
import { PostulanteModel } from 'src/app/models/postulante.models';
import { TituloModel } from 'src/app/models/titulo.models';
import { CursosCapacitacionesService } from 'src/app/servicios/cursos-capacitaciones.service';
import { OfertaLaboralEstudianteService } from 'src/app/servicios/ofertLaboral-Estudiante.service';
import { TituloService } from 'src/app/servicios/titulos.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-postulantes-oferta',
  templateUrl: './postulantes-oferta-empleador.component.html'
})
export class PostulantesOfertaComponent implements OnInit {
  instanciaVerPostulante:PostulanteModel;
  arrayPostulante:PostulanteModel[]=[];
  arrayAux=[];
  arrayTitulosAcademicos:TituloModel[]=[];
  arrayCursosCapacitaciones:CursosCapacitacionesModel[]=[];
  existeRegistros:boolean=false;
  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
    private servicioCursosCapacitaciones:CursosCapacitacionesService,
    private servicioTitulosAcademicos:TituloService, 
    private _activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.instanciaVerPostulante=new PostulanteModel();
    this.estudiantesOfertaLaboral();
  
  }
  //listamos todos los estudiantes que este postulando a esta oferta laboral
  estudiantesOfertaLaboral(){
    //obtener el external ofert desde la url
    this._activateRoute.params.subscribe(
      params=>{
        this.servicioOfertaEstudiante.listTodasEstudiantePostulanOfertaExternal_of_empleador(params['external_of']).subscribe(
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
