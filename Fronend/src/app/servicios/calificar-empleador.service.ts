import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PaisesModel} from '../models/paises.models';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlListarPaises="/Backend/public/index.php/paises/listarPaises";

  constructor(private _httCliente:HttpClient) { }

  //listammos os paises
  listarPaises(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarPaises}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloPaises(respuestaBackend['mensaje']);
        })
    );
  }
  postularOfertEstudiante(modeloOfertaEstudiante:OfertaLaboralEstudianteModel,external_of:string){
    const autenficacionDatos={
        estado:modeloOfertaEstudiante.estado,
        external_of:external_of
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendPostularOfertaEstudiante}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }

  private crearArregloPaises(ObjTitulos:object){
     const titulos:PaisesModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const titulo:PaisesModel=ObjTitulos[key];
         titulos.push(titulo);
       })
       return titulos;
     }
  }
}

