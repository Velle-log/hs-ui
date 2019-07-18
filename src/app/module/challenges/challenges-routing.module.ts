import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './pages/challenges.page';


const routes: Routes = [
  {
    path: '',
    component: ChallengesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
