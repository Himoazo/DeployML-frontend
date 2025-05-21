import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { LogIn, SignUp, Token, UserInfo } from '../types/auth.type';
import { apiBaseUrl } from '../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = apiBaseUrl;
  private readonly httpClient = inject(HttpClient)
  private readonly _userInfo = signal<UserInfo | null>(null);
  readonly userInfo = this._userInfo.asReadonly();
  readonly userLoggedIn = signal<boolean>(false);

  //logging in
  login(login: LogIn): Observable<boolean>{
  const body = new HttpParams()
    .set('username', login.email.trim())
    .set('password', login.password.trim());
    return this.httpClient.post<void>(
      this.url + '/auth/jwt/login',
      body.toString(),
      {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), withCredentials: true }
    ).pipe(
      switchMap(() => this.isLoggedIn())
    );
  }

  register(signUp: SignUp): Observable<SignUp>{
    return this.httpClient.post<SignUp>(`${this.url}/auth/register`, signUp)
  }
  
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
      map(user => {
        const logged = !!user;
        this.userLoggedIn.set(logged);
        return logged
      }),
      catchError(() => {
        this.userLoggedIn.set(false); 
        return of(false);
      })
    );
  }

  isAdmin(): Observable<boolean>{
    return this.getMyInfo().pipe(
      map(user => !!user && user.is_superuser === true),
      catchError(()=> of(false))
    );
  }

  logOut(): Observable<boolean>{
    return this.httpClient.post(`${this.url}/auth/jwt/logout`, null, { withCredentials: true })
      .pipe(
        map(() => {
          this.userLoggedIn.set(false);
          return true;
        }),
        catchError(() => of(false))
    )
  }
}

