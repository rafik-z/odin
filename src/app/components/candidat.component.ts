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
    listeBruteCandidats:Array<String>;
    listeBruteLabels:Array<String>;
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
        this.listeBruteCandidats = new Array<String>();
        this.listeBruteLabels = new Array<String>();
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

        this.listeBruteCandidats = [];
        this.listeBruteLabels = [];
        this.texteFeature ="";
        this.texteLabel="";
        for (var index = 0; index < repetition; index++) {
            let c1 = this.candidat.carac1
            let c2 = this.candidat.carac2
            let c3 = this.candidat.carac3
            let check = [];
            let candidat:Candidat;
            let score: number;
                
                c1=this.selectionCaracteristique();
                c2=this.selectionCaracteristique();
                while(c1 ==c2){
                    c2 = this.selectionCaracteristique();
                }
                c3=this.selectionCaracteristique();
                while(c3 == c1 || c3 == c2){
                c3=this.selectionCaracteristique();
                }

                score = (+ c1.competenceDev )+(+ c2.competenceDev) + ( + c3.competenceDev)
                if (score >=2) {
                    this.listeBruteLabels.push("[\"développeur\"]");            
                }else{
                    this.listeBruteLabels.push("[\"autre\"]");
                }            

                this.listeBruteCandidats.push("[\""+c1.denomination + "\", \"" + c2.denomination+ "\", \""  + c3.denomination+ "\"]" ); 
        }               
                this.texteFeature = "candidats = ["+this.listeBruteCandidats.toString()+"]";  
                this.texteLabel = "titres = ["+this.listeBruteLabels.toString()  +"]";

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