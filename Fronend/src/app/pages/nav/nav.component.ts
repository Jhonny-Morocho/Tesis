import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionUserService} from '../../servicios/autenticacion-usuario.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {

  constructor(private _servicioUsuario:AutenticacionUserService ,private roter_:Router) { }

  ngOnInit() {

  }
  salirSession(){
    this._servicioUsuario.cerrarSession();
    this.roter_.navigateByUrl('/home');

  }
}
//0998466405
