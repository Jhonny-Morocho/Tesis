import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-oferta-laboral',
  templateUrl: './oferta-laboral.component.html'
})
export class OfertaLaboralComponent implements OnInit {
  //visualizar informacion de empleador
  instanciaEmpleadorModelVer:EmpleadorModel;
  intanciaOfertaLaboral:OfertaLaboralModel;
  //array de data ofertas labarales
  ofertasLaborales:OfertaLaboralModel[]=[];

  instanciaOfertaVer:OfertaLaboralModel;
    //data table
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  constructor(private servicioOferta:OfertasLaboralesService,
              private servicioEmpleador:SerivicioEmpleadorService,
              private ruta_:Router) { }

  ngOnInit() {
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.cargarTabla();

  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioOferta.listarOfertasLaboralesExternal_us().subscribe(
      siHacesBien=>{
        console.warn("TODO BIEN");
        this.ofertasLaborales =siHacesBien;
        console.log(this.ofertasLaborales);
        //data table
        //cargamos los items o los requisitos

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 2
        };
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        console.warn("TODO MAL");
      }
    );
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

  verOfertaModal(id:Number){
    console.log("click");
    //necesito converitr o typescrip me da error
    var index=parseInt((id).toString(), 10);  
    this.instanciaOfertaVer.puesto=this.ofertasLaborales[index]['puesto'];
    this.instanciaOfertaVer.requisitos=this.ofertasLaborales[index]['requisitos'];
    this.instanciaOfertaVer.descripcion=this.ofertasLaborales[index]['descripcion'];
    //consultamos los datos del empleador para presentarlos o imprimirlos
    this.servicioEmpleador.listarFormEmpleador().subscribe(
      siHaceBien=>{
          console.log(siHaceBien);
          this.instanciaEmpleadorModelVer.ciudad=siHaceBien['mensaje']['nom_representante_legal'];
          this.instanciaEmpleadorModelVer.direccion=siHaceBien['mensaje']['direccion'];
          this.instanciaEmpleadorModelVer.provincia=siHaceBien['mensaje']['provincia'];
          this.instanciaEmpleadorModelVer.actividad_ruc=siHaceBien['mensaje']['actividad_ruc'];
          this.instanciaEmpleadorModelVer.tiposEmpresa=siHaceBien['mensaje']['tiposEmpresa'];
          this.instanciaEmpleadorModelVer.razon_empresa=siHaceBien['mensaje']['razon_empresa'];
          
      },error=>{

        console.log(error);
      });
    
    $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
    console.log(this.instanciaOfertaVer.requisitos);
    $('#exampleModal').modal('show');
 
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
}
