import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
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
  login(login: LogIn): Observable<Token>{
  const body = new HttpParams()
    .set('username', login.email.trim())
    .set('password', login.password.trim());
    return this.httpClient.post<Token>(
      this.url + '/auth/jwt/login',
      body.toString(),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      }
    );
  }

  register(signUp: SignUp): Observable<SignUp>{
    return this.httpClient.post<SignUp>(`${this.url}/auth/register`, signUp)
  }

  getMyInfo(): void{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    this.httpClient.get<UserInfo>(`${this.url}/users/me`, {headers}).subscribe({
      next: response => this._userInfo.set(response),
      error: err => console.log(err)
    })
  }
}

