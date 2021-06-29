import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CursosCapacitacionesModel} from '../models/cursos-capacitaciones.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CursosCapacitacionesService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlBackendCrearCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/registro/";
  private urlSubirArchivo="/Backend/public/index.php/cursos-capacitaciones/subirArchivo";
  private urlListarCursosCapacitaciones="/Backend/public/index.php/cursos-capacitaciones/listarCursosCapacitaciones/";
  private urlELiminarCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/eliminarCursoCapicitacion";
  private urlObtenerCursoCapacitacionExternal_ti="/Backend/public/index.php/cursos-capacitaciones/obtenerCursoCapacitacionExternal_cu/";
  private urlEditarCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/actulizarCursoCapacitaciones/";
  constructor(private _httCliente:HttpClient) { }

  subirArchivoPDF(FormDataPDF){
     return this._httCliente.post(`${this.urlDominio_}${this.urlSubirArchivo}`,FormDataPDF
     ).pipe(
       map(
         respuestaBackend=>{
           return respuestaBackend;
         })
     );
  }
  crearCursoCapacitaciones(modeloCursosCapacitaciones:CursosCapacitacionesModel){
    const autenficacionDatos={
       ...modeloCursosCapacitaciones
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendCrearCursoCapacitacion}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
           return respuestaBackend;
         })
     );
  }

  //listammos postulantes activos /no activos / depende del estado
  listarCursosCapacitacionesExternal_us(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarCursosCapacitaciones}${localStorage.getItem("external_us")}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloCursosCapacitaciones(respuestaBackend['mensaje']);
        })
    );
  }
    //listammos postulantes activos /no activos / depende del estado
    listarCursosCapacitacionesExternal_usConParametro(external_us){
      //retorna la respuesata
      return this._httCliente.get(
        `${this.urlDominio_}${this.urlListarCursosCapacitaciones}${external_us}`
      ).pipe(
        map(
          respuestaBackend=>{
            return this.crearArregloCursosCapacitaciones(respuestaBackend['mensaje']);
          })
      );
    }

  private crearArregloCursosCapacitaciones(ObjTitulos:object){
     const titulos:CursosCapacitacionesModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const titulo:CursosCapacitacionesModel=ObjTitulos[key];
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
  actulizarDatosCursosCapacitaciones(modeloCursosCapacitaciones:CursosCapacitacionesModel){
    const autenficacionDatos={
      ...modeloCursosCapacitaciones
    }
    //retorna la respuesata

    return this._httCliente.post(
      `${this.urlDominio_}${this.urlEditarCursoCapacitacion}${autenficacionDatos.external_cu}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }

  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarCursoCapacitacion(modeloCursosCapacitaciones:CursosCapacitacionesModel){
    const autenficacionDatos={
      ...modeloCursosCapacitaciones
    }
    //retorna la respuesata
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

