import { environment } from 'src/environments/environment';

export class APIs {

  static combo = {
    //Globales
    getParTipoDocumento: `${environment.apiParametrizacion}/api/ParTipoDocumento`,
    getParDiagnosticos: `${environment.apiParametrizacion}/api/ParDiagnosticos/GetParDiagnosticoPorTermino`,
    getParEps: `${environment.apiParametrizacion}/api/ParEps`,
    getParGeneros: `${environment.apiParametrizacion}/api/ParGeneros`,
    getParOrientacionSexual: `${environment.apiParametrizacion}/api/ParOrientacionSexual`,
    getParEstadoCiviles: `${environment.apiParametrizacion}/api/ParEstadoCiviles`,
    getParEscolaridades: `${environment.apiParametrizacion}/api/ParEscolaridades`,
    getParOcupaciones: `${environment.apiParametrizacion}/api/ParOcupaciones`,
    getParReligiones: `${environment.apiParametrizacion}/api/ParReligiones`,
    getParEtnias: `${environment.apiParametrizacion}/api/ParEtnias`,
    getParDiscapacidades: `${environment.apiParametrizacion}/api/ParDiscapacidades`,
    getParDepartamentos: `${environment.apiParametrizacion}/api/ParDepartamentos`,
    getParEstratos: `${environment.apiParametrizacion}/api/ParEstratos`,
    getParProgramas: `${environment.apiParametrizacion}/api/ParProgramas`,
    getParRegimen: `${environment.apiParametrizacion}/api/ParRegimen`,
    getParContratos: `${environment.apiParametrizacion}/api/ParContratos`,
    getParParentesco: `${environment.apiParametrizacion}/api/ParParentesco`,
    getAntecedentes: `${environment.apiUrl}/Parametricacion/GetProgramas`,
  };


  static poblacion = {
    //Globales
    getPoblacionByFilter: `${environment.apiPaciente}/api/v1/Paciente/`
  };

  static caracterizacion = {
    //Globales
    postCaracterizacion: `${environment.apiUrl}/api/Caracterizacion`,
    getListadoGestionByFilter: `${environment.apiUrl}/ListadoGestion/GetListadoGestionByFilter`,
    addPacienteListadoGestion: `${environment.apiUrl}/ListadoGestion`,
  };

  static score = {
    getPuntajeFramingham: `${environment.apiHcHealth}/api/Historicos/ObtenerDatosPuntajeFramingham`,
  };

  static forms = {
    getFormBarthel: `${environment.apiHcHealth}/api/Graficas/IndiceBarthel`,
  };
}
