import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Anamnesis } from '../../../models/Anamnesis';
import { AnamnesisService } from '../../../services/anamnesis.service';
import { CohorteService } from '../../../services/cohorte.service';
import { ComplicacionesService } from '../../../services/complicaciones.service';
import { LaboratoriosService } from '../../../services/laboratorios.service';
import { ScoreService } from '../../../services/score.service';
import { Cohorte } from '../../../models/Cohorte';
import { Score } from '../../../models/Score';
import { Laboratorios } from '../../../models/Laboratorios';
import { Complicaciones } from '../../../models/Complicaciones';
import { MainService } from '../../../services/main.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { PacienteService } from '../../../services/paciente.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DiagnosticoFinal } from '../../../models/DiagnosticoFinal';
import { DiagnosticoFinalService } from '../../../services/diagnostico-final.service';
import { listadoGestion } from '../../../models/Caracterizacion';

@Component({
  selector: 'app-modal-caracterizacion',
  templateUrl: './modal-caracterizacion.component.html',
  styleUrls: ['./modal-caracterizacion.component.css']
})
export class ModalCaracterizacionComponent {

  loading: boolean = false;
  loadingSave: boolean  = false;

  errores: Array<{ [key: string]: string[] }> | undefined = [];

  selectedListadoGestion: listadoGestion;


  constructor(
    private confirmationService: ConfirmationService,
    private _anamnesisService: AnamnesisService,
    private _cohortesService: CohorteService,
    private _complicacionesService: ComplicacionesService,
    private _laboratoriosService: LaboratoriosService,
    private _diagnosticoFinalService: DiagnosticoFinalService,
    private _scoresService: ScoreService,
    private _mainService: MainService,
    private _securityService: SecurityService,
    private _pacienteService: PacienteService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ){
    this.selectedListadoGestion = this.config.data;
  }

  submit(){
    this.validarFormularios();
    if (this.errores!.length == 0 ) {
      this.confirmationService.confirm({
        message: '¿Esta seguro que desea guardar la caracterizacion?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Continuar',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass:'btn-danger',
        accept: () => {
          this.cargarFormularios();
        }
      });
    }
  }

  validarFormularios(){

  }

  cargarFormularios(){
    var dataAnamnesis: Anamnesis = this._anamnesisService.cargarDatosFormulario();
    var dataScore: Score = this._scoresService.cargarDatosFormulario();
    var dataLaboratorios: Laboratorios = this._laboratoriosService.cargarDatosFormulario();
    var dataCohorte: Cohorte= this._cohortesService.cargarDatosFormulario();
    var dataComplicaciones: Complicaciones = this._complicacionesService.cargarDatosFormulario();
    var diagnosticoFinal: DiagnosticoFinal = this._diagnosticoFinalService.cargarDatosFormulario();

    this._mainService.caracterizacion = {
      usuarioId: this._securityService.datosUsuario.id,
      pacienteId: this._pacienteService.datosPaciente.id,
      listadoGestionId: this.selectedListadoGestion.id,

      anamnesis: dataAnamnesis,
      score: dataScore,
      laboratorios: dataLaboratorios,
      cohorte: dataCohorte,
      complicaciones: dataComplicaciones,
      diagnosticoFinal: diagnosticoFinal
    }

    console.log(this._mainService.caracterizacion)

    this.guardar()
  }

  guardar(){
    this.loadingSave = true;
    this._mainService.guardar().subscribe({
      next: (req: any) => {
        if(req){
          this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Caracterización guardada correctamente' });
          this.ref.close(true);
        }
      },
      error: (err: any) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.title ?? 'No se ha podido crear la caracterización', icon: 'ri-close-circle-line text-2xl' });
        this.loadingSave = false;
      },
      complete: () => {
        this.loadingSave = false
      }
    })
  }
}
