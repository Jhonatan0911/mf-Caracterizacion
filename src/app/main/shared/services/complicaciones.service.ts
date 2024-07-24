import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Complicaciones } from '../models/Complicaciones';

@Injectable({
  providedIn: 'root'
})
export class ComplicacionesService {

  form = new FormGroup({
    swInfartoAgudoMiocardio: new FormControl<boolean>(false),
    infartoAgudoMiocardio: new FormControl<string | null>({value:null, disabled:true}),
    swAccidenteCerebroVascular: new FormControl<boolean>(false),
    accidenteCerebroVascular: new FormControl<string | null>({value:null, disabled:true}),
    swNefropatiaDiabetica: new FormControl<boolean>(false),
    nefropatiaDiabetica: new FormControl<string | null>({value:null, disabled:true}),
    swRetinopatiaHipertensiva: new FormControl<boolean>(false),
    retinopatiaHipertensiva: new FormControl<string | null>({value:null, disabled:true}),
    swEnfermedadRenalCronica: new FormControl<boolean>(false),
    enfermedadRenalCronica: new FormControl<string | null>({value:null, disabled:true}),
    swNeuropatiaPeriferica: new FormControl<boolean>(false),
    neuropatiaPeriferica: new FormControl<string | null>({value:null, disabled:true}),

    swInsuficienciaCardiaca: new FormControl<boolean>(false),
    insuficienciaCardiaca: new FormControl<string | null>({value:null, disabled:true}),
    swAmputacion: new FormControl<boolean>(false),
    amputacion: new FormControl<string | null>({value:null, disabled:true}),
    swHigadoGraso: new FormControl<boolean>(false),
    higadoGraso: new FormControl<string | null>({value:null, disabled:true}),
    swCirrosis: new FormControl<boolean>(false),
    cirrosis: new FormControl<string | null>({value:null, disabled:true}),
    swEpocEpid: new FormControl<boolean>(false),
    epocEpid: new FormControl<string | null>({value:null, disabled:true})
  })

  constructor() { }

  cargarDatosFormulario(): Complicaciones {

    var complicaciones: Complicaciones = {
      swInfartoAgudoMiocardio: this.form.value.swInfartoAgudoMiocardio!,
      infartoAgudoMiocardio: this.form.value.infartoAgudoMiocardio ?? null,
      swAccidenteCerebroVascular: this.form.value.swAccidenteCerebroVascular!,
      accidenteCerebroVascular: this.form.value.accidenteCerebroVascular ?? null,
      swNefropatiaDiabetica: this.form.value.swNefropatiaDiabetica!,
      nefropatiaDiabetica: this.form.value.nefropatiaDiabetica ?? null,
      swRetinopatiaHipertensiva: this.form.value.swRetinopatiaHipertensiva!,
      retinopatiaHipertensiva: this.form.value.retinopatiaHipertensiva ?? null,
      swEnfermedadRenalCronica: this.form.value.swEnfermedadRenalCronica!,
      enfermedadRenalCronica: this.form.value.enfermedadRenalCronica ?? null,
      swNeuropatiaPeriferica: this.form.value.swNeuropatiaPeriferica!,
      neuropatiaPeriferica: this.form.value.neuropatiaPeriferica ?? null,
      swInsuficienciaCardiaca: this.form.value.swInsuficienciaCardiaca!,
      insuficienciaCardiaca: this.form.value.insuficienciaCardiaca ?? null,
      swAmputacion: this.form.value.swAmputacion!,
      amputacion: this.form.value.amputacion ?? null,
      swHigadoGraso: this.form.value.swHigadoGraso!,
      higadoGraso: this.form.value.higadoGraso ?? null,
      swCirrosis: this.form.value.swCirrosis!,
      cirrosis: this.form.value.cirrosis ?? null,
      swEpocEpid: this.form.value.swEpocEpid!,
      epocEpid: this.form.value.epocEpid ?? null
    }

    return complicaciones;
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
