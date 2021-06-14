import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import {DocenteModel} from 'src/app/models/docente.models';
import {SerivicioDocente} from 'src/app/servicios/docente.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registar-admin',
  templateUrl: './form-registar-admin.component.html'
})
export class RegistarAdminComponent implements OnInit {
  instanciaDocente:DocenteModel;
  estadoAcestadoUsuariotivo:boolean=true;
  constructor(private servicioDocente:SerivicioDocente,private servicioRouter:Router) { }

  ngOnInit() {
    this.instanciaDocente=new DocenteModel();
    this.estadoUsuarioAdmin(1);
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
    //this.instanciaDocente.estado=1;
    this.servicioDocente.crearDocente(this.instanciaDocente).subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        if(siHacesBien['Siglas']=="OE"){
          Swal({position: 'center',type: 'success',title: 'Registro éxitoso',showConfirmButton: false,timer: 1500})
          this.servicioRouter.navigateByUrl('/panel-admin/gestionar-usuarios-admin');
        }else{
          Swal({title:'Error',type:'error',text:siHacesBien['mensaje']}); 
        }
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );
    

  }

  estadoUsuarioAdmin(estado:Number){
    if(estado==1){
      this.instanciaDocente.estado=1;
     return this.estadoAcestadoUsuariotivo=true;
    }
    if(estado==0){
      this.instanciaDocente.estado=0;
      return this.estadoAcestadoUsuariotivo=false;
     }
  }

}
