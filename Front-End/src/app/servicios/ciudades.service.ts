import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { CiudadesModel } from '../models/ciudades.models';
@Injectable({
  providedIn: 'root'
})
export class ServicioCiudades {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlListarCiudades="/Backend/public/index.php/ciudades/listarCiudades/";

  constructor(private _httCliente:HttpClient) { }

  //listammos os paises
  listarCiudades(idProvincia){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarCiudades}${idProvincia}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloCiudades(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloCiudades(Objciudades:object){
     const ciudades:CiudadesModel[]=[];
     //validamos si el objeto tiene informaicon
     if(Objciudades===null){
         return [];
     }else{
       Object.keys(Objciudades).forEach(key=>{
         const titulo:CiudadesModel=Objciudades[key];
         ciudades.push(titulo);
       })
       return ciudades;
     }
  }
}

