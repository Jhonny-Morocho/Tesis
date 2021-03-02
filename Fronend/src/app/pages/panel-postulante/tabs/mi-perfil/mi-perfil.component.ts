import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../../../models/usuario.model';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
})
export class MiPerfilComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('correo')){
      console.log(localStorage);
      this.instanciaUsuario.nombre = localStorage.getItem('nombe');
      this.instanciaUsuario.apellido = localStorage.getItem('apellido');
      this.instanciaUsuario.correo = localStorage.getItem('correo');
    }else{
     // no existe session por lo cual debo direccionar al inicio
   }
  }

}
