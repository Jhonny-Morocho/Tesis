import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CursosCapacitacionesModel} from '../models/cursos-capacitaciones.models';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosCapacitacionesService {
  //el url del servicio o del backend
  private urlDominio_="http://localhost/Tesis";
  private urlBackendCrearTitulo="/Backend/public/index.php/titulos-academicos/registro/";
  private urlSubirArchivo="/Backend/public/index.php/titulos-academicos/subirArchivo";
  private urlListarCursosCapacitaciones="/Backend/public/index.php/cursos-capacitaciones/listarCursosCapacitaciones/";
  private urlELiminarTitulo="/Backend/public/index.php/titulos-academicos/eliminarTitulo";
  private urlObtenerTitUloExternal_ti="/Backend/public/index.php/titulos-academicos/obtenerTituloExternal_ti/";
  private urlEditarTitulo="/Backend/public/index.php/titulos-academicos/actulizarTitulo/";
  constructor(private _httCliente:HttpClient) { }

  subirArchivoPDF(FormDataPDF){
     return this._httCliente.post(`${this.urlDominio_}${this.urlSubirArchivo}`,FormDataPDF
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }
  crearTitulo(modeloTitulo:TituloModel){
    const autenficacionDatos={
       ...modeloTitulo
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendCrearTitulo}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }

  //listammos postulantes activos /no activos / depende del estado
  listarCursosCapacitaciones(){
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
  obtenerTituloExternal_es(external_es:string){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlObtenerTitUloExternal_ti}${external_es}`,
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
 
  }

    //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarDatosTitulo(modeloTitulo:TituloModel){
    const autenficacionDatos={
      ...modeloTitulo
    }
    console.log(modeloTitulo);
      console.log(modeloTitulo.external_ti);
    //retorna la respuesata
        console.log(`${this.urlDominio_}${this.urlEditarTitulo}${modeloTitulo.external_ti}`);
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlEditarTitulo}${autenficacionDatos.external_ti}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }

  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarTitulo(modeloTitulo:TituloModel){
    const autenficacionDatos={
      ...modeloTitulo
    }
      console.log(modeloTitulo);
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlELiminarTitulo}`);
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlELiminarTitulo}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }
}

