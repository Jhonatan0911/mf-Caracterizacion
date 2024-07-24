import { Anamnesis } from "./Anamnesis";
import { Cohorte } from "./Cohorte";
import { Combo } from "./Combo";
import { Complicaciones } from "./Complicaciones";
import { DiagnosticoFinal } from "./DiagnosticoFinal";
import { Laboratorios } from "./Laboratorios";
import { PoblacionDto } from "./Poblacion";
import { Score } from "./Score";

export interface Caracterizacion{
  anamnesis: Anamnesis;
  score: Score;
  laboratorios: Laboratorios;
  cohorte: Cohorte;
  complicaciones: Complicaciones;
  diagnosticoFinal: DiagnosticoFinal;
  pacienteId: number;
  usuarioId: number;
  listadoGestionId: number;
}

export interface CaracterizacionFilter {
  tipoDocumentoId: string | null,
  numeroDocumento: string | null,
  fechaInicio: Date,
  fechaFinal: Date,
}


export interface listadoGestion{
  id: number,
  paciente_Id: number,
  usuarioCreacion_Id: number,
  estado: string,
  fechaCreacion: string,
  swTriaje: boolean,
  nombreCompleto: string,
  identificacion: string,
  edad: string,
  sexo: string,
  tipoPlan: string,
  asegurador: string,
  direccion: string
}

export interface listadoGestionRequest {
  pacienteId: number,
  usuarioId: number,
  swTriaje: boolean,
  antecedentes: Combo[];
}
