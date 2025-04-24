import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { RunInput, RunResponse, TrainedModel, TrainRequest } from '../types/MLModel.type';

@Injectable({
  providedIn: 'root'
})
export class MLModelService {
  private readonly url: string = "http://127.0.0.1:8000/model";
  private readonly httpClient = inject(HttpClient)
  private readonly _models = signal<TrainedModel[]>([]);
  readonly models = this._models.asReadonly();

  getModels(): void{
    this.httpClient.get<TrainedModel[]>(`${this.url}/all`, { withCredentials: true }).subscribe({
      next: response => {
        this._models.set(response);
      },
      error: err => console.log(err)
    });
  }

  train(request: TrainRequest): Observable<string>{
    return this.httpClient.post<string>(`${this.url}/train`, request, { withCredentials: true })
  }

  download(id: string): Observable<Blob>{
    return this.httpClient.get(`${this.url}/download/${id}`, { withCredentials: true, responseType: 'blob' })
  }

  run(APIKey: string, model_id: string, input: RunInput): Observable<RunResponse>{
    const headers = new HttpHeaders({ 'x-key': APIKey })

    return this.httpClient.post<RunResponse>(`${this.url}/run/${model_id}`, input, {headers, withCredentials: true})
  }

  delete(id: string): Observable<string>{
    return this.httpClient.delete<string>(`${this.url}/delete/${id}`, {withCredentials: true})
  }
}