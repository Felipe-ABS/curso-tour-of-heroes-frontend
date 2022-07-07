import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  // Pode ser enxergada de fora desse componente, para que outros componentes possam atribuir valores para ela
  // @Input() hero?: Hero;

  hero?: Hero;

  constructor(
    private heroService: HeroService,
    private location: Location, // Consegue interagir com o histórico do browser
    private route: ActivatedRoute // Segura as informações sobre o momento da rota
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // tirando uma "foto" do momento
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    // Volta pra página anterior do site
    this.location.back();
  }
}
