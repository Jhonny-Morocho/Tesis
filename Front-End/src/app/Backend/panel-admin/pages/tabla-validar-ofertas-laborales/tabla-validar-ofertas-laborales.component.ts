import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren  } from '@angular/core';
import { Router } from '@angular/router';
import {OfertasLaboralesService} from 'src/app/servicios/oferta-laboral.service';
import {OfertaLaboralModel} from 'src/app/models/oferta-laboral.models';
import {EmpleadorModel} from 'src/app/models/empleador.models';
import {SerivicioEmpleadorService} from 'src/app/servicios/servicio-empleador.service';
import { Subject } from 'rxjs';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import {OfertasFiltroModel} from 'src/app/models/filtro-ofertas.models';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
import Swal from 'sweetalert2';
import { ValidadoresService } from 'src/app/servicios/validadores.service';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'app-tabla-validar-ofertas-laborales',
  templateUrl: './tabla-validar-ofertas-laborales.component.html'
})
export class TablaValidarOfertasLaboralesComponent implements OnDestroy,OnInit  {
   //@ViewChild(DataTableDirective, {static: false})
   @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    formfiltrarOfertas:FormGroup;
    //visualizar informacion de empleador
    instanciaEmpleadorModelVer:EmpleadorModel;
    booleanGestor:boolean=false;
    instanciaOfertaLaboralActualizar:OfertaLaboralModel;
    intanciaOfertaLaboral:OfertaLaboralModel;
    //array de data ofertas labarales
    ofertasLaborales:OfertaLaboralModel[]=[];
    cabezeratableTH:any=[];
    itemTabla:any=[];
    column:any;
    value:any;

    instanciaOfertaVer:OfertaLaboralModel;
    instanciaFiltro:OfertasFiltroModel;
    //data table
    //filtros personalizados con codigo
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    datatableElement!: DataTableDirective;
    //Probando nuevos codigo para renicnair dat table

    constructor(private servicioOferta:OfertasLaboralesService,
                private datePipe: DatePipe,
                private servicioEmpleador:SerivicioEmpleadorService,
                private validadorPersonalizado:ValidadoresService,
                private formBuilder:FormBuilder,
                private ruta_:Router) {
     this.crearFormulario();
    }


  ngOnInit() {
    this.instanciaOfertaVer=new OfertaLaboralModel();
    this.intanciaOfertaLaboral=new OfertaLaboralModel();
    this.instanciaEmpleadorModelVer=new EmpleadorModel();
    this.instanciaOfertaLaboralActualizar=new OfertaLaboralModel();
    this.instanciaFiltro=new OfertasFiltroModel();
    this.configurarParametrosDataTable();
    this.cargarTodasOfertas();
    //responsibo
    $("body").removeClass("sidebar-open");
  }
  crearFormulario(){
    this.formfiltrarOfertas=this.formBuilder.group({
      de:['',[Validators.required]],
      hasta:['',[Validators.required]],
      estado:['',[Validators.required]]
    },{
      validators: this.validadorPersonalizado.validarFechasInicioFinalizacion('de','hasta')
    });
  }
  get estadoNoValido(){
    return this.formfiltrarOfertas.get('estado').invalid && this.formfiltrarOfertas.get('estado').touched ;
  }
  get fechaDeNoValido(){
    return this.formfiltrarOfertas.get('de').invalid && this.formfiltrarOfertas.get('de').touched ;
  }
  get fechaHastaNoValido(){
    return this.formfiltrarOfertas.get('hasta').invalid && this.formfiltrarOfertas.get('de').touched  ;
  }
  // la fecha de finalizacion debe ser mayo a la fecha de inicio
  get fechaFinalMayorInicialNoValido(){
    const dateInicio=this.formfiltrarOfertas.get('de');
    const dateFinalalizacion=this.formfiltrarOfertas.get('hasta');
    return (dateFinalalizacion>dateInicio)?true:false;
  }
  get fechaHastaVacia(){
    return this.formfiltrarOfertas.get('hasta').value==''?true:false;
  }


  filtrarOfertas(){
    if(this.formfiltrarOfertas.invalid){
      return Object.values(this.formfiltrarOfertas.controls).forEach(contol=>{
        contol.markAsTouched();
      });
    }
    this.instanciaFiltro.de=this.formfiltrarOfertas.value.de;
    this.instanciaFiltro.hasta=this.formfiltrarOfertas.value.hasta;
    this.instanciaFiltro.estado=this.formfiltrarOfertas.value.estado;

    this.filtrarDatosFecha(this.instanciaFiltro.de,
    this.instanciaFiltro.hasta,this.instanciaFiltro.estado);
  }
  cargarTodasOfertas(){
    //listamos todas las ofertas
    this.servicioOferta.listarTodasLasOfertas().subscribe(
      siHacesBien=>{
        this.ofertasLaborales =siHacesBien;
          //reportes
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        Swal('Ups',peroSiTenemosErro['mensaje'], 'info');
      }
    );
  }

  verOfertaModal(id:Number){
    //necesito converitr o typescrip me da error
    var index=parseInt((id).toString(), 10);
    this.instanciaOfertaVer.puesto=this.ofertasLaborales[index]['puesto'];
    this.instanciaOfertaVer.requisitos=this.ofertasLaborales[index]['requisitos'];
    this.instanciaOfertaVer.descripcion=this.ofertasLaborales[index]['descripcion'];
    this.instanciaOfertaVer.fk_empleador=this.ofertasLaborales[index]['fk_empleador'];
    this.instanciaOfertaVer.razon_empresa=this.ofertasLaborales[index]['razon_empresa'];
    this.instanciaOfertaVer.obervaciones=this.ofertasLaborales[index]['obervaciones'];
    this.instanciaOfertaVer.correo=this.ofertasLaborales[index]['correo'];

    //obtengo todos los usuarios
    this.servicioEmpleador.listarEmpleadores().subscribe(
      siHaceBien=>{
          siHaceBien.forEach(element => {
            //comparo el fk_empleador con el id de usuario
            if(element['id']== this.instanciaOfertaVer.fk_empleador){
              this.instanciaEmpleadorModelVer.nom_representante_legal=element['nom_representante_legal'];
              this.instanciaEmpleadorModelVer.direccion=element['direccion'];
              this.instanciaEmpleadorModelVer.fk_provincia=element['fk_provincia'];
              this.instanciaEmpleadorModelVer.fk_ciudad=element['fk_ciudad'];
              this.instanciaEmpleadorModelVer.actividad_ruc=element['actividad_ruc'];
              this.instanciaEmpleadorModelVer.tipo_empresa=element['tiposEmpresa'];
              this.instanciaEmpleadorModelVer.razon_empresa=element['razon_empresa'];
            }
          });
      },error=>{
        Swal('Error',error['mensaje'], 'error');
      });

    $("#itemRequisitos").html(  this.instanciaOfertaVer.requisitos);
    $('#exampleModal').modal('show');
  }

  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
  //codigo para recargar en la misma pagina
  reiniciarValoresTablaOfertas(){
    this.ruta_.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ruta_.onSameUrlNavigation = 'reload';
    this.ruta_.navigate(['/panel-admin/validar-oferta-laboral']);
  }

  filtrarDatosFecha(fechade:String,fechaHasta:String,estado:Number){
    this.servicioOferta.listarTodasLasOfertas().subscribe(
      siHacesBien=>{
        //creamos una arreglo auxiliar
        let aux=[];
        //recorreo todo el array y compara los datos
        siHacesBien.forEach(element => {
            if(fechade<=this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
              fechaHasta>= this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
              estado==(element['estado']) && estado!=9 && (element['obervaciones']).length>0){
              aux.push(element);
            }
            //los que no estan validado no validado
            if(fechade<=this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
            fechaHasta>= this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
             estado==9 && (element['obervaciones']).length==0){
            aux.push(element);
            }
            //ver todos
            if(fechade<=this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
                fechaHasta>= this.datePipe.transform(element['updated_at'],"yyyy-MM-dd") &&
                 estado==0 ){
            aux.push(element);
            }
        });
        this.ofertasLaborales=aux;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
        });
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      },
      (peroSiTenemosErro)=>{
        Swal('Ups',peroSiTenemosErro['mensaje'], 'info');
      }
    );
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
    //si el tipo de usuario es un gestor entonces el puede solo ver los validados

  configurarParametrosDataTable(){
    this.dtOptions = dataTable;

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}


