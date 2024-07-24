import { Component } from '@angular/core';
import { AnamnesisService } from '../../services/anamnesis.service';
import { ParametrizacionService } from '../../services/parametrizacion.service';
import { Combo } from '../../models/Combo';

@Component({
  selector: 'app-anamnesis',
  templateUrl: './anamnesis.component.html',
  styleUrls: ['./anamnesis.component.css']
})
export class AnamnesisComponent {

  loading: boolean = false;

  comboDiagnosticos: Combo[] = [];

  constructor(
    public _anmnesisService: AnamnesisService,
    private _parametrizacionService: ParametrizacionService
  ){}

  ngOnInit(){
    // Suscribirse a los cambios en la talla y el peso para calcular el IMC automáticamente
    this._anmnesisService.form.controls['talla'].valueChanges.subscribe(() => {
      this.calcularIMC();
    });
    this._anmnesisService.form.controls['peso'].valueChanges.subscribe(() => {
      this.calcularIMC();
    });
    this._anmnesisService.form.controls['imc'].disable();
  }

  filterDiagnostico(event: any): void {
    let query = event.query;
    if (query.length >= 3) {
      this.getDiagnostico(query);
    }
  }

  getDiagnostico(termino: string) {
    this.loading = true;
    this._parametrizacionService.getParDiagnosticosByTermino(termino).subscribe({
      next: (req: any) => {
        this.comboDiagnosticos = req;
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  calcularIMC() {
    const talla: any = this._anmnesisService.form.controls['talla'].value;
    const peso: any =  this._anmnesisService.form.controls['peso'].value;
    if (talla && peso) {
      const imc = peso / ((talla / 100) ** 2);
    this._anmnesisService.form.controls['imc'].enable();
      this._anmnesisService.form.controls['imc'].setValue(imc.toFixed(2));
      this._anmnesisService.form.controls['imc'].disable();
    } else {
    this._anmnesisService.form.controls['imc'].enable();
      this._anmnesisService.form.controls['imc'].setValue('');
      this._anmnesisService.form.controls['imc'].disable();
    }
  }

}
