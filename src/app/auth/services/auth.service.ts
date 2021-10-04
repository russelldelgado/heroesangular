import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable , of } from 'rxjs';
import { Auth } from '../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl : string = environment.baseUrl;

  private _auth :Auth | undefined;

  constructor(private httpServide : HttpClient) { }

  get auth() {
    return {...this._auth}
  }


  verificaAutenticacion () : Observable<boolean>{
    //of me sierve para crear observables a partir de un elemento que le pasemos
    //si no existe el token en el local storage el usuario no puede entrar en esta ruta peor si existe si que puede
    let idToken = "1";
    if(!localStorage.getItem('token')){
      return of(false);
    }

    idToken = localStorage.getItem('token')!;
    
    return this.httpServide.get<Auth>(`${this.baseUrl}/usuarios/${idToken}`)
                                    .pipe( // en pocas palabras si esto tiene valor regreso un true
                                      map( auth => {
                                        console.log(' map' , auth);
                                        this._auth = auth;
                                        return true;
                                      } )
                                    )


  }  


  login(id : string = '1') : Observable<Auth>{

   return this.httpServide.get<Auth>(`${this.baseUrl}/usuarios/${id}`)
          .pipe(
            tap( auth =>this._auth = auth), //es un operador de rxjs que me sirve para conectarme antes de que me devuelva una respuesta.
            tap( auth =>localStorage.setItem('token' , auth.id)) //es un operador de rxjs que me sirve para conectarme antes de que me devuelva una respuesta.
          )

  }





}
