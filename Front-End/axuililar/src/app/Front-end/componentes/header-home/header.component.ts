import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionUserService} from 'src/app/servicios/autenticacion-usuario.service';


@Component({
  selector: 'header-home',
  templateUrl: './haader.component.html'
})
export class HeaderComponent implements OnInit {
  estadoInicioSession:boolean=false;
  usuario:string="";
  rutaUsuarioPanel:string="";
  constructor(private router:Router,private servicioUsuario:AutenticacionUserService ) { }

  ngOnInit() {
    this.tipoUsuario();
  }

  tipoUsuario(){
    if(this.servicioUsuario.estaAutenticado()==true){
      this.estadoInicioSession=true;
      this.usuario=localStorage.getItem("correo");
      switch (parseInt(localStorage.getItem("tipoUsuario"))) {
        case 3:
          this.rutaUsuarioPanel='/panel-admin/mi-perfil';
          break;
        case 6:
          this.rutaUsuarioPanel='/panel-empleador/form-info-empleador';
          break;
        case 2:
          this.rutaUsuarioPanel='/panel-postulante/form-info-postulante';
          break;
        case 5:
          this.rutaUsuarioPanel='/panel-admin/mi-perfil';
          break;
        case 4:
          this.rutaUsuarioPanel='/panel-admin/mi-perfil';
          //this.router.navigateByUrl('/panel-admin/mi-perfil');
          break;
        default:
          break;
      }
    }
  }





}

