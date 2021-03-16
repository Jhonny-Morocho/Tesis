import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { Subject } from 'rxjs';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-tabla-validar-ofertas-laborales',
  templateUrl: './tabla-validar-ofertas-laborales.component.html'
})
export class TablaValidarOfertasLaboralesComponent implements OnInit {
    //visualizar informacion de empleador
    instanciaEmpleadorModelVer:EmpleadorModel;
    instanciaOfertaLaboralActualizar:OfertaLaboralModel;
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
    this.instanciaOfertaLaboralActualizar=new OfertaLaboralModel();
    this.cargarTabla();
  }
  cargarTabla(){
    //listamos los titulos academicos
    this.servicioOferta.listarTodasLasOfertas().subscribe(
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
      this.instanciaOfertaVer.fk_empleador=this.ofertasLaborales[index]['fk_empleador'];
      console.log( this.instanciaOfertaVer.descripcion);
      //obtengo todos los usuarios 
      this.servicioEmpleador.listarEmpleadores().subscribe(
        siHaceBien=>{
            console.log(siHaceBien);
            // if(this.instanciaOfertaVer.descripcion==){

            // }
       
           //filtrar si el id del usuario coincide con el de fk_empleador

            //siHaceBien.forEach(element => element['id']);

            siHaceBien.forEach(element => {
              //comparo el fk_empleador con el id de usuario
              if(element['id']== this.instanciaOfertaVer.fk_empleador){
                console.log(element);
                this.instanciaEmpleadorModelVer.ciudad=element['nom_representante_legal'];
                this.instanciaEmpleadorModelVer.direccion=element['direccion'];
                this.instanciaEmpleadorModelVer.provincia=element['provincia'];
                this.instanciaEmpleadorModelVer.actividad_ruc=element['actividad_ruc'];
                this.instanciaEmpleadorModelVer.tiposEmpresa=element['tiposEmpresa'];
                this.instanciaEmpleadorModelVer.razon_empresa=element['razon_empresa'];
              }
    
            });

            console.log(this.instanciaEmpleadorModelVer);


            
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
    //conversion de estado
    estadoConversion(numeroEstado:Number):boolean{
      if(numeroEstado==1){
          return false;
      }
      if(numeroEstado==2){
        return true;
      }
    }
    //si esta revisado debe hacer algo o existr texto en el campo de obersiaciones
    estadoRevision(observacion:String):boolean{
      //si ha escrito algo la secretaria signifca que si reviso
      if(observacion.length>0){
        return true;
      }else{
        return false;
      }
    }
  }
