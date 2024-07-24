import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public datosUsuario: UsuarioLogin = new UsuarioLogin;

  constructor() { }
}
