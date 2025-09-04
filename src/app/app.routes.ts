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
            },
            {
                path: 'organizations',
                loadComponent:() => import('./business/organizations/organizations.component')
            },
            {
                path: 'loans',
                loadComponent:() => import('./business/loans/loans.component')
            },
            {
                path: 'loans/request',
                loadComponent:() => import('./business/loans/request-loan/request-loan.component')
            },
            {
                path: 'administration',
                loadComponent:() => import('./business/user-management/user-management.component')
            },
            {
                path: 'profile',
                loadComponent:() => import('./business/profile/profile.component')
            },
            {
                path: 'organizations/deposit',
                loadComponent:() => import('./business/organizations/deposit/deposit.component')
            },
            {
                path: 'loans/pending',
                loadComponent: () => import('./business/loans/pending/pending.component')
            },
            {
                path: 'notifications',
                loadComponent: () => import('./business/notifications/notifications.component')
            }
        ]
    }  
];
