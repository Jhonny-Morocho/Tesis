import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro-postulante',
  templateUrl: './registro-postulante.component.html'
})
export class RegistroPostulanteComponent implements OnInit {
  instanciaModeloUsuarioLogin:UsuarioModel;
  constructor() { }

  ngOnInit() {
  }

  registroPostulante(formularioRegistroPostulante:NgForm){
    console.log("soy el submit del formulario de registro");
  }
}
