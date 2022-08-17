import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];

  // Injeção de Service
  constructor(private heroService: HeroService, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.getHeroes();
  }

  getHeroes(): void {
    // O subscribe notifica quando houver uma mudança no Observable (dentro dele tem as ações do que será feito quando for notificado)
    // O heroes é uma variável, ou meio que o parâmetro da função, ja que esta utilizando a "Arrow Function"
    this.heroService.getAll().subscribe(heroes =>
      this.heroes = heroes);
  }

  delete(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'Cancelar',
      confirmText: 'Delete',
      content: `Delete '${hero.name}'?`
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData, // Este data é o "data: DialogData" que está no construtor do nosso componente do Dialog
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.heroService.delete(hero).subscribe(() => {
          this.heroes = this.heroes.filter(h => h !== hero) // No filter, se der verdadeiro ele entra na lista de heroes, se não ele não entra
          // Ele vai olhar em todos os itens, se for igual ao nome do que eu cliquei no botão, ele não deixa entrar no heroes, e assim excluindo o hero com o Id

          // É mais recomendável que a aplicação vá a menor quantidade de vezes possivel pro backend, e menos trabalho pro banco de dados, assim fazendo duas chamadas
          //this.getHeroes();
        });
      }
    }); // Vai retornar um Observable, então deve-se usar o subscribe para poder mexer com um observable
  }

  onSelected(hero: Hero): void {
    this.delete(hero);
  }
}
