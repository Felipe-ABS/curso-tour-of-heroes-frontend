import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    // Em todas as featues, seja componente e etc, deve-se importar o módulo que estiver utilizando no módulo
    // Por exemplo, neste do Dashboard, tem o arquivo do modulo do dashboard, que declara o componente do Dashboard e
    // Importa todos os módulos que estão sendo utilizados apenas por ele, assim não deixando o app.module muito cheio e desorganizado
    CommonModule,
    MaterialModule,
    // O Routing Module de cada feature serve para que possamos organizar melhor qual a rota daquele componente
    // e importando esse [Nome]RoutingModule, como ele ja usa o RouterModule, importando ele o RouterModule também vai funcionar sem problemas nesse modulo
    // assim podendo usar o routerlink e outras funcionalidades de rotas tranquilamente
    DashboardRoutingModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class DashboardModule { }
