import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Score } from '../models/Score';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api.service';
import { APIs } from 'src/app/core/constant/api';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  puntajeTotalRiesgo = [
    { puntaje: 0, operador: '<', riesgo: 0, real: 1 },
    { puntaje: 0, operador: '=', riesgo: 1, real: 1 },
    { puntaje: 1, operador: '=', riesgo: 1, real: 1 },
    { puntaje: 2, operador: '=', riesgo: 1, real: 1 },
    { puntaje: 3, operador: '=', riesgo: 1, real: 1 },
    { puntaje: 4, operador: '=', riesgo: 1, real: 1 },
    { puntaje: 5, operador: '=', riesgo: 2, real: 2 },
    { puntaje: 6, operador: '=', riesgo: 2, real: 2 },
    { puntaje: 7, operador: '=', riesgo: 3, real: 3 },
    { puntaje: 8, operador: '=', riesgo: 4, real: 4 },
    { puntaje: 9, operador: '=', riesgo: 5, real: 5 },
    { puntaje: 10, operador: '=', riesgo: 6, real: 6 },
    { puntaje: 11, operador: '=', riesgo: 8, real: 8 },
    { puntaje: 12, operador: '=', riesgo: 10, real: 10 },
    { puntaje: 13, operador: '=', riesgo: 12, real: 12 },
    { puntaje: 14, operador: '=', riesgo: 16, real: 16 },
    { puntaje: 15, operador: '=', riesgo: 20, real: 20 },
    { puntaje: 16, operador: '=', riesgo: 25, real: 25 },
    { puntaje: 17, operador: '>', riesgo: 31, real: 30 },
  ]

  form_framinghan = new FormGroup({
    edad: new FormControl<number | null>(null, [Validators.required]),
    colesterolTotal: new FormControl<number | null>(null, [Validators.required]),
    colesterolHDL: new FormControl<number | null>(null, [Validators.required]),
    presionSistolica: new FormControl<number | null>(null, [Validators.required]),
    swFumador: new FormControl<boolean>(false, [Validators.required]),
    swTratamiento: new FormControl<boolean>(false, [Validators.required]),
    rcv: new FormControl<string>('', [Validators.required]),
    nivelRiesgo: new FormControl<string>('', [Validators.required])
  })

  interpretacionBarthel: string = "";
  totalpuntajeBarthel: number = 0;
  datosMarcardosBarhel: Array<any> = []

  cargarDatosFormulario(): Score {
    this.form_framinghan.controls['edad'].enable();
    this.form_framinghan.controls['rcv'].enable();
    this.form_framinghan.controls['nivelRiesgo'].enable();
    var score: Score = {
      framinghan: {
        edad: this.form_framinghan.value.edad!,
        colesterolTotal: this.form_framinghan.value.colesterolTotal!,
        colesterolHDL: this.form_framinghan.value.colesterolHDL!,
        presionSistolica: this.form_framinghan.value.presionSistolica!,
        swFumador: this.form_framinghan.value.swFumador!,
        swTratamiento: this.form_framinghan.value.swTratamiento!,
        rcv: this.form_framinghan.value.rcv!,
        nivelRiesgo: this.form_framinghan.value.nivelRiesgo!
      },
      barthel: {
        indice: this.datosMarcardosBarhel,
        puntajeTotal: this.totalpuntajeBarthel,
        interpretacion: this.interpretacionBarthel
      }

    }
    this.form_framinghan.controls['edad'].disable();
    this.form_framinghan.controls['rcv'].disable();
    this.form_framinghan.controls['nivelRiesgo'].disable();

    if(score.barthel?.puntajeTotal == 0){
      score.barthel =  null;
    }

    if(!score.framinghan?.rcv){
      score.framinghan =  null;
    }


    return score;
  }

  constructor(
    private _apiService: ApiService,
  ) { }

  public getPuntajeFramingham(){
    return this._apiService.get<any>(APIs.score.getPuntajeFramingham, false);
  }

  public getFormBarthel(categoriaId: number){

    const params = new HttpParams()
    .set("categoriaId", categoriaId != null ? categoriaId : "");

    return this._apiService.get<any>(APIs.forms.getFormBarthel, false, params);
  }
}
