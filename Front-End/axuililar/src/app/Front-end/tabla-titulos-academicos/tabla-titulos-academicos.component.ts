import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $:any;
@Component({
  selector: 'app-tabla-titulos-academicos',
  templateUrl: './tabla-titulos-academicos.component.html'
})
export class TablaTitulosAcademicosComponent implements OnInit {
  @Input() tituloAcademico:any=[];
    //frame
    frameLimpio:any;
    ubicacionArchivo:String="";
    dominio=environment;
    existeRegistros:boolean=false;
  ngOnInit() {

  }
  mostrarPdf(urlEvidencias){
    console.log(urlEvidencias);
    this.ubicacionArchivo =environment.dominio+"/Archivos/Titulos/"+urlEvidencias;
    $('#mostrarPDFTitulos').modal('show');
  }
  carrarModal(){
    $('#mostrarPDFTitulos').modal('hide');
  }
}
