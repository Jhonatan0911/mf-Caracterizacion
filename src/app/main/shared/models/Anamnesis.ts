export interface Diagnostico {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface Anamnesis {
  anamesis: string;
  swRecetaMedica: boolean;
  recetaMedica: string | null;
  peso: number;
  talla: number;
  imc: string;
  diagnostico: Diagnostico;
}
