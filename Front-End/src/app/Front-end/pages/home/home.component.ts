import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  dominio=environment.dominio
  constructor() { }

  ngOnInit() {

  }

}
