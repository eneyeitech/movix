import { Injectable, Inject } from '@angular/core';
import { IUser } from './user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable()
export class AuthService {
  currentUser: IUser;
  data: any = [];
  remoteUrl = 'https://movix-ng-server.herokuapp.com';

  constructor(private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {

  }
  loginUser(userName: string, password: string) {
    const loginInfo = {
      username: userName,
      password: password
    };
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.remoteUrl + '/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
        this.saveInWebStorage('currentUser', this.currentUser);
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

  saveInWebStorage(key, value) {
    this.storage.set(key, value);
    this.data[key] = this.storage.get(key);
  }
  removeFromWebStorage(key) {
    this.storage.remove(key);
    this.data[key] = undefined;
  }

  isAuthenticated() {
    if (!(!!this.currentUser)) {
      if (!!this.storage.get('currentUser')) {
        this.currentUser = this.storage.get('currentUser');
      }
    }
    return !!this.currentUser; // || !!this.storage.get('currentUser');
  }

  checkAuthenticationStatus() {
    return this.http.get(this.remoteUrl + '/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
          this.saveInWebStorage('currentUser', this.currentUser);
        }
      }))
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.remoteUrl + `/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  saveUser(user) {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<IUser>(this.remoteUrl + '/api/signup', user, options)
      .pipe(catchError(this.handleError<IUser>('saveUser')));
  }

  logout() {
    this.currentUser = undefined;
    this.removeFromWebStorage('currentUser');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.remoteUrl + '/api/logout', {}, options);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
