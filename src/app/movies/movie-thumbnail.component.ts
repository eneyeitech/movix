import { Component, Input } from '@angular/core';
import { IMovie } from './shared';


@Component({
  selector: 'app-movie-thumbnail',
  template: `
    <div [routerLink]="['/movies',movie.id]" class="well hoverwell thumbnail">
    <img [src]="imageUrl" [alt]="movie?.name" class="movie-image">
    <h2>{{movie?.name | uppercase}}</h2>
    <div>{{movie?.year}}</div>
  </div>
  `,
  styles: [`
    .green {color: #003300 !important;}
    .bold {font-weight: bold;}
    .thumbnail {min-height:250px; background:	#181818}
    .pad-left {margin-left: 10px;}
    .well div {color: #bbb;}
    img{max-height:150px}
    `
  ]
})
export class MovieThumbnailComponent {
  @Input() movie: IMovie;
  someProperty: any = 'some value';
  imageUrl: string = './' + this.movie.imageUrl;

  /*getStartTimeStyle(): any {
    if (this.movie && this.movie.time === '8:00 am') {
      return {color: '#003300', 'font-weight': 'bold'};
    } else {
      return {};
    }
  }*/
}
