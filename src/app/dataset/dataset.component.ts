import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { DatasetService } from '../services/dataset.service';
import { Dataset, DatasetInfo } from '../types/dataset.type';
import { UploadDatasetComponent } from '../upload-dataset/upload-dataset.component';
import { CleanDatasetComponent } from '../clean-dataset/clean-dataset.component';

@Component({
  selector: 'app-dataset',
  imports: [CommonModule, FormsModule, UploadDatasetComponent, CleanDatasetComponent],
  templateUrl: './dataset.component.html',
  styleUrl: './dataset.component.scss'
})
export class DatasetComponent {
  dataService = inject(DatasetService);

  ngOnInit() {
    this.dataService.getDatasets();
  }

  deleteDataset(id: string) {
    this.dataService.deleteDataset(id).subscribe({
      next: (response) => {
        this.dataService.getDatasets();
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
