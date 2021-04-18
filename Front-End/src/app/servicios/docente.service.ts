import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DocenteModel} from 'src/app/models/docente.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SerivicioDocente {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlBackendCrearDocente="/Backend/public/index.php/docente/registro/";
  private urlListarFormPostulante="/Backend/public/index.php/estudiante/FormEstudiante";
  private urlListarDocentes="/Backend/public/index.php/docente/listarDocentes";
  private urlObtenerPostulanteExternal_es="/Backend/public/index.php/estudiante/obtenerPostulanteExternal_es";
  private urlValidarPostulante="/Backend/public/index.php/estudiante/actulizarAprobacionEstudiante/";
  private urlEditarFormPostulante="/Backend/public/index.php/estudiante/actulizarFormEstudiante/";
  constructor(private _httCliente:HttpClient) { }

  crearDocente(modeloDocente:DocenteModel){
    const autenficacionDatos={
      ...modeloDocente
    }
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlBackendCrearDocente}${localStorage.getItem("external_us")}`);
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlBackendCrearDocente}${localStorage.getItem("external_us")}`,autenficacionDatos
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
    //console.log(`${this.urlDominio_}${this.urlListarFormPostulante}`);
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
  listarDocentes(){

    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarDocentes}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloDocentes(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloDocentes(ObjDocente:object){
    const arraydocente:DocenteModel[]=[];
    //validamos si el objeto tiene informaicon
    if(ObjDocente===null){
        return [];
    }else{
      Object.keys(ObjDocente).forEach(key=>{
        const docente:DocenteModel=ObjDocente[key];
        arraydocente.push(docente);
      })
      return arraydocente;
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
    console.log("Xxx");
    const autenficacionDatos={
      estado:estado,
      observaciones:observaciones
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlValidarPostulante}${external_es}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          console.log(respuestaBackend);
          return respuestaBackend;
        })
    );
  }
    //actulizar estado de validacion del postulante//aprobado y no aprobado
  actulizarDatosPostulante(modeloPostulante:DocenteModel){
      const autenficacionDatos={
            ...modeloPostulante
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

