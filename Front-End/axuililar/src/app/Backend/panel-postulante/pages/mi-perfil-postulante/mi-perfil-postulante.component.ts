import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';

@Component({
  selector: 'app-mi-perfil-postulante',
  templateUrl: './mi-perfil-postulante.component.html'
})
export class MiPerfilPostulanteComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  ObjDatosPerfil:Object;
  constructor(private servicioAuthenAdmin_:AutenticacionUserService) { }

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
