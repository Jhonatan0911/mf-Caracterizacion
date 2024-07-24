import { Component } from '@angular/core';
import { ComplicacionesService } from '../../services/complicaciones.service';

@Component({
  selector: 'app-complicaciones',
  templateUrl: './complicaciones.component.html',
  styleUrls: ['./complicaciones.component.css']
})
export class ComplicacionesComponent {

  constructor(
    public _complicacionesService: ComplicacionesService
  ){}
}
