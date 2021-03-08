import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../../../../models/usuario.model';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil-empleador.component.html',
})
export class MiPerfilComponentEmpleador implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('correo')){
      console.log(localStorage);
      this.instanciaUsuario.correo = localStorage.getItem('correo');
    }else{
     // no existe session por lo cual debo direccionar al inicio
   }
  }

}
