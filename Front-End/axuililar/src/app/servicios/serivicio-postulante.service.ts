import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostulanteModel} from '../models/postulante.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SerivicioPostulanteService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlBackendCrearPostulante="/Backend/public/index.php/estudiante/registro/";
  private urlListarFormPostulante="/Backend/public/index.php/estudiante/FormEstudiante";
  private urlListarPostulantes="/Backend/public/index.php/estudiante/listarEstudiantes";
  private urlObtenerPostulanteExternal_es="/Backend/public/index.php/estudiante/obtenerPostulanteExternal_es";
  private urlValidarPostulante="/Backend/public/index.php/estudiante/actulizarAprobacionEstudiante/";
  private urlEditarFormPostulante="/Backend/public/index.php/estudiante/actulizarFormEstudiante/";
  constructor(private _httCliente:HttpClient) { }

  crearPostulante(modeloPostulante:PostulanteModel){
    const autenficacionDatos={
      ...modeloPostulante
      //external_es:localStorage.getItem("external_us")
    }
    //retorna la respuesata
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlBackendCrearPostulante}${localStorage.getItem("external_us")}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }

  //el postulante en su session puede ver sus datos registrados
  listarFormPostulante(){
    const autenficacionDatos={
      external_us:localStorage.getItem("external_us")
    }
    //retorna la respuesata
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlListarFormPostulante}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }
  //listammos postulantes activos /no activos / depende del estado
  listarPostulantes(){

    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarPostulantes}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloEstudiantes(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloEstudiantes(ObjEstudiante:object){
    const estudiantex:PostulanteModel[]=[];
    //validamos si el objeto tiene informaicon
    if(ObjEstudiante===null){
        return [];
    }else{
      Object.keys(ObjEstudiante).forEach(key=>{
        const estudiante:PostulanteModel=ObjEstudiante[key];
        estudiantex.push(estudiante);
      })
      return estudiantex;
    }
  }

  //obetnemos los estudiantes aprobado/no aprobandos dependenidendo del estado
  obtenerPostulanteExternal_es(external_es:string){
    const autenficacionDatos={
      external_es:external_es
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlObtenerPostulanteExternal_es}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );

  }
  //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarAprobacionPostulante(estado:Number,external_es:string,observaciones:string){
    const autenficacionDatos={
      estado:estado,
      observaciones:observaciones
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlValidarPostulante}${external_es}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }
    //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarDatosPostulante(modeloPostulante:PostulanteModel){
      const autenficacionDatos={
        cedula:modeloPostulante.cedula,
        telefono:modeloPostulante.telefono,
        nombre:modeloPostulante.nombre,
        apellido:modeloPostulante.apellido,
        genero:modeloPostulante.genero,
        fecha_nacimiento:modeloPostulante.fecha_nacimiento,
        direccion_domicilio:modeloPostulante.direccion_domicilio,
        observaciones:modeloPostulante.observaciones,
      }
    //retorna la respuesata
      return this._httCliente.post(
        `${this.urlDominio_}${this.urlEditarFormPostulante}${localStorage.getItem("external_us")}`,autenficacionDatos
      ).pipe(
        map(
          respuestaBackend=>{
            return respuestaBackend;
          })
      );
  }
}

