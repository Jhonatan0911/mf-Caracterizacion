import { Component } from '@angular/core';
import { LaboratoriosService } from '../../services/laboratorios.service';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent {

  constructor(
    public _laboratorioService:LaboratoriosService
  ){}
}
