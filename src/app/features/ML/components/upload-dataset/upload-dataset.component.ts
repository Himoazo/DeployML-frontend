import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatasetService } from '../../services/dataset.service';
import { Dataset } from '../../types/dataset.type';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-upload-dataset',
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-dataset.component.html',
  styleUrl: './upload-dataset.component.scss'
})
export class UploadDatasetComponent {
  fb = inject(FormBuilder)
  dataService = inject(DatasetService)
  selectedFile: File | null = null;
  datasetName: string = "";
  datasetTarget: string = "";
  errorDiv: string = "";
  alert = inject(AlertService)

  selectFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  
  uploadDataset(): void{
    if (this.selectedFile && this.datasetName && this.datasetTarget) {
      const dataset: Dataset = {
        file: this.selectedFile,
        name: this.datasetName.trim(),
        target: this.datasetTarget.trim()
      }
      this.dataService.upload(dataset).subscribe({
        next: res => {
          this.dataService.getDatasets();
          this.alert.alert("Datafilen har laddats upp");
        },
        error: err => {
          console.error('Upload failed', err)
          this.alert.alert("Ett fel har inträffats");
        }
      });
    } else {
      this.alert.alert("Ett fel har inträffats");
    }
  }
}
