import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './loginComponents/home';
import { LoginComponent } from './loginComponents/login';
import { RegisterComponent } from './loginComponents/register';
import { AuthGuard } from './loginComponents/_helpers';
import { DashboardComponent } from './dashboard/dashboard-component/dashboard-component.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);