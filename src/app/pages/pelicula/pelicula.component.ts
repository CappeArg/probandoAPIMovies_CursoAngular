import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculaResponse } from '../../intefaces/pelicula-response';
import { Location } from '@angular/common';
import { Cast } from 'src/app/intefaces/credit-response';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula!:PeliculaResponse;
  public cast!:Cast[];

  constructor(private activatedRoute:ActivatedRoute,
              private peliculasService:PeliculasService,
              private location: Location,
              private router:Router) { }

  ngOnInit(): void {

    const id= this.activatedRoute.snapshot.params['id'];

    //APLICANDO RXJS
    // combineLatest([
    //   this.peliculasService.getPeliculaDetalle(id),
    //   this.peliculasService.getCast(id)

    // ]).subscribe(([pelicula, cast])=>{
    //   if(!pelicula){
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.pelicula = pelicula
    //   this.cast = cast;
    // })
    this.peliculasService.getPeliculaDetalle(id).subscribe(pelicula => {
      pelicula && pelicula.id === +id
          ? (this.pelicula = pelicula)
          : this.router.navigateByUrl('/home');
    });
    
    this.peliculasService.getPeliculaDetalle(id)
.subscribe(pelicula=> {
  
  // console.log(pelicula)
  this.pelicula=pelicula;
})

this.peliculasService.getCast(id).
subscribe(creditos=>{

  // console.log(creditos)
  this.cast=creditos
})
  }

    regresar(){

    this.location.back();
  }
}
   




