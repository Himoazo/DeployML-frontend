import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CleanRequest, CleanResponse, Dataset, DatasetInfo } from '../types/dataset.type';
import { apiBaseUrl } from '../../../core/constants/endpoints.constant';


@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  private readonly url: string = `${apiBaseUrl}/dataset`;
  private readonly httpClient = inject(HttpClient);
  private readonly _datasets = signal<DatasetInfo[]>([]);
  readonly datasets = this._datasets.asReadonly();
  
  /* getDatasets(): void{
    this.httpClient.get<DatasetInfo[]>(`${this.url}/all`, { withCredentials: true }).subscribe({
      next: response => this._datasets.set(response),
      error: err => console.log(err)
    });
  } */
  
  getDatasets(): Observable<DatasetInfo[]>{
    return this.httpClient.get<DatasetInfo[]>(`${this.url}/all`, { withCredentials: true })
      .pipe(
        tap(response => this._datasets.set(response)),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  upload(dataset: Dataset): Observable<any>{
    const newDataset: FormData = new FormData();
    newDataset.append("file", dataset.file);
    newDataset.append("name", dataset.name);
    newDataset.append("target", dataset.target);
    return this.httpClient.post<string>(`${this.url}/upload`, newDataset, {withCredentials: true})
  }

  deleteDataset(id: string): Observable<string>{
    return this.httpClient.delete<string>(`${this.url}/delete/${id}`, {withCredentials: true})
  }

  cleanDataset(cleanRequest: CleanRequest): Observable<CleanResponse>{
    return this.httpClient.put<CleanResponse>(`${this.url}/clean`, cleanRequest, {withCredentials: true})
  }
}
