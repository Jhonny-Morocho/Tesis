import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { of } from 'rxjs';
import {UsuarioModel} from '../../models/usuario.model';
// importamos el servicio
import {AutentificacionService} from '../../servicios/autentificacion.service';
// swei alert
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// CommonJS


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  instanciaUsuario:UsuarioModel=new UsuarioModel ;
  recordarme=false;

  constructor(private _autentificacionService:AutentificacionService,private router_:Router  ) {
    //this.instanciaUsuario.emanil="jhonnymichaeldj2011@hotmail.com";
    //this.instanciaUsuario.password="123456";
   }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.instanciaUsuario.correo=localStorage.getItem('email');
      this.recordarme=true;
    }
  }
  
  onSubMitLogin(formularioLogin:NgForm){
    //console.log(this.instanciaUsuario);
    console.log(this.recordarme);
    if(formularioLogin.invalid){
      return;
    }
     Swal({
       allowOutsideClick:false,
       type:'info',
       text:'Espere por favor'
     });
     Swal.showLoading();

    console.log(this.instanciaUsuario );
    console.log(formularioLogin);
    //hago la peticion a este servicio
    this._autentificacionService.login(this.instanciaUsuario).subscribe(
      (siHacesBien)=>{
        console.log(siHacesBien);
        Swal.close();
        // recordarme
        // si el this recordarrme esta en true entonces 
        if(this.recordarme){
          localStorage.setItem('email',this.instanciaUsuario.correo);
        }
        this.router_.navigateByUrl('home');
      },(peroSiTenemosERRO)=>{
        console.log(peroSiTenemosERRO);  
        console.log(peroSiTenemosERRO.error.error.message);
        Swal({
          title:'Error al autenticar',
          type:'error',
          text:peroSiTenemosERRO.error.error.message
        });  
      }
    );
  }



}
