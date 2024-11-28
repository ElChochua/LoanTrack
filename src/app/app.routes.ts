import { Routes } from '@angular/router';
import { LoginComponent } from './business/auth/login/login.component';
import { GuardService } from './core/guards/auth.guard';
import { PreventGuard } from './core/guards/prevent.guard';
export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./shared/components/landingpage/landingpage.component')
    },
    {
        path:'login',
            component: LoginComponent, 
            canActivate:[PreventGuard]
        },
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        canActivate:[GuardService],
        children:[
            {
             path: 'dashboard',
             loadComponent:() => import('./business/dashboard/dashboard.component')
            }
        ]
    }  
];
