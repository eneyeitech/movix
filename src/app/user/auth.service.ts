import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) {

  }
  loginUser(userName: string, password: string) {
    const loginInfo = {
      username: userName,
      password: password
    };
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false);
      }));
    /*this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'John',
      lastName: 'Papa'
    };*/
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    return this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }))
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  saveUser(user) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IUser>('/api/signup', user, options)
    .pipe(catchError(this.handleError<IUser>('saveUser')));
  }

  logout() {
    this.currentUser = undefined;

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('/api/logout', {}, options);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
