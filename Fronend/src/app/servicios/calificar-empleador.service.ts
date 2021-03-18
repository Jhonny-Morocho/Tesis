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
  private urlListarPaises="/Backend/public/index.php/paises/listarPaises";
private  urlCalifcarEmpleador="/Backend/public/index.php/calificar-empleador/calificarEmpleador";
  constructor(private _httCliente:HttpClient) { }

  //listammos os paises
//   listarPaises(){
//     //retorna la respuesata
//     return this._httCliente.get(
//       `${this.urlDominio_}${this.urlListarPaises}`
//     ).pipe(
//       map(
//         respuestaBackend=>{
//           return this.crearArregloPaises(respuestaBackend['mensaje']);
//         })
//     );
//   }
  registrarCalificacion(modeloCalificarEmpleador:CalificarEmpleadorModel){
    const autenficacionDatos={
        ...modeloCalificarEmpleador
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlCalifcarEmpleador}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }

//   private crearArregloPaises(ObjTitulos:object){
//      const titulos:PaisesModel[]=[];
//      //validamos si el objeto tiene informaicon
//      if(ObjTitulos===null){
//          return [];
//      }else{
//        Object.keys(ObjTitulos).forEach(key=>{
//          const titulo:PaisesModel=ObjTitulos[key];
//          titulos.push(titulo);
//        })
//        return titulos;
//      }
//   }
}

