import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import {Router } from '@angular/router';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() usuario:string;
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  domininio=environment;
  tipoUsuarioAdminSuper:boolean;
  tipoUsuarioPostulante:boolean;
  tiposUsuarioEmpleador:boolean;
  rolUsuario:string;
  tipoUsuarioAdmin:boolean;
  constructor(private servicioUsuario:AutenticacionUserService,
              private _router:Router) { }

  ngOnInit() {
    this.tipoUsuario();
  }
  tipoUsuario(){
    this.tipoUsuarioAdminSuper=false;
    this.tipoUsuarioPostulante=false;
    this.tiposUsuarioEmpleador=false;
    this.tipoUsuarioAdmin=false;
    //super administrador
    if(localStorage.getItem('tipoUsuario')=='4'){
      this.rolUsuario="Gestor";
      this.tipoUsuarioAdminSuper=true;
      this.tipoUsuarioAdmin=true;
    }
    //secretaria
    if(localStorage.getItem('tipoUsuario')=='3'){
      this.rolUsuario="Secretaria";
      this.tipoUsuarioAdmin=true;
    }
    //encargado
    if(localStorage.getItem('tipoUsuario')=='5'){
      this.rolUsuario="Encargado";
      this.tipoUsuarioAdmin=true;
    }
    //encargado
    if(localStorage.getItem('tipoUsuario')=='6'){
      this.rolUsuario="Empleador";
      this.tiposUsuarioEmpleador=true;
    }
    //empleador
    if(localStorage.getItem('tipoUsuario')=='2'){
      this.rolUsuario="Postulante";
      this.tipoUsuarioPostulante=true;
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
