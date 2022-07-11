import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Ao invés de colocar TODAS as rotas dos componentes por aqui, cada componente/feature fica responsável por sua própria rota
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) // m é a variável que vai receber o meu módulo
    // e a arrow function do "m" o m.DashboardModule é pra sinalizar o módulo que eu quero que seja carregado
  },
  { // Fazendo isso, eles só serão chamados quando eu chegar na rota deles, ou seja, eles vão sair do arquivo "main.js" e será arquivos separados
    // Serão carregados apenas quando forem necessários
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then((m) => m.HeroesModule)
  },
  {
    path: '**', // Se não passou por nenhuma das rotas anteriores, essa será a rota escolhida
    component: PageNotFoundComponent // OBS: a ordem das suas rotas importam
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
