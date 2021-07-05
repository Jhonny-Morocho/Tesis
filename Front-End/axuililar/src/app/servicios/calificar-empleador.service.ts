import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CalificarEmpleadorModel} from '../models/calificar-empleador';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CalificarEmpleadorService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlObtenerCalifiacionEmpleador="/Backend/public/index.php/calificar-empleador/promedioCalificacionEmpleador/";
  private urlObtenerCalifiacionEmpleadorTodosEmpleadores="/Backend/public/index.php/calificar-empleador/promedioCalificacionEmpleadorTodos";
  private  urlCalificarEmpleador="/Backend/public/index.php/calificar-empleador/calificarEmpleador";
  constructor(private _httCliente:HttpClient) { }

  //calificacion del empleador
  obeterCalifacionEmpleador(idEmpleador:Number){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlObtenerCalifiacionEmpleador}${idEmpleador}`
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend['mensaje'];
        })
    );
  }
  obtenerCalificacionTodosEmpleadores(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlObtenerCalifiacionEmpleadorTodosEmpleadores}`
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend['mensaje'];
        })
    );

  }
  registrarCalificacion(modeloCalificarEmpleador:CalificarEmpleadorModel){
    const autenficacionDatos={
        ...modeloCalificarEmpleador
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlCalificarEmpleador}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
           return respuestaBackend;
         })
     );
  }

}

