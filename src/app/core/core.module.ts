import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';

 // Os componentes importados aqui devem ser exportados para que eles possam ser reconhecidos pelo app module, que é o module da aplicação inteira
const COMPONENTS = [
  ToolbarComponent,
  MessagesComponent,
  PageNotFoundComponent
]

const MODULES = [
  MaterialModule,
  // O FlexLayout só funciona se ele tiver sido declarado no modulo em que existe os componentes que utilizam ele
  FlexLayoutModule,
  RouterModule
]

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [
    COMPONENTS,
    MODULES,
  ]
})
export class CoreModule {
  // Para que o CoreModule não seja importado em outros modulos
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if(parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule.');
    }
  }
}
