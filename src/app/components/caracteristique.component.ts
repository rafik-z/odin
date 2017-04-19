import { Component, OnInit, OnChanges } from '@angular/core';
import { Caracteristique } from '../domain/caracteristique';
import { Http, Response, Headers } from '@angular/http';
import { Message, MenuItem } from 'primeng/primeng';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from "@angular/router";
import { CaracteristiquesService } from '../services/caracteristiques.service';
import { Observable } from 'rxjs/Observable';
import { DataTable } from "primeng/components/datatable/datatable";
@Component({
    selector:'hep-carac',
    templateUrl:'./caracteristique.component.html',
    providers: [CaracteristiquesService]
})

export class CaracteristiqueComponent implements OnInit{
    urlRef: string = 'http://10.64.1.107:8080/Odin-0.1/ws/caracteristique/';
    val2: number;
    caracteristiqueAAjouter: Caracteristique;
    caracteristiqueSelectionnee: Caracteristique;
    listeCaracteristiques: Array<Caracteristique>;
    checked:Boolean = false;
    listcar: Caracteristique[];
    items: MenuItem[]
    public msgs:Message[]=[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http:Http, 
                private caracteristiquesService:CaracteristiquesService){
                this.listeCaracteristiques = new Array<Caracteristique>();
                this.caracteristiqueAAjouter = new Caracteristique();
    }

    ngOnInit(){
        this.http.get(this.urlRef)
        .toPromise()
        .then(reponse => this.listeCaracteristiques = reponse.json() as Array<Caracteristique>)
        .then(() => this.msgs.push({severity:'info', summary:'Liste',detail:'Caractéristiques chargées avec succés!'}))
        .catch(() => this.msgs.push({severity:'error', summary:'Liste',detail:'Chargment impossible.'}));
        this.recupererCaracteristiques();

        this.items = [
            {label: 'Modifier', command: (event) => this.modificationCaracteristique(event)},
            {label: 'Supprimer', command: (event) => this.supprimerCaracteristique(event)}
        ]
    }

    ajouterCaracteristique():void{
        this.caracteristiqueAAjouter.competenceDev = this.checked;
            this.http.post(this.urlRef, 
            JSON.stringify(this.caracteristiqueAAjouter), {headers: new Headers({'Content-Type':'application/json'})})
            .toPromise()
            .then(() => this.msgs.push({severity:'info', summary:'Caractéristique',detail: '"'+this.caracteristiqueAAjouter.denomination + '" ajouté avec succés.'}))
            .then(() => this.recupererCaracteristiques())
            .then(() => this.effacerInput())
            .catch(()=> this.msgs.push({severity:'error', summary:'Caractéristique',detail:'Ajout impossible.'}));
    }

    recupererCaracteristiques(){
        this.caracteristiquesService.recupererCaracteristiques()
                                    .subscribe(car => this.listcar = car);
    }

    effacerInput(){
        this.caracteristiqueAAjouter.denomination = null;
    }

    modificationCaracteristique(truc){
        console.log(truc);
    }

    supprimerCaracteristique(caracteristique: Caracteristique){
        this.caracteristiquesService.supprimerCaracteristique(this.caracteristiqueSelectionnee.denomination)
        .subscribe(
            () => console.log(), 
            () => this.msgs.push({severity:'error', summary:'Caractéristique',detail:'Suppression impossible.'}),
            () => {this.recupererCaracteristiques(), this.msgs.push({severity:'info', summary:'Caractéristique',detail:'Suppression réussie.'})});
    }

    exportCSV(dt: DataTable){
        dt.exportCSV();
    }

}