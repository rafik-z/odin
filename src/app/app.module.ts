import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ContextMenuModule, MenuModule, MenubarModule,  DropdownModule, SpinnerModule, 
        InputTextModule,InputTextareaModule, InputMaskModule, ButtonModule, DataTableModule,
        SharedModule, InputSwitchModule, GrowlModule, FileUploadModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { CaracteristiqueComponent } from "./components/caracteristique.component";
import { CandidatComponent } from "./components/candidat.component";

import { routing } from './app.routes';
import { ExtractionComponent } from './components/extraction.component';

@NgModule({
  declarations: [
    AppComponent, CaracteristiqueComponent,
    CandidatComponent, ExtractionComponent
  ],
  imports: [
    routing, BrowserModule, SpinnerModule,
    FormsModule, InputTextModule, MenubarModule,
    HttpModule, ButtonModule, InputMaskModule,
    DataTableModule, InputSwitchModule, GrowlModule, 
    DropdownModule, SharedModule, InputTextareaModule,
    FileUploadModule, ContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }