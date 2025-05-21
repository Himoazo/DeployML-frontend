import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlgorithmInfo } from '../types/algorithms.type';
import { apiBaseUrl } from '../../../core/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  private readonly url: string = `${apiBaseUrl}/algo`
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
