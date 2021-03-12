import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TituloService} from 'src/app/servicios/titulos.service';
import {TituloModel} from 'src/app/models/titulo.models';

@Component({
  selector: 'app-form-editar-titulo',
  templateUrl: './form-editar-titulo.component.html'
})
export class FormEditarTituloComponent implements OnInit {
  instanciaTituloAcademico:TituloModel;
  listaNivelInsturccion:string[]=["Tercer Nivel","Cuarto Nivel"];

  constructor(private _activateRoute:ActivatedRoute, private servicioTitulo:TituloService) {
    this.instanciaTituloAcademico=new TituloModel;
    //obtener los parametros de la ulr para tener los datos del empleador
    this._activateRoute.params.subscribe(params=>{
      //consumir el servicio
      this.servicioTitulo.obtenerTituloExternal_es(params['external_ti']).subscribe(
        suHacesBien=>{
            console.log(suHacesBien);
            //encontro estudiante estado==0
            if(suHacesBien["Siglas"]=="OE"){
              // console.log( suHacesBien['Siglas']);
              this.instanciaTituloAcademico.estado=1;
              this.instanciaTituloAcademico.tipo_titulo=suHacesBien["mensaje"]['tipo_titulo'];
              this.instanciaTituloAcademico.numero_registro="";
              this.instanciaTituloAcademico.titulo_obtenido="";
              this.instanciaTituloAcademico.detalles_adiciones="";
            }else{
              console.log("no encontrado");
              //this.encontrado=false;
            }
        },peroSiTenemosErro=>{
     
          console.log(peroSiTenemosErro);
        }
      )
    });
  }

  
  ngOnInit() {
   

  }
}

