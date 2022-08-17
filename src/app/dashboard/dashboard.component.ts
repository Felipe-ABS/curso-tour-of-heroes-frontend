import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAll().subscribe(heroes =>
      this.heroes = heroes.slice(1, 5)); // O slice ele pega do primeiro elemento (no caso o 1 ali que foi o index que comecei) até o index final que no caso é o 5, porém o slice não pega o item da ultima
      // linha que eu pedi, ou seja, o item que está na posição 5 não será pego pelo slice, apenas do 1 até o 4 (lembrando que array começa em 0 então o 1 seria a segunda posição)
  }

  onSelected(hero: Hero): void { // Esse hero é o hero que está vindo la do hero-search, e quando selecionado ele muda a rota de navegação
    this.router.navigate(['/heroes', hero.id]);
  }
}
