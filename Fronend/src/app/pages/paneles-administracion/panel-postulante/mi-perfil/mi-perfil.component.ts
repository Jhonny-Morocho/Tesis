import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioModel} from '../../../../models/usuario.model';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
})
export class MiPerfilPostulanteComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  constructor(private _router:Router,private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {
    if(localStorage.getItem('correo')){
      console.log(localStorage);
      this.instanciaUsuario.correo = localStorage.getItem('correo');
    }else{
     // no existe session por lo cual debo direccionar al inicio
   }
  }
  salirSession(){
    // ocupo el servicio
    Swal({
      title: 'Are you sure?',
      text: "Esta seguro que desea cerrar su session",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.servicioUsuario.cerrarSession();
        this._router.navigateByUrl('/home');
      }
    })
  }

}
