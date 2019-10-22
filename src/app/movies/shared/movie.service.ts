import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { IMovie, ISession } from './movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {

  }
  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>('/api/movies')
      .pipe(catchError(this.handleError<IMovie[]>('getMovies', []))) ;
  }

  getMovie(id: number): Observable<IMovie> {
    return this.http.get<IMovie>('/api/movies/' + id)
      .pipe(catchError(this.handleError<IMovie>('getMovie'))) ;
  }

  saveMovie(movie) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IMovie>('/api/movies', movie, options)
    .pipe(catchError(this.handleError<IMovie>('saveMovie')));
  }

  searchSessions(searchTerm: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>('/api/sessions/search?search=' + searchTerm)
    .pipe(catchError(this.handleError<IMovie[]>('searchSessions'))) ;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

