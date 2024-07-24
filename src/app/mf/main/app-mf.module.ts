import { DialogService } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMfComponent } from './app-mf.component';
import { RouterModule } from '@angular/router';
import { routesAppmf } from './app-mf.routes';
import { PrimengModule } from '../../core/modules/primeng.module';
import { ToastService } from 'src/app/core/services/toast.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesAppmf),
    PrimengModule
  ],
  declarations: [AppMfComponent],
  providers: [DialogService, ToastService]
})
export class AppMfModule { }
