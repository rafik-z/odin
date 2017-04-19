import { Component } from '@angular/core';
import { CaracteristiquesService } from '../services/caracteristiques.service';

@Component({
    selector:'odin-extract',
    templateUrl:'./extraction.component.html',
    providers: [CaracteristiquesService]
})

export class ExtractionComponent{
constructor(private caracteristiquesService: CaracteristiquesService){}
    texte: String;
    myfile: any[] = [];
    donneesBrutes: String;

    extraireDonnees(pdf: File){
        this.caracteristiquesService.extraireDonnees(pdf)
        .subscribe((data:String) => this.texte = data, 
        () => console.log("fail"), 
        () => console.log("OK"));
    }
}