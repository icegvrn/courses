import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'planning', pathMatch: 'full' },
      {
        path: 'planning',
        loadComponent: () => import('./pages/planning/planning').then(m => m.PlanningComponent),
      },
      {
        path: 'courses',
        loadComponent: () => import('./pages/courses/courses').then(m => m.CoursesComponent),
      },
      {
        path: 'recettes',
        loadComponent: () => import('./pages/recettes/recettes').then(m => m.RecettesComponent),
      },
      {
        path: 'ingredients',
        loadComponent: () => import('./pages/ingredients/ingredients').then(m => m.IngredientsComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
