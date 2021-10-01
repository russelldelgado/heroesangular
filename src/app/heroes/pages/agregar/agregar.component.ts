import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width : 100%;
      border-radius : 20px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {


  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    alt_img: ''
  };

  publishers = [
    {
      id: "DC Comics",
      desc: "DC -- Comics",
    },
    {
      id: "Marvel Comics",
      desc: "Marvel -- Comics",
    }
  ]

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute , private router:Router , private _snackBar: MatSnackBar , public dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){


    //verifico el id de la ruta , si hay significa que voy a editar un elemento , si no hay quiere decir que voy a crear un elemento
    this.activatedRoute.params
    .pipe(
      //devuelvo otro observable , y ya no me regresa un id , si no un heroe
      switchMap(({ id }) => this.heroesService.getHeroePorId(id))
    )
    .subscribe(heroe => {
      console.log(heroe)
      if (heroe) {
        this.heroe = heroe;
      }
    });

    }

  }


  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    //para diferenciar entre crear un nuevo heroe y editar un hereo tenemos que ver si tiene o no ID .
    //cuando creamos un nuevo heroe no tenemos ningún ID asociado ya que de eso se encarga el backend 
    //si vamos a editar un heroe si que tenemos un id asociado.

    if (this.heroe.id) {
      //actualizaremos si tiene un id
      this.heroesService.actualizarHeroe(this.heroe).subscribe(
        heroe =>{
        //  heroe => this.router.navigate(['/heroes' , heroe.id])
        this.mostrarSnackbar('Registro actualizado correctamente')
        }

      );

    } else {
      //crearemos si no tiene un id

      this.heroesService.agregarHeroe(this.heroe).subscribe(
        heroe => {
          console.log(heroe)
        this.mostrarSnackbar('Heroe añadido correctamente')

         this.router.navigate(['/heroes/editar' , heroe.id])

          // this.heroe = {
          //   alter_ego : '',
          //   characters : '',
          //   first_appearance: '',
          //   publisher : Publisher.DCComics,
          //   superhero : '',
          //   alt_img : ''
          // };
        }
      )

    }
    console.log(this.heroe);
  }

  borrarHeroe(){

   const dialogo =  this.dialog.open(ConfirmarComponent , {
      width : '50%',
     // data : {...this.heroe} , // como en angular todo se manda por referenia hacemos la desestructuración del objeto para que esto no pase.
      data :this.heroe , // como en angular todo se manda por referenia hacemos la desestructuración del objeto para que esto no pase.

    });

    dialogo.afterClosed().subscribe(res => {
//si existe la confirmación del usuario y es true entonces mando a llamar a este servicio
      if(res){
        this.heroesService.eliminarHeroe(this.heroe).subscribe(resp => {
          console.log(resp)
          this.router.navigate(['/heroes']);
        });
      }
    });
  }


  mostrarSnackbar(mensaje : string):void{
    this._snackBar.open(mensaje , 'Ok' , {
      duration : 2000,
      
    })
  }

}
