import { Component } from '@angular/core';
import { MainService } from './shared/services/main.service';
import { Combo } from './shared/models/Combo';
import { PoblacionDto, PoblacionFilter } from './shared/models/Poblacion';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ParametrizacionService } from './shared/services/parametrizacion.service';
import { ModalCaracterizacionComponent } from './shared/components/modals/modal-caracterizacion/modal-caracterizacion.component';
import { ModalAddPacienteComponent } from './shared/components/modals/modal-add-paciente/modal-add-paciente.component';
import { CaracterizacionFilter, listadoGestion } from './shared/models/Caracterizacion';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  loading: boolean = false;
  loadingSearch: boolean = false;

  comboTipoDocumento: Combo[] = [];

  listadoGestion: listadoGestion[] = [];

  ref: DynamicDialogRef | undefined;

  poblacion!: PoblacionDto;

  constructor(
    public _mainService: MainService,
    private dialogService: DialogService,
    private _parametrizacionService: ParametrizacionService,
    private messageService: MessageService
  ){
    this.getParTipoDocumento();
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


  buscarListadoGestion(){
    if(this._mainService.form_buscar.valid){
      this.loadingSearch = true;

      let filter: CaracterizacionFilter = {
        tipoDocumentoId: this._mainService.form_buscar.value.tipo_documento!,
        numeroDocumento: this._mainService.form_buscar.value.numero_documento == '' ? null : this._mainService.form_buscar.value.numero_documento!,
        fechaInicio: this._mainService.form_buscar.value.rango_fecha![0]!,
        fechaFinal: this._mainService.form_buscar.value.rango_fecha![1]!,
      }

      this._mainService.getListadoGestionByFilter(filter).subscribe({
        next: (res) => {
          if(res.length >= 1){
            this.listadoGestion = res;
          }else{
            this.messageService.add({ severity: 'warn', summary: 'Alerta', detail: 'No se han encontrado registros en la lista de gestión', icon: 'ri-close-circle-line text-2xl' });
            this.listadoGestion = [];
          }
        },
        error: (err) => {
          this.loadingSearch = false
        },
        complete: () => {
          this.loadingSearch = false
        }
      })
    }
  }

  openModalCaracterizacion(product: listadoGestion){
    const isMobileOrTablet = window.innerWidth <= 768;

    let width;
    if (isMobileOrTablet) {
      width = '100%';
    } else {
      width = '60%';
    }

    this.ref = this.dialogService.open(ModalCaracterizacionComponent, {
      header: 'Realizar Caracterizacion',
      width: width,
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      data: product
    });

    this.ref.onClose.subscribe((response: any) => {
      if (response) {
        this.buscarListadoGestion();
      }
      this._mainService.resetForm();

    });
  }

  openModalAddPaciente(){
    const isMobileOrTablet = window.innerWidth <= 768;

    let width;
    if (isMobileOrTablet) {
      width = '100%';
    } else {
      width = '60%';
    }

    this.ref = this.dialogService.open(ModalAddPacienteComponent, {
      header: 'Añadir paciente a caracterizar',
      width: width,
      contentStyle: { overflow: 'auto' },
      maximizable: true,
    });

    this.ref.onClose.subscribe((response: any) => {
      if (response) {
        this.buscarListadoGestion();
      }
    });
  }



}
