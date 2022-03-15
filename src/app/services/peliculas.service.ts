import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../intefaces/cartelera-response';
import { PeliculaResponse } from '../intefaces/pelicula-response';
import { CreditResponse } from '../intefaces/credit-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string='https://api.themoviedb.org/3';
  private carteleraPage:number=1;
  public cargando:boolean=false;

  constructor(private http:HttpClient) {}

  get params(){
    return{
    api_key:'c956a52660bc78e8e8dd1519fbda0751',
    language:'es-ES',
    page: this.carteleraPage
  }
  }

  resetCarteleraPage(){
    this.carteleraPage=1
  }


  getCartelera():Observable<Movie[]>{


    if (this.cargando){
      return of([]);
    }
    // console.log('cargando API');
    this.cargando=true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params:this.params
    }).pipe(
      map( (respuesta)=>respuesta.results ),
      tap(()=>{
        this.carteleraPage+=1;
        this.cargando=false;
      })
    )
  }

  buscarPelicula(texto:string):Observable<Movie[]>{

    const params= {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{ params })
    .pipe(
      map(
        respuesta=>respuesta.results
    ))

  }

  getPeliculaDetalle(id:string){

    return this.http.get<PeliculaResponse>(`${ this.baseUrl }/movie/${id}`,{ params:this.params }).
    pipe(
      catchError(err=>of(null))
    )

  }
  getCast(id:string){
    return this.http.get<CreditResponse>(`${ this.baseUrl }/movie/${id}/credits`,{ params:this.params }).
    pipe(map(
      respuesta=> respuesta.cast
    ))

  }


}
