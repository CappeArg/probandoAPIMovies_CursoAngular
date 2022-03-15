import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../intefaces/cartelera-response';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {


@Input()  peliculas:Movie[]=[];
 

  constructor(private router:Router) { 

   }
    
  ngOnInit(): void {

    
    console.log(this.peliculas)

  }

  onPeliculaClick(pelicula:Movie){
    // console.log(pelicula);
    this.router.navigate(['/pelicula', pelicula.id])
  }


}
