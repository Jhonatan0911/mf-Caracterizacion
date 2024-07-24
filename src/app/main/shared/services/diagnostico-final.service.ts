import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiagnosticoFinal } from '../models/DiagnosticoFinal';
import { Diagnostico } from '../models/Anamnesis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoFinalService {


  form = new FormGroup({
    diagnostico: new FormControl<any>(null),
    prioridadIngresoPrograma: new FormControl<string | null>(null),
  })

  dianosticosSelected: Diagnostico[] = [];

  constructor() { }

  cargarDatosFormulario(): DiagnosticoFinal {
    var diagnosticoFinal: DiagnosticoFinal = {
      diagnosticosFinales: this.dianosticosSelected.length == 0 ?  null  : this.dianosticosSelected,
      prioridadIngresoPrograma: this.form.value.prioridadIngresoPrograma ?? null
    }

    return diagnosticoFinal;
  }
}
