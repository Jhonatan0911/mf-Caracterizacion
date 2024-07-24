import { Component } from '@angular/core';
import { CohorteService } from '../../services/cohorte.service';

@Component({
  selector: 'app-cohorte',
  templateUrl: './cohorte.component.html',
  styleUrls: ['./cohorte.component.css']
})
export class CohorteComponent {

  constructor(
    public _cohorteService: CohorteService
  ){}
}
