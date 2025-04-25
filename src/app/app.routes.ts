import { Routes } from '@angular/router';
import { TimerComponent } from './components/timer/timer.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'timer',
    pathMatch: 'full',
  },
  {
    path: 'timer',
    component: TimerComponent,
  }
];
