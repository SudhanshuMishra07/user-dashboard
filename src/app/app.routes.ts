import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: '', component: UserDashboardComponent },
    {
      path: 'add-user',
      loadComponent: () =>
        import('./add-user/add-user.component').then((m) => m.AddUserComponent),
    },
  ];