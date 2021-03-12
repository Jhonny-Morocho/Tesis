import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TituloModel} from '../models/titulo.models';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TituloService {
  //el url del servicio o del backend
  private urlDominio_="http://localhost/Tesis";
  private urlBackendCrearTitulo="/Backend/public/index.php/titulos-academicos/registro/";
  private urlSubirArchivo="/Backend/public/index.php/titulos-academicos/subirArchivo";
  private urlListarFormPostulante="/Backend/public/index.php/estudiante/FormEstudiante";
  private urlListarTitulo="/Backend/public/index.php/titulos-academicos/listarTitulosEstudiante/";
  private urlObtenerTitUloExternal_ti="/Backend/public/index.php/titulos-academicos/obtenerTituloExternal_ti/";
  private urlEditarFormPostulante="/Backend/public/index.php/estudiante/actulizarFormEstudiante/";
  constructor(private _httCliente:HttpClient) { }

  subirArchivoPDF(FormDataPDF){
     return this._httCliente.post(`${this.urlDominio_}${this.urlSubirArchivo}`,FormDataPDF
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
           return respuestaBackend;
         })
     );
  }
  crearTitulo(modeloTitulo:TituloModel){
    const autenficacionDatos={
       ...modeloTitulo
     }
     return this._httCliente.post(`${this.urlDominio_}${this.urlBackendCrearTitulo}${localStorage.getItem("external_us")}`,autenficacionDatos
     ).pipe(
       map(
         respuestaBackend=>{
         console.log(respuestaBackend);
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
  listarTitulos(){

    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarTitulo}${localStorage.getItem("external_us")}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloEstudiantes(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloEstudiantes(ObjTitulos:object){
     const titulos:TituloModel[]=[];
     //validamos si el objeto tiene informaicon
     if(ObjTitulos===null){
         return [];
     }else{
       Object.keys(ObjTitulos).forEach(key=>{
         const titulo:TituloModel=ObjTitulos[key];
         titulos.push(titulo);
       })
       return titulos;
     }
  }

  //obetnemos los estudiantes aprobado/no aprobandos dependenidendo del estado
  obtenerTituloExternal_es(external_es:string){
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlObtenerTitUloExternal_ti}${external_es}`,
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
 
  }

    //actulizar estado de validacion del postulante//aprobado y no aprobado
//   actulizarDatosPostulante(modeloPostulante:PostulanteModel){
//       const autenficacionDatos={
//         cedula:modeloPostulante.cedula,
//         telefono:modeloPostulante.telefono,
//         nombre:modeloPostulante.nombre,
//         apellido:modeloPostulante.apellido,
//         genero:modeloPostulante.genero,
//         fecha_nacimiento:modeloPostulante.fecha_nacimiento,
//         direccion_domicilio:modeloPostulante.direccion_domicilio,
//         observaciones:modeloPostulante.observaciones,
//       }
//     //retorna la respuesata
//       return this._httCliente.post(
//         `${this.urlDominio_}${this.urlEditarFormPostulante}${localStorage.getItem("external_us")}`,autenficacionDatos
//       ).pipe(
//         map(
//           respuestaBackend=>{
//             return respuestaBackend;
//           })
//       );
//   }
}

