import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
    booleanGestor:boolean=false;
    instanciaOfertaLaboralActualizar:OfertaLaboralModel;
    intanciaOfertaLaboral:OfertaLaboralModel;
    //array de data ofertas labarales
    ofertasLaborales:OfertaLaboralModel[]=[];
    cabezeratableTH:any=[];
    itemTabla:any=[];
    column:any;
    value:any;
    rows=[];
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
      this.configurarParametrosDataTable();
      this.cargarTabla();
      // playground requires you to assign document definition to a variable called dd
    }
    funcionPreparData(data:[]){
      this.rows=[];
      this.rows.push(['#', 'Creado', 'Modificado', 'Oferta Laboral', 'Correo', 'Estado']);
    }
    generatePdf(){
      //cabezera de la tabla
      this.rows.push(['#', 'Creado', 'Modificado', 'Oferta Laboral', 'Correo', 'Estado']);
      console.log(this.rows);
      let n =  new Date();
      //Año
      let y = n.getFullYear();
      //Mes
      let m = n.getMonth() + 1;
      //Día
      let d = n.getDate();
      

      console.log(this.cabezeratableTH);
      //return;
 
      let layaut=
      {
        defaultBorder: false,
        hLineWidth: function(i, node) {
          return 1;
        },
        vLineWidth: function(i, node) {
          return 1;
        },
        hLineColor: function(i, node) {
          if (i === 1 || i === 0) {
            return '#bfdde8';
          }
          return '#eaeaea';
        },
        vLineColor: function(i, node) {
          return '#eaeaea';
        },
        hLineStyle: function(i, node) {
          // if (i === 0 || i === node.table.body.length) {
          return null;
          //}
        },
        // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
        paddingLeft: function(i, node) {
          return 2;
        },
        paddingRight: function(i, node) {
          return 2;
        },
        paddingTop: function(i, node) {
          return 2;
        },
        paddingBottom: function(i, node) {
          return 2;
        },
        fillColor: function(rowIndex, node, columnIndex) {
          return '#fff';
        }
      };
      let cabezeraaTabla=
      [ 
            {
              text: '#',
              fillColor: '#eaf2f5',
              border: [false, true, false, true],
              margin: [0, 2, 0, 2],
              textTransform: 'uppercase',
            },
            
            {
              text: 'Creado',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 2, 0, 2],
              textTransform: 'uppercase',
            },
              
            {
              text: 'Modificado',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 2, 0, 2],
              textTransform: 'uppercase',
            }, 
            
            {
              text: 'Correo',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 2, 0, 2],
              textTransform: 'uppercase',
            },
            {
              text: 'Correo',
              border: [false, true, false, true],
              alignment: 'right',
              fillColor: '#eaf2f5',
              margin: [0, 2, 0, 2],
              textTransform: 'uppercase',
            }
          
      ];
                    
      let itemTablax=[[ 'Fi', 'Se', 'Third', 'The last one','x','6' ],[ 'Fi2', 'Se3', 'Third3', 'The3 last one','x3','63' ]];

      var documentDefinition = {
      content: [
            {
              columns: [
                // // {
                // //   image:'src/assets/images/maxresdefault.jpg',
                // //   width: 150,
                // // },
                [
                  {
                    text: 'UNL-CIS',
                    color: '#333333',
                    width: '*',
                    fontSize: 28,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 15],
                  },
                  {
                    stack: [
                  
                      {
                        columns: [
                          {
                            text: 'Bolsa de Empleo CIS',
                            color: '#333333',
                            bold: true,
                            width: '*',
                            fontSize: 12,
                            alignment: 'right',
                          },
                          {
                            text: d + "/" + m + "/" + y,
                            bold: true,
                            color: '#333333',
                            fontSize: 12,
                            alignment: 'right',
                            width: 100,
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },

            '\n\n',
            {
              width: '100%',
              alignment: 'center',
              text: 'Reporte No. 123',
              bold: true,
              margin: [0, 10, 0, 10],
              fontSize: 15,
            },
            '\n',
          {
      
            table: {
              widths: ['*', 100, 200, '*', '*', '*'],
              body: this.rows
            }


          },
            
      '\n',
      '\n\n',
      {
        layout: layaut,
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            [
              {
                text: 'Payment Subtotal',
                border: [false, true, false, true],
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
              {
                border: [false, true, false, true],
                text: '$999.99',
                alignment: 'right',
                fillColor: '#f5f5f5',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: 'Payment Processing Fee',
                border: [false, false, false, true],
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
              {
                text: '$999.99',
                border: [false, false, false, true],
                fillColor: '#f5f5f5',
                alignment: 'right',
                margin: [0, 5, 0, 5],
              },
            ],
            [
              {
                text: 'Total Amount',
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
              },
              {
                text: 'USD $999.99',
                bold: true,
                fontSize: 20,
                alignment: 'right',
                border: [false, false, false, true],
                fillColor: '#f5f5f5',
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
      },
      '\n\n',
      ],
          
          styles: {
            notesTitle: {
              fontSize: 10,
              bold: true,
              margin: [0, 50, 0, 3],
            },
            notesText: {
              fontSize: 10,
            },
          },
          defaultStyle: {
            columnGap: 20,
            //font: 'Quicksand',
          },
      };
       
      pdfMake.createPdf(documentDefinition).open();
    }
   cargarTabla(){
    //listamos los titulos academicos
    this.servicioOferta.listarTodasLasOfertas().subscribe(
      siHacesBien=>{
        console.log("TODO BIEN");
        this.ofertasLaborales =siHacesBien;
        console.log(this.ofertasLaborales);
        let contador=1;
        this.ofertasLaborales.forEach(element => {
          console.log(element);
          this.ofertasLaborales.forEach(element => {
            console.log(element);
              this.rows.push([contador, element['created_at'], element['updated_at'], element['puesto'], element['correo'], element['estado']]);
              contador++;
          });
        });
        this.dtTrigger.next();
        //this.itemTabla.push(['1', '20201-sa', '2020','correo@aa','activo']);

      },
      (peroSiTenemosErro)=>{
        console.warn(peroSiTenemosErro);
      }
    );
    console.log(this.itemTabla);
   }
   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
      try {
        //this.dtTrigger.unsubscribe();
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
      this.instanciaOfertaVer.razon_empresa=this.ofertasLaborales[index]['razon_empresa'];
      this.instanciaOfertaVer.obervaciones=this.ofertasLaborales[index]['obervaciones'];
      this.instanciaOfertaVer.correo=this.ofertasLaborales[index]['correo'];
      console.log( this.instanciaOfertaVer.descripcion);
      //obtengo todos los usuarios 
      this.servicioEmpleador.listarEmpleadores().subscribe(
        siHaceBien=>{
            console.log(siHaceBien);

            siHaceBien.forEach(element => {
              //comparo el fk_empleador con el id de usuario
              if(element['id']== this.instanciaOfertaVer.fk_empleador){
                console.log(element);
                this.instanciaEmpleadorModelVer.nom_representante_legal=element['nom_representante_legal'];
                this.instanciaEmpleadorModelVer.direccion=element['direccion'];
                this.instanciaEmpleadorModelVer.fk_provincia=element['fk_provincia'];
                this.instanciaEmpleadorModelVer.fk_ciudad=element['fk_ciudad'];
                this.instanciaEmpleadorModelVer.actividad_ruc=element['actividad_ruc'];
                this.instanciaEmpleadorModelVer.tipo_empresa=element['tiposEmpresa'];
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
    //si el tipo de usuario es un gestor entonces el puede solo ver los validados
  
    configurarParametrosDataTable(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        responsive: true,
          /* below is the relevant part, e.g. translated to spanish */ 
        language: {
          processing: "Procesando...",
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
          info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
          infoEmpty: "Mostrando ningún elemento.",
          infoFiltered: "(filtrado _MAX_ elementos total)",
          infoPostFix: "",
          loadingRecords: "Cargando registros...",
          zeroRecords: "No se encontraron registros",
          emptyTable: "No hay datos disponibles en la tabla",
          paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Último"
          },
          aria: {
            sortAscending: ": Activar para ordenar la tabla en orden ascendente",
            sortDescending: ": Activar para ordenar la tabla en orden descendente"
          }
        }
      };

    }
}
