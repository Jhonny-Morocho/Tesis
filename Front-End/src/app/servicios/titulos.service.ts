import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TituloModel} from '../models/titulo.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TituloService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlBackendCrearTitulo="/Backend/public/index.php/titulos-academicos/registro/";
  private urlSubirArchivo="/Backend/public/index.php/titulos-academicos/subirArchivo";
  private urlListarTitulo="/Backend/public/index.php/titulos-academicos/listarTitulosEstudiante/";
  private urlELiminarTitulo="/Backend/public/index.php/titulos-academicos/eliminarTitulo";
  private urlObtenerTitUloExternal_ti="/Backend/public/index.php/titulos-academicos/obtenerTituloExternal_ti/";
  private urlEditarTitulo="/Backend/public/index.php/titulos-academicos/actulizarTitulo/";
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
  crearTitulo(modeloTitulo:TituloModel){
    const autenficacionDatos={
       ...modeloTitulo
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendCrearTitulo}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
           return respuestaBackend;
         })
     );
  }

  //listammos postulantes activos /no activos / depende del estado
  listarTitulos(){

    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTitulo}${localStorage.getItem("external_us")}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloTitulo(respuestaBackend['mensaje']);
        })
    );
  }
  listarTitulosExternal_usConParametro(external_us:string){

    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTitulo}${external_us}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloTitulo(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloTitulo(ObjTitulos:object){
     const titulos:TituloModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const titulo:TituloModel=ObjTitulos[key];
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

