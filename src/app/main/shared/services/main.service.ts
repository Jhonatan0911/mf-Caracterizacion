import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIs } from 'src/app/core/constant/api';
import { ApiService } from 'src/app/core/services/api.service';
import { PoblacionDto, PoblacionFilter } from '../models/Poblacion';
import { Caracterizacion, CaracterizacionFilter, listadoGestion, listadoGestionRequest } from '../models/Caracterizacion';
import { AnamnesisService } from '../services/anamnesis.service';
import { CohorteService } from '../services/cohorte.service';
import { ComplicacionesService } from '../services/complicaciones.service';
import { LaboratoriosService } from '../services/laboratorios.service';
import { ScoreService } from '../services/score.service';
import { DiagnosticoFinalService } from './diagnostico-final.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  caracterizacion!: Caracterizacion;

  form_buscar = new FormGroup({
    tipo_documento: new FormControl<string | null>(null),
    numero_documento: new FormControl<string | null>(null),
    rango_fecha: new FormControl<any>('',[Validators.required]),
    // asegurador: new FormControl<number>(0, [Validators.required]),
    // tipo_plan: new FormControl<number>(0),
  })

  constructor(
    private _apiService: ApiService,
    private _anamnesisService: AnamnesisService,
    private _cohortesService: CohorteService,
    private _complicacionesService: ComplicacionesService,
    private _laboratoriosService: LaboratoriosService,
    private _scoresService: ScoreService,
    private _diagnosticoService: DiagnosticoFinalService
  ) { }

  public getListadoGestionByFilter(caracterizacionFilter: CaracterizacionFilter){
    return this._apiService.post<CaracterizacionFilter, listadoGestion[]>(APIs.caracterizacion.getListadoGestionByFilter, caracterizacionFilter);
  }

  public guardar(){
    return this._apiService.post<Caracterizacion, boolean>(APIs.caracterizacion.postCaracterizacion, this.caracterizacion);
  }

  public addPacienteListadoGestion(data: listadoGestionRequest){
    return this._apiService.post<listadoGestionRequest, boolean>(APIs.caracterizacion.addPacienteListadoGestion, data);
  }

  resetForm(){
    this._anamnesisService.form.reset({
      anamesis: "",
      swRecetaMedica: false,
      recetaMedica: null,
      peso: "",
      talla: "",
      imc: "",
      diagnostico: "",
    });
    this._cohortesService.form.reset({
      swCuidate: false,
      cuidate: null,
      swRcv: false,
      rcv: null,
      swHipotiroidismo: false,
      hipotiroidismo: null,
      swArtritisReumatoide: false,
      artritisReumatoide: null,

      swOncologico: false,
      oncologico: null,
      swCuidadoColumna: false,
      cuidadoColumna: null,
      swSiempreFuertes: false,
      siempreFuertes: null,
      swSaludMental: false,
      saludMental: null,
    });
    this._complicacionesService.form.reset({
      swInfartoAgudoMiocardio: false,
      infartoAgudoMiocardio: null,
      swAccidenteCerebroVascular: false,
      accidenteCerebroVascular: null,
      swNefropatiaDiabetica: false,
      nefropatiaDiabetica: null,
      swRetinopatiaHipertensiva: false,
      retinopatiaHipertensiva: null,
      swEnfermedadRenalCronica: false,
      enfermedadRenalCronica: null,
      swNeuropatiaPeriferica: false,
      neuropatiaPeriferica: null,

      swInsuficienciaCardiaca: false,
      insuficienciaCardiaca: null,
      swAmputacion: false,
      amputacion: null,
      swHigadoGraso: false,
      higadoGraso: null,
      swCirrosis: false,
      cirrosis: null,
      swEpocEpid: false,
      epocEpid: null
    });
    this._laboratoriosService.form.reset({
      swLaboratoriosRecientes: false,
      swPresionArterial: false,
      presionArterial: null,
      swGlucosa: false,
      glucosa: null,
      swColesterol: false,
      colesterol: null,
      swTrigliceridos: false,
      trigliceridos: null,
      swHemoglobina: false,
      hemoglobina: null,
      swGlicasilada: false,
      glicasilada: null
    });
    this._scoresService.form_framinghan.reset({
      edad: null,
      colesterolTotal: null,
      colesterolHDL: null,
      presionSistolica: null,
      swFumador: false,
      swTratamiento: false,
      rcv: "",
      nivelRiesgo: ""
    });
    this._diagnosticoService.form.reset({
      diagnostico: null,
      prioridadIngresoPrograma: null
    });
    this._diagnosticoService.dianosticosSelected = [];
    this._scoresService.interpretacionBarthel = "";
    this._scoresService.totalpuntajeBarthel = 0;
    this._scoresService.datosMarcardosBarhel = []
  }
}
