import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'app-brand-logo-panel',
  templateUrl: './brand-logo-panel.component.html'
})
export class BrandLogoPanelComponent implements OnInit {
  dominio=environment.dominio
  constructor() { }

  ngOnInit() {
  }

}
