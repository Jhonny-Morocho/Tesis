import { Component, OnInit } from '@angular/core';
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

}
