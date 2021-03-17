import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OfertaLaboralEstudianteModel} from 'src/app/models/oferLaboral-Estudiante.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertaLaboralEstudianteService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlBackendPostularOfertaEstudiante="/Backend/public/index.php/ofertasLaboralesEstudiantes/PostularOfertaLaboral/";
  private urlListarTodasOfertaEstudianteExternal_us="/Backend/public/index.php/ofertasLaboralesEstudiantes/listarTodasOfertaEstudianteExternal_us/";
  private urlELiminarCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/eliminarCursoCapicitacion";
  private urlObtenerCursoCapacitacionExternal_ti="/Backend/public/index.php/cursos-capacitaciones/obtenerCursoCapacitacionExternal_cu/";
  private urlEditarCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/actulizarCursoCapacitaciones/";
  constructor(private _httCliente:HttpClient) { }


  postularOfertEstudiante(modeloOfertaEstudiante:OfertaLaboralEstudianteModel,external_of:string){
    const autenficacionDatos={
        estado:modeloOfertaEstudiante.estado,
        external_of:external_of
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendPostularOfertaEstudiante}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }

  //listammos postulantes activos /no activos / depende del estado
  listarTodasOfertaEstudianteExternal_us(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTodasOfertaEstudianteExternal_us}${localStorage.getItem("external_us")}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloOfertaEstudiante(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloOfertaEstudiante(ObjTitulos:object){
     const titulos:OfertaLaboralEstudianteModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const titulo:OfertaLaboralEstudianteModel=ObjTitulos[key];
         titulos.push(titulo);
       })
       return titulos;
     }
  }

  //obetnemos los estudiantes aprobado/no aprobandos dependenidendo del estado
  obtenerCursoCapacitacionExternal_es(external_cu:string){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlObtenerCursoCapacitacionExternal_ti}${external_cu}`,
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
 
  }



  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarCursoCapacitacion(modeloOfertaEstudiante:OfertaLaboralEstudianteModel){
    const autenficacionDatos={
      ...modeloOfertaEstudiante
    }
      console.log(modeloOfertaEstudiante);
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlELiminarCursoCapacitacion}`);
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlELiminarCursoCapacitacion}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }
}

