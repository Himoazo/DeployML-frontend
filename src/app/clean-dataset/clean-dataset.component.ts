import { Component, inject, signal } from '@angular/core';
import { DatasetService } from '../services/dataset.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CleanRequest, CleanResponse } from '../types/dataset.type';

@Component({
  selector: 'app-clean-dataset',
  imports: [CommonModule, FormsModule],
  templateUrl: './clean-dataset.component.html',
  styleUrl: './clean-dataset.component.scss'
})
export class CleanDatasetComponent {
  datasetService = inject(DatasetService)
  datasetId: string = "";
  missingOption: "drop" | "fill" | null = null;
  duplicates: boolean = false;
  cleanResponse = signal<CleanResponse | null>(null); 

  clean(): void{
    if (this.datasetId) {
      const request: CleanRequest = {
        dataset_id: this.datasetId,
        missing_values_option: this.missingOption,
        drop_duplicates: this.duplicates
      }

      this.datasetService.cleanDataset(request).subscribe({
        next: response => {
          this.cleanResponse.set(response);
        },
        error: err => this.cleanResponse.set(err)
      });
    } else {
      
    }
  }
}
