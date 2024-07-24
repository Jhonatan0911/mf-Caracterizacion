import { Injectable } from '@angular/core';
import { PoblacionDto, PoblacionFilter } from '../models/Poblacion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIs } from 'src/app/core/constant/api';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  datosPaciente: PoblacionDto =  {
    id: 1,
    primerApellido: 'Piña',
    segundoApellido: 'Lozano',
    nombres: 'Jhonatan Steven',
    tipoIdentificacion: {
      descripcion: 'CC',
      id: 0
    },
    identificacion: '1234567890',
    edad: 19,
    sexo: 'M',
    fecha_Nacimiento: new Date('2004-11-09'),
    lugarNacimiento: {
      descripcion: '',
      id: 0
    },
    procedencia: {
      descripcion: '',
      id: 0
    },
    grupoSanguineo: 'A+',
    gradoInstruccion: {
      descripcion: '',
      id: 0
    },
    estadoCivil: {
      descripcion: '',
      id: 0
    },
    ocupacion: {
      descripcion: '',
      id: 0
    },
    domicilio: 'Calle 123',
    telefono: '',
    correo: '',
    eps: {
      nombre: 'COMFANFDI'
    },
    poliza: {
      descripcion: '',
      id: 0
    },
    tipoPlan: {
      descripcion: '',
      id: 0
    },
    asegurador: {
      descripcion: '',
      id: 0
    },
    estado: '',
    primer_Apellido: ''
  }

  form_buscar = new FormGroup({
    tipo_documento: new FormControl<number>(0, [Validators.required]),
    numero_documento: new FormControl<string>('', [Validators.required])
  })

  constructor(
    private _apiService: ApiService
  ) { }

  public getPoblacionByFilter(poblacionFilter: PoblacionFilter){

    const params = new HttpParams()
    .set("tipoIdentificacionId", poblacionFilter.tipoDocumentoId != null ? poblacionFilter.tipoDocumentoId : "")
    .set("identificacion", poblacionFilter.numeroDocumento != null ? poblacionFilter.numeroDocumento : "");

    return this._apiService.get<PoblacionDto[]>(APIs.poblacion.getPoblacionByFilter, false, params);
  }
}
