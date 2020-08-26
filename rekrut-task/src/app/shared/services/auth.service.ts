import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {pipe} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(User) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe (
      tap(this.setToken)
    );
  }

  private setToken(response) {
    if (response) {
      const exoData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', exoData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token () {
    const expToken = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date > expToken) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  }
  logout() {
    this.setToken(null);
  }

  isAuth () {
    return !!this.token;
  }

}
