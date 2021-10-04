import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor(private router : Router , private authService : AuthService) { }
 

  //tengo que llamar al metodo login para que me confirmen que mi usuario existe
  //dependiendo de si existe o no realizo una accion u otra
  //es decir necesito un backend donde se realize la autenticación
  //necesito un usuario .--- esto es un servicio ya que estara disponible a lo largo de toda mi aplicación


  login(){
    //backend

    
    //usuario - servicio 


    this.authService.login().subscribe(auth => {
      if(auth.id){
        console.log(auth.email);
        this.router.navigate(['./heroes']);

      }
    })
    
    //si hay el usuairo navegamo a la ruta indicada
  }

}
