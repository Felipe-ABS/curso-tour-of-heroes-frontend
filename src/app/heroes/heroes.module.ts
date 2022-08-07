import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroesRoutingModule } from './heroes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    // Router Module
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
