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
export class AutenticacionAdminService {
  // el url de donde voy a solicitar el servicio
  private urlDominio_="http://localhost/Tesis";

 
  private urlBackend_="/Backend/public/index.php/usuario/login-admin";

  constructor(private _httCLiente:HttpClient) { }

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
    //console.log(`${this.urlDominio_}${this.urlBackend_}`);
    return this._httCLiente.post(`${this.urlDominio_}${this.urlBackend_}`,objetoUsuario).pipe(
      map(
        respuestaBackend=>{
          console.log("Entro en el mapa del RKJS");
          this.guarUsuarioTempLocalSotarage(respuestaBackend['mensaje']);
          console.log(respuestaBackend['mesaje']);
          console.log(respuestaBackend);
          return respuestaBackend;
        }
      )
    );

  }
  guarUsuarioTempLocalSotarage(respuestaBackend:UsuarioModel){
    console.log(respuestaBackend);
    localStorage.setItem('nombe', respuestaBackend.nombre);
    localStorage.setItem('apellido', respuestaBackend.apellido);
    localStorage.setItem('correo', respuestaBackend.correo);
    localStorage.setItem('tipoUsuario', (respuestaBackend.tipoUsuario).toString());
    // la sesion de cierra en 1 hora
     let hoy = new Date();
     hoy.setSeconds( 3600 );
    localStorage.setItem('expira',hoy.getTime().toString());
  }
  
   cerrarSession(){
     localStorage.clear();
   }


}
