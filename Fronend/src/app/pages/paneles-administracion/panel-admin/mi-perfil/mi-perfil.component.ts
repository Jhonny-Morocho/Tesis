import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../../../models/usuario.model';
import {AutenticacionUserService} from '../../../../servicios/autenticacion-usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
})
export class MiPerfilComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  constructor(private servicioAuthenAdmin_:AutenticacionUserService,
              private _routert:Router) { }

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
        this.servicioAuthenAdmin_.cerrarSession();
        this._routert.navigateByUrl('/home');
      }
    })
  }

}
