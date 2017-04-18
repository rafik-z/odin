import { Http, Response, Headers } from '@angular/http';
import { Caracteristique } from '../domain/caracteristique';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CaracteristiquesService{
    urlRef: string = 'http://10.64.1.128:8080/Odin-0.1/ws/';
    headers: Headers;

    constructor(private http:Http){}

    recupererCaracteristiques(): Observable<Caracteristique[]>{
        return this.http.get(this.urlRef).map((res:Response) => res.json());
    }

    extraireDonnees(pdf: File):Observable<String>{
        this.headers.append('Content-Type', 'application/pdf');
        return this.http.post(this.urlRef, {pdf}, this.headers).map((res:Response) => res.json());
    }

}