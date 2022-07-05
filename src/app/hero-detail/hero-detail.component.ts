import { Component, Input } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  // Pode ser enxergada de fora desse componente, para que outros componentes possam atribuir valores para ela
  @Input() hero?: Hero;

}
