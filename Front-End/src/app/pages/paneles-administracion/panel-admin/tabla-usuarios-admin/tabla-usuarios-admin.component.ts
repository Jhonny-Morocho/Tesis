import { Component, OnInit } from '@angular/core';
import {SerivicioDocente} from 'src/app/servicios/docente.service';
import {DocenteModel} from 'src/app/models/docente.models';
import { Subject } from 'rxjs';
import { dataTable } from 'src/app/templateDataTable/configDataTable';
@Component({
  selector: 'app-tabla-usuarios-admin',
  templateUrl: './tabla-usuarios-admin.component.html'
})
export class TablaUsuariosAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  arrayDocentes:DocenteModel[]=[];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private SerivicioDocente:SerivicioDocente) { }

  ngOnInit() {
    this.configurarParametrosDataTable();
    this.cargarTabla();
  }
  configurarParametrosDataTable(){
    this.dtOptions = dataTable;
  }
  cargarTabla(){
    //listar todos los usuarioas admistradores
    this.SerivicioDocente.listarDocentes().subscribe(
      siHacesBien=>{
        console.log(siHacesBien);
        this.arrayDocentes=siHacesBien;
        this.dtTrigger.next();
      },siHacesMal=>{
        console.log(siHacesMal);
      }
    );

  //   this.servicioOferta.listarOfertasValidadasEncargado().subscribe(
  //     siHacesBien=>{
  //       console.warn("TODO BIEN");
  //       this.ofertasLaborales =siHacesBien;
  //       console.log(this.ofertasLaborales);
  //       this.dtTrigger.next();
  //     },
  //     (peroSiTenemosErro)=>{
  //       console.warn("TODO MAL");
  //     }
  //   );
  //  }
  }
}
