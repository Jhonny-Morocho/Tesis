import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OfertaLaboralModel} from '../models/oferta-laboral.models';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfertasLaboralesService {
  //el url del servicio o del backend
  private urlDominio_="http://localhost/Tesis";
  private urlCrearOfertaLaboral="/Backend/public/index.php/ofertas-laborales/registro/";
  private urlListarOfertasLaborales="/Backend/public/index.php/ofertas-laborales/listarOfertasLaboralesExternal_us/";
  private urlELiminarCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/eliminarCursoCapicitacion";
  private urlObtenerOfertaLaboralExternal_of="/Backend/public/index.php/ofertas-laborales/obtenerOfertaLaboralExternal_of/";
  private urlEditarCursoCapacitacion="/Backend/public/index.php/cursos-capacitaciones/actulizarCursoCapacitaciones/";
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

  //listammos postulantes activos /no activos / depende del estado
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
  actulizarDatosCursosCapacitaciones(modeloOfertasLaborales:OfertaLaboralModel){
    const autenficacionDatos={
      ...modeloOfertasLaborales
    }
    console.log(modeloOfertasLaborales);
    console.log(modeloOfertasLaborales.external_of);
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlEditarCursoCapacitacion}${modeloOfertasLaborales.external_of}`);
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlEditarCursoCapacitacion}${autenficacionDatos.external_of}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }

  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarCursoCapacitacion(modeloOfertasLaborales:OfertaLaboralModel){
    const autenficacionDatos={
      ...modeloOfertasLaborales
    }
      console.log(modeloOfertasLaborales);
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

