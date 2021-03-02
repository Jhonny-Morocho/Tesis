import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { Observable } from 'rxjs';
import {AutenticacionUserService} from '../servicios/autenticacion-usuario.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AutentificacionGuard implements CanActivate {
  
  constructor(private authnServicioAdmin_:AutenticacionUserService,
              private router_:Router){}

  canActivate( ): boolean{
    console.log("PROBANDO CAN ACTIVARE O RESTRICION DE RUTAS");
    console.log(this.authnServicioAdmin_.estaAutenticado());
     if(this.authnServicioAdmin_.estaAutenticado()){
         return true;
     }else{
        Swal({
          title:'Error al autenticar',
          type:'error',
          text:'La session ha expirado '
        }); 
         console.log(this.authnServicioAdmin_.estaAutenticado());
         this.router_.navigateByUrl('/home')
        return false; 
     }
  }
  
}
