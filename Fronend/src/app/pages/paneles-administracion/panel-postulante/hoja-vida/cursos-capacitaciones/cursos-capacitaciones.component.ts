import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import { PaisesModel } from 'src/app/models/paises.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {PaisesService} from 'src/app/servicios/paises.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cursos-capacitaciones',
  templateUrl: './cursos-capacitaciones.component.html'
})
export class CursosCapacitacionesComponent implements OnInit {
  instanciaCursosCapacitaciones:CursosCapacitacionesModel;
  //tabla data que consumo del servicio
  paises:PaisesModel[]=[];
  cursosCapacitaciones:CursosCapacitacionesModel[]=[];
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioCursosCapacitacione:CursosCapacitacionesService,private servicioPaises:PaisesService) { 
    
  }

  ngOnInit() {
    this.cargarTabla();
    this.cargarPaises();
  }

  cargarTabla(){
    //listamos los titulos academicos
    this.servicioCursosCapacitacione.listarCursosCapacitaciones().subscribe(
      siHacesBien=>{
        this.cursosCapacitaciones =siHacesBien;

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
   }
   cargarPaises(){
    //listamos los titulos academicos
    this.servicioPaises.listarPaises().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
        //cargo array con la data para imprimir en la tabañ
        this.paises =siHacesBien;
      },
      (peroSiTenemosErro)=>{
        console.log(peroSiTenemosErro);
        console.warn("TODO MAL");
      }
    );
   }
   eliminarCursosCapacitaciones(external_cu:string,nombreTitulo:string,nombreArchivoPDF:string,index:number){
    console.log(nombreArchivoPDF);
    console.log(external_cu);
    // ocupo el servicio

     Swal({
       title: 'Are you sure?',
       text: "Esta seguro que desea borrar el Titulo "+nombreTitulo,
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result.value) {
         this.instanciaCursosCapacitaciones=new CursosCapacitacionesModel();
         this.instanciaCursosCapacitaciones.estado=0;
         this.instanciaCursosCapacitaciones.evidencia_url=nombreArchivoPDF;
         this.instanciaCursosCapacitaciones.external_cu=external_cu;
         this.servicioCursosCapacitacione.eliminarCursoCapacitacion(this.instanciaCursosCapacitaciones).subscribe(
           siHaceBien=>{
             console.log("tpdp bnien");
             console.log(index);
             //elimino visualmente 
             this.cursosCapacitaciones.splice(index,1); //desde la posición 2, eliminamos 1 elemento
             Swal('Eliminado', 'El registro ha sido eliminada con Exito', 'success');
             console.log(siHaceBien);
           },(peroSiTenemosErro)=>{
             console.warn("TODO MAL");
             console.log(peroSiTenemosErro);
             Swal('Ups, No se puede realizar el registro'+peroSiTenemosErro['mensaje'], 'info')
           }
         );
       }
     })
    //alert("estoy eliminado");

  }

}
