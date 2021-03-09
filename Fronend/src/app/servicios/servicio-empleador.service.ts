import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SerivicioEmpleadorService {
  //el url del servicio o del backend
  private urlDominio_="http://localhost/Tesis";
  private urlBackendCrearEmpleador="/Backend/public/index.php/empleador/registro/";
  private urlListarFormEmpleador="/Backend/public/index.php/empleador/formEmpleador";
  private urlListarEmpleadores="/Backend/public/index.php/empleador/listarEmpleadores";
  private urlObtenerPostulanteExternal_es="/Backend/public/index.php/estudiante/obtenerPostulanteExternal_es";
  private urlValidarPostulante="/Backend/public/index.php/estudiante/actulizarAprobacionEstudiante/";
  private urlEditarFormPostulante="/Backend/public/index.php/estudiante/actulizarFormEstudiante/";
  constructor(private _httCliente:HttpClient) { }

  crearEmpleador(modeloEmpleador:EmpleadorModel){
    const autenficacionDatos={
      razon_empresa:modeloEmpleador.razon_empresa,
      tipo_empresa:modeloEmpleador.tiposEmpresa,
      actividad_ruc:modeloEmpleador.actividad_ruc,
      num_ruc:modeloEmpleador.num_ruc,
      cedula:modeloEmpleador.cedula,
      nom_representante_legal:modeloEmpleador.nom_representante_legal,
      ciudad:modeloEmpleador.ciudad,
      provincia:modeloEmpleador.provincia,
      telefono:modeloEmpleador.provincia,
      direccion:modeloEmpleador.provincia,
      observaciones:modeloEmpleador.observaciones,
      estado:0
    }
    //retorna la respuesata
    console.log(`${this.urlDominio_}${this.urlBackendCrearEmpleador}${localStorage.getItem("external_us")}`);
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlBackendCrearEmpleador}${localStorage.getItem("external_us")}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{

          return respuestaBackend;
        })
    );
  }
  
  //el postulante en su session puede ver sus datos registrados
  listarFormEmpleador(){
    const autenficacionDatos={
      external_us:localStorage.getItem("external_us")
    }
    return this._httCliente.post(
      `${this.urlDominio_}${this.urlListarFormEmpleador}`,autenficacionDatos
    ).pipe(
      map(
        respuestaBackend=>{
          return respuestaBackend;
        })
    );
  }
  //listammos postulantes activos /no activos / depende del estado
  listarEmpleadores(){

    //retorna la respuesata
    return this._httCliente.get(
      `${this.urlDominio_}${this.urlListarEmpleadores}`
    ).pipe(
      map(
        respuestaBackend=>{
          return this.crearArregloEstudiantes(respuestaBackend['mensaje']);
        })
    );
  }

  private crearArregloEstudiantes(ObjEstudiante:object){
    const estudiantex:EmpleadorModel[]=[];
    //validamos si el objeto tiene informaicon
    if(ObjEstudiante===null){
        return [];
    }else{
      Object.keys(ObjEstudiante).forEach(key=>{
        const estudiante:EmpleadorModel=ObjEstudiante[key];
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
  actulizarDatosPostulante(modeloPostulante:EmpleadorModel){
    //   const autenficacionDatos={
    //     cedula:modeloPostulante.cedula,
    //     telefono:modeloPostulante.telefono,
    //     nombre:modeloPostulante.nombre,
    //     apellido:modeloPostulante.apellido,
    //     genero:modeloPostulante.genero,
    //     fecha_nacimiento:modeloPostulante.fecha_nacimiento,
    //     direccion_domicilio:modeloPostulante.direccion_domicilio,
    //     observaciones:modeloPostulante.observaciones,
    //   }
    // //retorna la respuesata
    //   return this._httCliente.post(
    //     `${this.urlDominio_}${this.urlEditarFormPostulante}${localStorage.getItem("external_us")}`,autenficacionDatos
    //   ).pipe(
    //     map(
    //       respuestaBackend=>{
    //         return respuestaBackend;
    //       })
    //   );
  }
}

