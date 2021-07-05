import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';
import { PaisesModel } from 'src/app/models/paises.models';
import { PaisesService } from 'src/app/servicios/paises.service';
import {environment} from 'src/environments/environment.prod';
declare var $:any;
@Component({
  selector: 'app-tabla-cursos-capacitaciones',
  templateUrl: './tabla-cursos-capacitaciones.component.html'
})
export class TablaCursosCapacitacionesComponent implements OnInit {
  ubicacionArchivo:string="";
  @Input() instanciaCursosCapacitaciones:any={};
  paises:PaisesModel[]=[];
  constructor( private servicioPaises:PaisesService) {

   }

  ngOnInit() {
    this.cargarPaises();
  }
  cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
       // console.log(siHacesBien);
        //cargo array con la data para imprimir en la tabañ
        this.paises =siHacesBien;
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
  }
  buscarPais(idPais){
    let nombrePais="";
    this.paises.forEach(element => {
      if(element.id==parseInt(idPais)){
        nombrePais=element.nombre;
      }
    });
    return nombrePais;
   }

  mostrarPdf(urlEvidencias){
    this.ubicacionArchivo =environment.dominio+"/Archivos/Cursos/"+urlEvidencias;
    $('#mostrarCursos').modal('show');
  }
  carrarModal(){
    $('#mostrarCursos').modal('hide');
  }
}
