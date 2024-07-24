import { Combo } from "./Combo";

export interface PoblacionDto {
  id: number,
  primerApellido: string,
  primer_Apellido: string,
  segundoApellido: string,
  nombres: string,
  tipoIdentificacion: Combo,
  identificacion: string,
  edad: number,
  sexo: string,
  fecha_Nacimiento: Date,
  lugarNacimiento: Combo,
  procedencia: Combo,
  tipoPlan: Combo,
  asegurador: Combo,
  grupoSanguineo: string,
  gradoInstruccion: Combo,
  estadoCivil: Combo,
  ocupacion: Combo,
  domicilio: string,
  telefono: string,
  correo: string,
  eps: {
    nombre: string,
  },
  poliza: Combo,
  estado: string,

}

export interface PoblacionFilter {
  tipoDocumentoId: number,
  numeroDocumento: string,
  // fechaInicio: Date,
  // fechaFinal: Date,
  // aseguradorId: number
  // tipoPlanId: number
}
