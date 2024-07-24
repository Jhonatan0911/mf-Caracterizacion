import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from 'src/app/core/constant/api';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrizacionService {

  constructor(
    private _apiService: ApiService,
  ) { }

  public getParEps(){
    return this._apiService.get<any>(APIs.combo.getParEps, false);
  }

  public getParTipoDocumento(){
    return this._apiService.get<any>(APIs.combo.getParTipoDocumento, false);
  }

  public getParAntecedente(){
    return this._apiService.get<any>(APIs.combo.getAntecedentes, false);
  }

  public getParDiagnosticosByTermino(termino: string){

    const params = new HttpParams()
    .set("termino", termino != null ? termino : "");

    return this._apiService.get<any>(APIs.combo.getParDiagnosticos, false, params);
  }
}
