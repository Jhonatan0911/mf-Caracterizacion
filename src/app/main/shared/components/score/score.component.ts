import { Component, Input } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { PoblacionDto } from '../../models/Poblacion';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  loading: boolean = false;

  formBarthel: any;

  puntajeframigham:number = 0;

  puntosFramingham: any;

  constructor(
    public _scoreService: ScoreService,
    public _pacienteService: PacienteService
  ){}

  ngOnInit(){
    this._scoreService.form_framinghan.controls['edad'].setValue(this._pacienteService.datosPaciente.edad);

    this._scoreService.form_framinghan.controls['edad'].disable();
    this._scoreService.form_framinghan.controls['rcv'].disable();
    this._scoreService.form_framinghan.controls['nivelRiesgo'].disable();

    
    this.getFragmingamPuntaje();

    this.getFormBarthel();
  }

  getFragmingamPuntaje(){
    this.loading = true;
    this._scoreService.getPuntajeFramingham().subscribe({
      next: (res) => {
        if(res){
          this.puntosFramingham = res;
        }
      },
      complete: ()=>{
        this.loading = false;
      }
    })
  }

  calculoFramingham(){
    this.puntajeframigham = 0;

    this.framinghamByEdad();
    this.framinghamByTotal();
    this.framinghamByHDL();
    this.framinghamByFumador();
    this.framinghamByPresion();

    console.log(this.puntajeframigham);

    this.getPuntajeFramingham();
  }


  framinghamByEdad(){
    var listadoEdad = this.puntosFramingham.filter((p:any) => p.tipo == "EDAD");
    listadoEdad.forEach((item:any) => {
      if (item.sexo === this._pacienteService.datosPaciente.sexo && this._pacienteService.datosPaciente.edad >= item.edadInicio && this._pacienteService.datosPaciente.edad <= item.edadFin) {
        this.puntajeframigham = this.puntajeframigham + item.puntos;
        console.log('Edad: ', item.puntos)
      }
    });
  }

  framinghamByTotal(){
    const colesterolTotal =this._scoreService.form_framinghan.controls['colesterolTotal'].value;

    var listadoTotal = this.puntosFramingham.filter((p:any) => p.tipo == "TOTAL");
    listadoTotal.forEach((item:any) => {
      if (item.sexo === this._pacienteService.datosPaciente.sexo &&
        this._pacienteService.datosPaciente.edad >= item.edadInicio &&
        this._pacienteService.datosPaciente.edad <= item.edadFin &&
        Number(colesterolTotal) >= Number(item.valorInicio) && Number(colesterolTotal) <= Number(item.valorFin)) {
        this.puntajeframigham = this.puntajeframigham + item.puntos;
        console.log('ColesterolTotal: ', item.puntos)

      }
    });
  }

  framinghamByHDL(){
    const colesterolHDL = this._scoreService.form_framinghan.controls['colesterolHDL'].value;

    var listadoHDL = this.puntosFramingham.filter((p:any) => p.tipo == "HDL");
    listadoHDL.forEach((item: any) => {
      if (Number(colesterolHDL) >= Number(item.valorInicio) && Number(colesterolHDL) <= Number(item.valorFin)) {
        this.puntajeframigham = this.puntajeframigham + item.puntos;
      console.log('HDL: ', item.puntos)
      }

    });
  }

  framinghamByFumador(){
    const swFumador = this._scoreService.form_framinghan.controls['swFumador'].value;

    var listadoFumador = this.puntosFramingham.filter((p:any) => p.tipo == "FUMADOR");
    listadoFumador.forEach((item: any) => {
      var esfumado = item.esFumador ? 'Si' : 'No';
      var fuma = swFumador == false ? 'No' : 'Si';
      if (item.sexo === this._pacienteService.datosPaciente.sexo && this._pacienteService.datosPaciente.edad >= item.edadInicio && this._pacienteService.datosPaciente.edad <= item.edadFin && fuma == esfumado) {
        this.puntajeframigham = this.puntajeframigham + item.puntos;
        console.log('Fumador: ', item.puntos)
      }
    });
  }

  framinghamByPresion(){
    const presionArterialSistolica = this._scoreService.form_framinghan.controls['presionSistolica'].value!;
    const swTratamiento = this._scoreService.form_framinghan.controls['swTratamiento'].value;

    var listadopresion = this.puntosFramingham.filter((p:any) => p.tipo == "PRESION");
    listadopresion.forEach((item:any) => {
      var presion = presionArterialSistolica;

      if (item.sexo === this._pacienteService.datosPaciente.sexo && presion >= Number(item.valorInicio) && presion <= Number(item.valorFin) && item.conTratamiento == swTratamiento) {
        this.puntajeframigham = this.puntajeframigham + item.puntos;
        console.log('tratamiento y presion: ', item.puntos)

      }
    });
  }

  getPuntajeFramingham(){
    this._scoreService.puntajeTotalRiesgo.forEach(item => {
      var total = 0
      if (item.puntaje == this.puntajeframigham) {
        total = item.riesgo * 0.75;
        if (item.operador == '=') {
          this._scoreService.form_framinghan.controls['rcv'].setValue(String(total));
        } else {
          this._scoreService.form_framinghan.controls['rcv'].setValue(item.operador + '' + String(total));
        }
        this.obtenerelporcentajeFramingham(total);
      } else if (item.operador == '<') {
        if (this.puntajeframigham < item.puntaje) {
          total = item.riesgo * 0.75;
          this._scoreService.form_framinghan.controls['rcv'].setValue(item.operador + '' + String(total));
          this.obtenerelporcentajeFramingham(total);
        }
      } else if (item.operador == '>') {
        if (this.puntajeframigham > item.puntaje) {
          total = item.riesgo * 0.75;
          this._scoreService.form_framinghan.controls['rcv'].setValue(item.operador + '' + String(total));
          this.obtenerelporcentajeFramingham(total);
        }
      }
    })
  }

  obtenerelporcentajeFramingham(total:any) {
    if (total < 5) {
      this._scoreService.form_framinghan.controls['nivelRiesgo'].setValue('BAJO');
    } else if (total >= 5 && total <= 9) {
      this._scoreService.form_framinghan.controls['nivelRiesgo'].setValue('MODERADO');
    } else if (total >= 10) {
      this._scoreService.form_framinghan.controls['nivelRiesgo'].setValue('ALTO');
    }
  }

  getFormBarthel() {
    this.loading = true;
    this._scoreService.getFormBarthel(8).subscribe({
      next: (req: any) => {
        this.formBarthel = req;
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  checkoptions(padre:any, hijo:any) {
    this._scoreService.totalpuntajeBarthel = 0;
    var i =  this._scoreService.datosMarcardosBarhel.filter(x => x.id == padre.id);
    if (i.length != 0) {
      var dato = i[0];
      dato.respuesta = hijo.id;
      dato.pregunta = padre.descripcion;
      dato.respuestaDescripcion = hijo.descripcion;
      dato.puntaje = hijo.puntaje;
      dato.referencia = hijo.referencia;
    } else {
      this._scoreService.datosMarcardosBarhel.push({ 'id': padre.id, 'pregunta': padre.descripcion, 'respuesta': hijo.id, 'referencia': hijo.referencia, 'respuestaDescripcion': hijo.descripcion, 'puntaje': hijo.puntaje });
    }


    this._scoreService.datosMarcardosBarhel.forEach(element => {
      this._scoreService.totalpuntajeBarthel = this._scoreService.totalpuntajeBarthel + element.puntaje;
    });

    if (this._scoreService.totalpuntajeBarthel < 20) {
      this._scoreService.interpretacionBarthel = "Grado de dependencia total";
    }

    if (this._scoreService.totalpuntajeBarthel >= 20 && this._scoreService.totalpuntajeBarthel < 35) {
      this._scoreService.interpretacionBarthel = "Grado de dependencia Grave";
    }

    if (this._scoreService.totalpuntajeBarthel >= 40 && this._scoreService.totalpuntajeBarthel < 55) {
      this._scoreService.interpretacionBarthel = "Grado de dependencia Moderado";
    }

    if (this._scoreService.totalpuntajeBarthel >= 60 && this._scoreService.totalpuntajeBarthel < 90) {
      this._scoreService.interpretacionBarthel = "Grado de dependencia Leve";
    }

    if (this._scoreService.totalpuntajeBarthel >= 90) {
      this._scoreService.interpretacionBarthel = "Independiente";
    }

  }

}
