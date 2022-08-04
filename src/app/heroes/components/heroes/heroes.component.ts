import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  heroes: Hero[] = [];

  // Injeção de Service
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
      this.getHeroes();
  }

  getHeroes(): void {
    // O subscribe notifica quando houver uma mudança no Observable (dentro dele tem as ações do que será feito quando for notificado)
    // O heroes é uma variável, ou meio que o parâmetro da função, ja que esta utilizando a "Arrow Function"
    this.heroService.getAll().subscribe(heroes =>
      this.heroes = heroes);
  }
}
