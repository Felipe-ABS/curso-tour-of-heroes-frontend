import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // Deixando vazio a gente está fazendo algo similar ao que está sendo feito no app-routing, ele detecta que está vazio e
  // redireciona para '/dashboard', então o outro path que está no app-routing ele detecta o path como sendo do 'dashboard' e importa o modulo
  // do Dashboard que declara o componente DashboardComponent, assim renderizando a página
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }, // Para que seja possivel entrar no dashboard, o "canActivate" tem que receber true do AuthGuard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
