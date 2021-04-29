import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import {Router } from '@angular/router';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input() usuario:string;
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  domininio=environment;
  tipoUsuarioAdmin:boolean=false;
  constructor(private servicioUsuario:AutenticacionUserService,
              private _router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('tipoUsuario')=='4'){
      this.tipoUsuarioAdmin=true;
    }

  }
  salirSession(){
    // ocupo el servicio
    Swal({
      title: '¿ Está seguro?',
      text: "La sesión se cerrará",
      type: 'warning',
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
  comprobarSession(){
    if(this.servicioUsuario.estaAutenticado()==true){
      this.instanciaUsuario.correo = localStorage.getItem('correo');
    }
  }

}
