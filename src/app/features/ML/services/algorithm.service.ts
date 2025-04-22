import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlgorithmInfo } from '../types/algorithms.type';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  private readonly url: string = "http://127.0.0.1:8000/algo";
  private readonly httpClient = inject(HttpClient);
  
  createAlgorithm(newAlgo: AlgorithmInfo): Observable<string>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.post<string>(`${this.url}`, newAlgo, { headers })
  }

  getAlgorithms(): Observable<AlgorithmInfo[]>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.get<AlgorithmInfo[]>(`${this.url}`, { headers })
  }

  deleteAlgo(id: string): Observable<string>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.delete<string>(`${this.url}/${id}`, {headers})
  }
}
