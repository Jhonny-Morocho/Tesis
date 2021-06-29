import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { ReturnStatement } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class SerivicioEmpleadorService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlBackendCrearEmpleador="/Backend/public/index.php/empleador/registro/";
  private urlListarFormEmpleador="/Backend/public/index.php/empleador/formEmpleador";
  private urlListarEmpleadores="/Backend/public/index.php/empleador/listarEmpleadores";
  private urlObtenerEmpleadorExternal_em="/Backend/public/index.php/empleador/obtenerEmpleadorExternal_em";
  private urlValidarEmpleador="/Backend/public/index.php/empleador/actulizarAprobacionEmpleador/";
  private urlEditarFormEmpleador="/Backend/public/index.php/empleador/actulizarFormEmpleador/";
  constructor(private _httCliente:HttpClient) { }

  crearEmpleador(modeloEmpleador:EmpleadorModel){
    ReturnStatement;
    const autenficacionDatos={
      ...modeloEmpleador

    }
    //retorna la respuesata
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlBackendCrearEmpleador}${localStorage.getItem("external_us")}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }

  //el postulante en su session puede ver sus datos registrados
  listarFormEmpleador(){
    const autenficacionDatos={
      external_us:localStorage.getItem("external_us")
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlListarFormEmpleador}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }
  //listammos postulantes activos /no activos / depende del estado
  listarEmpleadores(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarEmpleadores}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloEmpleadores(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloEmpleadores(ObjEstudiante:object){
    const estudiantex:EmpleadorModel[]=[];
    //validamos si el objeto tiene informaicon
    if(ObjEstudiante===null){
        return [];
    }else{
      Object.keys(ObjEstudiante).forEach(key=>{
        const estudiante:EmpleadorModel=ObjEstudiante[key];
        estudiantex.push(estudiante);
      })
      return estudiantex;
    }
  }

  //obetnemos los estudiantes aprobado/no aprobandos dependenidendo del estado
  obtenerEmpleadorExternal_em(external_em:string){
    const autenficacionDatos={
      external_em:external_em
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlObtenerEmpleadorExternal_em}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );

  }
  //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarAprobacionEmpleador(estado:Number,external_es:string,observaciones:string){
    const autenficacionDatos={
      estado:estado,
      observaciones:observaciones
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlValidarEmpleador}${external_es}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }
    //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarDatosEmpleador(modeloEmpleador:EmpleadorModel){
      const autenficacionDatos={
        ...modeloEmpleador
      }
    //retorna la respuesata
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlEditarFormEmpleador}${localStorage.getItem("external_us")}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }
}

