import { Injectable } from '@angular/core';
// usamos el hhtp cliente para consumir el servicio
import { HttpClient}  from '@angular/common/http';
// importo el usuario model
import {UsuarioModel} from '../models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionUserService {
  // el url de donde voy a solicitar el servicio
  private urlDominio_="http://localhost/Tesis";
  private urlBackend_Login="/Backend/public/index.php/usuario/login";
  private urlBackend_CrearUsuario="/Backend/public/index.php/usuario/registro";
  private nombreUser:string;
  private correo:string;
  private apellido:string;
  private tipoUsuario:number;
  constructor(private _httCLiente:HttpClient) {
    //leemos los datos del localstorage
    this.leerLocalSotarage();
   }

  //funciones de login 
  //recibo el modelo del usuario model con los datos
  login(usuioModel_:UsuarioModel){

    //estos parametros deben ser igual a los de la tabla del BD
     const objetoUsuario={
       correo:usuioModel_.correo,
       password:usuioModel_.password,
     }
    console.log(objetoUsuario);
    console.log(usuioModel_);
    // apcimos el metodo post y la promesa
    //console.log(`${this.urlDominio_}${this.urlBackend_Login}`);
    return this._httCLiente.post(`${this.urlDominio_}${this.urlBackend_Login}`,
                                objetoUsuario
    ).pipe(
      map(
        respuestaBackend=>{
          console.log("Entro en el mapa del RKJS");
          this.guarUsuarioTempLocalSotarage(respuestaBackend['mensaje']);
          return respuestaBackend;
        }
      )
    );

  }
  guarUsuarioTempLocalSotarage(respuestaBackend:UsuarioModel){
    this.correo=respuestaBackend.correo;
    this.tipoUsuario=Number(respuestaBackend.tipoUsuario);
    localStorage.setItem('correo', respuestaBackend.correo);
    localStorage.setItem('tipoUsuario', (respuestaBackend.tipoUsuario).toString());
    localStorage.setItem('external_us', respuestaBackend.external_us);
    localStorage.setItem('estado', (respuestaBackend.estado).toString());
    // la sesion de cierra en 1 hora
     let hoy = new Date();
     hoy.setSeconds( 36000 );
     localStorage.setItem('expira',hoy.getTime().toString());
  }
  
   cerrarSession(){
     localStorage.clear();
   }

    leerLocalSotarage(){
      if(localStorage.getItem('correo')){
        
       this.correo=localStorage.getItem('correo');
       this.nombreUser=localStorage.getItem('nombe');
       this.apellido=localStorage.getItem('apellido');
       this.tipoUsuario=Number(localStorage.getItem('tipoUsuario'));

    }else{
      this.correo="";
       this.nombreUser="";
       this.apellido="";
       this.tipoUsuario=0;
    }
    return this.correo;
  }

  estaAutenticado():boolean{
    //pregunta si existe correo osea un usuario
    
    console.log(this.correo.length);
    if(this.correo.length<2){
      return false;
    }
    // pregutnar si le session a expirado del local starge
     const expira=Number(localStorage.getItem('expira'));
     const expiraDate=new Date();
     expiraDate.setSeconds(expira);
     const tiempoHoy=new Date();

      if(expiraDate>tiempoHoy){
        return true;
      }else{
        return false;
      }
   
    //return this.correo.length>2;
  }
  crearNuevoUsuario(modelUsuario:UsuarioModel){
    //envio el json tal como esta en el backen
    const autenficacionDatos={
      correo:modelUsuario.correo,
      password:modelUsuario.password,
      tipoUsuario:modelUsuario.tipoUsuario,
      estado:modelUsuario.estado,
    }
    //enviamos la peticion al servidor o al backen

    return this._httCLiente.post(
      `${this.urlDominio_}${this.urlBackend_CrearUsuario}`,autenficacionDatos
    ).pipe(
      map(
        obtengoRespuesBackend=>{
          console.log("Entro en el mapa del RKJS");
          console.log(obtengoRespuesBackend);
          console.log(obtengoRespuesBackend['mensaje']);
          //this.guarUsuarioTempLocalSotarage();
          //this.guardarToken(obtengoRespuesBackend['idToken']);
          this.guarUsuarioTempLocalSotarage(obtengoRespuesBackend['mensaje']);
          return obtengoRespuesBackend;
        }
      )
    );
  }
}
