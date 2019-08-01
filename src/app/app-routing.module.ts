import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModalContent } from './shared/components/auth-modal/auth-modal.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./module/landing/landing.module').then(mod => mod.LandingModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./module/challenges/challenges.module').then(mod => mod.ChallengesModule)
  },
  {
    path: 'login',
    component: AuthModalContent
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
