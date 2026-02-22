import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { HomePage } from './features/home/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
      
      // TODO:
      // { path: 'categorias', loadComponent: () => import('./features/categories/categories-page/categories-page.component').then(m => m.CategoriesPageComponent) },
      // { path: 'comparativas', loadComponent: () => import('./features/comparativas/comparativas-page/comparativas-page.component').then(m => m.ComparativasPageComponent) },
      // { path: 'guias', loadComponent: () => import('./features/guias/guias-page/guias-page.component').then(m => m.GuiasPageComponent) },

      { path: '**', redirectTo: '' },
    ],
  },
];