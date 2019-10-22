import { Injectable } from '@angular/core';
import { ISession, IMovie } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VoterService {
  remoteUrl: string = 'https://movix-ng-server.herokuapp.com';
  constructor(private http: HttpClient) {

  }
  deleteVoter(movieId: number, movie: IMovie, voterName: string) {
    const url = this.remoteUrl + `/api/movies/${movieId}/users/${voterName}`;
    movie.favorites = movie.favorites.filter(voter => voter !== voterName);
    this.http.delete(url)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  addVoter(movieId: number, movie: IMovie, voterName: string) {
    movie.favorites.push(voterName);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = this.remoteUrl + `/api/movies/${movieId}/users/${voterName}`;
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  userHasVoted(movie: IMovie, voterName: string) {
    return movie.favorites.some(voter => voter === voterName);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
