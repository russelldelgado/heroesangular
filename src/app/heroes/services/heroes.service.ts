import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  baseUrl : string = environment.baseUrl;

  constructor(private httpClient : HttpClient) {  }

  getHeroes() : Observable<Heroe[]>{
    return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }


  getHeroePorId(id : string ) : Observable<Heroe>{
    return this.httpClient.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }


  getSugerencias(termino : string , limit : number = 6) : Observable<Heroe[]>{
  return  this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=${limit}`)

  }


  agregarHeroe(heroe : Heroe) : Observable<Heroe>{

   return this.httpClient.post<Heroe>(`${this.baseUrl}/heroes` , heroe);

  }

}
