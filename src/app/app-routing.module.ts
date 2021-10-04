//cmd : ng g m appRouting --flat // el --flat es para que no me cree ningun directorio si no que lo cree directamente en la ruta indicada 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guard/auth.guard';

//vamos a crear nuestras rutas 

const routes : Routes = [
  //en este punto le digo que si alguien navega a esta ruta entonces me la cargue , pero antes no .

  {
    path : 'auth',
    //resumen , cuando alguien entre a esta ruta cargame esto componentes , cuando esten cargado entonces cargame el m.authmodule con todo sus componentes etc....
    loadChildren : () => import('./auth/auth.module').then(m=> m.AuthModule), // con esto le digo que cuando se cargue todo que me cargue este determinado modulo.
  },

  {
    path : 'heroes',
    loadChildren :() => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad : [AuthGuard],
    canActivate : [AuthGuard]
  },

  {
    path : "404",
    component : ErrorPageComponent,

  },

{
  path : '**',
  redirectTo : "404",
}

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes), //indicamos cuales son las rutas principales
  ],
  exports : [
    RouterModule, //exportamos el router module para que sea visible y utilizado por toda nuestra app
  ]
})
export class AppRoutingModule { }
