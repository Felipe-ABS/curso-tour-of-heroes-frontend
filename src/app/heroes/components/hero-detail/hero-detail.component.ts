import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  isEditing = false;

  // Agrupar alguns elementos
  form = this.fb.group({ // Dentro vai ter alguns controles, que são os formControls, define um valor inicial e depois se tem algum validador por exemplo
    id:[{ value: '', disabled: true}], // Este disable "substitui" o disable que estava no template
    name: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private location: Location, // Consegue interagir com o histórico do browser
    private route: ActivatedRoute, // Segura as informações sobre o momento da rota
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // tirando uma "foto" do momento
    const paramId = this.route.snapshot.paramMap.get('id');
    if(paramId !== 'new')
    // {
    //   this.isEditing = false;
    //   this.hero = { name: '' } as Hero; // Ele vai converter pra Hero mesmo não tendo o ID, já que nesse caso não temos um ID na criação do herói
    // } else
    {
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getOne(id).subscribe(hero => {
        this.hero = hero;
        this.form.controls['id'].setValue(hero.id);
        this.form.controls['name'].setValue(hero.name);
      });
    }

  }

  goBack(): void {
    // Volta pra página anterior do site
    this.location.back();
  }

  create(): void {
    const {valid, value} = this.form;

    if(valid) {
      const hero: Hero = {
        name: value.name
      } as Hero; // Usando o "as Hero" ele permite que mesmo que esteja faltando uma propriedade ele ainda atue com o tipo Hero

      this.heroService.create(hero).subscribe(() => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }

  update(): void {
    const { valid, value} = this.form; // Assim é mais facil do que fazer this.form.valid ou .value, pois assim só em uma linha você ja atribui os valores do form para essas duas propriedades
    if(valid) {
      const hero: Hero = {
        id: this.hero.id, // Id do hero(no começo do arquivo)
        name: value.name // Valor do nome que está no formuláro
      }
      this.heroService.update(hero).subscribe(() => this.goBack());
    } else {
      this.showErrorMsg();
    }
  }

  // Métodos privados sempre no final
  private showErrorMsg(): void {
    this.snackBar.open('Por favor, cheque os erros encontrados.', 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
