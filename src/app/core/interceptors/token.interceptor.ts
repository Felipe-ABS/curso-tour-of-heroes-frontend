import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Esse local Storage ja existe dentro do interceptor, pois é o Local Storage que se encontra em "Application" no dev tools do navegador
    // Ele procura no Local Storage se existe algum token para pegar, como nesse primeiro momento não foi gerado um token ainda, então ele será vazio
    let token = localStorage.getItem('token') || ''; // Pode vir nulo mas não é isso que queremos, por isso colocamos pra pegar o token ou iniciar com um valor nulo

    // if(!token) { // Se não existir um token...
    //   token = this.generateToken(); //... ele irá gerar um token para o Local Storage
    //   localStorage.setItem('token', token); // Aqui irá la no nosso local storage, e iremos 'setar' no 'token' o nosso token
    // }

    request = request.clone({ // Clona a requisição(request) original, para que possamos verificar ela, porém a requisição original não pode ser adulterada, deve ser imutavel
      setHeaders: { // Cria um header(cabeçalho) para a requisição, é basicamente um nome pro cabeçalho
        Authorization: token // O Cabeçalho recebe o valor do token
      }
    });

    return next.handle(request); // Este "next.handle" significa que estamos passando o controle para o próximo interceptor cuidar (caso exista um)
  }

  // private generateToken(): string { // Gera um token com caracteres alfanuméricos aleatórios
  //   return Math.random().toString(36).substring(2, 12);
  // }
}
