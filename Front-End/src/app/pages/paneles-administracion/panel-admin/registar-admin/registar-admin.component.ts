import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {DocenteModel} from 'src/app/models/docente.models';
import {SerivicioDocente} from 'src/app/servicios/docente.service';
@Component({
  selector: 'app-registar-admin',
  templateUrl: './registar-admin.component.html'
})
export class RegistarAdminComponent implements OnInit {
  instanciaDocente:DocenteModel;
  estadoAcestadoUsuariotivo:boolean=true;
  constructor(private servicioDocente:SerivicioDocente) { }

  ngOnInit() {
    this.instanciaDocente=new DocenteModel();
  }
  onSubmitRegistrarAdmin(form:NgForm){
    if(form.invalid){
      return;
    }
    Swal({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor'
    });
    Swal.showLoading();
    this.instanciaDocente.estado=1;
    this.servicioDocente.crearDocente(this.instanciaDocente).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        if(siHacesBien['Siglas']=="OE"){
          Swal({
            position: 'center',
            type: 'success',
            title: 'Registro éxitoso',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal({
            title:'Error, no se puede ejecutar su peticion',
            type:'error',
            text:siHacesBien['error']
          }); 
        }
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );
    

  }
  eventHandler(event:Event){
    let escribir=(event.target as HTMLInputElement).value;
    console.log(escribir);
  }
  estadoUsuarioAdmin(estado:Number){
    if(estado==1){
     return this.estadoAcestadoUsuariotivo=true;
    }
    if(estado==0){
      return this.estadoAcestadoUsuariotivo=false;
     }
  }

}
