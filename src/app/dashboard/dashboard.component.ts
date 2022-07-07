import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes =>
      this.heroes = heroes.slice(1, 5)); // O slice ele pega do primeiro elemento (no caso o 1 ali que foi o index que comecei) até o index final que no caso é o 5, porém o slice não pega o item da ultima
      // linha que eu pedi, ou seja, o item que está na posição 5 não será pego pelo slice, apenas do 1 até o 4 (lembrando que array começa em 0 então o 1 seria a segunda posição)
  }

}
