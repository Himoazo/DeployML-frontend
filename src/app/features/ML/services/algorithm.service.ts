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
    return this.httpClient.post<string>(`${this.url}`, newAlgo, { withCredentials: true })
  }

  getAlgorithms(): Observable<AlgorithmInfo[]>{
    return this.httpClient.get<AlgorithmInfo[]>(`${this.url}`, { withCredentials: true })
  }

  deleteAlgo(id: string): Observable<string>{
    return this.httpClient.delete<string>(`${this.url}/${id}`, {withCredentials: true})
  }
}
