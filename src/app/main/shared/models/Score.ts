export interface Framinghan{
  edad: number;
  colesterolTotal: number;
  colesterolHDL: number;
  presionSistolica: number;
  swFumador: boolean;
  swTratamiento: boolean;
  rcv: string;
  nivelRiesgo: string;
}

export interface IndiceBarthel {
  indice: Array<respuestaBarthel>;
  puntajeTotal: number;
  interpretacion: string;
}

export interface respuestaBarthel {
  _id: number;
  pregunta: string;
  respuesta: number;
  respuestaDescripcion: string;
  referencia: string;
  puntaje: number;
}


export interface Score{
  framinghan: Framinghan | null;
  barthel: IndiceBarthel | null;
}
