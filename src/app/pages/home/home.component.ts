import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/intefaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { CarteleraResponse } from '../../intefaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public peliculas: Movie[] = [];
  public peliculasSlide: Movie[] = [];



@HostListener('window:scroll', ['$event'])
onScroll() {

const pos = (document.documentElement.scrollTop  || document.body.scrollTop) + 2961 //prueba en Galaxy S8 (NO SIRVE EN PROD)

const max = (document.documentElement.scrollHeight  || document.body.scrollHeight)

if (pos>max) {
  if (this.peliculaservice.cargando) { return }

  this.peliculaservice.getCartelera().subscribe(peliculas=>{

    this.peliculas.push(...peliculas)
    
  })

}

}

  constructor(private peliculaservice:PeliculasService) { }

  ngOnInit(): void {

this.peliculaservice.getCartelera()
.subscribe(peliculas=>{
  // console.log(respuesta);
  this.peliculas=peliculas;
  this.peliculasSlide=peliculas;
})
    
  }

  ngOnDestroy(): void {
      this.peliculaservice.resetCarteleraPage();
  }

  

}
