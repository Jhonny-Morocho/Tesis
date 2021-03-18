import { Component, OnInit } from '@angular/core';
import {OfertaLaboralEstudianteModel} from 'src/app/models/oferLaboral-Estudiante.models';
import {PostulanteModel} from 'src/app/models/postulante.models';
import {OfertaLaboralEstudianteService} from 'src/app/servicios/ofertLaboral-Estudiante.service';
declare var JQuery:any;
declare var $:any;
declare var bootstrap:any;
@Component({
  selector: 'app-template-hoja-vida',
  templateUrl: './template-hoja-vida.component.html'
})
export class TemplateHojaVidaComponent implements OnInit {
  
  arrayPostulante:PostulanteModel[]=[];
  instanciaVerPostulante:PostulanteModel;

  constructor(private servicioOfertaEstudiante:OfertaLaboralEstudianteService) { }

  ngOnInit() {
    this.cargarTabla();
    this.instanciaVerPostulante=new PostulanteModel();
    //funcion para que funciones los tabs

  }
  cargarTabla(){

    console.log("cargue tabla");
    this.servicioOfertaEstudiante.listTodasEstudiantePostulanOfertaExternal_of("Cud6b18d6f-4dff-4963-94b0-fba4fc06dd1e").subscribe(
      siHaceBien=>{
      console.log(siHaceBien);
      this.arrayPostulante=siHaceBien;
      },error=>{
        console.log(error);
      }
    );
  }
  verOfertaModal(id:Number){
    console.log("click");
    var index=parseInt((id).toString(), 10); 
    $('#exampleModal').modal('show');
    this.instanciaVerPostulante.nombre=this.arrayPostulante[index]['nombre'];
    this.instanciaVerPostulante.apellido=this.arrayPostulante[index]['apellido'];
    this.instanciaVerPostulante.genero=this.arrayPostulante[index]['genero'];
    this.instanciaVerPostulante.telefono=this.arrayPostulante[index]['telefono'];
    this.instanciaVerPostulante.fecha_nacimiento=this.arrayPostulante[index]['fecha_nacimiento'];
    this.instanciaVerPostulante.direccion_domicilio=this.arrayPostulante[index]['direccion_domicilio'];
    this.instanciaVerPostulante.correo=this.arrayPostulante[index]['correo'];
    console.log(this.instanciaVerPostulante);
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
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }

}
