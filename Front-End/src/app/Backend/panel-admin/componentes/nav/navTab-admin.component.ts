import { Component, OnInit } from '@angular/core';
// importa utomaticamente el ingForm
import Swal from 'sweetalert2';
import {UsuarioModel} from '../../../../models/usuario.model';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'navTab-admin',
  templateUrl: './navTab-admin.component.html'
})
export class PanelAdminComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  dominio=environment;
  tipoUsuarioSecretaria:boolean=false;
  tipoUsuarioEncargado:boolean=false;
  tipoUsuarioGestor:boolean=false;
  constructor(private _router:Router,private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {
    this.verificarDireccionarTipoUsuario();
  }

  verificarDireccionarTipoUsuario(){
    if((this.servicioUsuario.estaAutenticado())==true){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
      //console.log(parseInt(localStorage.getItem('tipoUsuario')));
      switch (parseInt(localStorage.getItem('tipoUsuario'))) {
        case 5:
          this.tipoUsuarioEncargado=true;
          break;
        case 3:
          this.tipoUsuarioSecretaria=true;
          break;
        case 4:
          this.tipoUsuarioGestor=true;
          break;
        default:
          Swal('Error','Rol de usuario no encontrado', 'error');
          break;
      }

    }else{
     // no existe session por lo cual debo direccionar al inicio
    }
  }
  salirSession(){
    // ocupo el servicio
    Swal({
      title: '¿Está seguro ?',
      text: "La sesión se cerrara ",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.servicioUsuario.cerrarSession();
        this._router.navigateByUrl('/home');
      }
    })
  }

}


