import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TrainedModel, TrainRequest } from '../types/MLModel.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MLModelService {
  private readonly url: string = "http://127.0.0.1:8000/model";
  private readonly httpClient = inject(HttpClient)
  private readonly _models = signal<TrainedModel[]>([]);
  readonly models = this._models.asReadonly();

  getModels(): void{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    this.httpClient.get<TrainedModel[]>(`${this.url}/all`, { headers }).subscribe({
      next: response => {
        this._models.set(response);
      },
      error: err => console.log(err)
    });
  }

  train(request: TrainRequest): Observable<string>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.post<string>(`${this.url}/train`, request, { headers })
  }

  download(id: string): Observable<Blob>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.get(`${this.url}/download/${id}`, { headers, responseType: 'blob' })
  }
}