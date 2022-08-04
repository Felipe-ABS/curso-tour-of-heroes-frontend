import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor { // Ela exige que tenhamos um método chamado intercept
  private activeRequests = 0; // Quantas requisições foram enviadas para o servidor

  constructor(private loadingService: LoadingService) {}

  // Vai fazer uma requizição, então antes da requisição por exemplo do getHeroes ser feita, eu posso fazer alguma operação aqui no intercept
  // Como o nome ja diz ele vai INTERCEPTAR a requisição do backend pra poder fazer alguma outra operação
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.activeRequests == 0) {
      this.loadingService.show();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        // Ele vai adicionar quando tiver uma requisição ativa, e quando essa requisição terminar, ela vai diminuir uma na contagem,
        // e só depois que terminar todas as requisições que vai esconder o spinner
        this.activeRequests--;

        if(this.activeRequests == 0) {
          this.loadingService.hide();
        }
      })
    ); // Aqui passa a requisição pra frente
  }
}
