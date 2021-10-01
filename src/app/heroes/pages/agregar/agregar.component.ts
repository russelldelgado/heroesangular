import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {


  heroe : Heroe = {
    alter_ego : '',
    characters : '',
    first_appearance: '',
    publisher : Publisher.DCComics,
    superhero : '',
    alt_img : ''
  };

  publishers = [
    {
      id :"DC Comics",
      desc : "DC -- Comics",
    },
    {
      id :"Marvel Comics",
      desc : "Marvel -- Comics",
    }
  ]

  constructor( private heroesService : HeroesService) { }

  ngOnInit(): void {
  }


  guardar(){

    if(this.heroe.superhero.trim().length ===0){
      return;
    }

    this.heroesService.agregarHeroe(this.heroe).subscribe(
      res => console.log(res)
    )

    console.log(this.heroe);
  }

}
