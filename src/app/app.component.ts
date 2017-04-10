import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/primeng";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    private items: MenuItem[];
  title = 'Odin';

  ngOnInit(){
    this.items = [{
            label: 'Caracteristiques', url:'/caracteristiques'
        },
        {
            label:'Candidat', url:'/candidat'
        }];
  }
}
