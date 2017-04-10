import { Routes, RouterModule } from '@angular/router';

import { CaracteristiqueComponent } from "./components/caracteristique.component";
import { CandidatComponent } from "./components/candidat.component";

const routes: Routes = [
    {
        path:'caracteristiques',
        component: CaracteristiqueComponent
    },
    {
        path:'candidat',
        component: CandidatComponent
    },
    {
        path:'',
        redirectTo:'/caracteristiques',
        pathMatch:'full'
    },
];

export const routing = RouterModule.forRoot(routes);