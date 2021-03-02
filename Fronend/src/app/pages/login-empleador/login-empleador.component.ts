import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login-empleador',
  templateUrl: './login-empleador.component.html'
})
export class LoginEmpleadorComponent implements OnInit {
// Instancio mi modelo
instanciaModeloUsuarioLogin:UsuarioModel=new UsuarioModel;
  constructor() { }

  ngOnInit() {
  }

}
