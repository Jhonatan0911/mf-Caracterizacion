import { Diagnostico } from "./Anamnesis";

export interface DiagnosticoFinal {
  diagnosticosFinales: Diagnostico[] | null;
  prioridadIngresoPrograma: string | null;
}
