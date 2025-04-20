import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TrainRequest } from '../types/MLModel.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MLModelService {
  private readonly url: string = "http://127.0.0.1:8000/model";
  private readonly httpClient = inject(HttpClient)

  train(request: TrainRequest): Observable<string>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.post<string>(`${this.url}/train`, request, { headers })
  }
}
