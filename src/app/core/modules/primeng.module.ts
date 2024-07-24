import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';

// Services
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  providers: [ MessageService, ConfirmationService ],
  imports: [
    CommonModule,
    ToastModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    InputTextareaModule,
    InputNumberModule,
    SliderModule,
    RadioButtonModule,
    AutoCompleteModule,
    MultiSelectModule,
    SelectButtonModule,
    TabViewModule,
    AccordionModule,
    ConfirmDialogModule,
    MessageModule,
    DialogModule
  ],
  exports:[
    ToastModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    InputTextareaModule,
    InputNumberModule,
    SliderModule,
    RadioButtonModule,
    AutoCompleteModule,
    MultiSelectModule,
    SelectButtonModule,
    TabViewModule,
    AccordionModule,
    ConfirmDialogModule,
    MessageModule,
    DialogModule
  ]
})
export class PrimengModule { }

