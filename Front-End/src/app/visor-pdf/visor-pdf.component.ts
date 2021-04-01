import { Component, OnInit,Input } from '@angular/core';
@Component({
  selector: 'app-visor-pdf',
  templateUrl: 'visor-pdf.component.html'
})
export class VisorPdfComponent {
  //la propiedad ruta archivo pdf puede venir de afuera
  @Input() pdfSrc:any="";
 // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";


}
