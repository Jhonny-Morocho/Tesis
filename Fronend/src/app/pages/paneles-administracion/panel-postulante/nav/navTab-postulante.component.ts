import { Component, OnInit } from '@angular/core';
// importa utomaticamente el ingForm
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AutenticacionUserService } from 'src/app/servicios/autenticacion-usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'navTab-postulante',
  templateUrl: './navTab-postulante.component.html'
})
export class PanelPostulanteComponent implements OnInit {
  instanciaUsuario:UsuarioModel=new UsuarioModel;
  constructor(private _router:Router,private servicioUsuario:AutenticacionUserService) { }

  ngOnInit() {
    if(localStorage.getItem('correo')){
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
