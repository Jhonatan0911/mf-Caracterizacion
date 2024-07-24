import { Component } from '@angular/core';
import { DiagnosticoFinalService } from '../../services/diagnostico-final.service';
import { Combo } from '../../models/Combo';
import { ParametrizacionService } from '../../services/parametrizacion.service';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Diagnostico } from '../../models/Anamnesis';

@Component({
  selector: 'app-diagnostico-final',
  templateUrl: './diagnostico-final.component.html',
  styleUrls: ['./diagnostico-final.component.css']
})
export class DiagnosticoFinalComponent {

  loading: boolean = false;

  comboDiagnosticos: Combo[] = [];
  comboPrioridad: String[] = [
    'Alta',
    'Regular',
  ]

  constructor(
    public _diagnosticoService: DiagnosticoFinalService,
    private _parametrizacionService: ParametrizacionService,
    private messageService: MessageService
  ){}

  filterDiagnostico(event: any): void {
    let query = event.query;
    if (query.length >= 3) {
      this.getDiagnostico(query);
    }
  }

  getDiagnostico(termino: string) {
    this.loading = true;
    this._parametrizacionService.getParDiagnosticosByTermino(termino).subscribe({
      next: (req: any) => {
        this.comboDiagnosticos = req;
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  addDiagnostico(){
    let dxValue: Diagnostico = this._diagnosticoService.form.value.diagnostico;
    console.log(dxValue);
    if(dxValue && typeof dxValue != 'string'){
      let dx: Diagnostico = {
        codigo: dxValue.codigo,
        descripcion: dxValue.descripcion,
        id: dxValue.id
      }
      this._diagnosticoService.dianosticosSelected.push(dx);
      this._diagnosticoService.form.controls['diagnostico'].reset();
    }else{
      this.messageService.add({ severity: 'warning', summary: 'Alerta!', detail: 'Seleccione primero un diagnostico' });
    }
  }

  deleteDxSelected(dx: Diagnostico){
    const index = this._diagnosticoService.dianosticosSelected.indexOf(dx);
    if (index > -1) {
      this._diagnosticoService.dianosticosSelected.splice(index, 1);
    }
  }

}
