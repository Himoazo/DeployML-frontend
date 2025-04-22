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

  run(APIKey: string, model_id: string, input: RunInput): Observable<RunResponse>{
    console.log(APIKey) // Vv8rhCY9ZWVWwGsx8ahf-CeUitL--6YBrSfXlreSM5w
    const headers = new HttpHeaders({ 'x-key': APIKey })
    console.log(headers) // _HttpHeaders {headers: undefined, normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
    return this.httpClient.post<RunResponse>(`${this.url}/run/${model_id}`, input, {headers})
  }

  delete(id: string): Observable<string>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }
    
    return this.httpClient.delete<string>(`${this.url}/delete/${id}`, {headers})
  }
}