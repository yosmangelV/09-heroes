import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {HeroeModel} from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;
  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.getHeroes();
  }

  borrarHeroe(heroe: HeroeModel) {

    Swal.fire( {
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value) {
        this.cargando = true;
        Swal.fire( {
          title: 'Espere',
          text: 'Borrando información',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
        this.heroesService.borrarHeroe(heroe.id).subscribe( data => {
          this.getHeroes();
          Swal.fire({
            title: 'Elemento Borrado',
            text: 'Se actualizó correctamente',
            icon: 'success'
          });
        });
      }
    });
  }
  getHeroes() {
    this.heroesService.getHeroes().subscribe( data => {
      console.log(data);
      this.heroes = data;
      this.cargando = false;
    });
  }
}
