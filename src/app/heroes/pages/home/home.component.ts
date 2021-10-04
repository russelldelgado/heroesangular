import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin : 10px
    }
    `
  ]
})
export class HomeComponent {

  _auth! : Auth  //| undefined ;

  get auth(){
    return {...this.authService.auth}
  }

  constructor(private router : Router , private authService : AuthService) { }


  logout(){
    //backend

    this.router.navigate(['./auth']);

    //usuario - servicio 

    //si hay el usuairo navegamo a la ruta indicada
  }


}
