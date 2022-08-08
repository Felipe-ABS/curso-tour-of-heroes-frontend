import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

// O Core é onde terá TUDO que está sendo utilizado pela aplicação, seja os componentes criados para usar dentro das páginas ou as importações que serão necessárias

// Os componentes importados aqui devem ser exportados para que eles possam ser reconhecidos pelo app module, que é o module da aplicação inteira
const COMPONENTS = [
  ConfirmationDialogComponent,
  ToolbarComponent,
  MessagesComponent,
  PageNotFoundComponent,
  LoadingComponent
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // Qual o tipo que esse provider é, nesse caso um HTTP_INTERCEPTORS
      useClass: LoadingInterceptor, // Qual a classe que eu to usando o interceptor
      multi: true // O multi diz que vai poder ter mais de um interceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
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
