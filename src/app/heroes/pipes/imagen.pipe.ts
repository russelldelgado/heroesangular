import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';


//hay dos tipos de pipes , el puro y el impuro 
//la diferencia entre estos dos es que uno se redibuja siempre que el cliclo de de detención de angular nota un cambio 
//esto es bueno y malo , bueno porque se va acutalizando y cualquier cambio que hagamos en un determinado componene lo va a notar y redibujara nuestro elemento
//malo porque afecta al rendimiento de la aplicación ya que se llama muchas veces a lo largo de nuestra app por cada cambio que detecte
//para esto dentro de pipe metemos el  : en false.
//pure en true es el comportamiento por defecto que tienen los usuarios
@Pipe({
  name: 'imagen',
  //pure : false
})
export class ImagenPipe implements PipeTransform {

  
  

  transform(heroe : Heroe): string {


    console.log('pipe se ha procesado');


    if(!heroe.id && !heroe.alt_img){
     return `assets/no-image.png`;
    }else if(heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;

    }

  }

}
