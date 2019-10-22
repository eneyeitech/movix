import { Routes } from '@angular/router';
import {
  MoviesListComponent,
  MovieDetailsComponent,
  MovieListResolver,
  MovieResolver,
  MoviesFavoriteComponent,
  MovieFavoriteResolver
} from './movies/index';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [

  {
    path: 'movies', component: MoviesListComponent,
    resolve: { movies: MovieListResolver }
  },
  {
    path: 'movies/favorites', component: MoviesFavoriteComponent,
    resolve: { movies: MovieFavoriteResolver }
  },
  {
    path: 'movies/:id', component: MovieDetailsComponent,
    resolve: { movie: MovieResolver }
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
];
