import { Component, OnInit } from '@angular/core';
import { Caracteristique } from "../domain/caracteristique";
import { Http } from "@angular/http";
import { Candidat } from "../domain/candidat";
import { Message } from 'primeng/primeng';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector:'hep-candidat',
    templateUrl:'./candidat.component.html'
})

export class CandidatComponent implements OnInit{
    urlRef: string = 'http://10.64.1.128:8080/Odin-0.1/ws/';
    candidat: Candidat;
    listeCandidats:Array<Candidat>;
    listeBrute:Array<String>;
    listeLabels:Array<String>;
    nbrProfils: number;
    listeCaracteristiques: Array<Caracteristique>;
    listeNomsCaracteristiques: Array<String>;
    texteFeature: String;
    texteLabel: String;
    public msgs:Message[]=[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http:Http){
        this.listeCaracteristiques = new Array<Caracteristique>();
        this.listeNomsCaracteristiques = new Array<String>();
        this.candidat = new Candidat();
        this.listeCandidats= new Array<Candidat>();
        this.listeBrute = new Array<String>();
        this.listeLabels = new Array<String>();
        this.texteFeature = '';
        this.texteLabel = '';
    }

    ngOnInit(){
        // Récupération de la liste des caracteristiques
        this.http.get(this.urlRef)
        .toPromise()
        .then(reponse => this.listeCaracteristiques = reponse.json() as Array<Caracteristique>)
        .then(()=> chargerCaracs(this.listeCaracteristiques,this.listeNomsCaracteristiques) )
        .then(() => this.msgs.push({severity:'info', summary:'Liste',detail:'Caractéristiques chargées avec succés!'}))
        .catch(() => this.msgs.push({severity:'error', summary:'Liste',detail:'Chargment impossible.'}));

        
        function chargerCaracs(tableau:Array<Caracteristique>, liste){
            for (let elt of tableau){
                liste.push({label: elt.denomination, value: elt.denomination});
                console.log(elt);
            }
        }
    }

    genererCandidat(affichage:boolean, repetition:number){

        for (var index = 0; index < repetition; index++) {
            
            let candidat:Candidat;
            let score: number;
                
                this.candidat.carac1=this.selectionCaracteristique();
                this.candidat.carac2=this.selectionCaracteristique();
                this.candidat.carac3=this.selectionCaracteristique();

                score = (+ this.candidat.carac1.competenceDev )+(+ this.candidat.carac2.competenceDev) + ( + this.candidat.carac3.competenceDev)

                this.texteFeature = "["+this.candidat.carac1.denomination+","+this.candidat.carac2.denomination+","+this.candidat.carac3.denomination+"]";
                if (score >=2) {
                    this.texteLabel="[\"développeur\"]"            
                }else{
                    this.texteLabel="[\"autre\"]"
                }

            

                this.listeBrute.push("["+this.candidat.carac1.denomination + ", " + this.candidat.carac2.denomination+ ", "  + this.candidat.carac3.denomination+ "]" ); 
        }               
                this.texteFeature = "feature = ["+this.listeBrute.toString()+"]";    

    }

    selectionCaracteristique():Caracteristique{
        let caracSelectionnee:Caracteristique;

        let index = this.selectionAleatoire(this.listeCaracteristiques);

        caracSelectionnee = this.listeCaracteristiques[index];

        return caracSelectionnee;
    }

    selectionAleatoire(liste:Array<Caracteristique>):number{
        let longueur:number = liste.length;

        let rndIndex:number = Math.floor((Math.random()*(longueur-0)+0));

        return rndIndex;
    }


}