import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
    `
    
    `
  ]
})
export class BuscarComponent implements OnInit {

  termino : string = '';
  heroes : Heroe[] = [];
  heroeSelecionado!  : Heroe | undefined

  constructor(private heroeServicio : HeroesService) { }

  ngOnInit(): void {
  }


  buscando(){
    this.heroeServicio.getSugerencias(this.termino.trim()).subscribe(resp => {
      this.heroes = resp;
      console.log(resp);
    });
  }


  opcionSeleccionada(evento : MatAutocompleteSelectedEvent){

    if(!evento.option.value){
      this.heroeSelecionado = undefined;
      return;
    }

    const heroe : Heroe = evento.option.value;
    console.log(heroe);
    this.termino = heroe.superhero
    this.heroeServicio.getHeroePorId(heroe.id!).subscribe(
      heroe =>{ 
      
        this.heroeSelecionado = heroe
        console.log(this.heroeSelecionado);
      
      }
      
    )
  }


  


}
