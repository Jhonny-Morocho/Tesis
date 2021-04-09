import { Component, OnInit,Input } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var $:any;
@Component({
  selector: 'app-tabla-titulos-academicos',
  templateUrl: './tabla-titulos-academicos.component.html'
})
export class TablaTitulosAcademicosComponent implements OnInit {
  @Input() tituloAcademico:any={};
    //frame 
    frameLimpio:any;
    ubicacionArchivo:String="";
    dominio=environment;
  ngOnInit() {

  }
  mostrarPdf(urlEvidencias){
    console.log(urlEvidencias);
    this.ubicacionArchivo =environment.dominio+"/Archivos/Titulos/"+urlEvidencias;
    console.log(this.ubicacionArchivo);
    $('#mostrarPDFTitulos').modal('show');
  }
}
