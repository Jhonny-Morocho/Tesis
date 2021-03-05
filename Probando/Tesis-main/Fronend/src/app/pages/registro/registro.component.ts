import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {UsuarioModel} from '../../models/usuario.model';
import {AutentificacionService} from '../../servicios/autentificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  recordarme=false;

  instanciaUsuario:UsuarioModel;
  constructor(private _autentifiacion:AutentificacionService,private router_:Router ) { }
  
  // cuando carga la pagina se llena el formulario
  ngOnInit() { 
    this.instanciaUsuario=new UsuarioModel();
     this.instanciaUsuario.correo="angular@hotmail.com";
     this.instanciaUsuario.password="miPassword";
     this.instanciaUsuario.tipoUsuario=1;
     this.instanciaUsuario.estado=1;
     this.instanciaUsuario.external_us="external_us";
     
  }
  // cunado le de click en enviar o registrar se ejecuta el submit
  onSubMit(formulario:NgForm){
      // var objetox= {
            
      //             "tipo_docente":1
                
      //           }
    
    var obj2={  
      "correo":"angularprueba@hotmail.com",
      "nombre":"demoangular",
      "password":"123456",
      "tipoUsuario":1,
      "estado":1,
      "external_us":"external_us",
      "apellido":"demoapellido"
              }
    console.log(obj2);
     if(formulario.invalid){
       return;
      }
    //mensaje de alerta usuario 
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();

    console.log("Formulario enviado");
    console.log(this.instanciaUsuario);
    console.log(formulario);

    //envio la informacion a mi servicio
    this._autentifiacion.nuevoUsuario(obj2).subscribe(resp=>{
      console.log(resp);
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email',this.instanciaUsuario.correo);
      }
      this.router_.navigateByUrl('home');
    },(err)=>{
      console.log(err);

      Swal({
        title:'Error al autenticar',
        type:'error',
        text:err
      }); 
    });
  }


}
