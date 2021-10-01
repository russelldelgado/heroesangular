import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Heroe} from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width : 100%;
      border-radius : 20px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe! : Heroe;


  //para poder leer la url necesito inyectar algo
  constructor(private activateRouter  : ActivatedRoute , private heroesService : HeroesService , private router : Router) { }


  ngOnInit(): void {
    this.activateRouter.params
    .pipe(
      //con este switchmap lo que hago es coger un observable para devolver otro , en este caso llamaria a mi servicio y ya al final me devolvería lo que necesito que es mi heroe
      switchMap(({id}) => this.heroesService.getHeroePorId(id)),

    )
    .subscribe(heroe =>{
      console.log(heroe)
      this.heroe = heroe;

    });


  }


  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
