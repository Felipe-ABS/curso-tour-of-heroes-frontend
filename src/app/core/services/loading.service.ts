import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false); //Com o BehaviorSubject conseguimos colocar um valor inicial para ele

  // Colocando um simbolo de "$" na frente irá indicar que aquilo é um observable
  // Quem quiser olhar para o meu "LoadingSubject" irá olhar para esse loading$, pois no Loading Subject tem os valores e eu vou poder mudar esses valores
  loading$: Observable<boolean> = this.loadingSubject.asObservable(); // O asObservable faz com q o subject possa retornar como um observable

  hide(): void {
    this.loadingSubject.next(false);
  }

  show(): void {
    this.loadingSubject.next(true);
  }
}
