import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {CursosCapacitacionesModel} from 'src/app/models/cursos-capacitaciones.models';
import {CursosCapacitacionesService} from 'src/app/servicios/cursos-capacitaciones.service';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
//contantes del servidor
import {environment} from 'src/environments/environment';
declare var JQuery:any;
declare var $:any;
declare var bootstrap:any;
@Component({
  selector: 'app-template-hoja-vida',
  templateUrl: './template-hoja-vida.component.html'
})
export class TemplateHojaVidaComponent implements OnInit {
  dominio:any=environment.dominio;

  arrayPostulante:PostulanteModel[]=[];
  instanciaVerPostulante:PostulanteModel;
  arrayCursosCapacitaciones:CursosCapacitacionesModel[]=[];
  
  //data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService,
              private servicioCursosCapacitaciones:CursosCapacitacionesService) { }

  ngOnInit() {
    this.instanciaVerPostulante=new PostulanteModel();
    this.cargarTabla();

    //activar tabs
    $(function() {
      var triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab a'));
      console.log(triggerTabList);
      triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)
        triggerEl.addEventListener('click', function (event) {
          event.preventDefault()
          tabTrigger.show()
        })
      })
    });

  }
  cursosCapacitaciones(exteneral_us:string){
    this.servicioCursosCapacitaciones.listarCursosCapacitacionesExternal_usConParametro(exteneral_us).subscribe(
      siHaceBien=>{
        this.arrayCursosCapacitaciones=siHaceBien;
        console.log(this.arrayCursosCapacitaciones);
      },error=>{
        console.log(error);
      }
    );
  }
  generoHombre(tipoGenero:number){
    if(tipoGenero==1){
      return false;
    }
    if(tipoGenero==0){
      return true;
    }
  }
  esCurso(tipoCursoCapacitacion:number){
    if(tipoCursoCapacitacion==1){
      return true;
    }
    if(tipoCursoCapacitacion==2){
      return false;
    }
  }
  cargarTabla(){

    console.log("cargue tabla");
    //el extenrla oferta viene x la url
    this.servicioOfertaEstudiante.listTodasEstudiantePostulanOfertaExternal_of("Cud6b18d6f-4dff-4963-94b0-fba4fc06dd1e").subscribe(
      siHaceBien=>{
      console.log(siHaceBien);
      this.arrayPostulante=siHaceBien;
        //data table
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },error=>{
        console.log(error);
      }
    );
  }
  verHojaVidaModal(id:Number){
    console.log("click");
    var index=parseInt((id).toString(), 10); 
    $('#exampleModal').modal('show');
    //============= mostamos la informacion personal ========================
    this.instanciaVerPostulante.nombre=this.arrayPostulante[index]['nombre'];
    this.instanciaVerPostulante.apellido=this.arrayPostulante[index]['apellido'];
    this.instanciaVerPostulante.genero=this.arrayPostulante[index]['genero'];
    this.instanciaVerPostulante.telefono=this.arrayPostulante[index]['telefono'];
    this.instanciaVerPostulante.fecha_nacimiento=this.arrayPostulante[index]['fecha_nacimiento'];
    this.instanciaVerPostulante.direccion_domicilio=this.arrayPostulante[index]['direccion_domicilio'];
    this.instanciaVerPostulante.correo=this.arrayPostulante[index]['correo'];
    console.log(this.instanciaVerPostulante);
    //============= mostras los curso y capacitaciones ===============
    console.log(this.arrayPostulante[index]['external_us']);
    this.cursosCapacitaciones(this.arrayPostulante[index]['external_us']);

 
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
  ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
    try {
      this.dtTrigger.unsubscribe();
    } catch (error) {
      //le puse x q no uso suscripcion/mas info:/https://l-lin.github.io/angular-datatables/#/basic/angular-way
      console.warn(error);
    }
  }

}
