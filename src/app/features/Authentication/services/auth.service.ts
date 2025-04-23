import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LogIn, SignUp, Token, UserInfo } from '../types/auth.type';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = "http://127.0.0.1:8000";
  private readonly httpClient = inject(HttpClient)
  private readonly _userInfo = signal<UserInfo | null>(null);
  readonly userInfo = this._userInfo.asReadonly();

  //logging in
  login(login: LogIn): Observable<void>{
  const body = new HttpParams()
    .set('username', login.email.trim())
    .set('password', login.password.trim());
    return this.httpClient.post<void>(
      this.url + '/auth/jwt/login',
      body.toString(),
      {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), withCredentials: true }
    );
  }

  register(signUp: SignUp): Observable<SignUp>{
    return this.httpClient.post<SignUp>(`${this.url}/auth/register`, signUp)
  }

  /* getMyInfo(): Observable<UserInfo>{
      return this.httpClient.get<UserInfo>(`${this.url}/users/me`, {withCredentials: true}).subscribe({
      next: response => this._userInfo.set(response),
      error: err => console.log(err)
    })
  } */
  
  getMyInfo(): Observable<UserInfo>{
    return this.httpClient.get<UserInfo>(`${this.url}/users/me`, { withCredentials: true })
      .pipe(
        tap(response => this._userInfo.set(response)),
        catchError(err => {
          console.log(err);
          this._userInfo.set(null);
          return of(null as any)
        })
    )
    }

  isLoggedIn(): Observable<boolean> {
    return this.getMyInfo().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }
}

