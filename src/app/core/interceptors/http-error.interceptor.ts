import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => { // Deve retornar um erro, se não ele não funciona
        if(!environment.production) {
          console.log(err);
        }

        let errorMsg = '';

        if(err.error instanceof ErrorEvent) { // Aqui estou verificando se o tipo do erro é um erro de evento (ErrorEvent) ou se é outro tipo de erro
          errorMsg = `Error: ${err.error.message}`;
        } else if(Array.isArray(err.error) && err.error.length) {
          errorMsg = `Error: ${err.error[0]}`; // Pega do array(lista) que tem as informações do erro, e o primeiro da lista (no caso o 0) tem a mensagem que descreve melhor para o usuário
        } else if(err.error.errors) {
          errorMsg = `Error: ${err.error.errors}`;
        } else {
          errorMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }

        this.messageService.add(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
