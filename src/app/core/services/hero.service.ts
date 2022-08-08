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
  getAll(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // return heroes; Comentado para relembrar como usar utlilzando o mock

    // <Tipo_De_Dado_De_Retorno>
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes) => this.log(`Fetched ${heroes.length} hero(es)!`))
    );
  }

  // GET /heroes/id
  getOne(id: number): Observable<Hero> {
    // const hero = HEROES.find((hero) => hero.id === id)!;
    // return of(hero);

    return this.http.get<Hero>(this.getUrl(id)).pipe(
      tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`))
    );
  }

  // POST /heroes
  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero) => this.log(`Created ${this.descAttributes(hero)}`))
    );
  }

  // PUT /heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.getUrl(hero.id), hero).pipe(
      tap((hero) => this.log(`Updated ${this.descAttributes(hero)}`))
    ); // No put tem que colocar o objeto que vamos alterar, no caso o hero que está vindo como parâmetro
  }

  // DELETE /heroes/id
  delete(hero: Hero): Observable<any> { // Deve ser "any" pois o backend retorna o codigo 204 quando excluimos alguma coisa do backend e não retorna mais nada para nós
    return this.http.delete<any>(this.getUrl(hero.id)).pipe( // Neste aqui, não precisa colocar o parâmetro do hero depois da URL, ja que ele vai excluir o hero identificado pelo ID, então não é preciso de mais nenhuma informação
      tap(() => this.log(`Deleted ${this.descAttributes(hero)}`)) // Onde ficava "hero" no tap antes da arrow function, agora fica vazio pois não vai retornar nada do backend
    );
  }

  private descAttributes(hero: Hero): string {
    return `Hero Id=${hero.id} and Name=${hero.name}`
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`
  }
}
