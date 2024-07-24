import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Anamnesis } from '../models/Anamnesis';

@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {

  form = new FormGroup({
    anamesis: new FormControl<string>("", [Validators.required]),
    swRecetaMedica: new FormControl<boolean>(false),
    recetaMedica: new FormControl<string | null>({value:null, disabled:true}),
    peso: new FormControl<string>(""),
    talla: new FormControl<string>(""),
    imc: new FormControl<string>(""),
    diagnostico: new FormControl<string>(""),
  })

  constructor() { }

  cargarDatosFormulario(): Anamnesis {
    this.form.controls['imc'].enable();
    let anamesis: any = this.form.value.anamesis;
    let swRecetaMedica: any = this.form.value.swRecetaMedica;
    let recetaMedica: any = this.form.value.recetaMedica;
    let peso: any = this.form.value.peso;
    let talla: any = this.form.value.talla;
    let imc: any = this.form.value.imc;
    let diagnostico: any = this.form.value.diagnostico;

    var anamnesis: Anamnesis = {
      anamesis: anamesis,
      swRecetaMedica: swRecetaMedica,
      recetaMedica: recetaMedica ?? null,
      peso: peso,
      talla: talla,
      imc: imc,
      diagnostico: diagnostico
    }

    this.form.controls['imc'].disable();

    return anamnesis;
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
}
