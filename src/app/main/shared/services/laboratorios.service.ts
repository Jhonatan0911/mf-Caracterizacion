import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Laboratorios } from '../models/Laboratorios';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {

  form = new FormGroup({

    swLaboratoriosRecientes: new FormControl<boolean>(false),

    swPresionArterial: new FormControl<boolean>(false),
    presionArterial: new FormControl<string | null>({value:null, disabled:true}),
    swGlucosa: new FormControl<boolean>(false),
    glucosa: new FormControl<string | null>({value:null, disabled:true}),
    swColesterol: new FormControl<boolean>(false),
    colesterol: new FormControl<string | null>({value: null, disabled:true}),
    swTrigliceridos: new FormControl<boolean>(false),
    trigliceridos: new FormControl<string | null>({value:null, disabled:true}),
    swHemoglobina: new FormControl<boolean>(false),
    hemoglobina: new FormControl<string | null>({value:null, disabled:true}),
    swGlicasilada: new FormControl<boolean>(false),
    glicasilada: new FormControl<string | null>({value:null, disabled:true}),
  })

  constructor() { }

  cargarDatosFormulario(): Laboratorios {

    var laboratorios: Laboratorios = {
      swPresionArterial: this.form.value.swPresionArterial!,
      presionArterial: this.form.value.presionArterial ?? null,
      swGlucosa: this.form.value.swGlucosa!,
      glucosa: this.form.value.glucosa ?? null,
      swColesterol: this.form.value.swColesterol!,
      colesterol: this.form.value.colesterol ?? null,
      swTrigliceridos: this.form.value.swTrigliceridos!,
      trigliceridos: this.form.value.trigliceridos ?? null,
      swHemoglobina: this.form.value.swHemoglobina!,
      hemoglobina: this.form.value.hemoglobina ?? null,
      swGlicasilada: this.form.value.swGlicasilada!,
      glicasilada: this.form.value.glicasilada ?? null
    }

    return laboratorios;
  }

  public validarCheck(sw: boolean, formGroup: FormGroup, descripcionControlName: string) {
    if (sw) {
      formGroup.controls[descripcionControlName].enable();
      formGroup.controls[descripcionControlName].setValue('');
      formGroup.controls[descripcionControlName].reset('');
      formGroup.controls[descripcionControlName].setValidators([Validators.required]);
      formGroup.controls[descripcionControlName].markAsDirty();
      formGroup.controls[descripcionControlName].updateValueAndValidity();
    }else{
      formGroup.controls[descripcionControlName].setValue(null);
      formGroup.controls[descripcionControlName].disable();
      formGroup.controls[descripcionControlName].clearValidators();
    }
  }

  public resetLabs(sw: boolean) {
    if (!sw) {
      this.form.reset({
        swLaboratoriosRecientes: sw,
        swPresionArterial: false,
        presionArterial: '',
        swGlucosa: false,
        glucosa: '',
        swColesterol: false,
        colesterol: '',
        swTrigliceridos: false,
        trigliceridos: '',
        swHemoglobina: false,
        hemoglobina: '',
        swGlicasilada: false,
        glicasilada: ''
      });

      // Deshabilitar controles explícitamente
      this.form.controls['presionArterial'].disable();
      this.form.controls['glucosa'].disable();
      this.form.controls['colesterol'].disable();
      this.form.controls['trigliceridos'].disable();
      this.form.controls['hemoglobina'].disable();
      this.form.controls['glicasilada'].disable();

    }
  }
}
