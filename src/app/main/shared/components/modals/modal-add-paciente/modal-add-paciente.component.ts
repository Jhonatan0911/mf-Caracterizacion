import { Component } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Combo } from '../../../models/Combo';
import { ParametrizacionService } from '../../../services/parametrizacion.service';
import { PoblacionDto, PoblacionFilter } from '../../../models/Poblacion';
import { listadoGestionRequest } from '../../../models/Caracterizacion';
import { MainService } from '../../../services/main.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-add-paciente',
  templateUrl: './modal-add-paciente.component.html',
  styleUrls: ['./modal-add-paciente.component.css']
})
export class ModalAddPacienteComponent {
  loading: boolean = false;
  loadingSearch: boolean = false;

  showModalProgramas: boolean = false;

  comboTipoDocumento: Combo[] = [];
  searchedPoblacion: PoblacionDto[] = [];
  comboAntecedentes: Combo[] = [];

  selectedAntecedentes: Combo[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private _mainService: MainService,
    public _pacienteService: PacienteService,
    private _parametrizacionService: ParametrizacionService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
  ){
    this.getParTipoDocumento();
    this.getAntecedentes();
  }


  getAntecedentes(){
    this.loading = true;
    this._parametrizacionService.getParAntecedente().subscribe({
      next: (res) => {
        if(res){
          this.comboAntecedentes = res;
        }
      },
      error: (err) => {
        this.loading = false;
      },
      complete: ()=>{
        this.loading = false;
      }
    })
  }

  onAntecedentesChange(event: any) {
    const selectedOptions = event.value;
    const indexOfNone = selectedOptions.findIndex((option: any) => option.id === 9);

    if (indexOfNone !== -1 && selectedOptions.length > 1) {
      this.selectedAntecedentes[selectedOptions[indexOfNone]];
    } else if (indexOfNone === -1 && selectedOptions.length > 0) {
      this.selectedAntecedentes = selectedOptions.filter((option: any) => option.id !== 9);
    }
  }

  getParTipoDocumento(){
    this.loading = true;
    this._parametrizacionService.getParTipoDocumento().subscribe({
      next: (res) => {
        if(res){
          this.comboTipoDocumento = res;
        }
      },
      error: (err) => {
        this.loading = false;
      },
      complete: ()=>{
        this.loading = false;
      }
    })
  }

  buscarPaciente(){
    if(this._pacienteService.form_buscar.valid){
      this.loadingSearch = true;

      let filter: PoblacionFilter = {
        tipoDocumentoId: this._pacienteService.form_buscar.value.tipo_documento!,
        numeroDocumento: this._pacienteService.form_buscar.value.numero_documento!,
      }

      this._pacienteService.getPoblacionByFilter(filter).subscribe({
        next: (res) => {
          if(res.data.length >= 1){
            this.searchedPoblacion = res.data;
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha encontrado información del paciente', icon: 'ri-close-circle-line text-2xl' });
          }
        },
        error: (err) => {
          this.loadingSearch = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha encontrado información del paciente', icon: 'ri-close-circle-line text-2xl' });
        },
        complete: () => {
          this.loadingSearch = false
        }
      })
    }
  }

  addListaGestion(paciente: PoblacionDto){
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea añadir al paciente '+ paciente.nombres + " " + paciente.primerApellido + ' a la lista de gestión?',
      header: 'Confirmación',
      key: 'confirmAddRef',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Continuar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass:'btn-danger',
      accept: () => {
        this.confirmationService.confirm({
          message: '¿Paciente cuenta con algún antecedente?',
          header: 'Antecedentes',
          icon: 'pi pi-exclamation-triangle',
          key: 'antecedentesRef',
          acceptLabel: 'Sí',
          rejectLabel: 'No',
          rejectButtonStyleClass:'btn-danger',
          accept: () => {
            this.showModalProgramas = true;
          }
        });
      }
    });
  }

  addPaciente(){
    let req: listadoGestionRequest = {
      pacienteId: this.searchedPoblacion[0].id,
      usuarioId: 999,
      swTriaje: false,
      antecedentes: this.selectedAntecedentes
    }

    this._mainService.addPacienteListadoGestion(req).subscribe({
      next: (res) => {
        console.log(res)
        if(res){
          this.messageService.add({ severity: 'success', summary: 'Cargado!', detail: 'Paciente agregado correctamente' });
          this.ref.close(res);
        }
      },
      error: (err) => {
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }

}
