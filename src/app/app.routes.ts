import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './business/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
    /*
    {
        path:'dashboard',
            loadChildren:()=>import('./business/dashboard/dashboard.component'),
            children:[
                {}
            ]

    }
    {
        path='dashboard',
        loadComponent:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
    }*/
];
