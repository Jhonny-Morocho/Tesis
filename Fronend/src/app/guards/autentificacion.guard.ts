import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { Observable } from 'rxjs';
import {AutentificacionService} from '../servicios/autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionGuard implements CanActivate {
  
      constructor(private authn_:AutentificacionService,
        private router_:Router){}

  canActivate( ): boolean{
    console.log("GUARD");
    console.log(this.authn_.estaAutenticado);
    if(this.authn_.estaAutenticado()){
        return true;
    }else{
        console.log(this.authn_.estaAutenticado());
        this.router_.navigateByUrl('/login')
       return false;
    }
  }
  
}
