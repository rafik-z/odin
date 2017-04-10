import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MenuModule, MenubarModule,  DropdownModule, SpinnerModule, 
        InputTextModule,InputTextareaModule, InputMaskModule, ButtonModule, DataTableModule,
        SharedModule, InputSwitchModule, GrowlModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { CaracteristiqueComponent } from "./components/caracteristique.component";
import { CandidatComponent } from "./components/candidat.component";

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent, CaracteristiqueComponent,
    CandidatComponent
  ],
  imports: [
    routing, BrowserModule, SpinnerModule,
    FormsModule, InputTextModule, MenubarModule,
    HttpModule, ButtonModule, InputMaskModule,
    DataTableModule, InputSwitchModule, GrowlModule, 
    DropdownModule, SharedModule, InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }