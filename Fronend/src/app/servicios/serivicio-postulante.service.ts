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
  constructor(private _httCliente:HttpClient) { }

  crearPostulante(modeloPostulante:PostulanteModel){
    console.log("soy crear un postulante del servicio");
    console.log(modeloPostulante);
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

}
