import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from './shared';
import { AuthService } from '../user/auth.service';


@Component({
  template: `
    <div>
      <h1>Movies</h1>
      <hr/>
      <div class="row" *ngIf="auth.isAuthenticated()">
        <div *ngFor="let movie of movies" class="col-md-3">
          <app-movie-thumbnail
          [movie]="movie"></app-movie-thumbnail>
        </div>
        <div class="col-md-10" *ngIf="!hasFavorites"><p>No favorites added.</p></div>
      </div>
      <div class="row" *ngIf="!auth.isAuthenticated()">
        <div class="col-md-6"><p><a *ngIf="!auth.isAuthenticated()"
         [routerLink]="['/user/login']">Login</a> to add/view your favorite movies.</p></div>
      </div>
    </div>
  `
})
export class MoviesFavoriteComponent implements OnInit {
  movies: IMovie[];
  hasFavorites = false;
  constructor(public auth: AuthService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      let movies = this.route.snapshot.data['movies'];
      movies = movies.filter(movie => {
        return movie.favorites.some(u => u === this.auth.currentUser.userName);
      });
      this.movies = movies;
      if (this.movies.length > 0) {
        this.hasFavorites = true;
      }
    }
  }
}
