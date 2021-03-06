import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostulanteModel} from '../models/postulante.models';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SerivicioPostulanteService {
  //el url del servicio o del backend
  private urlDominio_="http://localhost/Tesis";
  private urlBackendCrearPostulante="/Backend/public/index.php/estudiante/registro/";
  private urlListarFormPostulante="/Backend/public/index.php/estudiante/FormEstudiante";
  private urlListarPostulantes="/Backend/public/index.php/postulante/listarEstudiantes";
  constructor(private _httCliente:HttpClient) { }

  crearPostulante(modeloPostulante:PostulanteModel){
    const autenficacionDatos={
      cedula:modeloPostulante.cedula,
      telefono:modeloPostulante.telefono,
      nombre:modeloPostulante.nombre,
      apellido:modeloPostulante.apellido,
      genero:modeloPostulante.genero,
      fecha_nacimiento:modeloPostulante.fecha_nacimiento,
      direccion_domicilio:modeloPostulante.direccion_domicilio,
      observaciones:"",
      estado:0
      //external_es:localStorage.getItem("external_us")
    }
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlBackendCrearPostulante}${localStorage.getItem("external_us")}`);
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlBackendCrearPostulante}${localStorage.getItem("external_us")}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          console.log("Entro en el map del RKJS");
          //guardo los datos del registro de postulante en el localsorage
        
          console.log(respuestaBackend);
          return respuestaBackend;
        })
    );
  }

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
          console.log("Entro en el map del RKJS LISTAR POSTULANTES");
          console.log(respuestaBackend);
          return respuestaBackend;
        })
    );
  }
  listarPostulantesNoActivos(estado:Number){
    const autenficacionDatos={
      estado:estado
    }
    //retorna la respuesata
    console.log( `${this.urlDominio_}${this.urlListarPostulantes}`,autenficacionDatos);
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlListarPostulantes}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          console.log("Entro en el map del RKJS LISTAR POSTULANTES");
          console.log(respuestaBackend['mensaje']);
          
          return this.crearArregloEstudiantes(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloEstudiantes(ObjEstudiante:object){
    const estudiantex:PostulanteModel[]=[];
    console.log(ObjEstudiante );
    //validamos si el objeto tiene informaicon
    if(ObjEstudiante===null){
        return [];
    }else{
      Object.keys(ObjEstudiante).forEach(key=>{
        // console.log(ObjEstudiante[key]);
        const estudiante:PostulanteModel=ObjEstudiante[key];
        // estudiante.external_es=key;
        estudiantex.push(estudiante);
      })
      return estudiantex;
    }
  }

}

