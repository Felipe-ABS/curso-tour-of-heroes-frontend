import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from 'src/app/core/models/hero.model';
import { HeroService } from 'src/app/core/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  @Input() label = '';

  private searchTerm = new Subject<string>();
  @Output() private selected = new EventEmitter<Hero>(); // Manda para quem tiver ouvindo essa emissão, no caso o Pai do componente

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(600), // Ele auxilia no SwitchMap, onde eu coloco um tempo limite para que ele faça a busca, se exceder esse tempo limite ele faz a busca, se não ele só considera a ultima busca e não cancela as outras pois elas não aconteceram, assim não deixando sobrecarregar
      distinctUntilChanged(), // Só vai executar se o valor for diferente do que foi digitado
      switchMap(term => this.heroService.search(term)) // Ele sempre é chamado, mas pode ser cancelado quando solicitado para ser chamado outra vez, porém isso pode ficar muito pesado para a nossa aplicação
    );
  }

  // Este "Mat***SelectedEvent" é usado pra que receba o valor do evento que foi emitido para o método
  onSelected(selectedItem: MatAutocompleteActivatedEvent): void {
    this.searchTerm.next(''); // Colocada só para que na lista de heroes, quando clicava e cancelava pra excluir, o autocomplete ainda continuava lá

    const hero: Hero = selectedItem.option?.value;
    this.selected.emit(hero); // Aqui eu estou emitindo um evento para o pai que vai receber o valor (no caso o dashboard é o pai)
  }

  search(term: string): void {
    this.searchTerm.next(term); // Vai receber o termo e atualizar o Subject
  }

}
