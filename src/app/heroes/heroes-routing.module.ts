import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  // O vazio é "substituido" pelo nome do path que está no app-routing, pois o nome das suas rotas ja estão no app-routing
  // O path no caso ja está sendo setado no app-routing, então ele ja está com o contexto de Heroes
  { path: ':id', component: HeroDetailComponent , canActivate: [AuthGuard]},
  { path: '', component: HeroesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
