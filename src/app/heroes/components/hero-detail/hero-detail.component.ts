import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  // Pode ser enxergada de fora desse componente, para que outros componentes possam atribuir valores para ela
  // @Input() hero?: Hero;

  hero!: Hero; // O símbolo de exclamação "!" serve para que a variável não possa receber um valor nulo ou indefinido (null or undefined)

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

    this.heroService.getOne(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    // Volta pra página anterior do site
    this.location.back();
  }

  isFormValid(): boolean {
    return !!this.hero.name.trim();
  }

  save(): void {
    this.heroService.update(this.hero).subscribe(() => this.goBack());
  }
}
