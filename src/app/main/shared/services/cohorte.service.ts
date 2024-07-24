import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cohorte } from '../models/Cohorte';

@Injectable({
  providedIn: 'root'
})
export class CohorteService {

  form = new FormGroup({
    swCuidate: new FormControl<boolean>(false),
    cuidate: new FormControl<string | null>({value:null, disabled:true}),
    swRcv: new FormControl<boolean>(false),
    rcv: new FormControl<string | null>({value:null, disabled:true}),
    swHipotiroidismo: new FormControl<boolean>(false),
    hipotiroidismo: new FormControl<string | null>({value:null, disabled:true}),
    swArtritisReumatoide: new FormControl<boolean>(false),
    artritisReumatoide: new FormControl<string | null>({value:null, disabled:true}),

    swOncologico: new FormControl<boolean>(false),
    oncologico: new FormControl<string | null>({value:null, disabled:true}),
    swCuidadoColumna: new FormControl<boolean>(false),
    cuidadoColumna: new FormControl<string | null>({value:null, disabled:true}),
    swSiempreFuertes: new FormControl<boolean>(false),
    siempreFuertes: new FormControl<string | null>({value:null, disabled:true}),
    swSaludMental: new FormControl<boolean>(false),
    saludMental: new FormControl<string | null>({value:null, disabled:true})
  })

  constructor() { }

  cargarDatosFormulario(): Cohorte {

    var cohorte: Cohorte = {
      swCuidate: this.form.value.swCuidate!,
      cuidate: this.form.value.cuidate ?? null,
      swRcv: this.form.value.swRcv!,
      rcv: this.form.value.rcv ?? null,
      swHipotiroidismo: this.form.value.swHipotiroidismo!,
      hipotiroidismo: this.form.value.hipotiroidismo ?? null,
      swArtritisReumatoide: this.form.value.swArtritisReumatoide!,
      artritisReumatoide: this.form.value.artritisReumatoide ?? null,
      swOncologico: this.form.value.swOncologico!,
      oncologico: this.form.value.oncologico ?? null,
      swCuidadoColumna: this.form.value.swCuidadoColumna!,
      cuidadoColumna: this.form.value.cuidadoColumna ?? null,
      swSiempreFuertes: this.form.value.swSiempreFuertes!,
      siempreFuertes: this.form.value.siempreFuertes ?? null,
      swSaludMental: this.form.value.swSaludMental!,
      saludMental: this.form.value.saludMental ?? null
    }

    return cohorte;
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
