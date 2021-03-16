import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OfertaLaboralModel} from '../models/oferta-laboral.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OfertasLaboralesService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlCrearOfertaLaboral="/Backend/public/index.php/ofertas-laborales/registro/";
  private urlListarOfertasLaborales="/Backend/public/index.php/ofertas-laborales/listarOfertasLaboralesExternal_us/";
  private urlListarTodasLasOferta="/Backend/public/index.php/ofertas-laborales/listarTodasLasOfertasLaborales";
  private urlListarOfertasValidadasEncargado="/Backend/public/index.php/ofertas-laborales/listarOfertasLaboralesValidadasEncargado";
  private urlELiminarOfertaLaboral="/Backend/public/index.php/ofertas-laborales/eliminarOfertaLaboral";
  private urlObtenerOfertaLaboralExternal_of="/Backend/public/index.php/ofertas-laborales/obtenerOfertaLaboralExternal_of/";
  private urlEditarOfertaLaboral="/Backend/public/index.php/ofertas-laborales/actulizarOfertaLaboral/";
  constructor(private _httCliente:HttpClient) { }


  crearOfertasLaborales(modeloOfertasLaborales:OfertaLaboralModel){
    const autenficacionDatos={
       ...modeloOfertasLaborales
     }
     //console.log(modeloOfertasLaborales);
     return this._httCliente.post(`${this.urlDominio_}${this.urlCrearOfertaLaboral}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
         //console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }

  //listammos ofertas por empleador/individual 
  listarOfertasLaboralesExternal_us(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarOfertasLaborales}${localStorage.getItem("external_us")}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloOfertasLaborales(respuestaBackend['mensaje']);
        })
    );
  }
  //listammos postulantes activos /no activos / depende del estado
  listarTodasLasOfertas(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTodasLasOferta}`
    ).pipe(
      map(
        respuestaBackend=>{
          console.log(respuestaBackend);
          return this.crearArregloOfertasLaborales(respuestaBackend['mensaje']);
        })
    );
  }
  //listammos postulantes activos /no activos / depende del estado
  listarOfertasValidadasEncargado(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarOfertasValidadasEncargado}`
    ).pipe(
      map(
        respuestaBackend=>{
          console.log(respuestaBackend);
          return this.crearArregloOfertasLaborales(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloOfertasLaborales(ObjTitulos:object){
     const titulos:OfertaLaboralModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const titulo:OfertaLaboralModel=ObjTitulos[key];
         titulos.push(titulo);
       })
       return titulos;
     }
  }

  //obetnemos los estudiantes aprobado/no aprobandos dependenidendo del estado
  obtenerOfertaLaboralExternal_of(external_of:string){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlObtenerOfertaLaboralExternal_of}${external_of}`,
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
 
  }

    //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarDatosOfertaLaboral(modeloOfertasLaborales:OfertaLaboralModel){
    const autenficacionDatos={
      ...modeloOfertasLaborales
    }
    console.log(modeloOfertasLaborales);
    console.log(modeloOfertasLaborales.external_of);
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlEditarOfertaLaboral}${modeloOfertasLaborales.external_of}`);
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlEditarOfertaLaboral}${autenficacionDatos.external_of}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }

  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarOfertaLaboral(modeloOfertasLaborales:OfertaLaboralModel){
    const autenficacionDatos={
      ...modeloOfertasLaborales
    }
      console.log(modeloOfertasLaborales);
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlELiminarOfertaLaboral}`);
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlELiminarOfertaLaboral}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }
}

