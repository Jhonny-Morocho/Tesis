import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../../../models/usuario.model';
import {AutenticacionUserService} from '../../../../servicios/autenticacion-usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil-admin.component.html',
})
export class MiPerfilComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  ObjDatosPerfil:Object;
  constructor(private servicioAuthenAdmin_:AutenticacionUserService,
              private _routert:Router) { }

  ngOnInit() {
    if(localStorage.getItem('correo')){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
      //tipo de usuario o tipo de administrado
        this.datosUsuarioPerfil(this.instanciaUsuario.correo);
    }else{
     // no existe session por lo cual debo direccionar al inicio
     this.servicioAuthenAdmin_.estaAutenticado();
   }
  }
  datosUsuarioPerfil(correo){
    const datosUsuarioPerfil={
      correo:correo
    }
    this.ObjDatosPerfil=datosUsuarioPerfil;
  }
}
