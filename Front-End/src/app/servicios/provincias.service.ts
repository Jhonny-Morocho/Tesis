import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { ProvinciasModels } from '../models/provincias.models';
@Injectable({
  providedIn: 'root'
})
export class ServicioProvincias {
  //el url del servicio o del backend
  private urlDominio_=environment.dominio;
  private urlListarProvincias="/Backend/public/index.php/provincias/listarProvincias";

  constructor(private _httCliente:HttpClient) { }

  //listammos os paises
  listarProvincias(){
    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarProvincias}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloProvincias(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloProvincias(Objprovincias:object){
     const provincias:ProvinciasModels[]=[];
     //validamos si el objeto tiene informaicon
     if(Objprovincias===null){
         return [];
     }else{
       Object.keys(Objprovincias).forEach(key=>{
         const titulo:ProvinciasModels=Objprovincias[key];
         provincias.push(titulo);
       })
       return provincias;
     }
  }
}

