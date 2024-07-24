import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PrimengModule } from './core/modules/primeng.module';
import { AppMfModule } from './mf/main/app-mf.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCaracterizacionComponent } from './main/shared/components/modals/modal-caracterizacion/modal-caracterizacion.component';
import { AnamnesisComponent } from './main/shared/components/anamnesis/anamnesis.component';
import { ScoreComponent } from './main/shared/components/score/score.component';
import { LaboratorioComponent } from './main/shared/components/laboratorio/laboratorio.component';
import { CohorteComponent } from './main/shared/components/cohorte/cohorte.component';
import { ComplicacionesComponent } from './main/shared/components/complicaciones/complicaciones.component';
import { ModalAddPacienteComponent } from './main/shared/components/modals/modal-add-paciente/modal-add-paciente.component';
import { DiagnosticoFinalComponent } from './main/shared/components/diagnostico-final/diagnostico-final.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ModalCaracterizacionComponent,
    AnamnesisComponent,
    ScoreComponent,
    LaboratorioComponent,
    CohorteComponent,
    ComplicacionesComponent,
    ModalAddPacienteComponent,
    DiagnosticoFinalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AppMfModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
