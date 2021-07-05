import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OfertaLaboralEstudianteModel} from 'src/app/models/oferLaboral-Estudiante.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { PostulanteModel } from '../models/postulante.models';
import {ReporteOfertaModel } from 'src/app/models/reporteOfertas.models';


@Injectable({
  providedIn: 'root'
})
export class OfertaLaboralEstudianteService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlResumenOfertaEstudiantesFinalizada_external_of="/Backend/public/index.php/ofertasLaboralesEstudiantes/resumenOfertaEstudiantesFinalizada_external_of/";
  private urlReporteOfertaEstudiante="/Backend/public/index.php/ofertasLaboralesEstudiantes/reporteOfertaEstudiante";
  private urlBackendPostularOfertaEstudiante="/Backend/public/index.php/ofertasLaboralesEstudiantes/PostularOfertaLaboral/";
  private urlBackendListTodasEstudiantePostulanOfertaExternal_of_encargado="/Backend/public/index.php/ofertasLaboralesEstudiantes/listTodasEstudiantePostulanOfertaExternal_of_encargado/";
  private urlBackendListTodasEstudiantePostulanOfertaExternal_of_empleador="/Backend/public/index.php/ofertasLaboralesEstudiantes/listTodasEstudiantePostulanOfertaExternal_of_empleador/";
  private urlListarTodasOfertaEstudianteExternal_us="/Backend/public/index.php/ofertasLaboralesEstudiantes/listarTodasOfertaEstudianteExternal_us/";
  private urlELiminarPostulanteOfertaLaboral="/Backend/public/index.php/ofertasLaboralesEstudiantes/eliminarPostulanteOfertaLaboral";
  private urlFinalizarOfertaLaboralEstudiante="/Backend/public/index.php/ofertasLaboralesEstudiantes/finalizarOfertaLaboralEstudiante";
  constructor(private _httCliente:HttpClient) { }


  postularOfertEstudiante(modeloOfertaEstudiante:OfertaLaboralEstudianteModel,external_of:string){
    const autenficacionDatos={
        estado:modeloOfertaEstudiante.estado,
        observaciones:modeloOfertaEstudiante.observaciones,
        external_of:external_of
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendPostularOfertaEstudiante}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
           return respuestaBackend;
         })
     );
  }


  //llistar todas las ofertas del estudiante que esta postulando
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
  resumenOfertaEstudiantesFinalizada_external_of(external_Of:String){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlResumenOfertaEstudiantesFinalizada_external_of}${external_Of}`
    ).pipe(
      map(respuestaBackend=>{
        return this.crearArregloOfertaEstudiante(respuestaBackend['mensaje'])
      })
    );
  }
  listTodasEstudiantePostulanOfertaExternal_of_encargado(external_Of:String){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlBackendListTodasEstudiantePostulanOfertaExternal_of_encargado}${external_Of}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloOfertaEstudiante_ModelPostulante(respuestaBackend['mensaje']);
        })
    );

  }
  listTodasEstudiantePostulanOfertaExternal_of_empleador(external_Of:String){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlBackendListTodasEstudiantePostulanOfertaExternal_of_empleador}${external_Of}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloOfertaEstudiante_ModelPostulante(respuestaBackend['mensaje']);
        })
    );

  }
  private crearArregloOfertaEstudiante(ObjOfertaEstudiante:object){
     const ofertaEstudiante:OfertaLaboralEstudianteModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjOfertaEstudiante===null){
         return [];
     }else{
       Object.keys(ObjOfertaEstudiante).forEach(key=>{
         const ofertaEs:OfertaLaboralEstudianteModel=ObjOfertaEstudiante[key];
         ofertaEstudiante.push(ofertaEs);
       })
       return ofertaEstudiante;
     }
  }
  private crearArregloReportOfertaEstudiante(ObjReporte:object){
    const reporteOfertaEstu:ReporteOfertaModel[]=[];
    if(ObjReporte===null){
      return [];
    }else{
      Object.keys(ObjReporte).forEach(key=>{
        const reportofertaEstudiante:ReporteOfertaModel=ObjReporte[key];
        reporteOfertaEstu.push(reportofertaEstudiante);
      })
      return reporteOfertaEstu;
    }

  }
  private crearArregloOfertaEstudiante_ModelPostulante(ObjTitulos:object){
    const postulanteOfertaEstudiante:PostulanteModel[]=[];
    //validamos si el objeto tiene informaicon
    if(ObjTitulos===null){
        return [];
    }else{
      Object.keys(ObjTitulos).forEach(key=>{
        const postulanteOfertaEstudiantes:PostulanteModel=ObjTitulos[key];
        postulanteOfertaEstudiante.push(postulanteOfertaEstudiantes);
      })
      return postulanteOfertaEstudiante;
    }
 }

  //actulizar estado de validacion del postulante//aprobado y no aprobado
  eliminarPostulanteOfertaLaboral(array:any){
      return this._httCliente.post(`${this.urlDominio_}${this.urlELiminarPostulanteOfertaLaboral}`,array).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }
    //actulizar estado de validacion del postulante//aprobado y no aprobado
  finalizarOfertaLaboralEstudiante(array:any){
    return this._httCliente.post(`${this.urlDominio_}${this.urlFinalizarOfertaLaboralEstudiante}`,array).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }
  reportOfertaEstudiante(){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlReporteOfertaEstudiante}`
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend['mensaje'];
        })
    );
  }
}



