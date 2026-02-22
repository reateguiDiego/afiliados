import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { HomePage } from './features/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
      
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories-page/categories-page').then((m) => m.CategoriesPage),
      },
      {
        path: 'comparisons',
        loadComponent: () =>
          import('./features/comparisons-page/comparisons-page').then((m) => m.ComparisonsPage),
      },
      {
        path: 'guides',
        loadComponent: () =>
          import('./features/guides-page/guides-page').then((m) => m.GuidesPage),
      },

      // footer pages
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about-page/about-page').then((m) => m.AboutPage),
      },
      {
        path: 'affiliate',
        loadComponent: () =>
          import('./features/affiliate-page/affiliate-page').then((m) => m.AffiliatePage),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/privacy-page/privacy-page').then((m) => m.PrivacyPage),
      },
      {
        path: 'cookies',
        loadComponent: () =>
          import('./features/cookies-page/cookies-page').then((m) => m.CookiesPage),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact-page/contact-page').then((m) => m.ContactPage),
      },

      // Always home
      { path: '**', redirectTo: '' },
    ],
  },
];