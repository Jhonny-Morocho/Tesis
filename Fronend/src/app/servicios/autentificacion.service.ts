 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UsuarioModel} from '../models/usuario.model';
// importmaos el mamp para poder usar el token y gaurdar en el local storage
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  
  private url="http://localhost/Tesis/Backend/public/index.php/usuario/registro";
  //private url=" https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA3VNPT6AGOrQ3rqEiMkiZT7G_SqXvaOg8";
  
  
  userToken:string;
  constructor(private _http:HttpClient) { 
    this.leerDatosLocalSotarage();
  }
  
  //cerrar session
  logOut(){
    // solo borramos el token del localsorage
    localStorage.removeItem('token');

  }
  // ingresar al sistema
  login(_usuario:UsuarioModel){
    const autentificacionDatos={
      // tamien pudo hacerlo asi
      //..._usuario
      email:_usuario.correo,
      password:_usuario.password,
      returnSecureToek:true
    }
    return this._http.post(
      `${this.url}`,
      autentificacionDatos
    ).pipe(map(
      obtengoRespues=>{
        console.log("Entro en el mapa del RKJS");
        this.guardarToken(obtengoRespues['idToken']);
        return obtengoRespues;
      }
    )) 

  }
  //crear  nuevo usaurio
  nuevoUsuario(_usuario:UsuarioModel){

    //enviamos los datos 
    const autentificacionDatos={
      correo:_usuario.correo,
      password:_usuario.password,
      tipoUsuario:_usuario.tipoUsuario,
      estado:_usuario.estado,
      external_us:_usuario.external_us,
      returnSecureToek:true
    }
    console.log(this.url);
    return this._http.post(
      `${this.url}`,
      autentificacionDatos
    ).pipe(map(
      obtengoRespues=>{
        console.log("Entro en el mapa del RKJS");
        this.guardarToken(obtengoRespues['idToken']);
        return obtengoRespues;
      }
    ))
  }

  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);
    let hoy=new Date();
    hoy.setSeconds(3600);//una hora en el futuro
    localStorage.setItem('expira',(hoy.getTime()).toString());
  }

  leerDatosLocalSotarage(){ 
    if(localStorage.getItem('token')){
        this.userToken=localStorage.getItem('token');
    }else{
      this.userToken="";
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    console.log("estaAutenticado ");
    if(this.userToken.length<2){
        return false;
    }
    const expira=Number(localStorage.getItem('expira'));
    const expiraDate= new Date();
    expiraDate.setTime(expira);
    if( expiraDate>new Date()){
        return true;
    }else{
      return false;
    }

  }
}
