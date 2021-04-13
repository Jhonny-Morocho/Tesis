import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EncuestaModel} from '../models/encuesta.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Encuesta {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlCrearEncuesta="/Backend/public/index.php/encuesta/registrar";
  private urlListarTodasEncuestas="/Backend/public/index.php/encuesta/listarTodasEncuestas";
  private urlELiminarTitulo="/Backend/public/index.php/titulos-academicos/eliminarTitulo";
  private urlObtenerTitUloExternal_ti="/Backend/public/index.php/titulos-academicos/obtenerTituloExternal_ti/";
  private urlEditarTitulo="/Backend/public/index.php/titulos-academicos/actulizarTitulo/";
  constructor(private _httCliente:HttpClient) { }


  crearEncuesta(modeloEncuesta:EncuestaModel){
    console.log(modeloEncuesta);
     return this._httCliente.post(`${this.urlDominio_}${this.urlCrearEncuesta}`,modeloEncuesta
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }

  //listammos postulantes activos /no activos / depende del estado
  listarTodasEncuestas(){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTodasEncuestas}`
    ).pipe(
      map(
        respuestaBackend=>{
          console.log(respuestaBackend);
          return this.crearArregloEncuestas(respuestaBackend['mensaje']);
        })
    );
  }
  listarTitulosExternal_usConParametro(external_us:string){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTodasEncuestas}${external_us}`
    ).pipe(
      map(
        respuestaBackend=>{
          console.log(respuestaBackend);
          return this.crearArregloEncuestas(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloEncuestas(ObjTitulos:object){
     const encuesta:EncuestaModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const _encuesta:EncuestaModel=ObjTitulos[key];
         encuesta.push(_encuesta);
       })
       return encuesta;
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
  actulizarDatosTitulo(modeloTitulo:Encuesta){
    const autenficacionDatos={
      ...modeloTitulo
    }
    console.log(modeloTitulo);
      console.log(modeloTitulo);
      return;
    //retorna la respuesata
        console.log(`${this.urlDominio_}${this.urlEditarTitulo}${modeloTitulo}`);
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlEditarTitulo}${autenficacionDatos}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }

  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarTitulo(modeloTitulo:Encuesta){
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

