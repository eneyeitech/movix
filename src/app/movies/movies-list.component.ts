import { Component, OnInit } from '@angular/core';
import { MovieService } from './shared/movie.service';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from './shared';

@Component({
  template: `
    <div>
      <h1>Movies</h1>
      <hr/>
      <div class="row">
        <div *ngFor="let movie of movies" class="col-md-3">
          <app-movie-thumbnail
          [movie]="movie"></app-movie-thumbnail>
        </div>
      </div>

    </div>
  `
})
export class MoviesListComponent implements OnInit {
  movies: IMovie[];
  constructor(private movieService: MovieService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.movies = this.route.snapshot.data['movies'];
  }
}
