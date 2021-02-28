import { Component, OnInit } from '@angular/core';
// ocupamos el servicio para cerrar la session
import {AutentificacionService} from '../../servicios/autentificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auten_:AutentificacionService,
              private roter_:Router) { }

  ngOnInit() {
  }

  salir(){
    this.auten_.logOut();
    this.roter_.navigateByUrl('login');
  }

}
