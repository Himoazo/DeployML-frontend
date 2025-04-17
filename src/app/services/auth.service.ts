import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogIn } from '../types/login.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = "http://127.0.0.1:8000/";
  private readonly httpClient = inject(HttpClient)
  
  //logging in
  login(login: LogIn): Observable<LogIn>{
  const body = new HttpParams()
    .set('username', login.email.trim())
    .set('password', login.password.trim());
    return this.httpClient.post<LogIn>(
      this.url + 'auth/jwt/login',
      body.toString(),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      }
    );
  }
}
