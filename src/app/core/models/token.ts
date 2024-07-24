export class UsuarioLogin {
  id: number = 0;
  inicio_Sesion: string = "";
  documento: string= "";
  nombres: string= "";
  apellidos: string= "";
  telefono: string= "";
  perfil: string= "";
  correo_Electronico: string= "";
  es_Eliminado: boolean= false;
  perfiles: Array<any> = [];
}
