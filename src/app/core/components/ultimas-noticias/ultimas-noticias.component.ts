import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConectService } from '../../services/api-conect.service';
import { News, Imagen } from '../../interfaces/news.interface';

@Component({
  selector: 'app-ultimas-noticias',
  templateUrl: './ultimas-noticias.component.html',
  styleUrls: ['./ultimas-noticias.component.scss'],
})
export class UltimasNoticiasComponent implements OnInit {
  public spanLastNews: string = 'Útimas entradas';
  public nuevasNoticias: News[] = [];

  constructor(
    private navigate: Router,
    private ApiConectService: ApiConectService
  ) {}

  ngOnInit(): void {
    this.ApiConectService.obtenerNoticias().subscribe(
      (response: News[]) => {
        // Asegúrate de que la respuesta es un array de noticias
        this.nuevasNoticias = response;
        console.log(this.nuevasNoticias);

        // Para cada noticia, obtener la imagen principal
        for (let noticia of this.nuevasNoticias) {
          this.ApiConectService.obtenerImagen(
            noticia.imagenPrincipal
          ).subscribe(
            (imagen: Imagen) => {
              if (imagen.url) {
                noticia.imagenUrl = imagen.url;
              } else {
                console.error('La imagen no tiene URL');
              }
            },
            (error) => {
              console.error('Hubo un error al obtener la imagen', error);
            }
          );
        }
      },
      (error) => {
        console.error('Hubo un error al obtener los datos', error);
      }
    );
  }

  public navigateNoticia() {
    this.navigate.navigateByUrl('noticiaDetail');
  }
}