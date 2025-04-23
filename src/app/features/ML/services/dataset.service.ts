import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CleanRequest, CleanResponse, Dataset, DatasetInfo } from '../types/dataset.type';


@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  private readonly url: string = "http://127.0.0.1:8000/dataset";
  private readonly httpClient = inject(HttpClient);
  private readonly _datasets = signal<DatasetInfo[]>([]);
  readonly datasets = this._datasets.asReadonly();
  
  getDatasets(): void{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    this.httpClient.get<DatasetInfo[]>(`${this.url}/all`, { withCredentials: true }).subscribe({
      next: response => this._datasets.set(response),
      error: err => console.log(err)
    });
  }

  upload(dataset: Dataset): Observable<any>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }
    
    const newDataset: FormData = new FormData();
    newDataset.append("file", dataset.file);
    newDataset.append("name", dataset.name);
    newDataset.append("target", dataset.target);
    return this.httpClient.post<string>(`${this.url}/upload`, newDataset, {withCredentials: true})
  }

  deleteDataset(id: string): Observable<string>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }

    return this.httpClient.delete<string>(`${this.url}/delete/${id}`, {withCredentials: true})
  }

  cleanDataset(cleanRequest: CleanRequest): Observable<CleanResponse>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }
    return this.httpClient.put<CleanResponse>(`${this.url}/clean`, cleanRequest, {withCredentials: true})
  }
}
