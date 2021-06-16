import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
//importo libreria para poder jugar con las fechas
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHerrera(control: FormControl):{[s:string]:boolean}{

    if(control.value.toLowerCase()==='herrera'){
      return{
        noHerrera:true
      }
    }
    return null;
  }
  noFechaMayorActualPostulante(control: FormControl):{[s:string]:boolean}{
    let fechaActual=moment().format("YYYY-MM-DD");
    let fechaMinima='1905-01-01';
    if(fechaActual<=control.value ||  fechaMinima >= control.value){
      return{
        noFechaMayorActualPostulante:true
      }
    }else{
      return null;
    }
  }
  soloTexto(control: FormControl):{[s:string]:boolean}{
      const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i');
      if (!pattern.test(control.value)){
        // si estra entonces no cumple con la validacion
        return{
          soloTexto:true
        }
      }
      return null
  }
  soloNumeros(control: FormControl):{[s:string]:boolean}{
    const pattern = new RegExp('^[0-9]*$');
    if (!pattern.test(control.value)){
      return{
        soloNumeros:true
      }
    }
    return null;
  }
}
