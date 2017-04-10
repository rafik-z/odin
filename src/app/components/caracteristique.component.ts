import { Component, OnInit } from '@angular/core';
import { Caracteristique } from "../domain/caracteristique";
import { Http, Response, Headers } from '@angular/http';
import { Message } from 'primeng/primeng';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
    selector:'hep-carac',
    templateUrl:'./caracteristique.component.html'
})

export class CaracteristiqueComponent implements OnInit{
    urlRef: string = 'http://10.64.1.128:8080/Odin-0.1/ws/';
    val2: number;
    caracteristiqueAAjouter: Caracteristique;
    listeCaracteristiques: Array<Caracteristique>;
    checked:Boolean = false;
    public msgs:Message[]=[];

constructor(private route: ActivatedRoute,
                private router: Router,
                private http:Http){
        this.listeCaracteristiques = new Array<Caracteristique>();
        this.caracteristiqueAAjouter = new Caracteristique();

}

ngOnInit(){
        this.http.get(this.urlRef)
        .toPromise()
        .then(reponse => this.listeCaracteristiques = reponse.json() as Array<Caracteristique>)
        .then(() => this.msgs.push({severity:'info', summary:'Liste',detail:'Caractéristiques chargées avec succés!'}))
        .catch(() => this.msgs.push({severity:'error', summary:'Liste',detail:'Chargment impossible.'}));
}

ajouterCaracteristique():void{

this.caracteristiqueAAjouter.competenceDev = this.checked;
    this.http.post(this.urlRef, 
    JSON.stringify(this.caracteristiqueAAjouter), {headers: new Headers({'Content-Type':'application/json'})})
    .toPromise()
     .then(() => console.log('Ajoutée avec succés!'))
     .then(()=> this.recupererCaracteristiques())
     .then(() =>this.effacerInput())
     .catch(()=> this.msgs.push({severity:'error', summary:'Caractéristique',detail:'Ajout impossible.'}));
}

recupererCaracteristiques(){
    
        this.http.get(this.urlRef)
              .toPromise()
              .then(reponse => this.listeCaracteristiques = reponse.json() as Array<Caracteristique>);
}
effacerInput(){
    this.caracteristiqueAAjouter.denomination = null;
    this.checked = false;
}
}