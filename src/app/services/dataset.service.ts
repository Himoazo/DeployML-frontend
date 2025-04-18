import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dataset } from '../types/dataset.type';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  private readonly url: string = "http://127.0.0.1:8000/dataset";
  private readonly httpClient = inject(HttpClient)
  
  upload(dataset: Dataset): Observable<any>{
    const token = localStorage.getItem("token");
    const headers = { Authorization: "bearer " + token }
    
    const newDataset: FormData = new FormData();
    newDataset.append("file", dataset.file);
    newDataset.append("name", dataset.name);
    newDataset.append("target", dataset.target);
    return this.httpClient.post<string>(`${this.url}/upload`, newDataset, {headers})
  }
}
