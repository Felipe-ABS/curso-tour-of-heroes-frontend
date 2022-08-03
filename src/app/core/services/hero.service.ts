import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // o api/ serve para que, caso tenha uma rota com o mesmo nome na URL, ele não interfira
  // O "environment.baseURL" ele pega o valor que foi colocado da variavel baseURL, mas muda dependendo se estiver em produção ou local
  private heroesUrl = `${environment.baseURL}/heroes`;
  // GET: Obter os Dados
  // PUT/PATCH: Alterar o Dado
  // POST: Criar novo dado
  // DELETE: Excluir os Dados

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // GET /heroes
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // return heroes; Comentado para relembrar como usar utlilzando o mock

    // <Tipo_De_Dado_De_Retorno>
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes) => this.log(`Fetched ${heroes.length} hero(es)!`))
    );
  }

  // GET /heroes/id
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find((hero) => hero.id === id)!;
    // return of(hero);

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((hero) => this.log(`fetched hero id=${id} and name=${hero.name}`))
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
