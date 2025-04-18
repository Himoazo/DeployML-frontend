import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { DatasetService } from '../services/dataset.service';
import { Dataset, DatasetInfo } from '../types/dataset.type';
import { UploadDatasetComponent } from '../upload-dataset/upload-dataset.component';

@Component({
  selector: 'app-dataset',
  imports: [CommonModule, FormsModule, UploadDatasetComponent],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss'
})
export class DatasetComponent {
  dataService = inject(DatasetService);
  datasets: DatasetInfo[] = [];

  ngOnInit() {
    this.getAllDatasets()
  }

  getAllDatasets(): void{
    this.dataService.getDatasets().subscribe({
      next: data => {
        this.datasets = data;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  deleteDataset(id: string) {
    this.dataService.deleteDataset(id).subscribe({
      next: (response) => {
        this.datasets = this.datasets.filter(set => set.id != id)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
