import { Component, OnInit } from '@angular/core';
// importa utomaticamente el ingForm
import Swal from 'sweetalert2';
import {UsuarioModel} from '../../../../models/usuario.model';
import { Router } from '@angular/router';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'navTab-admin',
  templateUrl: './navTab-admin.component.html'
})
export class PanelAdminComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  tipoUsuarioSecretaria:boolean=false;
  tipoUsuarioEncargado:boolean=false;
  tipoUsuarioGestor:boolean=false;
  constructor(private _router:Router,private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {

    if(localStorage.getItem('correo')){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
      //console.log(parseInt(localStorage.getItem('tipoUsuario')));
      switch (parseInt(localStorage.getItem('tipoUsuario'))) {
        case 5:
          this.tipoUsuarioEncargado=true;
          console.log(this.tipoUsuarioEncargado);
          break;
        case 3:
          this.tipoUsuarioSecretaria=true;
          break;       
        case 4:
          this.tipoUsuarioGestor=true;
          break;
        default:
          console.log("tipo de usuario para nav item no encontrado");
          break;
      }
      
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


