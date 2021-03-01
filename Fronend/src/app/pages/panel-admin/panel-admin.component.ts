import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../models/usuario.model';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {
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
