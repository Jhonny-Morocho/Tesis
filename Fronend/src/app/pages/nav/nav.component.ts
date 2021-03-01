import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionAdminService} from '../../servicios/autenticacion-admin.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _servicioUsuario:AutenticacionAdminService ,private roter_:Router) { }

  ngOnInit() {

  }
  salirSession(){
    this._servicioUsuario.cerrarSession();
    this.roter_.navigateByUrl('/home');

  }
}
//0998466405
