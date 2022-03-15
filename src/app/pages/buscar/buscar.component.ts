import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/intefaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  resultado:Movie[]=[];
  public texto:string='';

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      params=>{
        this.texto=params['texto'];
        console.log(params)
        this.peliculasService.buscarPelicula(params['texto']).subscribe(
          peliculas=>{
            this.resultado = peliculas;
            // console.log(peliculas);
          }
        )
      }
    )
  }

}
