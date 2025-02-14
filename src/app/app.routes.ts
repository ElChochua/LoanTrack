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
        path: 'register',
        loadComponent:() => import('./business/auth/register/register.component')
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
                path: 'loans',
                loadComponent:() => import('./business/loans/loans.component')
            },
            {
                path: 'transactions',
                loadComponent:() => import('./business/transactions/transactions-table-detail.component')
            },
            {
                path: 'organizations',
                loadComponent:() => import('./business/organizations/organizations.component')
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
                path: 'loans/active',
                loadComponent:() => import('./business/loans/shared/active-loans/active-loans.component')
            },
            {
                path: 'loans/inactive',
                loadComponent:() => import('./business/loans/shared/inactive-component/inactive-loans.component')
            },
            {
                path: 'loans/rejected',
                loadComponent:() => import('./business/loans/shared/rejected-loans/rejected-loans.component')
            }
        ]
    }  
];
